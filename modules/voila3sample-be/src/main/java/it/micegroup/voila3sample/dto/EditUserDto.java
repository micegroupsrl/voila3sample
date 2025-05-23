package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** Data transfer object for edit a data element of type User */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditUserDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3487781214L;

  /** Attribute userId of the entity User */
  private Long userId;

  /** Attribute email of the entity User */
  private String email;

  /** Attribute password of the entity User */
  private String password;

  /** Attribute username of the entity User */
  private String username;

  /** Collection of Edit Dto of RolePerUser, which is child of the entity User */
  private Collection<EditRolePerUserDto> theRolePerUser;
}
