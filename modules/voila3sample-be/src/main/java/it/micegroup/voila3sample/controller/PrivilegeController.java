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

import it.micegroup.voila3sample.domain.security.Privilege;

import it.micegroup.voila3sample.dto.EditPrivilegeDto;
import it.micegroup.voila3sample.dto.ViewPrivilegeDto;

import it.micegroup.voila3sample.dto.ViewPrivilegePerRoleDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.PrivilegeMapper;

import it.micegroup.voila3sample.service.PrivilegeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/privilege", produces = MediaType.APPLICATION_JSON_VALUE)
public class PrivilegeController extends BaseController<Privilege> {
  /// ENTITY SERVICE
  private final PrivilegeService privilegeService;
  private final PrivilegeMapper privilegeMapper;

  // API
  /**
   * {@code GET /privilege} : Get all privilege.
   *
   * @param pageable
   * @return Page of all Privilege.
   */
  @GetMapping
  @Operation(summary = "Get all Privilege")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_SEARCH.toString())")
  public ResponseEntity<Page<ViewPrivilegeDto>> findAll(Pageable pageable) {
    Page<ViewPrivilegeDto> collModel = privilegeMapper.map(privilegeService.findAll(pageable));
    return toResponseEntityPaged(collModel, null);
  }

  /**
   * {@code POST /privilege} : Create a new Privilege.
   *
   * @param requestBody the Privilege to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new
   *     Privilege, or with status {@code 400 (Bad Request)} if the requestBody is invalid.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping
  @Operation(summary = "Create a new Privilege")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_CREATE.toString())")
  public ResponseEntity<ViewPrivilegeDto> insert(@RequestBody @Valid EditPrivilegeDto requestBody) {
    Privilege entity = privilegeMapper.map(requestBody);
    if (privilegeService.findByObjectKey(entity.getObjectKey()).isPresent()) {
      throw new ResourceAlreadyFoundException(
          Privilege.class.getSimpleName(), entity.getObjectKey());
    } else {

      entity = privilegeService.insert(entity);

      URI location =
          ServletUriComponentsBuilder.fromCurrentRequest()
              .path("/{id}")
              .buildAndExpand(entity.getPrivilegeId())
              .toUri();
      ViewPrivilegeDto dto = privilegeMapper.map(entity);
      return ResponseEntity.created(location).body(dto);
    }
  }

  /**
   * {@code GET /privilege/:objectKey} : Get the privilege with given objectKey.
   *
   * @param objectKey the objectKey of the privilege to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the privilege, or
   *     with status {@code 404 (Not Found)}.
   */
  @GetMapping("/{objectKey:.+}")
  @Operation(summary = "Get the Privilege with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_READ.toString())")
  public ResponseEntity<ViewPrivilegeDto> read(@PathVariable String objectKey) {
    Optional<Privilege> opt =
        Optional.of(
            privilegeService
                .findByObjectKey(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(Privilege.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code PUT /privilege} : Updates an existing Privilege.
   *
   * @param requestBody the Privilege to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated
   *     Privilege, or with status {@code 400 (Bad Request)} if the requestBody is not valid, or
   *     with status {@code 500 (Internal Server Error)} if the Privilege couldn't be updated.
   */
  @PutMapping
  @Operation(summary = "Update an existing Privilege")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_UPDATE.toString())")
  public ResponseEntity<ViewPrivilegeDto> update(@RequestBody @Valid EditPrivilegeDto requestBody) {
    Privilege entity = privilegeMapper.map(requestBody);
    entity = privilegeService.bulkUpdate(entity);
    ViewPrivilegeDto dto = privilegeMapper.map(entity);
    return ResponseEntity.ok(dto);
  }

  /**
   * {@code DELETE /privilege/:objectKey} : Delete the privilege with given objectKey.
   *
   * @param objectKey the objectKey of the Privilege to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/{objectKey:.+}")
  @Operation(summary = "Delete the Privilege with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_DELETE.toString())")
  public ResponseEntity<ViewPrivilegeDto> delete(@PathVariable String objectKey) {
    Optional<Privilege> opt =
        Optional.of(
            privilegeService
                .delete(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(Privilege.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code GET /privilege/search?filter=:query} : Get the privilege filtered by given query.
   *
   * @param query the query to execute filtering the Privilege to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the privilege.
   */
  @GetMapping("/search")
  @Operation(summary = "Get the Privilege filtered by given query")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_SEARCH.toString())")
  public ResponseEntity<Page<ViewPrivilegeDto>> search(
      @Filter Specification<Privilege> specification, Pageable page) {
    Page<ViewPrivilegeDto> collModel =
        privilegeMapper.map(privilegeService.search(specification, page));
    return toResponseEntityPaged(collModel, null);
  }

  // PDF Report
  /**
   * GET: /pdf/{objectKey:.+}: Print PDF for Privilege by object key.
   *
   * @param objectKey
   * @return PDF document or null.
   */
  @ResponseBody
  @GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
  @Operation(summary = "Print PDF for Privilege by object key")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_REPORT.toString())")
  public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
    return super.genJasperReportPdf(privilegeService.printPdfReport(objectKey));
  }

  // Xls Report
  /**
   * GET: /print/xlsx-list: Return the XLS list report for Privilege filtered by specification in
   * input GET.
   *
   * @param criteria
   * @return XLS document or null.
   */
  @ResponseBody
  @GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
  @Operation(summary = "Return the XLS list report for Privilege filtered by criteria in input GET")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_REPORT.toString())")
  public void printXlsxList(
      @Filter Specification<Privilege> specification, HttpServletResponse response) {
    byte[] body = privilegeService.printXLSList(specification);
    prepareReportResponse(
        "Elenco Privilege.xlsx",
        body,
        response,
        MediaType.parseMediaType("application/vnd.ms-excel"),
        "application/octet-stream");
  }

  /**
   * Returns a ResponseEntity containing a ViewPrivilegeDto mapped by the Optional<Privilege>,
   * header and status passed in input
   */
  private ResponseEntity<ViewPrivilegeDto> toResponseEntity(
      Optional<Privilege> maybeResponse, HttpHeaders header, HttpStatus status) {
    return maybeResponse
        .map(response -> new ResponseEntity<>(privilegeMapper.map(response), header, status))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /** Returns a ResponseEntity containing a Page of the Object and header passed in input */
  private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(
      Page<T> collModel, HttpHeaders header) {
    return ResponseEntity.ok().headers(header).body(collModel);
  }
}
