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
import jakarta.persistence.Column;

import jakarta.persistence.Id;

import jakarta.persistence.FetchType;

import java.util.Collection;
import java.util.ArrayList;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

/** Entità rappresentativa di un privilegio */
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "privilege")
public class Privilege extends BaseEntity implements Serializable {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 27188524L;

  // ATTRIBUTES
  /** Attribute privilegeId */
  @Id
  @NotNull
  @Column(name = "privilege_id", columnDefinition = "BIGINT(20)")
  private Long privilegeId;

  /** Attribute name */
  @Column(name = "name", columnDefinition = "VARCHAR(80)")
  private String name;

  /** Attribute description */
  @Column(name = "description", columnDefinition = "VARCHAR(80)")
  private String description;

  // PARENTS

  // CHILDREN
  /** Collection of child entity PrivilegePerRole: Relazione fra Role e Privilege */
  @OneToMany(mappedBy = "thePrivilege", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @ToString.Exclude
  private Collection<PrivilegePerRole> thePrivilegePerRole = new ArrayList<>();

  // CONSTRUCTORS
  /** Constructor of the class Privilege */
  public Privilege(String objectKey) {
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
        privilegePerRole.setThePrivilege(this);
      }
    }
    thePrivilegePerRole = aPrivilegePerRoleList;
  }

  // ADD CHILD
  public void addPrivilegePerRole(PrivilegePerRole privilegePerRole) {
    thePrivilegePerRole.add(privilegePerRole);
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
    objectKey.append(getPrivilegeId());
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
    setPrivilegeId(getLongCheckedAgainstNullContent(array[ctr]));
  }

  // OBJECT TITLE
  public String getObjectTitle() {
    StringBuilder output = new StringBuilder();
    output.append(getName());
    return output.toString();
  }

  // Equals / HashCode
  /** Overrides equals method to compare two Privilege objects */
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
    Privilege that = (Privilege) o;

    return privilegeId != null && Objects.equals(privilegeId, that.privilegeId);
  }

  /** Overrides hashCode method to compute hash code of Privilege object */
  @Override
  public int hashCode() {
    return Objects.hash(privilegeId);
  }
}
