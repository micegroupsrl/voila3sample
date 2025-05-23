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

import it.micegroup.voila3sample.domain.primary.Ordine;

import it.micegroup.voila3sample.domain.primary.StatoOrdine;
import it.micegroup.voila3sample.domain.primary.TipoOrdine;
import it.micegroup.voila3sample.domain.primary.Cliente;

import it.micegroup.voila3sample.repository.primary.OrdineRepository;

import it.micegroup.voila3sample.domain.primary.Prodotto;
import it.micegroup.voila3sample.repository.primary.ProdottoRepository;

import it.micegroup.voila3sample.domain.primary.StatoOrdine;
import it.micegroup.voila3sample.repository.primary.StatoOrdineRepository;
import it.micegroup.voila3sample.domain.primary.TipoOrdine;
import it.micegroup.voila3sample.domain.primary.TipoOrdineKey;
import it.micegroup.voila3sample.repository.primary.TipoOrdineRepository;
import it.micegroup.voila3sample.domain.primary.Cliente;
import it.micegroup.voila3sample.domain.primary.PersonaKey;
import it.micegroup.voila3sample.repository.primary.ClienteRepository;

import it.micegroup.voila3sample.repository.primary.StatoOrdineRepository;
import it.micegroup.voila3sample.domain.primary.TipoOrdineKey;
import it.micegroup.voila3sample.repository.primary.TipoOrdineRepository;
import it.micegroup.voila3sample.domain.primary.PersonaKey;
import it.micegroup.voila3sample.repository.primary.ClienteRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.PageImpl;

import org.springframework.context.annotation.Lazy;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.primary.RigaOrdine;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor(onConstructor = @__(@Lazy))
@Service
public class OrdineServiceImpl extends BaseServiceImpl implements OrdineService {

  private static final String LIST_ORDINE = "ListOrdine";
  private static final String DETAIL_ORDINE = "DetailOrdine";

  private final OrdineRepository ordineRepository;

  private final TipoOrdineRepository tipoOrdineRepository;
  private final ProdottoRepository prodottoRepository;
  private final StatoOrdineRepository statoOrdineRepository;
  private final ClienteRepository clienteRepository;

  // CHILD SERVICES
  private final RigaOrdineService rigaOrdineService;
  private final AclService aclService;

  /**
   * Return a Page of entities of a given Ordine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param pageable Pagination object
   * @return Return a Page of entities of a given Ordine
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Ordine> findAll(Pageable pageable) {
    return ordineRepository.findAll(pageable);
  }

  /**
   * Return all entities of a given Ordine
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @return Return all entities of a given Ordine
   */
  @Override
  @Transactional(readOnly = true)
  public List<Ordine> findAll() {
    return ordineRepository.findAll();
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
  public Optional<Ordine> findByObjectKey(String objectKey) {
    Ordine ordine = new Ordine(objectKey);
    return ordineRepository.findByIdOrdine(ordine.getIdOrdine());
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
    return ordineRepository.existsById(id);
  }

  @Override
  @Transactional
  public Ordine insert(@Valid Ordine entity) {
    // --- Inizio Blocco Risoluzione Referenze ---
    // 1. Risolvi Riferimenti ai Genitori (ManyToOne, OneToOne where aClass is dependent)
    // Risolvi riferimento a StatoOrdine
    if (entity.getTheStatoOrdine() != null) {
      Integer parentId = entity.getTheStatoOrdine().getIdStatoOrdine();
      try {
        StatoOrdine parentRef = statoOrdineRepository.getReferenceById(parentId);
        entity.setTheStatoOrdine(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "StatoOrdine referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // Risolvi riferimento a TipoOrdine
    if (entity.getTheTipoOrdine() != null) {
      TipoOrdineKey parentId = entity.getTheTipoOrdine().getTheTipoOrdineKey();
      try {
        TipoOrdine parentRef = tipoOrdineRepository.getReferenceById(parentId);
        entity.setTheTipoOrdine(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "TipoOrdine referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // Risolvi riferimento a Cliente
    if (entity.getTheCliente() != null) {
      PersonaKey parentId = entity.getTheCliente().getThePersonaKey();
      try {
        Cliente parentRef = clienteRepository.getReferenceById(parentId);
        entity.setTheCliente(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "Cliente referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // Risolvi riferimento a Ordine
    if (entity.getTheOrdineAggregato() != null) {
      Integer parentId = entity.getTheOrdineAggregato().getIdOrdine();
      try {
        Ordine parentRef = ordineRepository.getReferenceById(parentId);
        entity.setTheOrdineAggregato(parentRef);
      } catch (jakarta.persistence.EntityNotFoundException e) {
        throw new jakarta.persistence.EntityNotFoundException(
            "Ordine referenziato non trovato con ID/key: " + parentId, e);
      }
    }
    // 2. Risolvi Riferimenti *DENTRO* le Entità Figlie (OneToMany, OneToOne where aClass is
    // principal)
    // Itera sulla collezione di figli RigaOrdine
    if (entity.getTheRigaOrdine() != null) {
      for (RigaOrdine childEntity : entity.getTheRigaOrdine()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheOrdine(entity);
        // Ora, risolvi i *genitori* del figlio (ESCLUSO il riferimento a 'entity' stessa)
        // Risolvi riferimento a Prodotto dentro RigaOrdine
        if (childEntity.getTheProdotto() != null) {
          if (childEntity.getTheProdotto().getIdProdotto() != null) {
            Integer childsParentId = childEntity.getTheProdotto().getIdProdotto();
            try {
              Prodotto childsParentRef = prodottoRepository.getReferenceById(childsParentId);
              childEntity.setTheProdotto(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "Prodotto referenziato dentro RigaOrdine non trovato con ID/key: "
                      + childsParentId,
                  e);
            }
          } else {
            throw new IllegalArgumentException(
                "Riferimento Prodotto in RigaOrdine presente ma senza ID valido.");
          }
        } // Fine if (childEntity.getTheProdotto() != null)
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // Itera sulla collezione di figli Ordine
    if (entity.getTheOrdineFiglio() != null) {
      for (Ordine childEntity : entity.getTheOrdineFiglio()) {
        // Assicura riferimento bidirezionale (Figlio -> Padre)
        childEntity.setTheOrdineAggregato(entity);
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
        // Risolvi riferimento a TipoOrdine dentro Ordine
        if (childEntity.getTheTipoOrdine() != null) {
          if (childEntity.getTheTipoOrdine().getTheTipoOrdineKey() != null) {
            TipoOrdineKey childsParentId = childEntity.getTheTipoOrdine().getTheTipoOrdineKey();
            try {
              TipoOrdine childsParentRef = tipoOrdineRepository.getReferenceById(childsParentId);
              childEntity.setTheTipoOrdine(childsParentRef);
            } catch (jakarta.persistence.EntityNotFoundException e) {
              throw new jakarta.persistence.EntityNotFoundException(
                  "TipoOrdine referenziato dentro Ordine non trovato con ID/key: " + childsParentId,
                  e);
            }
          } else {
            childEntity.setTheTipoOrdine(null); // Associazione opzionale, imposta a null
          }
        } // Fine if (childEntity.getTheTipoOrdine() != null)
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
      } // Fine for (childEntity : collection)
    } // Fine if (collection != null)
    // --- Fine Blocco Risoluzione Referenze ---
    // 3. Persisti l'entità (ora con riferimenti gestiti)
    return ordineRepository.save(entity);
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
  public Ordine update(@Valid Ordine entity) {
    return ordineRepository.save(entity);
  }

  /**
   * Delete an entity by its objectkey and returns the deleted Ordine, if it was present
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param objectKey of entity to delete
   */
  @Override
  @Transactional
  public Optional<Ordine> delete(String objectKey) {
    return findByObjectKey(objectKey)
        .map(
            ordine -> {
              ordineRepository.delete(ordine);
              return Optional.of(ordine);
            })
        .orElseGet(Optional::empty);
  }

  /**
   * Returns the Page of the Ordine following the specification in input
   *
   * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
   * @param specification to use to filter Ordine
   * @param pageable
   */
  @Override
  @Transactional(readOnly = true)
  public Page<Ordine> search(Specification<Ordine> specification, Pageable pageable) {
    specification = aclService.applyAcl(specification, "ordine.search");
    return ordineRepository.findAll(specification, pageable);
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
    ordineRepository.deleteById(id);
  }

  /**
   * Executes the bulk update of a Ordine
   *
   * @param ordine
   * @return updated Ordine
   */
  @Override
  @Transactional
  public Ordine bulkUpdate(Ordine ordine) {
    if (ordine.getTheRigaOrdine() != null) {
      List<RigaOrdine> updateTheRigaOrdine =
          ordine.getTheRigaOrdine().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<RigaOrdine> deleteTheRigaOrdine =
          ordine.getTheRigaOrdine().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      ordine.setTheRigaOrdine(updateTheRigaOrdine);
      deleteTheRigaOrdine.forEach(
          child -> rigaOrdineService.deleteById(child.getTheRigaOrdineKey()));
    }
    if (ordine.getTheOrdineFiglio() != null) {
      List<Ordine> updateTheOrdineFiglio =
          ordine.getTheOrdineFiglio().stream()
              .filter(child -> !child.isDeletedEntityState())
              .collect(Collectors.toList());
      List<Ordine> deleteTheOrdineFiglio =
          ordine.getTheOrdineFiglio().stream()
              .filter(GenericEntity::isDeletedEntityState)
              .collect(Collectors.toList());
      ordine.setTheOrdineFiglio(updateTheOrdineFiglio);
      deleteTheOrdineFiglio.forEach(child -> deleteById(child.getIdOrdine()));
    }
    return this.update(ordine);
  }

  @Transactional(readOnly = true)
  public JasperPrint getJasperPrint(String reportName, Collection<?> collection)
      throws BusinessException {
    JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
    Map<String, Object> parameters = new HashMap<>();
    // Adds to the collection the compiled master report dependency (for subreport) and return the
    // compiled master report.
    List<String> fileNames =
        Arrays.asList(reportName, "ListRigaOrdineForOrdine", "ListOrdineForOrdine");
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
    Collection<Ordine> ordineCollection = new ArrayList<>();
    Optional<Ordine> optionalOrdine = findByObjectKey(objectKey);
    if (optionalOrdine.isPresent()) {
      Ordine ordine = optionalOrdine.get();
      ordineCollection.add(ordine);
      try {
        return JasperExportManager.exportReportToPdf(
            getJasperPrint(DETAIL_ORDINE, ordineCollection));
      } catch (JRException e) {
        log.error(LOG_ERROR, e);
      }
    }
    return new byte[0];
  }

  @Transactional(readOnly = true)
  public byte[] printXLSList(Specification<Ordine> specification) {
    Collection<Ordine> ordineCollection = search(specification, Pageable.unpaged()).getContent();
    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    try {
      byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_ORDINE, ordineCollection));
    } catch (JRException e) {
      log.error(LOG_ERROR, e);
    }
    return byteArrayOutputStream.toByteArray();
  }
}
