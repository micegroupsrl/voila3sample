package it.micegroup.voila3sample.mapper;

import it.micegroup.voila3sample.dto.EditRoleDto;
import it.micegroup.voila3sample.dto.ViewRoleDto;
import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.domain.security.PrivilegePerRole;
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
public interface RoleMapper {
	/**
	 * Maps an EditRoleDto to an entity getEntityClassName(aClass)/]
	 */

	@Mapping(source = "entityState", target = "entityState")
	Role map(EditRoleDto roleDto);

	/**
	 * Maps an entity Role to a ViewRoleDto
	 */
	ViewRoleDto map(Role role);

	/**
	 * Maps a Page<Role> to a Page<ViewRoleDto>
	 */
	default Page<ViewRoleDto> map(Page<Role> page) {
		return page.map(this::map);
	}

	/*
	 * Maps an Optional<Role> to an Optional<ViewRoleDto>
	 */
	default Optional<ViewRoleDto> map(Optional<Role> read) {
		return read.map(this::map);
	}

	/**
	 * After mapping a Role, it propagates the object key of the entity in each
	 * child
	 */
	@AfterMapping
	default void propagateKeyInChildren(@MappingTarget Role bean) {
		String key = bean.getObjectKey();
		if (bean.getThePrivilegePerRole() != null) {
			for (PrivilegePerRole item : bean.getThePrivilegePerRole()) {
				item.setTheRoleObjectKey(key);
			}
		}
		if (bean.getTheRolePerUser() != null) {
			for (RolePerUser item : bean.getTheRolePerUser()) {
				item.setTheRoleObjectKey(key);
			}
		}
		if (bean.getTheRoleRoleChild() != null) {
			for (Role item : bean.getTheRoleRoleChild()) {
				item.setTheRoleRoleGroupObjectKey(key);
			}
		}
	}
}
