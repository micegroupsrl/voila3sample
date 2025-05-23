package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.security.PrivilegePerRole;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.security.PrivilegePerRoleKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface PrivilegePerRoleService
    extends BaseEntityService<PrivilegePerRole, PrivilegePerRoleKey> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<PrivilegePerRole> specification);

  /**
   * Executes the bulk update of a PrivilegePerRole
   *
   * @param privilegePerRole
   * @return updated PrivilegePerRole
   */
  PrivilegePerRole bulkUpdate(PrivilegePerRole privilegePerRole);

  /**
   * Executes the update of an PrivilegePerRole
   *
   * @param privilegePerRole
   * @return PrivilegePerRole updated
   */
  PrivilegePerRole update(PrivilegePerRole privilegePerRole);

  /**
   * Deletes an PrivilegePerRole with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return PrivilegePerRole deleted if it was present
   */
  Optional<PrivilegePerRole> delete(String objectKey);

  /**
   * Returns the Page of the PrivilegePerRole following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of PrivilegePerRole
   */
  Page<PrivilegePerRole> search(Specification<PrivilegePerRole> specification, Pageable pageable);
}
