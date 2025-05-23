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

import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Column;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.MapsId;

@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@ToString
@Table(name = "persona")
public class Persona extends Auditable implements Serializable {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 2189577881L;

  // COMPOSITE PRIMARY KEY
  @EmbeddedId protected PersonaKey thePersonaKey = new PersonaKey();

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

  // PARENTS

  // CHILDREN

  // CONSTRUCTORS
  /** Constructor of the class Persona */
  public Persona(String objectKey) {
    super();
    setObjectKey(objectKey);
  }

  // CHILD GETTER/SETTER

  // ADD CHILD

  // PARENT GETTER/SETTER
  /**
   * Get the property Id Persona of the internal composite key
   *
   * @return the Id Persona
   */
  public Integer getIdPersona() {
    return thePersonaKey.getIdPersona();
  }

  /**
   * Set the value of the property Id Persona of the internal composite key
   *
   * @param idPersona the Id Persona to set
   */
  public void setIdPersona(Integer idPersona) {
    thePersonaKey.setIdPersona(idPersona);
  }

  /**
   * Get the property Cf of the internal composite key
   *
   * @return the Cf
   */
  public String getCf() {
    return thePersonaKey.getCf();
  }

  /**
   * Set the value of the property Cf of the internal composite key
   *
   * @param cf the Cf to set
   */
  public void setCf(String cf) {
    thePersonaKey.setCf(cf);
  }

  // PARENT ID GETTER/SETTER

  // PARENT OBJECT TITLE

  // PARENT OBJECT KEY

  // OBJECT KEY
  /** Restituisce l'identificativo della chiave composita in formato stringa */
  public String getObjectKey() {
    return thePersonaKey.getObjectKey();
  }

  /** Inizializza la parte identificativa chiamando il setter della chiave composita */
  public void setObjectKey(String key) {
    thePersonaKey.setObjectKey(key);
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getNome());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two Persona objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Persona that = (Persona) o;

    return thePersonaKey != null && Objects.equals(thePersonaKey, that.thePersonaKey);
  }

  /** Overrides hashCode method to compute hash code of Persona object */
  @Override
  public int hashCode() {
    return Objects.hash(thePersonaKey);
  }
}
