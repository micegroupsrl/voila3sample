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
@Table(name = "fornitore")
public class Fornitore extends Persona implements Serializable {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3996161044L;

  // ATTRIBUTES
  /** Attribute nome */
  @Column(name = "nome", columnDefinition = "VARCHAR(80)")
  private String nome;

  /** Attribute cognome */
  @Column(name = "cognome", columnDefinition = "VARCHAR(80)")
  private String cognome;

  /** Attribute email */
  @Column(name = "email", columnDefinition = "VARCHAR(80)")
  private String email;

  /** Attribute telefono */
  @Column(name = "telefono", columnDefinition = "VARCHAR(80)")
  private String telefono;

  /** Attribute piva */
  @Column(name = "piva", columnDefinition = "VARCHAR(80)")
  private String piva;

  // PARENTS

  // CHILDREN
  /** Collection of child entity Prodotto */
  @OneToMany(mappedBy = "theFornitore", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<Prodotto> theProdotto = new ArrayList<>();

  // CONSTRUCTORS
  /** Constructor of the class Fornitore */
  public Fornitore(String objectKey) {
    super();
    setObjectKey(objectKey);
  }

  // CHILD GETTER/SETTER
  /**
   * Get collection of the child Prodotto
   *
   * @return the Prodotto
   */
  public Collection<Prodotto> getTheProdotto() {
    return theProdotto;
  }

  /**
   * Set the value of the collection of the child Prodotto
   *
   * @param aProdottoList to set
   */
  public void setTheProdotto(Collection<Prodotto> aProdottoList) {
    if (aProdottoList != null) {
      for (Prodotto prodotto : aProdottoList) {
        prodotto.setTheFornitore(this);
      }
    }
    theProdotto = aProdottoList;
  }

  // ADD CHILD
  public void addProdotto(Prodotto prodotto) {
    theProdotto.add(prodotto);
  }

  // PARENT GETTER/SETTER

  // PARENT ID GETTER/SETTER

  // PARENT OBJECT TITLE

  // PARENT OBJECT KEY

  // OBJECT KEY
  /**
   * Restituisce l'identificativo della chiave in formato stringa. Ritorna conveniente nelle
   * selezioni da lista.
   *
   * @return L'identificativo della chiave in formato pk1||pk2||pk3...
   */
  @Override
  public String getObjectKey() {
    return thePersonaKey.getObjectKey();
  }

  /** Inizializza la parte identificativa chiamando il setter della chiave composita */
  @Override
  public void setObjectKey(String key) {
    thePersonaKey.setObjectKey(key);
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getPiva());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two Fornitore objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Fornitore that = (Fornitore) o;

    return thePersonaKey != null && Objects.equals(thePersonaKey, that.thePersonaKey);
  }

  /** Overrides hashCode method to compute hash code of Fornitore object */
  @Override
  public int hashCode() {
    return Objects.hash(thePersonaKey);
  }
}
