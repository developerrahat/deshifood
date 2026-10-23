/* =========================================================
   Deshi Food — shared page chrome
   Each DF.* call inserts its markup right where the
   <script> tag sits, so pages render without a flash.
   ========================================================= */
window.DF = (() => {
  'use strict';

  const put = (html) => document.currentScript.insertAdjacentHTML('beforebegin', html);
  const WA = 'https://wa.me/8801842078717';

  const SPRITE = `
<svg width="0" height="0" class="sprite" aria-hidden="true">
  <defs>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>
    <symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.95-1.55L21 8H6.2"/><circle cx="10" cy="20.5" r="1.3"/><circle cx="17" cy="20.5" r="1.3"/></symbol>
    <symbol id="i-package" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/><path d="m7.5 4.3 9 5.2"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-eye-off" viewBox="0 0 24 24"><path d="M9.9 4.2A10.4 10.4 0 0 1 12 4c6.4 0 10 8 10 8a17.6 17.6 0 0 1-2.6 3.6M6.6 6.6C3.9 8.4 2 12 2 12s3.6 8 10 8a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="m2 2 20 20"/></symbol>
    <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></symbol>
    <symbol id="i-truck" viewBox="0 0 24 24"><path d="M2 6h12v10H2z"/><path d="M14 9h4.5L22 12.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.9"/><circle cx="17.5" cy="17.5" r="1.9"/></symbol>
    <symbol id="i-chev-r" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></symbol>
    <symbol id="i-chev-l" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></symbol>
    <symbol id="i-chev-d" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-arrow-r" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></symbol>
    <symbol id="i-arrow-l" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="m11 6-6 6 6 6"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
    <symbol id="i-minus" viewBox="0 0 24 24"><path d="M5 12h14"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
    <symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12"/><path d="M9 7V4h6v3"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.5 2"/></symbol>
    <symbol id="i-cash" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/></symbol>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/></symbol>
    <symbol id="i-cols3" viewBox="0 0 24 24"><rect x="3" y="4" width="5" height="16" rx="1.4"/><rect x="9.5" y="4" width="5" height="16" rx="1.4"/><rect x="16" y="4" width="5" height="16" rx="1.4"/></symbol>
    <symbol id="i-cols4" viewBox="0 0 24 24"><rect x="2" y="4" width="3.8" height="16" rx="1.2"/><rect x="7.4" y="4" width="3.8" height="16" rx="1.2"/><rect x="12.8" y="4" width="3.8" height="16" rx="1.2"/><rect x="18.2" y="4" width="3.8" height="16" rx="1.2"/></symbol>
    <symbol id="i-gift" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></symbol>
    <symbol id="i-percent" viewBox="0 0 24 24"><path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></symbol>
    <symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M15.5 14 17 22l-5-3-5 3 1.5-8"/></symbol>
    <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></symbol>
    <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/></symbol>
    <symbol id="i-bag" viewBox="0 0 24 24"><path d="M5.5 7h13l1 14h-15z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></symbol>
    <symbol id="i-filter" viewBox="0 0 24 24"><path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></symbol>
    <symbol id="i-edit" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></symbol>
    <symbol id="i-logout" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></symbol>
    <symbol id="i-receipt" viewBox="0 0 24 24"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/></symbol>
    <symbol id="i-share" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></symbol>
    <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></symbol>
    <symbol id="i-tag" viewBox="0 0 24 24"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></symbol>
    <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/></symbol>
    <symbol id="i-zap" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v5M12 8h.01"/></symbol>
    <symbol id="i-flame" viewBox="0 0 24 24"><path d="M12 22c4 0 7-2.8 7-6.8 0-4.4-3.3-6.5-4.2-10.2-.2-.8-1.2-1-1.6-.3C12.1 6.6 11 8.5 9 9c-.4-1-.6-2-.6-3-2.3 2-3.4 5-3.4 8.2C5 18.6 8 22 12 22z"/></symbol>
    <symbol id="i-google" viewBox="0 0 24 24"><path stroke="none" fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"/><path stroke="none" fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"/><path stroke="none" fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8z"/><path stroke="none" fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24"><path stroke="none" fill="currentColor" d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43M20.08 3.9A11.3 11.3 0 0 0 12.05.6C5.8.6.7 5.7.7 11.95c0 2 .52 3.95 1.52 5.67L.6 23.4l5.92-1.55a11.3 11.3 0 0 0 5.52 1.4h.01c6.25 0 11.35-5.1 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02"/></symbol>
    <symbol id="i-facebook" viewBox="0 0 24 24"><path stroke="none" fill="currentColor" d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V22h3.4z"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></symbol>
    <symbol id="i-youtube" viewBox="0 0 24 24"><path stroke="none" fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.8 15.1V8.9l5.8 3.1-5.8 3.1z"/></symbol>
    <symbol id="i-tiktok" viewBox="0 0 24 24"><path stroke="none" fill="currentColor" d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></symbol>
    <symbol id="c-spice" viewBox="0 0 24 24"><path d="M3 11h18"/><path d="M4.5 11a7.5 7.5 0 0 0 15 0"/><path d="M8.5 21h7"/><path d="m13.5 11 5.8-6.6a1.5 1.5 0 0 1 2.2 2.1L16.5 11"/></symbol>
    <symbol id="c-oil" viewBox="0 0 24 24"><path d="M10 2h4v3h-4z"/><path d="M10 5c0 2-4 3-4 7v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8c0-4-4-5-4-7"/><path d="M6 14h12"/></symbol>
    <symbol id="c-honey" viewBox="0 0 24 24"><path d="M12 2.8 19.5 7v8.6L12 20l-7.5-4.4V7z"/><path d="M12 8.6 15 10.3v3.5L12 15.5l-3-1.7v-3.5z"/></symbol>
    <symbol id="c-jar" viewBox="0 0 24 24"><path d="M7 2.5h10v3.2H7z"/><path d="M6.2 5.7h11.6a1 1 0 0 1 1 1V18a3.5 3.5 0 0 1-3.5 3.5h-6.6A3.5 3.5 0 0 1 5.2 18V6.7a1 1 0 0 1 1-1z"/><path d="M9.5 15.5c.8-2.4 4.2-2.4 5 0"/></symbol>
    <symbol id="c-nut" viewBox="0 0 24 24"><path d="M12 2.5c4.2 3 6.5 7.2 6.5 11.3a6.5 6.5 0 0 1-13 0C5.5 9.7 7.8 5.5 12 2.5z"/><path d="M12 8c-1.6 2-2.2 4.8-1.6 7.6"/></symbol>
    <symbol id="c-grain" viewBox="0 0 24 24"><path d="M12 22V9"/><path d="M12 9c0-3 1.8-5.2 4-6 0 3-1.8 5.2-4 6z"/><path d="M12 9c0-3-1.8-5.2-4-6 0 3 1.8 5.2 4 6z"/><path d="M12 14.5c0-2.6 1.8-4.6 4-5.2 0 2.6-1.8 4.6-4 5.2z"/><path d="M12 14.5c0-2.6-1.8-4.6-4-5.2 0 2.6 1.8 4.6 4 5.2z"/><path d="M12 20c0-2.6 1.8-4.6 4-5.2 0 2.6-1.8 4.6-4 5.2z"/><path d="M12 20c0-2.6-1.8-4.6-4-5.2 0 2.6 1.8 4.6 4 5.2z"/></symbol>
    <symbol id="c-bowl" viewBox="0 0 24 24"><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M7.5 8c.6-2.2 2.3-3.5 4.5-3.5s3.9 1.3 4.5 3.5"/><path d="M8 21h8"/></symbol>
    <symbol id="c-tea" viewBox="0 0 24 24"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3c-1 1.2 1 1.8 0 3M12 3c-1 1.2 1 1.8 0 3"/></symbol>
  </defs>
</svg>`;

  const logo = (cls = '') => `
    <a class="logo ${cls}" href="index.html" aria-label="Deshi Food home">
      <span class="logo__mark"><img src="assets/img/logo-mark.jpg" alt="" width="260" height="200"></span>
      <span class="logo__text">
        <span class="logo__name">Deshi <em>Food</em></span>
        <span class="logo__tag">Pure · Fresh · Authentic</span>
      </span>
    </a>`;

  const NAV = [
    ['home', 'index.html', 'Home'],
    ['shop', 'shop.html', 'Shop'],
    ['combos', 'index.html#bundle', 'Combos'],
    ['offers', 'shop.html?sale=1', 'Offers <span class="pill-new">New</span>'],
    ['blog', 'index.html#about', 'Blog']
  ];

  function sprite() { put(SPRITE); }

  function topbar() {
    put(`
<div class="topbar">
  <div class="container topbar__inner">
    <ul class="topbar__list">
      <li><svg class="ico"><use href="#i-leaf"/></svg><span class="hl">100% Organic</span></li>
      <li>Pure &amp; Natural</li>
      <li>Healthy Life</li>
    </ul>
    <div class="topbar__ticker" aria-live="polite">
      <span class="topbar__msg is-active"><svg class="ico"><use href="#i-truck"/></svg>Free Home Delivery on Orders Over ৳1,000</span>
      <span class="topbar__msg"><svg class="ico"><use href="#i-gift"/></svg>Bundle &amp; Save — up to 15% off on any 4 products</span>
      <span class="topbar__msg"><svg class="ico"><use href="#i-cash"/></svg>Cash on Delivery all over Bangladesh</span>
    </div>
    <div class="topbar__right">
      <a href="tel:+8801842078717"><svg class="ico"><use href="#i-phone"/></svg>+880 1842-078717</a>
      <span class="topbar__sep" aria-hidden="true"></span>
      <span class="bn">খাঁটি পণ্য, সুস্থ জীবন</span>
    </div>
  </div>
</div>`);
  }

  function header(active = '') {
    const nav = NAV.map(([key, href, label]) =>
      `<a class="nav__link${key === active ? ' is-active' : ''}" href="${href}">${label}</a>`).join('');
    put(`
<header class="header" id="top">
  <div class="container header__inner">
    <button class="header__burger" type="button" aria-label="Open menu" data-open-menu><svg class="ico"><use href="#i-menu"/></svg></button>
    ${logo()}
    <nav class="nav" aria-label="Main">${nav}</nav>
    <form class="search" role="search" data-search>
      <svg class="search__lead ico"><use href="#i-search"/></svg>
      <input class="search__input" type="search" placeholder="Search honey, ghee, spices…" aria-label="Search products" autocomplete="off">
      <button class="search__btn" type="submit" aria-label="Search"><svg class="ico"><use href="#i-arrow-r"/></svg></button>
      <div class="search__drop" role="listbox" hidden></div>
    </form>
    <div class="hdr-actions">
      <button class="hdr-action" type="button" data-open-cart>
        <span class="hdr-action__icon"><svg class="ico"><use href="#i-cart"/></svg><span class="hdr-badge" data-cart-count>0</span></span>
        <span class="hdr-action__label">Cart</span>
      </button>
      <a class="hdr-action hdr-action--hide-sm" href="account.html#orders">
        <span class="hdr-action__icon"><svg class="ico"><use href="#i-package"/></svg></span>
        <span class="hdr-action__label">Track Order</span>
      </a>
      <a class="hdr-action${active === 'account' ? ' is-active' : ''}" href="${active === 'account' ? 'account.html' : 'login.html'}">
        <span class="hdr-action__icon"><svg class="ico"><use href="#i-user"/></svg></span>
        <span class="hdr-action__label">${active === 'account' ? 'Account' : 'Sign In'}</span>
      </a>
    </div>
  </div>
</header>`);
  }

  function checkoutHeader() {
    put(`
<header class="ck-header">
  <div class="container ck-header__inner">
    ${logo()}
    <ol class="ck-steps" aria-label="Checkout progress">
      <li class="is-done"><span><svg class="ico"><use href="#i-check"/></svg></span>Cart</li>
      <li class="is-active"><span>2</span>Checkout</li>
      <li><span>3</span>Confirmation</li>
    </ol>
    <div class="ck-header__help">
      <span class="ck-secure"><svg class="ico"><use href="#i-lock"/></svg>Secure checkout</span>
      <a href="tel:+8801842078717"><svg class="ico"><use href="#i-phone"/></svg><span><small>Need help?</small>+880 1842-078717</span></a>
    </div>
  </div>
</header>`);
  }

  function footer() {
    put(`
<footer class="footer" id="contact">
  <svg class="footer__wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 34c120-22 240-30 360-18s240 34 360 30 240-30 360-34 240 14 360 22V60H0z"/></svg>
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        ${logo('logo--light')}
        <p>Pure mustard oil, ghee, honey, spices and healthy staples — sourced with care for your family's health.</p>
        <p class="bn footer__motto">খাঁটি পণ্য, সুস্থ জীবনের জন্য।</p>
        <div class="socials">
          <a href="https://www.facebook.com/profile.php?id=61590887032577" target="_blank" rel="noopener" aria-label="Facebook"><svg class="ico"><use href="#i-facebook"/></svg></a>
          <a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg class="ico"><use href="#i-whatsapp"/></svg></a>
          <a href="#" aria-label="Instagram"><svg class="ico"><use href="#i-instagram"/></svg></a>
          <a href="#" aria-label="YouTube"><svg class="ico"><use href="#i-youtube"/></svg></a>
          <a href="#" aria-label="TikTok"><svg class="ico"><use href="#i-tiktok"/></svg></a>
        </div>
      </div>
      <div class="footer__col">
        <h4>Quick links</h4>
        <ul>
          <li><a href="index.html#about">About us</a></li>
          <li><a href="shop.html">Shop all</a></li>
          <li><a href="index.html#bundle">Combo offers</a></li>
          <li><a href="account.html#orders">Track order</a></li>
          <li><a href="login.html">My account</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Support</h4>
        <ul>
          <li><a href="#contact">Contact us</a></li>
          <li><a href="#contact">FAQs</a></li>
          <li><a href="#contact">Shipping &amp; delivery</a></li>
          <li><a href="#contact">Returns &amp; refunds</a></li>
          <li><a href="#contact">Privacy policy</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Categories</h4>
        <ul>
          <li><a href="shop.html?cat=spices">Spices &amp; masala</a></li>
          <li><a href="shop.html?cat=oil">Mustard oil &amp; ghee</a></li>
          <li><a href="shop.html?cat=honey">Pure honey</a></li>
          <li><a href="shop.html?cat=pickles">Pickles &amp; chutney</a></li>
          <li><a href="shop.html?cat=grains">Atta &amp; grains</a></li>
        </ul>
      </div>
      <div class="footer__col footer__col--contact">
        <h4>Get in touch</h4>
        <ul class="contact-list">
          <li><svg class="ico"><use href="#i-phone"/></svg><span><small>Hotline</small><a href="tel:+8801842078717">+880 1842-078717</a></span></li>
          <li><svg class="ico"><use href="#i-whatsapp"/></svg><span><small>WhatsApp</small><a href="${WA}" target="_blank" rel="noopener">+880 1842-078717</a></span></li>
          <li><svg class="ico"><use href="#i-mail"/></svg><span><small>Email</small><a href="mailto:info@deshifood.com">info@deshifood.com</a></span></li>
          <li><svg class="ico"><use href="#i-pin"/></svg><span><small>Office</small>Lalpur, Natore, Rajshahi, Bangladesh</span></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© 2026 Deshi Food. All rights reserved.</p>
      <ul class="pay" aria-label="Payment methods"><li>bKash</li><li>Nagad</li><li>Rocket</li><li>Cash on Delivery</li></ul>
    </div>
  </div>
</footer>`);
  }

  function miniFooter() {
    put(`
<footer class="mini-footer">
  <div class="container mini-footer__inner">
    <p>© 2026 Deshi Food · Lalpur, Natore</p>
    <ul class="pay pay--light" aria-label="Payment methods"><li>bKash</li><li>Nagad</li><li>Rocket</li><li>Cash on Delivery</li></ul>
  </div>
</footer>`);
  }

  function mobileNav(active = '') {
    const item = (key, href, icon, label) =>
      `<a class="bnav__item${key === active ? ' is-active' : ''}" href="${href}"><svg class="ico"><use href="#${icon}"/></svg><span>${label}</span></a>`;
    put(`
<nav class="bnav" aria-label="Mobile navigation">
  ${item('home', 'index.html', 'i-home', 'Home')}
  ${item('shop', 'shop.html', 'i-grid', 'Shop')}
  <button class="bnav__item bnav__cart" type="button" data-open-cart aria-label="Open cart">
    <span class="bnav__bubble"><svg class="ico"><use href="#i-cart"/></svg><b data-cart-count>0</b></span>
    <span>Cart</span>
  </button>
  <a class="bnav__item" href="${WA}" target="_blank" rel="noopener"><svg class="ico"><use href="#i-whatsapp"/></svg><span>Chat</span></a>
  ${item('account', 'account.html', 'i-user', 'Account')}
</nav>`);
  }

  function overlays() {
    put(`
<button class="fcart" type="button" data-open-cart aria-label="Open cart">
  <span class="fcart__top"><svg class="ico"><use href="#i-cart"/></svg><span class="fcart__badge" data-cart-count>0</span></span>
  <span class="fcart__total" data-cart-total>৳0</span>
</button>
<a class="fab-wa" href="${WA}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg class="ico"><use href="#i-whatsapp"/></svg></a>
<button class="totop" type="button" aria-label="Back to top" data-totop><svg class="ico"><use href="#i-chev-d"/></svg></button>

<div class="scrim" data-scrim hidden></div>
<aside class="drawer" data-drawer aria-label="Shopping cart" aria-hidden="true">
  <div class="drawer__head">
    <h3>Your cart <span data-cart-count-text>(0)</span></h3>
    <button class="icon-btn" type="button" aria-label="Close cart" data-close-drawer><svg class="ico"><use href="#i-x"/></svg></button>
  </div>
  <div class="drawer__ship" data-ship></div>
  <ul class="drawer__list" data-cart-list></ul>
  <div class="drawer__foot">
    <div class="drawer__sub"><span>Subtotal</span><strong data-cart-sub>৳0</strong></div>
    <a class="btn btn--gold btn--block btn--lg" href="checkout.html">Checkout <svg class="ico"><use href="#i-arrow-r"/></svg></a>
    <button class="btn btn--outline btn--block" type="button" data-close-drawer>Continue shopping</button>
  </div>
</aside>

<aside class="mmenu" data-mmenu aria-label="Menu" aria-hidden="true">
  <div class="drawer__head">
    <a class="logo" href="index.html"><span class="logo__mark"><img src="assets/img/logo-mark.jpg" alt="" width="260" height="200"></span><span class="logo__text"><span class="logo__name">Deshi <em>Food</em></span></span></a>
    <button class="icon-btn" type="button" aria-label="Close menu" data-close-drawer><svg class="ico"><use href="#i-x"/></svg></button>
  </div>
  <nav class="mmenu__nav">
    <a href="index.html">Home</a><a href="shop.html">Shop</a><a href="index.html#bundle">Combos</a><a href="shop.html?sale=1">Offers <span class="pill-new">New</span></a><a href="account.html#orders">Track order</a><a href="login.html">Sign in / Register</a>
  </nav>
  <p class="mmenu__label">Categories</p>
  <nav class="mmenu__cats">
    <a href="shop.html?cat=spices"><svg class="ico"><use href="#c-spice"/></svg>Spices &amp; Masala</a>
    <a href="shop.html?cat=oil"><svg class="ico"><use href="#c-oil"/></svg>Mustard Oil &amp; Ghee</a>
    <a href="shop.html?cat=honey"><svg class="ico"><use href="#c-honey"/></svg>Pure Honey</a>
    <a href="shop.html?cat=pickles"><svg class="ico"><use href="#c-jar"/></svg>Pickles &amp; Chutney</a>
    <a href="shop.html?cat=grains"><svg class="ico"><use href="#c-grain"/></svg>Rice, Atta &amp; Grains</a>
    <a href="shop.html?cat=nuts"><svg class="ico"><use href="#c-nut"/></svg>Nuts &amp; Dates</a>
  </nav>
</aside>

<div class="qv" data-qv aria-hidden="true">
  <div class="qv__backdrop" data-qv-close></div>
  <div class="qv__dialog" role="dialog" aria-modal="true" aria-label="Quick view">
    <button class="qv__close" type="button" aria-label="Close quick view" data-qv-close><svg class="ico"><use href="#i-x"/></svg></button>
    <div class="qv__content" data-qv-content></div>
  </div>
</div>

<div class="toast" data-toast role="status" aria-live="polite"></div>`);
  }

  return { sprite, topbar, header, checkoutHeader, footer, miniFooter, mobileNav, overlays, WA };
})();
