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

import it.micegroup.voila3sample.domain.security.PrivilegePerRole;

import it.micegroup.voila3sample.domain.security.PrivilegePerRoleKey;

import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.domain.security.Privilege;

import it.micegroup.voila3sample.repository.security.PrivilegePerRoleRepository;

import it.micegroup.voila3sample.repository.security.RoleRepository;
import it.micegroup.voila3sample.repository.security.PrivilegeRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageImpl;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class PrivilegePerRoleServiceImpl extends BaseServiceImpl
    implements PrivilegePerRoleService {

  private static final String LIST_PRIVILEGEPERROLE = "ListPrivilegePerRole";
  private static final String DETAIL_PRIVILEGEPERROLE = "DetailPrivilegePerRole";

  private final PrivilegePerRoleRepository privilegePerRoleRepository;

  private final RoleRepository roleRepository;
  private final PrivilegeRepository privilegeRepository;

  // CHILD SERVICES

  private final AclService aclService;

  /**
   * Return a Page of entities of a given PrivilegePerRole
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given PrivilegePerRole
   */
  @Override
  @Transactional(readOnly = true)
  public Page<PrivilegePerRole> findAll(Pageable pageable) {
    return privilegePerRoleRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given PrivilegePerRole
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given PrivilegePerRole
   */
  @Override
  @Transactional(readOnly = true)
  public List<PrivilegePerRole> findAll() {
    return privilegePerRoleRepository.findAll();
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
  public Optional<PrivilegePerRole> findByObjectKey(String objectKey) {
    PrivilegePerRole privilegePerRole = new PrivilegePerRole(objectKey);
    return privilegePerRoleRepository.findByThePrivilegePerRoleKey(
        privilegePerRole.getThePrivilegePerRoleKey());
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
  public boolean exists(PrivilegePerRoleKey id) {
    return privilegePerRoleRepository.existsById(id);
  }

  @Override
  @Transactional
  public PrivilegePerRole insert(@Valid PrivilegePerRole entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // Risolvi riferimento a Role
    if (entity.getTheRole() != null) {
      String parentId = entity.getTheRole().getRoleId();
      try {
        Role parentRef = roleRepository.getReferenceById(parentId);
        entity.setTheRole(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "Role referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // Risolvi riferimento a Privilege
    if (entity.getThePrivilege() != null) {
      Long parentId = entity.getThePrivilege().getPrivilegeId();
      try {
        Privilege parentRef = privilegeRepository.getReferenceById(parentId);
        entity.setThePrivilege(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "Privilege referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return privilegePerRoleRepository.save(entity);
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
  public PrivilegePerRole update(@Valid PrivilegePerRole entity) {
    return privilegePerRoleRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted PrivilegePerRole, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<PrivilegePerRole> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            privilegePerRole -> {
              privilegePerRoleRepository.delete(privilegePerRole);
              return Optional.of(privilegePerRole);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the PrivilegePerRole following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter PrivilegePerRole
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<PrivilegePerRole> search(
      Specification<PrivilegePerRole> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "privilege-per-role.search");
    return privilegePerRoleRepository.findAll(specification, pageable);
  }

  /**
   * Delete an entity by its id
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to delete
   */
  @Override
  @Transactional
  public void deleteById(PrivilegePerRoleKey id) {
    privilegePerRoleRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a PrivilegePerRole
   *
   * @param privilegePerRole
   * @return updated PrivilegePerRole
   */
  @Override
  @Transactional
  public PrivilegePerRole bulkUpdate(PrivilegePerRole privilegePerRole) {
    return this.update(privilegePerRole);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames = Arrays.asList(reportName);
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
    Collection<PrivilegePerRole> privilegeperroleCollection = new ArrayList<>();
    Optional<PrivilegePerRole> optionalPrivilegePerRole = findByObjectKey(objectKey);
    if (optionalPrivilegePerRole.isPresent()) {
      PrivilegePerRole privilegeperrole = optionalPrivilegePerRole.get();
      privilegeperroleCollection.add(privilegeperrole);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_PRIVILEGEPERROLE, privilegeperroleCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<PrivilegePerRole> specification) {
    Collection<PrivilegePerRole> privilegePerRoleCollection =
        search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream =
          exportXlsReport(getJasperPrint(LIST_PRIVILEGEPERROLE, privilegePerRoleCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
