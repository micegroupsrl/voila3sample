package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.CategoriaOrdine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface CategoriaOrdineService extends BaseEntityService<CategoriaOrdine, Integer> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<CategoriaOrdine> specification);

  /**
   * Executes the bulk update of a CategoriaOrdine
   *
   * @param categoriaOrdine
   * @return updated CategoriaOrdine
   */
  CategoriaOrdine bulkUpdate(CategoriaOrdine categoriaOrdine);

  /**
   * Executes the update of an CategoriaOrdine
   *
   * @param categoriaOrdine
   * @return CategoriaOrdine updated
   */
  CategoriaOrdine update(CategoriaOrdine categoriaOrdine);

  /**
   * Deletes an CategoriaOrdine with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return CategoriaOrdine deleted if it was present
   */
  Optional<CategoriaOrdine> delete(String objectKey);

  /**
   * Returns the Page of the CategoriaOrdine following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of CategoriaOrdine
   */
  Page<CategoriaOrdine> search(Specification<CategoriaOrdine> specification, Pageable pageable);
}
