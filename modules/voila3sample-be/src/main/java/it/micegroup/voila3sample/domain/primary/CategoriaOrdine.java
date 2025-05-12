package it.micegroup.voila3sample.domain.primary;

import java.io.Serializable;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.ToString;
import jakarta.persistence.Table;
import org.apache.commons.lang3.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import java.util.Objects;
import jakarta.persistence.Entity;
import it.micegroup.voila3sample.domain.BaseEntity;

import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;

import jakarta.persistence.Id;

import jakarta.persistence.FetchType;

import java.util.Collection;
import java.util.ArrayList;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "categoria_ordine")
public class CategoriaOrdine extends BaseEntity implements Serializable {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3909291428L;

	// ATTRIBUTES
	/**
	 * Attribute idCategoriaOrdine
	 */
	@Id
	@NotNull

	@Column(name = "id_categoria_ordine", columnDefinition = "INTEGER")
	private Integer idCategoriaOrdine;

	// PARENTS

	// CHILDREN
	/**
	 * Collection of child entity TipoOrdine: Tipologia di Ordine
	 */
	@OneToMany(mappedBy = "theCategoriaOrdine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@ToString.Exclude
	private Collection<TipoOrdine> theTipoOrdine = new ArrayList<>();

	// CONSTRUCTORS
	/**
	 * Constructor of the class CategoriaOrdine
	 */
	public CategoriaOrdine(String objectKey) {
		super();
		setObjectKey(objectKey);
	}

	// CHILD GETTER/SETTER
	/**
	 * Get collection of the child TipoOrdine
	 *
	 * @return the TipoOrdine
	 */
	public Collection<TipoOrdine> getTheTipoOrdine() {
		return theTipoOrdine;
	}

	/**
	 * Set the value of the collection of the child TipoOrdine
	 *
	 * @param aTipoOrdineList to set
	 */
	public void setTheTipoOrdine(Collection<TipoOrdine> aTipoOrdineList) {
		if (aTipoOrdineList != null) {
			for (TipoOrdine tipoOrdine : aTipoOrdineList) {
				tipoOrdine.setTheCategoriaOrdine(this);
			}
		}
		theTipoOrdine = aTipoOrdineList;
	}

	// ADD CHILD
	public void addTipoOrdine(TipoOrdine tipoOrdine) {
		theTipoOrdine.add(tipoOrdine);
	}

	// PARENT GETTER/SETTER

	// PARENT ID GETTER/SETTER

	// PARENT OBJECT TITLE

	// PARENT OBJECT KEY

	// OBJECT KEY
	/**
	 * Restituisce l'identificativo della chiave in formato stringa. Ritorna
	 * conveniente nelle selezioni da lista.
	 * 
	 * @return L'identificativo della chiave in formato pk1||pk2||pk3...
	 */
	public String getObjectKey() {
		StringBuilder objectKey = new StringBuilder();
		objectKey.append(getIdCategoriaOrdine());
		return objectKey.toString();
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
		setIdCategoriaOrdine(getIntegerCheckedAgainstNullContent(array[ctr]));
	}

	// OBJECT TITLE
	public String getObjectTitle() {
		StringBuilder output = new StringBuilder();
		output.append(getObjectKey());
		return output.toString();
	}

	// Equals / HashCode
	/**
	 * Overrides equals method to compare two CategoriaOrdine objects
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
			return false;
		CategoriaOrdine that = (CategoriaOrdine) o;

		return idCategoriaOrdine != null && Objects.equals(idCategoriaOrdine, that.idCategoriaOrdine);
	}

	/**
	 * Overrides hashCode method to compute hash code of CategoriaOrdine object
	 */
	@Override
	public int hashCode() {
		return Objects.hash(idCategoriaOrdine);
	}
}
