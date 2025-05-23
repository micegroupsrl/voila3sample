package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type Privilege */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewPrivilegeDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 27188524L;
  private String objectKey;
  private String objectTitle;

  /** Attribute privilegeId of the entity Privilege */
  private Long privilegeId;

  /** Attribute name of the entity Privilege */
  private String name;

  /** Attribute description of the entity Privilege */
  private String description;
}
