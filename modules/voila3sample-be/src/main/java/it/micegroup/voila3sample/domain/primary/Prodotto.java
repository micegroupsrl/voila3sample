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
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.Column;

import jakarta.persistence.Id;

import jakarta.persistence.JoinColumn;

import it.micegroup.voila2runtime.utils.EntityUtils;

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
@Table(name = "prodotto")
@NamedEntityGraph(
    name = Prodotto.DEFAULT_ENTITY_GRAPH,
    attributeNodes = {@NamedAttributeNode(Prodotto_.THE_FORNITORE)})
public class Prodotto extends Auditable implements Serializable {

  public static final String DEFAULT_ENTITY_GRAPH = "EG.Prodotto";

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 1332726154L;

  // ATTRIBUTES
  /** Attribute idProdotto */
  @Id
  @NotNull
  @Column(name = "id_prodotto", columnDefinition = "INTEGER")
  private Integer idProdotto;

  /** Attribute descrizione */
  @Column(name = "descrizione", columnDefinition = "VARCHAR(80)")
  private String descrizione;

  // PARENTS
  /** Parent entity Fornitore */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(name = "id_persona", referencedColumnName = "id_persona", nullable = true)
  @JoinColumn(name = "cf", referencedColumnName = "cf", nullable = true)
  private Fornitore theFornitore;

  // CHILDREN
  /** Collection of child entity RigaOrdine */
  @OneToMany(mappedBy = "theProdotto", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<RigaOrdine> theRigaOrdine = new ArrayList<>();

  // CONSTRUCTORS
  /** Constructor of the class Prodotto */
  public Prodotto(String objectKey) {
    super();
    setObjectKey(objectKey);
  }

  // CHILD GETTER/SETTER
  /**
   * Get collection of the child RigaOrdine
   *
   * @return the RigaOrdine
   */
  public Collection<RigaOrdine> getTheRigaOrdine() {
    return theRigaOrdine;
  }

  /**
   * Set the value of the collection of the child RigaOrdine
   *
   * @param aRigaOrdineList to set
   */
  public void setTheRigaOrdine(Collection<RigaOrdine> aRigaOrdineList) {
    if (aRigaOrdineList != null) {
      for (RigaOrdine rigaOrdine : aRigaOrdineList) {
        rigaOrdine.setTheProdotto(this);
      }
    }
    theRigaOrdine = aRigaOrdineList;
  }

  // ADD CHILD
  public void addRigaOrdine(RigaOrdine rigaOrdine) {
    theRigaOrdine.add(rigaOrdine);
  }

  // PARENT GETTER/SETTER

  // PARENT ID GETTER/SETTER
  /**
   * Return the PersonaKey from theFornitore.
   *
   * @return PersonaKey from theFornitore.
   */
  public PersonaKey getThePersonaKey() {
    // If the parent entity object is null, then return null
    if (getTheFornitore() == null) {
      return null;
    }
    // Return requested attribute
    return theFornitore.getThePersonaKey();
  }

  // PARENT OBJECT TITLE
  /**
   * Return the object title of theFornitore.
   *
   * @return the object title of theFornitore.
   */
  public String getTheFornitoreObjectTitle() {
    return getTheFornitore() != null ? getTheFornitore().getObjectTitle() : null;
  }

  // PARENT OBJECT KEY

  /**
   * Return the object key of theFornitore.
   *
   * @return the object key of theFornitore.
   */
  @ToString.Include
  public String getTheFornitoreObjectKey() {
    return getTheFornitore() != null ? getTheFornitore().getObjectKey() : null;
  }

  /**
   * Set object key of theFornitore.
   *
   * @param objectKey to set
   */
  public void setTheFornitoreObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheFornitoreObjectKey(), objectKey, false)) {
      Fornitore fornitore = new Fornitore();
      fornitore.setObjectKey(objectKey);
      setTheFornitore(fornitore);
    }
    if (getTheFornitore() != null) {
      theFornitore.setThePersonaKey(getTheFornitore().getThePersonaKey());
    }
  }

  // OBJECT KEY
  /**
   * Restituisce l'identificativo della chiave in formato stringa. Ritorna conveniente nelle
   * selezioni da lista.
   *
   * @return L'identificativo della chiave in formato pk1||pk2||pk3...
   */
  public String getObjectKey() {
    StringBuilder objectKey = new StringBuilder();
    objectKey.append(getIdProdotto());
    return objectKey.toString();
  }

  /**
   * Inizializza la parte identificativa del bean in base alla stringa tokenizzata da "||" fornita
   * in input.
   *
   * @param key L'identificativo della chiave in formato pk1||pk2||pk3...
   */
  public void setObjectKey(String key) {
    if (key == null || key.trim().length() == 0) {
      return;
    }
    String[] array =
        StringUtils.splitByWholeSeparatorPreserveAllTokens(key, getRowIdFieldDelimiter());
    int ctr = 0;
    setIdProdotto(getIntegerCheckedAgainstNullContent(array[ctr]));
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getDescrizione());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two Prodotto objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Prodotto that = (Prodotto) o;

    return idProdotto != null && Objects.equals(idProdotto, that.idProdotto);
  }

  /** Overrides hashCode method to compute hash code of Prodotto object */
  @Override
  public int hashCode() {
    return Objects.hash(idProdotto);
  }
}
