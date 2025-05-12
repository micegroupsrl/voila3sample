
package it.micegroup.voila3sample.repository;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.Ordine;

import it.micegroup.voila3sample.domain.Cliente;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface OrdineRepository extends BaseRepository<Ordine,> {

/**
* Finds all Ordine following the specification in input and return them
* in a Page
*/
@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
@Override
Page<Ordine> findAll(Specification<Ordine> spec, Pageable pageable);

/**
* Finds, if present, a Ordine by its id
*/
@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
Optional<Ordine> findByIdOrdine( id);

/**
* Finds all Ordine that are children of the TheCliente in input and return them
* in a Page
*/
@EntityGraph(value = Ordine.DEFAULT_ENTITY_GRAPH)
Page<Ordine> findByTheCliente(Cliente parentEntity, Pageable pageable);

}
