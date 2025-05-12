package it.micegroup.voila3sample.repository.primary;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import it.micegroup.voila3sample.domain.primary.Prodotto;

import it.micegroup.voila3sample.repository.BaseRepository;

@Repository
public interface ProdottoRepository extends BaseRepository<Prodotto, Integer> {

	/**
	 * Finds all Prodotto following the specification in input and return them in a
	 * Page
	 */

	@Override
	Page<Prodotto> findAll(Specification<Prodotto> spec, Pageable pageable);

	/**
	 * Finds, if present, a Prodotto by its id
	 */

	Optional<Prodotto> findByIdProdotto(Integer id);

}
