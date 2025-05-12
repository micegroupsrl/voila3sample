package it.micegroup.voila3sample.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.turkraft.springfilter.boot.Filter;

import io.swagger.v3.oas.annotations.Operation;

import it.micegroup.voila3sample.domain.primary.Persona;

import it.micegroup.voila3sample.dto.EditPersonaDto;
import it.micegroup.voila3sample.dto.ViewPersonaDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.PersonaMapper;

import it.micegroup.voila3sample.service.PersonaService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/persona", produces = MediaType.APPLICATION_JSON_VALUE)
public class PersonaController extends BaseController<Persona> {
	/// ENTITY SERVICE
	private final PersonaService personaService;
	private final PersonaMapper personaMapper;

	// API
	/**
	 * {@code GET /persona} : Get all persona.
	 * 
	 * @param pageable
	 * @return Page of all Persona.
	 */
	@GetMapping
	@Operation(summary = "Get all Persona")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_SEARCH.toString())")
	public ResponseEntity<Page<ViewPersonaDto>> findAll(Pageable pageable) {
		Page<ViewPersonaDto> collModel = personaMapper.map(personaService.findAll(pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * {@code POST  /persona} : Create a new Persona.
	 *
	 * @param requestBody the Persona to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new Persona, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is invalid.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping
	@Operation(summary = "Create a new Persona")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_CREATE.toString())")
	public ResponseEntity<ViewPersonaDto> insert(@RequestBody @Valid EditPersonaDto requestBody) {
		Persona entity = personaMapper.map(requestBody);
		if (personaService.findByObjectKey(entity.getObjectKey()).isPresent()) {
			throw new ResourceAlreadyFoundException(Persona.class.getSimpleName(), entity.getObjectKey());
		} else {

			entity = personaService.insert(entity);

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getThePersonaKey()).toUri();
			ViewPersonaDto dto = personaMapper.map(entity);
			return ResponseEntity.created(location).body(dto);
		}
	}

	/**
	 * {@code GET  /persona/:objectKey} : Get the persona with given objectKey.
	 *
	 * @param objectKey the objectKey of the persona to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the persona, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/{objectKey:.+}")
	@Operation(summary = "Get the Persona with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_READ.toString())")
	public ResponseEntity<ViewPersonaDto> read(@PathVariable String objectKey) {
		Optional<Persona> opt = Optional.of(personaService.findByObjectKey(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Persona.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code PUT  /persona} : Updates an existing Persona.
	 *
	 * @param requestBody the Persona to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated Persona, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the Persona couldn't be
	 *         updated.
	 */
	@PutMapping
	@Operation(summary = "Update an existing Persona")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_UPDATE.toString())")
	public ResponseEntity<ViewPersonaDto> update(@RequestBody @Valid EditPersonaDto requestBody) {
		Persona entity = personaMapper.map(requestBody);
		entity = personaService.bulkUpdate(entity);
		ViewPersonaDto dto = personaMapper.map(entity);
		return ResponseEntity.ok(dto);
	}

	/**
	 * {@code DELETE  /persona/:objectKey} : Delete the persona with given
	 * objectKey.
	 *
	 * @param objectKey the objectKey of the Persona to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/{objectKey:.+}")
	@Operation(summary = "Delete the Persona with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_DELETE.toString())")
	public ResponseEntity<ViewPersonaDto> delete(@PathVariable String objectKey) {
		Optional<Persona> opt = Optional.of(personaService.delete(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Persona.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code GET  /persona/search?filter=:query} : Get the persona filtered by
	 * given query.
	 *
	 * @param query the query to execute filtering the Persona to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the persona.
	 */
	@GetMapping("/search")
	@Operation(summary = "Get the Persona filtered by given query")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_SEARCH.toString())")
	public ResponseEntity<Page<ViewPersonaDto>> search(@Filter Specification<Persona> specification, Pageable page) {
		Page<ViewPersonaDto> collModel = personaMapper.map(personaService.search(specification, page));
		return toResponseEntityPaged(collModel, null);
	}

	// PDF Report
	/**
	 * GET: /pdf/{objectKey:.+}: Print PDF for Persona by object key.
	 * 
	 * @param objectKey
	 * @return PDF document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
	@Operation(summary = "Print PDF for Persona by object key")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_REPORT.toString())")
	public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
		return super.genJasperReportPdf(personaService.printPdfReport(objectKey));
	}

	// Xls Report
	/**
	 * GET: /print/xlsx-list: Return the XLS list report for Persona filtered by
	 * specification in input GET.
	 * 
	 * @param criteria
	 * @return XLS document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
	@Operation(summary = "Return the XLS list report for Persona filtered by criteria in input GET")
	@PreAuthorize("hasRole(@permissionHolder.PERSONA_REPORT.toString())")
	public void printXlsxList(@Filter Specification<Persona> specification, HttpServletResponse response) {
		byte[] body = personaService.printXLSList(specification);
		prepareReportResponse("Elenco Persona.xlsx", body, response,
				MediaType.parseMediaType("application/vnd.ms-excel"), "application/octet-stream");
	}

	/**
	 * Returns a ResponseEntity containing a ViewPersonaDto mapped by the
	 * Optional<Persona>, header and status passed in input
	 */
	private ResponseEntity<ViewPersonaDto> toResponseEntity(Optional<Persona> maybeResponse, HttpHeaders header,
			HttpStatus status) {
		return maybeResponse.map(response -> new ResponseEntity<>(personaMapper.map(response), header, status))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	/**
	 * Returns a ResponseEntity containing a Page of the Object and header passed in
	 * input
	 */
	private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(Page<T> collModel, HttpHeaders header) {
		return ResponseEntity.ok().headers(header).body(collModel);
	}
}
