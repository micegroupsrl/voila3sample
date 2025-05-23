package it.micegroup.voila3sample.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/** Class for audit data. This class is extended by entity flagged as auditable. */
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class Auditable extends BaseEntity {
  /** Who has created the entity */
  @CreatedBy
  @Column(name = "created_by", columnDefinition = "VARCHAR(80)", updatable = false)
  private String createdBy;

  /** When the entity has been created */
  @CreatedDate
  @Column(name = "created_date", columnDefinition = "DATETIME", updatable = false)
  private LocalDateTime createdDate;

  /** Who has modified the entity */
  @LastModifiedBy
  @Column(name = "last_modified_by", columnDefinition = "VARCHAR(80)")
  private String lastModifiedBy;

  /** When the entity has been modified */
  @LastModifiedDate
  @Column(name = "last_modified_date", columnDefinition = "DATETIME")
  private LocalDateTime lastModifiedDate;

  /**
   * Get createdBy value
   *
   * @return createdBy
   */
  public String getCreatedBy() {
    return createdBy;
  }

  /**
   * Set the value of createdBy
   *
   * @param createdBy to set
   */
  public void setCreatedBy(String createdBy) {
    this.createdBy = createdBy;
  }

  /**
   * Get createdDate value
   *
   * @return createdDate
   */
  public LocalDateTime getCreatedDate() {
    return createdDate;
  }

  /**
   * Set the value of createdDate
   *
   * @param createdDate to set
   */
  public void setCreatedDate(LocalDateTime createdDate) {
    this.createdDate = createdDate;
  }

  /**
   * Get lastModifiedBy value
   *
   * @return lastModifiedBy
   */
  public String getLastModifiedBy() {
    return lastModifiedBy;
  }

  /**
   * Set the value of lastModifiedBy
   *
   * @param lastModifiedBy to set
   */
  public void setLastModifiedBy(String lastModifiedBy) {
    this.lastModifiedBy = lastModifiedBy;
  }

  /**
   * Get lastModifiedDate value
   *
   * @return lastModifiedDate
   */
  public LocalDateTime getLastModifiedDate() {
    return lastModifiedDate;
  }

  /**
   * Set the value of lastModifiedDate
   *
   * @param lastModifiedDate to set
   */
  public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
    this.lastModifiedDate = lastModifiedDate;
  }
}
