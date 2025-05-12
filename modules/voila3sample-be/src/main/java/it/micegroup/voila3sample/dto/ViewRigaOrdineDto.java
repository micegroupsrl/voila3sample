package it.micegroup.voila3sample.dto;

import java.math.BigDecimal;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type RigaOrdine
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewRigaOrdineDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 72740009L;
	private String objectKey;
	private String objectTitle;

	/**
	 * Attribute quantita of the entity RigaOrdine
	 */
	private BigDecimal quantita;

	/**
	 * ObjectKey of Prodotto, which is parent of the entity RigaOrdine
	 */
	private String theProdottoObjectKey;

	/**
	 * ObjectTitle of Prodotto, which is parent of the entity RigaOrdine
	 */
	private String theProdottoObjectTitle;
	/**
	 * ObjectKey of Ordine, which is parent of the entity RigaOrdine
	 */
	private String theOrdineObjectKey;

	/**
	 * ObjectTitle of Ordine, which is parent of the entity RigaOrdine
	 */
	private String theOrdineObjectTitle;
}
