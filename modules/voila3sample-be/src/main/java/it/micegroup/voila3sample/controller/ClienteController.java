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

import it.micegroup.voila3sample.domain.primary.Cliente;

import it.micegroup.voila3sample.dto.EditClienteDto;
import it.micegroup.voila3sample.dto.ViewClienteDto;

import it.micegroup.voila3sample.dto.ViewOrdineDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.ClienteMapper;

import it.micegroup.voila3sample.service.ClienteService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/cliente", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClienteController extends BaseController<Cliente> {
	/// ENTITY SERVICE
	private final ClienteService clienteService;
	private final ClienteMapper clienteMapper;

	// API
	/**
	 * {@code GET /cliente} : Get all cliente.
	 * 
	 * @param pageable
	 * @return Page of all Cliente.
	 */
	@GetMapping
	@Operation(summary = "Get all Cliente")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_SEARCH.toString())")
	public ResponseEntity<Page<ViewClienteDto>> findAll(Pageable pageable) {
		Page<ViewClienteDto> collModel = clienteMapper.map(clienteService.findAll(pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * {@code POST  /cliente} : Create a new Cliente.
	 *
	 * @param requestBody the Cliente to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new Cliente, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is invalid.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping
	@Operation(summary = "Create a new Cliente")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_CREATE.toString())")
	public ResponseEntity<ViewClienteDto> insert(@RequestBody @Valid EditClienteDto requestBody) {
		Cliente entity = clienteMapper.map(requestBody);
		if (clienteService.findByObjectKey(entity.getObjectKey()).isPresent()) {
			throw new ResourceAlreadyFoundException(Cliente.class.getSimpleName(), entity.getObjectKey());
		} else {

			entity = clienteService.insert(entity);

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getThePersonaKey()).toUri();
			ViewClienteDto dto = clienteMapper.map(entity);
			return ResponseEntity.created(location).body(dto);
		}
	}

	/**
	 * {@code GET  /cliente/:objectKey} : Get the cliente with given objectKey.
	 *
	 * @param objectKey the objectKey of the cliente to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the cliente, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/{objectKey:.+}")
	@Operation(summary = "Get the Cliente with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_READ.toString())")
	public ResponseEntity<ViewClienteDto> read(@PathVariable String objectKey) {
		Optional<Cliente> opt = Optional.of(clienteService.findByObjectKey(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Cliente.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code PUT  /cliente} : Updates an existing Cliente.
	 *
	 * @param requestBody the Cliente to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated Cliente, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the Cliente couldn't be
	 *         updated.
	 */
	@PutMapping
	@Operation(summary = "Update an existing Cliente")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_UPDATE.toString())")
	public ResponseEntity<ViewClienteDto> update(@RequestBody @Valid EditClienteDto requestBody) {
		Cliente entity = clienteMapper.map(requestBody);
		entity = clienteService.bulkUpdate(entity);
		ViewClienteDto dto = clienteMapper.map(entity);
		return ResponseEntity.ok(dto);
	}

	/**
	 * {@code DELETE  /cliente/:objectKey} : Delete the cliente with given
	 * objectKey.
	 *
	 * @param objectKey the objectKey of the Cliente to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/{objectKey:.+}")
	@Operation(summary = "Delete the Cliente with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_DELETE.toString())")
	public ResponseEntity<ViewClienteDto> delete(@PathVariable String objectKey) {
		Optional<Cliente> opt = Optional.of(clienteService.delete(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Cliente.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code GET  /cliente/search?filter=:query} : Get the cliente filtered by
	 * given query.
	 *
	 * @param query the query to execute filtering the Cliente to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the cliente.
	 */
	@GetMapping("/search")
	@Operation(summary = "Get the Cliente filtered by given query")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_SEARCH.toString())")
	public ResponseEntity<Page<ViewClienteDto>> search(@Filter Specification<Cliente> specification, Pageable page) {
		Page<ViewClienteDto> collModel = clienteMapper.map(clienteService.search(specification, page));
		return toResponseEntityPaged(collModel, null);
	}

	// PDF Report
	/**
	 * GET: /pdf/{objectKey:.+}: Print PDF for Cliente by object key.
	 * 
	 * @param objectKey
	 * @return PDF document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
	@Operation(summary = "Print PDF for Cliente by object key")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_REPORT.toString())")
	public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
		return super.genJasperReportPdf(clienteService.printPdfReport(objectKey));
	}

	// Xls Report
	/**
	 * GET: /print/xlsx-list: Return the XLS list report for Cliente filtered by
	 * specification in input GET.
	 * 
	 * @param criteria
	 * @return XLS document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
	@Operation(summary = "Return the XLS list report for Cliente filtered by criteria in input GET")
	@PreAuthorize("hasRole(@permissionHolder.CLIENTE_REPORT.toString())")
	public void printXlsxList(@Filter Specification<Cliente> specification, HttpServletResponse response) {
		byte[] body = clienteService.printXLSList(specification);
		prepareReportResponse("Elenco Cliente.xlsx", body, response,
				MediaType.parseMediaType("application/vnd.ms-excel"), "application/octet-stream");
	}

	/**
	 * Returns a ResponseEntity containing a ViewClienteDto mapped by the
	 * Optional<Cliente>, header and status passed in input
	 */
	private ResponseEntity<ViewClienteDto> toResponseEntity(Optional<Cliente> maybeResponse, HttpHeaders header,
			HttpStatus status) {
		return maybeResponse.map(response -> new ResponseEntity<>(clienteMapper.map(response), header, status))
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
