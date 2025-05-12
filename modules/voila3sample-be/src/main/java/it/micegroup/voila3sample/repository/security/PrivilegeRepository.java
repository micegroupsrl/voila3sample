package it.micegroup.voila3sample.repository.security;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.security.Privilege;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface PrivilegeRepository extends BaseRepository<Privilege, Integer> {

	/**
	 * Finds all Privilege following the specification in input and return them in a
	 * Page
	 */

	@Override
	Page<Privilege> findAll(Specification<Privilege> spec, Pageable pageable);

	/**
	 * Finds, if present, a Privilege by its id
	 */

	Optional<Privilege> findByPrivilegeId(Integer id);

}
