package it.micegroup.voila3sample.service;

import java.util.List;

import java.util.Optional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;
import java.io.ByteArrayOutputStream;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import it.micegroup.voila2runtime.exception.BusinessException;
import org.springframework.context.i18n.LocaleContextHolder;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import it.micegroup.voila3sample.domain.security.RolePerUser;

import it.micegroup.voila3sample.domain.security.RolePerUserKey;

import it.micegroup.voila3sample.domain.security.Role;
import it.micegroup.voila3sample.domain.security.User;

import it.micegroup.voila3sample.repository.security.RolePerUserRepository;

import org.springframework.data.domain.PageImpl;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class RolePerUserServiceImpl extends BaseServiceImpl implements RolePerUserService {

	private static final String LIST_ROLEPERUSER = "ListRolePerUser";
	private static final String DETAIL_ROLEPERUSER = "DetailRolePerUser";

	private final RolePerUserRepository rolePerUserRepository;
	// CHILD SERVICES

	private final AclService aclService;

	/**
	 * Return a Page of entities of a given RolePerUser
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param pageable Pagination object
	 * @return Return a Page of entities of a given RolePerUser
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<RolePerUser> findAll(Pageable pageable) {
		return rolePerUserRepository.findAll(pageable);
	}

	/**
	 * Return all entities of a given RolePerUser
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @return Return all entities of a given RolePerUser
	 */
	@Override
	@Transactional(readOnly = true)
	public List<RolePerUser> findAll() {
		return rolePerUserRepository.findAll();
	}

	/**
	 * Return the entity found by its objectKey
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param objectKey of entity to find
	 * @return Return the entity found by its objectKey
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<RolePerUser> findByObjectKey(String objectKey) {
		RolePerUser rolePerUser = new RolePerUser(objectKey);
		return rolePerUserRepository.findByTheRolePerUserKey(rolePerUser.getTheRolePerUserKey());
	}

	/**
	 * Check if id with given id exists
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param id of entity to check
	 * @return true if exists
	 */
	@Override
	@Transactional(readOnly = true)
	public boolean exists(RolePerUserKey id) {
		return rolePerUserRepository.existsById(id);
	}

	/**
	 * Persiste the given entity
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param entity to insert
	 * @return entity saved
	 */
	@Override
	@Transactional
	public RolePerUser insert(@Valid RolePerUser entity) {
		return rolePerUserRepository.save(entity);
	}

	/**
	 * Update the given entity
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param entity : to updated
	 * @return entity saved
	 */
	@Override
	@Transactional
	public RolePerUser update(@Valid RolePerUser entity) {
		return rolePerUserRepository.save(entity);
	}

	/**
	 * Delete an entity by its objectkey and returns the deleted RolePerUser, if it
	 * was present
	 * 
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 * @param objectKey of entity to delete
	 */
	@Override
	@Transactional
	public Optional<RolePerUser> delete(String objectKey) {
		return findByObjectKey(objectKey).map(rolePerUser -> {
			rolePerUserRepository.delete(rolePerUser);
			return Optional.of(rolePerUser);
		}).orElseGet(Optional::empty);
	}

	/**
	 * Returns the Page of the RolePerUser following the specification in input
	 * 
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 * @param specification to use to filter RolePerUser
	 * @param pageable
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<RolePerUser> search(Specification<RolePerUser> specification, Pageable pageable) {
		specification = aclService.applyAcl(specification, "role-per-user.search");
		return rolePerUserRepository.findAll(specification, pageable);
	}

	/**
	 * Delete an entity by its id
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param id of entity to delete
	 */
	@Override
	@Transactional
	public void deleteById(RolePerUserKey id) {
		rolePerUserRepository.deleteById(id);
	}

	/**
	 * Executes the bulk update of a RolePerUser
	 * 
	 * @param rolePerUser
	 * @return updated RolePerUser
	 */
	@Override
	@Transactional
	public RolePerUser bulkUpdate(RolePerUser rolePerUser) {
		return this.update(rolePerUser);
	}

	@Transactional(readOnly = true)
	public JasperPrint getJasperPrint(String reportName, Collection<?> collection) throws BusinessException {
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
		Map<String, Object> parameters = new HashMap<>();
		// Adds to the collection the compiled master report dependency (for subreport)
		// and return the compiled master report.
		List<String> fileNames = Arrays.asList(reportName);
		JasperReport report = prepareJasperReport(reportName, parameters, fileNames);
		// Add report dir.
		parameters.put("REPORT_DIR", super.jasperReportsDir);
		// Add locale.
		Locale locale = LocaleContextHolder.getLocale();
		parameters.put(JRParameter.REPORT_LOCALE, locale);
		// Add resource boundle.
		ResourceBundle resourceBoundle = ResourceBundle.getBundle("applicationResources", locale);
		parameters.put(JRParameter.REPORT_RESOURCE_BUNDLE, resourceBoundle);
		// return PDF document.
		JasperPrint jasperPrint = null;
		try {
			return JasperFillManager.fillReport(report, parameters, dataSource);
		} catch (JRException e) {
			log.error(LOG_ERROR, e);
		}
		return jasperPrint;
	}

	@Transactional(readOnly = true)
	public byte[] printPdfReport(String objectKey) {
		Collection<RolePerUser> roleperuserCollection = new ArrayList<>();
		Optional<RolePerUser> optionalRolePerUser = findByObjectKey(objectKey);
		if (optionalRolePerUser.isPresent()) {
			RolePerUser roleperuser = optionalRolePerUser.get();
			roleperuserCollection.add(roleperuser);
			try {
				return JasperExportManager.exportReportToPdf(getJasperPrint(DETAIL_ROLEPERUSER, roleperuserCollection));
			} catch (JRException e) {
				log.error(LOG_ERROR, e);
			}
		}
		return new byte[0];
	}

	@Transactional(readOnly = true)
	public byte[] printXLSList(Specification<RolePerUser> specification) {
		Collection<RolePerUser> rolePerUserCollection = search(specification, Pageable.unpaged()).getContent();
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_ROLEPERUSER, rolePerUserCollection));
		} catch (JRException e) {
			log.error(LOG_ERROR, e);
		}
		return byteArrayOutputStream.toByteArray();
	}
}
