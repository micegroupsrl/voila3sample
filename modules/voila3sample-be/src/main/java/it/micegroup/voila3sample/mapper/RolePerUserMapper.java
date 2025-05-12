package it.micegroup.voila3sample.mapper;

import it.micegroup.voila3sample.dto.EditRolePerUserDto;
import it.micegroup.voila3sample.dto.ViewRolePerUserDto;
import it.micegroup.voila3sample.domain.security.RolePerUser;
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
public interface RolePerUserMapper {
	/**
	 * Maps an EditRolePerUserDto to an entity getEntityClassName(aClass)/]
	 */

	@Mapping(source = "entityState", target = "entityState")
	RolePerUser map(EditRolePerUserDto rolePerUserDto);

	/**
	 * Maps an entity RolePerUser to a ViewRolePerUserDto
	 */
	ViewRolePerUserDto map(RolePerUser rolePerUser);

	/**
	 * Maps a Page<RolePerUser> to a Page<ViewRolePerUserDto>
	 */
	default Page<ViewRolePerUserDto> map(Page<RolePerUser> page) {
		return page.map(this::map);
	}

	/*
	 * Maps an Optional<RolePerUser> to an Optional<ViewRolePerUserDto>
	 */
	default Optional<ViewRolePerUserDto> map(Optional<RolePerUser> read) {
		return read.map(this::map);
	}
}
