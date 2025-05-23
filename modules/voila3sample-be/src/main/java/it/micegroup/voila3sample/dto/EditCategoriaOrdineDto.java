package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;

/** Data transfer object for edit a data element of type CategoriaOrdine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditCategoriaOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 2765248766L;

  /** Attribute idCatOrdine of the entity CategoriaOrdine */
  @NotNull private Integer idCatOrdine;

  /** Collection of Edit Dto of TipoOrdine, which is child of the entity CategoriaOrdine */
  private Collection<EditTipoOrdineDto> theTipoOrdine;
}
