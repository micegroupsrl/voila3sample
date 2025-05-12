package it.micegroup.voila3sample.domain;

import it.micegroup.voila3sample.utilities.Constants;
import it.micegroup.voila2runtime.entity.GenericEntity;
import java.time.LocalDate;;

/**
 * Generic class for entities
 *
 */
public abstract class BaseEntity extends GenericEntity {

	protected static String getRowIdFieldDelimiter() {
		return Constants.ROWIDFIELDDELIMITER;
	}

	/**
	 * Aggiungere ai runtime!
	 */
	protected LocalDate getLocalDateCheckedAgainstNullContent(String token) {
		return ("null".equals(token)) ? null : LocalDate.parse(token);
	}

	protected String getLocalDateAsString(LocalDate value) {
		return (value == null) ? "null" : value.toString();
	}
}
