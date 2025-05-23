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

import it.micegroup.voila3sample.domain.primary.Fornitore;

import it.micegroup.voila3sample.dto.EditFornitoreDto;
import it.micegroup.voila3sample.dto.ViewFornitoreDto;

import it.micegroup.voila3sample.dto.ViewProdottoDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.FornitoreMapper;

import it.micegroup.voila3sample.service.FornitoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/fornitore", produces = MediaType.APPLICATION_JSON_VALUE)
public class FornitoreController extends BaseController<Fornitore> {
  /// ENTITY SERVICE
  private final FornitoreService fornitoreService;
  private final FornitoreMapper fornitoreMapper;

  // API
  /**
   * {@code GET /fornitore} : Get all fornitore.
   *
   * @param pageable
   * @return Page of all Fornitore.
   */
  @GetMapping
  @Operation(summary = "Get all Fornitore")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_SEARCH.toString())")
  public ResponseEntity<Page<ViewFornitoreDto>> findAll(Pageable pageable) {
    Page<ViewFornitoreDto> collModel = fornitoreMapper.map(fornitoreService.findAll(pageable));
    return toResponseEntityPaged(collModel, null);
  }

  /**
   * {@code POST /fornitore} : Create a new Fornitore.
   *
   * @param requestBody the Fornitore to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new
   *     Fornitore, or with status {@code 400 (Bad Request)} if the requestBody is invalid.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping
  @Operation(summary = "Create a new Fornitore")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_CREATE.toString())")
  public ResponseEntity<ViewFornitoreDto> insert(@RequestBody @Valid EditFornitoreDto requestBody) {
    Fornitore entity = fornitoreMapper.map(requestBody);
    if (fornitoreService.findByObjectKey(entity.getObjectKey()).isPresent()) {
      throw new ResourceAlreadyFoundException(
          Fornitore.class.getSimpleName(), entity.getObjectKey());
    } else {

      entity = fornitoreService.insert(entity);

      URI location =
          ServletUriComponentsBuilder.fromCurrentRequest()
              .path("/{id}")
              .buildAndExpand(entity.getThePersonaKey())
              .toUri();
      ViewFornitoreDto dto = fornitoreMapper.map(entity);
      return ResponseEntity.created(location).body(dto);
    }
  }

  /**
   * {@code GET /fornitore/:objectKey} : Get the fornitore with given objectKey.
   *
   * @param objectKey the objectKey of the fornitore to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fornitore, or
   *     with status {@code 404 (Not Found)}.
   */
  @GetMapping("/{objectKey:.+}")
  @Operation(summary = "Get the Fornitore with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_READ.toString())")
  public ResponseEntity<ViewFornitoreDto> read(@PathVariable String objectKey) {
    Optional<Fornitore> opt =
        Optional.of(
            fornitoreService
                .findByObjectKey(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(Fornitore.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code PUT /fornitore} : Updates an existing Fornitore.
   *
   * @param requestBody the Fornitore to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated
   *     Fornitore, or with status {@code 400 (Bad Request)} if the requestBody is not valid, or
   *     with status {@code 500 (Internal Server Error)} if the Fornitore couldn't be updated.
   */
  @PutMapping
  @Operation(summary = "Update an existing Fornitore")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_UPDATE.toString())")
  public ResponseEntity<ViewFornitoreDto> update(@RequestBody @Valid EditFornitoreDto requestBody) {
    Fornitore entity = fornitoreMapper.map(requestBody);
    entity = fornitoreService.bulkUpdate(entity);
    ViewFornitoreDto dto = fornitoreMapper.map(entity);
    return ResponseEntity.ok(dto);
  }

  /**
   * {@code DELETE /fornitore/:objectKey} : Delete the fornitore with given objectKey.
   *
   * @param objectKey the objectKey of the Fornitore to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/{objectKey:.+}")
  @Operation(summary = "Delete the Fornitore with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_DELETE.toString())")
  public ResponseEntity<ViewFornitoreDto> delete(@PathVariable String objectKey) {
    Optional<Fornitore> opt =
        Optional.of(
            fornitoreService
                .delete(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(Fornitore.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code GET /fornitore/search?filter=:query} : Get the fornitore filtered by given query.
   *
   * @param query the query to execute filtering the Fornitore to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fornitore.
   */
  @GetMapping("/search")
  @Operation(summary = "Get the Fornitore filtered by given query")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_SEARCH.toString())")
  public ResponseEntity<Page<ViewFornitoreDto>> search(
      @Filter Specification<Fornitore> specification, Pageable page) {
    Page<ViewFornitoreDto> collModel =
        fornitoreMapper.map(fornitoreService.search(specification, page));
    return toResponseEntityPaged(collModel, null);
  }

  // PDF Report
  /**
   * GET: /pdf/{objectKey:.+}: Print PDF for Fornitore by object key.
   *
   * @param objectKey
   * @return PDF document or null.
   */
  @ResponseBody
  @GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
  @Operation(summary = "Print PDF for Fornitore by object key")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_REPORT.toString())")
  public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
    return super.genJasperReportPdf(fornitoreService.printPdfReport(objectKey));
  }

  // Xls Report
  /**
   * GET: /print/xlsx-list: Return the XLS list report for Fornitore filtered by specification in
   * input GET.
   *
   * @param criteria
   * @return XLS document or null.
   */
  @ResponseBody
  @GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
  @Operation(summary = "Return the XLS list report for Fornitore filtered by criteria in input GET")
  @PreAuthorize("hasRole(@permissionHolder.FORNITORE_REPORT.toString())")
  public void printXlsxList(
      @Filter Specification<Fornitore> specification, HttpServletResponse response) {
    byte[] body = fornitoreService.printXLSList(specification);
    prepareReportResponse(
        "Elenco Fornitore.xlsx",
        body,
        response,
        MediaType.parseMediaType("application/vnd.ms-excel"),
        "application/octet-stream");
  }

  /**
   * Returns a ResponseEntity containing a ViewFornitoreDto mapped by the Optional<Fornitore>,
   * header and status passed in input
   */
  private ResponseEntity<ViewFornitoreDto> toResponseEntity(
      Optional<Fornitore> maybeResponse, HttpHeaders header, HttpStatus status) {
    return maybeResponse
        .map(response -> new ResponseEntity<>(fornitoreMapper.map(response), header, status))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /** Returns a ResponseEntity containing a Page of the Object and header passed in input */
  private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(
      Page<T> collModel, HttpHeaders header) {
    return ResponseEntity.ok().headers(header).body(collModel);
  }
}
