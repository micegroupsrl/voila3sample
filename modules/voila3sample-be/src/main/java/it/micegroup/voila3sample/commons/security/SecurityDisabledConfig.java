package it.micegroup.voila3sample.commons.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import it.micegroup.voila3sample.jwt.AuthTokenFilter;
import it.micegroup.voila3sample.service.UserDetailsServiceImpl;

/**
 * Configuration che disabilita la sicurezza web se la property
 * websecurity.enabled è false
 * 
 * @author Paolo Caruso paolo.caruso@micegroup.it
 *
 */
@Configuration
@EnableMethodSecurity(prePostEnabled = false)
@ConditionalOnProperty(name = "websecurity.enabled", havingValue = "false", matchIfMissing = true)
public class SecurityDisabledConfig {
	@Autowired
	UserDetailsServiceImpl userDetailsService;
	
	@Value("${websecurity.cors.ports.disabled}")
	private String[] allowedPorts;
	
	@Value("${websecurity.cors.headers}")
	private String[] allowedHeaders;
	
	@Value("${websecurity.cors.methods}")
	private String[] allowedMethods;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain disabledSecurity(HttpSecurity http, HandlerMappingIntrospector introspector)
			throws Exception {
		http.csrf(AbstractHttpConfigurer::disable);

		http.headers(headers -> headers.frameOptions(frameOption -> frameOption.sameOrigin()));

		http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
		http.formLogin(Customizer.withDefaults());
		http.httpBasic(Customizer.withDefaults());
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		return http.build();
	}

	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList(allowedPorts));
		configuration.setAllowedHeaders(Arrays.asList(allowedHeaders));
		configuration.setAllowedMethods(Arrays.asList(allowedMethods));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}