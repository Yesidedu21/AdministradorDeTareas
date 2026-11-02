
const PRIORITY_LABELS = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};


function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}


function isSafeUrl(url) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

function crearEnlaceHTML(enlace) {
  if (!enlace || !isSafeUrl(enlace)) return "";

  return `
    <div class="task-link-container">
      <a href="${escapeHTML(enlace)}" target="_blank" rel="noopener noreferrer" class="task-link">🔗 Ver enlace adjunto</a>
    </div>`;
}

export function crearTarjetaHTML(tarea) {
  const prioridad = PRIORITY_LABELS[tarea.prioridad] ? tarea.prioridad : "medium";

  return `
    <div class="task-card" data-id="${tarea.id}">
      <div class="card-header-info">
        <h3 class="task-title">${escapeHTML(tarea.nombre)}</h3>
        <span class="badge-priority ${prioridad}">${PRIORITY_LABELS[prioridad]}</span>
      </div>

      <p class="task-description">${escapeHTML(tarea.descripcion)}</p>

      <div class="task-meta">
        <div class="meta-item"><span>👤</span> <span>${escapeHTML(tarea.asignadoA)}</span></div>
        <div class="meta-item"><span>📅</span> <span>${escapeHTML(tarea.fechaDeEntrega)}</span></div>
      </div>
      ${crearEnlaceHTML(tarea.enlace)}
      <div class="card-footer-info">
        <span class="badge-status">${escapeHTML(tarea.estado)}</span>
        <div>
          <button type="button" class="btn-action btn-update">Actualizar</button>
          <button type="button" class="btn-action btn-delete">Eliminar</button>
        </div>
      </div>
    </div>`;
}
