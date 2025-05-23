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

import it.micegroup.voila3sample.domain.primary.CategoriaOrdine;

import it.micegroup.voila3sample.repository.primary.CategoriaOrdineRepository;

import org.apache.commons.lang3.StringUtils;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.primary.TipoOrdine;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class CategoriaOrdineServiceImpl extends BaseServiceImpl implements CategoriaOrdineService {

  private static final String LIST_CATEGORIAORDINE = "ListCategoriaOrdine";
  private static final String DETAIL_CATEGORIAORDINE = "DetailCategoriaOrdine";

  private final CategoriaOrdineRepository categoriaOrdineRepository;

  // CHILD SERVICES
  private final TipoOrdineService tipoOrdineService;
  private final AclService aclService;

  /**
   * Return a Page of entities of a given CategoriaOrdine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given CategoriaOrdine
   */
  @Override
  @Transactional(readOnly = true)
  public Page<CategoriaOrdine> findAll(Pageable pageable) {
    return categoriaOrdineRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given CategoriaOrdine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given CategoriaOrdine
   */
  @Override
  @Transactional(readOnly = true)
  public List<CategoriaOrdine> findAll() {
    return categoriaOrdineRepository.findAll();
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
  public Optional<CategoriaOrdine> findByObjectKey(String objectKey) {
    CategoriaOrdine categoriaOrdine = new CategoriaOrdine(objectKey);
    return categoriaOrdineRepository.findByIdCatOrdine(categoriaOrdine.getIdCatOrdine());
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
  public boolean exists(Integer id) {
    return categoriaOrdineRepository.existsById(id);
  }

  @Override
  @Transactional
  public CategoriaOrdine insert(@Valid CategoriaOrdine entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // Itera sulla collezione di figli TipoOrdine
    if (entity.getTheTipoOrdine() != null) {
      for (TipoOrdine childEntity : entity.getTheTipoOrdine()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheCategoriaOrdine(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return categoriaOrdineRepository.save(entity);
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
  public CategoriaOrdine update(@Valid CategoriaOrdine entity) {
    return categoriaOrdineRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted CategoriaOrdine, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<CategoriaOrdine> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            categoriaOrdine -> {
              categoriaOrdineRepository.delete(categoriaOrdine);
              return Optional.of(categoriaOrdine);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the CategoriaOrdine following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter CategoriaOrdine
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<CategoriaOrdine> search(
      Specification<CategoriaOrdine> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "categoria-ordine.search");
    return categoriaOrdineRepository.findAll(specification, pageable);
  }

  /**
   * Delete an entity by its id
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to delete
   */
  @Override
  @Transactional
  public void deleteById(Integer id) {
    categoriaOrdineRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a CategoriaOrdine
   *
   * @param categoriaOrdine
   * @return updated CategoriaOrdine
   */
  @Override
  @Transactional
  public CategoriaOrdine bulkUpdate(CategoriaOrdine categoriaOrdine) {
    if (categoriaOrdine.getTheTipoOrdine() != null) {
      List<TipoOrdine> updateTheTipoOrdine =
          categoriaOrdine.getTheTipoOrdine().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<TipoOrdine> deleteTheTipoOrdine =
          categoriaOrdine.getTheTipoOrdine().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      categoriaOrdine.setTheTipoOrdine(updateTheTipoOrdine);
      deleteTheTipoOrdine.forEach(
          child -> tipoOrdineService.deleteById(child.getTheTipoOrdineKey()));
    }
    return this.update(categoriaOrdine);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames = Arrays.asList(reportName, "ListTipoOrdineForCategoriaOrdine");
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
    Collection<CategoriaOrdine> categoriaordineCollection = new ArrayList<>();
    Optional<CategoriaOrdine> optionalCategoriaOrdine = findByObjectKey(objectKey);
    if (optionalCategoriaOrdine.isPresent()) {
      CategoriaOrdine categoriaordine = optionalCategoriaOrdine.get();
      categoriaordineCollection.add(categoriaordine);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_CATEGORIAORDINE, categoriaordineCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<CategoriaOrdine> specification) {
    Collection<CategoriaOrdine> categoriaOrdineCollection =
        search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream =
          exportXlsReport(getJasperPrint(LIST_CATEGORIAORDINE, categoriaOrdineCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
