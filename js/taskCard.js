// js/taskCard.js
// Responsable de UNA sola cosa: convertir una tarea en el HTML de su tarjeta.
// No toca el DOM ni el TaskManager.

// Etiquetas legibles para la prioridad (el value del select es low/medium/high)
const PRIORITY_LABELS = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

// Convierte caracteres especiales en texto seguro.
// Necesario porque ahora insertamos HTML como string: sin esto, si alguien
// escribe <script> o <img onerror=...> en el nombre, se ejecutaría.
function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Solo permite enlaces http/https (un input type="url" también acepta
// cosas como "javascript:...", que no queremos en un href).
function isSafeUrl(url) {
  try {
    const { protocol } = new URL(url);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

// El enlace es opcional: si no hay (o no es seguro), no se dibuja nada
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
        <button type="button" class="btn-action btn-delete">Eliminar</button>
      </div>
    </div>`;
}
