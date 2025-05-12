package it.micegroup.voila3sample.mapper;

import it.micegroup.voila3sample.dto.EditPrivilegePerRoleDto;
import it.micegroup.voila3sample.dto.ViewPrivilegePerRoleDto;
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
public interface PrivilegePerRoleMapper {
	/**
	 * Maps an EditPrivilegePerRoleDto to an entity getEntityClassName(aClass)/]
	 */

	@Mapping(source = "entityState", target = "entityState")
	PrivilegePerRole map(EditPrivilegePerRoleDto privilegePerRoleDto);

	/**
	 * Maps an entity PrivilegePerRole to a ViewPrivilegePerRoleDto
	 */
	ViewPrivilegePerRoleDto map(PrivilegePerRole privilegePerRole);

	/**
	 * Maps a Page<PrivilegePerRole> to a Page<ViewPrivilegePerRoleDto>
	 */
	default Page<ViewPrivilegePerRoleDto> map(Page<PrivilegePerRole> page) {
		return page.map(this::map);
	}

	/*
	 * Maps an Optional<PrivilegePerRole> to an Optional<ViewPrivilegePerRoleDto>
	 */
	default Optional<ViewPrivilegePerRoleDto> map(Optional<PrivilegePerRole> read) {
		return read.map(this::map);
	}
}
