// Данные трёх приложений. Всё взято с сайтов 26.10.2026.
// Телефоны: на сайтах подменные (коллтрекинг), сюда ставим статические номера от Nov.
window.BRANDS = {
  volvo: {
    id: "volvo",
    marka: "Volvo",
    title: "Билпрайм Volvo",
    tagline: "Сервис Volvo «Билпрайм» — 40% это реально!",
    site: "https://bilprime.ru/",
    privacy: "https://bilprime.ru/politika-konfidentsialnosti-mobilnogo-prilozheniya/",
    promosApi: "https://bilprime.ru/wp-json/wp/v2/posts?categories=34&per_page=20&_embed=wp:featuredmedia",
    phone: "", // статический номер, даст Nov
    email: "info@bilprime.ru",
    accent: "#1f3a68", accent2: "#3b6fb6", soft: "#eaf0f8",
    telegram: "https://t.me/bilprime",
    vk: "https://vk.com/bilprime",
    youtube: "https://www.youtube.com/@bilprime",
    models: ["XC90", "XC60", "XC40", "S90", "S60", "V90", "V60", "V40", "S80", "XC70", "Другая"],
    advantages: [
      ["Опытная команда", "Каждый сотрудник прошёл школу официального дилера"],
      ["3 сервисных центра", "Выбирайте наиболее удобный для вас"],
      ["Запасные части", "95% необходимых деталей всегда в наличии"],
      ["Цена", "Экономия около 40% стоимости в сравнении с дилером"]
    ],
    services: [
      "Плановое техническое обслуживание", "Замена масла в двигателе", "Диагностика",
      "Диагностика подвески", "Ремонт АКПП", "Замена тормозных колодок и дисков",
      "Замена ремня ГРМ", "Ремонт системы охлаждения", "Диагностика кондиционера",
      "Дополнительное оборудование", "Другое"
    ],
    locations: [
      { name: "Мытищи", address: "г. Мытищи, ул. Колпакова, 2", hours: "Ежедневно 9:00–21:00", email: "kolpakova@bilprime.ru", ll: [37.7419, 55.9138] },
      { name: "Киевская", address: "г. Москва, ул. Киевская, 14", hours: "Ежедневно 9:00–21:00", email: "kievka@bilprime.ru", ll: [37.5636, 55.7428] },
      { name: "Сокольники", address: "г. Москва, ул. Матросская Тишина, 16Г", hours: "Ежедневно 9:00–21:00", email: "bajova@bilprime.ru", ll: [37.7024, 55.7928] }
    ],
    promos: [
      { title: "Выгодное первое посещение", text: "Специальные условия для владельцев Volvo, которые обращаются в Билпрайм впервые.", badge: "−30% на работы", link: "https://bilprime.ru/volvo-15-prosentov-skidka-na-servise/" },
      { title: "Техническое обслуживание Volvo", text: "Уточним необходимый объём обслуживания и заранее рассчитаем стоимость.", badge: "−50% на работы", link: "https://bilprime.ru/aktsiya-to-volvo-so-skidkoj-50/" },
      { title: "Осмотр Volvo по 52 точкам", text: "Бесплатная проверка 52 ключевых точек при первом посещении с рекомендациями.", badge: "Бесплатно", link: "https://bilprime.ru/besplatnyj-osmotr-avtomobilya-po-52-tochkam/" },
      { title: "Автозапуск Volvo", text: "Дистанционный запуск двигателя по фиксированной цене. Для платформ SPA и CMA.", badge: "32 000 ₽", link: "https://bilprime.ru/ustanovka_avtozapuska_na_avtomobil_volvo_distantsionnyy_zapusk_dvigatelya_volvo_alternativa_volvo_on_call/" },
      { title: "Комплексная диагностика двигателя", text: "При ошибках, нестабильной работе двигателя, посторонних звуках.", badge: "5 600 ₽", link: "https://bilprime.ru/kompleksnaya-diagnostika-dvigatelya-volvo-po-spetsialnoy-tsene" },
      { title: "Проверка перед дальней дорогой", text: "Комплексная проверка ключевых систем перед отпуском или поездкой.", badge: "2 800 ₽", link: "https://bilprime.ru/diagnostika-avtomobilya-pered-dalnej-dorogoj/" }
    ]
  },
  mercedes: {
    id: "mercedes",
    marka: "Mercedes",
    title: "Билпрайм Mercedes",
    tagline: "Ваш надёжный специалист по ремонту и обслуживанию Mercedes",
    site: "https://bpmers.ru/",
    privacy: "https://bilprime.ru/politika-konfidentsialnosti-mobilnogo-prilozheniya/",
    promosApi: "", // на bpmers.ru нет рубрики «Акции»
    phone: "",
    email: "info@bilprime.ru",
    accent: "#23272e", accent2: "#5a6472", soft: "#eef0f3",
    telegram: "https://t.me/bpmers",
    vk: "", youtube: "https://www.youtube.com/@bilprime",
    models: ["A-класс", "C-класс", "E-класс", "S-класс", "CLA", "GLA", "GLC", "GLE", "GLS", "G-класс", "Другая"],
    advantages: [
      ["Гарантия 6 месяцев", "На работы и на запасные части"],
      ["Персональный механик", "Вы можете быть с автомобилем при ремонте"],
      ["История обслуживания", "Рекомендации при каждом посещении"],
      ["Бонусные баллы", "Программа бонусных баллов"]
    ],
    services: [
      "Техническое обслуживание", "Замена масла в двигателе", "Компьютерная диагностика",
      "Замена колодок и дисков", "Диагностика подвески", "Сход-развал", "Замена масла в АКПП",
      "Диагностика кондиционера", "Промывка радиаторов", "Диагностика перед покупкой", "Другое"
    ],
    locations: [
      { name: "Сокольники", address: "г. Москва, ул. Матросская Тишина, 16Г", hours: "Ежедневно 9:00–21:00", email: "", ll: [37.7024, 55.7928] },
      { name: "Киевская", address: "г. Москва, ул. Киевская, 14, стр. 1", hours: "Ежедневно 9:00–21:00", email: "", ll: [37.5636, 55.7428] }
    ],
    promos: [
      { title: "Техническое обслуживание Mercedes за 5 000 ₽", text: "Это реально! Успей до 30 октября!", badge: "5 000 ₽", link: "https://bpmers.ru/" },
      { title: "Скидка −30% при первом посещении", text: "Воспользуйся своим преимуществом.", badge: "−30%", link: "https://bpmers.ru/" },
      { title: "Скидка 38% на замену масла в АКПП", text: "Профессиональная замена масла в АКПП.", badge: "−38%", link: "https://bpmers.ru/" },
      { title: "ТО Мерседес с дисконтом 30%", text: "Обслуживание от сотрудников с опытом официального дилера!", badge: "−30%", link: "https://bpmers.ru/" }
    ]
  },
  geely: {
    id: "geely",
    marka: "Geely",
    title: "Билпрайм Geely",
    tagline: "Профильный сервис Geely",
    site: "https://bilgeely.ru/",
    privacy: "https://bilprime.ru/politika-konfidentsialnosti-mobilnogo-prilozheniya/",
    promosApi: "https://bilgeely.ru/wp-json/wp/v2/posts?categories=4&per_page=20&_embed=wp:featuredmedia",
    phone: "",
    email: "info@bilprime.ru",
    accent: "#1557b0", accent2: "#3d8bfd", soft: "#e9f2fe",
    telegram: "https://t.me/bilprime",
    vk: "https://vk.com/bilprime", youtube: "https://www.youtube.com/@bilprime",
    models: ["Monjaro", "Atlas", "Atlas Pro", "Coolray", "Tugella", "Okavango", "Preface", "Emgrand", "Cityray", "Другая"],
    advantages: [
      ["Знаем Geely", "Глубокое знание конструктивных особенностей моделей Geely"],
      ["Оборудование", "Профессиональное диагностическое оборудование"],
      ["Честно", "Честная диагностика и прозрачные цены"],
      ["Экспресс ТО", "Всего за 2 часа, строго по записи"]
    ],
    services: [
      "Техническое обслуживание Geely", "Экспресс ТО за 2 часа", "Диагностика Geely", "Замена масла",
      "Обслуживание тормозной системы", "Ремонт двигателя", "Ремонт АКПП и МКПП",
      "Ремонт ходовой части", "Ремонт системы охлаждения", "Ремонт электрооборудования", "Другое"
    ],
    locations: [
      { name: "Киевская", address: "г. Москва, ул. Киевская, 14", hours: "Ежедневно 9:00–21:00", email: "", ll: [37.5636, 55.7428] }
    ],
    promos: [
      { title: "Скидка первого посещения −30%", text: "Впервые у нас? Дарим скидку 30% на все виды работ при первом визите.", badge: "−30%", link: "https://bilgeely.ru/skidka-pervogo-poseshhenija-30/" },
      { title: "Экспресс ТО Geely всего за 2 часа", text: "Строго по записи. Гарантируем завершение всех работ за 2 часа.", badge: "2 часа", link: "https://bilgeely.ru/express-obsluzhivanie-geely-za-2-chasa/" },
      { title: "Комплексная диагностика кондиционера Geely", text: "Кондиционер не включается или стал хуже охлаждать? Фиксированная цена.", badge: "5 900 ₽", link: "https://bilgeely.ru/kompleksnaja-diagnostika-kondicionera-geely/" },
      { title: "Проверка подвески на стенде MAHA в подарок!", text: "", badge: "Подарок", link: "https://bilgeely.ru/proverka-podveski-na-stende-maha-v-podarok/" }
    ]
  }
};
