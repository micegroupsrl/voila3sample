package it.micegroup.voila3sample.utilities;


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import net.sf.jasperreports.engine.JasperReport;

@Component
public class JasperReportsCache {
	private Map<String, JasperReport> cache;

	public JasperReportsCache() {
		cache = new ConcurrentHashMap<>();
	}

	/*
	 * Put Jasper Report in the cache with its key
	 */
	public void save(String key, JasperReport jasperReport) {
		cache.put(key, jasperReport);
	}

	/*
	 * Get Jasper Report from the cache by its key
	 */
	public JasperReport load(String key) {
		return cache.get(key);
	}

	/*
	 * Checks if a Jasper Report in the cache by its key
	 */
	public boolean isSaved(String key) {
		return cache.containsKey(key);
	}

}
