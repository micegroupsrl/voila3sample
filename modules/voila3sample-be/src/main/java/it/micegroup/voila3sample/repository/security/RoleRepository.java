package it.micegroup.voila3sample.repository.security;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.security.Role;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface RoleRepository extends BaseRepository<Role, String> {

  /** Finds all Role following the specification in input and return them in a Page */
  @EntityGraph(value = Role.DEFAULT_ENTITY_GRAPH)
  @Override
  Page<Role> findAll(Specification<Role> spec, Pageable pageable);

  /** Finds, if present, a Role by its id */
  @EntityGraph(value = Role.DEFAULT_ENTITY_GRAPH)
  Optional<Role> findByRoleId(String id);

  /** Finds all Role that are children of the TheRoleRoleGroup in input and return them in a Page */
  @EntityGraph(value = Role.DEFAULT_ENTITY_GRAPH)
  Page<Role> findByTheRoleRoleGroup(Role parentEntity, Pageable pageable);
}
