package it.micegroup.voila3sample.security;

import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.userdetails.UserDetails;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JPAAuditConfig {

  @Bean
  public AuditorAware<String> auditorProvider() {
    return new AuditorAware<String>() {
      @Override
      public Optional<String> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() != null) {
          Object principal = auth.getPrincipal();
          return findSubscriber(principal);
        }
        return Optional.of("Unknown");
      }

      private Optional<String> findSubscriber(Object principal) {

        if (principal instanceof UserDetails) {
          UserDetails subscriber = (UserDetails) principal;
          return Optional.of(subscriber.getUsername());
        } else if (principal instanceof String) {
          return Optional.of((String) principal);
        } else if (principal instanceof Jwt) {
          Jwt token = (Jwt) principal;
          String subscriber = (String) token.getClaims().get("sub");
          return Optional.of(subscriber);
        }
        return Optional.of("Unknown");
      }
    };
  }
}
