package it.micegroup.voila3sample.dto;

import java.time.LocalDateTime;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type Prodotto */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewProdottoDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 1332726154L;
  private String objectKey;
  private String objectTitle;

  /** Attribute idProdotto of the entity Prodotto */
  private Integer idProdotto;

  /** Attribute descrizione of the entity Prodotto */
  private String descrizione;

  /** Attribute createdBy of the entity Prodotto */
  private String createdBy;

  /** Attribute lastModifiedBy of the entity Prodotto */
  private String lastModifiedBy;

  /** Attribute createdDate of the entity Prodotto */
  private LocalDateTime createdDate;

  /** Attribute lastModifiedDate of the entity Prodotto */
  private LocalDateTime lastModifiedDate;

  /** ObjectKey of Fornitore, which is parent of the entity Prodotto */
  private String theFornitoreObjectKey;

  /** ObjectTitle of Fornitore, which is parent of the entity Prodotto */
  private String theFornitoreObjectTitle;
}
