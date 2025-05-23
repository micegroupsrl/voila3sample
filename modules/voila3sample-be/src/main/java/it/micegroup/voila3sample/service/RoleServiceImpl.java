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

import it.micegroup.voila3sample.domain.security.Role;

import it.micegroup.voila3sample.repository.security.RoleRepository;

import it.micegroup.voila3sample.domain.security.Privilege;
import it.micegroup.voila3sample.repository.security.PrivilegeRepository;

import it.micegroup.voila3sample.domain.security.User;
import it.micegroup.voila3sample.repository.security.UserRepository;

import org.apache.commons.lang3.StringUtils;

import org.springframework.context.annotation.Lazy;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.security.PrivilegePerRole;
import it.micegroup.voila3sample.domain.security.RolePerUser;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor(onConstructor = @__(@Lazy))
@Service
public class RoleServiceImpl extends BaseServiceImpl implements RoleService {

  private static final String LIST_ROLE = "ListRole";
  private static final String DETAIL_ROLE = "DetailRole";

  private final RoleRepository roleRepository;

  private final UserRepository userRepository;
  private final PrivilegeRepository privilegeRepository;

  // CHILD SERVICES
  private final PrivilegePerRoleService privilegePerRoleService;
  private final RolePerUserService rolePerUserService;
  private final AclService aclService;

  /**
   * Return a Page of entities of a given Role
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given Role
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Role> findAll(Pageable pageable) {
    return roleRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given Role
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given Role
   */
  @Override
  @Transactional(readOnly = true)
  public List<Role> findAll() {
    return roleRepository.findAll();
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
  public Optional<Role> findByObjectKey(String objectKey) {
    Role role = new Role(objectKey);
    return roleRepository.findByRoleId(role.getRoleId());
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
  public boolean exists(String id) {
    return roleRepository.existsById(id);
  }

  @Override
  @Transactional
  public Role insert(@Valid Role entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // Risolvi riferimento a Role
    if (entity.getTheRoleRoleGroup() != null) {
      String parentId = entity.getTheRoleRoleGroup().getRoleId();
      try {
        Role parentRef = roleRepository.getReferenceById(parentId);
        entity.setTheRoleRoleGroup(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "Role referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // Itera sulla collezione di figli PrivilegePerRole
    if (entity.getThePrivilegePerRole() != null) {
      for (PrivilegePerRole childEntity : entity.getThePrivilegePerRole()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheRole(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
        // Risolvi riferimento a Privilege dentro PrivilegePerRole
        if (childEntity.getThePrivilege() != null) {
          if (childEntity.getThePrivilege().getPrivilegeId() != null) {
            Long childsParentId = childEntity.getThePrivilege().getPrivilegeId();
            try {
              Privilege childsParentRef = privilegeRepository.getReferenceById(childsParentId);
              childEntity.setThePrivilege(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "Privilege referenziato dentro PrivilegePerRole non trovato con ID/key: "
                      + childsParentId,
                  e);
            }
          } else {
            throw new IllegalArgumentException(
                "Riferimento Privilege in PrivilegePerRole presente ma senza ID valido.");
          }
        } // Fine if (childEntity.getThePrivilege() != null)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // Itera sulla collezione di figli RolePerUser
    if (entity.getTheRolePerUser() != null) {
      for (RolePerUser childEntity : entity.getTheRolePerUser()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheRole(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
        // Risolvi riferimento a User dentro RolePerUser
        if (childEntity.getTheUser() != null) {
          if (childEntity.getTheUser().getUserId() != null) {
            Long childsParentId = childEntity.getTheUser().getUserId();
            try {
              User childsParentRef = userRepository.getReferenceById(childsParentId);
              childEntity.setTheUser(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "User referenziato dentro RolePerUser non trovato con ID/key: " + childsParentId,
                  e);
            }
          } else {
            throw new IllegalArgumentException(
                "Riferimento User in RolePerUser presente ma senza ID valido.");
          }
        } // Fine if (childEntity.getTheUser() != null)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // Itera sulla collezione di figli Role
    if (entity.getTheRoleRoleChild() != null) {
      for (Role childEntity : entity.getTheRoleRoleChild()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheRoleRoleGroup(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return roleRepository.save(entity);
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
  public Role update(@Valid Role entity) {
    return roleRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted Role, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<Role> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            role -> {
              roleRepository.delete(role);
              return Optional.of(role);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the Role following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter Role
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Role> search(Specification<Role> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "role.search");
    return roleRepository.findAll(specification, pageable);
  }

  /**
   * Delete an entity by its id
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to delete
   */
  @Override
  @Transactional
  public void deleteById(String id) {
    roleRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a Role
   *
   * @param role
   * @return updated Role
   */
  @Override
  @Transactional
  public Role bulkUpdate(Role role) {
    if (role.getThePrivilegePerRole() != null) {
      List<PrivilegePerRole> updateThePrivilegePerRole =
          role.getThePrivilegePerRole().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<PrivilegePerRole> deleteThePrivilegePerRole =
          role.getThePrivilegePerRole().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      role.setThePrivilegePerRole(updateThePrivilegePerRole);
      deleteThePrivilegePerRole.forEach(
          child -> privilegePerRoleService.deleteById(child.getThePrivilegePerRoleKey()));
    }
    if (role.getTheRolePerUser() != null) {
      List<RolePerUser> updateTheRolePerUser =
          role.getTheRolePerUser().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<RolePerUser> deleteTheRolePerUser =
          role.getTheRolePerUser().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      role.setTheRolePerUser(updateTheRolePerUser);
      deleteTheRolePerUser.forEach(
          child -> rolePerUserService.deleteById(child.getTheRolePerUserKey()));
    }
    if (role.getTheRoleRoleChild() != null) {
      List<Role> updateTheRoleRoleChild =
          role.getTheRoleRoleChild().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<Role> deleteTheRoleRoleChild =
          role.getTheRoleRoleChild().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      role.setTheRoleRoleChild(updateTheRoleRoleChild);
      deleteTheRoleRoleChild.forEach(child -> deleteById(child.getRoleId()));
    }
    return this.update(role);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames =
        Arrays.asList(
            reportName, "ListPrivilegePerRoleForRole", "ListRolePerUserForRole", "ListRoleForRole");
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
    Collection<Role> roleCollection = new ArrayList<>();
    Optional<Role> optionalRole = findByObjectKey(objectKey);
    if (optionalRole.isPresent()) {
      Role role = optionalRole.get();
      roleCollection.add(role);
      try {
        return JasperExportManager.exportReportToPdf(getJasperPrint(DETAIL_ROLE, roleCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<Role> specification) {
    Collection<Role> roleCollection = search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_ROLE, roleCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
