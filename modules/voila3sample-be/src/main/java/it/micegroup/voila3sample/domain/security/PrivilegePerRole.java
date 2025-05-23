package it.micegroup.voila3sample.domain.security;

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

/** Relazione fra Role e Privilege */
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "role_privilege_mapping")
@NamedEntityGraph(
    name = PrivilegePerRole.DEFAULT_ENTITY_GRAPH,
    attributeNodes = {
      @NamedAttributeNode(PrivilegePerRole_.THE_ROLE),
      @NamedAttributeNode(PrivilegePerRole_.THE_PRIVILEGE)
    })
public class PrivilegePerRole extends BaseEntity implements Serializable {

  public static final String DEFAULT_ENTITY_GRAPH = "EG.PrivilegePerRole";

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 3511215419L;

  // COMPOSITE PRIMARY KEY
  @EmbeddedId private PrivilegePerRoleKey thePrivilegePerRoleKey = new PrivilegePerRoleKey();

  // ATTRIBUTES

  // PARENTS
  /** Parent entity Role */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(
      name = "role_id",
      referencedColumnName = "role_id",
      nullable = false,
      insertable = false,
      updatable = false)
  @MapsId("roleId")
  private Role theRole;

  /** Parent entity Privilege: Entità rappresentativa di un privilegio */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(
      name = "privilege_id",
      referencedColumnName = "privilege_id",
      nullable = false,
      insertable = false,
      updatable = false)
  @MapsId("privilegeId")
  private Privilege thePrivilege;

  // CHILDREN

  // CONSTRUCTORS
  /** Constructor of the class PrivilegePerRole */
  public PrivilegePerRole(String objectKey) {
    super();
    setObjectKey(objectKey);
  }

  // CHILD GETTER/SETTER

  // ADD CHILD

  // PARENT GETTER/SETTER
  /**
   * Get the property Role Id of the composite key
   *
   * @return the Role Id
   */
  public String getRoleId() {
    return thePrivilegePerRoleKey.getRoleId();
  }

  /**
   * Set the value of the property Role Id of the composite key
   *
   * @param aroleId to set
   */
  public void setRoleId(String roleId) {
    thePrivilegePerRoleKey.setRoleId(roleId);
  }

  /**
   * Get the property Privilege Id of the composite key
   *
   * @return the Privilege Id
   */
  public Long getPrivilegeId() {
    return thePrivilegePerRoleKey.getPrivilegeId();
  }

  /**
   * Set the value of the property Privilege Id of the composite key
   *
   * @param aprivilegeId to set
   */
  public void setPrivilegeId(Long privilegeId) {
    thePrivilegePerRoleKey.setPrivilegeId(privilegeId);
  }

  // PARENT ID GETTER/SETTER

  // PARENT OBJECT TITLE
  /**
   * Return the object title of theRole.
   *
   * @return the object title of theRole.
   */
  public String getTheRoleObjectTitle() {
    return getTheRole() != null ? getTheRole().getObjectTitle() : null;
  }

  /**
   * Return the object title of thePrivilege.
   *
   * @return the object title of thePrivilege.
   */
  public String getThePrivilegeObjectTitle() {
    return getThePrivilege() != null ? getThePrivilege().getObjectTitle() : null;
  }

  // PARENT OBJECT KEY
  /**
   * Return the object key of theRole.
   *
   * @return the object key of theRole.
   */
  @ToString.Include
  public String getTheRoleObjectKey() {
    return getTheRole() != null ? getTheRole().getObjectKey() : null;
  }

  /**
   * Set object key of theRole.
   *
   * @param objectKey to set
   */
  public void setTheRoleObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheRoleObjectKey(), objectKey, false)) {
      Role role = new Role();
      role.setObjectKey(objectKey);
      setTheRole(role);
    }
    if (getTheRole() != null) {
      thePrivilegePerRoleKey.setRoleId(getTheRole().getRoleId());
    }
  }

  /**
   * Return the object key of thePrivilege.
   *
   * @return the object key of thePrivilege.
   */
  @ToString.Include
  public String getThePrivilegeObjectKey() {
    return getThePrivilege() != null ? getThePrivilege().getObjectKey() : null;
  }

  /**
   * Set object key of thePrivilege.
   *
   * @param objectKey to set
   */
  public void setThePrivilegeObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getThePrivilegeObjectKey(), objectKey, false)) {
      Privilege privilege = new Privilege();
      privilege.setObjectKey(objectKey);
      setThePrivilege(privilege);
    }
    if (getThePrivilege() != null) {
      thePrivilegePerRoleKey.setPrivilegeId(getThePrivilege().getPrivilegeId());
    }
  }

  // OBJECT KEY
  /** Restituisce l'identificativo della chiave composita in formato stringa */
  public String getObjectKey() {
    return thePrivilegePerRoleKey.getObjectKey();
  }

  /** Inizializza la parte identificativa chiamando il setter della chiave composita */
  public void setObjectKey(String key) {
    thePrivilegePerRoleKey.setObjectKey(key);
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getObjectKey());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two PrivilegePerRole objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    PrivilegePerRole that = (PrivilegePerRole) o;

    return thePrivilegePerRoleKey != null
        && Objects.equals(thePrivilegePerRoleKey, that.thePrivilegePerRoleKey);
  }

  /** Overrides hashCode method to compute hash code of PrivilegePerRole object */
  @Override
  public int hashCode() {
    return Objects.hash(thePrivilegePerRoleKey);
  }
}
