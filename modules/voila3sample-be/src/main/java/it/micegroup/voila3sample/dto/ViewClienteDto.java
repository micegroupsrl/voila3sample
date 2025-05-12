package it.micegroup.voila3sample.dto;

import java.time.LocalDateTime;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * Data transfer object for view a data element of type Cliente
 */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewClienteDto extends ViewPersonaDto {

	// Generated SERIAL VERSION UID
	private static final long serialVersionUID = 1182646175L;
	private String objectTitle;

	/**
	 * Attribute email of the entity Cliente
	 */
	private String email;
	/**
	 * Attribute telefono of the entity Cliente
	 */
	private String telefono;
	/**
	 * Attribute indirizzo of the entity Cliente
	 */
	private String indirizzo;

}
