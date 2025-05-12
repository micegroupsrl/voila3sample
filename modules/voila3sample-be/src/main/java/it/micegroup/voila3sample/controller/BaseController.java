package it.micegroup.voila3sample.controller;

import it.micegroup.voila2runtime.controller.GenericController;
import it.micegroup.voila3sample.domain.BaseEntity;

/**
 * Generic class for controllers
 *
 */
public abstract class BaseController<T extends BaseEntity> extends GenericController<T> {
	/**
	 * Authority constant
	 */
	protected static final String AUTH = "hasPrivilege";
	/**
	 * Application name
	 */
	protected static final String APPLICATION_NAME = "voila3sample";
}
