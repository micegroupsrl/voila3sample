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
@Table(name = "stato_ordine")
public class StatoOrdine extends BaseEntity implements Serializable {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 1393726566L;

  // ATTRIBUTES
  /** Attribute idStatoOrdine */
  @Id
  @NotNull
  @Column(name = "id_stato_ordine", columnDefinition = "INTEGER")
  private Integer idStatoOrdine;

  /** Attribute descrizione */
  @Column(name = "descrizione", columnDefinition = "VARCHAR(80)")
  private String descrizione;

  // PARENTS

  // CHILDREN
  /** Collection of child entity Ordine */
  @OneToMany(mappedBy = "theStatoOrdine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<Ordine> theOrdine = new ArrayList<>();

  // CONSTRUCTORS
  /** Constructor of the class StatoOrdine */
  public StatoOrdine(String objectKey) {
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
        ordine.setTheStatoOrdine(this);
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
   * Restituisce l'identificativo della chiave in formato stringa. Ritorna conveniente nelle
   * selezioni da lista.
   *
   * @return L'identificativo della chiave in formato pk1||pk2||pk3...
   */
  public String getObjectKey() {
    StringBuilder objectKey = new StringBuilder();
    objectKey.append(getIdStatoOrdine());
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
    setIdStatoOrdine(getIntegerCheckedAgainstNullContent(array[ctr]));
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getDescrizione());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two StatoOrdine objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    StatoOrdine that = (StatoOrdine) o;

    return idStatoOrdine != null && Objects.equals(idStatoOrdine, that.idStatoOrdine);
  }

  /** Overrides hashCode method to compute hash code of StatoOrdine object */
  @Override
  public int hashCode() {
    return Objects.hash(idStatoOrdine);
  }
}
