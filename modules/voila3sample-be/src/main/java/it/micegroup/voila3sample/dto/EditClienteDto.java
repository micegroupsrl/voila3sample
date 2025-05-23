package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Data transfer object for edit a data element of type Cliente */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditClienteDto extends EditPersonaDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3563635956L;

  /** Attribute punti of the entity Cliente */
  private Integer punti;

  /** Collection of Edit Dto of Ordine, which is child of the entity Cliente */
  private Collection<EditOrdineDto> theOrdine;
}
