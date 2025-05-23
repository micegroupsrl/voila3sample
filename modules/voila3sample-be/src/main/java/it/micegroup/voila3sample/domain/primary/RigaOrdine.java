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

import java.math.BigDecimal;

@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "riga_ordine")
@NamedEntityGraph(
    name = RigaOrdine.DEFAULT_ENTITY_GRAPH,
    attributeNodes = {
      @NamedAttributeNode(RigaOrdine_.THE_ORDINE),
      @NamedAttributeNode(RigaOrdine_.THE_PRODOTTO)
    })
public class RigaOrdine extends BaseEntity implements Serializable {

  public static final String DEFAULT_ENTITY_GRAPH = "EG.RigaOrdine";

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 102029107L;

  // COMPOSITE PRIMARY KEY
  @EmbeddedId private RigaOrdineKey theRigaOrdineKey = new RigaOrdineKey();

  // ATTRIBUTES
  /** Attribute qta */
  @Column(name = "qta", columnDefinition = "NUMERIC(12,2)")
  private BigDecimal qta;

  // PARENTS
  /** Parent entity Ordine */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(
      name = "id_ordine",
      referencedColumnName = "id_ordine",
      nullable = false,
      insertable = false,
      updatable = false)
  @MapsId("idOrdine")
  private Ordine theOrdine;

  /** Parent entity Prodotto */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(
      name = "id_prodotto",
      referencedColumnName = "id_prodotto",
      nullable = false,
      insertable = false,
      updatable = false)
  @MapsId("idProdotto")
  private Prodotto theProdotto;

  // CHILDREN

  // CONSTRUCTORS
  /** Constructor of the class RigaOrdine */
  public RigaOrdine(String objectKey) {
    super();
    setObjectKey(objectKey);
  }

  // CHILD GETTER/SETTER

  // ADD CHILD

  // PARENT GETTER/SETTER
  /**
   * Get the property Id Ordine of the composite key
   *
   * @return the Id Ordine
   */
  public Integer getIdOrdine() {
    return theRigaOrdineKey.getIdOrdine();
  }

  /**
   * Set the value of the property Id Ordine of the composite key
   *
   * @param aidOrdine to set
   */
  public void setIdOrdine(Integer idOrdine) {
    theRigaOrdineKey.setIdOrdine(idOrdine);
  }

  /**
   * Get the property Id Prodotto of the composite key
   *
   * @return the Id Prodotto
   */
  public Integer getIdProdotto() {
    return theRigaOrdineKey.getIdProdotto();
  }

  /**
   * Set the value of the property Id Prodotto of the composite key
   *
   * @param aidProdotto to set
   */
  public void setIdProdotto(Integer idProdotto) {
    theRigaOrdineKey.setIdProdotto(idProdotto);
  }

  // PARENT ID GETTER/SETTER

  // PARENT OBJECT TITLE
  /**
   * Return the object title of theOrdine.
   *
   * @return the object title of theOrdine.
   */
  public String getTheOrdineObjectTitle() {
    return getTheOrdine() != null ? getTheOrdine().getObjectTitle() : null;
  }

  /**
   * Return the object title of theProdotto.
   *
   * @return the object title of theProdotto.
   */
  public String getTheProdottoObjectTitle() {
    return getTheProdotto() != null ? getTheProdotto().getObjectTitle() : null;
  }

  // PARENT OBJECT KEY
  /**
   * Return the object key of theOrdine.
   *
   * @return the object key of theOrdine.
   */
  @ToString.Include
  public String getTheOrdineObjectKey() {
    return getTheOrdine() != null ? getTheOrdine().getObjectKey() : null;
  }

  /**
   * Set object key of theOrdine.
   *
   * @param objectKey to set
   */
  public void setTheOrdineObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheOrdineObjectKey(), objectKey, false)) {
      Ordine ordine = new Ordine();
      ordine.setObjectKey(objectKey);
      setTheOrdine(ordine);
    }
    if (getTheOrdine() != null) {
      theRigaOrdineKey.setIdOrdine(getTheOrdine().getIdOrdine());
    }
  }

  /**
   * Return the object key of theProdotto.
   *
   * @return the object key of theProdotto.
   */
  @ToString.Include
  public String getTheProdottoObjectKey() {
    return getTheProdotto() != null ? getTheProdotto().getObjectKey() : null;
  }

  /**
   * Set object key of theProdotto.
   *
   * @param objectKey to set
   */
  public void setTheProdottoObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheProdottoObjectKey(), objectKey, false)) {
      Prodotto prodotto = new Prodotto();
      prodotto.setObjectKey(objectKey);
      setTheProdotto(prodotto);
    }
    if (getTheProdotto() != null) {
      theRigaOrdineKey.setIdProdotto(getTheProdotto().getIdProdotto());
    }
  }

  // OBJECT KEY
  /** Restituisce l'identificativo della chiave composita in formato stringa */
  public String getObjectKey() {
    return theRigaOrdineKey.getObjectKey();
  }

  /** Inizializza la parte identificativa chiamando il setter della chiave composita */
  public void setObjectKey(String key) {
    theRigaOrdineKey.setObjectKey(key);
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getObjectKey());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two RigaOrdine objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    RigaOrdine that = (RigaOrdine) o;

    return theRigaOrdineKey != null && Objects.equals(theRigaOrdineKey, that.theRigaOrdineKey);
  }

  /** Overrides hashCode method to compute hash code of RigaOrdine object */
  @Override
  public int hashCode() {
    return Objects.hash(theRigaOrdineKey);
  }
}
