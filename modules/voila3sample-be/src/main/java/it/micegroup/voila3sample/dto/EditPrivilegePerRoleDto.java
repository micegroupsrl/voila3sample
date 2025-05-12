package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.NotNull;

/**
 * Data transfer object for edit a data element of type PrivilegePerRole
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditPrivilegePerRoleDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3511215419L;

	/**
	 * ObjectKey of Role, which is parent of the entity PrivilegePerRole
	 */
	@NotNull
	private String theRoleObjectKey;

	/**
	 * ObjectKey of Privilege, which is parent of the entity PrivilegePerRole
	 */
	@NotNull
	private String thePrivilegeObjectKey;

}
