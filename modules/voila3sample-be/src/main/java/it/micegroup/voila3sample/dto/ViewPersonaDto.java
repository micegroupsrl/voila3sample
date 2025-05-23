package it.micegroup.voila3sample.dto;

import java.time.LocalDateTime;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type Persona */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewPersonaDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 2189577881L;
  private String objectKey;
  private String objectTitle;

  /** Attribute nome of the entity Persona */
  private String nome;

  /** Attribute cognome of the entity Persona */
  private String cognome;

  /** Attribute email of the entity Persona */
  private String email;

  /** Attribute telefono of the entity Persona */
  private String telefono;

  /** Attribute idPersona of the entity Persona */
  private Integer idPersona;

  /** Attribute cf of the entity Persona */
  private String cf;

  /** Attribute createdBy of the entity Persona */
  private String createdBy;

  /** Attribute lastModifiedBy of the entity Persona */
  private String lastModifiedBy;

  /** Attribute createdDate of the entity Persona */
  private LocalDateTime createdDate;

  /** Attribute lastModifiedDate of the entity Persona */
  private LocalDateTime lastModifiedDate;
}
