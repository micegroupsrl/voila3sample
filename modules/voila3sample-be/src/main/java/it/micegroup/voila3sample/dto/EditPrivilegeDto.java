package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Data transfer object for edit a data element of type Privilege
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditPrivilegeDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 769416586L;

	/**
	 * Attribute privilegeId of the entity Privilege
	 */
	@NotNull
	private Integer privilegeId;

	/**
	 * Attribute name of the entity Privilege
	 */
	private String name;

	/**
	 * Attribute description of the entity Privilege
	 */
	private String description;

	/**
	 * Collection of Edit Dto of PrivilegePerRole, which is child of the entity
	 * Privilege
	 */
	private Collection<EditPrivilegePerRoleDto> thePrivilegePerRole;
}
