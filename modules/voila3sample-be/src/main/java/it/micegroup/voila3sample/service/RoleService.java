package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.security.Role;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface RoleService extends BaseEntityService<Role, String> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<Role> specification);

  /**
   * Executes the bulk update of a Role
   *
   * @param role
   * @return updated Role
   */
  Role bulkUpdate(Role role);

  /**
   * Executes the update of an Role
   *
   * @param role
   * @return Role updated
   */
  Role update(Role role);

  /**
   * Deletes an Role with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return Role deleted if it was present
   */
  Optional<Role> delete(String objectKey);

  /**
   * Returns the Page of the Role following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of Role
   */
  Page<Role> search(Specification<Role> specification, Pageable pageable);
}
