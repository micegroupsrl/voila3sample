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
import it.micegroup.voila3sample.domain.Auditable;

import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.Column;

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
@Table(name = "cliente")
public class Cliente extends Persona implements Serializable {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 1182646175L;

	// ATTRIBUTES
	/**
	 * Attribute email
	 */
	@Column(name = "email", columnDefinition = "VARCHAR(80)")
	private String email;
	/**
	 * Attribute telefono
	 */
	@Column(name = "telefono", columnDefinition = "VARCHAR(80)")
	private String telefono;
	/**
	 * Attribute indirizzo
	 */
	@Column(name = "indirizzo", columnDefinition = "VARCHAR(80)")
	private String indirizzo;

	// PARENTS

	// CHILDREN
	/**
	 * Collection of child entity Ordine
	 */
	@OneToMany(mappedBy = "theCliente", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@ToString.Exclude
	private Collection<Ordine> theOrdine = new ArrayList<>();

	// CONSTRUCTORS
	/**
	 * Constructor of the class Cliente
	 */
	public Cliente(String objectKey) {
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
				ordine.setTheCliente(this);
			}
		}
		theOrdine = aOrdineList;
	}

	// ADD CHILD
	public void addOrdine(Ordine ordine) {
		theOrdine.add(ordine);
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
	@Override
	public String getObjectKey() {
		return thePersonaKey.getObjectKey();
	}

	/**
	 * Inizializza la parte identificativa chiamando il setter della chiave
	 * composita
	 *
	 */
	@Override
	public void setObjectKey(String key) {
		thePersonaKey.setObjectKey(key);
	}

	// OBJECT TITLE
	public String getObjectTitle() {
		StringBuilder output = new StringBuilder();
		output.append(getEmail());
		return output.toString();
	}

	// Equals / HashCode
	/**
	 * Overrides equals method to compare two Cliente objects
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
			return false;
		Cliente that = (Cliente) o;

		return thePersonaKey != null && Objects.equals(thePersonaKey, that.thePersonaKey);
	}

	/**
	 * Overrides hashCode method to compute hash code of Cliente object
	 */
	@Override
	public int hashCode() {
		return Objects.hash(thePersonaKey);
	}
}
