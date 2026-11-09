/* IP7 × Grupo Vardí — lógica del sitio (sin dependencias) */

const CART_KEY = "ip7_vardi_cart";
const CATAPROM_URL = "https://ip7.cataprom.com/producto-cataprom/";
const MARKETING_EMAIL = "Mercadeo@ip7.com.co";

const ADVISORS = [
  { id: "elizabeth-leon", name: "Elizabeth León", email: "ejecutivo.comercial5@ip7.com.co" },
];

document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const brandById = (id) => BRANDS.find((b) => b.id === id);
  const productById = (id) => PRODUCTS.find((p) => p.id === id);
  const kitById = (id) => KITS.find((k) => k.id === id);
  const WORKS_LIST = typeof WORKS !== "undefined" ? WORKS : [];
  const workById = (id) => WORKS_LIST.find((w) => w.id === id);
  const workImg = (w) => (w.img ? `assets/img/trabajos/${w.img}` : "");
  const itemOf = (l) => (l.type === "kit" ? kitById(l.id) : l.type === "work" ? workById(l.id) : productById(l.id));
  const catById = (id) => CATEGORIES.find((c) => c.id === id);
  const companyById = (id) => COMPANIES.find((c) => c.id === id);
  const imgOf = (p) => `assets/img/productos/${p.id}.jpg`;
  const minQty = (p) => (p && p.minQty) || DEFAULT_MIN_QTY;
  const parseColors = (s) => (s || "").split("|").filter(Boolean).map((c) => { const [name, hex] = c.split(":"); return { name, hex }; });
  const swatchesHTML = (s) => parseColors(s).map((c) => `<span class="swatch" style="background:${esc(c.hex)}" title="${esc(c.name)}"></span>`).join("");

  const state = { brand: "all", cat: "all", q: "", shown: 24 };

  /* ------------------------------ toast ------------------------------ */
  let toastT;
  const showToast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("is-show"), 2800);
  };

  /* ------------------------------ header ------------------------------ */
  const topbar = $("#topbar");
  const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------ luces altas / luces bajas ------------------------------ */
  const THEME_KEY = "ip7_vardi_theme";
  const applyTheme = (t) => {
    if (t === "dark") document.documentElement.dataset.theme = "dark"; else delete document.documentElement.dataset.theme;
    $$("[data-theme-set]").forEach((b) => { const on = b.dataset.themeSet === (t === "dark" ? "dark" : "light"); b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
  };
  applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  $$("[data-theme-set]").forEach((b) => b.addEventListener("click", () => {
    const t = b.dataset.themeSet; applyTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch (err) {}
    showToast(t === "dark" ? "Luces bajas encendidas 🌙" : "Luces altas encendidas ☀️");
  }));

  /* ------------------------------ hero ------------------------------ */

  const stage = $("#heroStage");
  const dots = $("#heroDots");
  const HERO_ART = [
    { img: "assets/img/portada/sedan.svg", name: "Sedán", tag: "Entregas de vehículo" },
    { img: "assets/img/portada/suv.svg", name: "SUV", tag: "Lanzamientos y test drive" },
    { img: "assets/img/portada/electrico.svg", name: "Eléctrico", tag: "Movilidad eléctrica" },
    { img: "assets/img/portada/pickup.svg", name: "Pick-up", tag: "Posventa y flotas" },
  ];
  HERO_ART.forEach((b, i) => {
    const s = document.createElement("div");
    s.className = `hero-slide${i === 0 ? " is-active" : ""}`;
    s.innerHTML = `<img src="${b.img}" alt="Ilustración ${esc(b.name)}" />
      <div class="hero-slide__tag"><span>${esc(b.tag)}</span></div>`;
    stage.insertBefore(s, dots);
    const d = document.createElement("button");
    d.setAttribute("aria-label", `Ver ${b.name}`);
    if (i === 0) d.classList.add("is-active");
    d.addEventListener("click", () => { go(i); restart(); });
    dots.appendChild(d);
  });
  let cur = 0, heroT;
  const go = (i) => {
    const slides = $$(".hero-slide", stage);
    slides[cur].classList.remove("is-active"); dots.children[cur].classList.remove("is-active");
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add("is-active"); dots.children[cur].classList.add("is-active");
  };
  const restart = () => { clearInterval(heroT); heroT = setInterval(() => go(cur + 1), 4200); };
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) restart();


  /* ------------------------------ marcas ------------------------------ */
  const countFor = (brandId) => PRODUCTS.filter((p) => p.brands.includes(brandId)).length;
  const worksFor = (brandId) => WORKS_LIST.filter((w) => w.brand === brandId).length;
  $("#brandGrid").innerHTML = BRANDS.map((b) => {
    const media = b.photo
      ? `<div class="brand-card__media${b.photoFit === "contain" ? " fit-contain" : ""}" style="--brand:${b.color}"><img src="${b.photo}" alt="${esc(b.name)}" loading="lazy"${b.photoPos ? ` style="object-position:${b.photoPos}"` : ""} />`
      : `<div class="brand-card__media no-photo"><span class="shield" aria-hidden="true">🛡️</span>`;
    return `<article class="brand-card reveal">
      ${media}
        <div class="brand-card__logo"><img src="${b.logo}" alt="${esc(b.name)}" />${b.logoLabel ? `<span class="logo-label">${b.logoLabel}</span>` : ""}${b.electric ? '<span class="badge-ev">⚡<span> Eléctricos</span></span>' : ""}</div>
      </div>
      <div class="brand-card__body">
        <h3>${esc(b.name)}</h3>
        <p class="brand-card__kind">${esc(b.kind)}</p>
        <div class="chips">${b.models.map((m) => `<span class="chip">${esc(m)}</span>`).join("")}</div>
        <div class="brand-card__actions">
          ${worksFor(b.id) ? `<button class="btn btn--navy" data-wbrand-go="${b.id}">Ver ${worksFor(b.id)} trabajos</button>` : `<a class="btn btn--navy" href="#catalogo">Ver productos</a>`}
          <a class="site" href="${b.url}" target="_blank" rel="noopener">Sitio web ↗</a>
        </div>
      </div>
    </article>`;
  }).join("");


  /* ------------------------------ kits ------------------------------ */
  $("#kitGrid").innerHTML = KITS.map((k) => {
    const items = k.items.map(productById).filter(Boolean);
    return `<article class="kit reveal">
      <div class="kit__mosaic">${items.slice(0, 4).map((p) => `<img src="${imgOf(p)}" alt="" loading="lazy" />`).join("")}</div>
      <div class="kit__body">
        <h3>${esc(k.name)}</h3>
        <p>${esc(k.tagline)}</p>
        <ul>${items.map((p) => `<li>${esc(p.name)}</li>`).join("")}</ul>
        <button class="btn btn--navy" data-add-kit="${k.id}">+ Agregar kit</button>
      </div>
    </article>`;
  }).join("");

  /* ------------------------------ trabajos realizados ------------------------------ */
  const workState = { brand: "all", shown: 12 };
  const fmt = (n) => n.toLocaleString("es-CO");
  const workBrands = (typeof WORK_BRANDS !== "undefined" ? WORK_BRANDS : []).filter((b) => WORKS_LIST.some((w) => w.brand === b.id));
  const totalUnits = WORKS_LIST.reduce((s, w) => s + (w.qty || 0), 0);
  if ($("#workSummary")) $("#workSummary").innerHTML = `<b>${WORKS_LIST.length}</b> productos marcados · <b>${fmt(totalUnits)}</b> unidades entregadas · <b>${new Set(WORKS_LIST.map((w) => w.technique)).size}</b> técnicas de marcación`;

  const mediaBadge = (w) => { const n = [w.img, ...(w.gallery || []), ...(w.montajes || [])].filter(Boolean).length; return (n > 1 || w.video) ? `<span class="work__media">${n > 1 ? `📷 ${n}` : ""}${w.video ? `${n > 1 ? " · " : ""}▶ Video` : ""}</span>` : ""; };
  const workCard = (w) => `<article class="work">
      <button class="work__img${w.img ? "" : " work__img--ph"}${w.fit === "cover" ? " is-cover" : ""}" data-work-open="${w.id}" aria-label="Ver ${esc(w.name)}">
        ${w.img ? `<img src="${workImg(w)}" alt="${esc(w.name)}" loading="lazy" />` : `<span class="ph-brand">${esc(w.brandName)}</span><span class="ph-tech">${esc(w.technique)}</span><span class="ph-note">Montaje por cargar</span>`}
        ${w.refPhoto ? `<span class="work__note">Foto de referencia</span>` : ""}
        ${mediaBadge(w)}
      </button>
      <div class="work__body">
        <div class="work__tags"><span class="tag-brand">${esc(w.brandName)}</span><span class="tag-tech">${esc(w.technique)}</span></div>
        <h3>${esc(w.name)}</h3>
        <p class="work__meta">REF ${esc(w.ref)}${w.qty ? ` · <b>${fmt(w.qty)}</b> und.` : ""}</p>
        <button class="btn btn--outline btn--sm" data-work-add="${w.id}">🔁 Volver a pedir</button>
      </div>
    </article>`;

  const renderWorks = () => {
    const grid = $("#workGrid"); if (!grid) return;
    const rank = (w) => (w.img && !w.refPhoto ? 0 : w.img ? 1 : 2);
    const list = WORKS_LIST.filter((w) => workState.brand === "all" || w.brand === workState.brand)
      .map((w, i) => [w, i]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map((x) => x[0]);
    grid.innerHTML = list.slice(0, workState.shown).map(workCard).join("");
    const more = $("#workMore");
    more.hidden = list.length <= workState.shown;
    more.textContent = `Ver más trabajos (${list.length - workState.shown})`;
    $("#workFilters").innerHTML = `<button class="fcat${workState.brand === "all" ? " is-active" : ""}" data-wbrand="all">Todos <span class="n">${WORKS_LIST.length}</span></button>` +
      workBrands.map((b) => `<button class="fcat${workState.brand === b.id ? " is-active" : ""}" data-wbrand="${b.id}">${esc(b.name)} <span class="n">${WORKS_LIST.filter((w) => w.brand === b.id).length}</span></button>`).join("");
  };
  if ($("#workGrid")) {
    $("#workFilters").addEventListener("click", (e) => { const b = e.target.closest("[data-wbrand]"); if (!b) return; workState.brand = b.dataset.wbrand; workState.shown = 12; renderWorks(); });
    $("#workMore").addEventListener("click", () => { workState.shown += 12; renderWorks(); });
    $("#workGrid").addEventListener("click", (e) => {
      const add = e.target.closest("[data-work-add]");
      if (add) { addLine("work", add.dataset.workAdd, "work"); add.textContent = "✓ Agregado"; setTimeout(() => { add.textContent = "🔁 Volver a pedir"; }, 1400); return; }
      const open = e.target.closest("[data-work-open]");
      if (open) openWork(open.dataset.workOpen);
    });
  }

  // tarjetas de marca → muestran los trabajos de esa marca
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-wbrand-go]"); if (!b) return;
    workState.brand = b.dataset.wbrandGo; workState.shown = 12; renderWorks();
    $("#workFilters").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  let wmCurrent = null, wmMedia = [];
  const showMedia = (i) => {
    const m = wmMedia[i]; if (!m) return;
    $("#wmMain").innerHTML = m.type === "video"
      ? `<video src="${m.src}" poster="${m.poster}" controls autoplay muted loop playsinline></video>`
      : `<img src="${m.src}" alt="" />`;
    $$("#wmThumbs button").forEach((x) => x.classList.toggle("is-active", +x.dataset.wmI === i));
  };
  const openWork = (id) => {
    const w = workById(id); wmCurrent = w;
    const media = [w.img, ...(w.gallery || [])].filter(Boolean).map((f) => ({ type: "img", src: `assets/img/trabajos/${f}` }))
      .concat(w.video ? [{ type: "video", src: `assets/img/trabajos/${w.video}`, poster: `assets/img/trabajos/${w.video.replace(/.mp4$/, ".jpg")}` }] : [])
      .concat((w.montajes || []).map((f) => ({ type: "img", src: `assets/img/trabajos/montajes/${f}` })));
    wmMedia = media;
    showMedia(0);
    $("#wmThumbs").innerHTML = media.length > 1 ? media.map((m, i) => `<button data-wm-i="${i}" class="${i ? "" : "is-active"}${m.type === "video" ? " is-video" : ""}" aria-label="${m.type === "video" ? "Ver video" : "Ver foto " + (i + 1)}"><img src="${m.type === "video" ? m.poster : m.src}" alt="" /></button>`).join("") : "";
    $("#wmTags").innerHTML = `<span class="tag-brand">${esc(w.brandName)}</span><span class="tag-tech">${esc(w.technique)}</span>`;
    $("#wmTitle").textContent = w.name;
    $("#wmRows").innerHTML = [
      ["Referencia", w.ref], ["Técnica", w.technique], ["Detalle de marcación", w.detail], ["Colores", w.colors],
      ["Unidades producidas", w.qty ? fmt(w.qty) : ""],
    ].filter((r) => r[1]).map((r) => `<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join("");
    $("#wmNote").hidden = !w.refPhoto;
    const sheet = $("#wmSheet");
    sheet.hidden = !w.cp; if (w.cp) sheet.href = CATAPROM_URL + w.cp;
    openModal($("#workModal"));
  };
  if ($("#workModal")) {
    $("#wmThumbs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-wm-i]"); if (!b) return;
      showMedia(+b.dataset.wmI);
    });
    $("#wmAdd").addEventListener("click", () => { if (!wmCurrent) return; addLine("work", wmCurrent.id, "work"); closeModal($("#workModal")); });
  }

  /* ------------------------------ filtros ------------------------------ */
  const brandFilters = $("#brandFilters");
  brandFilters.innerHTML = `<button class="fbrand is-active" data-fbrand="all">Todas las marcas</button>` +
    BRANDS.map((b) => `<button class="fbrand" data-fbrand="${b.id}" title="${esc(b.name)}"><img src="${b.logo}" alt="${esc(b.name)}" />${b.logoLabel ? `<span class="logo-label">${b.logoLabel}</span>` : ""}</button>`).join("");

  const renderCats = () => {
    const base = PRODUCTS.filter((p) => state.brand === "all" || p.brands.includes(state.brand));
    $("#catFilters").innerHTML = `<button class="fcat${state.cat === "all" ? " is-active" : ""}" data-fcat="all">Todos <span class="n">${base.length}</span></button>` +
      CATEGORIES.map((c) => {
        const n = base.filter((p) => p.category === c.id).length;
        return `<button class="fcat${state.cat === c.id ? " is-active" : ""}" data-fcat="${c.id}">${c.emoji} ${esc(c.name)} <span class="n">${n}</span></button>`;
      }).join("");
  };

  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const filtered = () => {
    const words = norm(state.q).split(/\s+/).filter(Boolean);
    return PRODUCTS.filter((p) =>
      (state.brand === "all" || p.brands.includes(state.brand)) &&
      (state.cat === "all" || p.category === state.cat) &&
      words.every((w) => norm(`${p.name} ${p.ref} ${p.why}`).includes(w)));
  };

  const renderProducts = () => {
    const list = filtered();
    const b = brandById(state.brand);
    $("#resultInfo").textContent = `${list.length} producto${list.length === 1 ? "" : "s"}`;
    $("#emptyState").hidden = list.length > 0;
    const more = $("#productMore"); more.hidden = list.length <= state.shown; more.textContent = `Ver más productos (${list.length - state.shown})`;
    $("#productGrid").innerHTML = list.slice(0, state.shown).map((p) => {
      const c = catById(p.category);
      const forNames = p.brands.length === ALL.length ? ["Todas las marcas"] : p.brands.map((id) => brandById(id).name);
      return `<article class="product">
        <button class="product__img" data-open="${p.id}" aria-label="Ver ${esc(p.name)}">
          <img src="${imgOf(p)}" alt="${esc(p.name)}" loading="lazy" />
          <span class="product__cat" style="background:${c.color}">${c.emoji} ${esc(c.name)}</span>
        </button>
        <div class="product__body">
          <span class="product__ref">REF ${esc(p.ref)}</span>
          <h3>${esc(p.name)}</h3>
          <p class="product__why">${esc(p.why)}</p>
          <div class="swatches">${swatchesHTML(p.colors)}</div>
          <div class="product__foot"><button class="btn btn--navy" data-add="${p.id}">+ Agregar</button></div>
        </div>
      </article>`;
    }).join("");
  };

  const setBrand = (id, scroll) => {
    state.brand = id;
    state.cat = "all"; state.shown = 24;
    $$(".fbrand").forEach((el) => el.classList.toggle("is-active", el.dataset.fbrand === id));
    renderCats();
    renderProducts();
    if (scroll) $("#catalogo").scrollIntoView({ behavior: "smooth" });
  };

  brandFilters.addEventListener("click", (e) => { const btn = e.target.closest("[data-fbrand]"); if (btn) setBrand(btn.dataset.fbrand); });
  $("#catFilters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-fcat]"); if (!btn) return;
    state.cat = btn.dataset.fcat; state.shown = 24; renderCats(); renderProducts();
  });
  let qT;
  $("#productMore").addEventListener("click", () => { state.shown += 24; renderProducts(); });
  $("#searchInput").addEventListener("input", (e) => { clearTimeout(qT); qT = setTimeout(() => { state.q = e.target.value; state.shown = 24; renderProducts(); }, 150); });

  // botones "ver productos de marca X" en tarjetas de marca y empresas
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-brand]");
    if (b) setBrand(b.dataset.brand, true);
  });

  /* ------------------------------ carrito ------------------------------ */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (err) { cart = []; }
  cart = cart.filter((l) => itemOf(l));
  cart.forEach((l) => { const it = itemOf(l); if (l.type !== "work" && l.brand) { l.brand = ""; l.key = `${l.type}:${l.id}:${l.brand}`; } });
  const save = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));
  const keyOf = (type, id, brand) => `${type}:${id}:${brand}`;

  const addLine = (type, id, brand) => {
    const item = itemOf({ type, id });
    const key = keyOf(type, id, brand);
    const ex = cart.find((l) => l.key === key);
    const step = type === "product" ? minQty(item) : DEFAULT_MIN_QTY;
    if (ex) ex.qty += step;
    else cart.push({ key, type, id, brand, qty: step });
    save(); renderCart();
    const btn = $("#cartBtn"); btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump"); const fab = $("#cartFab"); fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump");
    const bn = type === "work" ? { name: item.brandName } : brandById(brand);
    showToast(`${item.name} agregado${bn ? ` · logo ${bn.name}` : ""}`);
  };

  // marca por defecto al agregar: la del filtro activo (si el producto le sirve) o la primera de su lista
  const defaultBrand = (brands) => (state.brand !== "all" && brands.includes(state.brand) ? state.brand : brands[0]);

  const brandOptions = (brands, sel) => brands.map((id) => `<option value="${id}"${id === sel ? " selected" : ""}>${esc(brandById(id).name)}</option>`).join("");

  const renderCart = () => {
    const n = cart.length;
    $("#cartCount").textContent = n;
    $("#cartFabCount").textContent = n; $("#cartFab").classList.toggle("has-items", n > 0);
    const list = $("#cartList");
    if (!n) { list.innerHTML = `<p class="cart-empty">Aún no has agregado productos.<br />Explora el catálogo o los kits sugeridos.</p>`; return; }
    list.innerHTML = cart.map((l, i) => {
      const isKit = l.type === "kit";
      const isWork = l.type === "work";
      const item = itemOf(l);
      const img = isKit
        ? `<div class="line__img line__img--kit">${item.items.slice(0, 4).map((pid) => `<img src="${imgOf(productById(pid))}" alt="" />`).join("")}</div>`
        : isWork
          ? (item.img ? `<img class="line__img" src="${workImg(item)}" alt="" />` : `<div class="line__img line__img--ph">🔁</div>`)
          : `<img class="line__img" src="${imgOf(item)}" alt="" />`;
      return `<div class="line" data-i="${i}">
        ${img}
        <div>
          <h4>${isWork ? "Volver a pedir: " : ""}${esc(item.name)}</h4>
          <small>${isKit ? `Kit · ${item.items.length} productos` : `REF ${esc(item.ref)}${isWork ? " · " + esc(item.technique) : ""}`}</small>
          ${isWork ? `<small>Logo: ${esc(item.brandName)}</small>` : ""}
          <div class="qty">
            <button data-dec aria-label="Menos">−</button>
            <input type="number" min="${DEFAULT_MIN_QTY}" step="1" value="${l.qty}" data-qty aria-label="Cantidad" />
            <button data-inc aria-label="Más">+</button>
            <small>und.</small>
          </div>
        </div>
        <button class="line__rm" data-rm aria-label="Quitar">✕</button>
      </div>`;
    }).join("");
  };

  $("#cartList").addEventListener("click", (e) => {
    const line = e.target.closest(".line"); if (!line) return;
    const l = cart[+line.dataset.i];
    const step = DEFAULT_MIN_QTY;
    if (e.target.closest("[data-rm]")) cart.splice(+line.dataset.i, 1);
    else if (e.target.closest("[data-inc]")) l.qty += step;
    else if (e.target.closest("[data-dec]")) l.qty = Math.max(DEFAULT_MIN_QTY, l.qty - step);
    else return;
    save(); renderCart();
  });
  $("#cartList").addEventListener("change", (e) => {
    const line = e.target.closest(".line"); if (!line) return;
    const l = cart[+line.dataset.i];
    if (e.target.matches("[data-qty]")) {
      const v = parseInt(e.target.value, 10);
      l.qty = Number.isFinite(v) ? Math.max(DEFAULT_MIN_QTY, v) : DEFAULT_MIN_QTY;
      if (v < DEFAULT_MIN_QTY) showToast(`La cantidad mínima es ${DEFAULT_MIN_QTY} unidades.`);
    }
    if (e.target.matches("[data-brand-sel]")) {
      const newKey = keyOf(l.type, l.id, e.target.value);
      const dup = cart.find((x) => x.key === newKey && x !== l);
      if (dup) { dup.qty += l.qty; cart.splice(+line.dataset.i, 1); }
      else { l.brand = e.target.value; l.key = newKey; }
    }
    save(); renderCart();
  });
  $("#clearCart").addEventListener("click", () => { cart = []; save(); renderCart(); });
  $("#minQtyLabel").textContent = DEFAULT_MIN_QTY;

  const drawer = $("#drawer"), overlay = $("#overlay");
  const openDrawer = () => { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); overlay.hidden = false; };
  const closeDrawer = () => { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); overlay.hidden = true; };
  $("#cartBtn").addEventListener("click", openDrawer);
  $("#cartFab").addEventListener("click", openDrawer);
  $("#drawerClose").addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  /* agregar desde tarjetas */
  $("#productGrid").addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      const p = productById(add.dataset.add);
      addLine("product", p.id, "");
      add.classList.add("is-added"); add.textContent = "✓ Agregado";
      setTimeout(() => { add.classList.remove("is-added"); add.textContent = "+ Agregar"; }, 1400);
      return;
    }
    const open = e.target.closest("[data-open]");
    if (open) openProduct(open.dataset.open);
  });
  $("#kitGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-add-kit]"); if (!b) return;
    const k = kitById(b.dataset.addKit);
    addLine("kit", k.id, "");
  });

  /* ------------------------------ modal producto ------------------------------ */
  const openModal = (m) => { m.hidden = false; document.body.style.overflow = "hidden"; };
  const closeModal = (m) => { m.querySelectorAll("video").forEach((v) => v.pause()); m.hidden = true; document.body.style.overflow = ""; };
  $$(".modal").forEach((m) => {
    m.addEventListener("click", (e) => { if (e.target === m || e.target.closest("[data-close]")) closeModal(m); });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    $$(".modal").forEach((m) => { if (!m.hidden) closeModal(m); });
    closeDrawer();
  });

  let pmCurrent = null;
  const openProduct = (id) => {
    const p = productById(id); pmCurrent = p;
    $("#pmImg").src = imgOf(p); $("#pmImg").alt = p.name;
    $("#pmRef").textContent = `REF ${p.ref} · ${catById(p.category).name}`;
    $("#pmTitle").textContent = p.name;
    $("#pmWhy").textContent = p.why;
    $("#pmColors").innerHTML = parseColors(p.colors).map((c) => `<span class="chip"><span class="swatch" style="display:inline-block;vertical-align:-3px;background:${esc(c.hex)}"></span> ${esc(c.name)}</span>`).join("");
    $("#pmBrands").innerHTML = p.brands.map((b) => `<span>${esc(brandById(b).name)}</span>`).join("");
    $("#pmBrandSel").innerHTML = brandOptions(p.brands, defaultBrand(p.brands));
    $("#pmSheet").hidden = !p.cp; if (p.cp) $("#pmSheet").href = CATAPROM_URL + p.cp;
    $("#pmColors").parentElement.hidden = !p.colors;
    openModal($("#productModal"));
  };
  $("#pmAdd").addEventListener("click", () => {
    if (!pmCurrent) return;
    addLine("product", pmCurrent.id, "");
    closeModal($("#productModal"));
  });

  /* ------------------------------ cotización ------------------------------ */
  $("#fMarca").innerHTML = `<option value="">Varias / todas</option>` + BRANDS.map((b) => `<option value="${b.id}">${esc(b.name)}</option>`).join("");
  $("#fAsesor").innerHTML = ADVISORS.map((a) => `<option value="${a.id}">${esc(a.name)}</option>`).join("");
  $("#advisorName").textContent = ADVISORS[0].name;
  $("#fAsesor").value = ADVISORS[0].id;

  const openQuote = () => {
    closeDrawer();
    if (state.brand !== "all") $("#fMarca").value = state.brand;
    $("#formError").hidden = true;
    openModal($("#quoteModal"));
  };
  $("#quoteBtn").addEventListener("click", () => {
    if (!cart.length) { showToast("Agrega al menos un producto o kit."); return; }
    openQuote();
  });
  $("#ctaQuote").addEventListener("click", openQuote);

  const form = $("#quoteForm");
  const getFormData = () => Object.fromEntries(new FormData(form).entries());
  const validateForm = () => {
    let ok = true;
    $$("[required]", form).forEach((el) => {
      const bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.classList.toggle("invalid", bad); if (bad) ok = false;
    });
    if (!cart.length) ok = false;
    $("#formError").hidden = ok;
    return ok;
  };
  const advisorById = (id) => ADVISORS.find((a) => a.id === id);

  const buildMessage = (d, advisor) => {
    const marca = brandById(d.marca);
    const lines = cart.map((l, i) => {
      const isKit = l.type === "kit";
      const item = itemOf(l);
      if (l.type === "work") return `${i + 1}. VOLVER A PEDIR: ${item.name} (REF ${item.ref}) — ${l.qty} und. — ${item.technique} — Logo: ${item.brandName}`;
      const head = `${i + 1}. ${isKit ? item.name.toUpperCase() : item.name + " (REF " + item.ref + ")"} — ${l.qty} und.${brandById(l.brand) ? " — Logo: " + brandById(l.brand).name : ""}`;
      return isKit ? `${head}\n   Incluye: ${item.items.map((pid) => { const p = productById(pid); return `${p.name} (${p.ref})`; }).join(", ")}` : head;
    });
    return [
      `Hola${advisor ? " " + advisor.name : ""},`,
      "",
      "Quiero solicitar una cotización desde el catálogo IP7 × Grupo Vardí:",
      "",
      `Marca principal: ${marca ? marca.name : "Varias"}`,
      `Nombre: ${d.nombre}${d.cargo ? " — " + d.cargo : ""}`,
      `Correo: ${d.correo}`,
      `Teléfono: ${d.telefono}`,
      d.ciudad ? `Ciudad / vitrina: ${d.ciudad}` : "",
      d.fecha ? `Fecha requerida: ${d.fecha}` : "",
      "",
      "PRODUCTOS:",
      ...lines,
      "",
      d.notas ? `Comentarios: ${d.notas}` : "",
      "",
      "Gracias.",
    ].filter((x, i, arr) => !(x === "" && arr[i - 1] === "")).join("\n");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = getFormData();
    const advisor = advisorById(data.asesor);
    const to = advisor ? advisor.email : MARKETING_EMAIL;
    const cc = [...new Set([...(advisor && advisor.cc ? advisor.cc : []), MARKETING_EMAIL])].filter((m) => m.toLowerCase() !== to.toLowerCase());
    const subject = encodeURIComponent(`Solicitud de cotización — Grupo Vardí${data.marca ? " — " + brandById(data.marca).name : ""}`);
    const body = encodeURIComponent(buildMessage(data, advisor));
    const ccPart = cc.length ? `cc=${cc.join(",")}&` : "";
    window.location.href = `mailto:${to}?${ccPart}subject=${subject}&body=${body}`;
    showToast(`Abriendo tu correo para enviar la solicitud a ${advisor ? advisor.name : "IP7"}…`);
  });
  $("#copyRequestBtn").addEventListener("click", async () => {
    if (!validateForm()) return;
    const data = getFormData();
    try { await navigator.clipboard.writeText(buildMessage(data, advisorById(data.asesor))); showToast("Solicitud copiada."); }
    catch (err) { showToast("No se pudo copiar automáticamente."); }
  });

  /* ------------------------------ scroll reveal ------------------------------ */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.12 })
    : null;
  const observe = () => $$(".reveal:not(.is-in)").forEach((el) => (io ? io.observe(el) : el.classList.add("is-in")));

  const ALLIES = ["Stanley", "Mario Hernández", "Arturo Calle", "Ralph Lauren", "Lacoste", "Adidas", "Juan Valdez", "Café Quindío", "Decathlon", "Brisa", "Nike", "Vélez", "Loto del Sur", "Rondo"];
  if ($("#allyGrid")) $("#allyGrid").innerHTML = ALLIES.map((a) => `<div class="ally">${esc(a)}</div>`).join("");
  renderWorks();
  renderCats();
  renderProducts();
  renderCart();
  observe();
});
