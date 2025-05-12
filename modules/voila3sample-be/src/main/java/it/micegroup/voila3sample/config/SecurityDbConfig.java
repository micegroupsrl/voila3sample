package it.micegroup.voila3sample.config;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(entityManagerFactoryRef = "securityEntityManagerFactory", basePackages = {
		"it.micegroup.voila3sample.repository.security" }, transactionManagerRef = "securityTransactionManager")
public class SecurityDbConfig {
	@Bean(name = "SecurityDataSource")
	@ConfigurationProperties(prefix = "spring.datasource.security")
	public DataSource dataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean(name = "securityEntityManagerFactory")
	public LocalContainerEntityManagerFactoryBean securityEntityManagerFactory(EntityManagerFactoryBuilder builder,
			@Qualifier("SecurityDataSource") DataSource dataSource) {
		return builder.dataSource(dataSource).packages("it.micegroup.voila3sample.domain.security")
				.persistenceUnit("security") // ??
				.build();
	}

	@Bean(name = "securityTransactionManager")
	public PlatformTransactionManager securityTransactionManager(
			@Qualifier("securityEntityManagerFactory") EntityManagerFactory securityEntityManagerFactory) {
		return new JpaTransactionManager(securityEntityManagerFactory);
	}
}
