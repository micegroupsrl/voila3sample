package it.micegroup.voila3sample.dto;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type Ordine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 2968581006L;
  private String objectKey;
  private String objectTitle;

  /** Attribute idOrdine of the entity Ordine */
  private Integer idOrdine;

  /** Attribute descrizione of the entity Ordine */
  private String descrizione;

  /** Attribute datetime of the entity Ordine */
  private LocalDateTime datetime;

  /** Attribute date of the entity Ordine */
  private LocalDate date;

  /** Attribute time of the entity Ordine */
  private LocalTime time;

  /** Attribute createdBy of the entity Ordine */
  private String createdBy;

  /** Attribute lastModifiedBy of the entity Ordine */
  private String lastModifiedBy;

  /** Attribute createdDate of the entity Ordine */
  private LocalDateTime createdDate;

  /** Attribute lastModifiedDate of the entity Ordine */
  private LocalDateTime lastModifiedDate;

  /** ObjectKey of StatoOrdine, which is parent of the entity Ordine */
  private String theStatoOrdineObjectKey;

  /** ObjectTitle of StatoOrdine, which is parent of the entity Ordine */
  private String theStatoOrdineObjectTitle;

  /** ObjectKey of TipoOrdine, which is parent of the entity Ordine */
  private String theTipoOrdineObjectKey;

  /** ObjectTitle of TipoOrdine, which is parent of the entity Ordine */
  private String theTipoOrdineObjectTitle;

  /** ObjectKey of Cliente, which is parent of the entity Ordine */
  private String theClienteObjectKey;

  /** ObjectTitle of Cliente, which is parent of the entity Ordine */
  private String theClienteObjectTitle;

  /** ObjectKey of OrdineAggregato, which is parent of the entity Ordine */
  private String theOrdineAggregatoObjectKey;

  /** ObjectTitle of OrdineAggregato, which is parent of the entity Ordine */
  private String theOrdineAggregatoObjectTitle;
}
