package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type Fornitore */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewFornitoreDto extends ViewPersonaDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3996161044L;
  private String objectTitle;

  /** Attribute piva of the entity Fornitore */
  private String piva;
}
