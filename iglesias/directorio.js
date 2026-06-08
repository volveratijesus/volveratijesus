// Shared directory logic
function buildCard(ig) {
  const sacsHtml = (ig.sac||[]).map(s=>`
    <div class="sac">
      <div class="sac-cargo">${s.cargo}</div>
      <div class="sac-nombre">${s.nombre}</div>
      ${s.info?`<div class="sac-info">${s.info}</div>`:''}
    </div>`).join('');

  const filialesHtml = (ig.filiales||[]).map(f=>`
    <div class="filial">
      <div class="filial-nombre">${f.n}</div>
      <div class="filial-info">${f.d?`📍 ${f.d}<br>`:''}${f.h?`⛪ ${f.h}`:''}${f.extra?`<br>${f.extra}`:''}</div>
    </div>`).join('');

  return `
  <div class="ig-card" data-search="${(ig.nombre+' '+(ig.cong||'')+' '+(ig.dir||'')).toLowerCase()}">
    <div class="ig-head" onclick="toggle(this.parentElement)">
      <span class="ig-ikon">${ig.ikon||'✝️'}</span>
      <div class="ig-meta">
        <div class="ig-nombre">${ig.nombre}</div>
        <div class="ig-sub">${ig.cong||'Parroquia'}</div>
      </div>
      <span class="ig-chev">▼</span>
    </div>
    <div class="ig-det">
      ${ig.dir?`<div class="det-row"><span class="det-ico">📍</span><div><span class="det-lbl">Dirección</span><span class="det-val">${ig.dir}</span></div></div>`:''}
      ${ig.oficina?`<div class="det-row"><span class="det-ico">🕐</span><div><span class="det-lbl">Oficina Parroquial</span><span class="det-val">${ig.oficina}</span></div></div>`:''}
      ${ig.misas?`<div class="det-row"><span class="det-ico">⛪</span><div><span class="det-lbl">Horarios de Misa</span><span class="det-val">${ig.misas}</span></div></div>`:''}
      ${ig.conf?`<div class="det-row"><span class="det-ico">🙏</span><div><span class="det-lbl">Confesiones</span><span class="det-val">${ig.conf}</span></div></div>`:''}
      ${ig.hs?`<div class="det-row"><span class="det-ico">🕯️</span><div><span class="det-lbl">Hora Santa</span><span class="det-val">${ig.hs}</span></div></div>`:''}
      ${(ig.tel||ig.mail||ig.web)?`<div class="det-row"><span class="det-ico">📞</span><div><span class="det-lbl">Contacto</span><span class="det-val">${ig.tel||''}${ig.mail?'<br><a href="mailto:'+ig.mail+'">'+ig.mail+'</a>':''}${ig.web?'<br><a href="https://'+ig.web+'" target="_blank">'+ig.web+'</a>':''}</span></div></div>`:''}
      ${sacsHtml?`<div class="det-row"><span class="det-ico">👤</span><div><span class="det-lbl">Sacerdotes</span><span class="det-val">${sacsHtml}</span></div></div>`:''}
      ${filialesHtml?`<div class="det-row"><span class="det-ico">🔗</span><div><span class="det-lbl">Filiales</span><span class="det-val">${filialesHtml}</span></div></div>`:''}
    </div>
  </div>`;
}

function renderSections(sections, containerId) {
  const el = document.getElementById(containerId);
  let html = '';
  sections.forEach(sec => {
    html += `<div class="zona-lbl">${sec.label}</div>`;
    sec.items.forEach(ig => { html += buildCard(ig); });
  });
  el.innerHTML = html;
}

function toggle(card) {
  const det = card.querySelector('.ig-det');
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.ig-card').forEach(c=>{c.classList.remove('open');c.querySelector('.ig-det').classList.remove('open');});
  if(!isOpen){card.classList.add('open');det.classList.add('open');setTimeout(()=>det.scrollIntoView({behavior:'smooth',block:'nearest'}),80);}
}

function filtrar(inputId, containerId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  document.querySelectorAll(`#${containerId} .ig-card`).forEach(c=>{
    c.style.display = (!q || c.dataset.search.includes(q)) ? '' : 'none';
  });
}
