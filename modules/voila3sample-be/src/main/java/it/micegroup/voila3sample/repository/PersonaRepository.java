
package it.micegroup.voila3sample.repository;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.Persona;

import it.micegroup.voila3sample.domain.PersonaKey;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface PersonaRepository extends BaseRepository<Persona, PersonaKey> {

	/**
	 * Finds all Persona following the specification in input and return them in a
	 * Page
	 */

	@Override
	Page<Persona> findAll(Specification<Persona> spec, Pageable pageable);

	/**
	 * Finds, if present, a Persona by its id
	 */

	Optional<Persona> findByThePersonaKey(PersonaKey id);

}
