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
    store.set("cars", [{ model: B.models[1], vin: "YV1XZ00000A000000", plate: "а123вс", reg: "777", year: "2019", km: "86 400", last: "12.09.2026", next: "15 ноября", nextKm: "90 000" }]);
  }

  function firstCar() { var c = store.get("cars"); return c && c[0]; }

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
    var car = firstCar(), user = store.get("user");
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
    h += '<a class="card tile" href="#services"><div class="ic">' + ic("wrench") + "</div><div><b>Услуги и цены</b><span>" + B.services.length + " услуг, запись в одно касание</span></div></a>";
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
    var user = store.get("user"), car = firstCar();
    var d = new Date(); d.setDate(d.getDate() + 1);
    var minDate = d.toISOString().slice(0, 10);
    var slots = []; for (var m = 9 * 60; m < 21 * 60; m += 30) slots.push(hm(m) + "–" + hm(m + 30));
    var svc = (draft.promo ? ["Акция: " + draft.promo] : []).concat(draft.svc ? [draft.svc] : []);
    var h = '<div class="scr">' + top("Запись на ремонт");
    h += car ? '<div class="card tile carrow"><div class="ic">' + ic("car") + "</div><div><b>" + B.marka + " " + esc(car.model) + "</b>" + plate(car) + "</div></div>"
      : '<label class="f">Ваше имя<input class="inp" id="b_name" placeholder="Как к вам обращаться"></label>' +
        '<label class="f">Телефон<input class="inp" id="b_phone" type="tel" placeholder="+7 ___ ___-__-__"></label>' +
        '<div class="f"><label class="f">Модель ' + B.marka + "</label>" + chips("b_model", B.models, "") + "</div>";
    h += '<label class="f">Подразделение<select class="inp" id="b_loc">' + B.locations.map(function (l) { return "<option>" + esc(l.name) + "</option>"; }).join("") + '</select></label><div class="muted small" id="b_addr" style="margin-top:-10px">' + esc(B.locations[0].address) + "</div>";
    h += '<div class="f"><label class="f">Услуги <span class="muted" style="font-weight:500">(можно несколько)</span></label><div class="chips multi" id="b_svc">' + svc.concat(B.services).map(function (x, i) { return '<button class="chip' + (i < svc.length ? " on" : "") + '" data-v="' + esc(x) + '">' + esc(x) + "</button>"; }).join("") + "</div></div>";
    h += '<label class="f">День<input class="inp" type="date" id="b_date" min="' + minDate + '" value="' + minDate + '"></label>';
    h += '<div class="f"><label class="f">Время</label><div class="slots" id="b_time">' + slots.map(function (t) { return '<button class="chip" data-v="' + t + '">' + t + "</button>"; }).join("") + "</div></div>";
    h += '<label class="f">Комментарий<textarea class="inp" id="b_comment" rows="2" placeholder="Что беспокоит в машине"></textarea></label>';
    if (!user) h += '<label class="check"><input type="checkbox" id="b_agree"><span>Я согласен на обработку персональных данных и принимаю <a href="' + B.privacy + '" target="_blank">политику конфиденциальности</a></span></label>';
    return h + '<button class="btn" id="b_send">Отправить заявку</button><p class="muted small center" style="margin:0">Администратор перезвонит и подтвердит время.</p></div>';
  };
  function hm(m) { return Math.floor(m / 60) + ":" + ("0" + (m % 60)).slice(-2); }
  function chips(id, arr, on) { return '<div class="chips" id="' + id + '">' + arr.map(function (m) { return '<button class="chip' + (m === on ? " on" : "") + '" data-v="' + esc(m) + '">' + esc(m) + "</button>"; }).join("") + "</div>"; }

  V.sent = function () {
    return '<div class="scr notabs center"><div class="ok">' + ic("check", 40) + '</div><h1 style="margin:8px 0 0">Заявка принята</h1><p class="muted">Мы перезвоним в ближайшее время и подтвердим запись.</p><a class="btn" href="#home">На главную</a></div>';
  };

  var DEMO_ORDERS = [
    { n: "1256", d: "12.09.2026", sum: "18 450", st: ["Закрыт", "Оплачен"], works: ["Плановое ТО", "Замена масла в двигателе", "Замена масляного и воздушного фильтров"] },
    { n: "1061", d: "03.04.2026", sum: "6 200", st: ["Закрыт", "Оплачен"], works: ["Замена шин", "Сход-развал"] },
    { n: "746", d: "15.11.2025", sum: "4 500", st: ["Закрыт", "Оплачен"], works: ["Диагностика подвески на стенде"] },
    { n: "540", d: "22.08.2025", sum: "21 900", st: ["Закрыт", "Оплачен"], works: ["Замена масла в АКПП"] }
  ];
  var DEMO_RECS = [
    { d: "12.09.2026", t: "Передние тормозные колодки: износ 70%, заменить при следующем визите" },
    { d: "12.09.2026", t: "Щётки стеклоочистителя: рекомендуется замена" }
  ];
  function plate(c) { return '<span class="plate2"><span>' + esc(c.plate) + "</span><span>" + esc(c.reg) + "</span></span>"; }
  function demoNote() { return DEMO ? '<div class="demo">Пример. Настоящие данные придут из 1С сервиса.</div>' : ""; }
  function carRow(c, i) {
    return '<a class="card tile carrow" href="#carinfo/' + i + '"><div class="ic">' + ic("car") + "</div><div style=\"flex:1\"><b>" + B.marka + " " + esc(c.model) + "</b>" + plate(c) + '</div><span class="muted">›</span></a>';
  }
  V.car = function () {
    var user = store.get("user"), cars = store.get("cars") || [];
    if (!user) {
      return '<div class="scr">' + top("Мои машины") +
        '<div class="card center" style="display:flex;flex-direction:column;gap:12px;align-items:center;padding:24px 16px"><div class="tile"><div class="ic" style="width:64px;height:64px">' + ic("history", 32) + "</div></div>" +
        '<b style="font-size:19px">История ремонта</b><p class="muted" style="margin:0">Войдите по номеру телефона, который вы оставляли в сервисе. Мы покажем ваши машины, заказ-наряды и рекомендации мастера.</p>' +
        '<a class="btn" href="#login">Войти по номеру телефона</a></div></div>';
    }
    var c = cars[0];
    var h = '<div class="scr">' + top("Мои машины") + demoNote() + '<div class="list">' + cars.map(carRow).join("") + "</div>" +
      '<a class="btn line" href="#addcar">+ Добавить машину</a>';
    if (c) h += '<div class="card next"><div class="ic">' + ic("bell") + '</div><div class="small">' + esc(c.model) + ": следующее ТО <b>" + esc(c.next) + "</b><br>или на " + esc(c.nextKm) + " км, что наступит раньше</div></div>";
    return h + "</div>";
  };
  V.carinfo = function (arg) {
    var c = (store.get("cars") || [])[+arg || 0];
    if (!c) return V.car();
    var rows = [["Модель", B.marka + " " + c.model], ["VIN", c.vin], ["Гос. номер", c.plate + c.reg], ["Год выпуска", c.year + " г"], ["Зафиксированный пробег", c.km + " км"], ["Последний визит", c.last]];
    return '<div class="scr notabs">' + top(B.marka + " " + esc(c.model), true) + demoNote() +
      '<div class="card">' + rows.map(function (r) { return '<div class="setrow"><span class="muted" style="font-weight:500">' + r[0] + "</span><span>" + esc(r[1]) + "</span></div>"; }).join("") + "</div>" +
      '<a class="btn" href="#book">Записаться</a><div class="row2"><a class="btn ghost" href="#orders/' + (+arg || 0) + '">Заказы</a><a class="btn ghost" href="#recs/' + (+arg || 0) + '">Рекомендации</a></div></div>';
  };
  V.orders = function (arg) {
    var c = (store.get("cars") || [])[+arg || 0] || {};
    return '<div class="scr notabs">' + top("Заказы", true) + demoNote() + '<div class="list">' + DEMO_ORDERS.map(function (o) {
      return '<div class="card order"><div class="oh"><div><b>Заказ-наряд №' + o.n + '</b><div class="muted small">от ' + o.d + " · " + B.marka + " " + esc(c.model) + '</div></div><div class="st">' + o.st.map(function (x, i) { return '<span class="' + (i ? "paid" : "closed") + '">' + x + "</span>"; }).join("") + "</div></div>" +
        '<div class="small">' + o.works.map(esc).join("<br>") + '</div><div class="sum">Сумма: ' + o.sum + " ₽</div></div>";
    }).join("") + "</div></div>";
  };
  V.recs = function () {
    return '<div class="scr notabs">' + top("Рекомендации", true) + demoNote() + '<p class="muted small" style="margin:-6px 0 0">Что мастер советует сделать при следующем визите.</p><div class="list">' + DEMO_RECS.map(function (r) {
      return '<div class="card tile"><div class="ic">' + ic("wrench") + "</div><div><b>" + esc(r.t) + "</b><span>Осмотр " + r.d + "</span></div></div>";
    }).join("") + '</div><a class="btn" href="#book">Записаться</a></div>';
  };
  V.addcar = function () {
    return '<div class="scr notabs">' + top("Добавить машину", true) +
      '<label class="f">Модель<select class="inp">' + B.models.map(function (m) { return "<option>" + esc(m) + "</option>"; }).join("") + "</select></label>" +
      '<label class="f">Гос. номер<input class="inp" placeholder="а123вс777"></label><label class="f">VIN (необязательно)<input class="inp" placeholder="17 знаков"></label>' +
      '<div class="row2"><label class="f">Год выпуска<input class="inp" inputmode="numeric" placeholder="2019"></label><label class="f">Пробег, км<input class="inp" inputmode="numeric" placeholder="86 000"></label></div>' +
      '<a class="btn" href="#car">Сохранить</a></div>';
  };
  V.services = function () {
    return '<div class="scr notabs">' + top("Услуги и цены", true) + '<p class="muted small" style="margin:-6px 0 0">Цены приходят из программы сервиса.</p><div class="card">' + B.services.filter(function (x) { return x !== "Другое"; }).map(function (x) {
      return '<a class="setrow" href="#book" data-svc="' + esc(x) + '"><span>' + esc(x) + '</span><span class="link small">Записаться</span></a>';
    }).join("") + "</div></div>";
  };

  V.contacts = function () {
    var L = B.locations;
    var cLon = L.reduce(function (s, l) { return s + l.ll[0]; }, 0) / L.length, cLat = L.reduce(function (s, l) { return s + l.ll[1]; }, 0) / L.length;
    var pts = L.map(function (l, i) { return l.ll[0] + "," + l.ll[1] + ",pm2rdl" + (i + 1); }).join("~");
    var src = "https://yandex.ru/map-widget/v1/?ll=" + cLon + "," + cLat + "&z=" + (L.length > 2 ? 10 : 11) + "&pt=" + pts;
    var h = '<div class="scr">' + top("Контакты") + (L.length > 1 ? '<select class="inp" id="c_loc"><option value="">Все сервисы</option>' + L.map(function (l, i) { return '<option value="' + i + '">' + esc(l.name) + "</option>"; }).join("") + "</select>" : "") +
      '<div class="map"><div class="ph">Яндекс Карта</div><iframe id="c_map" src="' + src + '" loading="lazy"></iframe></div>';
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
    var parts = ((location.hash || "").slice(1) || (store.get("seen") ? "home" : "welcome")).split("/");
    var r = parts[0];
    if (!V[r]) r = "home";
    app.innerHTML = V[r](parts[1]);
    tabs.hidden = !TABBED[r];
    tabs.querySelectorAll("a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-tab") === r); });
    window.scrollTo(0, 0);
    bind(r);
  }

  function bind(r) {
    app.querySelectorAll("[data-back]").forEach(function (b) { b.onclick = function () { history.back(); }; });
    app.querySelectorAll("[data-skip]").forEach(function (b) { b.onclick = function () { store.set("seen", true); }; });
    app.querySelectorAll("[data-promo]").forEach(function (b) { b.onclick = function () { draft.promo = b.getAttribute("data-promo"); }; });
    app.querySelectorAll(".chips,.slots").forEach(function (c) {
      c.onclick = function (e) {
        var t = e.target.closest(".chip"); if (!t) return; e.preventDefault();
        if (c.classList.contains("multi")) { t.classList.toggle("on"); return; }
        c.querySelectorAll(".chip").forEach(function (x) { x.classList.remove("on"); }); t.classList.add("on");
      };
    });
    app.querySelectorAll("[data-svc]").forEach(function (b) { b.onclick = function () { draft.svc = b.getAttribute("data-svc"); }; });
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
    if (r === "book") {
      var loc = document.getElementById("b_loc");
      loc.onchange = function () { document.getElementById("b_addr").textContent = B.locations[loc.selectedIndex].address; };
      document.getElementById("b_send").onclick = function () {
        var user = store.get("user"), car = firstCar();
        var val = function (id) { var x = document.getElementById(id); return x ? x.value.trim() : ""; };
        var on = function (id) { return Array.prototype.map.call(document.querySelectorAll("#" + id + " .on"), function (x) { return x.getAttribute("data-v"); }); };
        if (!user && !document.getElementById("b_agree").checked) { alert("Отметьте согласие с политикой конфиденциальности"); return; }
        if (!user && !val("b_phone")) { alert("Укажите телефон"); return; }
        if (!on("b_time").length) { alert("Выберите время"); return; }
        var req = {
          brand: B.id, name: user ? user.name : val("b_name"), phone: user ? user.phone : val("b_phone"),
          car: car || { model: on("b_model")[0] || "" }, services: on("b_svc"), location: loc.value,
          date: val("b_date"), time: on("b_time")[0], comment: val("b_comment")
        };
        draft = {};
        // TODO: отправка заявки в 1С (как в мини-приложении @BPbazabot).
        if (API) fetch(API + "/booking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(req) }).catch(function () {});
        location.hash = "sent";
      };
    }
    if (r === "contacts" && document.getElementById("c_loc")) {
      var sel = document.getElementById("c_loc"), map = document.getElementById("c_map"), all = map.src;
      sel.onchange = function () {
        var l = B.locations[+sel.value];
        map.src = sel.value === "" ? all : "https://yandex.ru/map-widget/v1/?ll=" + l.ll[0] + "," + l.ll[1] + "&z=16&pt=" + l.ll[0] + "," + l.ll[1] + ",pm2rdl";
      };
    }
    if (r === "settings") {
      var lo = document.getElementById("logout"), da = document.getElementById("delacc");
      if (lo) lo.onclick = function () { store.set("user", null); store.set("cars", null); location.hash = "home"; };
      if (da) da.onclick = function () { if (confirm("Удалить аккаунт и все данные в приложении?")) { store.set("user", null); store.set("cars", null); location.hash = "home"; } };
    }
  }

  window.addEventListener("hashchange", render);
  render();
})();
