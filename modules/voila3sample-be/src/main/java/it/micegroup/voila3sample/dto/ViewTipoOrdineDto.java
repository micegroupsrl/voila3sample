package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type TipoOrdine
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewTipoOrdineDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3311609750L;
	private String objectKey;
	private String objectTitle;

	/**
	 * Attribute idTipoOrdine of the entity TipoOrdine
	 */
	private Integer idTipoOrdine;
	/**
	 * Attribute nomeOrdine of the entity TipoOrdine
	 */
	private String nomeOrdine;
	/**
	 * Attribute annoTipologia of the entity TipoOrdine
	 */
	private Integer annoTipologia;

	/**
	 * ObjectKey of CategoriaOrdine, which is parent of the entity TipoOrdine
	 */
	private String theCategoriaOrdineObjectKey;

	/**
	 * ObjectTitle of CategoriaOrdine, which is parent of the entity TipoOrdine
	 */
	private String theCategoriaOrdineObjectTitle;
}
