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

import it.micegroup.voila3sample.domain.security.User;

import it.micegroup.voila3sample.dto.EditUserDto;
import it.micegroup.voila3sample.dto.ViewUserDto;

import it.micegroup.voila3sample.dto.ViewRolePerUserDto;

import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.exception.ResourceNotFoundException;
import it.micegroup.voila3sample.mapper.UserMapper;

import it.micegroup.voila3sample.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.ResponseBody;
import jakarta.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController extends BaseController<User> {
  /// ENTITY SERVICE
  private final UserService userService;
  private final UserMapper userMapper;

  // API
  /**
   * {@code GET /user} : Get all user.
   *
   * @param pageable
   * @return Page of all User.
   */
  @GetMapping
  @Operation(summary = "Get all User")
  @PreAuthorize("hasRole(@permissionHolder.USER_SEARCH.toString())")
  public ResponseEntity<Page<ViewUserDto>> findAll(Pageable pageable) {
    Page<ViewUserDto> collModel = userMapper.map(userService.findAll(pageable));
    return toResponseEntityPaged(collModel, null);
  }

  /**
   * {@code POST /user} : Create a new User.
   *
   * @param requestBody the User to create.
   * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new
   *     User, or with status {@code 400 (Bad Request)} if the requestBody is invalid.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PostMapping
  @Operation(summary = "Create a new User")
  @PreAuthorize("hasRole(@permissionHolder.USER_CREATE.toString())")
  public ResponseEntity<ViewUserDto> insert(@RequestBody @Valid EditUserDto requestBody) {
    User entity = userMapper.map(requestBody);

    entity = userService.insert(entity);

    URI location =
        ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(entity.getUserId())
            .toUri();
    ViewUserDto dto = userMapper.map(entity);
    return ResponseEntity.created(location).body(dto);
  }

  /**
   * {@code GET /user/:objectKey} : Get the user with given objectKey.
   *
   * @param objectKey the objectKey of the user to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user, or with
   *     status {@code 404 (Not Found)}.
   */
  @GetMapping("/{objectKey:.+}")
  @Operation(summary = "Get the User with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.USER_READ.toString())")
  public ResponseEntity<ViewUserDto> read(@PathVariable String objectKey) {
    Optional<User> opt =
        Optional.of(
            userService
                .findByObjectKey(objectKey)
                .orElseThrow(
                    () -> new ResourceNotFoundException(User.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code PUT /user} : Updates an existing User.
   *
   * @param requestBody the User to update.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated User,
   *     or with status {@code 400 (Bad Request)} if the requestBody is not valid, or with status
   *     {@code 500 (Internal Server Error)} if the User couldn't be updated.
   */
  @PutMapping
  @Operation(summary = "Update an existing User")
  @PreAuthorize("hasRole(@permissionHolder.USER_UPDATE.toString())")
  public ResponseEntity<ViewUserDto> update(@RequestBody @Valid EditUserDto requestBody) {
    User entity = userMapper.map(requestBody);
    entity = userService.bulkUpdate(entity);
    ViewUserDto dto = userMapper.map(entity);
    return ResponseEntity.ok(dto);
  }

  /**
   * {@code DELETE /user/:objectKey} : Delete the user with given objectKey.
   *
   * @param objectKey the objectKey of the User to delete.
   * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
   */
  @DeleteMapping("/{objectKey:.+}")
  @Operation(summary = "Delete the User with given objectKey")
  @PreAuthorize("hasRole(@permissionHolder.USER_DELETE.toString())")
  public ResponseEntity<ViewUserDto> delete(@PathVariable String objectKey) {
    Optional<User> opt =
        Optional.of(
            userService
                .delete(objectKey)
                .orElseThrow(
                    () -> new ResourceNotFoundException(User.class.getSimpleName(), objectKey)));
    return toResponseEntity(opt, null, HttpStatus.OK);
  }

  /**
   * {@code GET /user/search?filter=:query} : Get the user filtered by given query.
   *
   * @param query the query to execute filtering the User to retrieve.
   * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user.
   */
  @GetMapping("/search")
  @Operation(summary = "Get the User filtered by given query")
  @PreAuthorize("hasRole(@permissionHolder.USER_SEARCH.toString())")
  public ResponseEntity<Page<ViewUserDto>> search(
      @Filter Specification<User> specification, Pageable page) {
    Page<ViewUserDto> collModel = userMapper.map(userService.search(specification, page));
    return toResponseEntityPaged(collModel, null);
  }

  // PDF Report
  /**
   * GET: /pdf/{objectKey:.+}: Print PDF for User by object key.
   *
   * @param objectKey
   * @return PDF document or null.
   */
  @ResponseBody
  @GetMapping(value = "/pdf/{objectKey:.+}", produces = "application/pdf")
  @Operation(summary = "Print PDF for User by object key")
  @PreAuthorize("hasRole(@permissionHolder.USER_REPORT.toString())")
  public ResponseEntity<byte[]> printPdfReport(@PathVariable String objectKey) {
    return super.genJasperReportPdf(userService.printPdfReport(objectKey));
  }

  // Xls Report
  /**
   * GET: /print/xlsx-list: Return the XLS list report for User filtered by specification in input
   * GET.
   *
   * @param criteria
   * @return XLS document or null.
   */
  @ResponseBody
  @GetMapping(value = "/print/xlsx-list", produces = "application/vnd.ms-excel")
  @Operation(summary = "Return the XLS list report for User filtered by criteria in input GET")
  @PreAuthorize("hasRole(@permissionHolder.USER_REPORT.toString())")
  public void printXlsxList(
      @Filter Specification<User> specification, HttpServletResponse response) {
    byte[] body = userService.printXLSList(specification);
    prepareReportResponse(
        "Elenco User.xlsx",
        body,
        response,
        MediaType.parseMediaType("application/vnd.ms-excel"),
        "application/octet-stream");
  }

  /**
   * Returns a ResponseEntity containing a ViewUserDto mapped by the Optional<User>, header and
   * status passed in input
   */
  private ResponseEntity<ViewUserDto> toResponseEntity(
      Optional<User> maybeResponse, HttpHeaders header, HttpStatus status) {
    return maybeResponse
        .map(response -> new ResponseEntity<>(userMapper.map(response), header, status))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /** Returns a ResponseEntity containing a Page of the Object and header passed in input */
  private static <T> ResponseEntity<Page<T>> toResponseEntityPaged(
      Page<T> collModel, HttpHeaders header) {
    return ResponseEntity.ok().headers(header).body(collModel);
  }
}
