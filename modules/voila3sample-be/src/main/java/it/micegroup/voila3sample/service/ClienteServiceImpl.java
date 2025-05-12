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

import it.micegroup.voila3sample.domain.primary.Cliente;

import it.micegroup.voila3sample.domain.primary.PersonaKey;

import it.micegroup.voila3sample.repository.primary.ClienteRepository;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.primary.Ordine;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class ClienteServiceImpl extends BaseServiceImpl implements ClienteService {

	private static final String LIST_CLIENTE = "ListCliente";
	private static final String DETAIL_CLIENTE = "DetailCliente";

	private final ClienteRepository clienteRepository;
	// CHILD SERVICES
	private final OrdineService ordineService;
	private final AclService aclService;

	/**
	 * Return a Page of entities of a given Cliente
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param pageable Pagination object
	 * @return Return a Page of entities of a given Cliente
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<Cliente> findAll(Pageable pageable) {
		return clienteRepository.findAll(pageable);
	}

	/**
	 * Return all entities of a given Cliente
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @return Return all entities of a given Cliente
	 */
	@Override
	@Transactional(readOnly = true)
	public List<Cliente> findAll() {
		return clienteRepository.findAll();
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
	public Optional<Cliente> findByObjectKey(String objectKey) {
		Cliente cliente = new Cliente(objectKey);
		return clienteRepository.findByThePersonaKey(cliente.getThePersonaKey());
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
	public boolean exists(PersonaKey id) {
		return clienteRepository.existsById(id);
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
	public Cliente insert(@Valid Cliente entity) {
		return clienteRepository.save(entity);
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
	public Cliente update(@Valid Cliente entity) {
		return clienteRepository.save(entity);
	}

	/**
	 * Delete an entity by its objectkey and returns the deleted Cliente, if it was
	 * present
	 * 
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 * @param objectKey of entity to delete
	 */
	@Override
	@Transactional
	public Optional<Cliente> delete(String objectKey) {
		return findByObjectKey(objectKey).map(cliente -> {
			clienteRepository.delete(cliente);
			return Optional.of(cliente);
		}).orElseGet(Optional::empty);
	}

	/**
	 * Returns the Page of the Cliente following the specification in input
	 * 
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 * @param specification to use to filter Cliente
	 * @param pageable
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<Cliente> search(Specification<Cliente> specification, Pageable pageable) {
		specification = aclService.applyAcl(specification, "cliente.search");
		return clienteRepository.findAll(specification, pageable);
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
	public void deleteById(PersonaKey id) {
		clienteRepository.deleteById(id);
	}

	/**
	 * Executes the bulk update of a Cliente
	 * 
	 * @param cliente
	 * @return updated Cliente
	 */
	@Override
	@Transactional
	public Cliente bulkUpdate(Cliente cliente) {
		if (cliente.getTheOrdine() != null) {
			List<Ordine> updateTheOrdine = cliente.getTheOrdine().stream()
					.filter(child -> !child.isDeletedEntityState()).collect(Collectors.toList());
			List<Ordine> deleteTheOrdine = cliente.getTheOrdine().stream().filter(GenericEntity::isDeletedEntityState)
					.collect(Collectors.toList());
			cliente.setTheOrdine(updateTheOrdine);
			deleteTheOrdine.forEach(child -> ordineService.deleteById(child.getIdOrdine()));
		}
		return this.update(cliente);
	}

	@Transactional(readOnly = true)
	public JasperPrint getJasperPrint(String reportName, Collection<?> collection) throws BusinessException {
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
		Map<String, Object> parameters = new HashMap<>();
		// Adds to the collection the compiled master report dependency (for subreport)
		// and return the compiled master report.
		List<String> fileNames = Arrays.asList(reportName, "ListOrdineForCliente");
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
		Collection<Cliente> clienteCollection = new ArrayList<>();
		Optional<Cliente> optionalCliente = findByObjectKey(objectKey);
		if (optionalCliente.isPresent()) {
			Cliente cliente = optionalCliente.get();
			clienteCollection.add(cliente);
			try {
				return JasperExportManager.exportReportToPdf(getJasperPrint(DETAIL_CLIENTE, clienteCollection));
			} catch (JRException e) {
				log.error(LOG_ERROR, e);
			}
		}
		return new byte[0];
	}

	@Transactional(readOnly = true)
	public byte[] printXLSList(Specification<Cliente> specification) {
		Collection<Cliente> clienteCollection = search(specification, Pageable.unpaged()).getContent();
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_CLIENTE, clienteCollection));
		} catch (JRException e) {
			log.error(LOG_ERROR, e);
		}
		return byteArrayOutputStream.toByteArray();
	}
}
