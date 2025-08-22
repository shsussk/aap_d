// Application Data and Main JavaScript
// Ecosistema de Innovación Regenerativa

class EcosistemaApp {
    constructor() {
        this.data = this.loadData();
        this.currentSection = 'dashboard';
        this.init();
    }

    // Cargar datos del localStorage (sincronizado con admin)
    loadData() {
        const defaultData = {
            problemas: [
                {
                    id: 1,
                    titulo: "Riego irregular en Lote 7",
                    descripcion: "Goteros obstruidos causan estrés hídrico en el sector norte del lote. Los bananos muestran signos de deshidratación especialmente en las horas de mayor calor.",
                    area: "Producción",
                    reportero: "Carlos Técnico Riego",
                    fecha: "2025-08-18",
                    urgencia: 4,
                    estado: "En ensayo",
                    imagen: null
                },
                {
                    id: 2,
                    titulo: "Thrips en recepción postcosecha",
                    descripcion: "Incremento del daño cosmético en las últimas 2 semanas. Se observa principalmente en bananos de la sección B del empaque.",
                    area: "Calidad",
                    reportero: "Ana Inspectora",
                    fecha: "2025-08-19",
                    urgencia: 3,
                    estado: "Priorizado",
                    imagen: null
                },
                {
                    id: 3,
                    titulo: "Falla en bomba de riego #3",
                    descripcion: "La bomba presenta ruidos anórmales y pérdida de presión. Afecta el riego de 15 hectáreas en el sector oeste.",
                    area: "Maquinaria",
                    reportero: "Pedro Mantenimiento",
                    fecha: "2025-08-20",
                    urgencia: 5,
                    estado: "Reportado",
                    imagen: null
                }
            ],
            ensayos: [
                {
                    id: 1,
                    titulo: "Bio-fertilizante + riego optimizado",
                    problemaOrigen: "Riego irregular en Lote 7",
                    hipotesis: "El fertilizante orgánico combinado con sistema de goteo calibrado aumentará el rendimiento en 15% y reducirá el consumo de agua en 20%",
                    responsable: "María Investigadora",
                    validador: "Carlos Técnico Riego",
                    fechaInicio: "2025-08-20",
                    duracion: 8,
                    progreso: 25,
                    metrica: "2100 cajas/ha",
                    roi: "300%"
                },
                {
                    id: 2,
                    titulo: "Control biológico de thrips",
                    problemaOrigen: "Thrips en recepción postcosecha",
                    hipotesis: "La introducción de depredadores naturales reducirá la población de thrips sin afectar la certificación orgánica",
                    responsable: "Dr. Luis Entomólogo",
                    validador: "Ana Inspectora",
                    fechaInicio: "2025-08-21",
                    duracion: 6,
                    progreso: 10,
                    metrica: "< 2% daño cosmético",
                    roi: "250%"
                }
            ],
            historias: [
                {
                    id: 1,
                    titulo: "Reducción 40% merma postcosecha",
                    problemaOriginal: "Daño mecánico en transporte",
                    solucion: "Implementación de cajas acolchonadas y capacitación intensiva en manipulación cuidadosa del banano desde corte hasta empaque",
                    impacto: "RD$ 180,000 anuales",
                    participantes: ["José Logística", "Laura I+D", "Pedro Calidad"],
                    fecha: "2025-07-15",
                    testimonios: "Ahora los bananos llegan perfectos al puerto. La inversión se pagó en 3 meses."
                },
                {
                    id: 2,
                    titulo: "Optimización de fertilización orgánica",
                    problemaOriginal: "Baja productividad en sector norte",
                    solucion: "Ajuste de fórmula de compost y calendario de aplicación basado en análisis de suelo detallado",
                    impacto: "RD$ 320,000 anuales",
                    participantes: ["María Investigadora", "Carlos Nutrición", "Equipo Producción"],
                    fecha: "2025-06-30",
                    testimonios: "Pasamos de 1,800 a 2,200 cajas por hectárea. Es el mejor resultado en 5 años."
                }
            ],
            usuarios: [
                {
                    id: 1,
                    nombre: "Carlos Reynoso",
                    rol: "Técnico Riego",
                    area: "Riego",
                    experiencia: 15,
                    superpoderes: ["15 años experiencia riego", "Conoce cada gotero", "Detector natural estrés hídrico"],
                    aportesTotales: 12,
                    colaboracionesExito: 8
                },
                {
                    id: 2,
                    nombre: "María Santana",
                    rol: "Investigadora Senior",
                    area: "I+D",
                    experiencia: 10,
                    superpoderes: ["Fitopatología", "Diseño experimental", "Análisis estadístico"],
                    aportesTotales: 25,
                    colaboracionesExito: 15
                },
                {
                    id: 3,
                    nombre: "Ana Rodríguez",
                    rol: "Inspectora de Calidad",
                    area: "Calidad",
                    experiencia: 8,
                    superpoderes: ["Ojo clínico para defectos", "Experta en normas orgánicas", "Trazabilidad perfecta"],
                    aportesTotales: 18,
                    colaboracionesExito: 12
                },
                {
                    id: 4,
                    nombre: "Pedro Martínez",
                    rol: "Supervisor Mantenimiento",
                    area: "Maquinaria",
                    experiencia: 20,
                    superpoderes: ["Diagnóstico de equipos", "Soldadura especializada", "Prevención predictiva"],
                    aportesTotales: 9,
                    colaboracionesExito: 7
                }
            ]
        };

        const savedData = localStorage.getItem('ecosistema-data');
        return savedData ? JSON.parse(savedData) : defaultData;
    }

    // Guardar datos en localStorage
    saveData() {
        localStorage.setItem('ecosistema-data', JSON.stringify(this.data));
        this.updateDashboardMetrics();
    }

    // Inicializar aplicación
    init() {
        this.setupEventListeners();
        this.loadSection('dashboard');
        this.updateDashboardMetrics();
        this.updateFooterMetrics();
        
        // Auto-sync datos cada 30 segundos
        setInterval(() => {
            this.syncData();
        }, 30000);
    }

    // Configurar event listeners
    setupEventListeners() {
        // Botón de entrada al ecosistema
        const enterBtn = document.getElementById('enter-ecosystem-btn');
        if (enterBtn) {
            enterBtn.addEventListener('click', () => this.enterEcosystem());
        }

        // Navegación principal
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                this.loadSection(section);
            });
        });

        // Filtros
        const filters = document.querySelectorAll('.filter-select');
        filters.forEach(filter => {
            filter.addEventListener('change', () => this.applyFilters());
        });

        // Formulario de problema
        const formProblema = document.getElementById('form-reporte-problema');
        if (formProblema) {
            formProblema.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitProblema();
            });
        }

        // Preview de foto
        const fotoInput = document.getElementById('modal-problema-foto');
        if (fotoInput) {
            fotoInput.addEventListener('change', (e) => this.previewFoto(e));
        }
    }

    // Entrar al ecosistema
    enterEcosystem() {
        document.getElementById('landing-page').style.display = 'none';
        document.getElementById('main-app').classList.remove('hidden');
        this.loadSection('dashboard');
    }

    // Cargar sección
    loadSection(sectionName) {
        // Actualizar navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === sectionName) {
                btn.classList.add('active');
            }
        });

        // Mostrar sección
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        this.currentSection = sectionName;

        // Cargar contenido específico
        switch (sectionName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'voces':
                this.loadProblemas();
                break;
            case 'laboratorio':
                this.loadEnsayos();
                break;
            case 'historias':
                this.loadHistorias();
                break;
            case 'red':
                this.loadRedHumana();
                break;
        }
    }

    // Cargar dashboard
    loadDashboard() {
        this.updateDashboardMetrics();
        this.loadProblemasUrgentes();
        this.loadEnsayosCriticos();
        this.loadExitosRecientes();
    }

    // Actualizar métricas del dashboard
    updateDashboardMetrics() {
        const problemasActivos = this.data.problemas.filter(p => p.estado !== 'Resuelto').length;
        const ensayosActivos = this.data.ensayos.length;
        const historiasExito = this.data.historias.length;
        
        // Calcular ahorro acumulado
        const ahorroTotal = this.data.historias.reduce((total, historia) => {
            const match = historia.impacto.match(/RD\$\s*([\d,]+)/);
            return total + (match ? parseInt(match[1].replace(/,/g, '')) : 0);
        }, 0);

        document.getElementById('dashboard-problemas').textContent = problemasActivos;
        document.getElementById('dashboard-ensayos').textContent = ensayosActivos;
        document.getElementById('dashboard-historias').textContent = historiasExito;
        document.getElementById('dashboard-ahorro').textContent = `RD$ ${ahorroTotal.toLocaleString()}`;
    }

    // Cargar problemas urgentes
    loadProblemasUrgentes() {
        const problemasUrgentes = this.data.problemas
            .filter(p => p.urgencia >= 4 && p.estado !== 'Resuelto')
            .sort((a, b) => b.urgencia - a.urgencia)
            .slice(0, 5);

        const container = document.getElementById('problemas-urgentes');
        if (!container) return;

        container.innerHTML = problemasUrgentes.length ? 
            problemasUrgentes.map(problema => `
                <div class="activity-item">
                    <h4>${problema.titulo}</h4>
                    <p>${problema.area} • Urgencia: ${problema.urgencia} • ${problema.estado}</p>
                </div>
            `).join('') : 
            '<p class="text-secondary">No hay problemas urgentes activos</p>';
    }

    // Cargar ensayos críticos
    loadEnsayosCriticos() {
        const ensayosCriticos = this.data.ensayos
            .filter(e => e.progreso < 50)
            .sort((a, b) => a.progreso - b.progreso)
            .slice(0, 5);

        const container = document.getElementById('ensayos-criticos');
        if (!container) return;

        container.innerHTML = ensayosCriticos.length ?
            ensayosCriticos.map(ensayo => `
                <div class="activity-item">
                    <h4>${ensayo.titulo}</h4>
                    <p>Progreso: ${ensayo.progreso}% • ROI: ${ensayo.roi}</p>
                </div>
            `).join('') :
            '<p class="text-secondary">Todos los ensayos van por buen camino</p>';
    }

    // Cargar éxitos recientes
    loadExitosRecientes() {
        const exitosRecientes = this.data.historias
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .slice(0, 3);

        const container = document.getElementById('exitos-recientes');
        if (!container) return;

        container.innerHTML = exitosRecientes.length ?
            exitosRecientes.map(historia => `
                <div class="activity-item">
                    <h4>${historia.titulo}</h4>
                    <p>${historia.impacto} • ${new Date(historia.fecha).toLocaleDateString()}</p>
                </div>
            `).join('') :
            '<p class="text-secondary">¡Los primeros éxitos están por venir!</p>';
    }

    // Cargar problemas
    loadProblemas() {
        this.renderProblemas(this.data.problemas);
    }

    // Renderizar problemas
    renderProblemas(problemas) {
        const container = document.getElementById('muro-problemas');
        if (!container) return;

        if (problemas.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>🌱 ¡Excelente trabajo!</h3>
                    <p>No hay problemas reportados. El ecosistema está funcionando perfectamente.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = problemas.map(problema => `
            <div class="problem-card problem-card--urgencia-${problema.urgencia}" onclick="verDetalleProblema(${problema.id})">
                <div class="problem-header">
                    <h3 class="problem-title">${problema.titulo}</h3>
                    <span class="problem-urgency problem-urgency--${problema.urgencia}">
                        ${this.getUrgencyLabel(problema.urgencia)}
                    </span>
                </div>
                <div class="problem-meta">
                    <span>📍 ${problema.area}</span>
                    <span>👤 ${problema.reportero || 'Anónimo'}</span>
                    <span>📅 ${new Date(problema.fecha).toLocaleDateString()}</span>
                </div>
                <p class="problem-description">${problema.descripcion}</p>
                <span class="problem-status problem-status--${problema.estado.toLowerCase().replace(' ', '')}">${problema.estado}</span>
            </div>
        `).join('');
    }

    // Aplicar filtros a problemas
    applyFilters() {
        const filtroArea = document.getElementById('filtro-area')?.value || '';
        const filtroUrgencia = document.getElementById('filtro-urgencia')?.value || '';
        const filtroEstado = document.getElementById('filtro-estado')?.value || '';

        let problemasFiltrados = this.data.problemas.filter(problema => {
            return (!filtroArea || problema.area === filtroArea) &&
                   (!filtroUrgencia || problema.urgencia.toString() === filtroUrgencia) &&
                   (!filtroEstado || problema.estado === filtroEstado);
        });

        this.renderProblemas(problemasFiltrados);
    }

    // Cargar ensayos
    loadEnsayos() {
        const container = document.getElementById('ensayos-container');
        if (!container) return;

        if (this.data.ensayos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>🧪 Laboratorio listo</h3>
                    <p>No hay ensayos activos. ¡Es momento de innovar!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.ensayos.map(ensayo => `
            <div class="ensayo-card">
                <div class="ensayo-header">
                    <h3 class="ensayo-title">${ensayo.titulo}</h3>
                    <div class="ensayo-participants">
                        <span>🔬 ${ensayo.responsable}</span>
                        <span>✅ ${ensayo.validador}</span>
                    </div>
                </div>
                
                <div class="ensayo-progress">
                    <div class="progress-label">
                        <span>Progreso</span>
                        <span>${ensayo.progreso}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${ensayo.progreso}%"></div>
                    </div>
                </div>

                <p><strong>Hipótesis:</strong> ${ensayo.hipotesis}</p>
                
                <div class="ensayo-metrics">
                    <div class="metric-item">
                        <div class="metric-value">${ensayo.metrica}</div>
                        <div class="metric-label-small">Objetivo</div>
                    </div>
                    <div class="metric-item">
                        <div class="metric-value">${ensayo.roi}</div>
                        <div class="metric-label-small">ROI Esperado</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Cargar historias de éxito
    loadHistorias() {
        const container = document.getElementById('historias-container');
        if (!container) return;

        if (this.data.historias.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>🏆 Próximos éxitos</h3>
                    <p>Las primeras historias de impacto están por escribirse.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.historias
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .map((historia, index) => `
            <div class="historia-item">
                <div class="historia-date">
                    ${new Date(historia.fecha).getDate()}/${new Date(historia.fecha).getMonth() + 1}
                </div>
                <div class="historia-card">
                    <h3 class="historia-title">${historia.titulo}</h3>
                    <p><strong>Problema original:</strong> ${historia.problemaOriginal}</p>
                    <p><strong>Solución:</strong> ${historia.solucion}</p>
                    <div class="historia-impact">${historia.impacto}</div>
                    
                    ${historia.testimonios ? `
                        <blockquote style="font-style: italic; color: var(--color-text-secondary); margin: var(--spacing-md) 0;">
                            "${historia.testimonios}"
                        </blockquote>
                    ` : ''}
                    
                    <div class="historia-participants">
                        ${historia.participantes.map(participante => `
                            <span class="participant-tag">${participante}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Cargar red humana
    loadRedHumana() {
        const container = document.getElementById('red-container');
        if (!container) return;

        if (this.data.usuarios.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>👥 Construyendo la red</h3>
                    <p>La red humana está creciendo. ¡Pronto tendremos más colaboradores!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.usuarios.map(usuario => `
            <div class="team-card">
                <div class="team-avatar">
                    ${usuario.nombre.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <h3 class="team-name">${usuario.nombre}</h3>
                <p class="team-role">${usuario.rol} • ${usuario.area}</p>
                
                <div class="team-superpowers">
                    ${usuario.superpoderes.map(poder => `
                        <span class="superpower-tag">${poder}</span>
                    `).join('')}
                </div>
                
                <div class="team-stats">
                    <div class="stat-item">
                        <div class="stat-number">${usuario.aportesTotales}</div>
                        <div class="stat-label">Aportes</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${usuario.colaboracionesExito}</div>
                        <div class="stat-label">Éxitos</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${usuario.experiencia}</div>
                        <div class="stat-label">Años</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Obtener etiqueta de urgencia
    getUrgencyLabel(urgencia) {
        const labels = {
            5: 'CRÍTICO',
            4: 'ALTO',
            3: 'MEDIO',
            2: 'BAJO',
            1: 'MÍNIMO'
        };
        return labels[urgencia] || 'MEDIO';
    }

    // Actualizar métricas del footer
    updateFooterMetrics() {
        const problemasActivos = this.data.problemas.filter(p => p.estado !== 'Resuelto').length;
        const ensayosActivos = this.data.ensayos.length;
        const historiasExito = this.data.historias.length;

        const footerProblemas = document.getElementById('footer-problemas');
        const footerEnsayos = document.getElementById('footer-ensayos');
        const footerHistorias = document.getElementById('footer-historias');

        if (footerProblemas) footerProblemas.textContent = problemasActivos;
        if (footerEnsayos) footerEnsayos.textContent = ensayosActivos;
        if (footerHistorias) footerHistorias.textContent = historiasExito;
    }

    // Sincronizar datos con admin
    syncData() {
        const adminData = localStorage.getItem('ecosistema-data');
        if (adminData) {
            const parsedData = JSON.parse(adminData);
            if (JSON.stringify(parsedData) !== JSON.stringify(this.data)) {
                this.data = parsedData;
                this.loadSection(this.currentSection);
                this.updateFooterMetrics();
            }
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            z-index: 10000;
            font-weight: 500;
            max-width: 300px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 4000);
    }

    // Reportar nuevo problema
    submitProblema() {
        const nuevoProblema = {
            id: Date.now(),
            titulo: document.getElementById('modal-problema-titulo').value,
            descripcion: document.getElementById('modal-problema-descripcion').value,
            area: document.getElementById('modal-problema-area').value,
            reportero: document.getElementById('modal-problema-reportero').value || 'Anónimo',
            fecha: new Date().toISOString().split('T')[0],
            urgencia: parseInt(document.getElementById('modal-problema-urgencia').value),
            estado: 'Reportado',
            imagen: null
        };

        this.data.problemas.unshift(nuevoProblema);
        this.saveData();
        
        this.showNotification('Problema reportado exitosamente. ¡Gracias por tu aporte!', 'success');
        this.cerrarModalProblema();
        
        if (this.currentSection === 'voces') {
            this.loadProblemas();
        }
    }

    // Preview de foto
    previewFoto(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('foto-preview');
        
        if (file && preview) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    }

    // Cerrar modal de problema
    cerrarModalProblema() {
        const modal = document.getElementById('modal-problema');
        if (modal) {
            modal.classList.remove('active');
            document.getElementById('form-reporte-problema').reset();
            document.getElementById('foto-preview').innerHTML = '';
        }
    }
}

// Funciones globales
function reportarProblema() {
    const modal = document.getElementById('modal-problema');
    if (modal) {
        modal.classList.add('active');
    }
}

function cerrarModalProblema() {
    ecosistemaApp.cerrarModalProblema();
}

function verDetalleProblema(id) {
    const problema = ecosistemaApp.data.problemas.find(p => p.id === id);
    if (!problema) return;

    const modal = document.getElementById('modal-detalle-problema');
    const contenido = document.getElementById('detalle-contenido');
    const titulo = document.getElementById('detalle-titulo');

    if (modal && contenido && titulo) {
        titulo.textContent = problema.titulo;
        
        contenido.innerHTML = `
            <div class="problema-detalle">
                <div class="detalle-header">
                    <span class="problem-urgency problem-urgency--${problema.urgencia}">
                        ${ecosistemaApp.getUrgencyLabel(problema.urgencia)}
                    </span>
                    <span class="problem-status problem-status--${problema.estado.toLowerCase().replace(' ', '')}">
                        ${problema.estado}
                    </span>
                </div>
                
                <div class="detalle-meta">
                    <p><strong>📍 Área:</strong> ${problema.area}</p>
                    <p><strong>👤 Reportado por:</strong> ${problema.reportero}</p>
                    <p><strong>📅 Fecha:</strong> ${new Date(problema.fecha).toLocaleDateString()}</p>
                </div>
                
                <div class="detalle-descripcion">
                    <h4>Descripción</h4>
                    <p>${problema.descripcion}</p>
                </div>
                
                ${problema.imagen ? `
                    <div class="detalle-imagen">
                        <h4>Evidencia Fotográfica</h4>
                        <img src="${problema.imagen}" alt="Evidencia del problema" style="max-width: 100%; border-radius: 8px;">
                    </div>
                ` : ''}
                
                <div class="detalle-acciones" style="margin-top: 2rem; text-align: center;">
                    <button class="btn btn--primary" onclick="window.open('admin-panel.html#problemas', '_blank')">
                        Editar en Admin
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }
}

function cerrarModalDetalle() {
    const modal = document.getElementById('modal-detalle-problema');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Inicializar aplicación cuando cargue el DOM
let ecosistemaApp;
document.addEventListener('DOMContentLoaded', function() {
    ecosistemaApp = new EcosistemaApp();
    
    // Configurar cierre de modals con escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
            }
        }
    });
    
    // Configurar cierre de modals con click fuera
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    });
});