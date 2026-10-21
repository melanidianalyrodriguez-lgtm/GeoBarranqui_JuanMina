var map = L.map('map', {
  zoomControl: false,
  minZoom: 3,
  attributionControl: true,
  preferCanvas: true
}).setView([10.9594, -74.8897], 14);

var welcomeNotice = document.getElementById('welcome-notice');
var functionalityNotice = document.getElementById('functionality-notice');
var guidedTour = document.getElementById('guided-tour');
var welcomeClose = document.getElementById('close-welcome-notice');
var welcomeOpener = document.getElementById('open-welcome-guide');
var tourSteps = [
  { icon: '▤', title: 'Capas y mapas base', description: 'En el panel derecho, marca las capas territoriales que quieres ver. Allí también puedes cambiar el mapa base entre Imágenes y Calles.' },
  { icon: '⌖', title: 'Moverse por el mapa', description: 'Arrastra el mapa para desplazarte. Usa la brújula y el control de zoom de la esquina superior derecha para moverte, acercar, alejar o volver al centro de Juan Mina.' },
  { icon: '⫫', title: 'Comparar con el divisor', description: 'Pulsa “Divisor” para comparar Imágenes y Calles. Usa el botón de orientación que aparece sobre el mapa para cambiar entre separación vertical y horizontal; luego arrastra la barra para revelar cada mapa base.' },
  { icon: '✎', title: 'Dibujar y medir', description: 'Elige Punto, Línea o Polígono en la barra de dibujo y marca su ubicación en el mapa. Para medir distancias o áreas, usa el control de medición del mapa.' },
  { icon: '◉', title: 'Cambiar estilo del dibujo', description: 'Pulsa “Estilo dibujo” y selecciona un elemento. Ajusta color, grosor, patrón, relleno o tamaño; también puedes eliminar el dibujo seleccionado.' },
  { icon: '⌁', title: 'Herramientas GIS', description: 'En el panel “Herramientas GIS”, selecciona una capa para cambiar su color y transparencia o clasificarla por un atributo. Configura los metros para crear un buffer o elige otra capa para calcular una intersección.' },
  { icon: 'Aa', title: 'Etiquetas de shapefiles', description: 'Pulsa “Etiquetas” y selecciona una capa. Activa o desactiva sus rótulos con “Mostrar etiquetas de esta capa”; define campo o expresión, fuente, tamaño, color y posición. Ajusta o elimina relleno y contorno con sus controles de color y transparencia. Crea clases con filtros y limita la visualización por escala.' },
  { icon: '▦', title: 'Consultar la tabla', description: 'Pulsa “Tabla” para revisar los atributos de las capas. Filtra por campo y valor, selecciona resultados y usa “Acercar” para ubicarlos en el mapa.' },
  { icon: '⇩', title: 'Guardar una imagen', description: 'Pulsa “Guardar imagen”, elige PNG o JPG y la resolución. Si lo necesitas, escribe un nombre e incluye un título antes de descargar.' },
  { icon: '⌫', title: 'Limpiar el mapa', description: 'Pulsa “Limpiar” para quitar los dibujos, mediciones, resultados de análisis y selecciones que agregaste durante la sesión.' }
];
var tourStepIndex = 0;
function closeWelcomeNotice() {
  welcomeNotice.hidden = true;
  welcomeOpener.focus();
}
function openFunctionalityNotice() {
  welcomeNotice.hidden = true;
  functionalityNotice.hidden = false;
  document.getElementById('close-functionality-notice').focus();
}
function closeFunctionalityNotice() {
  functionalityNotice.hidden = true;
  welcomeOpener.focus();
}
function renderTourStep() {
  var step = tourSteps[tourStepIndex];
  document.getElementById('tour-step-count').textContent = 'Paso ' + (tourStepIndex + 1) + ' de ' + tourSteps.length;
  document.getElementById('tour-step-icon').textContent = step.icon;
  document.getElementById('tour-step-title').textContent = step.title;
  document.getElementById('tour-step-description').textContent = step.description;
  document.getElementById('tour-progress-fill').style.width = ((tourStepIndex + 1) / tourSteps.length * 100) + '%';
  document.getElementById('tour-back').disabled = tourStepIndex === 0;
  document.getElementById('tour-next').textContent = tourStepIndex === tourSteps.length - 1 ? 'Terminar ✓' : 'Siguiente →';
}
function openGuidedTour() {
  welcomeNotice.hidden = true;
  functionalityNotice.hidden = true;
  tourStepIndex = 0;
  renderTourStep();
  guidedTour.hidden = false;
  document.getElementById('close-guided-tour').focus();
}
function closeGuidedTour() {
  guidedTour.hidden = true;
  welcomeOpener.focus();
}
document.getElementById('tour-back').addEventListener('click', function () {
  if (tourStepIndex > 0) { tourStepIndex--; renderTourStep(); }
});
document.getElementById('tour-next').addEventListener('click', function () {
  if (tourStepIndex < tourSteps.length - 1) { tourStepIndex++; renderTourStep(); }
  else closeGuidedTour();
});
welcomeNotice.hidden = false;
welcomeClose.focus();
welcomeClose.addEventListener('click', closeWelcomeNotice);
document.getElementById('skip-to-map').addEventListener('click', closeWelcomeNotice);
document.getElementById('show-tutorial').addEventListener('click', openGuidedTour);
document.getElementById('start-exploring').addEventListener('click', closeFunctionalityNotice);
document.getElementById('close-functionality-notice').addEventListener('click', closeFunctionalityNotice);
document.getElementById('start-guided-tour').addEventListener('click', openGuidedTour);
document.getElementById('close-guided-tour').addEventListener('click', closeGuidedTour);
welcomeOpener.addEventListener('click', openFunctionalityNotice);
welcomeNotice.addEventListener('click', function (event) { if (event.target === welcomeNotice) closeWelcomeNotice(); });
functionalityNotice.addEventListener('click', function (event) { if (event.target === functionalityNotice) closeFunctionalityNotice(); });
guidedTour.addEventListener('click', function (event) { if (event.target === guidedTour) closeGuidedTour(); });
document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape') return;
  if (!guidedTour.hidden) closeGuidedTour();
  else if (!functionalityNotice.hidden) closeFunctionalityNotice();
  else if (!welcomeNotice.hidden) closeWelcomeNotice();
  else if (!labelsPanel.hidden) { toggleLabelsPanel(false); labelsToggle.focus(); }
});

var dashboard = document.getElementById('project-dashboard');
var dashboardToggle = document.getElementById('dashboard-toggle');
dashboardToggle.addEventListener('click', function () {
  dashboard.hidden = !dashboard.hidden;
  dashboardToggle.setAttribute('aria-expanded', String(!dashboard.hidden));
  dashboardToggle.setAttribute('aria-label', dashboard.hidden ? 'Mostrar capas y panel del proyecto' : 'Ocultar capas y panel del proyecto');
  dashboardToggle.title = dashboard.hidden ? 'Mostrar capas y panel del proyecto' : 'Ocultar capas y panel del proyecto';
  document.body.classList.toggle('dashboard-hidden', dashboard.hidden);
  window.setTimeout(function () { map.invalidateSize(); }, 220);
});

L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  crossOrigin: true,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  crossOrigin: true,
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var baseMaps = {
  'Imágenes': Esri_WorldImagery,
  'Calles': Esri_WorldStreetMap
};

var overlayLayers = {};
var drawnItems = new L.FeatureGroup();
var layerControl = L.control.layers(baseMaps, overlayLayers, { collapsed: false, position: 'topright' });

// Configuración de etiquetas para las capas SHP cargadas en el visor.
var labelStates = {};
var labelLayerSelect = document.getElementById('label-layer');
var labelClassSelect = document.getElementById('label-class-select');
var labelsStatus = document.getElementById('labels-status');
var labelsPanel = document.getElementById('labels-panel');
var labelsToggle = document.getElementById('labels-toggle');
function newLabelState() {
  return {
    enabled: false, source: 'field', field: '', expressionLanguage: 'python', expression: '',
    font: 'Segoe UI', size: 12, color: '#2d0f1d',
    fillEnabled: true, fillColor: '#fffaf5', fillOpacity: 92,
    outlineEnabled: true, outlineColor: '#2d0f1d', outlineOpacity: 35,
    positions: { point: 'auto', line: 'center', polygon: 'center' },
    scaleMin: 0, scaleMax: 1000000000, activeClass: 0,
    classes: [{ name: 'General', field: '', operator: 'equals', value: '' }]
  };
}
function walkLabelFeatures(layer, callback) {
  if (!layer) return;
  if (layer.feature && typeof layer.bindTooltip === 'function') { callback(layer); return; }
  if (typeof layer.eachLayer === 'function') layer.eachLayer(function (child) { walkLabelFeatures(child, callback); });
}
function getLabelFields(layer) {
  var fields = new Set();
  walkLabelFeatures(layer, function (featureLayer) {
    Object.keys((featureLayer.feature && featureLayer.feature.properties) || {}).forEach(function (field) { fields.add(field); });
  });
  return Array.from(fields).sort(function (a, b) { return a.localeCompare(b); });
}
function fillLabelFieldSelect(select, fields, selectedValue, includeAny) {
  select.innerHTML = '';
  var empty = document.createElement('option');
  empty.value = '';
  empty.textContent = includeAny ? 'Sin filtro' : 'Selecciona un campo';
  select.appendChild(empty);
  fields.forEach(function (field) {
    var option = document.createElement('option'); option.value = field; option.textContent = field; select.appendChild(option);
  });
  if (fields.indexOf(selectedValue) >= 0) select.value = selectedValue;
}
function refreshLabelLayerOptions() {
  var previous = labelLayerSelect.value;
  var names = Object.keys(overlayLayers).filter(function (name) { return overlayLayers[name] && overlayLayers[name]._tipo; });
  labelLayerSelect.innerHTML = '';
  var placeholder = document.createElement('option'); placeholder.value = ''; placeholder.textContent = names.length ? 'Selecciona una capa' : 'Carga una capa vectorial'; labelLayerSelect.appendChild(placeholder);
  names.forEach(function (name) { var option = document.createElement('option'); option.value = name; option.textContent = name; labelLayerSelect.appendChild(option); });
  if (names.indexOf(previous) >= 0) labelLayerSelect.value = previous;
  else if (names.length) labelLayerSelect.value = names[0];
  populateLabelPanel();
}
function saveLabelClassDraft(state) {
  var index = Number(state.activeClass) || 0;
  var rule = state.classes[index];
  if (!rule) return;
  rule.name = document.getElementById('label-class-name').value.trim() || 'Clase ' + (index + 1);
  rule.field = document.getElementById('label-filter-field').value;
  rule.operator = document.getElementById('label-filter-operator').value;
  rule.value = document.getElementById('label-filter-value').value;
  state.activeClass = index;
}
function renderLabelClassEditor(state) {
  labelClassSelect.innerHTML = '';
  state.classes.forEach(function (rule, index) { var option = document.createElement('option'); option.value = String(index); option.textContent = rule.name || 'Clase ' + (index + 1); labelClassSelect.appendChild(option); });
  var active = Math.max(0, Math.min(state.classes.length - 1, Number(state.activeClass) || 0));
  state.activeClass = active;
  labelClassSelect.value = String(active);
  var rule = state.classes[active] || state.classes[0];
  document.getElementById('label-class-name').value = rule.name;
  document.getElementById('label-filter-field').value = rule.field || '';
  document.getElementById('label-filter-operator').value = rule.operator || 'equals';
  document.getElementById('label-filter-value').value = rule.value || '';
  document.getElementById('remove-label-class').disabled = state.classes.length <= 1;
}
function populateLabelPanel() {
  var name = labelLayerSelect.value;
  labelLayerSelect.dataset.currentName = name;
  var root = overlayLayers[name];
  var fields = root ? getLabelFields(root) : [];
  if (!name || !root) {
    document.getElementById('label-field').innerHTML = '<option value="">Selecciona una capa primero</option>';
    fillLabelFieldSelect(document.getElementById('label-filter-field'), [], '', true);
    renderLabelClassEditor(newLabelState());
    labelsStatus.textContent = 'Selecciona una capa shapefile para configurar sus etiquetas.';
    return;
  }
  if (!labelStates[name]) labelStates[name] = newLabelState();
  var state = labelStates[name];
  fillLabelFieldSelect(document.getElementById('label-field'), fields, state.field, false);
  fillLabelFieldSelect(document.getElementById('label-filter-field'), fields, '', true);
  document.getElementById('labels-enabled').checked = state.enabled;
  document.getElementById('label-source').value = state.source;
  document.getElementById('label-expression-language').value = state.expressionLanguage;
  document.getElementById('label-expression').value = state.expression;
  document.getElementById('label-font').value = state.font;
  document.getElementById('label-size').value = state.size;
  document.getElementById('label-size-value').textContent = state.size + ' px';
  document.getElementById('label-color').value = state.color;
  document.getElementById('label-fill-enabled').checked = state.fillEnabled;
  document.getElementById('label-fill-color').value = state.fillColor;
  document.getElementById('label-fill-opacity').value = state.fillOpacity;
  document.getElementById('label-fill-opacity-value').textContent = state.fillOpacity + '%';
  document.getElementById('label-outline-enabled').checked = state.outlineEnabled;
  document.getElementById('label-outline-color').value = state.outlineColor;
  document.getElementById('label-outline-opacity').value = state.outlineOpacity;
  document.getElementById('label-outline-opacity-value').textContent = state.outlineOpacity + '%';
  document.getElementById('label-position-point').value = state.positions.point;
  document.getElementById('label-position-line').value = state.positions.line;
  document.getElementById('label-position-polygon').value = state.positions.polygon;
  document.getElementById('label-scale-min').value = state.scaleMin;
  document.getElementById('label-scale-max').value = state.scaleMax;
  document.getElementById('label-field-row').hidden = state.source !== 'field';
  document.getElementById('label-expression-section').hidden = state.source !== 'expression';
  renderLabelClassEditor(state);
  labelsStatus.textContent = fields.length + ' campos disponibles en ' + name + '.';
}
function splitLabelExpression(expression, separator) {
  var parts = [], start = 0, quote = '', escaped = false, depth = 0;
  for (var i = 0; i < expression.length; i++) {
    var character = expression[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = '';
      continue;
    }
    if (character === '"' || character === "'") quote = character;
    else if (character === '(') depth++;
    else if (character === ')') depth--;
    else if (character === separator && depth === 0) { parts.push(expression.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(expression.slice(start).trim());
  return parts;
}
function unquoteLabelText(term) {
  var quote = term[0];
  var value = term.slice(1, -1);
  return value.replace(/\\([\\"'nrt])/g, function (match, character) { return character === 'n' ? '\n' : character === 'r' ? '\r' : character === 't' ? '\t' : character; });
}
function evaluateLabelTerm(term, properties, language) {
  term = term.trim();
  while (term[0] === '(' && term[term.length - 1] === ')') term = term.slice(1, -1).trim();
  if (!term) return '';
  if ((term[0] === '"' || term[0] === "'") && term[term.length - 1] === term[0]) return unquoteLabelText(term);
  var wrapper = term.match(/^(str|CStr|UCase|LCase|upper|lower)\s*\(([\s\S]*)\)$/i);
  if (wrapper) {
    var wrapped = evaluateLabelExpression(wrapper[2], properties, language);
    if (/^(UCase|upper)$/i.test(wrapper[1])) return wrapped.toUpperCase();
    if (/^(LCase|lower)$/i.test(wrapper[1])) return wrapped.toLowerCase();
    return wrapped;
  }
  var field = '';
  if (language === 'python') {
    var pythonField = term.match(/^(?:feature\s*\[\s*["']properties["']\s*\]\s*)?properties\s*\[\s*["']([^"']+)["']\s*\]$/) || term.match(/^feature\s*\[\s*["']properties["']\s*\]\s*\[\s*["']([^"']+)["']\s*\]$/);
    if (pythonField) field = pythonField[1];
  } else {
    var vbField = term.match(/^\[([^\]]+)\]$/) || term.match(/^Fields!?\s*\[?([\w ]+)\]?\.Value$/i);
    if (vbField) field = vbField[1];
  }
  if (field) return properties[field] == null ? '' : String(properties[field]);
  throw new Error('No se reconoce esta parte de la expresión: ' + term);
}
function evaluateLabelExpression(expression, properties, language) {
  var separator = language === 'vbscript' ? '&' : '+';
  return splitLabelExpression(expression, separator).map(function (term) { return evaluateLabelTerm(term, properties, language); }).join('').trim();
}
function evaluateFeatureLabel(featureLayer, state) {
  var properties = (featureLayer.feature && featureLayer.feature.properties) || {};
  var raw = state.source === 'field' ? properties[state.field] : evaluateLabelExpression(state.expression, properties, state.expressionLanguage);
  return raw == null ? '' : String(raw).trim();
}
function labelClassMatches(properties, rule) {
  if (!rule || !rule.field) return true;
  var raw = properties[rule.field];
  var value = raw == null ? '' : String(raw);
  var expected = String(rule.value || '');
  switch (rule.operator) {
    case 'contains': return value.toLocaleLowerCase().indexOf(expected.toLocaleLowerCase()) >= 0;
    case 'starts': return value.toLocaleLowerCase().indexOf(expected.toLocaleLowerCase()) === 0;
    case 'gt': return Number(raw) > Number(expected);
    case 'lt': return Number(raw) < Number(expected);
    case 'not-empty': return value.trim() !== '';
    default: return value.toLocaleLowerCase() === expected.toLocaleLowerCase();
  }
}
function featureGeometryPosition(featureLayer, state) {
  var geometryType = featureLayer.feature && featureLayer.feature.geometry ? featureLayer.feature.geometry.type : '';
  if (/Point/i.test(geometryType) || featureLayer instanceof L.Marker) return state.positions.point;
  if (/Line/i.test(geometryType)) return state.positions.line;
  return state.positions.polygon;
}
function currentLabelScale() {
  var latitude = map.getCenter().lat * Math.PI / 180;
  return 591657550.5 * Math.cos(latitude) / Math.pow(2, map.getZoom());
}
function labelOutlineRgba(color, opacity) {
  var hex = String(color || '#2d0f1d').replace('#', '');
  var red = parseInt(hex.slice(0, 2), 16) || 0;
  var green = parseInt(hex.slice(2, 4), 16) || 0;
  var blue = parseInt(hex.slice(4, 6), 16) || 0;
  var alpha = Math.max(0, Math.min(100, Number(opacity) || 0)) / 100;
  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}
function removeFeatureLabel(featureLayer) {
  if (featureLayer._geovisorLabelStyleHandler && featureLayer.off) {
    featureLayer.off('tooltipopen', featureLayer._geovisorLabelStyleHandler);
    featureLayer._geovisorLabelStyleHandler = null;
  }
  var tooltipClass = featureLayer._tooltip && featureLayer._tooltip.options && featureLayer._tooltip.options.className;
  var hasGeovisorTooltip = String(tooltipClass || '').split(/\s+/).indexOf('geovisor-feature-label') >= 0;
  if ((featureLayer._geovisorLabelBound || hasGeovisorTooltip) && featureLayer.unbindTooltip) featureLayer.unbindTooltip();
  featureLayer._geovisorLabelBound = false;
  featureLayer._geovisorLabelSignature = '';
}
function applyLabelsToLayer(name) {
  var root = overlayLayers[name];
  var state = labelStates[name];
  if (!root || !state) return { count: 0, error: '' };
  var scale = currentLabelScale();
  var count = 0, expressionError = '';
  walkLabelFeatures(root, function (featureLayer) {
    var properties = (featureLayer.feature && featureLayer.feature.properties) || {};
    var inScale = scale >= Number(state.scaleMin || 0) && scale <= Number(state.scaleMax || 1000000000);
    var filteredClasses = (state.classes || []).filter(function (rule) { return rule.field; });
    var classMatches = !filteredClasses.length || filteredClasses.some(function (rule) { return labelClassMatches(properties, rule); });
    if (!state.enabled || !inScale || !classMatches || (state.source === 'field' && !state.field)) { removeFeatureLabel(featureLayer); return; }
    var text;
    try { text = evaluateFeatureLabel(featureLayer, state); }
    catch (error) { expressionError = error.message; removeFeatureLabel(featureLayer); return; }
    if (!text) { removeFeatureLabel(featureLayer); return; }
    var direction = featureGeometryPosition(featureLayer, state);
    var signature = JSON.stringify([text, direction, state.font, state.size, state.color, state.fillEnabled, state.fillColor, state.fillOpacity, state.outlineEnabled, state.outlineColor, state.outlineOpacity]);
    if (featureLayer._geovisorLabelBound && featureLayer._geovisorLabelSignature === signature) { count++; return; }
    removeFeatureLabel(featureLayer);
    var content = document.createElement('span'); content.textContent = text;
    featureLayer._geovisorLabelStyle = { font: state.font, size: state.size, color: state.color, fillEnabled: state.fillEnabled, fillColor: state.fillColor, fillOpacity: state.fillOpacity, outlineEnabled: state.outlineEnabled, outlineColor: state.outlineColor, outlineOpacity: state.outlineOpacity };
    if (!featureLayer._geovisorLabelStyleHandler) {
      featureLayer._geovisorLabelStyleHandler = function (event) {
        var element = event.tooltip && event.tooltip.getElement();
        var style = featureLayer._geovisorLabelStyle;
        if (!element || !style) return;
        element.style.fontFamily = style.font;
        element.style.fontSize = style.size + 'px';
        element.style.color = style.color;
        element.style.backgroundColor = style.fillEnabled ? labelOutlineRgba(style.fillColor, style.fillOpacity) : 'transparent';
        element.style.borderStyle = 'solid';
        element.style.borderWidth = style.outlineEnabled ? '1px' : '0';
        element.style.borderColor = style.outlineEnabled ? labelOutlineRgba(style.outlineColor, style.outlineOpacity) : 'transparent';
        element.style.boxShadow = style.outlineEnabled && Number(style.outlineOpacity) > 0 ? '0 1px 4px rgba(0,0,0,.25)' : 'none';
      };
      featureLayer.on('tooltipopen', featureLayer._geovisorLabelStyleHandler);
    }
    try {
      featureLayer.bindTooltip(L.tooltip({ permanent: true, direction: direction, className: 'geovisor-feature-label', opacity: 1 }).setContent(content));
      featureLayer._geovisorLabelBound = true;
      featureLayer._geovisorLabelSignature = signature;
      if (featureLayer._map) featureLayer.openTooltip();
    } catch (error) {
      expressionError = 'No se pudo dibujar la etiqueta: ' + error.message;
      removeFeatureLabel(featureLayer);
      return;
    }
    count++;
  });
  return { count: count, error: expressionError };
}
function refreshVisibleLabels() {
  Object.keys(labelStates).forEach(function (name) { if (labelStates[name].enabled) applyLabelsToLayer(name); });
}
function readLabelPanel(nameOverride) {
  var name = nameOverride || labelLayerSelect.value;
  var state = labelStates[name];
  if (!name || !state) return null;
  saveLabelClassDraft(state);
  state.enabled = document.getElementById('labels-enabled').checked;
  state.source = document.getElementById('label-source').value;
  state.field = document.getElementById('label-field').value;
  state.expressionLanguage = document.getElementById('label-expression-language').value;
  state.expression = document.getElementById('label-expression').value.trim();
  state.font = document.getElementById('label-font').value;
  state.size = Number(document.getElementById('label-size').value);
  state.color = document.getElementById('label-color').value;
  state.fillEnabled = document.getElementById('label-fill-enabled').checked;
  state.fillColor = document.getElementById('label-fill-color').value;
  state.fillOpacity = Number(document.getElementById('label-fill-opacity').value);
  state.outlineEnabled = document.getElementById('label-outline-enabled').checked;
  state.outlineColor = document.getElementById('label-outline-color').value;
  state.outlineOpacity = Number(document.getElementById('label-outline-opacity').value);
  state.positions = {
    point: document.getElementById('label-position-point').value,
    line: document.getElementById('label-position-line').value,
    polygon: document.getElementById('label-position-polygon').value
  };
  state.scaleMin = Number(document.getElementById('label-scale-min').value) || 0;
  state.scaleMax = Number(document.getElementById('label-scale-max').value) || 1000000000;
  return { name: name, state: state };
}
function applyLabelPanel() {
  var selected = readLabelPanel();
  if (!selected) { labelsStatus.textContent = 'Primero selecciona una capa shapefile.'; return; }
  if (selected.state.scaleMin > selected.state.scaleMax) { labelsStatus.textContent = 'La escala más detallada debe tener un denominador menor que la escala menos detallada.'; return; }
  if (selected.state.enabled && selected.state.source === 'field' && !selected.state.field) { labelsStatus.textContent = 'Selecciona el campo que se usará como etiqueta.'; return; }
  if (selected.state.enabled && selected.state.source === 'expression' && !selected.state.expression) { labelsStatus.textContent = 'Escribe una expresión para generar las etiquetas.'; return; }
  var layer = overlayLayers[selected.name];
  var layerWasVisible = map.hasLayer(layer);
  if (selected.state.enabled && !layerWasVisible) layer.addTo(map);
  var result = applyLabelsToLayer(selected.name);
  if (result.error) labelsStatus.textContent = 'No se pudo aplicar la etiqueta: ' + result.error;
  else if (!selected.state.enabled) labelsStatus.textContent = 'Etiquetas desactivadas para ' + selected.name + '.';
  else if (!result.count) labelsStatus.textContent = 'No hay etiquetas visibles. Revisa que el campo tenga valores y que los filtros y el rango de escala incluyan estas entidades.';
  else labelsStatus.textContent = result.count + ' etiquetas aplicadas en ' + selected.name + (layerWasVisible ? '.' : '. La capa se activó en el mapa para mostrarlas.');
}
function toggleLabelsPanel(open) {
  labelsPanel.hidden = typeof open === 'boolean' ? !open : !labelsPanel.hidden;
  labelsToggle.setAttribute('aria-expanded', String(!labelsPanel.hidden));
  labelsToggle.classList.toggle('active', !labelsPanel.hidden);
  if (!labelsPanel.hidden) { refreshLabelLayerOptions(); labelLayerSelect.focus(); }
}
labelsToggle.addEventListener('click', function () { toggleLabelsPanel(); });
document.getElementById('close-labels-panel').addEventListener('click', function () { toggleLabelsPanel(false); labelsToggle.focus(); });
labelLayerSelect.addEventListener('change', function () {
  var previous = labelLayerSelect.dataset.currentName;
  if (previous && labelStates[previous]) readLabelPanel(previous);
  populateLabelPanel();
});
document.getElementById('label-field').addEventListener('change', function () {
  if (this.value) document.getElementById('labels-enabled').checked = true;
});
document.getElementById('labels-enabled').addEventListener('change', function () {
  // Al reactivar, limpia cualquier tooltip residual antes de volver a enlazarlo.
  if (this.checked && labelLayerSelect.value) {
    walkLabelFeatures(overlayLayers[labelLayerSelect.value], function (featureLayer) { removeFeatureLabel(featureLayer); });
  }
  applyLabelPanel();
});
document.getElementById('label-expression').addEventListener('input', function () {
  if (this.value.trim()) document.getElementById('labels-enabled').checked = true;
});
document.getElementById('label-source').addEventListener('change', function (event) {
  document.getElementById('label-field-row').hidden = event.target.value !== 'field';
  document.getElementById('label-expression-section').hidden = event.target.value !== 'expression';
});
document.getElementById('label-expression-language').addEventListener('change', function (event) {
  document.getElementById('label-expression').placeholder = event.target.value === 'python'
    ? 'str(properties["nombre"]) + " - " + str(properties["sector"])'
    : 'CStr([nombre]) & " - " & CStr([sector])';
});
document.getElementById('label-size').addEventListener('input', function (event) { document.getElementById('label-size-value').textContent = event.target.value + ' px'; });
document.getElementById('label-outline-opacity').addEventListener('input', function (event) { document.getElementById('label-outline-opacity-value').textContent = event.target.value + '%'; });
document.getElementById('label-fill-opacity').addEventListener('input', function (event) { document.getElementById('label-fill-opacity-value').textContent = event.target.value + '%'; });
var labelOutlineApplyTimer;
function applyLabelOutlineChanges() {
  window.clearTimeout(labelOutlineApplyTimer);
  labelOutlineApplyTimer = window.setTimeout(function () {
    if (labelLayerSelect.value) applyLabelPanel();
  }, 120);
}
['label-outline-enabled', 'label-outline-color', 'label-outline-opacity', 'label-fill-enabled', 'label-fill-color', 'label-fill-opacity'].forEach(function (id) {
  var control = document.getElementById(id);
  control.addEventListener('input', applyLabelOutlineChanges);
  control.addEventListener('change', applyLabelOutlineChanges);
});
labelClassSelect.addEventListener('change', function () {
  var state = labelStates[labelLayerSelect.value]; if (!state) return;
  saveLabelClassDraft(state); state.activeClass = Number(labelClassSelect.value); renderLabelClassEditor(state);
});
document.getElementById('add-label-class').addEventListener('click', function () {
  var state = labelStates[labelLayerSelect.value]; if (!state) return;
  saveLabelClassDraft(state);
  state.classes.push({ name: 'Clase ' + (state.classes.length + 1), field: '', operator: 'equals', value: '' });
  state.activeClass = state.classes.length - 1; renderLabelClassEditor(state);
  document.getElementById('label-class-name').focus();
});
document.getElementById('remove-label-class').addEventListener('click', function () {
  var state = labelStates[labelLayerSelect.value]; if (!state || state.classes.length <= 1) return;
  saveLabelClassDraft(state); state.classes.splice(state.activeClass, 1); state.activeClass = Math.max(0, state.activeClass - 1); renderLabelClassEditor(state);
});
document.getElementById('apply-labels').addEventListener('click', applyLabelPanel);
map.on('zoomend moveend', refreshVisibleLabels);

Esri_WorldImagery.addTo(map);

function mostrarAtributos(feature, layer) {
  const contenido = document.createElement('pre');
  contenido.textContent = Object.entries(feature.properties || {})
    .map(([campo, valor]) => campo + ': ' + valor)
    .join('\n');
  layer.bindPopup(contenido);
}

var paletteTerritorial = ['#5f1f2d', '#a14e3d', '#c96e57', '#7e6872', '#d49a73', '#8f6b52', '#b47d6b', '#6e525d'];

function colorPorCategoria(value) {
  var text = String(value == null ? 'Sin categoría' : value);
  var hash = 0;
  for (var i = 0; i < text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  return paletteTerritorial[Math.abs(hash) % paletteTerritorial.length];
}

function estiloShapefile(tipo, feature) {
  var properties = feature && feature.properties ? feature.properties : {};
  if (tipo === 'limite') return { color: '#461827', weight: 3, opacity: 1, fillColor: '#c96e57', fillOpacity: 0.08 };
  if (tipo === 'manzanas') return { color: '#a14e3d', weight: 1, opacity: 0.75, fillColor: '#e2a281', fillOpacity: 0.12 };
  if (tipo === 'vias') return { color: '#2878a8', weight: 2.6, opacity: 0.95, lineCap: 'round', lineJoin: 'round' };
  var category = tipo === 'tratamientos' ? (properties.tratamient || properties.tipo_trata) : (properties.nombre_uso || properties.actividad || properties.etiqueta);
  var color = colorPorCategoria(category);
  return { color: color, weight: 1, opacity: 0.82, fillColor: color, fillOpacity: 0.38 };
}

function cargarCapasJuanMina() {
  var capas = [
    { nombre: 'Límite de Juan Mina', archivo: 'CORREGIMIENTO_JUAN', tipo: 'limite', visible: true },
    { nombre: 'Manzanas', archivo: 'MANZANAS', tipo: 'manzanas', visible: false },
    { nombre: 'Tratamientos urbanísticos', archivo: 'TRATAM_JUAN', tipo: 'tratamientos', visible: false },
    { nombre: 'Usos del suelo', archivo: 'USOS_SUELO', tipo: 'usos', visible: true },
    { nombre: 'Vías de Juan Mina', archivo: 'VIAS_JUAN_MINA', tipo: 'vias', visible: true }
  ];
  var loadedCount = 0;
  var failedCount = 0;
  var layerStatus = document.getElementById('layer-status');
  var toolStatus = document.getElementById('tool-status');
  if (window.location.protocol === 'file:') {
    if (layerStatus) layerStatus.textContent = 'Abre con Live Server';
    if (toolStatus) toolStatus.textContent = 'El navegador bloquea la lectura de SHP desde file://. Inicia Live Server y abre la página desde http://localhost.';
    return;
  }
  capas.forEach(function (config) {
    var ruta = new URL('DATA/SHP_GEOVISOR/' + config.archivo + '.shp', document.baseURI).href;
    if (typeof window.shp !== 'function') {
      failedCount++;
      if (layerStatus) layerStatus.textContent = 'No cargó shpjs';
      console.error('No está disponible shpjs para cargar ' + config.archivo + '.');
      return;
    }
    Promise.resolve().then(function () { return window.shp(ruta); }).then(function (geojson) {
      if (Array.isArray(geojson)) {
        geojson = { type: 'FeatureCollection', features: geojson.reduce(function (all, item) { return all.concat(item.features || []); }, []) };
      }
      if (!geojson || !Array.isArray(geojson.features)) throw new Error('El archivo no produjo una colección de entidades válida.');
      var layer = L.geoJSON(geojson, {
        style: function (feature) { return estiloShapefile(config.tipo, feature); },
        pointToLayer: function (feature, latlng) {
          var pointStyle = estiloShapefile(config.tipo, feature);
          return L.circleMarker(latlng, { radius: 6, ...pointStyle });
        },
        onEachFeature: mostrarAtributos
      });
      layer._tipo = config.tipo;
      overlayLayers[config.nombre] = layer;
      refreshLabelLayerOptions();
      refreshDrawingStyleTargets();
      layerControl.addOverlay(layer, config.nombre);
      if (config.visible) layer.addTo(map);
      if (config.tipo === 'limite' || config.tipo === 'usos' || config.tipo === 'vias') layer.bringToFront();
      if (config.tipo === 'usos') {
        var bounds = layer.getBounds();
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [55, 55], maxZoom: 15 });
      }
      loadedCount++;
      var count = document.getElementById('shapefile-count');
      if (count) count.textContent = loadedCount;
      if (layerStatus) layerStatus.textContent = loadedCount + ' de ' + capas.length + ' capas';
      if (toolStatus) toolStatus.textContent = 'Capas de Juan Mina cargadas: ' + loadedCount + ' de ' + capas.length + '.';
    }).catch(function (error) {
      failedCount++;
      console.error('No se pudo cargar ' + config.nombre + ' desde ' + ruta + ':', error);
      if (layerStatus) layerStatus.textContent = loadedCount + ' listas · ' + failedCount + ' error(es)';
      if (toolStatus) toolStatus.textContent = 'Error en ' + config.nombre + ': ' + (error.message || 'No se pudo leer el shapefile.') + ' Revisa la ruta DATA/SHP_GEOVISOR y sus archivos .dbf.';
    });
  });
}

function cargarGeoTiff(ruta, nombre, opciones) {
  opciones = opciones || {};
  var grupo = L.layerGroup();
  overlayLayers[nombre] = grupo;
  if (layerControl) {
    layerControl.addOverlay(grupo, nombre);
  }

  fetch(ruta)
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.arrayBuffer();
    })
    .then(function (buffer) {
      return parseGeoraster(buffer, { readOnDemand: true });
    })
    .then(function (georaster) {
      if (georaster.numberOfRasters < 3) {
        throw new Error('Se necesitan al menos tres bandas para mostrar color natural.');
      }

      var capa = new GeoRasterLayer({
        georaster: georaster,
        resolution: 256,
        opacity: 0.82,
        pixelValuesToColorFn: function (values) {
          if (values.slice(0, 3).some(function (value) { return value == null || Number.isNaN(value); })) return null;
          if (values.length > 3 && values[3] === 0) return null;

          var r, g, b;
          if (opciones.ycbcr) {
            var y = values[0], cb = values[1] - 128, cr = values[2] - 128;
            r = Math.round(y + 1.402 * cr);
            g = Math.round(y - 0.34414 * cb - 0.71414 * cr);
            b = Math.round(y + 1.772 * cb);
          } else {
            r = values[0]; g = values[1]; b = values[2];
          }

          if (opciones.fondoNegro && r <= 5 && g <= 5 && b <= 5) return null;
          if (values.length > 3) return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + values[3] / 255 + ')';
          return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
      });

      grupo.addLayer(capa);
      var bounds = capa.getBounds();
      if (bounds && bounds.isValid && bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    })
    .catch(function (error) {
      console.error('No se pudo cargar ' + ruta + ':', error);
    });

  return grupo;
}

layerControl.addTo(map);
var dashboardLayerControl = document.getElementById('dashboard-layer-control');
if (dashboardLayerControl && layerControl.getContainer()) dashboardLayerControl.appendChild(layerControl.getContainer());

map.addLayer(drawnItems);

var drawOptions = {
  shapeOptions: {
    color: '#5f1f2d',
    weight: 3,
    opacity: 0.9,
    fillColor: '#c96e57',
    fillOpacity: 0.28,
    renderer: L.canvas()
  },
  metric: true
};

var drawHandlers = {
  marker: new L.Draw.CircleMarker(map, drawOptions),
  polyline: new L.Draw.Polyline(map, drawOptions),
  polygon: new L.Draw.Polygon(map, drawOptions)
};

var activeDrawTool = null;
var selectedDrawing = null;
var stylePanel = document.getElementById('drawing-style-panel');
var styleToggle = document.getElementById('drawing-style-toggle');
var styleTargetSelect = document.getElementById('drawing-style-target');

function collectStyleablePaths(layer, result) {
  if (!layer) return;
  if (layer instanceof L.GeoJSON || layer instanceof L.FeatureGroup || layer instanceof L.LayerGroup) {
    layer.eachLayer(function (child) { collectStyleablePaths(child, result); });
    return;
  }
  if (layer instanceof L.Path && typeof layer.setStyle === 'function') result.push(layer);
}

function refreshDrawingStyleTargets() {
  if (!styleTargetSelect) return;
  var previous = styleTargetSelect.value || 'drawing';
  styleTargetSelect.innerHTML = '<option value="drawing">Dibujo seleccionado</option>';
  Object.keys(overlayLayers).forEach(function (name) {
    var paths = []; collectStyleablePaths(overlayLayers[name], paths);
    if (!paths.length) return;
    var option = document.createElement('option');
    option.value = 'layer:' + name;
    option.textContent = name + ' (' + paths.length + ')';
    styleTargetSelect.appendChild(option);
  });
  if (Array.from(styleTargetSelect.options).some(function (option) { return option.value === previous; })) styleTargetSelect.value = previous;
  else styleTargetSelect.value = 'drawing';
  syncDrawingStylePanel();
}

function getActiveStyleTargets() {
  if (styleTargetSelect.value === 'drawing') return selectedDrawing ? [selectedDrawing] : [];
  var name = styleTargetSelect.value.slice(6);
  var paths = []; collectStyleablePaths(overlayLayers[name], paths);
  return paths;
}

function selectDrawing(layer) {
  selectedDrawing = layer;
  styleTargetSelect.value = 'drawing';
  document.getElementById('style-feature-name').textContent = layer instanceof L.Polygon ? 'Polígono' : (layer instanceof L.CircleMarker ? 'Punto' : 'Línea');
  document.getElementById('drawing-style-status').textContent = 'Editando el estilo del elemento seleccionado.';
  syncDrawingStylePanel();
}

function syncDrawingStylePanel() {
  var targets = getActiveStyleTargets();
  var targetValue = styleTargetSelect.value;
  var targetName = targetValue === 'drawing' ? (selectedDrawing ? (selectedDrawing instanceof L.Polygon ? 'Polígono' : (selectedDrawing instanceof L.CircleMarker ? 'Punto' : 'Línea')) : 'Selecciona un dibujo') : targetValue.slice(6);
  document.getElementById('style-feature-name').textContent = targetName;
  if (!targets.length) {
    document.querySelector('.style-fill-options').style.display = 'none';
    document.querySelector('.point-size-row').style.display = 'none';
    document.getElementById('drawing-style-status').textContent = 'Selecciona un dibujo o una capa vectorial.';
    return;
  }
  var first = targets[0];
  var polygon = targets.some(function (layer) { return layer instanceof L.Polygon; });
  var point = targets.some(function (layer) { return layer instanceof L.CircleMarker; });
  document.querySelector('.style-fill-options').style.display = polygon || point ? '' : 'none';
  document.querySelector('.point-size-row').style.display = point ? '' : 'none';
  document.getElementById('drawing-stroke-color').value = first.options.color || '#5f1f2d';
  document.getElementById('drawing-stroke-width').value = first.options.weight || 3;
  document.getElementById('stroke-width-value').textContent = (first.options.weight || 3) + ' px';
  document.getElementById('drawing-fill-color').value = first._drawingFillColor || (typeof first.options.fillColor === 'string' ? first.options.fillColor : '#c96e57');
  document.getElementById('drawing-fill-opacity').value = Math.round((first.options.fillOpacity == null ? .28 : first.options.fillOpacity) * 100);
  document.getElementById('fill-opacity-value').textContent = document.getElementById('drawing-fill-opacity').value + '%';
  document.getElementById('drawing-point-size').value = first.getRadius ? first.getRadius() : 8;
  document.getElementById('point-size-value').textContent = document.getElementById('drawing-point-size').value + ' px';
  document.getElementById('drawing-fill-enabled').checked = first.options.fill !== false;
}

function addCanvasPattern(layer, type, color) {
  var renderer = layer._renderer || map.getRenderer(layer);
  var context = renderer && renderer._ctx;
  if (!context || !context.createPattern) {
    document.getElementById('drawing-style-status').textContent = 'No se pudo iniciar el relleno tramado en el renderer Canvas.';
    return false;
  }
  var tile = document.createElement('canvas'); tile.width = 12; tile.height = 12;
  var brush = tile.getContext('2d'); brush.strokeStyle = color; brush.fillStyle = color; brush.lineWidth = 1.3;
  if (type === 'hatch' || type === 'cross') { brush.beginPath(); brush.moveTo(-2, 2); brush.lineTo(2, -2); brush.moveTo(0, 12); brush.lineTo(12, 0); brush.moveTo(10, 14); brush.lineTo(14, 10); brush.stroke(); }
  if (type === 'horizontal' || type === 'cross') { brush.beginPath(); brush.moveTo(0, 3); brush.lineTo(12, 3); brush.moveTo(0, 9); brush.lineTo(12, 9); brush.stroke(); }
  if (type === 'vertical') { brush.beginPath(); brush.moveTo(3, 0); brush.lineTo(3, 12); brush.moveTo(9, 0); brush.lineTo(9, 12); brush.stroke(); }
  if (type === 'dots') { brush.beginPath(); brush.arc(3, 3, 1.4, 0, Math.PI * 2); brush.arc(9, 9, 1.4, 0, Math.PI * 2); brush.fill(); }
  if (type === 'dash') { brush.beginPath(); brush.moveTo(0, 5); brush.lineTo(4, 5); brush.moveTo(8, 5); brush.lineTo(12, 5); brush.stroke(); }
  if (type === 'dotdash') { brush.beginPath(); brush.moveTo(0, 6); brush.lineTo(7, 6); brush.stroke(); brush.beginPath(); brush.arc(10, 6, 1, 0, Math.PI * 2); brush.fill(); }
  layer.options.fillColor = context.createPattern(tile, 'repeat');
  layer.redraw();
  return true;
}

function applySelectedDrawingStyle() {
  var targets = getActiveStyleTargets();
  if (!targets.length) {
    document.getElementById('drawing-style-status').textContent = 'Selecciona primero un dibujo o una capa vectorial.';
    return;
  }
  var pattern = document.getElementById('drawing-fill-pattern').value;
  var dashes = { solid: null, dash: '8 5', dot: '2 5', dashdot: '8 4 2 4' };
  var strokeColor = document.getElementById('drawing-stroke-color').value;
  var fillColor = document.getElementById('drawing-fill-color').value;
  var patternReady = true;
  targets.forEach(function (layer) {
    var polygon = layer instanceof L.Polygon;
    var point = layer instanceof L.CircleMarker;
    var fillOn = (polygon || point) && document.getElementById('drawing-fill-enabled').checked && pattern !== 'none';
    var style = { color: strokeColor, weight: Number(document.getElementById('drawing-stroke-width').value), opacity: 1, dashArray: dashes[document.getElementById('drawing-line-pattern').value], fill: fillOn, fillColor: fillColor, fillOpacity: Number(document.getElementById('drawing-fill-opacity').value) / 100 };
    if (point) layer.setRadius(Number(document.getElementById('drawing-point-size').value));
    layer.setStyle(style);
    layer._drawingFillColor = fillColor;
    if (polygon && fillOn && pattern !== 'solid' && !addCanvasPattern(layer, pattern, fillColor)) patternReady = false;
  });
  if (patternReady) document.getElementById('drawing-style-status').textContent = 'Estilo aplicado a ' + targets.length + ' entidad(es).';
}

styleToggle.addEventListener('click', function () { stylePanel.hidden = !stylePanel.hidden; styleToggle.setAttribute('aria-expanded', String(!stylePanel.hidden)); styleToggle.classList.toggle('active', !stylePanel.hidden); syncDrawingStylePanel(); });
document.getElementById('close-style-panel').addEventListener('click', function () { stylePanel.hidden = true; styleToggle.setAttribute('aria-expanded', 'false'); styleToggle.classList.remove('active'); });
styleTargetSelect.addEventListener('change', syncDrawingStylePanel);
['drawing-stroke-color','drawing-stroke-width','drawing-line-pattern','drawing-fill-enabled','drawing-fill-color','drawing-fill-opacity','drawing-fill-pattern','drawing-point-size'].forEach(function (id) {
  var input = document.getElementById(id);
  input.addEventListener('input', function () { document.getElementById('stroke-width-value').textContent = document.getElementById('drawing-stroke-width').value + ' px'; document.getElementById('fill-opacity-value').textContent = document.getElementById('drawing-fill-opacity').value + '%'; document.getElementById('point-size-value').textContent = document.getElementById('drawing-point-size').value + ' px'; applySelectedDrawingStyle(); });
  input.addEventListener('change', applySelectedDrawingStyle);
});

map.on(L.Draw.Event.CREATED, function (event) {
  var layer = event.layer;
  drawnItems.addLayer(layer);
  var drawingCount = document.getElementById('drawing-count');
  if (drawingCount) drawingCount.textContent = drawnItems.getLayers().length;

  if (layer instanceof L.Polygon) {
    layer.bindPopup('Polígono');
  } else if (layer instanceof L.CircleMarker || layer instanceof L.Marker) {
    layer.bindPopup('Punto');
  } else if (layer instanceof L.Polyline) {
    layer.bindPopup('Línea');
  }
  layer.on('click', function () { selectDrawing(layer); });
  selectDrawing(layer);
  stylePanel.hidden = false;
  styleToggle.setAttribute('aria-expanded', 'true');
  styleToggle.classList.add('active');
  syncDrawingStylePanel();

  Object.keys(drawHandlers).forEach(function (key) {
    if (drawHandlers[key] && drawHandlers[key].enabled()) {
      drawHandlers[key].disable();
    }
  });

  activeDrawTool = null;
  document.querySelectorAll('.draw-tool').forEach(function (tool) {
    tool.classList.remove('active');
  });
});

document.querySelectorAll('.draw-tool').forEach(function (button) {
  button.addEventListener('click', function () {
    var toolName = button.dataset.draw;
    Object.keys(drawHandlers).forEach(function (key) {
      if (drawHandlers[key] && drawHandlers[key].enabled()) {
        drawHandlers[key].disable();
      }
    });

    document.querySelectorAll('.draw-tool').forEach(function (tool) {
      tool.classList.remove('active');
    });

    if (activeDrawTool === toolName) {
      activeDrawTool = null;
      return;
    }

    if (drawHandlers[toolName]) {
      drawHandlers[toolName].enable();
      activeDrawTool = toolName;
      button.classList.add('active');
    }
  });
});

var measureControl = new L.Control.Measure({
  position: 'topleft',
  primaryLengthUnit: 'meters',
  secondaryLengthUnit: 'kilometers',
  primaryAreaUnit: 'sqmeters',
  secondaryAreaUnit: 'hectares',
  activeColor: '#c96e57',
  completedColor: '#5f1f2d'
});
measureControl.addTo(map);

// ---------- Divisor de mapas base (cortina) ----------
// Compara los mapas base con un divisor vertical u horizontal que se arrastra.
var splitButton = document.getElementById('split-toggle');
var splitUI = null;
var splitSavedBases = null;

function splitLayerContainer(layer) {
  return layer && typeof layer.getContainer === 'function' ? layer.getContainer() : null;
}

function updateSplitClip() {
  if (!splitUI) return;
  var size = map.getSize();
  var nw = map.containerPointToLayerPoint([0, 0]);
  var se = map.containerPointToLayerPoint(size);
  var left = splitLayerContainer(Esri_WorldImagery);
  var right = splitLayerContainer(Esri_WorldStreetMap);
  if (splitUI.orientation === 'vertical') {
    var x = Math.max(0, Math.min(size.x, splitUI.ratio * size.x));
    var clipX = nw.x + x;
    if (left) left.style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
    if (right) right.style.clip = 'rect(' + [nw.y, se.x, se.y, clipX].join('px,') + 'px)';
    splitUI.divider.style.left = x + 'px';
    splitUI.divider.style.top = '0';
    splitUI.divider.style.width = '4px';
    splitUI.divider.style.height = '100%';
    splitUI.handle.style.left = x + 'px';
    splitUI.handle.style.top = '50%';
    splitUI.handle.style.cursor = 'ew-resize';
    splitUI.handle.textContent = '◀ ▶';
    splitUI.handle.setAttribute('aria-orientation', 'vertical');
    splitUI.handle.setAttribute('aria-valuetext', Math.round(splitUI.ratio * 100) + '% desde la izquierda');
    splitUI.labelLeft.style.left = '';
    splitUI.labelLeft.style.top = '';
    splitUI.labelLeft.style.bottom = '64px';
    splitUI.labelLeft.style.right = (size.x - x + 12) + 'px';
    splitUI.labelRight.style.top = '';
    splitUI.labelRight.style.bottom = '64px';
    splitUI.labelRight.style.right = '';
    splitUI.labelRight.style.left = (x + 12) + 'px';
  } else {
    var y = Math.max(0, Math.min(size.y, splitUI.ratio * size.y));
    var clipY = nw.y + y;
    if (left) left.style.clip = 'rect(' + [nw.y, se.x, clipY, nw.x].join('px,') + 'px)';
    if (right) right.style.clip = 'rect(' + [clipY, se.x, se.y, nw.x].join('px,') + 'px)';
    splitUI.divider.style.left = '0';
    splitUI.divider.style.top = y + 'px';
    splitUI.divider.style.width = '100%';
    splitUI.divider.style.height = '4px';
    splitUI.handle.style.left = '50%';
    splitUI.handle.style.top = y + 'px';
    splitUI.handle.style.cursor = 'ns-resize';
    splitUI.handle.textContent = '▲ ▼';
    splitUI.handle.setAttribute('aria-orientation', 'horizontal');
    splitUI.handle.setAttribute('aria-valuetext', Math.round(splitUI.ratio * 100) + '% desde arriba');
    splitUI.labelLeft.style.left = '12px';
    splitUI.labelLeft.style.right = '';
    splitUI.labelLeft.style.top = '12px';
    splitUI.labelLeft.style.bottom = '';
    splitUI.labelRight.style.left = '12px';
    splitUI.labelRight.style.right = '';
    splitUI.labelRight.style.top = '';
    splitUI.labelRight.style.bottom = '64px';
  }
  splitUI.handle.setAttribute('aria-valuenow', String(Math.round(splitUI.ratio * 100)));
}

function onSplitLayerRemoved(event) {
  // Si la persona cambia de mapa base desde el panel de capas, el divisor se cierra solo.
  if (splitUI && (event.layer === Esri_WorldImagery || event.layer === Esri_WorldStreetMap)) closeSplit(false);
}

function openSplit() {
  splitSavedBases = { imagery: map.hasLayer(Esri_WorldImagery), street: map.hasLayer(Esri_WorldStreetMap) };
  if (!splitSavedBases.imagery) Esri_WorldImagery.addTo(map);
  if (!splitSavedBases.street) Esri_WorldStreetMap.addTo(map);

  var root = L.DomUtil.create('div', 'split-compare', map.getContainer());
  var divider = L.DomUtil.create('div', 'split-compare-divider', root);
  var labelLeft = L.DomUtil.create('span', 'split-compare-label', root);
  var labelRight = L.DomUtil.create('span', 'split-compare-label', root);
  var handle = L.DomUtil.create('div', 'split-compare-handle', root);
  var orientationToggle = L.DomUtil.create('button', 'split-compare-orientation', root);
  orientationToggle.type = 'button';
  labelLeft.textContent = 'Imágenes';
  labelRight.textContent = 'Calles';
  handle.textContent = '◀ ▶';
  handle.setAttribute('role', 'slider');
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('aria-label', 'Mover el divisor de mapas');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  splitUI = { root: root, divider: divider, handle: handle, labelLeft: labelLeft, labelRight: labelRight, orientationToggle: orientationToggle, orientation: 'vertical', ratio: 0.5 };

  function updateOrientationButton() {
    var nextOrientation = splitUI.orientation === 'vertical' ? 'horizontal' : 'vertical';
    orientationToggle.textContent = 'Orientación: ' + (splitUI.orientation === 'vertical' ? 'vertical' : 'horizontal');
    orientationToggle.title = 'Cambiar a orientación ' + nextOrientation;
    orientationToggle.setAttribute('aria-label', 'Cambiar divisor a orientación ' + nextOrientation);
  }
  updateOrientationButton();
  orientationToggle.addEventListener('click', function () {
    splitUI.orientation = splitUI.orientation === 'vertical' ? 'horizontal' : 'vertical';
    updateOrientationButton();
    updateSplitClip();
  });
  L.DomEvent.disableClickPropagation(orientationToggle);
  L.DomEvent.disableScrollPropagation(orientationToggle);

  var dragging = false;
  function moveTo(clientX, clientY) {
    var rect = map.getContainer().getBoundingClientRect();
    var position = splitUI.orientation === 'vertical'
      ? (clientX - rect.left) / rect.width
      : (clientY - rect.top) / rect.height;
    splitUI.ratio = Math.max(0, Math.min(1, position));
    updateSplitClip();
  }
  handle.addEventListener('pointerdown', function (event) {
    event.preventDefault();
    dragging = true;
    if (handle.setPointerCapture) handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', function (event) { if (dragging) moveTo(event.clientX, event.clientY); });
  function stopDrag() { dragging = false; }
  handle.addEventListener('pointerup', stopDrag);
  handle.addEventListener('pointercancel', stopDrag);
  handle.addEventListener('lostpointercapture', stopDrag);
  handle.addEventListener('keydown', function (event) {
    var step = event.shiftKey ? 0.1 : 0.02;
    if (splitUI.orientation === 'vertical' && event.key === 'ArrowLeft') splitUI.ratio = Math.max(0, splitUI.ratio - step);
    else if (splitUI.orientation === 'vertical' && event.key === 'ArrowRight') splitUI.ratio = Math.min(1, splitUI.ratio + step);
    else if (splitUI.orientation === 'horizontal' && event.key === 'ArrowUp') splitUI.ratio = Math.max(0, splitUI.ratio - step);
    else if (splitUI.orientation === 'horizontal' && event.key === 'ArrowDown') splitUI.ratio = Math.min(1, splitUI.ratio + step);
    else if (event.key === 'Home') splitUI.ratio = 0;
    else if (event.key === 'End') splitUI.ratio = 1;
    else return;
    event.preventDefault();
    updateSplitClip();
  });
  L.DomEvent.disableClickPropagation(handle);
  L.DomEvent.disableScrollPropagation(handle);

  map.on('move zoom zoomend moveend resize viewreset layeradd', updateSplitClip);
  map.on('layerremove', onSplitLayerRemoved);
  updateSplitClip();
  splitButton.classList.add('active');
  splitButton.setAttribute('aria-pressed', 'true');
  var toolStatus = document.getElementById('tool-status');
  if (toolStatus) toolStatus.textContent = 'Divisor activo: cambia su orientación con el botón del mapa y arrastra la barra para comparar los mapas base.';
}

function closeSplit(restoreBases) {
  if (!splitUI) return;
  map.off('move zoom zoomend moveend resize viewreset layeradd', updateSplitClip);
  map.off('layerremove', onSplitLayerRemoved);
  [Esri_WorldImagery, Esri_WorldStreetMap].forEach(function (layer) {
    var container = splitLayerContainer(layer);
    if (container) container.style.clip = '';
  });
  L.DomUtil.remove(splitUI.root);
  splitUI = null;
  splitButton.classList.remove('active');
  splitButton.setAttribute('aria-pressed', 'false');
  if (restoreBases && splitSavedBases) {
    if (!splitSavedBases.street && map.hasLayer(Esri_WorldStreetMap)) map.removeLayer(Esri_WorldStreetMap);
    if (!splitSavedBases.imagery && map.hasLayer(Esri_WorldImagery)) map.removeLayer(Esri_WorldImagery);
  }
  splitSavedBases = null;
  var toolStatus = document.getElementById('tool-status');
  if (toolStatus) toolStatus.textContent = 'Divisor cerrado.';
}

if (splitButton) {
  splitButton.setAttribute('aria-pressed', 'false');
  splitButton.addEventListener('click', function () {
    try {
      if (splitUI) closeSplit(true); else openSplit();
    } catch (error) {
      console.error('Error en el divisor:', error);
      try { closeSplit(true); } catch (ignored) {}
    }
  });
}

// ---------- Limpiar ----------
// Quita todo lo que la persona agregó al mapa: dibujos, mediciones, resultados de
// buffer/intersección, selecciones de la tabla y cambios de color/clasificación.
function clearMeasurements() {
  try {
    if (measureControl._measuring && typeof measureControl._toggleMeasure === 'function') measureControl._toggleMeasure();
    var group = measureControl._layer;
    if (group && typeof group.eachLayer === 'function') {
      var keep = measureControl._layerPaint;
      group.eachLayer(function (child) { if (child !== keep) group.removeLayer(child); });
    }
  } catch (error) {
    console.warn('No se pudieron limpiar las mediciones:', error);
  }
}

function updateDrawingCount() {
  var drawingCount = document.getElementById('drawing-count');
  if (drawingCount) drawingCount.textContent = String(drawnItems.getLayers().length);
}

var clearDrawingsButton = document.getElementById('clear-drawings');
if (clearDrawingsButton) {
  clearDrawingsButton.addEventListener('click', function () {
    // 1. Cancelar la herramienta de dibujo que esté activa
    Object.keys(drawHandlers).forEach(function (key) {
      if (drawHandlers[key] && drawHandlers[key].enabled()) drawHandlers[key].disable();
    });
    activeDrawTool = null;
    document.querySelectorAll('.draw-tool').forEach(function (tool) { tool.classList.remove('active'); });
    // 2. Borrar todos los dibujos
    drawnItems.clearLayers();
    selectedDrawing = null;
    // 3. Borrar las mediciones
    clearMeasurements();
    // 4. Quitar selección de la tabla, resultados del análisis y estilos cambiados
    map.fire('geovisor:clear-selection');
    map.fire('geovisor:clear-analysis');
    map.closePopup();
    // 5. Dejar los paneles en su estado inicial
    styleTargetSelect.value = 'drawing';
    syncDrawingStylePanel();
    document.getElementById('style-feature-name').textContent = 'Selecciona un dibujo';
    document.getElementById('drawing-style-status').textContent = 'Dibuja o haz clic en un elemento para cambiar su estilo.';
    updateDrawingCount();
  });
}

// Borra solo el dibujo seleccionado (botón dentro del panel "Estilo dibujo").
var deleteDrawingButton = document.getElementById('delete-selected-drawing');
if (deleteDrawingButton) {
  deleteDrawingButton.addEventListener('click', function () {
    var status = document.getElementById('drawing-style-status');
    if (selectedDrawing && drawnItems.hasLayer(selectedDrawing)) {
      drawnItems.removeLayer(selectedDrawing);
      selectedDrawing = null;
      styleTargetSelect.value = 'drawing';
      syncDrawingStylePanel();
      document.getElementById('style-feature-name').textContent = 'Selecciona un dibujo';
      status.textContent = 'Dibujo eliminado.';
      updateDrawingCount();
    } else {
      status.textContent = 'Haz clic en un dibujo para seleccionarlo y luego elimínalo.';
    }
  });
}

cargarCapasJuanMina();

window.addEventListener('load', function () {
  if (window.innerWidth <= 720) {
    map.setView([10.9594, -74.8897], 14);
  }
});

// Herramientas vectoriales y navegación del geovisor.
(function () {
  var selector = document.getElementById('vector-layer');
  var overlaySelector = document.getElementById('overlay-layer');
  var status = document.getElementById('tool-status');
  var selected = [];
  var vectorEntries = [];
  var layerSignature = '';
  var resultLayers = L.featureGroup().addTo(map);
  var resultNames = [];
  var table = document.getElementById('attribute-table');
  function say(message) { if (status) status.textContent = message; }
  function collectFeatures(layer, into) {
    if (!layer) return;
    if (layer instanceof L.GeoJSON) { layer.eachLayer(function (child) { collectFeatures(child, into); }); return; }
    if (layer instanceof L.FeatureGroup || layer instanceof L.LayerGroup) { layer.eachLayer(function (child) { collectFeatures(child, into); }); return; }
    if (layer.feature && layer.toGeoJSON) into.push(layer);
  }
  function refreshLayers() {
    var previous = selector.value;
    vectorEntries = [];
    Object.keys(overlayLayers).forEach(function (name) {
      var features = []; collectFeatures(overlayLayers[name], features);
      if (features.length) vectorEntries.push({ name: name, layer: overlayLayers[name], features: features });
    });
    var signature = vectorEntries.map(function (entry) { return entry.name + ':' + entry.features.length; }).join('|');
    if (signature === layerSignature) return;
    layerSignature = signature;
    selector.innerHTML = '<option value="">Selecciona capa vectorial</option>';
    vectorEntries.forEach(function (entry, index) {
      var option = document.createElement('option'); option.value = String(index); option.textContent = entry.name; selector.appendChild(option);
    });
    overlaySelector.innerHTML = '<option value="">Misma capa</option>';
    vectorEntries.forEach(function (entry, index) { var option = document.createElement('option'); option.value = String(index); option.textContent = entry.name; overlaySelector.appendChild(option); });
    if (previous && Number(previous) < vectorEntries.length) selector.value = previous;
    else if (vectorEntries.length) selector.value = '0';
    updateFields();
  }
  function current() { return selector.value === '' ? null : vectorEntries[Number(selector.value)]; }
  function updateFields() {
    var entry = current(); var fields = document.getElementById('attribute-field'); var classes = document.getElementById('class-field');
    fields.innerHTML = ''; classes.innerHTML = '<option value="">Sin clasificación</option>';
    if (!entry || !entry.features.length) return;
    fields.innerHTML = '<option value="">Selecciona campo</option>';
    var keys = Array.from(new Set(entry.features.reduce(function (all, feature) { return all.concat(Object.keys(feature.feature.properties || {})); }, [])));
    keys.forEach(function (key) { [fields, classes].forEach(function (select) { var option = document.createElement('option'); option.value = key; option.textContent = key; select.appendChild(option); }); });
    say(entry.features.length + ' elementos vectoriales disponibles.');
    if (!table.hidden) renderTable();
  }
  selector.addEventListener('change', function () { clearAttributeSelection(); updateFields(); });
  map.on('layeradd layerremove', function () { window.setTimeout(refreshLayers, 250); });
  window.setInterval(refreshLayers, 1800);
  function restoreStyles(entry) {
    var base = entry.layer;
    if (base && base._tipo && typeof base.setStyle === 'function') {
      base.setStyle(function (feature) { return estiloShapefile(base._tipo, feature); });
      return;
    }
    entry.features.forEach(function (feature) { if (feature.setStyle) feature.setStyle({ color: '#5a1f2d', weight: 2, fillColor: '#c96e57', fillOpacity: .28, opacity: .9 }); });
  }
  function clearAttributeSelection() {
    selected.forEach(function (feature) {
      if (feature.setStyle && feature._selectionBaseStyle) feature.setStyle(feature._selectionBaseStyle);
      delete feature._selectionBaseStyle;
    });
    selected = [];
    renderTable();
  }
  map.on('geovisor:clear-selection', clearAttributeSelection);
  map.on('geovisor:clear-analysis', function () {
    var removed = resultNames.length;
    resultNames.forEach(function (name) {
      var layer = overlayLayers[name];
      if (layer) { layerControl.removeLayer(layer); if (map.hasLayer(layer)) map.removeLayer(layer); }
      delete overlayLayers[name];
    });
    resultLayers.getLayers().slice().forEach(function (layer) {
      if (!layer._geovisorBuffer) return;
      layerControl.removeLayer(layer);
      if (map.hasLayer(layer)) map.removeLayer(layer);
      resultLayers.removeLayer(layer);
    });
    resultNames = [];
    activeBufferName = null;
    activeBufferLayer = null;
    document.getElementById('delete-buffer').disabled = true;
    resultLayers.clearLayers();
    Object.keys(overlayLayers).forEach(function (name) {
      var layer = overlayLayers[name];
      if (layer && layer._tipo && typeof layer.setStyle === 'function') layer.setStyle(function (feature) { return estiloShapefile(layer._tipo, feature); });
    });
    document.getElementById('class-field').value = '';
    document.getElementById('layer-color').value = '#c96e57';
    document.getElementById('layer-opacity').value = '55';
    document.getElementById('opacity-value').textContent = '55%';
    refreshDrawingStyleTargets();
    refreshLayers();
    say(removed ? 'Mapa limpio: se quitaron los resultados del análisis y los dibujos.' : 'Mapa limpio.');
  });
  function highlightSelection(features) {
    clearAttributeSelection();
    selected = features.slice();
    selected.forEach(function (feature) {
      if (!feature.setStyle) return;
      feature._selectionBaseStyle = { color: feature.options.color, weight: feature.options.weight, opacity: feature.options.opacity, fillColor: feature.options.fillColor, fillOpacity: feature.options.fillOpacity, fill: feature.options.fill, dashArray: feature.options.dashArray };
      feature.setStyle({ color: '#00e5ff', weight: Math.max(Number(feature.options.weight) || 1, 3), opacity: 1 });
    });
    renderTable();
  }
  document.getElementById('layer-color').addEventListener('input', function (event) {
    var entry = current(); if (entry) entry.features.forEach(function (feature) { if (feature.setStyle) feature.setStyle({ color: event.target.value, fillColor: event.target.value }); });
  });
  document.getElementById('layer-opacity').addEventListener('input', function (event) {
    var opacity = Number(event.target.value) / 100; document.getElementById('opacity-value').textContent = event.target.value + '%';
    var entry = current(); if (entry) entry.features.forEach(function (feature) { if (feature.setStyle) feature.setStyle({ fillOpacity: opacity, opacity: Math.max(.25, opacity) }); });
  });
  document.getElementById('class-field').addEventListener('change', function (event) {
    var entry = current(); if (!entry || !event.target.value) { if (entry) restoreStyles(entry); return; }
    var values = Array.from(new Set(entry.features.map(function (f) { return String((f.feature.properties || {})[event.target.value]); })));
    var colors = ['#386641','#6a994e','#a7c957','#f2e8cf','#bc4749','#577590','#f3722c','#9b5de5'];
    entry.features.forEach(function (feature) { var value = String((feature.feature.properties || {})[event.target.value]); var color = colors[values.indexOf(value) % colors.length]; if (feature.setStyle) feature.setStyle({ color: color, fillColor: color, fillOpacity: Number(document.getElementById('layer-opacity').value)/100 }); });
    say('Clasificación única aplicada: ' + values.length + ' categorías.');
  });
  document.getElementById('select-attribute').addEventListener('click', function () {
    var entry = current(); var field = document.getElementById('attribute-field').value; var query = document.getElementById('attribute-query').value.trim().toLowerCase();
    if (!entry || !field || !query) { say('Selecciona una capa, un campo y un valor para buscar.'); return; }
    var exact = document.getElementById('attribute-match').value === 'equals';
    var matches = entry.features.filter(function (feature) {
      var value = String((feature.feature.properties || {})[field] == null ? '' : (feature.feature.properties || {})[field]).toLowerCase();
      return exact ? value === query : value.includes(query);
    });
    highlightSelection(matches);
    say(selected.length + ' elemento(s) seleccionado(s).');
  });
  document.getElementById('clear-selection').addEventListener('click', function () { clearAttributeSelection(); say('Selección de atributos quitada.'); });
  document.getElementById('zoom-selection').addEventListener('click', function () { var bounds = L.featureGroup(selected).getBounds(); if (bounds.isValid()) map.fitBounds(bounds, { padding: [30, 30] }); else say('No hay elementos seleccionados.'); });
  var activeBufferName = null;
  var activeBufferLayer = null;
  function removeActiveBuffer() {
    if (!activeBufferName && !activeBufferLayer) return false;
    var oldBuffer = activeBufferLayer || overlayLayers[activeBufferName];
    if (oldBuffer) {
      if (map.hasLayer(oldBuffer)) map.removeLayer(oldBuffer);
      layerControl.removeLayer(oldBuffer);
      resultLayers.removeLayer(oldBuffer);
    }
    if (activeBufferName) {
      delete overlayLayers[activeBufferName];
      resultNames = resultNames.filter(function (name) { return name !== activeBufferName; });
    }
    activeBufferName = null;
    activeBufferLayer = null;
    document.getElementById('delete-buffer').disabled = true;
    refreshDrawingStyleTargets();
    layerSignature = '';
    refreshLayers();
    return true;
  }
  function addGeoJSON(geojson, name) { var result = L.geoJSON(geojson, { style: { color: '#00d1b2', weight: 2, fillColor: '#00d1b2', fillOpacity: .3 }, pointToLayer: function (feature, latlng) { return L.circleMarker(latlng, { radius: 6, color: '#00d1b2', weight: 2, fillColor: '#00d1b2', fillOpacity: .3 }); }, onEachFeature: mostrarAtributos }); resultLayers.addLayer(result); var overlayName = name + ' (' + (resultLayers.getLayers().length) + ')'; overlayLayers[overlayName] = result; resultNames.push(overlayName); layerControl.addOverlay(result, overlayName); refreshDrawingStyleTargets(); say(name + ' agregado al mapa.'); return overlayName; }
  document.getElementById('delete-buffer').addEventListener('click', function () {
    if (removeActiveBuffer()) say('Buffer eliminado. Puedes crear uno nuevo.');
  });
  document.getElementById('make-buffer').addEventListener('click', function () {
    var entry = current(); var distance = Number(document.getElementById('buffer-distance').value);
    if (!entry || !window.turf || !(distance > 0)) { say('Selecciona una capa y una distancia válida.'); return; }
    try { var features = entry.features.map(function (f) { return f.toGeoJSON(); }); var collection = turf.featureCollection(features); var buffered = turf.buffer(collection, distance, { units: 'meters' }); if (!buffered) throw new Error('No se obtuvo geometría para esta distancia.'); removeActiveBuffer(); activeBufferName = addGeoJSON(buffered, 'Buffer ' + distance + ' m'); activeBufferLayer = overlayLayers[activeBufferName]; activeBufferLayer._geovisorBuffer = true; document.getElementById('delete-buffer').disabled = false; } catch (error) { say('No se pudo crear el buffer: ' + error.message); }
  });
  document.getElementById('overlay-intersection').addEventListener('click', function () {
    var entry = current(); var second = overlaySelector.value === '' ? entry : vectorEntries[Number(overlaySelector.value)];
    if (!entry || !second || !window.turf || (entry === second && entry.features.length < 2)) { say('Selecciona dos capas o al menos dos elementos para intersectar.'); return; }
    try { var result = []; var features = entry.features.map(function (f) { return f.toGeoJSON(); }); var otherFeatures = second.features.map(function (f) { return f.toGeoJSON(); });
      for (var i = 0; i < features.length; i++) for (var j = 0; j < otherFeatures.length; j++) { if (entry === second && j <= i) continue; var overlap = turf.intersect(features[i], otherFeatures[j]); if (overlap) result.push(overlap); }
      if (result.length) addGeoJSON(turf.featureCollection(result), 'Intersección'); else say('No se encontraron áreas de intersección entre los elementos.');
    } catch (error) { say('Intersección: ' + error.message); }
  });
document.getElementById('attributes-toggle').addEventListener('click', function () {
    if (!current() && vectorEntries.length) { selector.value = '0'; updateFields(); }
    var entry = current(); if (!entry) { say('No hay capas vectoriales con atributos cargadas.'); return; }
    if (!table.hidden) { table.hidden = true; document.getElementById('attributes-toggle').setAttribute('aria-expanded', 'false'); return; }
    table.hidden = false; document.getElementById('attributes-toggle').setAttribute('aria-expanded', 'true'); renderTable();
  });
  document.getElementById('close-attribute-table').addEventListener('click', function () { table.hidden = true; document.getElementById('attributes-toggle').setAttribute('aria-expanded', 'false'); });
  function renderTable() {
    var grid = document.getElementById('attribute-grid'); var entry = current();
    if (!grid || !entry) { if (grid) grid.innerHTML = '<p>No hay capa seleccionada.</p>'; return; }
    var features = entry.features.slice(0, 500);
    var keys = Array.from(new Set(features.reduce(function (all, feature) { return all.concat(Object.keys(feature.feature.properties || {})); }, [])));
    grid.innerHTML = '<table><thead><tr><th>Sel.</th><th>#</th>' + keys.map(function (key) { return '<th>' + escapeHTML(key) + '</th>'; }).join('') + '</tr></thead><tbody>' + features.map(function (feature, index) {
      var row = feature.feature.properties || {};
      return '<tr class="' + (selected.indexOf(feature) >= 0 ? 'is-selected' : '') + '"><td><input type="checkbox" data-feature-index="' + index + '" aria-label="Seleccionar registro ' + (index + 1) + '" ' + (selected.indexOf(feature) >= 0 ? 'checked' : '') + '></td><th>' + (index + 1) + '</th>' + keys.map(function (key) { return '<td>' + escapeHTML(row[key] == null ? '' : row[key]) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table>' + (entry.features.length > features.length ? '<small>Mostrando ' + features.length + ' de ' + entry.features.length + ' registros.</small>' : '');
    grid.querySelectorAll('input[data-feature-index]').forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        var feature = entry.features[Number(checkbox.dataset.featureIndex)];
        var next = selected.filter(function (item) { return item !== feature; });
        if (checkbox.checked) next.push(feature);
        highlightSelection(next);
        say(selected.length + ' elemento(s) seleccionado(s).');
      });
    });
  }
  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, function (c) { return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]; }); }
  var exportPanel = document.getElementById('map-export-panel');
  var exportButton = document.getElementById('save-map');
  var exportWidth = document.getElementById('export-width');
  var exportHeight = document.getElementById('export-height');
  var exportDimensions = document.getElementById('export-dimensions');
  var exportFormat = document.getElementById('export-format');
  var exportQualityRow = document.getElementById('export-quality-row');
  var exportTitleEnabled = document.getElementById('export-title-enabled');
  var exportTitleRow = document.getElementById('export-title-row');
  function updateExportOptions() {
    var size = map.getSize();
    if (!exportWidth.value) exportWidth.value = Math.round(size.x * 2);
    if (!exportHeight.value) exportHeight.value = Math.round(size.y * 2);
    exportDimensions.textContent = 'Tamaño de salida: ' + (Number(exportWidth.value) || 0) + ' × ' + (Number(exportHeight.value) || 0) + ' px.';
    exportQualityRow.hidden = exportFormat.value !== 'jpeg';
    exportTitleRow.hidden = !exportTitleEnabled.checked;
  }
  exportButton.addEventListener('click', function () {
    exportPanel.hidden = !exportPanel.hidden;
    exportButton.setAttribute('aria-expanded', String(!exportPanel.hidden));
    updateExportOptions();
  });
  document.getElementById('close-export-panel').addEventListener('click', function () { exportPanel.hidden = true; exportButton.setAttribute('aria-expanded', 'false'); });
  exportWidth.addEventListener('input', updateExportOptions);
  exportHeight.addEventListener('input', updateExportOptions);
  exportFormat.addEventListener('change', updateExportOptions);
  exportTitleEnabled.addEventListener('change', updateExportOptions);
  document.getElementById('export-quality').addEventListener('input', function (event) { document.getElementById('export-quality-value').textContent = event.target.value + '%'; });
  map.on('resize', updateExportOptions);
  document.getElementById('export-image').addEventListener('click', function () {
    var status = document.getElementById('export-status');
    var downloadButton = document.getElementById('export-image');
    if (!window.leafletImage) { status.textContent = 'No se cargó la herramienta de captura. Comprueba la conexión y vuelve a abrir la página.'; return; }
    downloadButton.disabled = true;
    status.textContent = 'Capturando la vista actual del mapa…';
    try {
      window.leafletImage(map, function (error, sourceCanvas) {
        if (error || !sourceCanvas) {
          status.textContent = 'No se pudo capturar el mapa. Revisa la conexión de los mapas base y vuelve a intentar.';
          downloadButton.disabled = false;
          return;
        }
        try {
          var outputWidth = Number(exportWidth.value);
          var outputHeight = Number(exportHeight.value);
          if (!Number.isInteger(outputWidth) || !Number.isInteger(outputHeight) || outputWidth < 100 || outputHeight < 100 || outputWidth > 12000 || outputHeight > 12000) throw new Error('El ancho y el alto deben estar entre 100 y 12.000 píxeles.');
          var scale = outputWidth / sourceCanvas.width;
          var outputCanvas = document.createElement('canvas');
          outputCanvas.width = outputWidth;
          outputCanvas.height = outputHeight;
          if (outputCanvas.width * outputCanvas.height > 50000000) throw new Error('La resolución seleccionada es demasiado grande. Elige una escala menor.');
          var context = outputCanvas.getContext('2d');
          var isJpeg = exportFormat.value === 'jpeg';
          if (isJpeg) { context.fillStyle = '#ffffff'; context.fillRect(0, 0, outputCanvas.width, outputCanvas.height); }
          context.drawImage(sourceCanvas, 0, 0, outputCanvas.width, outputCanvas.height);
          if (exportTitleEnabled.checked) {
            var title = document.getElementById('export-title').value.trim() || 'GeoVisor Juan Mina';
            var pad = 14 * scale; var fontSize = 18 * scale; var boxHeight = 42 * scale;
            context.font = '600 ' + fontSize + 'px Segoe UI, sans-serif';
            var boxWidth = Math.min(outputCanvas.width - pad * 2, context.measureText(title).width + pad * 2);
            context.fillStyle = 'rgba(45,15,29,.88)'; context.fillRect(pad, pad, boxWidth, boxHeight);
            context.fillStyle = '#fffaf5'; context.textBaseline = 'middle'; context.fillText(title, pad * 2, pad + boxHeight / 2, boxWidth - pad * 2);
          }
          var mime = isJpeg ? 'image/jpeg' : 'image/png';
          var quality = Number(document.getElementById('export-quality').value) / 100;
          var dataUrl = outputCanvas.toDataURL(mime, quality);
          var filename = document.getElementById('export-filename').value.trim().replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, '-') || 'geovisor-juan-mina';
          var link = document.createElement('a'); link.download = filename + (isJpeg ? '.jpg' : '.png'); link.href = dataUrl; link.click();
          status.textContent = 'Imagen descargada: ' + outputCanvas.width + ' × ' + outputCanvas.height + ' px.';
          say('Imagen del mapa descargada correctamente.');
        } catch (exportError) {
          status.textContent = exportError.message.indexOf('tainted') >= 0 || exportError.name === 'SecurityError' ? 'El navegador bloqueó la exportación por permisos de origen de alguna capa.' : 'No se pudo crear la imagen: ' + exportError.message;
        }
        downloadButton.disabled = false;
      });
    } catch (error) {
      status.textContent = 'Error al preparar la imagen: ' + error.message;
      downloadButton.disabled = false;
    }
  });
  updateExportOptions();
  var compass = L.control({ position: 'topright' });
  compass.onAdd = function () {
    var root = L.DomUtil.create('div', 'earth-navigation-control');
    root.setAttribute('role', 'group'); root.setAttribute('aria-label', 'Orientación y desplazamiento del mapa');
    root.innerHTML = '<div class="earth-compass"><button class="compass-n" type="button" aria-label="Mover al norte" title="Norte"><span class="direction-arrow">▲</span>N</button><button class="compass-s" type="button" aria-label="Mover al sur" title="Sur"><span class="direction-arrow">▼</span>S</button><button class="compass-w" type="button" aria-label="Mover al oeste" title="Oeste"><span class="direction-arrow">◀</span>O</button><button class="compass-e" type="button" aria-label="Mover al este" title="Este"><span class="direction-arrow">▶</span>E</button><button class="compass-center" type="button" aria-label="Volver al centro del mapa" title="Volver a Juan Mina"><span aria-hidden="true">✥</span></button></div><div class="compass-zoom" aria-label="Zoom del mapa"><button class="compass-zoom-in" type="button" aria-label="Acercar mapa" title="Acercar">+</button><input class="compass-zoom-slider" type="range" min="3" max="18" step="1" value="14" aria-label="Nivel de zoom" title="Arrastra para cambiar el zoom"><button class="compass-zoom-out" type="button" aria-label="Alejar mapa" title="Alejar">−</button><output class="compass-zoom-value" aria-live="polite">14</output></div>';
    L.DomEvent.disableClickPropagation(root); L.DomEvent.disableScrollPropagation(root);
    bindPanButton(root.querySelector('.compass-n'), 0, 1);
    bindPanButton(root.querySelector('.compass-s'), 0, -1);
    bindPanButton(root.querySelector('.compass-e'), 1, 0);
    bindPanButton(root.querySelector('.compass-w'), -1, 0);
    root.querySelector('.compass-center').addEventListener('click', function () { map.setView([10.9594, -74.8897], 14); });
    var zoomSlider = root.querySelector('.compass-zoom-slider');
    var zoomValue = root.querySelector('.compass-zoom-value');
    function syncZoomSlider() { zoomSlider.value = map.getZoom(); zoomValue.textContent = map.getZoom(); }
    root.querySelector('.compass-zoom-in').addEventListener('click', function () { map.zoomIn(); });
    root.querySelector('.compass-zoom-out').addEventListener('click', function () { map.zoomOut(); });
    zoomSlider.addEventListener('input', function () { map.setZoom(Number(zoomSlider.value)); zoomValue.textContent = zoomSlider.value; });
    map.on('zoomend', syncZoomSlider);
    syncZoomSlider();
    return root;
  };
  function moveMap(dx, dy) { map.panBy([dx * 36, -dy * 36], { animate: false }); }
  function bindPanButton(button, dx, dy) {
    var holdDelay = null; var repeatPan = null;
    function stopPan() { window.clearTimeout(holdDelay); window.clearInterval(repeatPan); holdDelay = null; repeatPan = null; }
    button.addEventListener('pointerdown', function (event) {
      event.preventDefault();
      moveMap(dx, dy);
      if (button.setPointerCapture) button.setPointerCapture(event.pointerId);
      holdDelay = window.setTimeout(function () { repeatPan = window.setInterval(function () { moveMap(dx, dy); }, 130); }, 320);
    });
    button.addEventListener('pointerup', stopPan);
    button.addEventListener('pointercancel', stopPan);
    button.addEventListener('lostpointercapture', stopPan);
    button.addEventListener('click', function (event) { if (event.detail === 0) moveMap(dx, dy); });
    window.addEventListener('blur', stopPan);
  }
  compass.addTo(map);
  var coords = L.control({ position: 'bottomright' }); coords.onAdd = function () { this.node = L.DomUtil.create('div', 'coordinate-readout'); this.node.textContent = 'Lat: — · Lon: —'; return this.node; }; coords.addTo(map);
  map.on('mousemove', function (event) { coords.node.textContent = 'Lat: ' + event.latlng.lat.toFixed(6) + ' · Lon: ' + event.latlng.lng.toFixed(6); });
  window.setTimeout(refreshLayers, 600);
})();
