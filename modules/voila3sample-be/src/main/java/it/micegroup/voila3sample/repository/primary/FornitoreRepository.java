package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.Fornitore;

import it.micegroup.voila3sample.domain.primary.PersonaKey;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface FornitoreRepository extends BaseRepository<Fornitore, PersonaKey> {

  /** Finds all Fornitore following the specification in input and return them in a Page */
  @Override
  Page<Fornitore> findAll(Specification<Fornitore> spec, Pageable pageable);

  /** Finds, if present, a Fornitore by its id */
  Optional<Fornitore> findByThePersonaKey(PersonaKey id);
}
