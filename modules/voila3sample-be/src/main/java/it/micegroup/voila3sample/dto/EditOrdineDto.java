package it.micegroup.voila3sample.dto;

import lombok.Setter;
import lombok.Getter;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/** Data transfer object for edit a data element of type Ordine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class EditOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 2968581006L;

  /** Attribute idOrdine of the entity Ordine */
  @NotNull private Integer idOrdine;

  /** Attribute descrizione of the entity Ordine */
  private String descrizione;

  /** Attribute datetime of the entity Ordine */
  private LocalDateTime datetime;

  /** Attribute date of the entity Ordine */
  private LocalDate date;

  /** Attribute time of the entity Ordine */
  private LocalTime time;

  /** ObjectKey of StatoOrdine, which is parent of the entity Ordine */
  private String theStatoOrdineObjectKey;

  /** ObjectKey of TipoOrdine, which is parent of the entity Ordine */
  private String theTipoOrdineObjectKey;

  /** ObjectKey of Cliente, which is parent of the entity Ordine */
  private String theClienteObjectKey;

  /** ObjectKey of OrdineAggregato, which is parent of the entity Ordine */
  private String theOrdineAggregatoObjectKey;

  /** Collection of Edit Dto of RigaOrdine, which is child of the entity Ordine */
  private Collection<EditRigaOrdineDto> theRigaOrdine;

  /** Collection of Edit Dto of Ordine, which is child of the entity Ordine */
  private Collection<EditOrdineDto> theOrdineFiglio;
}
