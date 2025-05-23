package it.micegroup.voila3sample.domain.security;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.lang3.StringUtils;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import it.micegroup.voila3sample.domain.BaseEntity;

import it.micegroup.voila2runtime.utils.EntityUtils;

@Getter
@Setter
@Embeddable
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class RolePerUserKey extends BaseEntity implements Serializable {

  // Generated SERIAL VERSION UID
  private static final long serialVersionUID = 904528529L;

  // ATTRIBUTES
  /** Id roleId of Role */
  @Column(name = "role_id", columnDefinition = "VARCHAR(80)")
  private String roleId;

  /** Id userId of User */
  @Column(name = "user_id", columnDefinition = "BIGINT(20)")
  private Long userId;

  // Getter & Setter for parent entity attributes

  // Getter & Setter for Object Key
  /**
   * Restituisce l'identificativo della chiave in formato stringa. Ritorna conveniente nelle
   * selezioni da lista.
   *
   * @return L'identificativo della chiave in formato pk1||pk2||pk3...
   */
  public String getObjectKey() {
    StringBuilder output = new StringBuilder();
    output.append(getRoleId());
    output.append(getRowIdFieldDelimiter());
    output.append(getUserId());
    return output.toString();
  }

  /**
   * Inizializza la parte identificativa del bean in base alla stringa tokenizzata da "||" fornita
   * in input.
   *
   * @param key L'identificativo della chiave in formato pk1||pk2||pk3...
   */
  public void setObjectKey(String key) {
    if (key == null || key.trim().length() == 0) {
      return;
    }
    String[] array =
        StringUtils.splitByWholeSeparatorPreserveAllTokens(key, getRowIdFieldDelimiter());
    int ctr = 0;
    setRoleId(getStringCheckedAgainstNullContent(array[ctr++]));
    setUserId(getLongCheckedAgainstNullContent(array[ctr]));
  }
}
