// Билпрайм: одно приложение, три марки. Марка задаётся в brand.js (или ?brand= для просмотра).
(function () {
  "use strict";
  var qs = new URLSearchParams(location.search);
  var B = window.BRANDS[qs.get("brand") || window.BRAND_ID] || window.BRANDS.volvo;
  var DEMO = qs.get("demo") === "1";
  // Адрес сервера заявок и истории ремонтов (1С). Пока не подключён.
  var API = "";

  var root = document.documentElement.style;
  root.setProperty("--accent", B.accent);
  root.setProperty("--accent2", B.accent2);
  root.setProperty("--soft", B.soft);
  document.title = B.title;

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("bp_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("bp_" + k, JSON.stringify(v)); } catch (e) {} }
  };

  if (DEMO) {
    store.set("seen", true);
    store.set("user", { phone: "+7 916 000-00-00", name: "Александр" });
    store.set("car", { model: B.models[1], year: "2019", plate: "А 123 ВС 777", km: "86 400", next: "15 ноября", nextKm: "90 000" });
  }

  var IC = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    car: '<path d="M5 16V11l2-5h10l2 5v5"/><rect x="3" y="11" width="18" height="6" rx="2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
    pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.7-7.7a4 4 0 0 0-5-5z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 14.4H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>'
  };
  function ic(n, s) { return '<svg viewBox="0 0 24 24" width="' + (s || 22) + '" height="' + (s || 22) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + IC[n] + "</svg>"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function tel() { return B.phone ? "tel:" + B.phone.replace(/[^+\d]/g, "") : "#"; }
  function phoneText() { return B.phone || "номер будет"; }
  function logo() { return '<div class="logo"><span class="mk">B</span><div>BILPRIME<small>Сервис ' + B.marka + "</small></div></div>"; }
  function top(title, back) { return '<div class="top">' + (back ? '<button class="back" data-back>' + ic("back") + "</button>" : "") + "<h1>" + title + "</h1></div>"; }
  function routeUrl(l) { return "https://yandex.ru/maps/?rtext=~" + l.ll[1] + "," + l.ll[0] + "&rtt=auto"; }

  var app = document.getElementById("app");
  var tabs = document.getElementById("tabs");
  tabs.querySelectorAll("[data-ic]").forEach(function (el) { el.outerHTML = ic(el.getAttribute("data-ic"), 24); });

  var V = {};

  V.welcome = function () {
    return '<div class="scr notabs welcome">' + logo() +
      '<div class="feat"><p class="big">' + esc(B.tagline) + "</p>" +
      feat("history", "История ремонта", "Все работы по вашей машине в телефоне") +
      feat("bell", "Напоминание о ТО", "Подскажем, когда пора на обслуживание") +
      feat("cal", "Запись за минуту", "Выберите услугу, сервис и время") +
      feat("tag", "Акции", "Свежие скидки сервиса " + B.marka) + "</div>" +
      '<div class="list"><a class="btn" href="#login">Войти по номеру телефона</a>' +
      '<a class="btn ghost" href="#home" data-skip>Продолжить без входа</a></div></div>';
  };
  function feat(i, t, s) { return '<div class="tile"><div class="ic">' + ic(i) + "</div><div><b>" + t + "</b><span>" + s + "</span></div></div>"; }

  V.login = function () {
    return '<div class="scr notabs">' + top("Вход", true) +
      '<p class="muted">Введите номер, который вы оставляли в сервисе. По нему мы найдём вашу машину и историю ремонта.</p>' +
      '<label class="f">Номер телефона<input class="inp" type="tel" inputmode="tel" placeholder="+7 ___ ___-__-__" id="ph"></label>' +
      '<label class="check"><input type="checkbox" id="agree"><span>Я согласен на обработку персональных данных и принимаю <a href="' + B.privacy + '" target="_blank">политику конфиденциальности</a></span></label>' +
      '<button class="btn" id="sendcode">Получить код в SMS</button></div>';
  };

  V.code = function () {
    return '<div class="scr notabs">' + top("Код из SMS", true) +
      '<p class="muted">Мы отправили код на ваш номер. Введите его ниже.</p>' +
      '<div class="code">' + [1, 2, 3, 4].map(function () { return '<input class="inp" inputmode="numeric" maxlength="1">'; }).join("") + "</div>" +
      '<button class="btn" id="checkcode">Войти</button><a class="link center small" href="#login">Отправить код ещё раз</a></div>';
  };

  V.home = function () {
    var car = store.get("car"), user = store.get("user");
    var h = '<div class="scr"><div class="top">' + logo() + '<span style="flex:1"></span><a class="back" href="#settings">' + ic("gear") + "</a></div>";
    h += '<div class="hero"><h2>' + (user ? "Здравствуйте, " + esc(user.name) + "!" : "Сервис " + B.marka + " «Билпрайм»") + "</h2>" +
      "<p>" + (B.locations.length > 1 ? B.locations.length + " сервиса в Москве" + (B.id === "volvo" ? " и Мытищах" : "") : "Москва, " + B.locations[0].address.replace("г. Москва, ", "")) + ". Ежедневно 9:00–21:00</p>" +
      '<div class="row2"><a class="btn light" href="#book">' + ic("cal", 20) + "Записаться</a>" +
      '<a class="btn light" href="' + tel() + '">' + ic("phone", 20) + "Позвонить</a></div></div>";
    if (car) {
      h += '<a class="card next" href="#car"><div class="tile"><div class="ic">' + ic("bell") + "</div><div><b>Следующее ТО: " + esc(car.next) + "</b><span>или на " + esc(car.nextKm) + " км · " + esc(car.model) + "</span></div></div></a>";
    } else {
      h += '<a class="card tile" href="#car"><div class="ic">' + ic("history") + "</div><div><b>История ремонта вашей машины</b><span>Войдите по номеру телефона</span></div></a>";
    }
    h += '<div class="sec">Акции</div><div class="hscroll">' + B.promos.slice(0, 3).map(promoCard).join("") + "</div>";
    h += '<div class="sec">Почему мы</div><div class="list">' + B.advantages.map(function (a) { return '<div class="card tile"><div class="ic">' + ic("shield") + "</div><div><b>" + esc(a[0]) + "</b><span>" + esc(a[1]) + "</span></div></div>"; }).join("") + "</div>";
    return h + "</div>";
  };

  function promoCard(p) {
    return '<div class="card promo"><span class="badge">' + esc(p.badge) + "</span><b>" + esc(p.title) + '</b><span class="muted small">' + esc(p.text) + "</span>" +
      '<div class="acts"><a class="btn" href="#book" data-promo="' + esc(p.title) + '">Записаться</a><a class="btn ghost" href="' + esc(p.link) + '" target="_blank">Подробнее</a></div></div>';
  }

  V.promos = function () {
    return '<div class="scr">' + top("Акции") + '<p class="muted small" style="margin:-8px 0 0">Акции берутся с сайта ' + B.site.replace(/https?:\/\/|\//g, "") + ' и обновляются сами.</p><div class="list" id="promolist">' + B.promos.map(promoCard).join("") + "</div></div>";
  };

  var draft = store.get("draft", {});
  V.book = function () {
    var user = store.get("user") || {}, car = store.get("car") || {};
    var d = new Date(); d.setDate(d.getDate() + 1);
    var minDate = d.toISOString().slice(0, 10);
    var h = '<div class="scr">' + top("Запись на сервис") +
      '<label class="f">Ваше имя<input class="inp" id="b_name" value="' + esc(user.name || "") + '" placeholder="Как к вам обращаться"></label>' +
      '<label class="f">Телефон<input class="inp" id="b_phone" type="tel" value="' + esc(user.phone || "") + '" placeholder="+7 ___ ___-__-__"></label>' +
      '<div class="f"><label class="f">Модель ' + B.marka + "</label>" + chips("b_model", B.models, car.model) + "</div>" +
      '<label class="f">Услуга<select class="inp" id="b_service">' + (draft.promo ? '<option selected>Акция: ' + esc(draft.promo) + "</option>" : "") + B.services.map(function (s) { return "<option>" + esc(s) + "</option>"; }).join("") + "</select></label>" +
      (B.locations.length > 1 ? '<div class="f"><label class="f">Сервис</label>' + chips("b_loc", B.locations.map(function (l) { return l.name; }), B.locations[0].name) + "</div>" : "") +
      '<div class="row2"><label class="f">Дата<input class="inp" type="date" id="b_date" min="' + minDate + '" value="' + minDate + '"></label>' +
      '<label class="f">Время<select class="inp" id="b_time">' + ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map(function (t) { return "<option" + (t === "10:00" ? " selected" : "") + ">" + t + "</option>"; }).join("") + "</select></label></div>" +
      '<label class="f">Комментарий<textarea class="inp" id="b_comment" rows="2" placeholder="Что беспокоит в машине"></textarea></label>' +
      '<label class="check"><input type="checkbox" id="b_agree"' + (store.get("user") ? " checked" : "") + '><span>Я согласен на обработку персональных данных и принимаю <a href="' + B.privacy + '" target="_blank">политику конфиденциальности</a></span></label>' +
      '<button class="btn" id="b_send">Отправить заявку</button><p class="muted small center" style="margin:0">Администратор перезвонит и подтвердит время.</p></div>';
    return h;
  };
  function chips(id, arr, on) { return '<div class="chips" id="' + id + '">' + arr.map(function (m) { return '<button class="chip' + (m === on ? " on" : "") + '" data-v="' + esc(m) + '">' + esc(m) + "</button>"; }).join("") + "</div>"; }

  V.sent = function () {
    return '<div class="scr notabs center"><div class="ok">' + ic("check", 40) + '</div><h1 style="margin:8px 0 0">Заявка принята</h1><p class="muted">Мы перезвоним в ближайшее время и подтвердим запись.</p><a class="btn" href="#home">На главную</a></div>';
  };

  var DEMO_HIST = [
    { d: "12.09.2026", w: "Плановое ТО, замена масла и фильтров", s: "18 450 ₽", km: "84 900", r: "Передние колодки — износ 70%, заменить при следующем визите" },
    { d: "03.04.2026", w: "Замена шин, сход-развал", s: "6 200 ₽", km: "78 300" },
    { d: "15.11.2025", w: "Диагностика подвески на стенде", s: "0 ₽", km: "74 100", r: "Подвеска в норме" },
    { d: "22.08.2025", w: "Замена масла в АКПП", s: "21 900 ₽", km: "70 050" }
  ];
  V.car = function () {
    var user = store.get("user"), car = store.get("car");
    if (!user) {
      return '<div class="scr">' + top("Моя машина") +
        '<div class="card center" style="display:flex;flex-direction:column;gap:12px;align-items:center;padding:24px 16px"><div class="tile"><div class="ic" style="width:64px;height:64px">' + ic("history", 32) + "</div></div>" +
        '<b style="font-size:19px">История ремонта</b><p class="muted" style="margin:0">Войдите по номеру телефона, который вы оставляли в сервисе. Мы покажем вашу машину и все работы по ней.</p>' +
        '<a class="btn" href="#login">Войти по номеру телефона</a></div></div>';
    }
    var h = '<div class="scr">' + top("Моя машина");
    if (DEMO) h += '<div class="demo">Пример. Настоящие данные придут из 1С сервиса.</div>';
    h += '<div class="card" style="display:flex;flex-direction:column;gap:14px"><div class="carhead"><div><b>' + B.marka + " " + esc(car.model) + '</b><div class="muted small">' + esc(car.year) + " · пробег " + esc(car.km) + ' км</div></div><span class="plate">' + esc(car.plate) + "</span></div>" +
      '<div class="next"><div class="ic">' + ic("bell") + '</div><div class="small">Следующее ТО: <b>' + esc(car.next) + "</b><br>или на " + esc(car.nextKm) + " км, что наступит раньше</div></div>" +
      '<a class="btn" href="#book">Записаться на ТО</a></div>';
    h += '<div class="sec">История ремонта</div><div class="card hist">' + DEMO_HIST.map(function (x) {
      return '<div class="it"><span class="d">' + x.d + " · " + x.km + ' км</span><span class="w">' + esc(x.w) + '</span><span class="s">' + x.s + "</span>" + (x.r ? '<span class="r">Мастер: <em>' + esc(x.r) + "</em></span>" : "") + "</div>";
    }).join("") + "</div>";
    return h + "</div>";
  };

  V.contacts = function () {
    var L = B.locations;
    var cLon = L.reduce(function (s, l) { return s + l.ll[0]; }, 0) / L.length, cLat = L.reduce(function (s, l) { return s + l.ll[1]; }, 0) / L.length;
    var pts = L.map(function (l, i) { return l.ll[0] + "," + l.ll[1] + ",pm2rdl" + (i + 1); }).join("~");
    var src = "https://yandex.ru/map-widget/v1/?ll=" + cLon + "," + cLat + "&z=" + (L.length > 2 ? 10 : 11) + "&pt=" + pts;
    var h = '<div class="scr">' + top("Контакты") + '<div class="map"><div class="ph">Яндекс Карта со всеми сервисами</div><iframe src="' + src + '" loading="lazy"></iframe></div>';
    h += L.map(function (l, i) {
      return '<div class="card loc"><div><b>' + (L.length > 1 ? (i + 1) + ". " : "") + esc(l.name) + '</b><div class="muted small">' + esc(l.address) + "<br>" + esc(l.hours) + "</div></div>" +
        '<div class="row2"><a class="btn" href="' + tel() + '">' + ic("phone", 20) + 'Позвонить</a><a class="btn ghost" href="' + routeUrl(l) + '" target="_blank">' + ic("route", 20) + "Маршрут</a></div></div>";
    }).join("");
    h += '<div class="card"><div class="setrow"><span>Телефон</span><a class="link" href="' + tel() + '">' + esc(phoneText()) + "</a></div>" +
      '<div class="setrow"><span>Сайт</span><a class="link" href="' + B.site + '" target="_blank">' + B.site.replace(/https?:\/\/|\//g, "") + "</a></div>" +
      (B.telegram ? '<div class="setrow"><span>Telegram</span><a class="link" href="' + B.telegram + '" target="_blank">Открыть</a></div>' : "") +
      (B.youtube ? '<div class="setrow"><span>YouTube</span><a class="link" href="' + B.youtube + '" target="_blank">Открыть</a></div>' : "") + "</div>";
    return h + "</div>";
  };

  V.settings = function () {
    var user = store.get("user");
    return '<div class="scr notabs">' + top("Настройки", true) + '<div class="card">' +
      '<label class="setrow"><span>Напоминания о ТО</span><input type="checkbox" checked style="width:22px;height:22px;accent-color:var(--accent)"></label>' +
      '<label class="setrow"><span>Уведомления об акциях</span><input type="checkbox" checked style="width:22px;height:22px;accent-color:var(--accent)"></label>' +
      '<a class="setrow" href="' + B.privacy + '" target="_blank"><span>Политика конфиденциальности</span><span class="muted">›</span></a>' +
      '<a class="setrow" href="' + B.site + '" target="_blank"><span>Наш сайт</span><span class="muted">›</span></a></div>' +
      (user ? '<div class="card"><div class="setrow"><span>Вы вошли как</span><span class="muted">' + esc(user.phone) + '</span></div><button class="setrow" id="logout" style="width:100%;background:none;border:0;padding:14px 0">Выйти</button><button class="setrow danger" id="delacc" style="width:100%;background:none;border:0;padding:14px 0">Удалить аккаунт</button></div>' : "") +
      '<p class="muted small center">' + esc(B.title) + " · версия 1.0</p></div>";
  };

  var TABBED = { home: 1, book: 1, car: 1, promos: 1, contacts: 1 };
  function render() {
    var r = (location.hash || "").slice(1) || (store.get("seen") ? "home" : "welcome");
    if (!V[r]) r = "home";
    app.innerHTML = V[r]();
    tabs.hidden = !TABBED[r];
    tabs.querySelectorAll("a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-tab") === r); });
    window.scrollTo(0, 0);
    bind(r);
  }

  function bind(r) {
    app.querySelectorAll("[data-back]").forEach(function (b) { b.onclick = function () { history.back(); }; });
    app.querySelectorAll("[data-skip]").forEach(function (b) { b.onclick = function () { store.set("seen", true); }; });
    app.querySelectorAll("[data-promo]").forEach(function (b) { b.onclick = function () { draft.promo = b.getAttribute("data-promo"); }; });
    app.querySelectorAll(".chips").forEach(function (c) {
      c.onclick = function (e) { var t = e.target.closest(".chip"); if (!t) return; e.preventDefault(); c.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("on"); }); t.classList.add("on"); };
    });
    if (r === "login") document.getElementById("sendcode").onclick = function () {
      if (!document.getElementById("agree").checked) { alert("Отметьте согласие с политикой конфиденциальности"); return; }
      store.set("pendingPhone", document.getElementById("ph").value);
      location.hash = "code";
    };
    if (r === "code") document.getElementById("checkcode").onclick = function () {
      // TODO: проверка кода на сервере, затем загрузка машины и истории из 1С.
      store.set("seen", true);
      store.set("user", { phone: store.get("pendingPhone", ""), name: "" });
      location.hash = "car";
    };
    if (r === "book") document.getElementById("b_send").onclick = function () {
      if (!document.getElementById("b_agree").checked) { alert("Отметьте согласие с политикой конфиденциальности"); return; }
      if (!document.getElementById("b_phone").value.trim()) { alert("Укажите телефон"); return; }
      var on = function (id) { var x = document.querySelector("#" + id + " .on"); return x ? x.getAttribute("data-v") : ""; };
      var req = {
        brand: B.id, name: document.getElementById("b_name").value, phone: document.getElementById("b_phone").value,
        model: on("b_model"), service: document.getElementById("b_service").value, location: on("b_loc") || B.locations[0].name,
        date: document.getElementById("b_date").value, time: document.getElementById("b_time").value, comment: document.getElementById("b_comment").value
      };
      draft = {};
      // TODO: отправка заявки туда же, куда форма с сайта.
      if (API) fetch(API + "/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(req) }).catch(function () {});
      location.hash = "sent";
    };
    if (r === "settings") {
      var lo = document.getElementById("logout"), da = document.getElementById("delacc");
      if (lo) lo.onclick = function () { store.set("user", null); store.set("car", null); location.hash = "home"; };
      if (da) da.onclick = function () { if (confirm("Удалить аккаунт и все данные в приложении?")) { store.set("user", null); store.set("car", null); location.hash = "home"; } };
    }
  }

  window.addEventListener("hashchange", render);
  render();
})();
