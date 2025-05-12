package it.micegroup.voila3sample.service;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.micegroup.voila3sample.domain.security.User;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private String username;

	private String email;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(String username, String email, String password,
			Collection<? extends GrantedAuthority> authorities) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}

	/**
	 * Method which returns UserDetailsImpl object using User's username, email,
	 * password and its authorities
	 */
	public static UserDetailsImpl build(User user, Collection<String> privileges) {
		List<GrantedAuthority> authorities = privileges.stream()
				.map(privilege -> new SimpleGrantedAuthority("ROLE_" + privilege))
				.collect(Collectors.toList());

		return new UserDetailsImpl(user.getUsername(), user.getEmail(), user.getPassword(), authorities);
	}

	/**
	 * Overrides getUsername method to return UserDetailsImpl object's username
	 */
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	/**
	 * Overrides getEmail method to return UserDetailsImpl object's email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Overrides getPassword method to return UserDetailsImpl object's password
	 */
	@Override
	public String getPassword() {
		return password;
	}

	/**
	 * Overrides getUsername method to return UserDetailsImpl object's username
	 */
	@Override
	public String getUsername() {
		return username;
	}

	/**
	 * Overrides isAccountNonExpired method to return if UserDetailsImpl object has
	 * account non expired
	 */
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	/**
	 * Overrides isAccountNonLocked method to return if UserDetailsImpl object has
	 * account non locked
	 */
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	/**
	 * Overrides isCredentialsNonExpired method to return if UserDetailsImpl object
	 * has credential non expired
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/**
	 * Overrides isEnabled method to return if UserDetailsImpl object is enabled
	 */
	@Override
	public boolean isEnabled() {
		return true;
	}

	/**
	 * Overrides equals method to compare two UserDetailsImpl objects
	 */
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(email, user.email);
	}

	/**
	 * Overrides hashCode method to compute hash code of UserDetailsImpl object
	 */
	@Override
	public int hashCode() {
		return Objects.hash(email);
	}
}