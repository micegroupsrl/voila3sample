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

import it.micegroup.voila3sample.domain.security.Role;

import it.micegroup.voila3sample.dto.EditRoleDto;
import it.micegroup.voila3sample.dto.ViewRoleDto;

import it.micegroup.voila3sample.dto.ViewPrivilegePerRoleDto;

import it.micegroup.voila3sample.dto.ViewRolePerUserDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.RoleMapper;

import it.micegroup.voila3sample.service.RoleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/role", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleController extends BaseController<Role> {
	/// ENTITY SERVICE
	private final RoleService roleService;
	private final RoleMapper roleMapper;

	// API
	/**
	 * {@code GET /role} : Get all role.
	 * 
	 * @param pageable
	 * @return Page of all Role.
	 */
	@GetMapping
	@Operation(summary = "Get all Role")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_SEARCH.toString())")
	public ResponseEntity<Page<ViewRoleDto>> findAll(Pageable pageable) {
		Page<ViewRoleDto> collModel = roleMapper.map(roleService.findAll(pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * {@code POST  /role} : Create a new Role.
	 *
	 * @param requestBody the Role to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new Role, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is invalid.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping
	@Operation(summary = "Create a new Role")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_CREATE.toString())")
	public ResponseEntity<ViewRoleDto> insert(@RequestBody @Valid EditRoleDto requestBody) {
		Role entity = roleMapper.map(requestBody);
		if (roleService.findByObjectKey(entity.getObjectKey()).isPresent()) {
			throw new ResourceAlreadyFoundException(Role.class.getSimpleName(), entity.getObjectKey());
		} else {

			entity = roleService.insert(entity);

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getRoleId()).toUri();
			ViewRoleDto dto = roleMapper.map(entity);
			return ResponseEntity.created(location).body(dto);
		}
	}

	/**
	 * {@code GET  /role/:objectKey} : Get the role with given objectKey.
	 *
	 * @param objectKey the objectKey of the role to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the role, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/{objectKey:.+}")
	@Operation(summary = "Get the Role with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_READ.toString())")
	public ResponseEntity<ViewRoleDto> read(@PathVariable String objectKey) {
		Optional<Role> opt = Optional.of(roleService.findByObjectKey(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Role.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code PUT  /role} : Updates an existing Role.
	 *
	 * @param requestBody the Role to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated Role, or with status {@code 400 (Bad Request)} if the
	 *         requestBody is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the Role couldn't be updated.
	 */
	@PutMapping
	@Operation(summary = "Update an existing Role")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_UPDATE.toString())")
	public ResponseEntity<ViewRoleDto> update(@RequestBody @Valid EditRoleDto requestBody) {
		Role entity = roleMapper.map(requestBody);
		entity = roleService.bulkUpdate(entity);
		ViewRoleDto dto = roleMapper.map(entity);
		return ResponseEntity.ok(dto);
	}

	/**
	 * {@code DELETE  /role/:objectKey} : Delete the role with given objectKey.
	 *
	 * @param objectKey the objectKey of the Role to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/{objectKey:.+}")
	@Operation(summary = "Delete the Role with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_DELETE.toString())")
	public ResponseEntity<ViewRoleDto> delete(@PathVariable String objectKey) {
		Optional<Role> opt = Optional.of(roleService.delete(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(Role.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code GET  /role/search?filter=:query} : Get the role filtered by given
	 * query.
	 *
	 * @param query the query to execute filtering the Role to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the role.
	 */
	@GetMapping("/search")
	@Operation(summary = "Get the Role filtered by given query")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_SEARCH.toString())")
	public ResponseEntity<Page<ViewRoleDto>> search(@Filter Specification<Role> specification, Pageable page) {
		Page<ViewRoleDto> collModel = roleMapper.map(roleService.search(specification, page));
		return toResponseEntityPaged(collModel, null);
	}

	// PDF Report
	/**
	 * GET: /pdf/{objectKey:.+}: Print PDF for Role by object key.
	 * 
	 * @param objectKey
	 * @return PDF document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
	@Operation(summary = "Print PDF for Role by object key")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_REPORT.toString())")
	public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
		return super.genJasperReportPdf(roleService.printPdfReport(objectKey));
	}

	// Xls Report
	/**
	 * GET: /print/xlsx-list: Return the XLS list report for Role filtered by
	 * specification in input GET.
	 * 
	 * @param criteria
	 * @return XLS document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
	@Operation(summary = "Return the XLS list report for Role filtered by criteria in input GET")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_REPORT.toString())")
	public void printXlsxList(@Filter Specification<Role> specification, HttpServletResponse response) {
		byte[] body = roleService.printXLSList(specification);
		prepareReportResponse("Elenco Role.xlsx", body, response, MediaType.parseMediaType("application/vnd.ms-excel"),
				"application/octet-stream");
	}

	/**
	 * Returns a ResponseEntity containing a ViewRoleDto mapped by the
	 * Optional<Role>, header and status passed in input
	 */
	private ResponseEntity<ViewRoleDto> toResponseEntity(Optional<Role> maybeResponse, HttpHeaders header,
			HttpStatus status) {
		return maybeResponse.map(response -> new ResponseEntity<>(roleMapper.map(response), header, status))
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
