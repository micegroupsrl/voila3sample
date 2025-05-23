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
@Table(name = "role")
@NamedEntityGraph(
    name = Role.DEFAULT_ENTITY_GRAPH,
    attributeNodes = {@NamedAttributeNode(Role_.THE_ROLE_ROLE_GROUP)})
public class Role extends BaseEntity implements Serializable {

  public static final String DEFAULT_ENTITY_GRAPH = "EG.Role";

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 872880077L;

  // ATTRIBUTES
  /** Attribute roleId */
  @Id
  @NotNull
  @Column(name = "role_id", columnDefinition = "VARCHAR(80)")
  private String roleId;

  /** Attribute name */
  @Column(name = "name", columnDefinition = "VARCHAR(80)")
  private String name;

  // PARENTS
  /** Parent entity Role */
  @ManyToOne(fetch = FetchType.LAZY)
  @ToString.Exclude
  @JoinColumn(name = "role_id_role_group", referencedColumnName = "role_id", nullable = true)
  private Role theRoleRoleGroup;

  // CHILDREN
  /** Collection of child entity PrivilegePerRole: Relazione fra Role e Privilege */
  @OneToMany(mappedBy = "theRole", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<PrivilegePerRole> thePrivilegePerRole = new ArrayList<>();

  /** Collection of child entity RolePerUser: Relazione fra User e Role */
  @OneToMany(mappedBy = "theRole", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<RolePerUser> theRolePerUser = new ArrayList<>();

  /** Collection of child entity Role */
  @OneToMany(mappedBy = "theRoleRoleGroup", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<Role> theRoleRoleChild = new ArrayList<>();

  // CONSTRUCTORS
  /** Constructor of the class Role */
  public Role(String objectKey) {
    super();
    setObjectKey(objectKey);
  }

  // CHILD GETTER/SETTER
  /**
   * Get collection of the child PrivilegePerRole
   *
   * @return the PrivilegePerRole
   */
  public Collection<PrivilegePerRole> getThePrivilegePerRole() {
    return thePrivilegePerRole;
  }

  /**
   * Set the value of the collection of the child PrivilegePerRole
   *
   * @param aPrivilegePerRoleList to set
   */
  public void setThePrivilegePerRole(Collection<PrivilegePerRole> aPrivilegePerRoleList) {
    if (aPrivilegePerRoleList != null) {
      for (PrivilegePerRole privilegePerRole : aPrivilegePerRoleList) {
        privilegePerRole.setTheRole(this);
      }
    }
    thePrivilegePerRole = aPrivilegePerRoleList;
  }

  /**
   * Get collection of the child RolePerUser
   *
   * @return the RolePerUser
   */
  public Collection<RolePerUser> getTheRolePerUser() {
    return theRolePerUser;
  }

  /**
   * Set the value of the collection of the child RolePerUser
   *
   * @param aRolePerUserList to set
   */
  public void setTheRolePerUser(Collection<RolePerUser> aRolePerUserList) {
    if (aRolePerUserList != null) {
      for (RolePerUser rolePerUser : aRolePerUserList) {
        rolePerUser.setTheRole(this);
      }
    }
    theRolePerUser = aRolePerUserList;
  }

  /**
   * Get collection of the child Role
   *
   * @return the Role
   */
  public Collection<Role> getTheRoleRoleChild() {
    return theRoleRoleChild;
  }

  /**
   * Set the value of the collection of the child Role
   *
   * @param aRoleList to set
   */
  public void setTheRoleRoleChild(Collection<Role> aRoleList) {
    if (aRoleList != null) {
      for (Role role : aRoleList) {
        role.setTheRoleRoleGroup(this);
      }
    }
    theRoleRoleChild = aRoleList;
  }

  // ADD CHILD
  public void addPrivilegePerRole(PrivilegePerRole privilegePerRole) {
    thePrivilegePerRole.add(privilegePerRole);
  }

  public void addRolePerUser(RolePerUser rolePerUser) {
    theRolePerUser.add(rolePerUser);
  }

  public void addRoleRoleChild(Role role) {
    theRoleRoleChild.add(role);
  }

  // PARENT GETTER/SETTER

  // PARENT ID GETTER/SETTER
  /**
   * Return the roleIdRoleGroup from theRoleRoleGroup.
   *
   * @return roleIdRoleGroup from theRoleRoleGroup.
   */
  public String getRoleIdRoleGroup() {
    // If the parent entity object is null, then return null
    if (getTheRoleRoleGroup() == null) {
      return null;
    }
    // Return requested attribute
    return theRoleRoleGroup.getRoleId();
  }

  // PARENT OBJECT TITLE
  /**
   * Return the object title of theRoleRoleGroup.
   *
   * @return the object title of theRoleRoleGroup.
   */
  public String getTheRoleRoleGroupObjectTitle() {
    return getTheRoleRoleGroup() != null ? getTheRoleRoleGroup().getObjectTitle() : null;
  }

  // PARENT OBJECT KEY

  /**
   * Return the object key of theRoleRoleGroup.
   *
   * @return the object key of theRoleRoleGroup.
   */
  @ToString.Include
  public String getTheRoleRoleGroupObjectKey() {
    return getTheRoleRoleGroup() != null ? getTheRoleRoleGroup().getObjectKey() : null;
  }

  /**
   * Set object key of theRoleRoleGroup.
   *
   * @param objectKey to set
   */
  public void setTheRoleRoleGroupObjectKey(String objectKey) {
    if (EntityUtils.isValueChanged(getTheRoleRoleGroupObjectKey(), objectKey, false)) {
      Role role = new Role();
      role.setObjectKey(objectKey);
      setTheRoleRoleGroup(role);
    }
    if (getTheRoleRoleGroup() != null) {
      theRoleRoleGroup.setRoleId(getTheRoleRoleGroup().getRoleId());
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
    objectKey.append(getRoleId());
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
    setRoleId(getStringCheckedAgainstNullContent(array[ctr]));
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getRoleId());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two Role objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Role that = (Role) o;

    return roleId != null && Objects.equals(roleId, that.roleId);
  }

  /** Overrides hashCode method to compute hash code of Role object */
  @Override
  public int hashCode() {
    return Objects.hash(roleId);
  }
}
