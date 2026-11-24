// Textos editables de la sección "Quiénes somos"
const empresa = {
  eslogan: 'Tu proyecto, nuestro compromiso.',
  mision: 'Ofrecer soluciones integrales en renta y venta de maquinaria y equipo, así como servicios de construcción, con calidad, confianza, eficiencia y respaldo especializado.',
  vision: 'Ser referentes en México en soluciones para la construcción y minería, innovando mediante tecnología e inteligencia artificial para brindar un servicio eficiente, confiable y de calidad.'
};

// ===== Secciones plegables (acordeón) =====
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function configurarAcordeon(idSeccion) {
  const seccion = document.getElementById(idSeccion);
  if (!seccion) return null;

  const boton = seccion.querySelector('.acordeon-titulo');
  const contenidoSeccion = seccion.querySelector('.acordeon-contenido');
  if (!boton || !contenidoSeccion) return null;

  const contador = boton.querySelector('.acordeon-contador');
  if (contador) {
    const total = seccion.querySelectorAll('.grid-tarjetas .tarjeta').length;
    contador.textContent = '(' + total + ')';
  }

  function abrir() {
    if (boton.getAttribute('aria-expanded') === 'true') return;
    boton.setAttribute('aria-expanded', 'true');
    contenidoSeccion.removeAttribute('inert');
    if (reducirMovimiento) {
      contenidoSeccion.style.height = 'auto';
    } else {
      contenidoSeccion.style.height = contenidoSeccion.scrollHeight + 'px';
    }
  }

  function cerrar() {
    if (boton.getAttribute('aria-expanded') === 'false') return;
    boton.setAttribute('aria-expanded', 'false');
    const alto = contenidoSeccion.scrollHeight + 'px';
    contenidoSeccion.setAttribute('inert', '');
    contenidoSeccion.style.height = alto;
    void contenidoSeccion.offsetHeight; // fuerza el reflow para poder animar
    contenidoSeccion.style.height = '0px';
  }

  boton.addEventListener('click', () => {
    if (boton.getAttribute('aria-expanded') === 'true') cerrar();
    else abrir();
  });

  contenidoSeccion.addEventListener('transitionend', evento => {
    if (evento.propertyName === 'height' && boton.getAttribute('aria-expanded') === 'true') {
      contenidoSeccion.style.height = 'auto';
    }
  });

  return { abrir: abrir, cerrar: cerrar };
}

const acordeones = {
  equipos: configurarAcordeon('equipos'),
  equiposRenta: configurarAcordeon('equipos-renta')
};

// Abrir automáticamente si la URL llega con #equipos o #equipos-renta
function abrirSeccionPorHash() {
  const hash = window.location.hash;
  if (hash === '#equipos' && acordeones.equipos) {
    acordeones.equipos.abrir();
  } else if (hash === '#equipos-renta' && acordeones.equiposRenta) {
    acordeones.equiposRenta.abrir();
  }
}
abrirSeccionPorHash();
window.addEventListener('hashchange', abrirSeccionPorHash);

// Scroll suave para los enlaces del menú
document.querySelectorAll('.menu a, .btn-cotizar-portada').forEach(enlace => {
  enlace.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    // El menú "Equipos" abre las dos secciones de equipo
    if (href === '#equipos') {
      if (acordeones.equipos) acordeones.equipos.abrir();
      if (acordeones.equiposRenta) acordeones.equiposRenta.abrir();
    } else if (href === '#equipos-renta' && acordeones.equiposRenta) {
      acordeones.equiposRenta.abrir();
    }
    const objetivo = document.querySelector(href);
    if (objetivo) {
      objetivo.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.getElementById('anio').textContent = new Date().getFullYear();

// ===== Equipos y modales =====

const TELEFONO_WHATSAPP = '526626677503';

const equipos = [
  {
    id: 'bailarina',
    nombre: 'Bailarina',
    categoria: 'renta-venta',
    modelo: 'Jaguar MR75R',
    descripcion: 'Ideal para relleno y compactación de zanjas estrechas, instalación de drenajes, preparación del terreno antes de colar concreto, bacheo y nivelación de pequeños tramos.',
    especificaciones: ['Motor Robin', 'Peso: 75 kg'],
    precioDiario: 600,
    precioSemanal: 3500,
    precioMensual: 13500
  },
  {
    id: 'rotomartillo',
    nombre: 'Rotomartillo 12 kg',
    categoria: 'renta-venta',
    modelo: 'Milwaukee 5337-21',
    descripcion: 'Ideal para demolición de concreto y asfalto, perforaciones de gran diámetro, ranurado y canalización.',
    especificaciones: ['Punta SDS Max', 'Peso: 12 kg'],
    precioDiario: 400,
    precioSemanal: 2500,
    precioMensual: 9000
  },
  {
    id: 'cortadora',
    nombre: 'Cortadora de concreto',
    categoria: 'renta-venta',
    modelo: 'CCT12',
    descripcion: 'Ideal para cortes de juntas de expansión, corte de concreto verde y curado, mantenimiento de autopistas y apertura de zanjas o canales rectos.',
    especificaciones: ['Motor Mpower 13 HP', 'Disco de 20 pulgadas', 'Profundidad de corte: 17 mm', 'Peso: 88 kg'],
    precioDiario: 600,
    precioSemanal: 3500,
    precioMensual: 13500
  },
  {
    id: 'demoledor-30',
    nombre: 'Demoledor 30 kg',
    categoria: 'renta-venta',
    modelo: 'DeWalt D25980-B3',
    descripcion: 'Ideal para romper losas de concreto grueso, cimentaciones, zapatas, pisos industriales y estructuras macizas de hormigón armado. También para eliminar grandes volúmenes de mampostería, piedra y estructuras sólidas en obra civil de gran escala.',
    especificaciones: ['Peso: 30 kg'],
    precioDiario: 600,
    precioSemanal: 3500,
    precioMensual: 13500
  },
  {
    id: 'demoledor-15',
    nombre: 'Demoledor 15 kg',
    categoria: 'renta-venta',
    modelo: 'DeWalt D25960K',
    descripcion: 'Ideal para demolición de pisos, caminos, pavimentos y bases de hormigón y concreto, en construcción, obra vial y grandes proyectos, excavación y mantenimiento de rutas y caminos.',
    especificaciones: ['Peso: 18.4 kg'],
    precioDiario: 500,
    precioSemanal: 3000,
    precioMensual: 11500
  },
  {
    id: 'allanadora',
    nombre: 'Allanadora de concreto',
    categoria: 'renta-venta',
    modelo: 'Multiquip J36LE-SXH-CIP168F-2B',
    descripcion: 'Ideal para el alisado y acabado de losas de concreto.',
    especificaciones: ['Motor Mpower 6.5 HP', 'Diámetro: 90 cm', '4 aspas'],
    precioDiario: 600,
    precioSemanal: 3500,
    precioMensual: 13500
  },
  {
    id: 'retroexcavadora',
    nombre: 'Retroexcavadora',
    categoria: 'solo-renta',
    modelo: 'Case 580N 4x4',
    descripcion: 'Ideal para zanjeo, carga general, obras urbanas y movimiento de tierras ágil en espacios reducidos, con mayor tracción en terrenos difíciles.',
    especificaciones: ['Motor FPT turboalimentado de 4 cilindros', 'Potencia neta: aprox. 95 HP (71 kW)', 'Peso operativo: aprox. 7,800 a 8,200 kg (según contrapesos y cabina)', 'Tracción 4x4 con convertidor de par y transmisión Powershift', 'Profundidad máxima de excavación: aprox. 4.39 m (hasta 5.45 m con brazo extensible Extendahoe)', 'Cucharón frontal: aprox. 1.0 m³ / cucharón trasero: aprox. 0.20 m³']
  },
  {
    id: 'excavadora',
    nombre: 'Excavadora',
    categoria: 'solo-renta',
    modelo: 'Case CX220C (Serie C)',
    descripcion: 'Ideal para excavación de alta producción, carga de camiones de volteo, cimentaciones y minería de mediana escala.',
    especificaciones: ['Motor FPT Industrial de 6 cilindros, con turbocompresor e intercooler', 'Potencia neta: aprox. 158 HP (117 kW)', 'Peso operativo: aprox. 21,900 a 22,500 kg (configuración estándar)', 'Profundidad máxima de excavación: aprox. 6.65 m (pluma de 5.7 m y brazo de 2.94 m)', 'Capacidad del cucharón: aprox. 0.93 a 1.2 m³ (según ancho y tipo de material)', 'Sistema hidráulico inteligente (IHS) con modos Eco, Heavy y Automatic para optimizar el consumo de combustible']
  },
  {
    id: 'tractor-d6',
    nombre: 'Tractor D6',
    categoria: 'solo-renta',
    modelo: 'Caterpillar D6 (bulldozer)',
    descripcion: 'Ideal para movimiento masivo de tierras, desmonte, extensión de capas, corte de taludes y empuje pesado.',
    especificaciones: ['Motor Cat C9.3B', 'Potencia neta: aprox. 215 a 230 HP', 'Peso operativo: aprox. 21,500 a 23,200 kg', 'Hoja semi-universal (SU): aprox. 3.9 a 4.3 m³ / hoja angulable (A): aprox. 5.6 m³', 'Transmisión automática de 3 velocidades con convertidor de par', 'Ripper (escarificador) trasero']
  },
  {
    id: 'lowboy',
    nombre: 'Traslado en Lowboy 305',
    categoria: 'solo-renta',
    modelo: 'Semirremolque de cama baja de 70 toneladas',
    descripcion: 'Traslado seguro y legal de tractores de orugas grandes, excavadoras pesadas y equipo minero entre frentes de trabajo.',
    especificaciones: ['Capacidad de carga: 70 toneladas métricas (aprox. 154,000 lb)', 'Múltiples ejes (de 3 a 5 líneas, con dolly o jeep/stinger trasero) para cumplir con la distribución de peso por eje en carretera', 'Cuello de ganso desmontable (hidráulico o mecánico) para carga frontal segura de equipos sobre orugas o ruedas', 'Largueros de acero estructural de alta resistencia (T-1 / A514)']
  },
  {
    id: 'telehandler',
    nombre: 'Telehandler',
    categoria: 'solo-renta',
    modelo: 'JCB 507-42',
    descripcion: 'Ideal para elevación y traslado de materiales a grandes alturas, carga y descarga de camiones, abastecimiento de materiales en obra y trabajos de construcción, minería e industria.',
    especificaciones: [
      'Motor diésel JCB EcoMAX de 4 cilindros y 4.4 litros',
      'Potencia neta: aprox. 74 HP (55 kW)',
      'Capacidad máxima de carga: 3,175 kg (7,000 lb)',
      'Altura máxima de elevación: 12.8 m (42 pies)',
      'Alcance horizontal máximo: aprox. 8.53 m (28 pies)',
      'Capacidad de carga a máxima altura: aprox. 2,722 kg',
      'Peso operativo: aprox. 9,660 kg',
      'Tracción 4x4 y transmisión Powershift de 4 velocidades',
      'Dirección con modalidades de 2 ruedas, 4 ruedas y modo cangrejo'
    ]
  },
  {
    id: 'motoconformadora',
    nombre: 'Motoconformadora',
    categoria: 'solo-renta',
    modelo: 'Caterpillar 140H',
    descripcion: 'Ideal para construcción de caminos, perfilado y nivelación fina de subbases y bases, mantenimiento de caminos de acarreo en minería y conformación de cunetas.',
    especificaciones: ['Motor Cat 3306 DIT de 6 cilindros, diésel turbocargado', 'Potencia neta: aprox. 185 HP (138 kW), con control de potencia variable (VHP)', 'Peso operativo: aprox. 15,200 a 16,000 kg', 'Cuchilla de 14 pies (4.27 m), con opción a 12 pies', 'Transmisión Powershift de impulsión directa, 8 marchas de avance y 6 de retroceso, con control electrónico', 'Círculo de servicio pesado con rotación de 360°']
  }
];

const servicios = [
  {
    id: 'terracerias',
    nombre: 'Terracerías y preparación de plataformas',
    puntos: [
      { titulo: 'Desmonte y despalme', texto: 'Limpieza superficial de vegetación y retiro de la capa de tierra vegetal para asegurar un desplante firme.' },
      { titulo: 'Cortes y excavaciones', texto: 'Rebaje y extracción de material en zonas altas para nivelar el terreno según las cotas de proyecto.' },
      { titulo: 'Terraplenes y rellenos', texto: 'Colocación y extensión de materiales seleccionados en capas sucesivas para elevar las zonas bajas.' },
      { titulo: 'Compactación mecánica', texto: 'Densificación controlada del suelo con maquinaria pesada para lograr capacidad de carga y estabilidad.' },
      { titulo: 'Nivelación y afinamiento', texto: 'Acabado final de la superficie para entregar la plataforma lista para recibir cimentaciones o pavimentos.' }
    ]
  },
  {
    id: 'pisos',
    nombre: 'Limpieza y restauración de pisos',
    puntos: [
      { titulo: 'Pulido de pisos', texto: 'Nivelación, desbaste y pulido mecánico de superficies de concreto, mármol o terrazo para devolverles el brillo y la estética original.' },
      { titulo: 'Recubrimientos epóxicos', texto: 'Aplicación de sistemas de alta resistencia química y mecánica, ideales para naves industriales, almacenes y áreas comerciales.' },
      { titulo: 'Pisos oxidados (tratamientos y efectos)', texto: 'Aplicación de acabados decorativos o tratamientos protectores especializados para superficies con óxido controlado, brindando una imagen industrial y moderna.' },
      { titulo: 'Limpieza en general', texto: 'Limpieza profunda y especializada post-obra, mantenimiento de instalaciones comerciales e industriales y retiro de residuos acumulados.' }
    ]
  },
  {
    id: 'soldadura',
    nombre: 'Soldadura',
    intro: 'Cuéntanos qué necesitas y te cotizamos por WhatsApp.',
    puntos: []
  },
  {
    id: 'remodelacion',
    nombre: 'Remodelación de oficinas',
    puntos: [
      { titulo: 'Plafones y acabados', texto: 'Instalación y reparación de plafones, pintura y acabados interiores para renovar tus espacios de trabajo.' },
      { titulo: 'Divisiones y muros', texto: 'Construcción de muros de tablaroca, divisiones de cristal y adecuación de distribuciones según tus necesidades.' },
      { titulo: 'Pisos', texto: 'Instalación, pulido y restauración de pisos para oficinas y áreas comerciales.' },
      { titulo: 'Instalaciones y adecuaciones', texto: 'Adecuaciones eléctricas, de iluminación y de aire acondicionado, y entrega de la obra limpia y lista para usarse.' }
    ]
  }
];

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

function formatoPrecio(cantidad) {
  return '$' + new Intl.NumberFormat('es-MX').format(cantidad);
}

function linkWhatsApp(mensaje) {
  return `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

function construirContenidoModal(equipo, fotoSrc) {
  const esRentaVenta = equipo.categoria === 'renta-venta';
  const html = [];

  if (fotoSrc) {
    const claseFoto = esRentaVenta ? 'modal-foto modal-foto-contain' : 'modal-foto';
    html.push(`<img src="${fotoSrc}" alt="Foto de ${escapeHtml(equipo.nombre)}" class="${claseFoto}">`);
  }

  html.push('<div class="modal-info">');
  html.push(`<h2 class="modal-nombre" id="modalNombre">${escapeHtml(equipo.nombre)}</h2>`);
  html.push(`<p class="modal-modelo">${escapeHtml(equipo.modelo)}</p>`);
  html.push(`<p class="modal-descripcion">${escapeHtml(equipo.descripcion)}</p>`);
  html.push('<h4 class="modal-titulo-seccion">Especificaciones</h4>');
  html.push('<ul class="modal-especificaciones">');
  equipo.especificaciones.forEach(especificacion => {
    html.push(`<li>${escapeHtml(especificacion)}</li>`);
  });
  html.push('</ul>');

  if (esRentaVenta) {
    html.push('<h4 class="modal-titulo-seccion">Precios</h4>');
    html.push('<div class="modal-precios">');
    html.push('<div class="precio-caja"><span class="precio-label">Renta diaria</span><span class="precio-valor">' + formatoPrecio(equipo.precioDiario) + '</span></div>');
    html.push('<div class="precio-caja"><span class="precio-label">Renta semanal</span><span class="precio-valor">' + formatoPrecio(equipo.precioSemanal) + '</span></div>');
    html.push('<div class="precio-caja"><span class="precio-label">Renta mensual</span><span class="precio-valor">' + formatoPrecio(equipo.precioMensual) + '</span></div>');
    html.push('</div>');
    html.push('<p class="modal-nota">Precios netos por equipo.</p>');
    html.push('<div class="modal-botones">');
    html.push(`<a href="${linkWhatsApp(`Hola, me interesa cotizar la compra de: ${escapeHtml(equipo.nombre)}`)}" class="btn btn-whatsapp" target="_blank" rel="noopener">Cotizar compra por WhatsApp</a>`);
    html.push(`<a href="${linkWhatsApp(`Hola, me interesa rentar: ${escapeHtml(equipo.nombre)}`)}" class="btn btn-secundario" target="_blank" rel="noopener">Rentar por WhatsApp</a>`);
    html.push('</div>');
  } else {
    html.push('<p class="modal-nota">Precio personalizado según el proyecto.</p>');
    html.push('<div class="modal-botones">');
    html.push(`<a href="${linkWhatsApp(`Hola, me interesa cotizar la renta de: ${escapeHtml(equipo.nombre)}`)}" class="btn btn-whatsapp" target="_blank" rel="noopener">Cotizar por WhatsApp</a>`);
    html.push('</div>');
  }

  html.push('</div>');
  return html.join('');
}

const modal = document.createElement('div');
modal.id = 'modalEquipo';
modal.className = 'modal';
modal.innerHTML = `
  <div class="modal-backdrop"></div>
  <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalNombre">
    <button class="modal-cerrar" aria-label="Cerrar ventana">&times;</button>
    <div class="modal-contenido"></div>
  </div>
`;
document.body.appendChild(modal);

const backdrop = modal.querySelector('.modal-backdrop');
const panel = modal.querySelector('.modal-panel');
const btnCerrar = modal.querySelector('.modal-cerrar');
const contenido = modal.querySelector('.modal-contenido');

function abrirModal(equipo, fotoSrc) {
  contenido.innerHTML = construirContenidoModal(equipo, fotoSrc);
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
}

function cerrarModal() {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
  contenido.innerHTML = '';
}

btnCerrar.addEventListener('click', cerrarModal);
backdrop.addEventListener('click', cerrarModal);
panel.addEventListener('click', e => e.stopPropagation());

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('is-open')) {
    cerrarModal();
  }
});

document.querySelectorAll('#equipos .tarjeta, #equipos-renta .tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('click', () => {
    const id = tarjeta.getAttribute('data-id');
    if (!id) return;
    const equipo = equipos.find(e => e.id === id);
    if (!equipo) return;
    const imagen = tarjeta.querySelector('.tarjeta-img img');
    abrirModal(equipo, imagen ? imagen.src : null);
  });
});

// ===== Servicios y modales =====

function construirContenidoServicio(servicio, fotoSrc) {
  const html = [];

  if (fotoSrc) {
    html.push(`<img src="${fotoSrc}" alt="Foto de ${escapeHtml(servicio.nombre)}" class="modal-foto">`);
  }

  html.push('<div class="modal-info">');
  html.push(`<h2 class="modal-nombre" id="modalNombre">${escapeHtml(servicio.nombre)}</h2>`);

  if (servicio.intro) {
    html.push(`<p class="modal-descripcion">${escapeHtml(servicio.intro)}</p>`);
  }

  if (servicio.puntos.length) {
    html.push('<div class="modal-puntos">');
    servicio.puntos.forEach(punto => {
      html.push('<div class="punto">');
      html.push(`<p class="punto-titulo">${escapeHtml(punto.titulo)}</p>`);
      html.push(`<p class="punto-texto">${escapeHtml(punto.texto)}</p>`);
      html.push('</div>');
    });
    html.push('</div>');
  }

  html.push('<div class="modal-botones">');
  html.push(`<a href="${linkWhatsApp(`Hola, me interesa cotizar el servicio de: ${escapeHtml(servicio.nombre)}`)}" class="btn btn-whatsapp" target="_blank" rel="noopener">Cotizar por WhatsApp</a>`);
  html.push('</div>');
  html.push('</div>');
  return html.join('');
}

function abrirModalServicio(servicio, fotoSrc) {
  contenido.innerHTML = construirContenidoServicio(servicio, fotoSrc);
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
}

document.querySelectorAll('#servicios .tarjeta').forEach(tarjeta => {
  tarjeta.addEventListener('click', () => {
    const id = tarjeta.getAttribute('data-id');
    if (!id) return;
    const servicio = servicios.find(s => s.id === id);
    if (!servicio) return;
    const imagen = tarjeta.querySelector('.tarjeta-img img');
    abrirModalServicio(servicio, imagen ? imagen.src : null);
  });
});

// ===== Ventana Misión y Visión =====

function construirMisionVision() {
  return `
    <div class="modal-info modal-info-top">
      <div class="mv-bloque">
        <h3 class="mv-titulo">Misión</h3>
        <p class="mv-texto">${escapeHtml(empresa.mision)}</p>
      </div>
      <hr class="mv-separador">
      <div class="mv-bloque">
        <h3 class="mv-titulo">Visión</h3>
        <p class="mv-texto">${escapeHtml(empresa.vision)}</p>
      </div>
    </div>
  `;
}

const btnMisionVision = document.getElementById('btnMisionVision');
if (btnMisionVision) {
  btnMisionVision.addEventListener('click', () => {
    contenido.innerHTML = construirMisionVision();
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  });
}

// ===== Formulario de cotización =====

const formCotizacion = document.getElementById('form-cotizacion');

if (formCotizacion) {
  // Llenado automático de "Equipo o servicio de interés" con equipos y servicios
  const selectInteres = document.getElementById('cot-interes');

  const grupoEquipos = document.createElement('optgroup');
  grupoEquipos.label = 'Equipos';
  equipos.forEach(equipo => {
    const opcion = document.createElement('option');
    opcion.value = equipo.nombre;
    opcion.textContent = equipo.nombre;
    grupoEquipos.appendChild(opcion);
  });

  const grupoServicios = document.createElement('optgroup');
  grupoServicios.label = 'Servicios';
  servicios.forEach(servicio => {
    const opcion = document.createElement('option');
    opcion.value = servicio.nombre;
    opcion.textContent = servicio.nombre;
    grupoServicios.appendChild(opcion);
  });

  selectInteres.appendChild(grupoEquipos);
  selectInteres.appendChild(grupoServicios);

  const camposValidar = {
    nombre: { input: 'cot-nombre', error: 'err-nombre' },
    correo: { input: 'cot-correo', error: 'err-correo' },
    telefono: { input: 'cot-telefono', error: 'err-telefono' },
    necesita: { input: 'cot-necesita', error: 'err-necesita' }
  };

  function mostrarError(clave, mensaje) {
    document.getElementById(camposValidar[clave].error).textContent = mensaje || '';
  }

  Object.keys(camposValidar).forEach(clave => {
    const elemento = document.getElementById(camposValidar[clave].input);
    elemento.addEventListener('input', () => mostrarError(clave, ''));
    elemento.addEventListener('change', () => mostrarError(clave, ''));
  });

  function valorCampo(id) {
    return document.getElementById(id).value.trim();
  }

  function validarFormulario() {
    let primeroInvalido = null;

    if (!valorCampo('cot-nombre')) {
      mostrarError('nombre', 'Escribe tu nombre.');
      primeroInvalido = primeroInvalido || 'cot-nombre';
    } else {
      mostrarError('nombre', '');
    }

    const telefono = valorCampo('cot-telefono').replace(/\D/g, '');
    if (!telefono) {
      mostrarError('telefono', 'Escribe tu teléfono.');
      primeroInvalido = primeroInvalido || 'cot-telefono';
    } else if (telefono.length !== 10) {
      mostrarError('telefono', 'El teléfono debe tener 10 dígitos.');
      primeroInvalido = primeroInvalido || 'cot-telefono';
    } else {
      mostrarError('telefono', '');
    }

    if (!valorCampo('cot-necesita')) {
      mostrarError('necesita', 'Selecciona qué necesitas.');
      primeroInvalido = primeroInvalido || 'cot-necesita';
    } else {
      mostrarError('necesita', '');
    }

    const correo = valorCampo('cot-correo');
    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      mostrarError('correo', 'Revisa el formato del correo.');
      primeroInvalido = primeroInvalido || 'cot-correo';
    } else {
      mostrarError('correo', '');
    }

    return primeroInvalido;
  }

  formCotizacion.addEventListener('submit', function(e) {
    e.preventDefault();

    const primeroInvalido = validarFormulario();
    if (primeroInvalido) {
      document.getElementById(primeroInvalido).focus();
      return;
    }

    const nombre = valorCampo('cot-nombre');
    const empresa = valorCampo('cot-empresa');
    const telefono = valorCampo('cot-telefono');
    const correo = valorCampo('cot-correo');
    const necesita = valorCampo('cot-necesita');
    const interes = valorCampo('cot-interes');
    const ubicacion = valorCampo('cot-ubicacion');
    const detalles = valorCampo('cot-detalles');

    const lineas = ['Hola, quiero solicitar una cotización.'];
    if (nombre) lineas.push(`Nombre: ${nombre}`);
    if (empresa) lineas.push(`Empresa: ${empresa}`);
    if (telefono) lineas.push(`Teléfono: ${telefono}`);
    if (correo) lineas.push(`Correo: ${correo}`);
    if (necesita) lineas.push(`Necesito: ${necesita}`);
    if (interes) lineas.push(`Equipo o servicio: ${interes}`);
    if (ubicacion) lineas.push(`Ubicación de la obra: ${ubicacion}`);
    if (detalles) lineas.push(`Detalles: ${detalles}`);

    const mensaje = lineas.join('\n');
    window.open(`https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');

    const confirmacion = document.getElementById('confirmacion-envio');
    confirmacion.textContent = '¡Gracias! Se abrió WhatsApp con tu solicitud. Solo falta que la envíes.';
    confirmacion.hidden = false;
  });
}

// Tarjetas accesibles con teclado (Enter / Espacio)
document.querySelectorAll('.tarjeta').forEach(t => {
  t.setAttribute('tabindex', '0');
  t.setAttribute('role', 'button');
  t.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); }
  });
});

// ===== Menú de navegación en móvil =====
const encabezado = document.querySelector('.encabezado');
const botonMenu = document.querySelector('.menu-toggle');

if (encabezado && botonMenu) {
  function cambiarMenu(abierto) {
    encabezado.classList.toggle('menu-abierto', abierto);
    botonMenu.setAttribute('aria-expanded', String(abierto));
    botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  botonMenu.addEventListener('click', () => {
    cambiarMenu(!encabezado.classList.contains('menu-abierto'));
  });

  // Al elegir una sección, el menú se cierra
  encabezado.querySelectorAll('.menu a').forEach(enlace => {
    enlace.addEventListener('click', () => cambiarMenu(false));
  });

  // Cerrar con Escape o al tocar fuera del encabezado
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && encabezado.classList.contains('menu-abierto')) {
      cambiarMenu(false);
      botonMenu.focus();
    }
  });

  document.addEventListener('click', e => {
    if (encabezado.classList.contains('menu-abierto') && !encabezado.contains(e.target)) {
      cambiarMenu(false);
    }
  });

  // Al volver a escritorio, el menú vuelve a su estado normal
  const anchoEscritorio = window.matchMedia('(min-width: 901px)');
  const alCambiarAncho = e => { if (e.matches) cambiarMenu(false); };
  if (anchoEscritorio.addEventListener) anchoEscritorio.addEventListener('change', alCambiarAncho);
  else if (anchoEscritorio.addListener) anchoEscritorio.addListener(alCambiarAncho);
}

// ===== Revelado suave al hacer scroll =====
if ('IntersectionObserver' in window && !reducirMovimiento) {
  const revelables = document.querySelectorAll('.seccion h2, .acerca-tarjeta');
  if (revelables.length) {
    document.documentElement.classList.add('js');
    const observador = new IntersectionObserver((entradas, obs) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('es-visible');
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revelables.forEach(elemento => {
      elemento.classList.add('reveal');
      observador.observe(elemento);
    });
  }
}
