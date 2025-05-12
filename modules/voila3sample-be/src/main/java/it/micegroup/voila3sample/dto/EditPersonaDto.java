package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Data transfer object for edit a data element of type Persona
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditPersonaDto extends BaseDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 2621278788L;

	/**
	 * Attribute idPersona of the entity Persona
	 */
	@NotNull
	private Integer idPersona;

	/**
	 * Attribute codiceFiscale of the entity Persona
	 */
	@NotBlank
	private String codiceFiscale;

}
