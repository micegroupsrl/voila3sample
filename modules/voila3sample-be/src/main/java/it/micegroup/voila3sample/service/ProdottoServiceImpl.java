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

import it.micegroup.voila3sample.domain.primary.Prodotto;

import it.micegroup.voila3sample.repository.primary.ProdottoRepository;

import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import it.micegroup.voila3sample.domain.primary.RigaOrdine;
import it.micegroup.voila2runtime.entity.GenericEntity;

import it.micegroup.voila2runtime.utils.AclService;
import it.micegroup.voila2runtime.utils.AclUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProdottoServiceImpl extends BaseServiceImpl implements ProdottoService {

	private static final String LIST_PRODOTTO = "ListProdotto";
	private static final String DETAIL_PRODOTTO = "DetailProdotto";

	private final ProdottoRepository prodottoRepository;
	// CHILD SERVICES
	private final RigaOrdineService rigaOrdineService;
	private final AclService aclService;

	/**
	 * Return a Page of entities of a given Prodotto
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @param pageable Pagination object
	 * @return Return a Page of entities of a given Prodotto
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<Prodotto> findAll(Pageable pageable) {
		return prodottoRepository.findAll(pageable);
	}

	/**
	 * Return all entities of a given Prodotto
	 *
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 *
	 * @return Return all entities of a given Prodotto
	 */
	@Override
	@Transactional(readOnly = true)
	public List<Prodotto> findAll() {
		return prodottoRepository.findAll();
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
	public Optional<Prodotto> findByObjectKey(String objectKey) {
		Prodotto prodotto = new Prodotto(objectKey);
		return prodottoRepository.findByIdProdotto(prodotto.getIdProdotto());
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
	public boolean exists(Integer id) {
		return prodottoRepository.existsById(id);
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
	public Prodotto insert(@Valid Prodotto entity) {
		return prodottoRepository.save(entity);
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
	public Prodotto update(@Valid Prodotto entity) {
		return prodottoRepository.save(entity);
	}

	/**
	 * Delete an entity by its objectkey and returns the deleted Prodotto, if it was
	 * present
	 * 
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 * @param objectKey of entity to delete
	 */
	@Override
	@Transactional
	public Optional<Prodotto> delete(String objectKey) {
		return findByObjectKey(objectKey).map(prodotto -> {
			prodottoRepository.delete(prodotto);
			return Optional.of(prodotto);
		}).orElseGet(Optional::empty);
	}

	/**
	 * Returns the Page of the Prodotto following the specification in input
	 * 
	 * @author Vittorio Niespolo vittorio.niespolo@micegroup.it
	 * @param specification to use to filter Prodotto
	 * @param pageable
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<Prodotto> search(Specification<Prodotto> specification, Pageable pageable) {
		specification = aclService.applyAcl(specification, "prodotto.search");
		return prodottoRepository.findAll(specification, pageable);
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
	public void deleteById(Integer id) {
		prodottoRepository.deleteById(id);
	}

	/**
	 * Executes the bulk update of a Prodotto
	 * 
	 * @param prodotto
	 * @return updated Prodotto
	 */
	@Override
	@Transactional
	public Prodotto bulkUpdate(Prodotto prodotto) {
		if (prodotto.getTheRigaOrdine() != null) {
			List<RigaOrdine> updateTheRigaOrdine = prodotto.getTheRigaOrdine().stream()
					.filter(child -> !child.isDeletedEntityState()).collect(Collectors.toList());
			List<RigaOrdine> deleteTheRigaOrdine = prodotto.getTheRigaOrdine().stream()
					.filter(GenericEntity::isDeletedEntityState).collect(Collectors.toList());
			prodotto.setTheRigaOrdine(updateTheRigaOrdine);
			deleteTheRigaOrdine.forEach(child -> rigaOrdineService.deleteById(child.getTheRigaOrdineKey()));
		}
		return this.update(prodotto);
	}

	@Transactional(readOnly = true)
	public JasperPrint getJasperPrint(String reportName, Collection<?> collection) throws BusinessException {
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(collection);
		Map<String, Object> parameters = new HashMap<>();
		// Adds to the collection the compiled master report dependency (for subreport)
		// and return the compiled master report.
		List<String> fileNames = Arrays.asList(reportName, "ListRigaOrdineForProdotto");
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
		Collection<Prodotto> prodottoCollection = new ArrayList<>();
		Optional<Prodotto> optionalProdotto = findByObjectKey(objectKey);
		if (optionalProdotto.isPresent()) {
			Prodotto prodotto = optionalProdotto.get();
			prodottoCollection.add(prodotto);
			try {
				return JasperExportManager.exportReportToPdf(getJasperPrint(DETAIL_PRODOTTO, prodottoCollection));
			} catch (JRException e) {
				log.error(LOG_ERROR, e);
			}
		}
		return new byte[0];
	}

	@Transactional(readOnly = true)
	public byte[] printXLSList(Specification<Prodotto> specification) {
		Collection<Prodotto> prodottoCollection = search(specification, Pageable.unpaged()).getContent();
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			byteArrayOutputStream = exportXlsReport(getJasperPrint(LIST_PRODOTTO, prodottoCollection));
		} catch (JRException e) {
			log.error(LOG_ERROR, e);
		}
		return byteArrayOutputStream.toByteArray();
	}
}
