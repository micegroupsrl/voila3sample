package it.micegroup.voila3sample.repository.security;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.security.PrivilegePerRole;

import it.micegroup.voila3sample.domain.security.PrivilegePerRoleKey;

import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.domain.security.Privilege;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface PrivilegePerRoleRepository extends BaseRepository<PrivilegePerRole, PrivilegePerRoleKey> {

	/**
	 * Finds all PrivilegePerRole following the specification in input and return
	 * them in a Page
	 */
	@EntityGraph(value = PrivilegePerRole.DEFAULT_ENTITY_GRAPH)
	@Override
	Page<PrivilegePerRole> findAll(Specification<PrivilegePerRole> spec, Pageable pageable);

	/**
	 * Finds, if present, a PrivilegePerRole by its id
	 */
	@EntityGraph(value = PrivilegePerRole.DEFAULT_ENTITY_GRAPH)
	Optional<PrivilegePerRole> findByThePrivilegePerRoleKey(PrivilegePerRoleKey id);

	/**
	 * Finds all PrivilegePerRole that are children of the TheRole in input and
	 * return them in a Page
	 */
	@EntityGraph(value = PrivilegePerRole.DEFAULT_ENTITY_GRAPH)
	Page<PrivilegePerRole> findByTheRole(Role parentEntity, Pageable pageable);

	/**
	 * Finds all PrivilegePerRole that are children of the ThePrivilege in input and
	 * return them in a Page
	 */
	@EntityGraph(value = PrivilegePerRole.DEFAULT_ENTITY_GRAPH)
	Page<PrivilegePerRole> findByThePrivilege(Privilege parentEntity, Pageable pageable);

}
