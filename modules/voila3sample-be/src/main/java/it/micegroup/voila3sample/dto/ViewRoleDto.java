package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type Role
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewRoleDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 872880077L;
	private String objectKey;
	private String objectTitle;

	/**
	 * Attribute roleId of the entity Role
	 */
	private String roleId;
	/**
	 * Attribute name of the entity Role
	 */
	private String name;

	/**
	 * ObjectKey of RoleRoleGroup, which is parent of the entity Role
	 */
	private String theRoleRoleGroupObjectKey;

	/**
	 * ObjectTitle of RoleRoleGroup, which is parent of the entity Role
	 */
	private String theRoleRoleGroupObjectTitle;
}
