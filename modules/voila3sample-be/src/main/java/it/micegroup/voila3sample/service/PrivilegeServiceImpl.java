package it.micegroup.voila3sample.service;

import java.util.List;

import java.util.Optional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;
import java.io.ByteArrayOutputStream;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import it.micegroup.voila2runtime.exception.BusinessException;
import org.springframework.context.i18n.LocaleContextHolder;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import it.micegroup.voila3sample.domain.security.Privilege;

import it.micegroup.voila3sample.repository.security.PrivilegeRepository;

import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.repository.security.RoleRepository;

import org.apache.commons.lang3.StringUtils;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.security.PrivilegePerRole;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class PrivilegeServiceImpl extends BaseServiceImpl implements PrivilegeService {

  private static final String LIST_PRIVILEGE = "ListPrivilege";
  private static final String DETAIL_PRIVILEGE = "DetailPrivilege";

  private final PrivilegeRepository privilegeRepository;

  private final RoleRepository roleRepository;

  // CHILD SERVICES
  private final PrivilegePerRoleService privilegePerRoleService;
  private final AclService aclService;

  /**
   * Return a Page of entities of a given Privilege
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given Privilege
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Privilege> findAll(Pageable pageable) {
    return privilegeRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given Privilege
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given Privilege
   */
  @Override
  @Transactional(readOnly = true)
  public List<Privilege> findAll() {
    return privilegeRepository.findAll();
  }

  /**
   * Return the entity found by its objectKey
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to find
   * @return Return the entity found by its objectKey
   */
  @Override
  @Transactional(readOnly = true)
  public Optional<Privilege> findByObjectKey(String objectKey) {
    Privilege privilege = new Privilege(objectKey);
    return privilegeRepository.findByPrivilegeId(privilege.getPrivilegeId());
  }

  /**
   * Check if id with given id exists
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to check
   * @return true if exists
   */
  @Override
  @Transactional(readOnly = true)
  public boolean exists(Long id) {
    return privilegeRepository.existsById(id);
  }

  @Override
  @Transactional
  public Privilege insert(@Valid Privilege entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // Itera sulla collezione di figli PrivilegePerRole
    if (entity.getThePrivilegePerRole() != null) {
      for (PrivilegePerRole childEntity : entity.getThePrivilegePerRole()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setThePrivilege(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
        // Risolvi riferimento a Role dentro PrivilegePerRole
        if (childEntity.getTheRole() != null) {
          if (StringUtils.isNotBlank(childEntity.getTheRole().getRoleId())) {
            String childsParentId = childEntity.getTheRole().getRoleId();
            try {
              Role childsParentRef = roleRepository.getReferenceById(childsParentId);
              childEntity.setTheRole(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "Role referenziato dentro PrivilegePerRole non trovato con ID/key: "
                      + childsParentId,
                  e);
            }
          } else {
            throw new IllegalArgumentException(
                "Riferimento Role in PrivilegePerRole presente ma senza ID valido.");
          }
        } // Fine if (childEntity.getTheRole() != null)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return privilegeRepository.save(entity);
  }

  /**
   * Update the given entity
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param entity : to updated
   * @return entity saved
   */
  @Override
  @Transactional
  public Privilege update(@Valid Privilege entity) {
    return privilegeRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted Privilege, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<Privilege> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            privilege -> {
              privilegeRepository.delete(privilege);
              return Optional.of(privilege);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the Privilege following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter Privilege
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Privilege> search(Specification<Privilege> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "privilege.search");
    return privilegeRepository.findAll(specification, pageable);
  }

  /**
   * Delete an entity by its id
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to delete
   */
  @Override
  @Transactional
  public void deleteById(Long id) {
    privilegeRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a Privilege
   *
   * @param privilege
   * @return updated Privilege
   */
  @Override
  @Transactional
  public Privilege bulkUpdate(Privilege privilege) {
    if (privilege.getThePrivilegePerRole() != null) {
      List<PrivilegePerRole> updateThePrivilegePerRole =
          privilege.getThePrivilegePerRole().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<PrivilegePerRole> deleteThePrivilegePerRole =
          privilege.getThePrivilegePerRole().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      privilege.setThePrivilegePerRole(updateThePrivilegePerRole);
      deleteThePrivilegePerRole.forEach(
          child -> privilegePerRoleService.deleteById(child.getThePrivilegePerRoleKey()));
    }
    return this.update(privilege);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames = Arrays.asList(reportName, "ListPrivilegePerRoleForPrivilege");
    JasperReport report = prepareJasperReport(reportName, parameters, fileNames);
    // Add report dir.
    parameters.put("REPORT_DIR", super.jasperReportsDir);
    // Add locale.
    Locale locale = LocaleContextHolder.getLocale();
    parameters.put(JRParameter.REPORT_LOCALE, locale);
    // Add resource boundle.
    ResourceBundle resourceBoundle = ResourceBundle.getBundle("applicationResources", locale);
    parameters.put(JRParameter.REPORT_RESOURCE_BUNDLE, resourceBoundle);
    // return PDF document.
    JasperPrint jasperPrint = null;
    try {
      return JasperFillManager.fillReport(report, parameters, dataSource);
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return jasperPrint;
  }

  @Transactional(readOnly = true)
  public byte[] printPdfReport(String objectKey) {
    Collection<Privilege> privilegeCollection = new ArrayList<>();
    Optional<Privilege> optionalPrivilege = findByObjectKey(objectKey);
    if (optionalPrivilege.isPresent()) {
      Privilege privilege = optionalPrivilege.get();
      privilegeCollection.add(privilege);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_PRIVILEGE, privilegeCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<Privilege> specification) {
    Collection<Privilege> privilegeCollection =
        search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_PRIVILEGE, privilegeCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
