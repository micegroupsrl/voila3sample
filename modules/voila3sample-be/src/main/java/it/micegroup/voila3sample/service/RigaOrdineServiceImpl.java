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

import it.micegroup.voila3sample.domain.primary.RigaOrdine;

import it.micegroup.voila3sample.domain.primary.RigaOrdineKey;

import it.micegroup.voila3sample.domain.primary.Ordine;
import it.micegroup.voila3sample.domain.primary.Prodotto;

import it.micegroup.voila3sample.repository.primary.RigaOrdineRepository;

import it.micegroup.voila3sample.repository.primary.OrdineRepository;
import it.micegroup.voila3sample.repository.primary.ProdottoRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageImpl;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class RigaOrdineServiceImpl extends BaseServiceImpl implements RigaOrdineService {

  private static final String LIST_RIGAORDINE = "ListRigaOrdine";
  private static final String DETAIL_RIGAORDINE = "DetailRigaOrdine";

  private final RigaOrdineRepository rigaOrdineRepository;

  private final ProdottoRepository prodottoRepository;
  private final OrdineRepository ordineRepository;

  // CHILD SERVICES

  private final AclService aclService;

  /**
   * Return a Page of entities of a given RigaOrdine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given RigaOrdine
   */
  @Override
  @Transactional(readOnly = true)
  public Page<RigaOrdine> findAll(Pageable pageable) {
    return rigaOrdineRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given RigaOrdine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given RigaOrdine
   */
  @Override
  @Transactional(readOnly = true)
  public List<RigaOrdine> findAll() {
    return rigaOrdineRepository.findAll();
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
  public Optional<RigaOrdine> findByObjectKey(String objectKey) {
    RigaOrdine rigaOrdine = new RigaOrdine(objectKey);
    return rigaOrdineRepository.findByTheRigaOrdineKey(rigaOrdine.getTheRigaOrdineKey());
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
  public boolean exists(RigaOrdineKey id) {
    return rigaOrdineRepository.existsById(id);
  }

  @Override
  @Transactional
  public RigaOrdine insert(@Valid RigaOrdine entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // Risolvi riferimento a Ordine
    if (entity.getTheOrdine() != null) {
      Integer parentId = entity.getTheOrdine().getIdOrdine();
      try {
        Ordine parentRef = ordineRepository.getReferenceById(parentId);
        entity.setTheOrdine(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "Ordine referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // Risolvi riferimento a Prodotto
    if (entity.getTheProdotto() != null) {
      Integer parentId = entity.getTheProdotto().getIdProdotto();
      try {
        Prodotto parentRef = prodottoRepository.getReferenceById(parentId);
        entity.setTheProdotto(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "Prodotto referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return rigaOrdineRepository.save(entity);
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
  public RigaOrdine update(@Valid RigaOrdine entity) {
    return rigaOrdineRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted RigaOrdine, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<RigaOrdine> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            rigaOrdine -> {
              rigaOrdineRepository.delete(rigaOrdine);
              return Optional.of(rigaOrdine);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the RigaOrdine following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter RigaOrdine
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<RigaOrdine> search(Specification<RigaOrdine> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "riga-ordine.search");
    return rigaOrdineRepository.findAll(specification, pageable);
  }

  /**
   * Delete an entity by its id
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to delete
   */
  @Override
  @Transactional
  public void deleteById(RigaOrdineKey id) {
    rigaOrdineRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a RigaOrdine
   *
   * @param rigaOrdine
   * @return updated RigaOrdine
   */
  @Override
  @Transactional
  public RigaOrdine bulkUpdate(RigaOrdine rigaOrdine) {
    return this.update(rigaOrdine);
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
    Collection<RigaOrdine> rigaordineCollection = new ArrayList<>();
    Optional<RigaOrdine> optionalRigaOrdine = findByObjectKey(objectKey);
    if (optionalRigaOrdine.isPresent()) {
      RigaOrdine rigaordine = optionalRigaOrdine.get();
      rigaordineCollection.add(rigaordine);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_RIGAORDINE, rigaordineCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<RigaOrdine> specification) {
    Collection<RigaOrdine> rigaOrdineCollection =
        search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream =
          exportXlsReport(getJasperPrint(LIST_RIGAORDINE, rigaOrdineCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
