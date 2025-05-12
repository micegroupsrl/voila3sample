package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type Prodotto
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewProdottoDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3304107774L;
	private String objectKey;
	private String objectTitle;

	/**
	 * Attribute idProdotto of the entity Prodotto
	 */
	private Integer idProdotto;
	/**
	 * Attribute nomeProdotto of the entity Prodotto
	 */
	private String nomeProdotto;

}
