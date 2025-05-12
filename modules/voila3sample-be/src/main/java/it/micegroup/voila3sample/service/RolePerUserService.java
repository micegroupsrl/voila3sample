package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.security.RolePerUser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.security.RolePerUserKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface RolePerUserService extends BaseEntityService<RolePerUser, RolePerUserKey> {

	/**
	 * Print Pdf and Xlxs
	 */
	public byte[] printPdfReport(String objectKey);

	byte[] printXLSList(Specification<RolePerUser> specification);

	/**
	 * Executes the bulk update of a RolePerUser
	 * 
	 * @param rolePerUser
	 * @return updated RolePerUser
	 */
	RolePerUser bulkUpdate(RolePerUser rolePerUser);

	/**
	 * Executes the update of an RolePerUser
	 * 
	 * @param rolePerUser
	 * @return RolePerUser updated
	 */
	RolePerUser update(RolePerUser rolePerUser);

	/**
	 * Deletes an RolePerUser with the objectKey in input, if it exists
	 * 
	 * @param objectKey
	 * @return RolePerUser deleted if it was present
	 */
	Optional<RolePerUser> delete(String objectKey);

	/**
	 * Returns the Page of the RolePerUser following the specification in input
	 * 
	 * @param specification
	 * @param pageable
	 * 
	 * @return Page of RolePerUser
	 */
	Page<RolePerUser> search(Specification<RolePerUser> specification, Pageable pageable);

}
