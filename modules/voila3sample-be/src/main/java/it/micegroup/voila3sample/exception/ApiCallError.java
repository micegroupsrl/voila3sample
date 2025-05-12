package it.micegroup.voila3sample.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiCallError {
	private String reasonPhrase; // HTTP STATUS REASON PHRASE
	private Object message; // BREAF ERROR DESCRIPTION
	private String instance; // PATH

	public ApiCallError(String reasonPhrase, Object message) {
		this.reasonPhrase = reasonPhrase;
		this.message = message;
	}
}
