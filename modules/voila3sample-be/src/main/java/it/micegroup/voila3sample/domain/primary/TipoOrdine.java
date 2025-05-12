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
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.Column;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.MapsId;

import jakarta.persistence.JoinColumn;

import it.micegroup.voila2runtime.utils.EntityUtils;

import jakarta.persistence.FetchType;

import java.util.Collection;
import java.util.ArrayList;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

/**
 * Tipologia di Ordine
 */
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "tipo_ordine")
@NamedEntityGraph(name = TipoOrdine.DEFAULT_ENTITY_GRAPH, attributeNodes = {
		@NamedAttributeNode(TipoOrdine_.THE_CATEGORIA_ORDINE) })
public class TipoOrdine extends BaseEntity implements Serializable {

	public static final String DEFAULT_ENTITY_GRAPH = "EG.TipoOrdine";

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3311609750L;

	// COMPOSITE PRIMARY KEY
	@EmbeddedId
	private TipoOrdineKey theTipoOrdineKey = new TipoOrdineKey();

	// ATTRIBUTES
	/**
	 * Attribute nomeOrdine
	 */
	@Column(name = "nome_ordine", columnDefinition = "VARCHAR(80)")
	private String nomeOrdine;

	// PARENTS
	/**
	 * Parent entity CategoriaOrdine
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@ToString.Exclude
	@JoinColumn(name = "id_categoria_ordine", referencedColumnName = "id_categoria_ordine", nullable = false, insertable = false, updatable = false)
	@MapsId("idCategoriaOrdine")
	private CategoriaOrdine theCategoriaOrdine;

	// CHILDREN
	/**
	 * Collection of child entity Ordine
	 */
	@OneToMany(mappedBy = "theTipoOrdine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@ToString.Exclude
	private Collection<Ordine> theOrdine = new ArrayList<>();

	// CONSTRUCTORS
	/**
	 * Constructor of the class TipoOrdine
	 */
	public TipoOrdine(String objectKey) {
		super();
		setObjectKey(objectKey);
	}

	// CHILD GETTER/SETTER
	/**
	 * Get collection of the child Ordine
	 *
	 * @return the Ordine
	 */
	public Collection<Ordine> getTheOrdine() {
		return theOrdine;
	}

	/**
	 * Set the value of the collection of the child Ordine
	 *
	 * @param aOrdineList to set
	 */
	public void setTheOrdine(Collection<Ordine> aOrdineList) {
		if (aOrdineList != null) {
			for (Ordine ordine : aOrdineList) {
				ordine.setTheTipoOrdine(this);
			}
		}
		theOrdine = aOrdineList;
	}

	// ADD CHILD
	public void addOrdine(Ordine ordine) {
		theOrdine.add(ordine);
	}

	// PARENT GETTER/SETTER
	/**
	 * Get the property Id Categoria Ordine of the composite key
	 *
	 * @return the Id Categoria Ordine
	 */
	public Integer getIdCategoriaOrdine() {
		return theTipoOrdineKey.getIdCategoriaOrdine();
	}

	/**
	 * Set the value of the property Id Categoria Ordine of the composite key
	 *
	 * @param aidCategoriaOrdine to set
	 */
	public void setIdCategoriaOrdine(Integer idCategoriaOrdine) {
		theTipoOrdineKey.setIdCategoriaOrdine(idCategoriaOrdine);
	}

	/**
	 * Get the property Id Tipo Ordine of the internal composite key
	 *
	 * @return the Id Tipo Ordine
	 */
	public Integer getIdTipoOrdine() {
		return theTipoOrdineKey.getIdTipoOrdine();
	}

	/**
	 * Set the value of the property Id Tipo Ordine of the internal composite key
	 *
	 * @param idTipoOrdine the Id Tipo Ordine to set
	 */
	public void setIdTipoOrdine(Integer idTipoOrdine) {
		theTipoOrdineKey.setIdTipoOrdine(idTipoOrdine);
	}

	/**
	 * Get the property Anno Tipologia of the internal composite key
	 *
	 * @return the Anno Tipologia
	 */
	public Integer getAnnoTipologia() {
		return theTipoOrdineKey.getAnnoTipologia();
	}

	/**
	 * Set the value of the property Anno Tipologia of the internal composite key
	 *
	 * @param annoTipologia the Anno Tipologia to set
	 */
	public void setAnnoTipologia(Integer annoTipologia) {
		theTipoOrdineKey.setAnnoTipologia(annoTipologia);
	}

	// PARENT ID GETTER/SETTER

	// PARENT OBJECT TITLE
	/**
	 * Return the object title of theCategoriaOrdine.
	 * 
	 * @return the object title of theCategoriaOrdine.
	 */
	public String getTheCategoriaOrdineObjectTitle() {
		return getTheCategoriaOrdine() != null ? getTheCategoriaOrdine().getObjectTitle() : null;
	}

	// PARENT OBJECT KEY
	/**
	 * Return the object key of theCategoriaOrdine.
	 * 
	 * @return the object key of theCategoriaOrdine.
	 */
	@ToString.Include
	public String getTheCategoriaOrdineObjectKey() {
		return getTheCategoriaOrdine() != null ? getTheCategoriaOrdine().getObjectKey() : null;
	}

	/**
	 * Set object key of theCategoriaOrdine.
	 * 
	 * @param objectKey to set
	 */
	public void setTheCategoriaOrdineObjectKey(String objectKey) {
		if (EntityUtils.isValueChanged(getTheCategoriaOrdineObjectKey(), objectKey, false)) {
			CategoriaOrdine categoriaOrdine = new CategoriaOrdine();
			categoriaOrdine.setObjectKey(objectKey);
			setTheCategoriaOrdine(categoriaOrdine);
		}
		if (getTheCategoriaOrdine() != null) {
			theTipoOrdineKey.setIdCategoriaOrdine(getTheCategoriaOrdine().getIdCategoriaOrdine());
		}
	}

	// OBJECT KEY
	/**
	 * Restituisce l'identificativo della chiave composita in formato stringa
	 *
	 */
	public String getObjectKey() {
		return theTipoOrdineKey.getObjectKey();
	}

	/**
	 * Inizializza la parte identificativa chiamando il setter della chiave
	 * composita
	 *
	 */
	public void setObjectKey(String key) {
		theTipoOrdineKey.setObjectKey(key);
	}

	// OBJECT TITLE
	public String getObjectTitle() {
		StringBuilder output = new StringBuilder();
		output.append(getNomeOrdine());
		return output.toString();
	}

	// Equals / HashCode
	/**
	 * Overrides equals method to compare two TipoOrdine objects
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
			return false;
		TipoOrdine that = (TipoOrdine) o;

		return theTipoOrdineKey != null && Objects.equals(theTipoOrdineKey, that.theTipoOrdineKey);
	}

	/**
	 * Overrides hashCode method to compute hash code of TipoOrdine object
	 */
	@Override
	public int hashCode() {
		return Objects.hash(theTipoOrdineKey);
	}
}
