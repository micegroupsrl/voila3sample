package it.micegroup.voila3sample.commons.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import it.micegroup.voila3sample.jwt.AuthEntryPointJwt;
import it.micegroup.voila3sample.jwt.AuthTokenFilter;
import it.micegroup.voila3sample.service.UserDetailsServiceImpl;
import lombok.extern.slf4j.Slf4j;

/**
 * Configuration che abilita la sicurezza web se la property websecurity.enabled
 * è true
 * 
 * @author Paolo Caruso paolo.caruso@micegroup.it
 *
 */
@Slf4j
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
@ConditionalOnProperty(name = "websecurity.enabled", havingValue = "true")
public class SecurityEnabledConfig {
	@Autowired
	UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	
	@Value("${websecurity.cors.ports.enabled}")
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
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());

		return authProvider;
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
	public SecurityFilterChain enabledSecurity(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)
						.accessDeniedHandler(new BearerTokenAccessDeniedHandler()))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth.requestMatchers(new AntPathRequestMatcher("/api/auth/**"))
						.permitAll().requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()
						.anyRequest().authenticated());

		http.headers(headers -> headers.frameOptions(frameOption -> frameOption.sameOrigin()));

		http.authenticationProvider(authenticationProvider());
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowCredentials(true);
		configuration.setAllowedOrigins(Arrays.asList(allowedPorts));
		configuration.setAllowedHeaders(Arrays.asList(allowedHeaders));
		configuration.setAllowedMethods(Arrays.asList(allowedMethods));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
