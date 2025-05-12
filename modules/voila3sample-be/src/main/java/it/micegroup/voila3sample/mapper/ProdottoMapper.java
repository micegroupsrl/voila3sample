package it.micegroup.voila3sample.mapper;

import it.micegroup.voila3sample.dto.EditProdottoDto;
import it.micegroup.voila3sample.dto.ViewProdottoDto;
import it.micegroup.voila3sample.domain.primary.Prodotto;
import it.micegroup.voila3sample.domain.primary.RigaOrdine;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import java.util.Optional;

/**
 * Interface used to map DTO Classes to Entity Classes. Usefull to manage object
 * transfered through this application.
 */
@Mapper
public interface ProdottoMapper {
	/**
	 * Maps an EditProdottoDto to an entity getEntityClassName(aClass)/]
	 */

	@Mapping(source = "entityState", target = "entityState")
	Prodotto map(EditProdottoDto prodottoDto);

	/**
	 * Maps an entity Prodotto to a ViewProdottoDto
	 */
	ViewProdottoDto map(Prodotto prodotto);

	/**
	 * Maps a Page<Prodotto> to a Page<ViewProdottoDto>
	 */
	default Page<ViewProdottoDto> map(Page<Prodotto> page) {
		return page.map(this::map);
	}

	/*
	 * Maps an Optional<Prodotto> to an Optional<ViewProdottoDto>
	 */
	default Optional<ViewProdottoDto> map(Optional<Prodotto> read) {
		return read.map(this::map);
	}

	/**
	 * After mapping a Prodotto, it propagates the object key of the entity in each
	 * child
	 */
	@AfterMapping
	default void propagateKeyInChildren(@MappingTarget Prodotto bean) {
		String key = bean.getObjectKey();
		if (bean.getTheRigaOrdine() != null) {
			for (RigaOrdine item : bean.getTheRigaOrdine()) {
				item.setTheProdottoObjectKey(key);
			}
		}
	}
}
