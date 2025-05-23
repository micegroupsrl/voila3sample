package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.RigaOrdine;

import it.micegroup.voila3sample.domain.primary.RigaOrdineKey;

import it.micegroup.voila3sample.domain.primary.Ordine;
import it.micegroup.voila3sample.domain.primary.Prodotto;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface RigaOrdineRepository extends BaseRepository<RigaOrdine, RigaOrdineKey> {

  /** Finds all RigaOrdine following the specification in input and return them in a Page */
  @EntityGraph(value = RigaOrdine.DEFAULT_ENTITY_GRAPH)
  @Override
  Page<RigaOrdine> findAll(Specification<RigaOrdine> spec, Pageable pageable);

  /** Finds, if present, a RigaOrdine by its id */
  @EntityGraph(value = RigaOrdine.DEFAULT_ENTITY_GRAPH)
  Optional<RigaOrdine> findByTheRigaOrdineKey(RigaOrdineKey id);

  /** Finds all RigaOrdine that are children of the TheOrdine in input and return them in a Page */
  @EntityGraph(value = RigaOrdine.DEFAULT_ENTITY_GRAPH)
  Page<RigaOrdine> findByTheOrdine(Ordine parentEntity, Pageable pageable);

  /**
   * Finds all RigaOrdine that are children of the TheProdotto in input and return them in a Page
   */
  @EntityGraph(value = RigaOrdine.DEFAULT_ENTITY_GRAPH)
  Page<RigaOrdine> findByTheProdotto(Prodotto parentEntity, Pageable pageable);
}
