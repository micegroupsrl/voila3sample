package it.micegroup.voila3sample.actuator;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "voila3sample")
public class Voila3SampleProperties {
	private String path;
}
