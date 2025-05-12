package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.CategoriaOrdine;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface CategoriaOrdineRepository extends BaseRepository<CategoriaOrdine, Integer> {

	/**
	 * Finds all CategoriaOrdine following the specification in input and return
	 * them in a Page
	 */

	@Override
	Page<CategoriaOrdine> findAll(Specification<CategoriaOrdine> spec, Pageable pageable);

	/**
	 * Finds, if present, a CategoriaOrdine by its id
	 */

	Optional<CategoriaOrdine> findByIdCategoriaOrdine(Integer id);

}
