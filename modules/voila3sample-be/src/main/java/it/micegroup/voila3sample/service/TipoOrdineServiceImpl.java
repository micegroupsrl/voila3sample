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

import it.micegroup.voila3sample.domain.primary.TipoOrdine;

import it.micegroup.voila3sample.domain.primary.TipoOrdineKey;

import it.micegroup.voila3sample.domain.primary.CategoriaOrdine;

import it.micegroup.voila3sample.repository.primary.TipoOrdineRepository;

import it.micegroup.voila3sample.domain.primary.StatoOrdine;
import it.micegroup.voila3sample.repository.primary.StatoOrdineRepository;
import it.micegroup.voila3sample.domain.primary.Cliente;
import it.micegroup.voila3sample.domain.primary.PersonaKey;
import it.micegroup.voila3sample.repository.primary.ClienteRepository;
import it.micegroup.voila3sample.domain.primary.Ordine;
import it.micegroup.voila3sample.repository.primary.OrdineRepository;

import it.micegroup.voila3sample.repository.primary.CategoriaOrdineRepository;
import org.apache.commons.lang3.StringUtils;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.primary.Ordine;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class TipoOrdineServiceImpl extends BaseServiceImpl implements TipoOrdineService {

  private static final String LIST_TIPOORDINE = "ListTipoOrdine";
  private static final String DETAIL_TIPOORDINE = "DetailTipoOrdine";

  private final TipoOrdineRepository tipoOrdineRepository;

  private final OrdineRepository ordineRepository;
  private final CategoriaOrdineRepository categoriaOrdineRepository;
  private final StatoOrdineRepository statoOrdineRepository;
  private final ClienteRepository clienteRepository;

  // CHILD SERVICES
  private final OrdineService ordineService;
  private final AclService aclService;

  /**
   * Return a Page of entities of a given TipoOrdine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given TipoOrdine
   */
  @Override
  @Transactional(readOnly = true)
  public Page<TipoOrdine> findAll(Pageable pageable) {
    return tipoOrdineRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given TipoOrdine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given TipoOrdine
   */
  @Override
  @Transactional(readOnly = true)
  public List<TipoOrdine> findAll() {
    return tipoOrdineRepository.findAll();
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
  public Optional<TipoOrdine> findByObjectKey(String objectKey) {
    TipoOrdine tipoOrdine = new TipoOrdine(objectKey);
    return tipoOrdineRepository.findByTheTipoOrdineKey(tipoOrdine.getTheTipoOrdineKey());
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
  public boolean exists(TipoOrdineKey id) {
    return tipoOrdineRepository.existsById(id);
  }

  @Override
  @Transactional
  public TipoOrdine insert(@Valid TipoOrdine entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // Risolvi riferimento a CategoriaOrdine
    if (entity.getTheCategoriaOrdine() != null) {
      Integer parentId = entity.getTheCategoriaOrdine().getIdCatOrdine();
      try {
        CategoriaOrdine parentRef = categoriaOrdineRepository.getReferenceById(parentId);
        entity.setTheCategoriaOrdine(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "CategoriaOrdine referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // Itera sulla collezione di figli Ordine
    if (entity.getTheOrdine() != null) {
      for (Ordine childEntity : entity.getTheOrdine()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheTipoOrdine(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
        // Risolvi riferimento a StatoOrdine dentro Ordine
        if (childEntity.getTheStatoOrdine() != null) {
          if (childEntity.getTheStatoOrdine().getIdStatoOrdine() != null) {
            Integer childsParentId = childEntity.getTheStatoOrdine().getIdStatoOrdine();
            try {
              StatoOrdine childsParentRef = statoOrdineRepository.getReferenceById(childsParentId);
              childEntity.setTheStatoOrdine(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "StatoOrdine referenziato dentro Ordine non trovato con ID/key: "
                      + childsParentId,
                  e);
            }
          } else {
            childEntity.setTheStatoOrdine(null); // Associazione opzionale, imposta a null
          }
        } // Fine if (childEntity.getTheStatoOrdine() != null)
        // Risolvi riferimento a Cliente dentro Ordine
        if (childEntity.getTheCliente() != null) {
          if (childEntity.getTheCliente().getThePersonaKey() != null) {
            PersonaKey childsParentId = childEntity.getTheCliente().getThePersonaKey();
            try {
              Cliente childsParentRef = clienteRepository.getReferenceById(childsParentId);
              childEntity.setTheCliente(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "Cliente referenziato dentro Ordine non trovato con ID/key: " + childsParentId,
                  e);
            }
          } else {
            childEntity.setTheCliente(null); // Associazione opzionale, imposta a null
          }
        } // Fine if (childEntity.getTheCliente() != null)
        // Risolvi riferimento a Ordine dentro Ordine
        if (childEntity.getTheOrdineAggregato() != null) {
          if (childEntity.getTheOrdineAggregato().getIdOrdine() != null) {
            Integer childsParentId = childEntity.getTheOrdineAggregato().getIdOrdine();
            try {
              Ordine childsParentRef = ordineRepository.getReferenceById(childsParentId);
              childEntity.setTheOrdineAggregato(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "Ordine referenziato dentro Ordine non trovato con ID/key: " + childsParentId, e);
            }
          } else {
            childEntity.setTheOrdineAggregato(null); // Associazione opzionale, imposta a null
          }
        } // Fine if (childEntity.getTheOrdineAggregato() != null)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return tipoOrdineRepository.save(entity);
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
  public TipoOrdine update(@Valid TipoOrdine entity) {
    return tipoOrdineRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted TipoOrdine, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<TipoOrdine> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            tipoOrdine -> {
              tipoOrdineRepository.delete(tipoOrdine);
              return Optional.of(tipoOrdine);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the TipoOrdine following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter TipoOrdine
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<TipoOrdine> search(Specification<TipoOrdine> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "tipo-ordine.search");
    return tipoOrdineRepository.findAll(specification, pageable);
  }

  /**
   * Delete an entity by its id
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param id of entity to delete
   */
  @Override
  @Transactional
  public void deleteById(TipoOrdineKey id) {
    tipoOrdineRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a TipoOrdine
   *
   * @param tipoOrdine
   * @return updated TipoOrdine
   */
  @Override
  @Transactional
  public TipoOrdine bulkUpdate(TipoOrdine tipoOrdine) {
    if (tipoOrdine.getTheOrdine() != null) {
      List<Ordine> updateTheOrdine =
          tipoOrdine.getTheOrdine().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<Ordine> deleteTheOrdine =
          tipoOrdine.getTheOrdine().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      tipoOrdine.setTheOrdine(updateTheOrdine);
      deleteTheOrdine.forEach(child -> ordineService.deleteById(child.getIdOrdine()));
    }
    return this.update(tipoOrdine);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames = Arrays.asList(reportName, "ListOrdineForTipoOrdine");
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
    Collection<TipoOrdine> tipoordineCollection = new ArrayList<>();
    Optional<TipoOrdine> optionalTipoOrdine = findByObjectKey(objectKey);
    if (optionalTipoOrdine.isPresent()) {
      TipoOrdine tipoordine = optionalTipoOrdine.get();
      tipoordineCollection.add(tipoordine);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_TIPOORDINE, tipoordineCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<TipoOrdine> specification) {
    Collection<TipoOrdine> tipoOrdineCollection =
        search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream =
          exportXlsReport(getJasperPrint(LIST_TIPOORDINE, tipoOrdineCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
