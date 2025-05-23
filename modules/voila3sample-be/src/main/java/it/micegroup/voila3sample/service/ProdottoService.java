package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.Prodotto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface ProdottoService extends BaseEntityService<Prodotto, Integer> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<Prodotto> specification);

  /**
   * Executes the bulk update of a Prodotto
   *
   * @param prodotto
   * @return updated Prodotto
   */
  Prodotto bulkUpdate(Prodotto prodotto);

  /**
   * Executes the update of an Prodotto
   *
   * @param prodotto
   * @return Prodotto updated
   */
  Prodotto update(Prodotto prodotto);

  /**
   * Deletes an Prodotto with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return Prodotto deleted if it was present
   */
  Optional<Prodotto> delete(String objectKey);

  /**
   * Returns the Page of the Prodotto following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of Prodotto
   */
  Page<Prodotto> search(Specification<Prodotto> specification, Pageable pageable);
}
