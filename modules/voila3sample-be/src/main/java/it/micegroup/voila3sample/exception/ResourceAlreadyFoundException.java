package it.micegroup.voila3sample.exception;

import java.util.HashMap;
import java.util.Map;

public class ResourceAlreadyFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2L;
	
	private final String resource;
	private final String id;
	
	public ResourceAlreadyFoundException(String id) {
		this("Entity", id);
	}
	
	public ResourceAlreadyFoundException(String entityName, String id) {
		super(String.format("Resource <%s> with id <%s> already found", entityName, id));
		this.resource = entityName;
		this.id = id;
	}
	
	public Object getBody() {
		Map<String, String> body = new HashMap<>();
		body.put("resource", resource);
		body.put("id", id);
		return body;
	}
}

