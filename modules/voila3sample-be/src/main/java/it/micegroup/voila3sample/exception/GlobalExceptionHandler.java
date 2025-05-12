package it.micegroup.voila3sample.exception;

import static java.util.Optional.ofNullable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ValidationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import it.micegroup.voila2runtime.exception.BusinessException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger logger = LogManager.getLogger();
	
	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<ApiCallError> handleBusinessException(HttpServletRequest request,
			BusinessException ex) {
		logger.info("BusinessException {}\n", request.getRequestURI());

		return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(new ApiCallError("BusinessException", ex.getMessages()));
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiCallError> handleNotFoundException(HttpServletRequest request,
			ResourceNotFoundException ex) {
		logger.error("ResourceNotFoundException {}\n", request.getRequestURI());

		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ApiCallError("NotFoundException", ex.getBody()));
	}
	
	@ExceptionHandler(ResourceAlreadyFoundException.class)
	public ResponseEntity<ApiCallError> handleAlreadyFoundException(HttpServletRequest request,
			ResourceAlreadyFoundException ex) {
		logger.warn("ResourceAlreadyFoundException {}\n", request.getRequestURI());

		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ApiCallError("AlreadyFoundException", ex.getBody()));
	}

	@ExceptionHandler(ValidationException.class)
	public ResponseEntity<ApiCallError> handleValidationException(HttpServletRequest request, ValidationException ex) {
		logger.error("ValidationException {}\n", request.getRequestURI());

		return ResponseEntity.badRequest().body(new ApiCallError("Validation exception", ex.getMessage()));
	}

	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<ApiCallError> handleMissingServletRequestParameterException(HttpServletRequest request,
			MissingServletRequestParameterException ex) {
		logger.error("handleMissingServletRequestParameterException {}\n", request.getRequestURI(), ex);

		return ResponseEntity.badRequest().body(new ApiCallError("Missing request parameter", ex.getMessage()));
	}
	
	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ApiCallError> handleMethodArgumentTypeMismatchException(HttpServletRequest request,
			MethodArgumentTypeMismatchException ex) {
		logger.error("handleMethodArgumentTypeMismatchException {}\n", request.getRequestURI(), ex);

		Map<String, Object> details = new HashMap<>();
		details.put("paramName", ex.getName());
		details.put("paramValue", ofNullable(ex.getValue()).map(Object::toString).orElse(""));
		details.put("errorMessage", ex.getMessage());

		return ResponseEntity.badRequest().body(new ApiCallError("MethodArgumentTypeMismatch", details));
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiCallError> handleMethodArgumentNotValidException(HttpServletRequest request,
			MethodArgumentNotValidException ex) {
		logger.error("handleMethodArgumentNotValidException {}\n", request.getRequestURI());

		List<Map<String, Object>> details = new ArrayList<>();
		ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
			Map<String, Object> detail = new HashMap<>();
			detail.put("objectName", sanitize(fieldError.getObjectName()));
			detail.put("arguments", fieldError.getArguments());
			detail.put("codes",  sanitize(fieldError.getCodes()));
			detail.put("field", fieldError.getField());
			detail.put("rejectedValue", "" + fieldError.getRejectedValue());
			detail.put("errorMessage", fieldError.getDefaultMessage());
			details.add(detail);
		});

		return ResponseEntity.badRequest().body(new ApiCallError("MethodArgumentValidationFailed", details));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiCallError> handleInternalServerError(HttpServletRequest request, Exception ex) {
		logger.error("handleInternalServerError {}\n", request.getRequestURI(), ex);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ApiCallError("Internal server error", ex.getMessage()));
	}
	
	@ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiCallError> handleAccessDeniedException(HttpServletRequest request, AccessDeniedException ex) {
        logger.error("handleAccessDeniedException {}\n", request.getRequestURI(), ex);
  
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new ApiCallError("Access denied!", ex.getMessage()));
    }
	
	private static Object[] sanitize(Object[] input) {
		String[] result = new String[input.length];
		for (int i=0; i< input.length; i++) {
			result[i] = sanitize(input[i].toString());
		}
		return result;
	}
	
	private static String sanitize(String input) {
		input = input.replace(".edit", ".");
		input = input.replace("Dto", "");
		if (input.startsWith("edit")) {
			input = input.substring(4);
		}
		return input;
	}
}
