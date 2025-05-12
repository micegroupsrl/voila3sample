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

import it.micegroup.voila3sample.domain.primary.TipoOrdine;

import it.micegroup.voila3sample.dto.EditTipoOrdineDto;
import it.micegroup.voila3sample.dto.ViewTipoOrdineDto;

import it.micegroup.voila3sample.dto.ViewOrdineDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.TipoOrdineMapper;

import it.micegroup.voila3sample.service.TipoOrdineService;
import it.micegroup.voila3sample.domain.primary.CategoriaOrdine;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/tipo-ordine", produces = MediaType.APPLICATION_JSON_VALUE)
public class TipoOrdineController extends BaseController<TipoOrdine> {
	/// ENTITY SERVICE
	private final TipoOrdineService tipoOrdineService;
	private final TipoOrdineMapper tipoOrdineMapper;

	// API
	/**
	 * {@code GET /tipo-ordine} : Get all tipo-ordine.
	 * 
	 * @param pageable
	 * @return Page of all TipoOrdine.
	 */
	@GetMapping
	@Operation(summary = "Get all TipoOrdine")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_SEARCH.toString())")
	public ResponseEntity<Page<ViewTipoOrdineDto>> findAll(Pageable pageable) {
		Page<ViewTipoOrdineDto> collModel = tipoOrdineMapper.map(tipoOrdineService.findAll(pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * {@code POST  /tipo-ordine} : Create a new TipoOrdine.
	 *
	 * @param requestBody the TipoOrdine to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new TipoOrdine, or with status {@code 400 (Bad Request)} if
	 *         the requestBody is invalid.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping
	@Operation(summary = "Create a new TipoOrdine")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_CREATE.toString())")
	public ResponseEntity<ViewTipoOrdineDto> insert(@RequestBody @Valid EditTipoOrdineDto requestBody) {
		TipoOrdine entity = tipoOrdineMapper.map(requestBody);
		if (tipoOrdineService.findByObjectKey(entity.getObjectKey()).isPresent()) {
			throw new ResourceAlreadyFoundException(TipoOrdine.class.getSimpleName(), entity.getObjectKey());
		} else {

			entity = tipoOrdineService.insert(entity);

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getTheTipoOrdineKey()).toUri();
			ViewTipoOrdineDto dto = tipoOrdineMapper.map(entity);
			return ResponseEntity.created(location).body(dto);
		}
	}

	/**
	 * {@code GET  /tipo-ordine/:objectKey} : Get the tipo-ordine with given
	 * objectKey.
	 *
	 * @param objectKey the objectKey of the tipo-ordine to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the tipo-ordine, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/{objectKey:.+}")
	@Operation(summary = "Get the TipoOrdine with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_READ.toString())")
	public ResponseEntity<ViewTipoOrdineDto> read(@PathVariable String objectKey) {
		Optional<TipoOrdine> opt = Optional.of(tipoOrdineService.findByObjectKey(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(TipoOrdine.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code PUT  /tipo-ordine} : Updates an existing TipoOrdine.
	 *
	 * @param requestBody the TipoOrdine to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated TipoOrdine, or with status {@code 400 (Bad Request)} if
	 *         the requestBody is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the TipoOrdine couldn't be
	 *         updated.
	 */
	@PutMapping
	@Operation(summary = "Update an existing TipoOrdine")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_UPDATE.toString())")
	public ResponseEntity<ViewTipoOrdineDto> update(@RequestBody @Valid EditTipoOrdineDto requestBody) {
		TipoOrdine entity = tipoOrdineMapper.map(requestBody);
		entity = tipoOrdineService.bulkUpdate(entity);
		ViewTipoOrdineDto dto = tipoOrdineMapper.map(entity);
		return ResponseEntity.ok(dto);
	}

	/**
	 * {@code DELETE  /tipo-ordine/:objectKey} : Delete the tipo-ordine with given
	 * objectKey.
	 *
	 * @param objectKey the objectKey of the TipoOrdine to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/{objectKey:.+}")
	@Operation(summary = "Delete the TipoOrdine with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_DELETE.toString())")
	public ResponseEntity<ViewTipoOrdineDto> delete(@PathVariable String objectKey) {
		Optional<TipoOrdine> opt = Optional.of(tipoOrdineService.delete(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(TipoOrdine.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code GET  /tipo-ordine/search?filter=:query} : Get the tipo-ordine filtered
	 * by given query.
	 *
	 * @param query the query to execute filtering the TipoOrdine to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the tipo-ordine.
	 */
	@GetMapping("/search")
	@Operation(summary = "Get the TipoOrdine filtered by given query")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_SEARCH.toString())")
	public ResponseEntity<Page<ViewTipoOrdineDto>> search(@Filter Specification<TipoOrdine> specification,
			Pageable page) {
		Page<ViewTipoOrdineDto> collModel = tipoOrdineMapper.map(tipoOrdineService.search(specification, page));
		return toResponseEntityPaged(collModel, null);
	}

	// PDF Report
	/**
	 * GET: /pdf/{objectKey:.+}: Print PDF for TipoOrdine by object key.
	 * 
	 * @param objectKey
	 * @return PDF document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
	@Operation(summary = "Print PDF for TipoOrdine by object key")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_REPORT.toString())")
	public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
		return super.genJasperReportPdf(tipoOrdineService.printPdfReport(objectKey));
	}

	// Xls Report
	/**
	 * GET: /print/xlsx-list: Return the XLS list report for TipoOrdine filtered by
	 * specification in input GET.
	 * 
	 * @param criteria
	 * @return XLS document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
	@Operation(summary = "Return the XLS list report for TipoOrdine filtered by criteria in input GET")
	@PreAuthorize("hasRole(@permissionHolder.TIPO_ORDINE_REPORT.toString())")
	public void printXlsxList(@Filter Specification<TipoOrdine> specification, HttpServletResponse response) {
		byte[] body = tipoOrdineService.printXLSList(specification);
		prepareReportResponse("Elenco TipoOrdine.xlsx", body, response,
				MediaType.parseMediaType("application/vnd.ms-excel"), "application/octet-stream");
	}

	/**
	 * Returns a ResponseEntity containing a ViewTipoOrdineDto mapped by the
	 * Optional<TipoOrdine>, header and status passed in input
	 */
	private ResponseEntity<ViewTipoOrdineDto> toResponseEntity(Optional<TipoOrdine> maybeResponse, HttpHeaders header,
			HttpStatus status) {
		return maybeResponse.map(response -> new ResponseEntity<>(tipoOrdineMapper.map(response), header, status))
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
