package it.micegroup.voila3sample.payload;

import java.util.List;

public class UserInfoResponse {
	private String username;
	private String email;
	private List<String> roles;

	public UserInfoResponse(String username, String email, List<String> roles) {
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
}
