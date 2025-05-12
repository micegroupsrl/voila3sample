package it.micegroup.voila3sample.utilities;

public class Constants {
	/*
	 * Separator for external ids in the object key of an entity having composite
	 * key
	 */
	public static final String ROWIDFIELDDELIMITER = "~";
	public static final String CORRELATION_KEY = "X-Correlation-ID";

	private Constants() {
		throw new IllegalStateException("Utility class");
	}
}