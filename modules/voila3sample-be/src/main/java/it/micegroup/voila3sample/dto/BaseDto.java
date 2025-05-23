package it.micegroup.voila3sample.dto;

import java.io.Serializable;

import org.springframework.data.annotation.Transient;

public abstract class BaseDto implements Serializable {

  private static final long serialVersionUID = 4194007193178138872L;

  private static final String STATE_UPDATED = "U";
  private static final String STATE_DELETED = "D";
  private static final String STATE_CREATED = "C";

  @Transient private String entityState = "";

  /**
   * Get value of entityState
   *
   * @return entityState
   */
  public String getEntityState() {
    return entityState;
  }

  /**
   * Set value of entityState
   *
   * @param entityState
   */
  public void setEntityState(String entityState) {
    this.entityState = entityState;
  }

  /** Set value of entityState to Updated */
  public void setUpdatedEntityState() {
    setEntityState(STATE_UPDATED);
  }

  /** Set value of entityState to Deleted */
  public void setDeletetedEntityState() {
    setEntityState(STATE_DELETED);
  }

  /** Set value of entityState to Created */
  public void setCreatedEntityState() {
    setEntityState(STATE_CREATED);
  }

  /** Reset value of entityState */
  public void resetEntityState() {
    setEntityState("");
  }

  /** Check if entityState is Updated */
  public boolean isUpdatedEntityState() {
    return (STATE_UPDATED.equals(getEntityState()));
  }

  /** Check if entityState is Deleted */
  public boolean isDeletedEntityState() {
    return (STATE_DELETED.equals(getEntityState()));
  }

  /** Check if entityState is Created */
  public boolean isCreatedEntityState() {
    return (STATE_CREATED.equals(getEntityState()));
  }
}
