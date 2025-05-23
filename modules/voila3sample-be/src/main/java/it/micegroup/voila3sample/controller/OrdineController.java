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

import it.micegroup.voila3sample.domain.primary.Ordine;

import it.micegroup.voila3sample.dto.EditOrdineDto;
import it.micegroup.voila3sample.dto.ViewOrdineDto;

import it.micegroup.voila3sample.dto.ViewRigaOrdineDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.OrdineMapper;

import it.micegroup.voila3sample.service.OrdineService;
import it.micegroup.voila3sample.domain.primary.StatoOrdine;
import it.micegroup.voila3sample.domain.primary.TipoOrdine;
import it.micegroup.voila3sample.domain.primary.Cliente;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/ordine", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrdineController extends BaseController<Ordine> {
  /// ENTITY SERVICE
  private final OrdineService ordineService;
  private final OrdineMapper ordineMapper;

  // API
  /**
   * {@code GET /ordine} : Get all ordine.
   *
   * @param pageable
   * @return Page of all Ordine.
   */
  @GetMapping
  @Operation(summary = "Get all Ordine")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_SEARCH.toString())")
  public ResponseEntity<Page<ViewOrdineDto>> findAll(Pageable pageable) {
    Page<ViewOrdineDto> collModel = ordineMapper.map(ordineService.findAll(pageable));
    return toResponseEntityPaged(collModel, null);
  }

  /**
   * {@code POST /ordine} : Create a new Ordine.
   *
   * @param requestBody the Ordine to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new
   *     Ordine, or with status {@code 400 (Bad Request)} if the requestBody is invalid.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping
  @Operation(summary = "Create a new Ordine")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_CREATE.toString())")
  public ResponseEntity<ViewOrdineDto> insert(@RequestBody @Valid EditOrdineDto requestBody) {
    Ordine entity = ordineMapper.map(requestBody);
    if (ordineService.findByObjectKey(entity.getObjectKey()).isPresent()) {
      throw new ResourceAlreadyFoundException(Ordine.class.getSimpleName(), entity.getObjectKey());
    } else {

      entity = ordineService.insert(entity);

      URI location =
          ServletUriComponentsBuilder.fromCurrentRequest()
              .path("/{id}")
              .buildAndExpand(entity.getIdOrdine())
              .toUri();
      ViewOrdineDto dto = ordineMapper.map(entity);
      return ResponseEntity.created(location).body(dto);
    }
  }

  /**
   * {@code GET /ordine/:objectKey} : Get the ordine with given objectKey.
   *
   * @param objectKey the objectKey of the ordine to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordine, or
   *     with status {@code 404 (Not Found)}.
   */
  @GetMapping("/{objectKey:.+}")
  @Operation(summary = "Get the Ordine with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_READ.toString())")
  public ResponseEntity<ViewOrdineDto> read(@PathVariable String objectKey) {
    Optional<Ordine> opt =
        Optional.of(
            ordineService
                .findByObjectKey(objectKey)
                .orElseThrow(
                    () -> new ResourceNotFoundException(Ordine.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code PUT /ordine} : Updates an existing Ordine.
   *
   * @param requestBody the Ordine to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated
   *     Ordine, or with status {@code 400 (Bad Request)} if the requestBody is not valid, or with
   *     status {@code 500 (Internal Server Error)} if the Ordine couldn't be updated.
   */
  @PutMapping
  @Operation(summary = "Update an existing Ordine")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_UPDATE.toString())")
  public ResponseEntity<ViewOrdineDto> update(@RequestBody @Valid EditOrdineDto requestBody) {
    Ordine entity = ordineMapper.map(requestBody);
    entity = ordineService.bulkUpdate(entity);
    ViewOrdineDto dto = ordineMapper.map(entity);
    return ResponseEntity.ok(dto);
  }

  /**
   * {@code DELETE /ordine/:objectKey} : Delete the ordine with given objectKey.
   *
   * @param objectKey the objectKey of the Ordine to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/{objectKey:.+}")
  @Operation(summary = "Delete the Ordine with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_DELETE.toString())")
  public ResponseEntity<ViewOrdineDto> delete(@PathVariable String objectKey) {
    Optional<Ordine> opt =
        Optional.of(
            ordineService
                .delete(objectKey)
                .orElseThrow(
                    () -> new ResourceNotFoundException(Ordine.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code GET /ordine/search?filter=:query} : Get the ordine filtered by given query.
   *
   * @param query the query to execute filtering the Ordine to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordine.
   */
  @GetMapping("/search")
  @Operation(summary = "Get the Ordine filtered by given query")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_SEARCH.toString())")
  public ResponseEntity<Page<ViewOrdineDto>> search(
      @Filter Specification<Ordine> specification, Pageable page) {
    Page<ViewOrdineDto> collModel = ordineMapper.map(ordineService.search(specification, page));
    return toResponseEntityPaged(collModel, null);
  }

  // PDF Report
  /**
   * GET: /pdf/{objectKey:.+}: Print PDF for Ordine by object key.
   *
   * @param objectKey
   * @return PDF document or null.
   */
  @ResponseBody
  @GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
  @Operation(summary = "Print PDF for Ordine by object key")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_REPORT.toString())")
  public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
    return super.genJasperReportPdf(ordineService.printPdfReport(objectKey));
  }

  // Xls Report
  /**
   * GET: /print/xlsx-list: Return the XLS list report for Ordine filtered by specification in input
   * GET.
   *
   * @param criteria
   * @return XLS document or null.
   */
  @ResponseBody
  @GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
  @Operation(summary = "Return the XLS list report for Ordine filtered by criteria in input GET")
  @PreAuthorize("hasRole(@permissionHolder.ORDINE_REPORT.toString())")
  public void printXlsxList(
      @Filter Specification<Ordine> specification, HttpServletResponse response) {
    byte[] body = ordineService.printXLSList(specification);
    prepareReportResponse(
        "Elenco Ordine.xlsx",
        body,
        response,
        MediaType.parseMediaType("application/vnd.ms-excel"),
        "application/octet-stream");
  }

  /**
   * Returns a ResponseEntity containing a ViewOrdineDto mapped by the Optional<Ordine>, header and
   * status passed in input
   */
  private ResponseEntity<ViewOrdineDto> toResponseEntity(
      Optional<Ordine> maybeResponse, HttpHeaders header, HttpStatus status) {
    return maybeResponse
        .map(response -> new ResponseEntity<>(ordineMapper.map(response), header, status))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /** Returns a ResponseEntity containing a Page of the Object and header passed in input */
  private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(
      Page<T> collModel, HttpHeaders header) {
    return ResponseEntity.ok().headers(header).body(collModel);
  }
}
