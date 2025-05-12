package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Data transfer object for edit a data element of type TipoOrdine
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditTipoOrdineDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3311609750L;

	/**
	 * Attribute idTipoOrdine of the entity TipoOrdine
	 */
	@NotNull
	private Integer idTipoOrdine;

	/**
	 * Attribute nomeOrdine of the entity TipoOrdine
	 */
	private String nomeOrdine;

	/**
	 * Attribute annoTipologia of the entity TipoOrdine
	 */
	@NotNull
	private Integer annoTipologia;

	/**
	 * ObjectKey of CategoriaOrdine, which is parent of the entity TipoOrdine
	 */
	@NotNull
	private String theCategoriaOrdineObjectKey;

	/**
	 * Collection of Edit Dto of Ordine, which is child of the entity TipoOrdine
	 */
	private Collection<EditOrdineDto> theOrdine;
}
