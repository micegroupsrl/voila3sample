package it.micegroup.voila3sample.dto;

import java.math.BigDecimal;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type RigaOrdine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewRigaOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 102029107L;
  private String objectKey;
  private String objectTitle;

  /** Attribute qta of the entity RigaOrdine */
  private BigDecimal qta;

  /** ObjectKey of Ordine, which is parent of the entity RigaOrdine */
  private String theOrdineObjectKey;

  /** ObjectTitle of Ordine, which is parent of the entity RigaOrdine */
  private String theOrdineObjectTitle;

  /** ObjectKey of Prodotto, which is parent of the entity RigaOrdine */
  private String theProdottoObjectKey;

  /** ObjectTitle of Prodotto, which is parent of the entity RigaOrdine */
  private String theProdottoObjectTitle;
}
