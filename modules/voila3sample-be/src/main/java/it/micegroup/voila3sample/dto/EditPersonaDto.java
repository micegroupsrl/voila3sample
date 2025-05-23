package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** Data transfer object for edit a data element of type Persona */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditPersonaDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 2189577881L;

  /** Attribute nome of the entity Persona */
  private String nome;

  /** Attribute cognome of the entity Persona */
  private String cognome;

  /** Attribute email of the entity Persona */
  private String email;

  /** Attribute telefono of the entity Persona */
  private String telefono;

  /** Attribute idPersona of the entity Persona */
  @NotNull private Integer idPersona;

  /** Attribute cf of the entity Persona */
  @NotBlank private String cf;
}
