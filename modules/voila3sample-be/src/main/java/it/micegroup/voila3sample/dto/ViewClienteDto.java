package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type Cliente */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewClienteDto extends ViewPersonaDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3563635956L;
  private String objectTitle;

  /** Attribute punti of the entity Cliente */
  private Integer punti;
}
