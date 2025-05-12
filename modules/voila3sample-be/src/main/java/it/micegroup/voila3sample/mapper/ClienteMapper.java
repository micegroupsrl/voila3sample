package it.micegroup.voila3sample.mapper;

import it.micegroup.voila3sample.dto.EditClienteDto;
import it.micegroup.voila3sample.dto.ViewClienteDto;
import it.micegroup.voila3sample.domain.primary.Cliente;
import it.micegroup.voila3sample.domain.primary.Ordine;
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
public interface ClienteMapper {
	/**
	 * Maps an EditClienteDto to an entity getEntityClassName(aClass)/]
	 */

	@Mapping(source = "entityState", target = "entityState")
	Cliente map(EditClienteDto clienteDto);

	/**
	 * Maps an entity Cliente to a ViewClienteDto
	 */
	ViewClienteDto map(Cliente cliente);

	/**
	 * Maps a Page<Cliente> to a Page<ViewClienteDto>
	 */
	default Page<ViewClienteDto> map(Page<Cliente> page) {
		return page.map(this::map);
	}

	/*
	 * Maps an Optional<Cliente> to an Optional<ViewClienteDto>
	 */
	default Optional<ViewClienteDto> map(Optional<Cliente> read) {
		return read.map(this::map);
	}

	/**
	 * After mapping a Cliente, it propagates the object key of the entity in each
	 * child
	 */
	@AfterMapping
	default void propagateKeyInChildren(@MappingTarget Cliente bean) {
		String key = bean.getObjectKey();
		if (bean.getTheOrdine() != null) {
			for (Ordine item : bean.getTheOrdine()) {
				item.setTheClienteObjectKey(key);
			}
		}
	}
}
