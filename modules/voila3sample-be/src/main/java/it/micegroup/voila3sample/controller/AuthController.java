package it.micegroup.voila3sample.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.micegroup.voila3sample.domain.security.User;
import it.micegroup.voila3sample.dto.EditUserDto;
import it.micegroup.voila3sample.dto.ViewUserDto;
import it.micegroup.voila3sample.exception.ResourceAlreadyFoundException;
import it.micegroup.voila3sample.jwt.JwtUtils;
import it.micegroup.voila3sample.mapper.UserMapper;
import it.micegroup.voila3sample.payload.LoginRequest;
import it.micegroup.voila3sample.payload.UserInfoResponse;
import it.micegroup.voila3sample.repository.security.UserRepository;
import it.micegroup.voila3sample.service.UserDetailsImpl;
import it.micegroup.voila3sample.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final AuthenticationManager authenticationManager;

	private final UserRepository userRepository;
	
	private final UserService userService;

	private final UserMapper userMapper;

	private final PasswordEncoder encoder;

	private final JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<UserInfoResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
				.body(new UserInfoResponse(userDetails.getUsername(), userDetails.getEmail(), roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<ViewUserDto> registerUser(@Valid @RequestBody EditUserDto signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			throw new ResourceAlreadyFoundException(User.class.getSimpleName(), signUpRequest.getUsername());
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			throw new ResourceAlreadyFoundException(User.class.getSimpleName(), signUpRequest.getEmail());
		}

		User entity = userMapper.map(signUpRequest);
		entity.setPassword(encoder.encode(entity.getPassword()));

		entity = userService.insert(entity);
		ViewUserDto dto = userMapper.map(entity);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping("/signout")
	public ResponseEntity<String> logoutUser() {
		ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
		return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("You've been signed out!");
	}
  
}