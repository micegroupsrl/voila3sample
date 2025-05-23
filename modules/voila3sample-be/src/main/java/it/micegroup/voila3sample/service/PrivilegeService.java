package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.security.Privilege;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface PrivilegeService extends BaseEntityService<Privilege, Long> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<Privilege> specification);

  /**
   * Executes the bulk update of a Privilege
   *
   * @param privilege
   * @return updated Privilege
   */
  Privilege bulkUpdate(Privilege privilege);

  /**
   * Executes the update of an Privilege
   *
   * @param privilege
   * @return Privilege updated
   */
  Privilege update(Privilege privilege);

  /**
   * Deletes an Privilege with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return Privilege deleted if it was present
   */
  Optional<Privilege> delete(String objectKey);

  /**
   * Returns the Page of the Privilege following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of Privilege
   */
  Page<Privilege> search(Specification<Privilege> specification, Pageable pageable);
}
