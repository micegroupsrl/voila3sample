package it.micegroup.voila3sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration(exclude = LiquibaseAutoConfiguration.class)
@ComponentScan({ "it.micegroup.voila3sample.*", "it.micegroup.voila2runtime" })
public class Voila3Sample {
	/**
	 * Main Voila3Sample, run as java application to start the microservice
	 */
	public static void main(String[] args) {
		SpringApplication.run(Voila3Sample.class, args);
	}
}
