package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type User
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewUserDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3487781214L;
	private String objectKey;
	private String objectTitle;

	/**
	 * Attribute userId of the entity User
	 */
	private Long userId;
	/**
	 * Attribute email of the entity User
	 */
	private String email;
	/**
	 * Attribute password of the entity User
	 */
	private String password;
	/**
	 * Attribute username of the entity User
	 */
	private String username;

}
