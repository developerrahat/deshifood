/* =========================================================
   Deshi Food — UI behaviour (demo build, no backend)
   Every block checks for its own markup, so one file
   serves all pages.
   ========================================================= */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const fmt = (n) => '৳' + Math.round(n).toLocaleString('en-IN');
  const params = new URLSearchParams(location.search);
  const FREE_SHIP = 1000;
  const WA = 'https://wa.me/8801842078717';

  /* ---------------------------------------------------------
     Catalogue (sizes: [label, price, oldPrice?])
     --------------------------------------------------------- */
  const PRODUCTS = [
    { id: 'mustard-oil', name: 'Pure Mustard Oil', bn: 'খাঁটি সরিষার তেল', cat: 'oil', catLabel: 'Oil & Ghee', pack: 'bottle', c1: '#F4C63A', c2: '#B98208', tint: '#FFF3D2', short: 'MUSTARD OIL', shortBn: 'সরিষার তেল', badge: ['Best Seller', 'green'], sizes: [['1 L', 380, 420], ['2 L', 740, 820], ['5 L', 1800, 2050]], desc: 'Cold-pressed in a traditional wooden ghani from Natore mustard seeds. Strong, natural pungency — perfect for bharta, fish curry and homemade achar.', photo: 'photo-1552592074-ea7a91b851b3' },
    { id: 'turmeric', name: 'Turmeric Powder', bn: 'হলুদ গুঁড়া', cat: 'spices', catLabel: 'Spices', pack: 'jar', c1: '#F7B928', c2: '#D3840A', tint: '#FFF1CF', short: 'TURMERIC', shortBn: 'হলুদ গুঁড়া', sizes: [['200 g', 180], ['500 g', 420, 450]], desc: 'Sun-dried turmeric roots, stone-ground in small batches. Bright natural colour and earthy aroma — no added colour or fillers.', photo: 'photo-1596040033229-a9821ebd058d' },
    { id: 'chili', name: 'Red Chili Powder', bn: 'মরিচ গুঁড়া', cat: 'spices', catLabel: 'Spices', pack: 'jar', c1: '#E0472B', c2: '#9E2318', tint: '#FFE4DC', short: 'CHILI POWDER', shortBn: 'মরিচ গুঁড়া', badge: ['-10%', 'orange'], sizes: [['200 g', 190, 210], ['500 g', 450, 500]], desc: 'Fiery deshi red chillies, sun-dried and freshly ground for vivid colour and honest heat in every curry.', photo: 'photo-1784382265423-d5b445f04405' },
    { id: 'ghee', name: 'Pure Gawa Ghee', bn: 'গাওয়া ঘি', cat: 'oil', catLabel: 'Oil & Ghee', pack: 'tub', c1: '#FAD54A', c2: '#DCA312', cap: ['#FADB5C', '#D29608'], tint: '#FFF4CC', short: 'GAWA GHEE', shortBn: 'গাওয়া ঘি', badge: ['Best Seller', 'green'], sizes: [['250 g', 480], ['500 g', 850, 920], ['1 kg', 1650, 1800]], desc: 'Slow-cooked gawa ghee from pure cow’s milk butter. Rich aroma and a grainy, golden texture — just like home.', photo: 'photo-1601232265936-6da280cff563' },
    { id: 'honey', name: 'Raw Natural Honey', bn: 'খাঁটি মধু', cat: 'honey', catLabel: 'Honey', pack: 'jar', honey: true, c1: '#F0A22A', c2: '#A35207', tint: '#FFEBCF', short: 'PURE HONEY', shortBn: 'খাঁটি মধু', badge: ['New', 'gold'], sizes: [['500 g', 650, 720], ['1 kg', 1250, 1400]], desc: 'Raw, unheated honey from mustard fields and the Sundarbans. Never blended, never boiled — just pure, golden goodness.', photo: 'photo-1641878067318-1d1f79a77785' },
    { id: 'mango-pickle', name: 'Mango Pickle', bn: 'আমের আচার', cat: 'pickles', catLabel: 'Pickles', pack: 'jar', chunks: true, c1: '#E9962C', c2: '#A2550F', tint: '#FFEFD8', short: 'MANGO PICKLE', shortBn: 'আমের আচার', sizes: [['400 g', 280, 320]], desc: 'Grandmother’s recipe — green mango, mustard oil and whole spices, sun-cured for a tangy, spicy bite.', photo: 'photo-1589135233689-d56032e9680a' },
    { id: 'red-atta', name: 'Whole Red Atta', bn: 'লাল আটা', cat: 'grains', catLabel: 'Atta & Grains', pack: 'pouch', c1: '#C99872', c2: '#9A6A48', tint: '#F5ECE1', short: 'RED ATTA', shortBn: 'লাল আটা', sizes: [['1 kg', 120], ['2 kg', 230, 240]], desc: 'Whole red wheat, stone-milled with the bran intact. Softer rotis, more fibre and a lovely nutty taste.', photo: 'photo-1615485290628-c5033c657a8c' },
    { id: 'health-mix', name: 'Nutri Health Mix', bn: 'স্বাস্থ্য মিক্স', cat: 'grains', catLabel: 'Health Mix', pack: 'pouch', c1: '#B98F6B', c2: '#7A573B', tint: '#EFE9DF', short: 'HEALTH MIX', shortBn: 'হেলথ মিক্স', badge: ['Popular', 'gold'], sizes: [['500 g', 190], ['1 kg', 345, 380]], desc: 'A wholesome blend of barley, red wheat, red rice, sesame, chickpea and nuts. Keeps you full and energised for longer.', photo: 'photo-1614061813295-0e0f82273dc3' },
    { id: 'coriander', name: 'Coriander Powder', bn: 'ধনিয়া গুঁড়া', cat: 'spices', catLabel: 'Spices', pack: 'jar', c1: '#BBA663', c2: '#7F6C33', tint: '#F2F1DC', short: 'CORIANDER', shortBn: 'ধনিয়া গুঁড়া', sizes: [['200 g', 150], ['500 g', 350, 380]], desc: 'Fragrant coriander seeds, lightly roasted and ground fresh — the citrusy backbone of every Bengali curry.', photo: 'photo-1596040033229-a9821ebd058d' },
    { id: 'cumin', name: 'Cumin Powder', bn: 'জিরা গুঁড়া', cat: 'spices', catLabel: 'Spices', pack: 'jar', c1: '#A27A56', c2: '#664629', tint: '#F3E9DD', short: 'CUMIN', shortBn: 'জিরা গুঁড়া', sizes: [['100 g', 160], ['200 g', 300, 320]], desc: 'Warm, earthy cumin ground in small batches so the essential oils — and the aroma — stay locked in.', photo: 'photo-1716816211590-c15a328a5ff0' },
    { id: 'black-seed-oil', name: 'Black Seed Oil', bn: 'কালোজিরা তেল', cat: 'oil', catLabel: 'Oil & Ghee', pack: 'bottle', c1: '#4A3514', c2: '#1C1206', tint: '#EEF0E6', short: 'KALOJIRA OIL', shortBn: 'কালোজিরা তেল', sizes: [['100 ml', 250], ['250 ml', 580, 620]], desc: 'Cold-pressed kalojira (nigella) seed oil — a traditional daily tonic, taken by the spoon or added to warm water.', photo: 'photo-1552592074-ea7a91b851b3' },
    { id: 'garam-masala', name: 'Garam Masala', bn: 'গরম মসলা', cat: 'spices', catLabel: 'Spices', pack: 'jar', c1: '#8A5A3A', c2: '#55341D', tint: '#F2E7DC', short: 'GARAM MASALA', shortBn: 'গরম মসলা', sizes: [['100 g', 220, 240]], desc: 'Cinnamon, cardamom, clove and bay leaf — roasted and blended to finish biryani, korma and festive curries.', photo: 'photo-1784382265423-d5b445f04405' },
    { id: 'olive-pickle', name: 'Olive Pickle', bn: 'জলপাইয়ের আচার', cat: 'pickles', catLabel: 'Pickles', pack: 'jar', chunks: true, c1: '#A4A83E', c2: '#5E661C', tint: '#F1F3DC', short: 'OLIVE PICKLE', shortBn: 'জলপাই আচার', badge: ['New', 'gold'], sizes: [['400 g', 300]], desc: 'Sweet, sour and spicy deshi jolpai achar, slow-cooked with jaggery and panch phoron.', photo: 'photo-1617854307432-13950e24ba07' },
    { id: 'chinigura-rice', name: 'Chinigura Rice', bn: 'চিনিগুড়া চাল', cat: 'grains', catLabel: 'Rice & Grains', pack: 'pouch', c1: '#F4EFE2', c2: '#D6CCB4', tint: '#F4F2EC', short: 'CHINIGURA', shortBn: 'চিনিগুড়া চাল', sizes: [['1 kg', 165], ['5 kg', 790, 820]], desc: 'Small-grain aromatic rice from northern Bangladesh — the classic choice for polao, khichuri and payesh.', photo: 'photo-1723879683042-8e72c359ec2e' },
    { id: 'dates', name: 'Premium Dates', bn: 'প্রিমিয়াম খেজুর', cat: 'nuts', catLabel: 'Nuts & Dates', pack: 'jar', chunks: true, c1: '#7A3A20', c2: '#3E170C', tint: '#F4E6DF', short: 'PREMIUM DATES', shortBn: 'খেজুর', sizes: [['500 g', 650, 700], ['1 kg', 1250]], desc: 'Soft, naturally sweet dates — a quick energy boost for iftar, breakfast or a healthy snack.', photo: 'photo-1708335008926-e8b898da2ae9' },
    { id: 'mixed-nuts', name: 'Mixed Nuts', bn: 'মিক্সড বাদাম', cat: 'nuts', catLabel: 'Nuts & Dates', pack: 'jar', chunks: true, c1: '#D9B07A', c2: '#A3743F', tint: '#F6EEDF', short: 'MIXED NUTS', shortBn: 'মিক্সড বাদাম', badge: ['Popular', 'gold'], sizes: [['250 g', 420], ['500 g', 820, 880]], desc: 'Almonds, cashews, raisins and pistachios — hand-sorted and packed fresh for daily snacking.', photo: 'photo-1616252576862-bd9abd7467f9' },
    { id: 'chia-seeds', name: 'Chia Seeds', bn: 'চিয়া সিড', cat: 'grains', catLabel: 'Seeds', pack: 'pouch', c1: '#8C8C84', c2: '#55554F', tint: '#EFEFEA', short: 'CHIA SEEDS', shortBn: 'চিয়া সিড', sizes: [['250 g', 280], ['500 g', 540]], desc: 'Fibre- and omega-3-rich chia seeds. Soak in water, milk or juice for an easy, filling breakfast.', photo: 'photo-1614061813295-0e0f82273dc3' }
  ];
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  const CATS = [
    { id: 'spices', label: 'Spices & Masala', icon: 'c-spice' },
    { id: 'oil', label: 'Oil & Ghee', icon: 'c-oil' },
    { id: 'honey', label: 'Pure Honey', icon: 'c-honey' },
    { id: 'pickles', label: 'Pickles & Chutney', icon: 'c-jar' },
    { id: 'grains', label: 'Rice, Atta & Grains', icon: 'c-grain' },
    { id: 'nuts', label: 'Nuts & Dates', icon: 'c-nut' }
  ];
  const TAB_CATS = { spices: ['spices'], oil: ['oil'], honey: ['honey', 'pickles'], grains: ['grains', 'nuts'] };
  const HOME_IDS = ['mustard-oil', 'turmeric', 'chili', 'ghee', 'honey', 'mango-pickle', 'red-atta', 'health-mix', 'coriander', 'cumin'];
  const BUILDER_IDS = ['mustard-oil', 'turmeric', 'chili', 'ghee', 'honey', 'health-mix', 'red-atta', 'coriander'];
  const BUILDER_DEFAULT = ['mustard-oil', 'turmeric', 'chili'];

  const COMBOS = [
    { id: 'kitchen', name: 'Everyday Kitchen Combo', bn: 'রান্নাঘরের প্রয়োজনীয় কম্বো', items: [['mustard-oil', 0], ['turmeric', 0], ['chili', 0], ['coriander', 0]], off: 0.15, tint: '#FFF0D2' },
    { id: 'morning', name: 'Healthy Morning Combo', bn: 'স্বাস্থ্যকর সকালের কম্বো', items: [['honey', 0], ['ghee', 1], ['health-mix', 1]], off: 0.15, tint: '#FFF3D4' },
    { id: 'pantry', name: 'Pure Pantry Combo', bn: 'খাঁটি ভাঁড়ার কম্বো', items: [['red-atta', 1], ['mustard-oil', 1], ['ghee', 0]], off: 0.12, tint: '#F4EDE2' }
  ];

  const unsplash = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${w}&q=80`;

  /* ---------------------------------------------------------
     Branded packshots (Deshi Food black & gold labels)
     --------------------------------------------------------- */
  let uid = 0;
  const SPECKS = [[48, 64], [62, 71], [97, 66], [111, 74], [72, 61], [88, 75], [52, 177], [76, 183], [101, 179], [117, 170], [64, 171], [90, 172]];

  function label(u, p, cx, y, w, h, s) {
    const x = cx - w / 2;
    const t = (dy) => (y + dy * s).toFixed(1);
    const enSize = (p.short.length > 10 ? 6.2 : 7.2) * s;
    return `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${6 * s}" fill="#141414"/>
      <rect x="${x + 3 * s}" y="${y + 3 * s}" width="${w - 6 * s}" height="${h - 6 * s}" rx="${4 * s}" fill="none" stroke="url(#${u}g)" stroke-width="${0.9 * s}"/>
      <text x="${cx}" y="${t(22)}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="${18 * s}" fill="url(#${u}g)">DF</text>
      <path d="M${cx + 2 * s} ${t(18)}c${3 * s} ${-5 * s} ${7 * s} ${-6 * s} ${9 * s} ${-6 * s}c${-1 * s} ${4 * s} ${-4 * s} ${7 * s} ${-9 * s} ${6 * s}z" fill="#3E9B4F"/>
      <text x="${cx}" y="${t(32)}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="${7.6 * s}" fill="url(#${u}g)">Deshi Food</text>
      <line x1="${cx - 18 * s}" x2="${cx + 18 * s}" y1="${t(37)}" y2="${t(37)}" stroke="url(#${u}g)" stroke-width="${0.6 * s}"/>
      <text x="${cx}" y="${t(49)}" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="${enSize.toFixed(1)}" letter-spacing="${0.6 * s}" fill="#F3D78A">${p.short}</text>
      <text x="${cx}" y="${t(64)}" text-anchor="middle" font-family="Hind Siliguri, sans-serif" font-weight="600" font-size="${10.5 * s}" fill="#FFFFFF">${p.shortBn}</text>`;
  }

  function ridges(x1, x2, y1, y2, stroke) {
    let out = '';
    for (let x = x1; x <= x2; x += 6) out += `<line x1="${x}" x2="${x}" y1="${y1}" y2="${y2}" stroke="${stroke}" stroke-width="1.2"/>`;
    return out;
  }

  function packshot(p) {
    const u = 'pk' + (++uid);
    const cap = p.cap || (p.honey ? ['#F1D27A', '#B8862B'] : null);
    const defs = `
      <defs>
        <linearGradient id="${u}c" x1="0" x2="1"><stop offset="0" stop-color="${p.c1}"/><stop offset=".42" stop-color="${p.c1}"/><stop offset="1" stop-color="${p.c2}"/></linearGradient>
        <linearGradient id="${u}k" x1="0" x2="1"><stop offset="0" stop-color="#404040"/><stop offset=".5" stop-color="#121212"/><stop offset="1" stop-color="#2C2C2C"/></linearGradient>
        <linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F6DE97"/><stop offset=".55" stop-color="#D4A23C"/><stop offset="1" stop-color="#B8862B"/></linearGradient>
        <linearGradient id="${u}y" x1="0" x2="1"><stop offset="0" stop-color="${cap ? cap[0] : '#404040'}"/><stop offset=".55" stop-color="${cap ? cap[1] : '#121212'}"/><stop offset="1" stop-color="${cap ? cap[0] : '#2C2C2C'}"/></linearGradient>
        <linearGradient id="${u}p" x1="0" x2="1"><stop offset="0" stop-color="#E2C49A"/><stop offset=".5" stop-color="#D3B07F"/><stop offset="1" stop-color="#A9824F"/></linearGradient>
        <radialGradient id="${u}s"><stop offset="0" stop-color="#3A2A10" stop-opacity=".28"/><stop offset="1" stop-color="#3A2A10" stop-opacity="0"/></radialGradient>
      </defs>`;
    const capFill = cap ? `url(#${u}y)` : `url(#${u}k)`;
    const ridgeStroke = cap ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.07)';
    let body = '';

    if (p.pack === 'jar') {
      const specks = SPECKS.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${p.chunks ? 2.6 + (i % 3) : 1 + (i % 3) * 0.4}" fill="${p.chunks ? 'rgba(90,45,10,.35)' : 'rgba(0,0,0,.16)'}"/>`).join('');
      body = `
        <ellipse cx="80" cy="193" rx="56" ry="6" fill="url(#${u}s)"/>
        <rect x="30" y="52" width="100" height="138" rx="18" fill="url(#${u}c)"/>
        ${p.honey ? '' : specks}
        <rect x="36" y="45" width="88" height="12" rx="4" fill="url(#${u}c)"/>
        <rect x="36" y="45" width="88" height="12" rx="4" fill="#fff" opacity=".14"/>
        <rect x="38" y="15" width="84" height="32" rx="6" fill="${capFill}"/>
        <rect x="38" y="15" width="84" height="5" rx="2.5" fill="#fff" opacity=".16"/>
        ${ridges(44, 116, 23, 43, ridgeStroke)}
        ${p.honey ? `<path d="M52 46v12a3.6 3.6 0 0 0 7.2 0V46z" fill="url(#${u}c)"/><path d="M100 46v7a3 3 0 0 0 6 0v-7z" fill="url(#${u}c)"/>` : ''}
        ${label(u, p, 80, 84, 88, 76, 1)}
        <rect x="37" y="60" width="7" height="122" rx="3.5" fill="#fff" opacity=".3"/>
        <rect x="117" y="60" width="5" height="122" rx="2.5" fill="#000" opacity=".1"/>
        <rect x="30" y="52" width="100" height="138" rx="18" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="1.2"/>`;
    } else if (p.pack === 'tub') {
      body = `
        <ellipse cx="80" cy="193" rx="66" ry="6" fill="url(#${u}s)"/>
        <rect x="18" y="66" width="124" height="124" rx="24" fill="url(#${u}c)"/>
        <rect x="25" y="59" width="110" height="12" rx="4" fill="url(#${u}c)"/>
        <rect x="25" y="59" width="110" height="12" rx="4" fill="#fff" opacity=".18"/>
        <rect x="22" y="30" width="116" height="32" rx="7" fill="${capFill}"/>
        <rect x="22" y="30" width="116" height="5" rx="2.5" fill="#fff" opacity=".3"/>
        ${ridges(28, 132, 38, 58, ridgeStroke)}
        ${label(u, p, 80, 94, 100, 78, 1.04)}
        <rect x="26" y="76" width="8" height="104" rx="4" fill="#fff" opacity=".32"/>
        <rect x="128" y="76" width="5" height="104" rx="2.5" fill="#000" opacity=".08"/>
        <rect x="18" y="66" width="124" height="124" rx="24" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.2"/>`;
    } else if (p.pack === 'bottle') {
      body = `
        <ellipse cx="80" cy="194" rx="42" ry="5" fill="url(#${u}s)"/>
        <rect x="67" y="26" width="26" height="18" fill="url(#${u}c)"/>
        <path d="M67 44C67 60 44 64 44 86V180Q44 191 55 191H105Q116 191 116 180V86C116 64 93 60 93 44Z" fill="url(#${u}c)"/>
        <rect x="64" y="40" width="32" height="6" rx="2" fill="#000" opacity=".18"/>
        <rect x="64" y="5" width="32" height="25" rx="4" fill="url(#${u}k)"/>
        <rect x="64" y="5" width="32" height="4" rx="2" fill="#fff" opacity=".16"/>
        ${ridges(69, 91, 12, 28, 'rgba(255,255,255,.08)')}
        ${label(u, p, 80, 106, 62, 60, 0.8)}
        <path d="M52 94V178" stroke="#fff" stroke-opacity=".36" stroke-width="6" stroke-linecap="round"/>
        <path d="M110 96V178" stroke="#000" stroke-opacity=".1" stroke-width="4" stroke-linecap="round"/>
        <path d="M67 44C67 60 44 64 44 86V180Q44 191 55 191H105Q116 191 116 180V86C116 64 93 60 93 44Z" fill="none" stroke="#fff" stroke-opacity=".42" stroke-width="1.2"/>`;
    } else {
      let zig = 'M30 31';
      for (let x = 30; x < 130; x += 5) zig += `L${x + 2.5} 27L${x + 5} 31`;
      const winSpecks = [[62, 66], [70, 74], [80, 64], [90, 72], [98, 66], [66, 78], [86, 79], [94, 77]]
        .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${1.1 + (i % 2) * 0.6}" fill="rgba(60,35,15,.4)"/>`).join('');
      body = `
        <ellipse cx="80" cy="194" rx="60" ry="6" fill="url(#${u}s)"/>
        <path d="M30 31H130L136 184Q136 191 129 191H31Q24 191 24 184Z" fill="url(#${u}p)"/>
        <path d="${zig}V43H130V31Z" fill="#000" opacity=".1"/>
        <path d="${zig}" fill="none" stroke="#8C6A3E" stroke-opacity=".5" stroke-width=".8"/>
        <line x1="32" x2="128" y1="50" y2="50" stroke="#5A4020" stroke-opacity=".3" stroke-dasharray="3 3"/>
        <rect x="52" y="57" width="56" height="28" rx="11" fill="url(#${u}c)"/>
        ${winSpecks}
        <rect x="52" y="57" width="56" height="28" rx="11" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/>
        ${label(u, p, 80, 94, 86, 76, 1)}
        <path d="M24 184L30 31H37L33 191H31Q24 191 24 184Z" fill="#000" opacity=".07"/>
        <path d="M136 184L130 31H124L127 191H129Q136 191 136 184Z" fill="#000" opacity=".1"/>
        <path d="M28 183Q80 174 132 183" fill="none" stroke="#000" stroke-opacity=".12"/>`;
    }
    return `<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}${body}</svg>`;
  }

  const icon = (id, cls = 'ico') => `<svg class="${cls}"><use href="#${id}"/></svg>`;

  // Static pages drop <span data-pack="id"></span> wherever a packshot belongs
  $$('[data-pack]').forEach((el) => { const p = byId[el.dataset.pack]; if (p) { el.innerHTML = packshot(p); el.style.setProperty('--tint', p.tint); } });

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  const toastEl = $('[data-toast]');
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = icon('i-check') + `<span>${msg}</span>`;
    toastEl.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-shown'), 2600);
  }

  /* ---------------------------------------------------------
     Cart
     --------------------------------------------------------- */
  const CART_KEY = 'deshifood-cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }

  const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ } };
  const cartCount = () => cart.reduce((n, it) => n + it.qty, 0);
  const cartSub = () => cart.reduce((s, it) => s + it.price * it.qty, 0);

  function addToCart(item) {
    const found = cart.find((it) => it.key === item.key);
    if (found) found.qty += item.qty || 1;
    else cart.push({ qty: 1, ...item });
    saveCart();
    renderCart(true);
  }

  function addProduct(p, si = 0, qty = 1) {
    const [w, price] = p.sizes[si];
    addToCart({ key: `${p.id}|${w}`, id: p.id, name: p.name, size: w, price, qty });
    toast(`${p.name} (${w}) added to cart`);
  }

  const cartList = $('[data-cart-list]');
  function renderCart(bump = false) {
    const count = cartCount();
    const sub = cartSub();
    $$('[data-cart-count]').forEach((el) => {
      el.textContent = count;
      if (bump) { el.classList.remove('is-bump'); void el.offsetWidth; el.classList.add('is-bump'); }
    });
    $$('[data-cart-total]').forEach((el) => { el.textContent = fmt(sub); });
    if (!cartList) return;
    $('[data-cart-count-text]').textContent = `(${count})`;
    $('[data-cart-sub]').textContent = fmt(sub);

    const left = FREE_SHIP - sub;
    $('[data-ship]').innerHTML = (left > 0
      ? `Add <b>${fmt(left)}</b> more for <b>free home delivery</b>`
      : `You've unlocked <b>free home delivery</b>`) +
      `<div class="bar"><i style="width:${Math.min(100, (sub / FREE_SHIP) * 100)}%"></i></div>`;

    if (!cart.length) {
      cartList.innerHTML = `<li class="drawer__empty">${icon('i-cart')}<b>Your cart is empty</b><span>Add pure goodness from our pantry.</span></li>`;
      return;
    }
    cartList.innerHTML = cart.map((it) => {
      const p = byId[it.id];
      const thumb = p
        ? `<span class="citem__thumb" style="--tint:${p.tint}">${packshot(p)}</span>`
        : `<span class="citem__thumb citem__thumb--bundle">${icon('i-gift')}</span>`;
      return `
        <li class="citem" data-key="${it.key}">
          ${thumb}
          <div>
            <b>${it.name}</b>
            <small>${it.size}</small>
            <div class="citem__price">${fmt(it.price * it.qty)}</div>
          </div>
          <div class="citem__side">
            <button class="citem__rm" type="button" aria-label="Remove ${it.name}" data-rm>${icon('i-trash')}</button>
            <div class="qty">
              <button type="button" aria-label="Decrease quantity" data-dec>${icon('i-minus')}</button>
              <span>${it.qty}</span>
              <button type="button" aria-label="Increase quantity" data-inc>${icon('i-plus')}</button>
            </div>
          </div>
        </li>`;
    }).join('');
  }

  if (cartList) {
    cartList.addEventListener('click', (e) => {
      const row = e.target.closest('.citem');
      if (!row) return;
      const it = cart.find((c) => c.key === row.dataset.key);
      if (!it) return;
      if (e.target.closest('[data-inc]')) it.qty += 1;
      else if (e.target.closest('[data-dec]')) it.qty = Math.max(0, it.qty - 1);
      else if (e.target.closest('[data-rm]')) it.qty = 0;
      else return;
      cart = cart.filter((c) => c.qty > 0);
      saveCart();
      renderCart();
    });
  }

  /* ---------------------------------------------------------
     Drawers (cart, mobile menu, shop filters) + quick view
     --------------------------------------------------------- */
  const scrim = $('[data-scrim]');
  const panels = $$('[data-drawer], [data-mmenu], [data-filters]');
  const qv = $('[data-qv]');

  // the shop filter sidebar is a drawer only on small screens, so it keeps its aria state
  const hide = (p, hidden) => { if (!p.matches('[data-filters]')) p.setAttribute('aria-hidden', hidden); };
  function openPanel(panel) {
    closePanels();
    panel.classList.add('is-open');
    hide(panel, 'false');
    if (scrim) scrim.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closePanels() {
    panels.forEach((p) => { p.classList.remove('is-open'); hide(p, 'true'); });
    if (qv) { qv.classList.remove('is-open'); qv.setAttribute('aria-hidden', 'true'); }
    if (scrim) scrim.hidden = true;
    document.body.style.overflow = '';
  }
  $$('[data-open-cart]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); const d = $('[data-drawer]'); if (d) openPanel(d); }));
  $$('[data-open-menu]').forEach((b) => b.addEventListener('click', () => { const m = $('[data-mmenu]'); if (m) openPanel(m); }));
  $$('[data-open-filters]').forEach((b) => b.addEventListener('click', () => { const f = $('[data-filters]'); if (f) openPanel(f); }));
  $$('[data-close-drawer], [data-qv-close]').forEach((b) => b.addEventListener('click', closePanels));
  if (scrim) scrim.addEventListener('click', closePanels);
  $$('.mmenu a').forEach((a) => a.addEventListener('click', closePanels));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanels(); });

  /* ---------------------------------------------------------
     Shared pieces: price, size options, qty stepper
     --------------------------------------------------------- */
  function priceHTML(p, i) {
    const [, price, old] = p.sizes[i];
    const off = old ? Math.round(((old - price) / old) * 100) : 0;
    return `<strong>${fmt(price)}</strong>${old ? `<del>${fmt(old)}</del><span class="pcard__off">-${off}%</span>` : ''}`;
  }
  const sizesHTML = (p, si) => p.sizes.map(([w, price], i) =>
    `<button class="size${i === si ? ' is-active' : ''}" type="button" data-size="${i}" aria-pressed="${i === si}"><b>${w}</b><small>${fmt(price)}</small></button>`).join('');
  const waLink = (p, si, qty) => `${WA}?text=${encodeURIComponent(`Hi Deshi Food! I'd like to order:\n${p.name} (${p.sizes[si][0]}) × ${qty}\nTotal: ${fmt(p.sizes[si][1] * qty)}`)}`;

  document.addEventListener('click', (e) => {
    const step = e.target.closest('[data-step]');
    if (!step) return;
    const input = $('input', step.closest('[data-stepper]'));
    input.value = Math.max(1, Math.min(99, (+input.value || 1) + +step.dataset.step));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------------------------------------------------------
     Product cards (home, shop, related) + quick view
     --------------------------------------------------------- */
  const sizeSel = {};

  function cardHTML(p, idx = 0) {
    const si = sizeSel[p.id] || 0;
    const badge = p.badge ? `<span class="tag tag--${p.badge[1]}">${p.badge[0]}</span>` : '';
    const chips = p.sizes.map(([w], i) =>
      `<button class="chip${i === si ? ' is-active' : ''}" type="button" data-size="${i}" aria-pressed="${i === si}">${w}</button>`).join('');
    return `
      <article class="pcard" data-id="${p.id}" style="animation-delay:${idx * 45}ms">
        <div class="pcard__media" style="--tint:${p.tint}">
          ${badge}
          <button class="pcard__qv" type="button" aria-label="Quick view ${p.name}" data-qv-open>${icon('i-eye')}<span>Quick view</span></button>
          <a class="pcard__pack" href="product.html?id=${p.id}" tabindex="-1" aria-hidden="true">${packshot(p)}</a>
          <button class="pcard__add" type="button" aria-label="Add ${p.name} to cart" data-add>${icon('i-plus')}</button>
        </div>
        <div class="pcard__body">
          <span class="pcard__cat">${p.catLabel}</span>
          <h3 class="pcard__name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <p class="pcard__bn bn">${p.bn}</p>
          <div class="pcard__price" data-price>${priceHTML(p, si)}</div>
          <div class="chips" role="group" aria-label="Pack size">${chips}</div>
        </div>
      </article>`;
  }

  function bindCards(container) {
    container.addEventListener('click', (e) => {
      const card = e.target.closest('.pcard');
      if (!card) return;
      const p = byId[card.dataset.id];

      const chip = e.target.closest('[data-size]');
      if (chip) {
        const i = +chip.dataset.size;
        sizeSel[p.id] = i;
        $$('.chip', card).forEach((c, ci) => { c.classList.toggle('is-active', ci === i); c.setAttribute('aria-pressed', ci === i); });
        $('[data-price]', card).innerHTML = priceHTML(p, i);
        return;
      }
      if (e.target.closest('[data-qv-open]')) { openQuickView(p); return; }
      const add = e.target.closest('[data-add]');
      if (add) {
        addProduct(p, sizeSel[p.id] || 0);
        add.classList.add('is-done');
        add.innerHTML = icon('i-check');
        setTimeout(() => { add.classList.remove('is-done'); add.innerHTML = icon('i-plus'); }, 1400);
      }
    });
  }

  function openQuickView(p) {
    if (!qv) return;
    let si = sizeSel[p.id] || 0;
    const badge = p.badge ? `<span class="tag tag--${p.badge[1]}">${p.badge[0]}</span>` : '';
    $('[data-qv-content]', qv).innerHTML = `
      <div class="qv__media" style="--tint:${p.tint}">
        ${badge}
        <div class="qv__pack">${packshot(p)}</div>
        <ul class="qv__trust">
          <li>${icon('i-shield')}100% pure</li>
          <li>${icon('i-cash')}Cash on delivery</li>
          <li>${icon('i-truck')}1–3 day delivery</li>
        </ul>
      </div>
      <div class="qv__body">
        <span class="pcard__cat">${p.catLabel}</span>
        <h2 class="qv__title">${p.name}</h2>
        <p class="qv__bn bn">${p.bn}</p>
        <div class="pcard__price qv__price" data-qv-price>${priceHTML(p, si)}</div>
        <p class="qv__desc">${p.desc}</p>
        <span class="opt-label">Pack size</span>
        <div class="sizes" data-qv-sizes>${sizesHTML(p, si)}</div>
        <div class="buy-row">
          <div class="stepper" data-stepper>
            <button type="button" data-step="-1" aria-label="Decrease">${icon('i-minus')}</button>
            <input type="text" value="1" inputmode="numeric" aria-label="Quantity" data-qv-qty>
            <button type="button" data-step="1" aria-label="Increase">${icon('i-plus')}</button>
          </div>
          <button class="btn btn--outline-green" type="button" data-qv-add>${icon('i-cart')}Add to cart</button>
        </div>
        <a class="btn btn--gold btn--block btn--lg" href="checkout.html">${icon('i-zap')}Buy now — quick checkout</a>
        <a class="btn btn--wa btn--block btn--lg" href="${waLink(p, si, 1)}" target="_blank" rel="noopener" data-qv-wa>${icon('i-whatsapp')}Order on WhatsApp</a>
        <div class="qv__foot">
          <span>${icon('i-phone')}Call to order: <a href="tel:+8801842078717">+880 1842-078717</a></span>
          <a class="link-arrow" href="product.html?id=${p.id}">Full details ${icon('i-arrow-r')}</a>
        </div>
      </div>`;

    const qty = () => +$('[data-qv-qty]', qv).value || 1;
    const sync = () => {
      $('[data-qv-price]', qv).innerHTML = priceHTML(p, si);
      $('[data-qv-wa]', qv).href = waLink(p, si, qty());
    };
    $('[data-qv-sizes]', qv).onclick = (e) => {
      const b = e.target.closest('[data-size]');
      if (!b) return;
      si = +b.dataset.size;
      $$('.size', qv).forEach((s, i) => { s.classList.toggle('is-active', i === si); s.setAttribute('aria-pressed', i === si); });
      sync();
    };
    $('[data-qv-qty]', qv).onchange = sync;
    $('[data-qv-add]', qv).onclick = () => { addProduct(p, si, qty()); closePanels(); };

    qv.classList.add('is-open');
    qv.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('.qv__close', qv).focus(), 60);
  }

  /* ---------------------------------------------------------
     Home: best sellers with tabs
     --------------------------------------------------------- */
  const homeGrid = $('[data-products]');
  if (homeGrid) {
    const homeItems = HOME_IDS.map((id) => byId[id]);
    const setTab = (tab) => {
      if (!$(`[data-tab="${tab}"]`)) tab = 'all';
      $$('[data-tab]').forEach((t) => {
        const on = t.dataset.tab === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on);
      });
      const list = tab === 'all' ? homeItems : PRODUCTS.filter((p) => TAB_CATS[tab].includes(p.cat)).slice(0, 10);
      homeGrid.innerHTML = list.map(cardHTML).join('');
    };
    $$('[data-tab]').forEach((t) => t.addEventListener('click', () => setTab(t.dataset.tab)));
    bindCards(homeGrid);
    setTab('all');
  }

  // hand-picked rows: <div class="pgrid" data-picks="ghee,honey">
  $$('[data-picks]').forEach((el) => {
    el.innerHTML = el.dataset.picks.split(',').map((id, i) => cardHTML(byId[id.trim()], i)).join('');
    bindCards(el);
  });

  /* ---------------------------------------------------------
     Bundle builder + ready-made combos
     --------------------------------------------------------- */
  const builder = $('[data-builder]');
  if (builder) {
    const picked = new Set(BUILDER_DEFAULT);
    const rateFor = (n) => (n >= 4 ? 0.15 : n === 3 ? 0.1 : n === 2 ? 0.05 : 0);

    builder.innerHTML = BUILDER_IDS.map((id) => {
      const p = byId[id];
      const [w, price] = p.sizes[0];
      return `
        <button class="btile" type="button" data-pick="${id}" aria-pressed="${picked.has(id)}">
          <span class="btile__media" style="--tint:${p.tint}">${packshot(p)}</span>
          <span class="btile__check">${icon('i-check')}</span>
          <span class="btile__name">${p.name}</span>
          <span class="btile__meta"><span>${w}</span><b>${fmt(price)}</b></span>
        </button>`;
    }).join('');

    const totals = () => {
      const items = [...picked].map((id) => byId[id]);
      const sub = items.reduce((s, p) => s + p.sizes[0][1], 0);
      const rate = rateFor(items.length);
      const disc = Math.round(sub * rate);
      return { items, sub, rate, disc, total: sub - disc };
    };

    const renderSummary = () => {
      const { items, sub, rate, disc, total } = totals();
      const n = items.length;
      const slots = [];
      for (let i = 0; i < 4; i++) {
        const p = items[i];
        if (p) {
          const more = i === 3 && n > 4 ? `<span class="slot__more">+${n - 4}</span>` : '';
          slots.push(`<span class="slot is-filled" style="--tint:${p.tint}" title="${p.name}">${packshot(p)}${more}</span>`);
        } else {
          slots.push(`<span class="slot">${icon('i-plus')}</span>`);
        }
      }
      $('[data-slots]').innerHTML = slots.join('');
      const msgs = ['Pick at least 2 products to start saving', 'Add 1 more product to unlock 5% off', 'Nice! Add 1 more to unlock 10% off', 'Great! Add 1 more to unlock 15% off'];
      $('[data-sum-msg]').textContent = n >= 4 ? 'Maximum 15% bundle discount unlocked!' : msgs[n];
      $('[data-sum-count]').textContent = `${n} item${n === 1 ? '' : 's'}`;
      $('[data-meter]').style.width = (n >= 4 ? 100 : n === 3 ? 66.67 : (n / 2) * 33.33) + '%';
      $$('[data-mark]').forEach((m) => m.classList.toggle('is-on', n >= +m.dataset.mark));
      const tier = n >= 4 ? 4 : n;
      $$('[data-tier]').forEach((t) => t.classList.toggle('is-on', +t.dataset.tier === tier));
      $('[data-sum-sub]').textContent = fmt(sub);
      $('[data-sum-rate]').textContent = rate ? `(${Math.round(rate * 100)}%)` : '';
      $('[data-sum-disc]').textContent = '−' + fmt(disc);
      $('[data-sum-ship]').textContent = total >= FREE_SHIP ? 'Free' : n ? `Free over ${fmt(FREE_SHIP)}` : '—';
      $('[data-sum-total]').textContent = fmt(total);
      const save = $('[data-sum-save]');
      save.hidden = !disc;
      save.textContent = `You save ${fmt(disc)} on this bundle`;
      $('[data-bundle-add]').disabled = n < 2;
    };

    builder.addEventListener('click', (e) => {
      const tile = e.target.closest('[data-pick]');
      if (!tile) return;
      const id = tile.dataset.pick;
      picked.has(id) ? picked.delete(id) : picked.add(id);
      tile.setAttribute('aria-pressed', picked.has(id));
      renderSummary();
    });
    $('[data-bundle-clear]').addEventListener('click', () => {
      picked.clear();
      $$('[data-pick]', builder).forEach((t) => t.setAttribute('aria-pressed', 'false'));
      renderSummary();
    });
    $('[data-bundle-add]').addEventListener('click', () => {
      const { items, total, disc } = totals();
      if (items.length < 2) return;
      addToCart({
        key: 'bundle|' + items.map((p) => p.id).sort().join('+'),
        name: `Custom Bundle (${items.length} items)`,
        size: items.map((p) => `${p.name} ${p.sizes[0][0]}`).join(' · '),
        price: total
      });
      toast(`Bundle of ${items.length} added — you saved ${fmt(disc)}`);
    });
    renderSummary();
  }

  const combosEl = $('[data-combos]');
  if (combosEl) {
    combosEl.innerHTML = COMBOS.map((c) => {
      const parts = c.items.map(([id, si]) => ({ p: byId[id], size: byId[id].sizes[si] }));
      const sum = parts.reduce((s, x) => s + x.size[1], 0);
      const price = Math.round((sum * (1 - c.off)) / 5) * 5;
      Object.assign(c, { price, sum, parts });
      return `
        <article class="combo">
          <div class="combo__media" style="--tint:${c.tint}">
            <span class="combo__save">${icon('i-percent')}Save ${fmt(sum - price)}</span>
            <div class="combo__packs">${parts.slice(0, 3).map((x) => packshot(x.p)).join('')}</div>
          </div>
          <div class="combo__body">
            <h4 class="combo__name">${c.name}</h4>
            <p class="combo__bn bn">${c.bn}</p>
            <ul class="combo__items">${parts.map((x) => `<li>${x.p.name.replace(/^(Pure|Raw Natural|Whole|Red|Nutri) /, '')} · ${x.size[0]}</li>`).join('')}</ul>
            <div class="combo__foot">
              <div class="combo__price"><strong>${fmt(price)}</strong><del>${fmt(sum)}</del></div>
              <button class="btn btn--sm combo__btn" type="button" data-combo="${c.id}">Add combo ${icon('i-plus')}</button>
            </div>
          </div>
        </article>`;
    }).join('');
    combosEl.addEventListener('click', (e) => {
      const b = e.target.closest('[data-combo]');
      if (!b) return;
      const c = COMBOS.find((x) => x.id === b.dataset.combo);
      addToCart({ key: 'combo|' + c.id, name: c.name, size: c.parts.map((x) => `${x.p.name} ${x.size[0]}`).join(' · '), price: c.price });
      toast(`${c.name} added to cart`);
    });
  }

  /* ---------------------------------------------------------
     Shop: filter sidebar
     --------------------------------------------------------- */
  const shop = $('[data-shop]');
  if (shop) {
    const grid = $('[data-shop-grid]', shop);
    const PRICE_MAX = 1500;
    const state = { cats: new Set(), min: 0, max: PRICE_MAX, sizes: new Set(), sale: false, fresh: false, q: '', sort: 'featured' };
    if (params.get('cat')) state.cats.add(params.get('cat'));
    if (params.get('sale')) state.sale = true;

    const base = (p) => p.sizes[0][1];
    const onSale = (p) => !!p.sizes[0][2];
    const bestOff = (p) => Math.max(0, ...p.sizes.map(([, pr, old]) => (old ? (old - pr) / old : 0)));

    // category list with counts
    $('[data-f-cats]', shop).innerHTML = CATS.map((c) => {
      const n = PRODUCTS.filter((p) => p.cat === c.id).length;
      return `
        <label class="fcheck">
          <input type="checkbox" value="${c.id}" ${state.cats.has(c.id) ? 'checked' : ''}>
          <span class="fcheck__box">${icon('i-check')}</span>
          ${icon(c.icon, 'ico fcheck__ico')}
          <span class="fcheck__label">${c.label}</span>
          <span class="fcheck__count">${n}</span>
        </label>`;
    }).join('');

    // pack sizes found in the catalogue
    const allSizes = [...new Set(PRODUCTS.flatMap((p) => p.sizes.map((s) => s[0])))]
      .sort((a, b) => {
        const v = (s) => parseFloat(s) * (/kg|L$/.test(s) ? 1000 : 1);
        return v(a) - v(b);
      });
    $('[data-f-sizes]', shop).innerHTML = allSizes.map((s) => `<button class="fchip" type="button" data-fsize="${s}">${s}</button>`).join('');

    $('[data-f-sale]', shop).checked = state.sale;

    const rMin = $('[data-range-min]', shop);
    const rMax = $('[data-range-max]', shop);
    const syncRange = () => {
      const lo = Math.min(+rMin.value, +rMax.value - 50);
      const hi = Math.max(+rMax.value, +rMin.value + 50);
      rMin.value = lo; rMax.value = hi;
      state.min = lo; state.max = hi;
      const range = $('.range', shop);
      range.style.setProperty('--lo', (lo / PRICE_MAX) * 100 + '%');
      range.style.setProperty('--hi', (hi / PRICE_MAX) * 100 + '%');
      $('[data-price-lo]', shop).textContent = fmt(lo);
      $('[data-price-hi]', shop).textContent = hi >= PRICE_MAX ? fmt(PRICE_MAX) + '+' : fmt(hi);
      $$('[data-preset]', shop).forEach((b) => {
        const [a, z] = b.dataset.preset.split('-').map(Number);
        b.classList.toggle('is-active', a === lo && z === hi);
      });
    };

    function render() {
      let list = PRODUCTS.filter((p) =>
        (!state.cats.size || state.cats.has(p.cat)) &&
        base(p) >= state.min && (state.max >= PRICE_MAX || base(p) <= state.max) &&
        (!state.sizes.size || p.sizes.some((s) => state.sizes.has(s[0]))) &&
        (!state.sale || onSale(p)) &&
        (!state.fresh || (p.badge && p.badge[0] === 'New')) &&
        (!state.q || `${p.name} ${p.bn}`.toLowerCase().includes(state.q)));

      const sorters = {
        'price-asc': (a, b) => base(a) - base(b),
        'price-desc': (a, b) => base(b) - base(a),
        name: (a, b) => a.name.localeCompare(b.name),
        discount: (a, b) => bestOff(b) - bestOff(a)
      };
      if (sorters[state.sort]) list = [...list].sort(sorters[state.sort]);

      // first page of results (12 fits 4, 3 and 2 columns evenly)
      const shown = list.slice(0, 12);
      grid.innerHTML = shown.length
        ? shown.map(cardHTML).join('')
        : `<div class="empty">
             <span class="empty__icon">${icon('i-search')}</span>
             <h3>No products match these filters</h3>
             <p>Try removing a filter or widening the price range.</p>
             <button class="btn btn--green" type="button" data-reset>Reset all filters</button>
           </div>`;
      $('.toolbar__count [data-count]', shop).textContent = shown.length;
      $('[data-total]', shop).textContent = list.length;
      $('.filters__foot [data-count]', shop).textContent = list.length;
      $('.pager', shop).hidden = list.length <= shown.length;

      // active filter chips
      const chips = [];
      state.cats.forEach((c) => chips.push([`cat:${c}`, CATS.find((x) => x.id === c).label]));
      state.sizes.forEach((s) => chips.push([`size:${s}`, s]));
      if (state.min > 0 || state.max < PRICE_MAX) chips.push(['price', `${fmt(state.min)} – ${state.max >= PRICE_MAX ? fmt(PRICE_MAX) + '+' : fmt(state.max)}`]);
      if (state.sale) chips.push(['sale', 'On sale']);
      if (state.fresh) chips.push(['fresh', 'New arrivals']);
      if (state.q) chips.push(['q', `“${state.q}”`]);
      $('[data-active]', shop).innerHTML = chips.map(([k, t]) => `<button class="achip" type="button" data-remove="${k}">${t}${icon('i-x')}</button>`).join('') +
        (chips.length ? '<button class="link-btn" type="button" data-reset>Clear all</button>' : '');
      $$('[data-filter-count]').forEach((el) => { el.textContent = chips.length || ''; el.hidden = !chips.length; });
      $$('.catpill', shop).forEach((b) => b.classList.toggle('is-active', b.dataset.cat === 'all' ? !state.cats.size : state.cats.size === 1 && state.cats.has(b.dataset.cat)));
    }

    function reset() {
      Object.assign(state, { min: 0, max: PRICE_MAX, sale: false, fresh: false, q: '' });
      state.cats.clear(); state.sizes.clear();
      $$('[data-f-cats] input', shop).forEach((i) => { i.checked = false; });
      $$('[data-fsize]', shop).forEach((b) => b.classList.remove('is-active'));
      $('[data-f-sale]', shop).checked = false;
      $('[data-f-new]', shop).checked = false;
      $('[data-f-q]', shop).value = '';
      rMin.value = 0; rMax.value = PRICE_MAX; syncRange();
      render();
    }

    shop.addEventListener('change', (e) => {
      const t = e.target;
      if (t.closest('[data-f-cats]')) { t.checked ? state.cats.add(t.value) : state.cats.delete(t.value); }
      else if (t.matches('[data-f-sale]')) state.sale = t.checked;
      else if (t.matches('[data-f-new]')) state.fresh = t.checked;
      else if (t.matches('[data-sort]')) state.sort = t.value;
      else return;
      render();
    });
    shop.addEventListener('input', (e) => {
      if (e.target.matches('[data-range-min], [data-range-max]')) { syncRange(); render(); }
      if (e.target.matches('[data-f-q]')) { state.q = e.target.value.trim().toLowerCase(); render(); }
    });
    shop.addEventListener('click', (e) => {
      const sizeBtn = e.target.closest('[data-fsize]');
      if (sizeBtn) {
        const s = sizeBtn.dataset.fsize;
        state.sizes.has(s) ? state.sizes.delete(s) : state.sizes.add(s);
        sizeBtn.classList.toggle('is-active', state.sizes.has(s));
        render(); return;
      }
      const preset = e.target.closest('[data-preset]');
      if (preset) {
        const [a, z] = preset.dataset.preset.split('-').map(Number);
        rMin.value = a; rMax.value = z; syncRange(); render(); return;
      }
      const pill = e.target.closest('.catpill');
      if (pill) {
        state.cats.clear();
        if (pill.dataset.cat !== 'all') state.cats.add(pill.dataset.cat);
        $$('[data-f-cats] input', shop).forEach((i) => { i.checked = state.cats.has(i.value); });
        render(); return;
      }
      const rm = e.target.closest('[data-remove]');
      if (rm) {
        const [k, v] = rm.dataset.remove.split(':');
        if (k === 'cat') { state.cats.delete(v); $(`[data-f-cats] input[value="${v}"]`, shop).checked = false; }
        if (k === 'size') { state.sizes.delete(v); $(`[data-fsize="${v}"]`, shop).classList.remove('is-active'); }
        if (k === 'price') { rMin.value = 0; rMax.value = PRICE_MAX; syncRange(); }
        if (k === 'sale') { state.sale = false; $('[data-f-sale]', shop).checked = false; }
        if (k === 'fresh') { state.fresh = false; $('[data-f-new]', shop).checked = false; }
        if (k === 'q') { state.q = ''; $('[data-f-q]', shop).value = ''; }
        render(); return;
      }
      if (e.target.closest('[data-reset]')) { reset(); return; }
      const view = e.target.closest('[data-view]');
      if (view) {
        grid.classList.toggle('is-3', view.dataset.view === '3');
        $$('[data-view]', shop).forEach((v) => v.classList.toggle('is-active', v === view));
      }
    });

    bindCards(grid);
    syncRange();
    render();
  }

  /* ---------------------------------------------------------
     Product details page
     --------------------------------------------------------- */
  const pd = $('[data-pd]');
  if (pd) {
    const p = byId[params.get('id')] || byId['mustard-oil'];
    let si = 0;
    const set = (sel, html) => $$(sel, pd).forEach((el) => { el.innerHTML = html; });

    if (p.id !== 'mustard-oil') {
      document.title = `${p.name} — Deshi Food`;
      set('[data-pd-name]', p.name);
      set('[data-pd-bn]', p.bn);
      set('[data-pd-cat]', p.catLabel);
      set('[data-pd-desc]', p.desc);
      $$('[data-pd-cat-link]').forEach((a) => { a.href = `shop.html?cat=${p.cat}`; a.textContent = p.catLabel; });
      $$('[data-pd-crumb]').forEach((el) => { el.textContent = p.name; });
      // product-specific gallery: branded pack + lifestyle photo
      $('[data-gallery-main]', pd).innerHTML = `<div class="gallery__slide is-active" style="--tint:${p.tint}">${packshot(p)}</div><div class="gallery__slide gallery__slide--photo"><img src="${unsplash(p.photo)}" alt=""></div>`;
      $('[data-gallery-thumbs]', pd).innerHTML = `<button class="gallery__thumb is-active" type="button" style="--tint:${p.tint}">${packshot(p)}</button><button class="gallery__thumb gallery__thumb--photo" type="button"><img src="${unsplash(p.photo, 200)}" alt=""></button>`;
      const badge = $('[data-pd-badge]', pd);
      if (badge) badge.outerHTML = p.badge ? `<span class="tag tag--${p.badge[1]}" data-pd-badge>${p.badge[0]}</span>` : '';
    }
    $$('[data-pd-pack]').forEach((el) => { el.innerHTML = packshot(p); el.style.setProperty('--tint', p.tint); });

    const qtyEl = $('[data-pd-qty]', pd);
    const qty = () => +qtyEl.value || 1;
    const sync = () => {
      set('[data-pd-price]', priceHTML(p, si));
      $$('[data-pd-wa]').forEach((a) => { a.href = waLink(p, si, qty()); });
      set('[data-pd-size-label]', p.sizes[si][0]);
    };
    $('[data-pd-sizes]', pd).innerHTML = sizesHTML(p, si);
    $('[data-pd-sizes]', pd).addEventListener('click', (e) => {
      const b = e.target.closest('[data-size]');
      if (!b) return;
      si = +b.dataset.size;
      $$('.size', pd).forEach((s, i) => { s.classList.toggle('is-active', i === si); s.setAttribute('aria-pressed', i === si); });
      sync();
    });
    qtyEl.addEventListener('change', sync);
    $$('[data-pd-add]').forEach((b) => b.addEventListener('click', () => addProduct(p, si, qty())));
    sync();

    // gallery thumbs
    pd.addEventListener('click', (e) => {
      const th = e.target.closest('.gallery__thumb');
      if (!th) return;
      const idx = $$('.gallery__thumb', pd).indexOf(th);
      $$('.gallery__thumb', pd).forEach((t, i) => t.classList.toggle('is-active', i === idx));
      $$('.gallery__slide', pd).forEach((s, i) => s.classList.toggle('is-active', i === idx));
    });
    // hover zoom follows the cursor
    const stage = $('.gallery__main', pd);
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      stage.style.setProperty('--zx', ((e.clientX - r.left) / r.width) * 100 + '%');
      stage.style.setProperty('--zy', ((e.clientY - r.top) / r.height) * 100 + '%');
    });

    // frequently bought together
    const fbt = $('[data-fbt]');
    if (fbt) {
      const recalc = () => {
        const on = $$('input[data-price-val]', fbt).filter((i) => i.checked);
        const sum = on.reduce((s, i) => s + +i.dataset.priceVal, 0);
        const disc = on.length >= 3 ? Math.round(sum * 0.1) : on.length === 2 ? Math.round(sum * 0.05) : 0;
        $('[data-fbt-total]', fbt).textContent = fmt(sum - disc);
        $('[data-fbt-old]', fbt).textContent = disc ? fmt(sum) : '';
        $('[data-fbt-count]', fbt).textContent = on.length;
        $$('.fbt__item', fbt).forEach((it) => it.classList.toggle('is-off', !$('input', it).checked));
      };
      fbt.addEventListener('change', recalc);
      $('[data-fbt-add]', fbt).addEventListener('click', () => toast('Bundle added to cart'));
      recalc();
    }

    const related = $('[data-related]');
    if (related) {
      related.innerHTML = PRODUCTS.filter((x) => x.id !== p.id)
        .sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 5).map(cardHTML).join('');
      bindCards(related);
    }

    // sticky buy bar appears once the main buy buttons scroll away
    const bar = $('[data-buybar]');
    const anchor = $('[data-buy-anchor]', pd);
    if (bar && anchor && 'IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => bar.classList.toggle('is-shown', !en.isIntersecting && en.boundingClientRect.top < 0)).observe(anchor);
    }
  }

  /* ---------------------------------------------------------
     Generic tabs: [data-tabs] > [data-tab-target] / [data-tab-panel]
     --------------------------------------------------------- */
  $$('[data-tabs]').forEach((tabs) => {
    tabs.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tab-target]');
      if (!b) return;
      const id = b.dataset.tabTarget;
      $$('[data-tab-target]', tabs).forEach((t) => { const on = t === b; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); });
      $$('[data-tab-panel]', tabs).forEach((pnl) => { pnl.hidden = pnl.dataset.tabPanel !== id; });
    });
  });

  /* ---------------------------------------------------------
     Checkout: delivery area updates the totals
     --------------------------------------------------------- */
  const ck = $('[data-checkout]');
  if (ck) {
    const sub = +ck.dataset.subtotal;
    let coupon = 0;
    const totals = () => {
      const area = $('input[name="area"]:checked', ck);
      const ship = sub >= FREE_SHIP ? 0 : +area.dataset.fee;
      $('[data-ck-ship]').textContent = ship ? fmt(ship) : 'Free';
      $('[data-ck-disc-row]').hidden = !coupon;
      $('[data-ck-disc]').textContent = '−' + fmt(coupon);
      $$('[data-ck-total]').forEach((el) => { el.textContent = fmt(sub + ship - coupon); });
    };
    ck.addEventListener('change', (e) => { if (e.target.name === 'area') totals(); });
    const applyBtn = $('[data-coupon-apply]');
    if (applyBtn) applyBtn.addEventListener('click', () => {
      const field = $('[data-coupon]');
      if (!field.value.trim()) { field.focus(); return; }
      coupon = 50;
      $('[data-coupon-ok]').hidden = false;
      totals();
    });
    totals();
  }

  /* ---------------------------------------------------------
     Login / register switch + password reveal
     --------------------------------------------------------- */
  const auth = $('[data-auth]');
  if (auth) {
    const show = (mode) => {
      auth.dataset.mode = mode;
      $$('[data-auth-tab]', auth).forEach((t) => { const on = t.dataset.authTab === mode; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); });
      $$('[data-auth-form]', auth).forEach((f) => { f.hidden = f.dataset.authForm !== mode; });
    };
    auth.addEventListener('click', (e) => {
      const t = e.target.closest('[data-auth-tab], [data-auth-go]');
      if (t) { e.preventDefault(); show(t.dataset.authTab || t.dataset.authGo); }
    });
    show(location.hash === '#register' ? 'register' : 'login');
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pw-toggle]');
    if (!b) return;
    const input = $('input', b.closest('.field__control'));
    const reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    b.innerHTML = icon(reveal ? 'i-eye-off' : 'i-eye');
  });

  /* ---------------------------------------------------------
     Account: sidebar panels
     --------------------------------------------------------- */
  const acc = $('[data-account]');
  if (acc) {
    const open = (id) => {
      if (!$(`[data-acc-panel="${id}"]`, acc)) id = 'dashboard';
      $$('[data-acc-link]', acc).forEach((l) => l.classList.toggle('is-active', l.dataset.accLink === id));
      $$('[data-acc-panel]', acc).forEach((pnl) => { pnl.hidden = pnl.dataset.accPanel !== id; });
    };
    acc.addEventListener('click', (e) => {
      const l = e.target.closest('[data-acc-link]');
      if (!l) return;
      e.preventDefault();
      open(l.dataset.accLink);
      history.replaceState(null, '', '#' + l.dataset.accLink);
      if (window.innerWidth < 992) $('.acc__main', acc).scrollIntoView({ behavior: 'smooth' });
    });
    $$('[data-order-filter]', acc).forEach((b) => b.addEventListener('click', () => {
      $$('[data-order-filter]', acc).forEach((x) => x.classList.toggle('is-active', x === b));
      $$('[data-order-status]', acc).forEach((row) => { row.hidden = b.dataset.orderFilter !== 'all' && row.dataset.orderStatus !== b.dataset.orderFilter; });
    }));
    open(location.hash.slice(1) || 'dashboard');
  }

  /* ---------------------------------------------------------
     Copy-to-clipboard (order number)
     --------------------------------------------------------- */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', () => {
    try { navigator.clipboard.writeText(b.dataset.copy); } catch (e) { /* clipboard unavailable */ }
    toast(`Copied ${b.dataset.copy}`);
  }));

  /* ---------------------------------------------------------
     Hero slider
     --------------------------------------------------------- */
  const slider = $('[data-slider]');
  if (slider) {
    const slides = $$('.slide', slider);
    const dotsWrap = $('.slider__dots', slider);
    let current = 0;
    let timer;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    dotsWrap.innerHTML = slides.map((_, i) =>
      `<button class="slider__dot${i === 0 ? ' is-active' : ''}" type="button" role="tab" aria-label="Go to slide ${i + 1}" aria-selected="${i === 0}"></button>`).join('');
    const dots = $$('.slider__dot', dotsWrap);

    const go = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, si) => s.classList.toggle('is-active', si === current));
      dots.forEach((d, di) => { d.classList.toggle('is-active', di === current); d.setAttribute('aria-selected', di === current); });
    };
    const play = () => { if (!reduce) { clearInterval(timer); timer = setInterval(() => go(current + 1), 6000); } };
    const pause = () => clearInterval(timer);

    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); play(); }));
    $('[data-prev]', slider).addEventListener('click', () => { go(current - 1); play(); });
    $('[data-next]', slider).addEventListener('click', () => { go(current + 1); play(); });
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', play);
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { go(current - 1); play(); }
      if (e.key === 'ArrowRight') { go(current + 1); play(); }
    });
    let startX = null;
    slider.addEventListener('pointerdown', (e) => { startX = e.clientX; });
    slider.addEventListener('pointerup', (e) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 50) { go(current + (dx < 0 ? 1 : -1)); play(); }
      startX = null;
    });

    // ?slide=2 deep-links to a slide (e.g. from an ad) and holds it there
    const linked = +params.get('slide');
    if (linked >= 1 && linked <= slides.length) go(linked - 1);
    else play();
  }

  /* ---------------------------------------------------------
     Top bar ticker
     --------------------------------------------------------- */
  const msgs = $$('.topbar__msg');
  if (msgs.length > 1) {
    let m = 0;
    setInterval(() => {
      const prev = msgs[m];
      prev.classList.replace('is-active', 'is-leaving');
      setTimeout(() => prev.classList.remove('is-leaving'), 600);
      m = (m + 1) % msgs.length;
      msgs[m].classList.add('is-active');
    }, 4200);
  }

  /* ---------------------------------------------------------
     Category marquee — clone once for a seamless loop
     --------------------------------------------------------- */
  const track = $('.marquee__track');
  if (track) {
    [...track.children].forEach((li) => {
      const clone = li.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      $$('a', clone).forEach((a) => a.setAttribute('tabindex', '-1'));
      track.appendChild(clone);
    });
  }

  /* ---------------------------------------------------------
     Header search suggestions
     --------------------------------------------------------- */
  const search = $('[data-search]');
  if (search) {
    const input = $('.search__input', search);
    const drop = $('.search__drop', search);
    let focusIdx = -1;

    const showResults = () => {
      const q = input.value.trim().toLowerCase();
      focusIdx = -1;
      if (!q) { drop.hidden = true; return; }
      const hits = PRODUCTS.filter((p) => [p.name, p.bn, p.short, p.shortBn].join(' ').toLowerCase().includes(q)).slice(0, 5);
      drop.innerHTML = hits.length
        ? hits.map((p) => `
            <a class="search__item" role="option" href="product.html?id=${p.id}">
              <span class="search__thumb" style="--tint:${p.tint}">${packshot(p)}</span>
              <span><b>${p.name}</b><small class="bn">${p.bn}</small></span>
              <span class="price">${fmt(p.sizes[0][1])}</span>
            </a>`).join('')
        : `<p class="search__empty">No products match “${input.value.trim()}”</p>`;
      drop.hidden = false;
    };

    input.addEventListener('input', showResults);
    input.addEventListener('focus', showResults);
    input.addEventListener('keydown', (e) => {
      const items = $$('.search__item', drop);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!items.length) return;
        focusIdx = (focusIdx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach((it, i) => it.classList.toggle('is-focus', i === focusIdx));
      } else if (e.key === 'Escape') {
        drop.hidden = true;
      }
    });
    search.addEventListener('submit', (e) => {
      e.preventDefault();
      const items = $$('.search__item', drop);
      const target = items[focusIdx] || items[0];
      location.href = target ? target.href : `shop.html`;
    });
    drop.addEventListener('mousedown', (e) => e.preventDefault());
    input.addEventListener('blur', () => setTimeout(() => { drop.hidden = true; }, 120));
  }

  /* ---------------------------------------------------------
     Sticky header + back to top
     --------------------------------------------------------- */
  const header = $('.header');
  const toTop = $('[data-totop]');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 40);
    if (toTop) toTop.classList.toggle('is-shown', y > 900);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();

  renderCart();
})();
