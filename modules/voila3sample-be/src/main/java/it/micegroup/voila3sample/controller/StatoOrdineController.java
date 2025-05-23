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

import it.micegroup.voila3sample.domain.primary.StatoOrdine;

import it.micegroup.voila3sample.dto.EditStatoOrdineDto;
import it.micegroup.voila3sample.dto.ViewStatoOrdineDto;

import it.micegroup.voila3sample.dto.ViewOrdineDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.StatoOrdineMapper;

import it.micegroup.voila3sample.service.StatoOrdineService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/stato-ordine", produces = MediaType.APPLICATION_JSON_VALUE)
public class StatoOrdineController extends BaseController<StatoOrdine> {
  /// ENTITY SERVICE
  private final StatoOrdineService statoOrdineService;
  private final StatoOrdineMapper statoOrdineMapper;

  // API
  /**
   * {@code GET /stato-ordine} : Get all stato-ordine.
   *
   * @param pageable
   * @return Page of all StatoOrdine.
   */
  @GetMapping
  @Operation(summary = "Get all StatoOrdine")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_SEARCH.toString())")
  public ResponseEntity<Page<ViewStatoOrdineDto>> findAll(Pageable pageable) {
    Page<ViewStatoOrdineDto> collModel =
        statoOrdineMapper.map(statoOrdineService.findAll(pageable));
    return toResponseEntityPaged(collModel, null);
  }

  /**
   * {@code POST /stato-ordine} : Create a new StatoOrdine.
   *
   * @param requestBody the StatoOrdine to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new
   *     StatoOrdine, or with status {@code 400 (Bad Request)} if the requestBody is invalid.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping
  @Operation(summary = "Create a new StatoOrdine")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_CREATE.toString())")
  public ResponseEntity<ViewStatoOrdineDto> insert(
      @RequestBody @Valid EditStatoOrdineDto requestBody) {
    StatoOrdine entity = statoOrdineMapper.map(requestBody);
    if (statoOrdineService.findByObjectKey(entity.getObjectKey()).isPresent()) {
      throw new ResourceAlreadyFoundException(
          StatoOrdine.class.getSimpleName(), entity.getObjectKey());
    } else {

      entity = statoOrdineService.insert(entity);

      URI location =
          ServletUriComponentsBuilder.fromCurrentRequest()
              .path("/{id}")
              .buildAndExpand(entity.getIdStatoOrdine())
              .toUri();
      ViewStatoOrdineDto dto = statoOrdineMapper.map(entity);
      return ResponseEntity.created(location).body(dto);
    }
  }

  /**
   * {@code GET /stato-ordine/:objectKey} : Get the stato-ordine with given objectKey.
   *
   * @param objectKey the objectKey of the stato-ordine to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stato-ordine,
   *     or with status {@code 404 (Not Found)}.
   */
  @GetMapping("/{objectKey:.+}")
  @Operation(summary = "Get the StatoOrdine with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_READ.toString())")
  public ResponseEntity<ViewStatoOrdineDto> read(@PathVariable String objectKey) {
    Optional<StatoOrdine> opt =
        Optional.of(
            statoOrdineService
                .findByObjectKey(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(
                            StatoOrdine.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code PUT /stato-ordine} : Updates an existing StatoOrdine.
   *
   * @param requestBody the StatoOrdine to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated
   *     StatoOrdine, or with status {@code 400 (Bad Request)} if the requestBody is not valid, or
   *     with status {@code 500 (Internal Server Error)} if the StatoOrdine couldn't be updated.
   */
  @PutMapping
  @Operation(summary = "Update an existing StatoOrdine")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_UPDATE.toString())")
  public ResponseEntity<ViewStatoOrdineDto> update(
      @RequestBody @Valid EditStatoOrdineDto requestBody) {
    StatoOrdine entity = statoOrdineMapper.map(requestBody);
    entity = statoOrdineService.bulkUpdate(entity);
    ViewStatoOrdineDto dto = statoOrdineMapper.map(entity);
    return ResponseEntity.ok(dto);
  }

  /**
   * {@code DELETE /stato-ordine/:objectKey} : Delete the stato-ordine with given objectKey.
   *
   * @param objectKey the objectKey of the StatoOrdine to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/{objectKey:.+}")
  @Operation(summary = "Delete the StatoOrdine with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_DELETE.toString())")
  public ResponseEntity<ViewStatoOrdineDto> delete(@PathVariable String objectKey) {
    Optional<StatoOrdine> opt =
        Optional.of(
            statoOrdineService
                .delete(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(
                            StatoOrdine.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code GET /stato-ordine/search?filter=:query} : Get the stato-ordine filtered by given query.
   *
   * @param query the query to execute filtering the StatoOrdine to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stato-ordine.
   */
  @GetMapping("/search")
  @Operation(summary = "Get the StatoOrdine filtered by given query")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_SEARCH.toString())")
  public ResponseEntity<Page<ViewStatoOrdineDto>> search(
      @Filter Specification<StatoOrdine> specification, Pageable page) {
    Page<ViewStatoOrdineDto> collModel =
        statoOrdineMapper.map(statoOrdineService.search(specification, page));
    return toResponseEntityPaged(collModel, null);
  }

  // PDF Report
  /**
   * GET: /pdf/{objectKey:.+}: Print PDF for StatoOrdine by object key.
   *
   * @param objectKey
   * @return PDF document or null.
   */
  @ResponseBody
  @GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
  @Operation(summary = "Print PDF for StatoOrdine by object key")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_REPORT.toString())")
  public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
    return super.genJasperReportPdf(statoOrdineService.printPdfReport(objectKey));
  }

  // Xls Report
  /**
   * GET: /print/xlsx-list: Return the XLS list report for StatoOrdine filtered by specification in
   * input GET.
   *
   * @param criteria
   * @return XLS document or null.
   */
  @ResponseBody
  @GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
  @Operation(
      summary = "Return the XLS list report for StatoOrdine filtered by criteria in input GET")
  @PreAuthorize("hasRole(@permissionHolder.STATO_ORDINE_REPORT.toString())")
  public void printXlsxList(
      @Filter Specification<StatoOrdine> specification, HttpServletResponse response) {
    byte[] body = statoOrdineService.printXLSList(specification);
    prepareReportResponse(
        "Elenco StatoOrdine.xlsx",
        body,
        response,
        MediaType.parseMediaType("application/vnd.ms-excel"),
        "application/octet-stream");
  }

  /**
   * Returns a ResponseEntity containing a ViewStatoOrdineDto mapped by the Optional<StatoOrdine>,
   * header and status passed in input
   */
  private ResponseEntity<ViewStatoOrdineDto> toResponseEntity(
      Optional<StatoOrdine> maybeResponse, HttpHeaders header, HttpStatus status) {
    return maybeResponse
        .map(response -> new ResponseEntity<>(statoOrdineMapper.map(response), header, status))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /** Returns a ResponseEntity containing a Page of the Object and header passed in input */
  private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(
      Page<T> collModel, HttpHeaders header) {
    return ResponseEntity.ok().headers(header).body(collModel);
  }
}
