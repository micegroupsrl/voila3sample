package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.RigaOrdine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.primary.RigaOrdineKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface RigaOrdineService extends BaseEntityService<RigaOrdine, RigaOrdineKey> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<RigaOrdine> specification);

  /**
   * Executes the bulk update of a RigaOrdine
   *
   * @param rigaOrdine
   * @return updated RigaOrdine
   */
  RigaOrdine bulkUpdate(RigaOrdine rigaOrdine);

  /**
   * Executes the update of an RigaOrdine
   *
   * @param rigaOrdine
   * @return RigaOrdine updated
   */
  RigaOrdine update(RigaOrdine rigaOrdine);

  /**
   * Deletes an RigaOrdine with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return RigaOrdine deleted if it was present
   */
  Optional<RigaOrdine> delete(String objectKey);

  /**
   * Returns the Page of the RigaOrdine following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of RigaOrdine
   */
  Page<RigaOrdine> search(Specification<RigaOrdine> specification, Pageable pageable);
}
