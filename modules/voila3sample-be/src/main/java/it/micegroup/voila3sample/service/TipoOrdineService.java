package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.TipoOrdine;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.primary.TipoOrdineKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface TipoOrdineService extends BaseEntityService<TipoOrdine, TipoOrdineKey> {

	/**
	 * Print Pdf and Xlxs
	 */
	public byte[] printPdfReport(String objectKey);

	byte[] printXLSList(Specification<TipoOrdine> specification);

	/**
	 * Executes the bulk update of a TipoOrdine
	 * 
	 * @param tipoOrdine
	 * @return updated TipoOrdine
	 */
	TipoOrdine bulkUpdate(TipoOrdine tipoOrdine);

	/**
	 * Executes the update of an TipoOrdine
	 * 
	 * @param tipoOrdine
	 * @return TipoOrdine updated
	 */
	TipoOrdine update(TipoOrdine tipoOrdine);

	/**
	 * Deletes an TipoOrdine with the objectKey in input, if it exists
	 * 
	 * @param objectKey
	 * @return TipoOrdine deleted if it was present
	 */
	Optional<TipoOrdine> delete(String objectKey);

	/**
	 * Returns the Page of the TipoOrdine following the specification in input
	 * 
	 * @param specification
	 * @param pageable
	 * 
	 * @return Page of TipoOrdine
	 */
	Page<TipoOrdine> search(Specification<TipoOrdine> specification, Pageable pageable);

}
