package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.Ordine;

import it.micegroup.voila3sample.domain.primary.Cliente;
import it.micegroup.voila3sample.domain.primary.TipoOrdine;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface OrdineRepository extends BaseRepository<Ordine, Integer> {

	/**
	 * Finds all Ordine following the specification in input and return them in a
	 * Page
	 */
	@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
	@Override
	Page<Ordine> findAll(Specification<Ordine> spec, Pageable pageable);

	/**
	 * Finds, if present, a Ordine by its id
	 */
	@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
	Optional<Ordine> findByIdOrdine(Integer id);

	/**
	 * Finds all Ordine that are children of the TheCliente in input and return them
	 * in a Page
	 */
	@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
	Page<Ordine> findByTheCliente(Cliente parentEntity, Pageable pageable);

	/**
	 * Finds all Ordine that are children of the TheTipoOrdine in input and return
	 * them in a Page
	 */
	@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
	Page<Ordine> findByTheTipoOrdine(TipoOrdine parentEntity, Pageable pageable);

	/**
	 * Finds all Ordine that are children of the TheOrdineAggregato in input and
	 * return them in a Page
	 */
	@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
	Page<Ordine> findByTheOrdineAggregato(Ordine parentEntity, Pageable pageable);

}
