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

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalTime;
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
@Table(name = "ordine")
@NamedEntityGraph(
    name = Ordine.DEFAULT_ENTITY_GRAPH,
    attributeNodes = {
      @NamedAttributeNode(Ordine_.THE_STATO_ORDINE),
      @NamedAttributeNode(Ordine_.THE_TIPO_ORDINE),
      @NamedAttributeNode(Ordine_.THE_CLIENTE),
      @NamedAttributeNode(Ordine_.THE_ORDINE_AGGREGATO)
    })
public class Ordine extends Auditable implements Serializable {

  public static final String DEFAULT_ENTITY_GRAPH = "EG.Ordine";

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 2968581006L;

  // ATTRIBUTES
  /** Attribute idOrdine */
  @Id
  @NotNull
  @Column(name = "id_ordine", columnDefinition = "INTEGER")
  private Integer idOrdine;

  /** Attribute descrizione */
  @Column(name = "descrizione", columnDefinition = "VARCHAR(80)")
  private String descrizione;

  /** Attribute datetime */
  @Column(name = "datetime", columnDefinition = "DATETIME")
  private LocalDateTime datetime;

  /** Attribute date */
  @Column(name = "date", columnDefinition = "DATE")
  private LocalDate date;

  /** Attribute time */
  @Column(name = "time", columnDefinition = "TIME")
  private LocalTime time;

  // PARENTS
  /** Parent entity StatoOrdine */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(name = "id_stato_ordine", referencedColumnName = "id_stato_ordine", nullable = true)
  private StatoOrdine theStatoOrdine;

  /** Parent entity TipoOrdine */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(name = "id_cat_ordine", referencedColumnName = "id_cat_ordine", nullable = true)
  @JoinColumn(name = "anno", referencedColumnName = "anno", nullable = true)
  @JoinColumn(name = "id_tipo_ordine", referencedColumnName = "id_tipo_ordine", nullable = true)
  private TipoOrdine theTipoOrdine;

  /** Parent entity Cliente */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(name = "id_persona", referencedColumnName = "id_persona", nullable = true)
  @JoinColumn(name = "cf", referencedColumnName = "cf", nullable = true)
  private Cliente theCliente;

  /** Parent entity Ordine */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(name = "id_ordine_aggregato", referencedColumnName = "id_ordine", nullable = true)
  private Ordine theOrdineAggregato;

  // CHILDREN
  /** Collection of child entity RigaOrdine */
  @OneToMany(mappedBy = "theOrdine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<RigaOrdine> theRigaOrdine = new ArrayList<>();

  /** Collection of child entity Ordine */
  @OneToMany(mappedBy = "theOrdineAggregato", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<Ordine> theOrdineFiglio = new ArrayList<>();

  // CONSTRUCTORS
  /** Constructor of the class Ordine */
  public Ordine(String objectKey) {
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
        rigaOrdine.setTheOrdine(this);
      }
    }
    theRigaOrdine = aRigaOrdineList;
  }

  /**
   * Get collection of the child Ordine
   *
   * @return the Ordine
   */
  public Collection<Ordine> getTheOrdineFiglio() {
    return theOrdineFiglio;
  }

  /**
   * Set the value of the collection of the child Ordine
   *
   * @param aOrdineList to set
   */
  public void setTheOrdineFiglio(Collection<Ordine> aOrdineList) {
    if (aOrdineList != null) {
      for (Ordine ordine : aOrdineList) {
        ordine.setTheOrdineAggregato(this);
      }
    }
    theOrdineFiglio = aOrdineList;
  }

  // ADD CHILD
  public void addRigaOrdine(RigaOrdine rigaOrdine) {
    theRigaOrdine.add(rigaOrdine);
  }

  public void addOrdineFiglio(Ordine ordine) {
    theOrdineFiglio.add(ordine);
  }

  // PARENT GETTER/SETTER

  // PARENT ID GETTER/SETTER
  /**
   * Return the idStatoOrdine from theStatoOrdine.
   *
   * @return idStatoOrdine from theStatoOrdine.
   */
  public Integer getIdStatoOrdine() {
    // If the parent entity object is null, then return null
    if (getTheStatoOrdine() == null) {
      return null;
    }
    // Return requested attribute
    return theStatoOrdine.getIdStatoOrdine();
  }

  /**
   * Return the TheTipoOrdineKey from theTipoOrdine.
   *
   * @return TheTipoOrdineKey from theTipoOrdine.
   */
  public TipoOrdineKey getTheTipoOrdineKey() {
    // If the parent entity object is null, then return null
    if (getTheTipoOrdine() == null) {
      return null;
    }
    // Return requested attribute
    return theTipoOrdine.getTheTipoOrdineKey();
  }

  /**
   * Return the PersonaKey from theCliente.
   *
   * @return PersonaKey from theCliente.
   */
  public PersonaKey getThePersonaKey() {
    // If the parent entity object is null, then return null
    if (getTheCliente() == null) {
      return null;
    }
    // Return requested attribute
    return theCliente.getThePersonaKey();
  }

  /**
   * Return the idOrdineAggregato from theOrdineAggregato.
   *
   * @return idOrdineAggregato from theOrdineAggregato.
   */
  public Integer getIdOrdineAggregato() {
    // If the parent entity object is null, then return null
    if (getTheOrdineAggregato() == null) {
      return null;
    }
    // Return requested attribute
    return theOrdineAggregato.getIdOrdine();
  }

  // PARENT OBJECT TITLE
  /**
   * Return the object title of theStatoOrdine.
   *
   * @return the object title of theStatoOrdine.
   */
  public String getTheStatoOrdineObjectTitle() {
    return getTheStatoOrdine() != null ? getTheStatoOrdine().getObjectTitle() : null;
  }

  /**
   * Return the object title of theTipoOrdine.
   *
   * @return the object title of theTipoOrdine.
   */
  public String getTheTipoOrdineObjectTitle() {
    return getTheTipoOrdine() != null ? getTheTipoOrdine().getObjectTitle() : null;
  }

  /**
   * Return the object title of theCliente.
   *
   * @return the object title of theCliente.
   */
  public String getTheClienteObjectTitle() {
    return getTheCliente() != null ? getTheCliente().getObjectTitle() : null;
  }

  /**
   * Return the object title of theOrdineAggregato.
   *
   * @return the object title of theOrdineAggregato.
   */
  public String getTheOrdineAggregatoObjectTitle() {
    return getTheOrdineAggregato() != null ? getTheOrdineAggregato().getObjectTitle() : null;
  }

  // PARENT OBJECT KEY

  /**
   * Return the object key of theStatoOrdine.
   *
   * @return the object key of theStatoOrdine.
   */
  @ToString.Include
  public String getTheStatoOrdineObjectKey() {
    return getTheStatoOrdine() != null ? getTheStatoOrdine().getObjectKey() : null;
  }

  /**
   * Set object key of theStatoOrdine.
   *
   * @param objectKey to set
   */
  public void setTheStatoOrdineObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheStatoOrdineObjectKey(), objectKey, false)) {
      StatoOrdine statoOrdine = new StatoOrdine();
      statoOrdine.setObjectKey(objectKey);
      setTheStatoOrdine(statoOrdine);
    }
    if (getTheStatoOrdine() != null) {
      theStatoOrdine.setIdStatoOrdine(getTheStatoOrdine().getIdStatoOrdine());
    }
  }

  /**
   * Return the object key of theTipoOrdine.
   *
   * @return the object key of theTipoOrdine.
   */
  @ToString.Include
  public String getTheTipoOrdineObjectKey() {
    return getTheTipoOrdine() != null ? getTheTipoOrdine().getObjectKey() : null;
  }

  /**
   * Set object key of theTipoOrdine.
   *
   * @param objectKey to set
   */
  public void setTheTipoOrdineObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheTipoOrdineObjectKey(), objectKey, false)) {
      TipoOrdine tipoOrdine = new TipoOrdine();
      tipoOrdine.setObjectKey(objectKey);
      setTheTipoOrdine(tipoOrdine);
    }
    if (getTheTipoOrdine() != null) {
      theTipoOrdine.setTheTipoOrdineKey(getTheTipoOrdine().getTheTipoOrdineKey());
    }
  }

  /**
   * Return the object key of theCliente.
   *
   * @return the object key of theCliente.
   */
  @ToString.Include
  public String getTheClienteObjectKey() {
    return getTheCliente() != null ? getTheCliente().getObjectKey() : null;
  }

  /**
   * Set object key of theCliente.
   *
   * @param objectKey to set
   */
  public void setTheClienteObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheClienteObjectKey(), objectKey, false)) {
      Cliente cliente = new Cliente();
      cliente.setObjectKey(objectKey);
      setTheCliente(cliente);
    }
    if (getTheCliente() != null) {
      theCliente.setThePersonaKey(getTheCliente().getThePersonaKey());
    }
  }

  /**
   * Return the object key of theOrdineAggregato.
   *
   * @return the object key of theOrdineAggregato.
   */
  @ToString.Include
  public String getTheOrdineAggregatoObjectKey() {
    return getTheOrdineAggregato() != null ? getTheOrdineAggregato().getObjectKey() : null;
  }

  /**
   * Set object key of theOrdineAggregato.
   *
   * @param objectKey to set
   */
  public void setTheOrdineAggregatoObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheOrdineAggregatoObjectKey(), objectKey, false)) {
      Ordine ordine = new Ordine();
      ordine.setObjectKey(objectKey);
      setTheOrdineAggregato(ordine);
    }
    if (getTheOrdineAggregato() != null) {
      theOrdineAggregato.setIdOrdine(getTheOrdineAggregato().getIdOrdine());
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
    objectKey.append(getIdOrdine());
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
    setIdOrdine(getIntegerCheckedAgainstNullContent(array[ctr]));
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getDescrizione());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two Ordine objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Ordine that = (Ordine) o;

    return idOrdine != null && Objects.equals(idOrdine, that.idOrdine);
  }

  /** Overrides hashCode method to compute hash code of Ordine object */
  @Override
  public int hashCode() {
    return Objects.hash(idOrdine);
  }
}
