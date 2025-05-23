package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.Fornitore;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.primary.PersonaKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface FornitoreService extends BaseEntityService<Fornitore, PersonaKey> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<Fornitore> specification);

  /**
   * Executes the bulk update of a Fornitore
   *
   * @param fornitore
   * @return updated Fornitore
   */
  Fornitore bulkUpdate(Fornitore fornitore);

  /**
   * Executes the update of an Fornitore
   *
   * @param fornitore
   * @return Fornitore updated
   */
  Fornitore update(Fornitore fornitore);

  /**
   * Deletes an Fornitore with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return Fornitore deleted if it was present
   */
  Optional<Fornitore> delete(String objectKey);

  /**
   * Returns the Page of the Fornitore following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of Fornitore
   */
  Page<Fornitore> search(Specification<Fornitore> specification, Pageable pageable);
}
