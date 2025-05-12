
package it.micegroup.voila3sample.repository;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.Cliente;

import it.micegroup.voila3sample.domain.PersonaKey;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface ClienteRepository extends BaseRepository<Cliente, PersonaKey> {

	/**
	 * Finds all Cliente following the specification in input and return them in a
	 * Page
	 */

	@Override
	Page<Cliente> findAll(Specification<Cliente> spec, Pageable pageable);

	/**
	 * Finds, if present, a Cliente by its id
	 */

	Optional<Cliente> findByThePersonaKey(PersonaKey id);

}
