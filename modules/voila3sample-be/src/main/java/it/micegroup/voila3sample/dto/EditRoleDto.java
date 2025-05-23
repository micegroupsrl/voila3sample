package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Data transfer object for edit a data element of type Role */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditRoleDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 872880077L;

  /** Attribute roleId of the entity Role */
  @NotBlank private String roleId;

  /** Attribute name of the entity Role */
  private String name;

  /** ObjectKey of RoleRoleGroup, which is parent of the entity Role */
  private String theRoleRoleGroupObjectKey;

  /** Collection of Edit Dto of PrivilegePerRole, which is child of the entity Role */
  private Collection<EditPrivilegePerRoleDto> thePrivilegePerRole;

  /** Collection of Edit Dto of RolePerUser, which is child of the entity Role */
  private Collection<EditRolePerUserDto> theRolePerUser;

  /** Collection of Edit Dto of Role, which is child of the entity Role */
  private Collection<EditRoleDto> theRoleRoleChild;
}
