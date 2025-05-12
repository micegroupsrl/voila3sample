package it.micegroup.voila3sample.domain.primary;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.lang3.StringUtils;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import it.micegroup.voila3sample.domain.BaseEntity;

import it.micegroup.voila2runtime.utils.EntityUtils;
import java.math.BigDecimal;

@Getter
@Setter
@Embeddable
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class RigaOrdineKey extends BaseEntity implements Serializable {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 72740009L;

	// ATTRIBUTES
	/**
	 * Id idProdotto of Prodotto
	 */
	@Column(name = "id_prodotto", columnDefinition = "INTEGER")
	private Integer idProdotto;

	/**
	 * Id idOrdine of Ordine
	 */
	@Column(name = "id_ordine", columnDefinition = "INTEGER")
	private Integer idOrdine;
	// Getter & Setter for parent entity attributes

	// Getter & Setter for Object Key
	/**
	 * Restituisce l'identificativo della chiave in formato stringa. Ritorna
	 * conveniente nelle selezioni da lista.
	 * 
	 * @return L'identificativo della chiave in formato pk1||pk2||pk3...
	 */
	public String getObjectKey() {
		StringBuilder output = new StringBuilder();
		output.append(getIdProdotto());
		output.append(getRowIdFieldDelimiter());
		output.append(getIdOrdine());
		return output.toString();
	}

	/**
	 * Inizializza la parte identificativa del bean in base alla stringa tokenizzata
	 * da "||" fornita in input.
	 * 
	 * @param key L'identificativo della chiave in formato pk1||pk2||pk3...
	 */
	public void setObjectKey(String key) {
		if (key == null || key.trim().length() == 0) {
			return;
		}
		String[] array = StringUtils.splitByWholeSeparatorPreserveAllTokens(key, getRowIdFieldDelimiter());
		int ctr = 0;
		setIdProdotto(getIntegerCheckedAgainstNullContent(array[ctr++]));
		setIdOrdine(getIntegerCheckedAgainstNullContent(array[ctr]));
	}
}
