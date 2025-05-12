package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type RolePerUser
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewRolePerUserDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 904528529L;
	private String objectKey;
	private String objectTitle;

	/**
	 * ObjectKey of Role, which is parent of the entity RolePerUser
	 */
	private String theRoleObjectKey;

	/**
	 * ObjectTitle of Role, which is parent of the entity RolePerUser
	 */
	private String theRoleObjectTitle;
	/**
	 * ObjectKey of User, which is parent of the entity RolePerUser
	 */
	private String theUserObjectKey;

	/**
	 * ObjectTitle of User, which is parent of the entity RolePerUser
	 */
	private String theUserObjectTitle;
}
