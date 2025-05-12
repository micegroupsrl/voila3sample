package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type Persona
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewPersonaDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 2621278788L;
	private String objectKey;
	private String objectTitle;

	/**
	 * Attribute idPersona of the entity Persona
	 */
	private Integer idPersona;
	/**
	 * Attribute codiceFiscale of the entity Persona
	 */
	private String codiceFiscale;

}
