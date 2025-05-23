package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import jakarta.validation.constraints.NotNull;

/** Data transfer object for edit a data element of type RigaOrdine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditRigaOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 102029107L;

  /** Attribute qta of the entity RigaOrdine */
  private BigDecimal qta;

  /** ObjectKey of Ordine, which is parent of the entity RigaOrdine */
  @NotNull private String theOrdineObjectKey;

  /** ObjectKey of Prodotto, which is parent of the entity RigaOrdine */
  @NotNull private String theProdottoObjectKey;
}
