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

@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "tipo_ordine")
@NamedEntityGraph(
    name = TipoOrdine.DEFAULT_ENTITY_GRAPH,
    attributeNodes = {@NamedAttributeNode(TipoOrdine_.THE_CATEGORIA_ORDINE)})
public class TipoOrdine extends BaseEntity implements Serializable {

  public static final String DEFAULT_ENTITY_GRAPH = "EG.TipoOrdine";

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 1570483503L;

  // COMPOSITE PRIMARY KEY
  @EmbeddedId private TipoOrdineKey theTipoOrdineKey = new TipoOrdineKey();

  // ATTRIBUTES

  // PARENTS
  /** Parent entity CategoriaOrdine */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(
      name = "id_cat_ordine",
      referencedColumnName = "id_cat_ordine",
      nullable = false,
      insertable = false,
      updatable = false)
  @MapsId("idCatOrdine")
  private CategoriaOrdine theCategoriaOrdine;

  // CHILDREN
  /** Collection of child entity Ordine */
  @OneToMany(mappedBy = "theTipoOrdine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<Ordine> theOrdine = new ArrayList<>();

  // CONSTRUCTORS
  /** Constructor of the class TipoOrdine */
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
   * Get the property Id Cat Ordine of the composite key
   *
   * @return the Id Cat Ordine
   */
  public Integer getIdCatOrdine() {
    return theTipoOrdineKey.getIdCatOrdine();
  }

  /**
   * Set the value of the property Id Cat Ordine of the composite key
   *
   * @param aidCatOrdine to set
   */
  public void setIdCatOrdine(Integer idCatOrdine) {
    theTipoOrdineKey.setIdCatOrdine(idCatOrdine);
  }

  /**
   * Get the property Anno of the internal composite key
   *
   * @return the Anno
   */
  public Integer getAnno() {
    return theTipoOrdineKey.getAnno();
  }

  /**
   * Set the value of the property Anno of the internal composite key
   *
   * @param anno the Anno to set
   */
  public void setAnno(Integer anno) {
    theTipoOrdineKey.setAnno(anno);
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
      theTipoOrdineKey.setIdCatOrdine(getTheCategoriaOrdine().getIdCatOrdine());
    }
  }

  // OBJECT KEY
  /** Restituisce l'identificativo della chiave composita in formato stringa */
  public String getObjectKey() {
    return theTipoOrdineKey.getObjectKey();
  }

  /** Inizializza la parte identificativa chiamando il setter della chiave composita */
  public void setObjectKey(String key) {
    theTipoOrdineKey.setObjectKey(key);
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getObjectKey());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two TipoOrdine objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    TipoOrdine that = (TipoOrdine) o;

    return theTipoOrdineKey != null && Objects.equals(theTipoOrdineKey, that.theTipoOrdineKey);
  }

  /** Overrides hashCode method to compute hash code of TipoOrdine object */
  @Override
  public int hashCode() {
    return Objects.hash(theTipoOrdineKey);
  }
}
