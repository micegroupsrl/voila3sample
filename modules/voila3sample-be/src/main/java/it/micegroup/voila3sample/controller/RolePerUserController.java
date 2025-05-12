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

import it.micegroup.voila3sample.domain.security.RolePerUser;

import it.micegroup.voila3sample.dto.EditRolePerUserDto;
import it.micegroup.voila3sample.dto.ViewRolePerUserDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.RolePerUserMapper;

import it.micegroup.voila3sample.service.RolePerUserService;
import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.domain.security.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/role-per-user", produces = MediaType.APPLICATION_JSON_VALUE)
public class RolePerUserController extends BaseController<RolePerUser> {
	/// ENTITY SERVICE
	private final RolePerUserService rolePerUserService;
	private final RolePerUserMapper rolePerUserMapper;

	// API
	/**
	 * {@code GET /role-per-user} : Get all role-per-user.
	 * 
	 * @param pageable
	 * @return Page of all RolePerUser.
	 */
	@GetMapping
	@Operation(summary = "Get all RolePerUser")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_SEARCH.toString())")
	public ResponseEntity<Page<ViewRolePerUserDto>> findAll(Pageable pageable) {
		Page<ViewRolePerUserDto> collModel = rolePerUserMapper.map(rolePerUserService.findAll(pageable));
		return toResponseEntityPaged(collModel, null);
	}

	/**
	 * {@code POST  /role-per-user} : Create a new RolePerUser.
	 *
	 * @param requestBody the RolePerUser to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new RolePerUser, or with status {@code 400 (Bad Request)} if
	 *         the requestBody is invalid.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping
	@Operation(summary = "Create a new RolePerUser")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_CREATE.toString())")
	public ResponseEntity<ViewRolePerUserDto> insert(@RequestBody @Valid EditRolePerUserDto requestBody) {
		RolePerUser entity = rolePerUserMapper.map(requestBody);
		if (rolePerUserService.findByObjectKey(entity.getObjectKey()).isPresent()) {
			throw new ResourceAlreadyFoundException(RolePerUser.class.getSimpleName(), entity.getObjectKey());
		} else {

			entity = rolePerUserService.insert(entity);

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(entity.getTheRolePerUserKey()).toUri();
			ViewRolePerUserDto dto = rolePerUserMapper.map(entity);
			return ResponseEntity.created(location).body(dto);
		}
	}

	/**
	 * {@code GET  /role-per-user/:objectKey} : Get the role-per-user with given
	 * objectKey.
	 *
	 * @param objectKey the objectKey of the role-per-user to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the role-per-user, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/{objectKey:.+}")
	@Operation(summary = "Get the RolePerUser with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_READ.toString())")
	public ResponseEntity<ViewRolePerUserDto> read(@PathVariable String objectKey) {
		Optional<RolePerUser> opt = Optional.of(rolePerUserService.findByObjectKey(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(RolePerUser.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code PUT  /role-per-user} : Updates an existing RolePerUser.
	 *
	 * @param requestBody the RolePerUser to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated RolePerUser, or with status {@code 400 (Bad Request)} if
	 *         the requestBody is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the RolePerUser couldn't be
	 *         updated.
	 */
	@PutMapping
	@Operation(summary = "Update an existing RolePerUser")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_UPDATE.toString())")
	public ResponseEntity<ViewRolePerUserDto> update(@RequestBody @Valid EditRolePerUserDto requestBody) {
		RolePerUser entity = rolePerUserMapper.map(requestBody);
		entity = rolePerUserService.bulkUpdate(entity);
		ViewRolePerUserDto dto = rolePerUserMapper.map(entity);
		return ResponseEntity.ok(dto);
	}

	/**
	 * {@code DELETE  /role-per-user/:objectKey} : Delete the role-per-user with
	 * given objectKey.
	 *
	 * @param objectKey the objectKey of the RolePerUser to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/{objectKey:.+}")
	@Operation(summary = "Delete the RolePerUser with given objectKey")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_DELETE.toString())")
	public ResponseEntity<ViewRolePerUserDto> delete(@PathVariable String objectKey) {
		Optional<RolePerUser> opt = Optional.of(rolePerUserService.delete(objectKey)
				.orElseThrow(() -> new ResourceNotFoundException(RolePerUser.class.getSimpleName(), objectKey)));
		return toResponseEntity(opt, null, HttpStatus.OK);
	}

	/**
	 * {@code GET  /role-per-user/search?filter=:query} : Get the role-per-user
	 * filtered by given query.
	 *
	 * @param query the query to execute filtering the RolePerUser to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the role-per-user.
	 */
	@GetMapping("/search")
	@Operation(summary = "Get the RolePerUser filtered by given query")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_SEARCH.toString())")
	public ResponseEntity<Page<ViewRolePerUserDto>> search(@Filter Specification<RolePerUser> specification,
			Pageable page) {
		Page<ViewRolePerUserDto> collModel = rolePerUserMapper.map(rolePerUserService.search(specification, page));
		return toResponseEntityPaged(collModel, null);
	}

	// PDF Report
	/**
	 * GET: /pdf/{objectKey:.+}: Print PDF for RolePerUser by object key.
	 * 
	 * @param objectKey
	 * @return PDF document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
	@Operation(summary = "Print PDF for RolePerUser by object key")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_REPORT.toString())")
	public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
		return super.genJasperReportPdf(rolePerUserService.printPdfReport(objectKey));
	}

	// Xls Report
	/**
	 * GET: /print/xlsx-list: Return the XLS list report for RolePerUser filtered by
	 * specification in input GET.
	 * 
	 * @param criteria
	 * @return XLS document or null.
	 */
	@ResponseBody
	@GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
	@Operation(summary = "Return the XLS list report for RolePerUser filtered by criteria in input GET")
	@PreAuthorize("hasRole(@permissionHolder.ROLE_PER_USER_REPORT.toString())")
	public void printXlsxList(@Filter Specification<RolePerUser> specification, HttpServletResponse response) {
		byte[] body = rolePerUserService.printXLSList(specification);
		prepareReportResponse("Elenco RolePerUser.xlsx", body, response,
				MediaType.parseMediaType("application/vnd.ms-excel"), "application/octet-stream");
	}

	/**
	 * Returns a ResponseEntity containing a ViewRolePerUserDto mapped by the
	 * Optional<RolePerUser>, header and status passed in input
	 */
	private ResponseEntity<ViewRolePerUserDto> toResponseEntity(Optional<RolePerUser> maybeResponse, HttpHeaders header,
			HttpStatus status) {
		return maybeResponse.map(response -> new ResponseEntity<>(rolePerUserMapper.map(response), header, status))
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
