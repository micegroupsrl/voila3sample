package it.micegroup.voila3sample.repository.security;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.security.RolePerUser;

import it.micegroup.voila3sample.domain.security.RolePerUserKey;

import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.domain.security.User;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface RolePerUserRepository extends BaseRepository<RolePerUser, RolePerUserKey> {

	/**
	 * Finds all RolePerUser following the specification in input and return them in
	 * a Page
	 */
	@EntityGraph(value = RolePerUser.DEFAULT_ENTITY_GRAPH)
	@Override
	Page<RolePerUser> findAll(Specification<RolePerUser> spec, Pageable pageable);

	/**
	 * Finds, if present, a RolePerUser by its id
	 */
	@EntityGraph(value = RolePerUser.DEFAULT_ENTITY_GRAPH)
	Optional<RolePerUser> findByTheRolePerUserKey(RolePerUserKey id);

	/**
	 * Finds all RolePerUser that are children of the TheRole in input and return
	 * them in a Page
	 */
	@EntityGraph(value = RolePerUser.DEFAULT_ENTITY_GRAPH)
	Page<RolePerUser> findByTheRole(Role parentEntity, Pageable pageable);

	/**
	 * Finds all RolePerUser that are children of the TheUser in input and return
	 * them in a Page
	 */
	@EntityGraph(value = RolePerUser.DEFAULT_ENTITY_GRAPH)
	Page<RolePerUser> findByTheUser(User parentEntity, Pageable pageable);

}
