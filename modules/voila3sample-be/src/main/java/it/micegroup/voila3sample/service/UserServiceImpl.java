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

import it.micegroup.voila3sample.domain.security.User;

import it.micegroup.voila3sample.repository.security.UserRepository;

import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.repository.security.RoleRepository;

import org.apache.commons.lang3.StringUtils;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.security.RolePerUser;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl extends BaseServiceImpl implements UserService {

  private static final String LIST_USER = "ListUser";
  private static final String DETAIL_USER = "DetailUser";

  private final UserRepository userRepository;

  private final RoleRepository roleRepository;

  // CHILD SERVICES
  private final RolePerUserService rolePerUserService;
  private final AclService aclService;

  /**
   * Return a Page of entities of a given User
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given User
   */
  @Override
  @Transactional(readOnly = true)
  public Page<User> findAll(Pageable pageable) {
    return userRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given User
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given User
   */
  @Override
  @Transactional(readOnly = true)
  public List<User> findAll() {
    return userRepository.findAll();
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
  public Optional<User> findByObjectKey(String objectKey) {
    User user = new User(objectKey);
    return userRepository.findByUserId(user.getUserId());
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
    return userRepository.existsById(id);
  }

  @Override
  @Transactional
  public User insert(@Valid User entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // Itera sulla collezione di figli RolePerUser
    if (entity.getTheRolePerUser() != null) {
      for (RolePerUser childEntity : entity.getTheRolePerUser()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheUser(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
        // Risolvi riferimento a Role dentro RolePerUser
        if (childEntity.getTheRole() != null) {
          if (StringUtils.isNotBlank(childEntity.getTheRole().getRoleId())) {
            String childsParentId = childEntity.getTheRole().getRoleId();
            try {
              Role childsParentRef = roleRepository.getReferenceById(childsParentId);
              childEntity.setTheRole(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "Role referenziato dentro RolePerUser non trovato con ID/key: " + childsParentId,
                  e);
            }
          } else {
            throw new IllegalArgumentException(
                "Riferimento Role in RolePerUser presente ma senza ID valido.");
          }
        } // Fine if (childEntity.getTheRole() != null)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return userRepository.save(entity);
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
  public User update(@Valid User entity) {
    return userRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted User, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<User> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            user -> {
              userRepository.delete(user);
              return Optional.of(user);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the User following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter User
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<User> search(Specification<User> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "user.search");
    return userRepository.findAll(specification, pageable);
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
    userRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a User
   *
   * @param user
   * @return updated User
   */
  @Override
  @Transactional
  public User bulkUpdate(User user) {
    if (user.getTheRolePerUser() != null) {
      List<RolePerUser> updateTheRolePerUser =
          user.getTheRolePerUser().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<RolePerUser> deleteTheRolePerUser =
          user.getTheRolePerUser().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      user.setTheRolePerUser(updateTheRolePerUser);
      deleteTheRolePerUser.forEach(
          child -> rolePerUserService.deleteById(child.getTheRolePerUserKey()));
    }
    return this.update(user);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames = Arrays.asList(reportName, "ListRolePerUserForUser");
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
    Collection<User> userCollection = new ArrayList<>();
    Optional<User> optionalUser = findByObjectKey(objectKey);
    if (optionalUser.isPresent()) {
      User user = optionalUser.get();
      userCollection.add(user);
      try {
        return JasperExportManager.exportReportToPdf(getJasperPrint(DETAIL_USER, userCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<User> specification) {
    Collection<User> userCollection = search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_USER, userCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
