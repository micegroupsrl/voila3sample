package it.micegroup.voila3sample.config;

import it.micegroup.voila3sample.actuator.Voila3sampleInterceptor;
import it.micegroup.voila3sample.actuator.Voila3sampleProperties;

import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.handler.MappedInterceptor;

import io.micrometer.core.instrument.MeterRegistry;
import lombok.extern.slf4j.Slf4j;

@EnableConfigurationProperties(Voila3sampleProperties.class)
@Configuration
@Slf4j
public class Voila3sampleConfig {
  @Bean
  @Autowired
  public MappedInterceptor metricInterceptor(
      MeterRegistry registry, Voila3sampleInterceptor interceptor) {
    interceptor.setRegistry(registry);
    return new MappedInterceptor(new String[] {"/**"}, interceptor);
  }

  @Bean
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }

  @Bean
  public MessageSource messageSource() {
    ReloadableResourceBundleMessageSource source = new ReloadableResourceBundleMessageSource();
    source.setBasename("classpath:/messages");
    source.setUseCodeAsDefaultMessage(true);
    return source;
  }

  @Bean
  public VelocityEngine velocityEngine() {
    VelocityEngine velocityEngine = new VelocityEngine();
    try {
      velocityEngine.setProperty("runtime.references.strict", true);
      velocityEngine.init();
    } catch (Exception e) {
      log.error("Error on Velocity Init, Stack Trace:", e);
    }
    return velocityEngine;
  }
}
