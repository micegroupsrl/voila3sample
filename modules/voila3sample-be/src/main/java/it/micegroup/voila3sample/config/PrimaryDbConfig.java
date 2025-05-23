package it.micegroup.voila3sample.config;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
    entityManagerFactoryRef = "primaryEntityManagerFactory",
    basePackages = {"it.micegroup.voila3sample.repository.primary"},
    transactionManagerRef = "primaryTransactionManager")
public class PrimaryDbConfig {
  @Primary
  @Bean(name = "PrimaryDataSource")
  @ConfigurationProperties(prefix = "spring.datasource.primary")
  public DataSource dataSource() {
    return DataSourceBuilder.create().build();
  }

  @Primary
  @Bean(name = "primaryEntityManagerFactory")
  public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory(
      EntityManagerFactoryBuilder builder, @Qualifier("PrimaryDataSource") DataSource dataSource) {
    return builder
        .dataSource(dataSource)
        .packages("it.micegroup.voila3sample.domain.primary")
        .persistenceUnit("primary") // ??
        .build();
  }

  @Primary
  @Bean(name = "primaryTransactionManager")
  public PlatformTransactionManager primaryTransactionManager(
      @Qualifier("primaryEntityManagerFactory") EntityManagerFactory primaryEntityManagerFactory) {
    return new JpaTransactionManager(primaryEntityManagerFactory);
  }
}
