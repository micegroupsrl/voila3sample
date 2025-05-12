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

/**
 * Relazione fra User e Role
 */
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "user_role_membership")
@NamedEntityGraph(name = RolePerUser.DEFAULT_ENTITY_GRAPH, attributeNodes = {
		@NamedAttributeNode(RolePerUser_.THE_ROLE), @NamedAttributeNode(RolePerUser_.THE_USER) })
public class RolePerUser extends BaseEntity implements Serializable {

	public static final String DEFAULT_ENTITY_GRAPH = "EG.RolePerUser";

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 904528529L;

	// COMPOSITE PRIMARY KEY
	@EmbeddedId
	private RolePerUserKey theRolePerUserKey = new RolePerUserKey();

	// ATTRIBUTES

	// PARENTS
	/**
	 * Parent entity Role
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@ToString.Exclude
	@JoinColumn(name = "role_id", referencedColumnName = "role_id", nullable = false, insertable = false, updatable = false)
	@MapsId("roleId")
	private Role theRole;
	/**
	 * Parent entity User: Entità rappresentativa di un utente dell'applicativo
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@ToString.Exclude
	@JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false, insertable = false, updatable = false)
	@MapsId("userId")
	private User theUser;

	// CHILDREN

	// CONSTRUCTORS
	/**
	 * Constructor of the class RolePerUser
	 */
	public RolePerUser(String objectKey) {
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
		return theRolePerUserKey.getRoleId();
	}

	/**
	 * Set the value of the property Role Id of the composite key
	 *
	 * @param aroleId to set
	 */
	public void setRoleId(String roleId) {
		theRolePerUserKey.setRoleId(roleId);
	}

	/**
	 * Get the property User Id of the composite key
	 *
	 * @return the User Id
	 */
	public Long getUserId() {
		return theRolePerUserKey.getUserId();
	}

	/**
	 * Set the value of the property User Id of the composite key
	 *
	 * @param auserId to set
	 */
	public void setUserId(Long userId) {
		theRolePerUserKey.setUserId(userId);
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
	 * Return the object title of theUser.
	 * 
	 * @return the object title of theUser.
	 */
	public String getTheUserObjectTitle() {
		return getTheUser() != null ? getTheUser().getObjectTitle() : null;
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
			theRolePerUserKey.setRoleId(getTheRole().getRoleId());
		}
	}

	/**
	 * Return the object key of theUser.
	 * 
	 * @return the object key of theUser.
	 */
	@ToString.Include
	public String getTheUserObjectKey() {
		return getTheUser() != null ? getTheUser().getObjectKey() : null;
	}

	/**
	 * Set object key of theUser.
	 * 
	 * @param objectKey to set
	 */
	public void setTheUserObjectKey(String objectKey) {
		if (EntityUtils.isValueChanged(getTheUserObjectKey(), objectKey, false)) {
			User user = new User();
			user.setObjectKey(objectKey);
			setTheUser(user);
		}
		if (getTheUser() != null) {
			theRolePerUserKey.setUserId(getTheUser().getUserId());
		}
	}

	// OBJECT KEY
	/**
	 * Restituisce l'identificativo della chiave composita in formato stringa
	 *
	 */
	public String getObjectKey() {
		return theRolePerUserKey.getObjectKey();
	}

	/**
	 * Inizializza la parte identificativa chiamando il setter della chiave
	 * composita
	 *
	 */
	public void setObjectKey(String key) {
		theRolePerUserKey.setObjectKey(key);
	}

	// OBJECT TITLE
	public String getObjectTitle() {
		StringBuilder output = new StringBuilder();
		output.append(getObjectKey());
		return output.toString();
	}

	// Equals / HashCode
	/**
	 * Overrides equals method to compare two RolePerUser objects
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
			return false;
		RolePerUser that = (RolePerUser) o;

		return theRolePerUserKey != null && Objects.equals(theRolePerUserKey, that.theRolePerUserKey);
	}

	/**
	 * Overrides hashCode method to compute hash code of RolePerUser object
	 */
	@Override
	public int hashCode() {
		return Objects.hash(theRolePerUserKey);
	}
}
