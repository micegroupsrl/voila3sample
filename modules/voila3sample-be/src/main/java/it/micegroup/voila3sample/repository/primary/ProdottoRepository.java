package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.Prodotto;

import it.micegroup.voila3sample.domain.primary.Fornitore;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface ProdottoRepository extends BaseRepository<Prodotto, Integer> {

  /** Finds all Prodotto following the specification in input and return them in a Page */
  @EntityGraph(value = Prodotto.DEFAULT_ENTITY_GRAPH)
  @Override
  Page<Prodotto> findAll(Specification<Prodotto> spec, Pageable pageable);

  /** Finds, if present, a Prodotto by its id */
  @EntityGraph(value = Prodotto.DEFAULT_ENTITY_GRAPH)
  Optional<Prodotto> findByIdProdotto(Integer id);

  /** Finds all Prodotto that are children of the TheFornitore in input and return them in a Page */
  @EntityGraph(value = Prodotto.DEFAULT_ENTITY_GRAPH)
  Page<Prodotto> findByTheFornitore(Fornitore parentEntity, Pageable pageable);
}
