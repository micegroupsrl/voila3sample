package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.Persona;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.primary.PersonaKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface PersonaService extends BaseEntityService<Persona, PersonaKey> {

	/**
	 * Print Pdf and Xlxs
	 */
	public byte[] printPdfReport(String objectKey);

	byte[] printXLSList(Specification<Persona> specification);

	/**
	 * Executes the bulk update of a Persona
	 * 
	 * @param persona
	 * @return updated Persona
	 */
	Persona bulkUpdate(Persona persona);

	/**
	 * Executes the update of an Persona
	 * 
	 * @param persona
	 * @return Persona updated
	 */
	Persona update(Persona persona);

	/**
	 * Deletes an Persona with the objectKey in input, if it exists
	 * 
	 * @param objectKey
	 * @return Persona deleted if it was present
	 */
	Optional<Persona> delete(String objectKey);

	/**
	 * Returns the Page of the Persona following the specification in input
	 * 
	 * @param specification
	 * @param pageable
	 * 
	 * @return Page of Persona
	 */
	Page<Persona> search(Specification<Persona> specification, Pageable pageable);

}
