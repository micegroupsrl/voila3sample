package it.micegroup.voila3sample.repository.security;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.security.User;
import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {

	/**
	 * Finds all User following the specification in input and return them in a Page
	 */
	@Override
	Page<User> findAll(Specification<User> spec, Pageable pageable);

	/**
	 * Finds, if present, a User by its id
	 */
	Optional<User> findByUserId(Long id);

	/**
	 * Deletes the User with the id in input
	 */
	@Query("DELETE FROM User WHERE userId IN :ids")
	void deleteByIdIn(@Param("ids") Collection<Long> ids);

	/**
	 * Finds, if present, a User by its Username
	 */
	Optional<User> findByUsername(String username);

	/**
	 * Return if a User is present, searching its Username
	 */
	boolean existsByUsername(String username);

	/**
	 * Return if a User is present, searching its Email
	 */
	boolean existsByEmail(String email);

	/**
	 * Return the Privileges that a User have
	 */
	@Query("SELECT P.name FROM User as U JOIN RolePerUser AS RPU ON U.userId = RPU.theRolePerUserKey.userId JOIN PrivilegePerRole AS PPR ON RPU.theRolePerUserKey.roleId=PPR.thePrivilegePerRoleKey.roleId JOIN Privilege AS P ON P.privilegeId = PPR.thePrivilegePerRoleKey.privilegeId "
			+ "WHERE U.userId = :id")
	Collection<String> findPrivilegesByUser(@Param("id") Long id);
}
