package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type PrivilegePerRole */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewPrivilegePerRoleDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3511215419L;
  private String objectKey;
  private String objectTitle;

  /** ObjectKey of Role, which is parent of the entity PrivilegePerRole */
  private String theRoleObjectKey;

  /** ObjectTitle of Role, which is parent of the entity PrivilegePerRole */
  private String theRoleObjectTitle;

  /** ObjectKey of Privilege, which is parent of the entity PrivilegePerRole */
  private String thePrivilegeObjectKey;

  /** ObjectTitle of Privilege, which is parent of the entity PrivilegePerRole */
  private String thePrivilegeObjectTitle;
}
