package it.micegroup.voila3sample.config;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Qualifier;

import liquibase.integration.spring.SpringLiquibase;

@Configuration
public class LiquibaseConfigurationBean {
	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.security.liquibase")
	public LiquibaseProperties securityLiquibaseProperties() {
		return new LiquibaseProperties();
	}

	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.primary.liquibase")
	public LiquibaseProperties primaryLiquibaseProperties() {
		return new LiquibaseProperties();
	}

	@Bean
	public CustomSpringLiquibase securityLiquibase(@Qualifier("SecurityDataSource") DataSource securityDataSource) {
		return liquibase(securityLiquibaseProperties(), securityDataSource, true);
	}

	@Bean
	public CustomSpringLiquibase primaryLiquibase(@Qualifier("PrimaryDataSource") DataSource primaryDataSource) {
		return liquibase(primaryLiquibaseProperties(), primaryDataSource, true);
	}

	public CustomSpringLiquibase liquibase(LiquibaseProperties liquibaseProperties, DataSource datasource,
			boolean shouldRun) {
		SpringLiquibase liquibase = new SpringLiquibase();
		liquibase.setChangeLog(liquibaseProperties.getChangeLog());
		liquibase.setContexts(liquibaseProperties.getContexts());
		liquibase.setDataSource(datasource);
		liquibase.setDefaultSchema(liquibaseProperties.getDefaultSchema());
		liquibase.setDropFirst(liquibaseProperties.isDropFirst());
		liquibase.setShouldRun(shouldRun);
		liquibase.setLabelFilter(liquibaseProperties.getLabelFilter());
		liquibase.setChangeLogParameters(liquibaseProperties.getParameters());
		return new CustomSpringLiquibase(liquibase);
	}
}
