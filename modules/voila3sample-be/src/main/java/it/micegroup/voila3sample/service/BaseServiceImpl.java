package it.micegroup.voila3sample.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.stereotype.Service;
import it.micegroup.voila2runtime.exception.BusinessException;
import it.micegroup.voila3sample.utilities.JasperReportsCache;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.Exporter;
import net.sf.jasperreports.export.ExporterInput;
import net.sf.jasperreports.export.OutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import net.sf.jasperreports.export.XlsxExporterConfiguration;
import net.sf.jasperreports.export.XlsxReportConfiguration;

/**
 * Generic class for services
 */
@Service
public class BaseServiceImpl {
	private static final String JASPER_REPORT_EXTENSION = ".jrxml";

	protected static final String LOG_ERROR = "Error: ";

	@Value("${jasperreports.dir}")
	protected String jasperReportsDir;

	@Autowired
	private ResourceLoader resourceLoader;

	@Value("${jasperreports.debug}")
	private Boolean jasperReportsDebug;

	@Autowired
	private JasperReportsCache jasperReportsCache;

	protected JasperReport prepareJasperReport(String reportName, Map<String, Object> parameters,
			List<String> fileNames) throws BusinessException {
		String jrMainKey = reportName;
		String jrMainFilename = jrMainKey + JASPER_REPORT_EXTENSION;
		try {
			// Find and build all dependency resources except the main (also know as master
			// report).
			ResourcePatternResolver resourcePatternResolver = ResourcePatternUtils
					.getResourcePatternResolver(resourceLoader);
			List<Resource> jrResources = new ArrayList<>();
			for (String name : fileNames) {
				jrResources.add(resourcePatternResolver
						.getResource("classpath:" + jasperReportsDir + "/" + name + JASPER_REPORT_EXTENSION));
			}
			Resource jrMainResource = null;
			for (Resource resource : jrResources) {
				String filename = resource.getFilename();
				if (filename != null && filename.equals(jrMainFilename)) {
					// Save main report resource (file) and jump the build.
					jrMainResource = resource;
					continue;
				}
				String jrKey = "";
				if (filename != null) {
					jrKey = filename.replaceFirst(JASPER_REPORT_EXTENSION, "");
				}
				if (Boolean.TRUE.equals(jasperReportsDebug) || !jasperReportsCache.isSaved(jrKey)) {
					jasperReportsCache.save(jrKey, JasperCompileManager.compileReport(resource.getInputStream()));
				}
				parameters.put(jrKey, jasperReportsCache.load(jrKey));
			}
			// Check if main report exist.
			if (jrMainResource == null) {
				throw new IllegalArgumentException(jrMainFilename + " not found");
			}
			// Compile and return the main report.
			if (Boolean.TRUE.equals(jasperReportsDebug) || !jasperReportsCache.isSaved(jrMainKey)) {
				jasperReportsCache.save(jrMainKey, JasperCompileManager.compileReport(jrMainResource.getInputStream()));
			}
			return jasperReportsCache.load(jrMainKey);
		} catch (IOException e) {
			throw new BusinessException(e);
		} catch (JRException j) {
			throw new BusinessException(j);
		}
	}

	protected ByteArrayOutputStream exportXlsReport(JasperPrint jasperPrint) throws JRException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

		SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
		configuration.setOnePagePerSheet(true);
		configuration.setIgnoreGraphics(false);

		Exporter<ExporterInput, XlsxReportConfiguration, XlsxExporterConfiguration, OutputStreamExporterOutput> exporter = new JRXlsxExporter();
		exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byteArrayOutputStream));
		exporter.setConfiguration(configuration);
		exporter.exportReport();

		return byteArrayOutputStream;
	}
}
