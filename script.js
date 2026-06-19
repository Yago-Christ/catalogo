/* =========================================================
   CATÁLOGO 3D — lógica de exibição
   Os produtos vêm do arquivo products.js.
   ========================================================= */

document.getElementById('footerYear').textContent = new Date().getFullYear();

let activeCategory = 'Todos';
let searchTerm = '';

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}
function escapeAttr(str){
  return (str ?? '').replace(/"/g, '&quot;');
}

// ---------- render: filtros ----------
function renderFilters(){
  const cats = ['Todos', ...new Set(PRODUCTS.map(p => p.category).filter(Boolean))];
  const container = document.getElementById('filterTags');
  container.innerHTML = '';
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'tag' + (cat === activeCategory ? ' active' : '');
    btn.textContent = cat;
    btn.onclick = () => { activeCategory = cat; renderFilters(); renderGrid(); };
    container.appendChild(btn);
  });
}

// ---------- render: grid de produtos ----------
function renderGrid(){
  const grid = document.getElementById('productGrid');
  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'Todos' || p.category === activeCategory;
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm) || (p.desc||'').toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });

  if(filtered.length === 0){
    grid.innerHTML = '<div class="empty-state"><p>Nenhum modelo encontrado com esse filtro.</p></div>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="card">
      <div class="card-image">
        ${p.image
          ? `<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}">`
          : `<div class="placeholder">foto do modelo<br>em breve</div>`}
      </div>
      <div class="card-body">
        <div class="card-name">${escapeHtml(p.name)}</div>
        <div class="card-desc">${escapeHtml(p.desc || '')}</div>
        <div class="card-meta">
          ${p.material ? `<span>${escapeHtml(p.material)}</span>` : ''}
          ${p.time ? `<span>${escapeHtml(p.time)}</span>` : ''}
          ${p.category ? `<span>${escapeHtml(p.category)}</span>` : ''}
        </div>
        <div class="card-footer">
          <div class="card-price">${p.price ? 'R$ ' + escapeHtml(p.price) : 'a combinar'}</div>
          <button class="btn-order" onclick="orderOnWhats('${escapeAttr(p.name)}')">Pedir →</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ---------- WhatsApp: pedido de modelo existente ----------
function orderOnWhats(productName){
  const msg = `Olá! Gostaria de pedir o modelo "${productName}" do catálogo.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ---------- WhatsApp: pedido personalizado ----------
function orderCustomOnWhats(){
  const msg = 'Olá! Gostaria de fazer um pedido personalizado que não está no catálogo. Posso te contar os detalhes?';
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

document.getElementById('btnCustomWhats').addEventListener('click', orderCustomOnWhats);
document.getElementById('navPersonalizado').addEventListener('click', orderCustomOnWhats);

// ---------- filtros: busca ----------
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchTerm = e.target.value.toLowerCase();
  renderGrid();
});

// ---------- toast (não usado nessa versão, mas disponível) ----------
function showToast(text){
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---------- init ----------
renderFilters();
renderGrid();
