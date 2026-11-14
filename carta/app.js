/* ============================ Código de la página ============================ */
const $ = s => document.querySelector(s);

// Hero + footer
$('#locBadge').textContent = '📍 ' + INFO.direccion;
$('#addr').textContent  = '📍 ' + INFO.direccion;
$('#hours').textContent = '🕘 ' + INFO.horario;
$('#fb').textContent    = 'Facebook: ' + INFO.facebook;

// Fotos del hero (cambian solas) y galería
const FOTOS = [
  ["ceviche","Ceviche"],["chicharron","Chicharrón"],["chupe","Chupe"],
  ["arroz","Arroz con mariscos"],["milanesa","Milanesa de pollo"],["seco","De la carta de carnes"]
];
(() => {
  const box = $('#heroSlider');
  FOTOS.forEach(([k,n]) => { const i = document.createElement('img'); i.src = IMG[k]; i.alt = n; box.appendChild(i); });
  const imgs = [...box.children]; let cur = 0; imgs[0].classList.add('on');
  setInterval(() => { imgs[cur].classList.remove('on'); cur = (cur + 1) % imgs.length; imgs[cur].classList.add('on'); }, 3500);

  const grid = $('#gGrid'), lb = $('#lb'), lbImg = lb.querySelector('img');
  FOTOS.forEach(([k,n]) => {
    const d = document.createElement('div'); d.className = 'g-item';
    d.innerHTML = `<img src="${IMG[k]}" alt="${n}" loading="lazy"><span>${n}</span>`;
    d.onclick = () => { lbImg.src = IMG[k]; lb.classList.add('on'); };
    grid.appendChild(d);
  });
  lb.onclick = () => lb.classList.remove('on');
  const gio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); gio.unobserve(e.target); } }), { threshold: .1 });
  grid.querySelectorAll('.g-item').forEach(g => gio.observe(g));
})();

// Burbujas
(() => {
  const hero = document.querySelector('.hero');
  for (let i = 0; i < 14; i++) {
    const b = document.createElement('span');
    b.className = 'bubble';
    const s = 8 + Math.random() * 30;
    b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;` +
                      `animation-duration:${6 + Math.random()*8}s;animation-delay:${-Math.random()*10}s`;
    hero.appendChild(b);
  }
})();

// Construir menú y nav
const menu = $('#menu'), nav = $('#nav');
const fmt = p => (p === null || p === undefined) ? '' : p;

PRECIOS.forEach(sec => {
  // chip
  const a = document.createElement('a');
  a.className = 'chip'; a.href = '#' + sec.id; a.textContent = sec.titulo;
  nav.appendChild(a);

  // sección
  const el = document.createElement('section');
  el.className = 'section' + (sec.weekend ? ' weekend' : '');
  el.id = sec.id;

  let html = '';
  if (sec.foto && IMG[sec.foto]) {
    html += `<div class="photo-strip"><img src="${IMG[sec.foto]}" alt="${sec.titulo}" loading="lazy"><h2>${sec.titulo}</h2></div>`;
  } else {
    html += `<div class="title-only"><h2>${sec.titulo}</h2>${sec.weekend ? '<span class="ribbon">Sáb · Dom</span>' : ''}</div>`;
  }
  if (sec.tamanos) html += `<div class="cols">${sec.tamanos.map(t => `<span>${t}</span>`).join('')}</div>`;

  html += '<ul class="items">';
  sec.items.forEach(([nombre, precios, nota]) => {
    let cells;
    if (!precios.length) {
      cells = `<span class="price ask">Consultar</span>`;
    } else if (sec.tamanos) {
      cells = sec.tamanos.map((_, i) => {
        const v = fmt(precios[i]);
        return v === '' ? `<span class="price empty">—</span>` : `<span class="price">${v}</span>`;
      }).join('');
    } else {
      cells = `<span class="price">${precios[0]}</span>`;
    }
    html += `<li class="item" data-t="${(nombre + ' ' + (nota || '')).toLowerCase()}">
               <span class="name">${nombre}${nota ? `<span class="note">${nota}</span>` : ''}</span>${cells}
             </li>`;
  });
  html += '</ul>';
  el.innerHTML = html;
  menu.appendChild(el);
});

const gchip = document.createElement('a');
gchip.className = 'chip'; gchip.href = '#galeria'; gchip.textContent = 'Galería';
nav.appendChild(gchip);

// Aparecer al hacer scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .08 });
document.querySelectorAll('.section').forEach(s => io.observe(s));

// Chip activo según scroll
const chips = [...nav.children];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    chips.forEach(c => c.classList.toggle('active', c.getAttribute('href') === '#' + e.target.id));
    const act = chips.find(c => c.classList.contains('active'));
    if (act) nav.scrollTo({ left: act.offsetLeft - 20, behavior: 'smooth' });
  }
}), { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('.section').forEach(s => spy.observe(s));

// Buscador
$('#q').addEventListener('input', e => {
  const t = e.target.value.trim().toLowerCase();
  let total = 0;
  document.querySelectorAll('.section').forEach(sec => {
    let vis = 0;
    sec.querySelectorAll('.item').forEach(li => {
      const ok = !t || li.dataset.t.includes(t) || sec.id.includes(t) ||
                 sec.querySelector('h2').textContent.toLowerCase().includes(t);
      li.classList.toggle('hide', !ok);
      if (ok) vis++;
    });
    sec.classList.toggle('hide', vis === 0);
    if (vis) sec.classList.add('show');
    total += vis;
  });
  $('#empty').style.display = total ? 'none' : 'block';
});

// Volver arriba
const topBtn = $('#top');
addEventListener('scroll', () => topBtn.classList.toggle('on', scrollY > 600));
topBtn.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
