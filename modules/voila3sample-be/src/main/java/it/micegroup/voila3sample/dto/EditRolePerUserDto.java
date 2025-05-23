package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.NotNull;

/** Data transfer object for edit a data element of type RolePerUser */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditRolePerUserDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 904528529L;

  /** ObjectKey of Role, which is parent of the entity RolePerUser */
  @NotNull private String theRoleObjectKey;

  /** ObjectKey of User, which is parent of the entity RolePerUser */
  @NotNull private String theUserObjectKey;
}
