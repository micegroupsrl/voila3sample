package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.StatoOrdine;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface StatoOrdineRepository extends BaseRepository<StatoOrdine, Integer> {

  /** Finds all StatoOrdine following the specification in input and return them in a Page */
  @Override
  Page<StatoOrdine> findAll(Specification<StatoOrdine> spec, Pageable pageable);

  /** Finds, if present, a StatoOrdine by its id */
  Optional<StatoOrdine> findByIdStatoOrdine(Integer id);
}
