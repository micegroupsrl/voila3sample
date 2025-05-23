package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type StatoOrdine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewStatoOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 1393726566L;
  private String objectKey;
  private String objectTitle;

  /** Attribute idStatoOrdine of the entity StatoOrdine */
  private Integer idStatoOrdine;

  /** Attribute descrizione of the entity StatoOrdine */
  private String descrizione;
}
