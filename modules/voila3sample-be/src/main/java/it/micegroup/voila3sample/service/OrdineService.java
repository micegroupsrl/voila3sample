package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.Ordine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.primary.TipoOrdineKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface OrdineService extends BaseEntityService<Ordine, Integer> {

	/**
	 * Print Pdf and Xlxs
	 */
	public byte[] printPdfReport(String objectKey);

	byte[] printXLSList(Specification<Ordine> specification);

	/**
	 * Executes the bulk update of a Ordine
	 * 
	 * @param ordine
	 * @return updated Ordine
	 */
	Ordine bulkUpdate(Ordine ordine);

	/**
	 * Executes the update of an Ordine
	 * 
	 * @param ordine
	 * @return Ordine updated
	 */
	Ordine update(Ordine ordine);

	/**
	 * Deletes an Ordine with the objectKey in input, if it exists
	 * 
	 * @param objectKey
	 * @return Ordine deleted if it was present
	 */
	Optional<Ordine> delete(String objectKey);

	/**
	 * Returns the Page of the Ordine following the specification in input
	 * 
	 * @param specification
	 * @param pageable
	 * 
	 * @return Page of Ordine
	 */
	Page<Ordine> search(Specification<Ordine> specification, Pageable pageable);

}
