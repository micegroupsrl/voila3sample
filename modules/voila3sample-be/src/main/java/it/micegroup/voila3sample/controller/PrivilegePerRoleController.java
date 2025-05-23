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

import it.micegroup.voila3sample.domain.security.PrivilegePerRole;

import it.micegroup.voila3sample.dto.EditPrivilegePerRoleDto;
import it.micegroup.voila3sample.dto.ViewPrivilegePerRoleDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.PrivilegePerRoleMapper;

import it.micegroup.voila3sample.service.PrivilegePerRoleService;
import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.domain.security.Privilege;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/privilege-per-role", produces = MediaType.APPLICATION_JSON_VALUE)
public class PrivilegePerRoleController extends BaseController<PrivilegePerRole> {
  /// ENTITY SERVICE
  private final PrivilegePerRoleService privilegePerRoleService;
  private final PrivilegePerRoleMapper privilegePerRoleMapper;

  // API
  /**
   * {@code GET /privilege-per-role} : Get all privilege-per-role.
   *
   * @param pageable
   * @return Page of all PrivilegePerRole.
   */
  @GetMapping
  @Operation(summary = "Get all PrivilegePerRole")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_SEARCH.toString())")
  public ResponseEntity<Page<ViewPrivilegePerRoleDto>> findAll(Pageable pageable) {
    Page<ViewPrivilegePerRoleDto> collModel =
        privilegePerRoleMapper.map(privilegePerRoleService.findAll(pageable));
    return toResponseEntityPaged(collModel, null);
  }

  /**
   * {@code POST /privilege-per-role} : Create a new PrivilegePerRole.
   *
   * @param requestBody the PrivilegePerRole to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new
   *     PrivilegePerRole, or with status {@code 400 (Bad Request)} if the requestBody is invalid.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping
  @Operation(summary = "Create a new PrivilegePerRole")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_CREATE.toString())")
  public ResponseEntity<ViewPrivilegePerRoleDto> insert(
      @RequestBody @Valid EditPrivilegePerRoleDto requestBody) {
    PrivilegePerRole entity = privilegePerRoleMapper.map(requestBody);
    if (privilegePerRoleService.findByObjectKey(entity.getObjectKey()).isPresent()) {
      throw new ResourceAlreadyFoundException(
          PrivilegePerRole.class.getSimpleName(), entity.getObjectKey());
    } else {

      entity = privilegePerRoleService.insert(entity);

      URI location =
          ServletUriComponentsBuilder.fromCurrentRequest()
              .path("/{id}")
              .buildAndExpand(entity.getThePrivilegePerRoleKey())
              .toUri();
      ViewPrivilegePerRoleDto dto = privilegePerRoleMapper.map(entity);
      return ResponseEntity.created(location).body(dto);
    }
  }

  /**
   * {@code GET /privilege-per-role/:objectKey} : Get the privilege-per-role with given objectKey.
   *
   * @param objectKey the objectKey of the privilege-per-role to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the
   *     privilege-per-role, or with status {@code 404 (Not Found)}.
   */
  @GetMapping("/{objectKey:.+}")
  @Operation(summary = "Get the PrivilegePerRole with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_READ.toString())")
  public ResponseEntity<ViewPrivilegePerRoleDto> read(@PathVariable String objectKey) {
    Optional<PrivilegePerRole> opt =
        Optional.of(
            privilegePerRoleService
                .findByObjectKey(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(
                            PrivilegePerRole.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code PUT /privilege-per-role} : Updates an existing PrivilegePerRole.
   *
   * @param requestBody the PrivilegePerRole to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated
   *     PrivilegePerRole, or with status {@code 400 (Bad Request)} if the requestBody is not valid,
   *     or with status {@code 500 (Internal Server Error)} if the PrivilegePerRole couldn't be
   *     updated.
   */
  @PutMapping
  @Operation(summary = "Update an existing PrivilegePerRole")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_UPDATE.toString())")
  public ResponseEntity<ViewPrivilegePerRoleDto> update(
      @RequestBody @Valid EditPrivilegePerRoleDto requestBody) {
    PrivilegePerRole entity = privilegePerRoleMapper.map(requestBody);
    entity = privilegePerRoleService.bulkUpdate(entity);
    ViewPrivilegePerRoleDto dto = privilegePerRoleMapper.map(entity);
    return ResponseEntity.ok(dto);
  }

  /**
   * {@code DELETE /privilege-per-role/:objectKey} : Delete the privilege-per-role with given
   * objectKey.
   *
   * @param objectKey the objectKey of the PrivilegePerRole to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/{objectKey:.+}")
  @Operation(summary = "Delete the PrivilegePerRole with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_DELETE.toString())")
  public ResponseEntity<ViewPrivilegePerRoleDto> delete(@PathVariable String objectKey) {
    Optional<PrivilegePerRole> opt =
        Optional.of(
            privilegePerRoleService
                .delete(objectKey)
                .orElseThrow(
                    () ->
                        new ResourceNotFoundException(
                            PrivilegePerRole.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code GET /privilege-per-role/search?filter=:query} : Get the privilege-per-role filtered by
   * given query.
   *
   * @param query the query to execute filtering the PrivilegePerRole to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the
   *     privilege-per-role.
   */
  @GetMapping("/search")
  @Operation(summary = "Get the PrivilegePerRole filtered by given query")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_SEARCH.toString())")
  public ResponseEntity<Page<ViewPrivilegePerRoleDto>> search(
      @Filter Specification<PrivilegePerRole> specification, Pageable page) {
    Page<ViewPrivilegePerRoleDto> collModel =
        privilegePerRoleMapper.map(privilegePerRoleService.search(specification, page));
    return toResponseEntityPaged(collModel, null);
  }

  // PDF Report
  /**
   * GET: /pdf/{objectKey:.+}: Print PDF for PrivilegePerRole by object key.
   *
   * @param objectKey
   * @return PDF document or null.
   */
  @ResponseBody
  @GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
  @Operation(summary = "Print PDF for PrivilegePerRole by object key")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_REPORT.toString())")
  public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
    return super.genJasperReportPdf(privilegePerRoleService.printPdfReport(objectKey));
  }

  // Xls Report
  /**
   * GET: /print/xlsx-list: Return the XLS list report for PrivilegePerRole filtered by
   * specification in input GET.
   *
   * @param criteria
   * @return XLS document or null.
   */
  @ResponseBody
  @GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
  @Operation(
      summary = "Return the XLS list report for PrivilegePerRole filtered by criteria in input GET")
  @PreAuthorize("hasRole(@permissionHolder.PRIVILEGE_PER_ROLE_REPORT.toString())")
  public void printXlsxList(
      @Filter Specification<PrivilegePerRole> specification, HttpServletResponse response) {
    byte[] body = privilegePerRoleService.printXLSList(specification);
    prepareReportResponse(
        "Elenco PrivilegePerRole.xlsx",
        body,
        response,
        MediaType.parseMediaType("application/vnd.ms-excel"),
        "application/octet-stream");
  }

  /**
   * Returns a ResponseEntity containing a ViewPrivilegePerRoleDto mapped by the
   * Optional<PrivilegePerRole>, header and status passed in input
   */
  private ResponseEntity<ViewPrivilegePerRoleDto> toResponseEntity(
      Optional<PrivilegePerRole> maybeResponse, HttpHeaders header, HttpStatus status) {
    return maybeResponse
        .map(response -> new ResponseEntity<>(privilegePerRoleMapper.map(response), header, status))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /** Returns a ResponseEntity containing a Page of the Object and header passed in input */
  private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(
      Page<T> collModel, HttpHeaders header) {
    return ResponseEntity.ok().headers(header).body(collModel);
  }
}
