package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Data transfer object for edit a data element of type Prodotto
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditProdottoDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3304107774L;

	/**
	 * Attribute idProdotto of the entity Prodotto
	 */
	private Integer idProdotto;

	/**
	 * Attribute nomeProdotto of the entity Prodotto
	 */
	private String nomeProdotto;

	/**
	 * Collection of Edit Dto of RigaOrdine, which is child of the entity Prodotto
	 */
	private Collection<EditRigaOrdineDto> theRigaOrdine;
}
