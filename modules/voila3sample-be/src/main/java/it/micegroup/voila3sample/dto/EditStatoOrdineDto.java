package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** Data transfer object for edit a data element of type StatoOrdine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditStatoOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 1393726566L;

  /** Attribute idStatoOrdine of the entity StatoOrdine */
  @NotNull private Integer idStatoOrdine;

  /** Attribute descrizione of the entity StatoOrdine */
  private String descrizione;

  /** Collection of Edit Dto of Ordine, which is child of the entity StatoOrdine */
  private Collection<EditOrdineDto> theOrdine;
}
