package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Data transfer object for edit a data element of type Fornitore */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditFornitoreDto extends EditPersonaDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3996161044L;

  /** Attribute piva of the entity Fornitore */
  private String piva;

  /** Collection of Edit Dto of Prodotto, which is child of the entity Fornitore */
  private Collection<EditProdottoDto> theProdotto;
}
