package it.micegroup.voila3sample.mapper;

import it.micegroup.voila3sample.dto.EditUserDto;
import it.micegroup.voila3sample.dto.ViewUserDto;
import it.micegroup.voila3sample.domain.security.User;
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
public interface UserMapper {
	/**
	 * Maps an EditUserDto to an entity getEntityClassName(aClass)/]
	 */

	@Mapping(source = "entityState", target = "entityState")
	User map(EditUserDto userDto);

	/**
	 * Maps an entity User to a ViewUserDto
	 */
	ViewUserDto map(User user);

	/**
	 * Maps a Page<User> to a Page<ViewUserDto>
	 */
	default Page<ViewUserDto> map(Page<User> page) {
		return page.map(this::map);
	}

	/*
	 * Maps an Optional<User> to an Optional<ViewUserDto>
	 */
	default Optional<ViewUserDto> map(Optional<User> read) {
		return read.map(this::map);
	}

	/**
	 * After mapping a User, it propagates the object key of the entity in each
	 * child
	 */
	@AfterMapping
	default void propagateKeyInChildren(@MappingTarget User bean) {
		String key = bean.getObjectKey();
		if (bean.getTheRolePerUser() != null) {
			for (RolePerUser item : bean.getTheRolePerUser()) {
				item.setTheUserObjectKey(key);
			}
		}
	}
}
