package it.micegroup.voila3sample.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/** Data transfer object for view a data element of type TipoOrdine */
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ViewTipoOrdineDto extends BaseDto {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 1570483503L;
  private String objectKey;
  private String objectTitle;

  /** Attribute anno of the entity TipoOrdine */
  private Integer anno;

  /** Attribute idTipoOrdine of the entity TipoOrdine */
  private Integer idTipoOrdine;

  /** ObjectKey of CategoriaOrdine, which is parent of the entity TipoOrdine */
  private String theCategoriaOrdineObjectKey;

  /** ObjectTitle of CategoriaOrdine, which is parent of the entity TipoOrdine */
  private String theCategoriaOrdineObjectTitle;
}
