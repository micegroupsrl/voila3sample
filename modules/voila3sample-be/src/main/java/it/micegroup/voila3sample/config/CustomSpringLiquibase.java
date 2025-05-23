package it.micegroup.voila3sample.config;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.BeanNameAware;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.ResourceLoader;

import liquibase.exception.LiquibaseException;
import liquibase.integration.spring.SpringLiquibase;

@Slf4j
public class CustomSpringLiquibase implements InitializingBean, BeanNameAware, ResourceLoaderAware {

  private SpringLiquibase springLiquibase;

  public CustomSpringLiquibase(SpringLiquibase liquibase) {
    springLiquibase = liquibase;
  }

  @Override
  public void afterPropertiesSet() {
    try {
      springLiquibase.afterPropertiesSet();
    } catch (LiquibaseException e) {
      log.error("LiquibaseConfig ", e);
    }
  }

  @Override
  public void setBeanName(String name) {
    springLiquibase.setBeanName(name);
  }

  @Override
  public void setResourceLoader(ResourceLoader resourceLoader) {
    springLiquibase.setResourceLoader(resourceLoader);
  }
}
