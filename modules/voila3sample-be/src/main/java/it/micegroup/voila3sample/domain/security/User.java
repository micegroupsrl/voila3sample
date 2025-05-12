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

import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.FetchType;

import java.util.Collection;
import java.util.ArrayList;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

/**
 * Entità rappresentativa di un utente dell'applicativo
 */
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "security_user")
public class User extends BaseEntity implements Serializable {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 3487781214L;

	// ATTRIBUTES

	/**
	 * Identificativo dell'utente
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// WARNING For some RDBMS this syntax may not work. Manually delete COMMENT if
	// you are not using Mysql.
	@Column(name = "user_id", columnDefinition = "BIGINT(36)")
	private Long userId;

	/**
	 * L'email dell'utente
	 */
	@Column(name = "email", columnDefinition = "VARCHAR(80)")
	private String email;

	/**
	 * Password
	 */
	@Column(name = "password", columnDefinition = "VARCHAR(80)")
	private String password;

	/**
	 * Il nome utente
	 */
	@Column(name = "username", columnDefinition = "VARCHAR(80)")
	private String username;

	// PARENTS

	// CHILDREN
	/**
	 * Collection of child entity RolePerUser: Relazione fra User e Role
	 */
	@OneToMany(mappedBy = "theUser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@ToString.Exclude
	private Collection<RolePerUser> theRolePerUser = new ArrayList<>();

	// CONSTRUCTORS
	/**
	 * Constructor of the class User
	 */
	public User(String objectKey) {
		super();
		setObjectKey(objectKey);
	}

	// CHILD GETTER/SETTER
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
				rolePerUser.setTheUser(this);
			}
		}
		theRolePerUser = aRolePerUserList;
	}

	// ADD CHILD
	public void addRolePerUser(RolePerUser rolePerUser) {
		theRolePerUser.add(rolePerUser);
	}

	// PARENT GETTER/SETTER

	// PARENT ID GETTER/SETTER

	// PARENT OBJECT TITLE

	// PARENT OBJECT KEY

	// OBJECT KEY
	/**
	 * Restituisce l'identificativo della chiave in formato stringa. Ritorna
	 * conveniente nelle selezioni da lista.
	 * 
	 * @return L'identificativo della chiave in formato pk1||pk2||pk3...
	 */
	public String getObjectKey() {
		StringBuilder objectKey = new StringBuilder();
		objectKey.append(getUserId());
		return objectKey.toString();
	}

	/**
	 * Inizializza la parte identificativa del bean in base alla stringa tokenizzata
	 * da "||" fornita in input.
	 * 
	 * @param key L'identificativo della chiave in formato pk1||pk2||pk3...
	 */
	public void setObjectKey(String key) {
		if (key == null || key.trim().length() == 0) {
			return;
		}
		String[] array = StringUtils.splitByWholeSeparatorPreserveAllTokens(key, getRowIdFieldDelimiter());
		int ctr = 0;
		setUserId(getLongCheckedAgainstNullContent(array[ctr]));
	}

	// OBJECT TITLE
	public String getObjectTitle() {
		StringBuilder output = new StringBuilder();
		output.append(getEmail());
		return output.toString();
	}

	// Equals / HashCode
	/**
	 * Overrides equals method to compare two User objects
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o))
			return false;
		User that = (User) o;

		return userId != null && Objects.equals(userId, that.userId);
	}

	/**
	 * Overrides hashCode method to compute hash code of User object
	 */
	@Override
	public int hashCode() {
		return Objects.hash(userId);
	}
}
