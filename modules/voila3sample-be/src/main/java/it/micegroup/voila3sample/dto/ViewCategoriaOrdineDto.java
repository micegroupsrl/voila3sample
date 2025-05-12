package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type CategoriaOrdine
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewCategoriaOrdineDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3909291428L;
	private String objectKey;
	private String objectTitle;

	/**
	 * Attribute idCategoriaOrdine of the entity CategoriaOrdine
	 */
	private Integer idCategoriaOrdine;

}
