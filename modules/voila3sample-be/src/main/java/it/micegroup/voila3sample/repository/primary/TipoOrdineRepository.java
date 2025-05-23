package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.TipoOrdine;

import it.micegroup.voila3sample.domain.primary.TipoOrdineKey;

import it.micegroup.voila3sample.domain.primary.CategoriaOrdine;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface TipoOrdineRepository extends BaseRepository<TipoOrdine, TipoOrdineKey> {

  /** Finds all TipoOrdine following the specification in input and return them in a Page */
  @EntityGraph(value = TipoOrdine.DEFAULT_ENTITY_GRAPH)
  @Override
  Page<TipoOrdine> findAll(Specification<TipoOrdine> spec, Pageable pageable);

  /** Finds, if present, a TipoOrdine by its id */
  @EntityGraph(value = TipoOrdine.DEFAULT_ENTITY_GRAPH)
  Optional<TipoOrdine> findByTheTipoOrdineKey(TipoOrdineKey id);

  /**
   * Finds all TipoOrdine that are children of the TheCategoriaOrdine in input and return them in a
   * Page
   */
  @EntityGraph(value = TipoOrdine.DEFAULT_ENTITY_GRAPH)
  Page<TipoOrdine> findByTheCategoriaOrdine(CategoriaOrdine parentEntity, Pageable pageable);
}
