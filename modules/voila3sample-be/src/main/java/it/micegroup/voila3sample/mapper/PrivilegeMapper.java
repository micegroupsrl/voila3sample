package it.micegroup.voila3sample.mapper;

import it.micegroup.voila3sample.dto.EditPrivilegeDto;
import it.micegroup.voila3sample.dto.ViewPrivilegeDto;
import it.micegroup.voila3sample.domain.security.Privilege;
import it.micegroup.voila3sample.domain.security.PrivilegePerRole;
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
public interface PrivilegeMapper {
	/**
	 * Maps an EditPrivilegeDto to an entity getEntityClassName(aClass)/]
	 */

	@Mapping(source = "entityState", target = "entityState")
	Privilege map(EditPrivilegeDto privilegeDto);

	/**
	 * Maps an entity Privilege to a ViewPrivilegeDto
	 */
	ViewPrivilegeDto map(Privilege privilege);

	/**
	 * Maps a Page<Privilege> to a Page<ViewPrivilegeDto>
	 */
	default Page<ViewPrivilegeDto> map(Page<Privilege> page) {
		return page.map(this::map);
	}

	/*
	 * Maps an Optional<Privilege> to an Optional<ViewPrivilegeDto>
	 */
	default Optional<ViewPrivilegeDto> map(Optional<Privilege> read) {
		return read.map(this::map);
	}

	/**
	 * After mapping a Privilege, it propagates the object key of the entity in each
	 * child
	 */
	@AfterMapping
	default void propagateKeyInChildren(@MappingTarget Privilege bean) {
		String key = bean.getObjectKey();
		if (bean.getThePrivilegePerRole() != null) {
			for (PrivilegePerRole item : bean.getThePrivilegePerRole()) {
				item.setThePrivilegeObjectKey(key);
			}
		}
	}
}
