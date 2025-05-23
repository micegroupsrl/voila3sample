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

import it.micegroup.voila3sample.domain.primary.CategoriaOrdine;

import it.micegroup.voila3sample.dto.EditCategoriaOrdineDto;
import it.micegroup.voila3sample.dto.ViewCategoriaOrdineDto;

import it.micegroup.voila3sample.dto.ViewTipoOrdineDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.CategoriaOrdineMapper;

import it.micegroup.voila3sample.service.CategoriaOrdineService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/categoria-ordine", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoriaOrdineController extends BaseController<CategoriaOrdine> {
  /// ENTITY SERVICE
  private final CategoriaOrdineService categoriaOrdineService;
  private final CategoriaOrdineMapper categoriaOrdineMapper;

  // API
  /**
   * {@code GET /categoria-ordine} : Get all categoria-ordine.
   *
   * @param pageable
   * @return Page of all CategoriaOrdine.
   */
  @GetMapping
  @Operation(summary = "Get all CategoriaOrdine")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_SEARCH.toString())")
  public ResponseEntity<Page<ViewCategoriaOrdineDto>> findAll(Pageable pageable) {
    Page<ViewCategoriaOrdineDto> collModel =
        categoriaOrdineMapper.map(categoriaOrdineService.findAll(pageable));
    return toResponseEntityPaged(collModel, null);
  }

  /**
   * {@code POST /categoria-ordine} : Create a new CategoriaOrdine.
   *
   * @param requestBody the CategoriaOrdine to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new
   *     CategoriaOrdine, or with status {@code 400 (Bad Request)} if the requestBody is invalid.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping
  @Operation(summary = "Create a new CategoriaOrdine")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_CREATE.toString())")
  public ResponseEntity<ViewCategoriaOrdineDto> insert(
      @RequestBody @Valid EditCategoriaOrdineDto requestBody) {
    CategoriaOrdine entity = categoriaOrdineMapper.map(requestBody);
    if (categoriaOrdineService.findByObjectKey(entity.getObjectKey()).isPresent()) {
      throw new ResourceAlreadyFoundException(
          CategoriaOrdine.class.getSimpleName(), entity.getObjectKey());
    } else {

      entity = categoriaOrdineService.insert(entity);

      URI location =
          ServletUriComponentsBuilder.fromCurrentRequest()
              .path("/{id}")
              .buildAndExpand(entity.getIdCatOrdine())
              .toUri();
      ViewCategoriaOrdineDto dto = categoriaOrdineMapper.map(entity);
      return ResponseEntity.created(location).body(dto);
    }
  }

  /**
   * {@code GET /categoria-ordine/:objectKey} : Get the categoria-ordine with given objectKey.
   *
   * @param objectKey the objectKey of the categoria-ordine to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the
   *     categoria-ordine, or with status {@code 404 (Not Found)}.
   */
  @GetMapping("/{objectKey:.+}")
  @Operation(summary = "Get the CategoriaOrdine with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_READ.toString())")
  public ResponseEntity<ViewCategoriaOrdineDto> read(@PathVariable String objectKey) {
    Optional<CategoriaOrdine> opt =
        Optional.of(
            categoriaOrdineService
                .findByObjectKey(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(
                            CategoriaOrdine.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code PUT /categoria-ordine} : Updates an existing CategoriaOrdine.
   *
   * @param requestBody the CategoriaOrdine to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated
   *     CategoriaOrdine, or with status {@code 400 (Bad Request)} if the requestBody is not valid,
   *     or with status {@code 500 (Internal Server Error)} if the CategoriaOrdine couldn't be
   *     updated.
   */
  @PutMapping
  @Operation(summary = "Update an existing CategoriaOrdine")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_UPDATE.toString())")
  public ResponseEntity<ViewCategoriaOrdineDto> update(
      @RequestBody @Valid EditCategoriaOrdineDto requestBody) {
    CategoriaOrdine entity = categoriaOrdineMapper.map(requestBody);
    entity = categoriaOrdineService.bulkUpdate(entity);
    ViewCategoriaOrdineDto dto = categoriaOrdineMapper.map(entity);
    return ResponseEntity.ok(dto);
  }

  /**
   * {@code DELETE /categoria-ordine/:objectKey} : Delete the categoria-ordine with given objectKey.
   *
   * @param objectKey the objectKey of the CategoriaOrdine to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/{objectKey:.+}")
  @Operation(summary = "Delete the CategoriaOrdine with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_DELETE.toString())")
  public ResponseEntity<ViewCategoriaOrdineDto> delete(@PathVariable String objectKey) {
    Optional<CategoriaOrdine> opt =
        Optional.of(
            categoriaOrdineService
                .delete(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(
                            CategoriaOrdine.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code GET /categoria-ordine/search?filter=:query} : Get the categoria-ordine filtered by given
   * query.
   *
   * @param query the query to execute filtering the CategoriaOrdine to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the
   *     categoria-ordine.
   */
  @GetMapping("/search")
  @Operation(summary = "Get the CategoriaOrdine filtered by given query")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_SEARCH.toString())")
  public ResponseEntity<Page<ViewCategoriaOrdineDto>> search(
      @Filter Specification<CategoriaOrdine> specification, Pageable page) {
    Page<ViewCategoriaOrdineDto> collModel =
        categoriaOrdineMapper.map(categoriaOrdineService.search(specification, page));
    return toResponseEntityPaged(collModel, null);
  }

  // PDF Report
  /**
   * GET: /pdf/{objectKey:.+}: Print PDF for CategoriaOrdine by object key.
   *
   * @param objectKey
   * @return PDF document or null.
   */
  @ResponseBody
  @GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
  @Operation(summary = "Print PDF for CategoriaOrdine by object key")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_REPORT.toString())")
  public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
    return super.genJasperReportPdf(categoriaOrdineService.printPdfReport(objectKey));
  }

  // Xls Report
  /**
   * GET: /print/xlsx-list: Return the XLS list report for CategoriaOrdine filtered by specification
   * in input GET.
   *
   * @param criteria
   * @return XLS document or null.
   */
  @ResponseBody
  @GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
  @Operation(
      summary = "Return the XLS list report for CategoriaOrdine filtered by criteria in input GET")
  @PreAuthorize("hasRole(@permissionHolder.CATEGORIA_ORDINE_REPORT.toString())")
  public void printXlsxList(
      @Filter Specification<CategoriaOrdine> specification, HttpServletResponse response) {
    byte[] body = categoriaOrdineService.printXLSList(specification);
    prepareReportResponse(
        "Elenco CategoriaOrdine.xlsx",
        body,
        response,
        MediaType.parseMediaType("application/vnd.ms-excel"),
        "application/octet-stream");
  }

  /**
   * Returns a ResponseEntity containing a ViewCategoriaOrdineDto mapped by the
   * Optional<CategoriaOrdine>, header and status passed in input
   */
  private ResponseEntity<ViewCategoriaOrdineDto> toResponseEntity(
      Optional<CategoriaOrdine> maybeResponse, HttpHeaders header, HttpStatus status) {
    return maybeResponse
        .map(response -> new ResponseEntity<>(categoriaOrdineMapper.map(response), header, status))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /** Returns a ResponseEntity containing a Page of the Object and header passed in input */
  private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(
      Page<T> collModel, HttpHeaders header) {
    return ResponseEntity.ok().headers(header).body(collModel);
  }
}
