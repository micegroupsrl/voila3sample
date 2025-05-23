package it.micegroup.voila3sample.service;

import it.micegroup.voila3sample.domain.primary.Cliente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import it.micegroup.voila3sample.domain.primary.PersonaKey;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

public interface ClienteService extends BaseEntityService<Cliente, PersonaKey> {

  /** Print Pdf and Xlxs */
  public byte[] printPdfReport(String objectKey);

  byte[] printXLSList(Specification<Cliente> specification);

  /**
   * Executes the bulk update of a Cliente
   *
   * @param cliente
   * @return updated Cliente
   */
  Cliente bulkUpdate(Cliente cliente);

  /**
   * Executes the update of an Cliente
   *
   * @param cliente
   * @return Cliente updated
   */
  Cliente update(Cliente cliente);

  /**
   * Deletes an Cliente with the objectKey in input, if it exists
   *
   * @param objectKey
   * @return Cliente deleted if it was present
   */
  Optional<Cliente> delete(String objectKey);

  /**
   * Returns the Page of the Cliente following the specification in input
   *
   * @param specification
   * @param pageable
   * @return Page of Cliente
   */
  Page<Cliente> search(Specification<Cliente> specification, Pageable pageable);
}
