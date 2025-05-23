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

import it.micegroup.voila3sample.domain.primary.Fornitore;

import it.micegroup.voila3sample.domain.primary.PersonaKey;

import it.micegroup.voila3sample.repository.primary.FornitoreRepository;

import org.apache.commons.lang3.StringUtils;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.primary.Prodotto;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class FornitoreServiceImpl extends BaseServiceImpl implements FornitoreService {

  private static final String LIST_FORNITORE = "ListFornitore";
  private static final String DETAIL_FORNITORE = "DetailFornitore";

  private final FornitoreRepository fornitoreRepository;

  // CHILD SERVICES
  private final ProdottoService prodottoService;
  private final AclService aclService;

  /**
   * Return a Page of entities of a given Fornitore
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given Fornitore
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Fornitore> findAll(Pageable pageable) {
    return fornitoreRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given Fornitore
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given Fornitore
   */
  @Override
  @Transactional(readOnly = true)
  public List<Fornitore> findAll() {
    return fornitoreRepository.findAll();
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
  public Optional<Fornitore> findByObjectKey(String objectKey) {
    Fornitore fornitore = new Fornitore(objectKey);
    return fornitoreRepository.findByThePersonaKey(fornitore.getThePersonaKey());
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
    return fornitoreRepository.existsById(id);
  }

  @Override
  @Transactional
  public Fornitore insert(@Valid Fornitore entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // Itera sulla collezione di figli Prodotto
    if (entity.getTheProdotto() != null) {
      for (Prodotto childEntity : entity.getTheProdotto()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheFornitore(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return fornitoreRepository.save(entity);
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
  public Fornitore update(@Valid Fornitore entity) {
    return fornitoreRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted Fornitore, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<Fornitore> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            fornitore -> {
              fornitoreRepository.delete(fornitore);
              return Optional.of(fornitore);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the Fornitore following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter Fornitore
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Fornitore> search(Specification<Fornitore> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "fornitore.search");
    return fornitoreRepository.findAll(specification, pageable);
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
    fornitoreRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a Fornitore
   *
   * @param fornitore
   * @return updated Fornitore
   */
  @Override
  @Transactional
  public Fornitore bulkUpdate(Fornitore fornitore) {
    if (fornitore.getTheProdotto() != null) {
      List<Prodotto> updateTheProdotto =
          fornitore.getTheProdotto().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<Prodotto> deleteTheProdotto =
          fornitore.getTheProdotto().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      fornitore.setTheProdotto(updateTheProdotto);
      deleteTheProdotto.forEach(child -> prodottoService.deleteById(child.getIdProdotto()));
    }
    return this.update(fornitore);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames = Arrays.asList(reportName, "ListProdottoForFornitore");
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
    Collection<Fornitore> fornitoreCollection = new ArrayList<>();
    Optional<Fornitore> optionalFornitore = findByObjectKey(objectKey);
    if (optionalFornitore.isPresent()) {
      Fornitore fornitore = optionalFornitore.get();
      fornitoreCollection.add(fornitore);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_FORNITORE, fornitoreCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<Fornitore> specification) {
    Collection<Fornitore> fornitoreCollection =
        search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_FORNITORE, fornitoreCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
