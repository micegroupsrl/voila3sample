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

import it.micegroup.voila3sample.domain.primary.Persona;

import it.micegroup.voila3sample.domain.primary.PersonaKey;

import it.micegroup.voila3sample.repository.primary.PersonaRepository;

import org.apache.commons.lang3.StringUtils;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class PersonaServiceImpl extends BaseServiceImpl implements PersonaService {

  private static final String LIST_PERSONA = "ListPersona";
  private static final String DETAIL_PERSONA = "DetailPersona";

  private final PersonaRepository personaRepository;

  // CHILD SERVICES

  private final AclService aclService;

  /**
   * Return a Page of entities of a given Persona
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given Persona
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Persona> findAll(Pageable pageable) {
    return personaRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given Persona
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given Persona
   */
  @Override
  @Transactional(readOnly = true)
  public List<Persona> findAll() {
    return personaRepository.findAll();
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
  public Optional<Persona> findByObjectKey(String objectKey) {
    Persona persona = new Persona(objectKey);
    return personaRepository.findByThePersonaKey(persona.getThePersonaKey());
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
  public boolean exists(PersonaKey id) {
    return personaRepository.existsById(id);
  }

  @Override
  @Transactional
  public Persona insert(@Valid Persona entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return personaRepository.save(entity);
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
  public Persona update(@Valid Persona entity) {
    return personaRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted Persona, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<Persona> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            persona -> {
              personaRepository.delete(persona);
              return Optional.of(persona);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the Persona following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter Persona
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Persona> search(Specification<Persona> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "persona.search");
    return personaRepository.findAll(specification, pageable);
  }

  /**
   * Delete an entity by its id
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to delete
   */
  @Override
  @Transactional
  public void deleteById(PersonaKey id) {
    personaRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a Persona
   *
   * @param persona
   * @return updated Persona
   */
  @Override
  @Transactional
  public Persona bulkUpdate(Persona persona) {
    return this.update(persona);
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
    Collection<Persona> personaCollection = new ArrayList<>();
    Optional<Persona> optionalPersona = findByObjectKey(objectKey);
    if (optionalPersona.isPresent()) {
      Persona persona = optionalPersona.get();
      personaCollection.add(persona);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_PERSONA, personaCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<Persona> specification) {
    Collection<Persona> personaCollection = search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_PERSONA, personaCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
