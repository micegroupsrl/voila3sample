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

@Getter
@Setter
@Embeddable
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class TipoOrdineKey extends BaseEntity implements Serializable {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3311609750L;

	// ATTRIBUTES
	/**
	 * Inner id idTipoOrdine
	 */
	@Column(name = "id_tipo_ordine", columnDefinition = "INTEGER")
	private Integer idTipoOrdine;
	/**
	 * Inner id annoTipologia
	 */
	@Column(name = "anno_tipologia", columnDefinition = "INTEGER")
	private Integer annoTipologia;
	/**
	 * Id idCategoriaOrdine of CategoriaOrdine
	 */
	@Column(name = "id_categoria_ordine", columnDefinition = "INTEGER")
	private Integer idCategoriaOrdine;
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
		output.append(getIdTipoOrdine());
		output.append(getRowIdFieldDelimiter());
		output.append(getAnnoTipologia());
		output.append(getRowIdFieldDelimiter());
		output.append(getIdCategoriaOrdine());
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
		setIdTipoOrdine(getIntegerCheckedAgainstNullContent(array[ctr++]));
		setAnnoTipologia(getIntegerCheckedAgainstNullContent(array[ctr++]));
		setIdCategoriaOrdine(getIntegerCheckedAgainstNullContent(array[ctr]));
	}
}
