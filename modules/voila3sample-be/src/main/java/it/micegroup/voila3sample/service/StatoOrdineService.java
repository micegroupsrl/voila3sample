package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.StatoOrdine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface StatoOrdineService extends BaseEntityService<StatoOrdine, Integer> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<StatoOrdine> specification);

  /**
   * Executes the bulk update of a StatoOrdine
   *
   * @param statoOrdine
   * @return updated StatoOrdine
   */
  StatoOrdine bulkUpdate(StatoOrdine statoOrdine);

  /**
   * Executes the update of an StatoOrdine
   *
   * @param statoOrdine
   * @return StatoOrdine updated
   */
  StatoOrdine update(StatoOrdine statoOrdine);

  /**
   * Deletes an StatoOrdine with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return StatoOrdine deleted if it was present
   */
  Optional<StatoOrdine> delete(String objectKey);

  /**
   * Returns the Page of the StatoOrdine following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of StatoOrdine
   */
  Page<StatoOrdine> search(Specification<StatoOrdine> specification, Pageable pageable);
}
