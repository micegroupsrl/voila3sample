package it.micegroup.voila3sample.actuator;

import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import io.micrometer.core.instrument.MeterRegistry;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Component
@Slf4j
public class Voila3SampleInterceptor implements HandlerInterceptor, ApplicationContextAware {
	private MeterRegistry registry;

	@Autowired
	private EntityManager entityManager;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		String uri;
		String pathKey;
		String method;
		uri = request.getRequestURI();
		method = request.getMethod();
		if (!uri.contains("prometheus")) {
			log.info(" >> PATH: {} METHOD: {}", uri, method);
			pathKey = "api_".concat(method.toLowerCase()).concat(uri.replace("/", "_").toLowerCase());
			this.registry.counter(pathKey).increment();
		}
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		entityManager = applicationContext.getBean(EntityManager.class);
	}
}
