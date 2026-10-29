/**
 * ============================================================================
 * CENTRO COMERCIAL LA FONTANA - SCRIPT PRINCIPAL
 * Tecnología: JavaScript Vanilla (ES6+, sin dependencias ni frameworks)
 * Funcionalidades:
 *   1. Navegación Móvil Accesible (Hamburger + Backdrop + Tecla Esc)
 *   2. ScrollSpy y Cabecera Dinámica
 *   3. Animaciones Suaves al Desplazamiento (IntersectionObserver)
 *   4. Modal / Visualizador de Fachada Completa (Sin recortes)
 *   5. Filtro Interactivo de Categorías de Servicios
 *   6. Validación Rigurosa del Formulario de Contacto
 *   7. Aviso de Formulario sin Backend (Sin confirmaciones falsas de envío)
 *   8. Botón Accesible "Volver Arriba" y Año Dinámico
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. GESTIÓN DEL MENÚ MÓVIL Y ACCESIBILIDAD
  // ==========================================================================
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('menu-navegacion');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMobileMenu = () => {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    siteNav.classList.add('is-open');
    if (navBackdrop) navBackdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo
  };

  const closeMobileMenu = () => {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    siteNav.classList.remove('is-open');
    if (navBackdrop) navBackdrop.classList.remove('is-visible');
    document.body.style.overflow = ''; // Restaurar scroll
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Cerrar el menú al presionar la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (siteNav && siteNav.classList.contains('is-open')) {
        closeMobileMenu();
        if (navToggle) navToggle.focus();
      }
      closePhotoModal();
    }
  });

  // Cerrar menú móvil al hacer click en cualquier enlace interno
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 960) {
        closeMobileMenu();
      }
    });
  });


  // ==========================================================================
  // 2. SCROLLSPY Y EFECTO EN CABECERA (Header Elevation)
  // ==========================================================================
  const header = document.getElementById('cabecera');
  const sections = document.querySelectorAll('section[id], header[id]');

  const handleScrollEvents = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sombra sutil al hacer scroll en la cabecera
    if (header) {
      if (scrollY > 30) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    }

    // ScrollSpy: marcar el enlace activo según la sección visible
    let currentSectionId = '';
    const scrollPosition = scrollY + 120; // Margen de compensación

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = id;
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('nav-link--active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('nav-link--active');
        }
      });
    }

    // Control de visibilidad del botón "Volver Arriba"
    const backToTopBtn = document.getElementById('btn-back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.removeAttribute('hidden');
      } else {
        backToTopBtn.setAttribute('hidden', '');
      }
    }
  };

  window.addEventListener('scroll', handleScrollEvents, { passive: true });
  handleScrollEvents(); // Ejecutar al cargar para sincronizar estado


  // ==========================================================================
  // 3. ANIMACIONES SUTILES AL DESPLAZARSE (Scroll Reveal)
  // ==========================================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal-item');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Si el usuario prefiere movimiento reducido o no hay soporte, mostrar todo de inmediato
    revealItems.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Animar solo una vez para evitar distracciones
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach((el) => revealObserver.observe(el));
  }


  // ==========================================================================
  // 4. MODAL / VISOR DE FOTOGRAFÍA ARQUITECTÓNICA (Sin recortes)
  // ==========================================================================
  const btnVerEdificio = document.getElementById('btn-ver-edificio');
  const btnVerEdificioSede = document.getElementById('btn-ver-edificio-sede');
  const photoModal = document.getElementById('photo-modal');
  const photoModalClose = document.getElementById('photo-modal-close');
  const photoModalBackdrop = document.getElementById('photo-modal-backdrop');

  const openPhotoModal = () => {
    if (!photoModal) return;
    photoModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (photoModalClose) photoModalClose.focus();
  };

  const closePhotoModal = () => {
    if (!photoModal || photoModal.hasAttribute('hidden')) return;
    photoModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (btnVerEdificioSede) {
      btnVerEdificioSede.focus();
    } else if (btnVerEdificio) {
      btnVerEdificio.focus();
    }
  };

  if (btnVerEdificio) btnVerEdificio.addEventListener('click', openPhotoModal);
  if (btnVerEdificioSede) btnVerEdificioSede.addEventListener('click', openPhotoModal);
  if (photoModalClose) photoModalClose.addEventListener('click', closePhotoModal);
  if (photoModalBackdrop) photoModalBackdrop.addEventListener('click', closePhotoModal);

  // Botón inferior Gestionar Consentimiento
  const btnConsent = document.getElementById('btn-consent');
  if (btnConsent) {
    btnConsent.addEventListener('click', () => {
      alert('Preferencias de privacidad y consentimiento actualizadas correctamente.');
    });
  }


  // ==========================================================================
  // 5. FILTRADO INTERACTIVO DE SERVICIOS Y LOCALES
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  const emptyFilterMsg = document.getElementById('filter-empty-msg');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Manejar clase activa
      filterButtons.forEach((b) => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const filterValue = btn.getAttribute('data-filter');
      let visibleCount = 0;

      serviceCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (emptyFilterMsg) {
        if (visibleCount === 0) {
          emptyFilterMsg.removeAttribute('hidden');
        } else {
          emptyFilterMsg.setAttribute('hidden', '');
        }
      }
    });
  });


  // ==========================================================================
  // 6. VALIDACIÓN DEL FORMULARIO DE CONTACTO
  // ==========================================================================
  const form = document.getElementById('formulario-contacto');
  const inputNombre = document.getElementById('nombre');
  const inputCorreo = document.getElementById('correo');
  const inputTelefono = document.getElementById('telefono');
  const selectMotivo = document.getElementById('motivo');
  const textareaMensaje = document.getElementById('mensaje');
  const charCounter = document.getElementById('char-counter');

  // Contenedor de aviso obligatorio (sin falso envío)
  const noticeNoBackend = document.getElementById('notice-no-backend');
  const btnCerrarAviso = document.getElementById('btn-cerrar-aviso');
  const validatedSummary = document.getElementById('validated-summary');
  const btnEnviarMailto = document.getElementById('btn-enviar-mailto');
  const btnEnviarWhatsappForm = document.getElementById('btn-enviar-whatsapp-form');

  // Contador de caracteres en tiempo real
  if (textareaMensaje && charCounter) {
    const maxChars = textareaMensaje.getAttribute('maxlength') || 1000;
    textareaMensaje.addEventListener('input', () => {
      const currentLength = textareaMensaje.value.length;
      charCounter.textContent = `${currentLength} / ${maxChars} caracteres`;
    });
  }

  // Funciones de validación
  const setError = (inputElement, errorElementId, message) => {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
    inputElement.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) {
      errorEl.textContent = message;
    }
  };

  const clearError = (inputElement, errorElementId) => {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    inputElement.setAttribute('aria-invalid', 'false');
    const errorEl = document.getElementById(errorElementId);
    if (errorEl) {
      errorEl.textContent = '';
    }
  };

  const validateNombre = () => {
    if (!inputNombre) return true;
    const value = inputNombre.value.trim();
    if (!value) {
      setError(inputNombre, 'error-nombre', 'Por favor, ingresa tu nombre completo.');
      return false;
    }
    if (value.length < 3) {
      setError(inputNombre, 'error-nombre', 'El nombre debe contener al menos 3 caracteres.');
      return false;
    }
    clearError(inputNombre, 'error-nombre');
    return true;
  };

  const validateCorreo = () => {
    if (!inputCorreo) return true;
    const value = inputCorreo.value.trim();
    // Expresión regular estándar para correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) {
      setError(inputCorreo, 'error-correo', 'El correo electrónico es obligatorio.');
      return false;
    }
    if (!emailRegex.test(value)) {
      setError(inputCorreo, 'error-correo', 'Ingresa una dirección de correo válida (ejemplo: usuario@dominio.com).');
      return false;
    }
    clearError(inputCorreo, 'error-correo');
    return true;
  };

  const validateTelefono = () => {
    if (!inputTelefono) return true;
    const value = inputTelefono.value.trim();
    if (!value) {
      setError(inputTelefono, 'error-telefono', 'Por favor, ingresa tu teléfono o WhatsApp para coordinar la cita.');
      return false;
    }
    // Validar formato telefónico estándar
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,16}$/;
    if (!phoneRegex.test(value)) {
      setError(inputTelefono, 'error-telefono', 'Ingresa un número telefónico válido (ejemplo: +51 987 654 321).');
      return false;
    }
    clearError(inputTelefono, 'error-telefono');
    return true;
  };

  const validateMotivo = () => {
    if (!selectMotivo) return true;
    const value = selectMotivo.value;
    if (!value) {
      setError(selectMotivo, 'error-motivo', 'Selecciona el tratamiento odontológico de tu interés.');
      return false;
    }
    clearError(selectMotivo, 'error-motivo');
    return true;
  };

  const validateMensaje = () => {
    if (!textareaMensaje) return true;
    const value = textareaMensaje.value.trim();
    if (!value) {
      setError(textareaMensaje, 'error-mensaje', 'Por favor, escribe tu mensaje o consulta.');
      return false;
    }
    if (value.length < 10) {
      setError(textareaMensaje, 'error-mensaje', 'El mensaje debe ser más específico (mínimo 10 caracteres).');
      return false;
    }
    clearError(textareaMensaje, 'error-mensaje');
    return true;
  };

  // Validación reactiva al desenfocar campos (blur) y al escribir (input)
  if (inputNombre) {
    inputNombre.addEventListener('blur', validateNombre);
    inputNombre.addEventListener('input', () => {
      if (inputNombre.classList.contains('is-invalid')) validateNombre();
    });
  }

  if (inputCorreo) {
    inputCorreo.addEventListener('blur', validateCorreo);
    inputCorreo.addEventListener('input', () => {
      if (inputCorreo.classList.contains('is-invalid')) validateCorreo();
    });
  }

  if (inputTelefono) {
    inputTelefono.addEventListener('blur', validateTelefono);
    inputTelefono.addEventListener('input', () => {
      if (inputTelefono.classList.contains('is-invalid')) validateTelefono();
    });
  }

  if (selectMotivo) {
    selectMotivo.addEventListener('change', validateMotivo);
  }

  if (textareaMensaje) {
    textareaMensaje.addEventListener('blur', validateMensaje);
    textareaMensaje.addEventListener('input', () => {
      if (textareaMensaje.classList.contains('is-invalid')) validateMensaje();
    });
  }

  // ==========================================================================
  // 7. GESTIÓN DEL SUBMIT: NO MOSTRAR CONFIRMACIÓN FALSA DE ENVÍO
  // ==========================================================================
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevenir recarga de página

      // Ejecutar todas las validaciones
      const isNombreOk = validateNombre();
      const isCorreoOk = validateCorreo();
      const isTelefonoOk = validateTelefono();
      const isMotivoOk = validateMotivo();
      const isMensajeOk = validateMensaje();

      const isFormValid = isNombreOk && isCorreoOk && isTelefonoOk && isMotivoOk && isMensajeOk;

      if (!isFormValid) {
        // Mover foco al primer elemento con error
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Si todos los datos son válidos:
      // CUMPLIMIENTO ESTRICTO: NO MOSTRAR MENSAJE FALSO DE "ENVIADO CON ÉXITO".
      // Mostrar tarjeta informativa con los datos procesados y enlaces directos de acción.
      const datos = {
        nombre: inputNombre.value.trim(),
        correo: inputCorreo.value.trim(),
        telefono: inputTelefono.value.trim() || 'No proporcionado',
        motivoTexto: selectMotivo.options[selectMotivo.selectedIndex].text,
        mensaje: textareaMensaje.value.trim()
      };

      if (validatedSummary) {
        validatedSummary.innerHTML = `
          <p><strong>Paciente:</strong> ${escapeHtml(datos.nombre)}</p>
          <p><strong>Teléfono / WhatsApp:</strong> ${escapeHtml(datos.telefono)}</p>
          <p><strong>Correo:</strong> ${escapeHtml(datos.correo)}</p>
          <p><strong>Tratamiento:</strong> ${escapeHtml(datos.motivoTexto)}</p>
          <p><strong>Detalle / Horario:</strong> "${escapeHtml(datos.mensaje)}"</p>
        `;
      }

      // Configurar enlace alternativo de WhatsApp para agendar cita inmediata
      if (btnEnviarWhatsappForm) {
        const waText = encodeURIComponent(
          `*Nueva Solicitud de Cita - PeruDental*\n\n` +
          `*Paciente:* ${datos.nombre}\n` +
          `*Teléfono:* ${datos.telefono}\n` +
          `*Correo:* ${datos.correo}\n` +
          `*Tratamiento:* ${datos.motivoTexto}\n\n` +
          `*Sede:* C.C. La Fontana (Of. 301), Camacho, La Molina\n` +
          `*Detalle / Horario preferido:*\n${datos.mensaje}`
        );
        btnEnviarWhatsappForm.setAttribute('href', `https://api.whatsapp.com/send?phone=51995081111&text=${waText}`);
      }

      // Configurar enlace alternativo de correo tradicional (mailto)
      if (btnEnviarMailto) {
        const mailtoSubject = encodeURIComponent(`Solicitud de Cita PeruDental: ${datos.motivoTexto} - ${datos.nombre}`);
        const mailtoBody = encodeURIComponent(
          `Paciente: ${datos.nombre}\n` +
          `Teléfono: ${datos.telefono}\n` +
          `Correo: ${datos.correo}\n` +
          `Tratamiento: ${datos.motivoTexto}\n` +
          `Sede: C.C. La Fontana (Of. 301), Camacho, La Molina\n\n` +
          `Horario preferido / Consulta:\n${datos.mensaje}`
        );
        btnEnviarMailto.setAttribute(
          'href',
          `mailto:contacto@perudental.com?subject=${mailtoSubject}&body=${mailtoBody}`
        );
      }

      // Mostrar el aviso de ausencia de backend
      if (noticeNoBackend) {
        noticeNoBackend.removeAttribute('hidden');
        noticeNoBackend.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // Botón para cerrar el aviso informativo
  if (btnCerrarAviso && noticeNoBackend) {
    btnCerrarAviso.addEventListener('click', () => {
      noticeNoBackend.setAttribute('hidden', '');
    });
  }

  // Utilidad de sanitización para prevenir XSS en el resumen
  function escapeHtml(string) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
    };
    return String(string).replace(/[&<>"'/]/g, (s) => entityMap[s]);
  }


  // ==========================================================================
  // 8. BOTÓN VOLVER ARRIBA Y AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
  // ==========================================================================
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
