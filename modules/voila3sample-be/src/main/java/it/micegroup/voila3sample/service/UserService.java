package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.security.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface UserService extends BaseEntityService<User, Long> {

	/**
	 * Print Pdf and Xlxs
	 */
	public byte[] printPdfReport(String objectKey);

	byte[] printXLSList(Specification<User> specification);

	/**
	 * Executes the bulk update of a User
	 * 
	 * @param user
	 * @return updated User
	 */
	User bulkUpdate(User user);

	/**
	 * Executes the update of an User
	 * 
	 * @param user
	 * @return User updated
	 */
	User update(User user);

	/**
	 * Deletes an User with the objectKey in input, if it exists
	 * 
	 * @param objectKey
	 * @return User deleted if it was present
	 */
	Optional<User> delete(String objectKey);

	/**
	 * Returns the Page of the User following the specification in input
	 * 
	 * @param specification
	 * @param pageable
	 * 
	 * @return Page of User
	 */
	Page<User> search(Specification<User> specification, Pageable pageable);

}
