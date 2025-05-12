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

import it.micegroup.voila3sample.domain.primary.Prodotto;

import it.micegroup.voila3sample.dto.EditProdottoDto;
import it.micegroup.voila3sample.dto.ViewProdottoDto;

import it.micegroup.voila3sample.dto.ViewRigaOrdineDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.ProdottoMapper;

import it.micegroup.voila3sample.service.ProdottoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/prodotto", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProdottoController extends BaseController<Prodotto> {
	/// ENTITY SERVICE
	private final ProdottoService prodottoService;
	private final ProdottoMapper prodottoMapper;

	// API
	/**
	 * {@code GET /prodotto} : Get all prodotto.
	 * 
	 * @param pageable
	 * @return Page of all Prodotto.
	 */
	@GetMapping
	@Operation(summary = "Get all Prodotto")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_SEARCH.toString())")
	public ResponseEntity<Page<ViewProdottoDto>> findAll(Pageable pageable) {
		Page<ViewProdottoDto> collModel = prodottoMapper.map(prodottoService.findAll(pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * {@code POST  /prodotto} : Create a new Prodotto.
	 *
	 * @param requestBody the Prodotto to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new Prodotto, or with status {@code 400 (Bad Request)} if
	 *         the requestBody is invalid.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping
	@Operation(summary = "Create a new Prodotto")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_CREATE.toString())")
	public ResponseEntity<ViewProdottoDto> insert(@RequestBody @Valid EditProdottoDto requestBody) {
		Prodotto entity = prodottoMapper.map(requestBody);

		entity = prodottoService.insert(entity);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(entity.getIdProdotto()).toUri();
		ViewProdottoDto dto = prodottoMapper.map(entity);
		return ResponseEntity.created(location).body(dto);
	}

	/**
	 * {@code GET  /prodotto/:objectKey} : Get the prodotto with given objectKey.
	 *
	 * @param objectKey the objectKey of the prodotto to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the prodotto, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/{objectKey:.+}")
	@Operation(summary = "Get the Prodotto with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_READ.toString())")
	public ResponseEntity<ViewProdottoDto> read(@PathVariable String objectKey) {
		Optional<Prodotto> opt = Optional.of(prodottoService.findByObjectKey(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Prodotto.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code PUT  /prodotto} : Updates an existing Prodotto.
	 *
	 * @param requestBody the Prodotto to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated Prodotto, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the Prodotto couldn't be
	 *         updated.
	 */
	@PutMapping
	@Operation(summary = "Update an existing Prodotto")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_UPDATE.toString())")
	public ResponseEntity<ViewProdottoDto> update(@RequestBody @Valid EditProdottoDto requestBody) {
		Prodotto entity = prodottoMapper.map(requestBody);
		entity = prodottoService.bulkUpdate(entity);
		ViewProdottoDto dto = prodottoMapper.map(entity);
		return ResponseEntity.ok(dto);
	}

	/**
	 * {@code DELETE  /prodotto/:objectKey} : Delete the prodotto with given
	 * objectKey.
	 *
	 * @param objectKey the objectKey of the Prodotto to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/{objectKey:.+}")
	@Operation(summary = "Delete the Prodotto with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_DELETE.toString())")
	public ResponseEntity<ViewProdottoDto> delete(@PathVariable String objectKey) {
		Optional<Prodotto> opt = Optional.of(prodottoService.delete(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Prodotto.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code GET  /prodotto/search?filter=:query} : Get the prodotto filtered by
	 * given query.
	 *
	 * @param query the query to execute filtering the Prodotto to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the prodotto.
	 */
	@GetMapping("/search")
	@Operation(summary = "Get the Prodotto filtered by given query")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_SEARCH.toString())")
	public ResponseEntity<Page<ViewProdottoDto>> search(@Filter Specification<Prodotto> specification, Pageable page) {
		Page<ViewProdottoDto> collModel = prodottoMapper.map(prodottoService.search(specification, page));
		return toResponseEntityPaged(collModel, null);
	}

	// PDF Report
	/**
	 * GET: /pdf/{objectKey:.+}: Print PDF for Prodotto by object key.
	 * 
	 * @param objectKey
	 * @return PDF document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
	@Operation(summary = "Print PDF for Prodotto by object key")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_REPORT.toString())")
	public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
		return super.genJasperReportPdf(prodottoService.printPdfReport(objectKey));
	}

	// Xls Report
	/**
	 * GET: /print/xlsx-list: Return the XLS list report for Prodotto filtered by
	 * specification in input GET.
	 * 
	 * @param criteria
	 * @return XLS document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
	@Operation(summary = "Return the XLS list report for Prodotto filtered by criteria in input GET")
	@PreAuthorize("hasRole(@permissionHolder.PRODOTTO_REPORT.toString())")
	public void printXlsxList(@Filter Specification<Prodotto> specification, HttpServletResponse response) {
		byte[] body = prodottoService.printXLSList(specification);
		prepareReportResponse("Elenco Prodotto.xlsx", body, response,
				MediaType.parseMediaType("application/vnd.ms-excel"), "application/octet-stream");
	}

	/**
	 * Returns a ResponseEntity containing a ViewProdottoDto mapped by the
	 * Optional<Prodotto>, header and status passed in input
	 */
	private ResponseEntity<ViewProdottoDto> toResponseEntity(Optional<Prodotto> maybeResponse, HttpHeaders header,
			HttpStatus status) {
		return maybeResponse.map(response -> new ResponseEntity<>(prodottoMapper.map(response), header, status))
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
