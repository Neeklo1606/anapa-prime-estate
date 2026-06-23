// Mock data for «Югэксэнд» — Anapa real estate platform
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const HERO_IMAGES = [hero1, hero2, hero3];

// Use Unsplash for property/news photography
const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type PropertyType = "квартира" | "апартаменты" | "дом" | "коммерция";
export type PropertyStatus = "в продаже" | "скоро" | "распродано";

export type District =
  | "Центр" | "Высокий берег" | "Пионерский проспект" | "Анапская" | "Витязево" | "Джемете" | "Сукко";

export interface Complex {
  id: string;
  slug: string;
  name: string;
  district: District;
  priceFrom: number;
  deadline: string; // e.g. "II квартал 2026"
  status: PropertyStatus;
  badges: string[]; // у моря, семейный, инвестиции, бизнес-класс
  cover: string;
  gallery: string[];
  description: string;
  advantages: string[];
  infrastructure: string[];
  class: "комфорт" | "бизнес" | "премиум";
  floors: number;
  buildings: number;
}

export interface Property {
  id: string;
  complexId: string;
  type: PropertyType;
  title: string;
  rooms: number; // 0 = студия
  area: number;
  floor: number;
  totalFloors: number;
  price: number;
  district: District;
  address: string;
  deadline: string;
  status: PropertyStatus;
  finishing: "без отделки" | "предчистовая" | "чистовая" | "с мебелью";
  photos: string[];
  description: string;
  badges: string[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: "Рынок" | "Ипотека" | "Новостройки" | "Инвестиции";
  date: string;
  cover: string;
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  budget?: string;
  purpose?: string;
  comment?: string;
  source: "сайт" | "Avito" | "CRM" | "вручную";
  status: "новая" | "в работе" | "назначен звонок" | "закрыта";
  context?: string; // property/complex name
  createdAt: string;
}

export interface AvitoChat {
  id: string;
  client: string;
  avatar: string;
  property: string;
  lastMessage: string;
  unread: number;
  status: "новый" | "в работе" | "отвечен";
  messages: { from: "client" | "agent"; text: string; time: string }[];
}

export const DISTRICTS: District[] = [
  "Центр", "Высокий берег", "Пионерский проспект", "Анапская", "Витязево", "Джемете", "Сукко",
];

export const COMPLEXES: Complex[] = [
  {
    id: "c1", slug: "yuzhniy-bereg", name: "ЖК Южный Берег", district: "Пионерский проспект",
    priceFrom: 6_900_000, deadline: "IV квартал 2026", status: "в продаже",
    badges: ["у моря", "бизнес-класс"], class: "бизнес", floors: 16, buildings: 4,
    cover: u("photo-1545324418-cc1a3fa10c00"),
    gallery: [u("photo-1545324418-cc1a3fa10c00"), u("photo-1512917774080-9991f1c4c750"), u("photo-1564013799919-ab600027ffc6"), u("photo-1493809842364-78817add7ffb")],
    description: "Премиальный жилой комплекс в 300 метрах от моря. Закрытая территория, подземный паркинг, благоустроенный двор-парк с собственным выходом к набережной.",
    advantages: ["300 м до моря", "Закрытая территория", "Подземный паркинг", "Дизайнерские лобби", "Эксплуатируемая кровля"],
    infrastructure: ["Школа в 5 минутах", "Детский сад во дворе", "Фитнес-клуб на 1 этаже", "Кафе и магазины", "Набережная"],
  },
  {
    id: "c2", slug: "morskoy-kvartal", name: "ЖК Морской Квартал", district: "Витязево",
    priceFrom: 4_500_000, deadline: "II квартал 2026", status: "в продаже",
    badges: ["у моря", "семейный"], class: "комфорт", floors: 9, buildings: 6,
    cover: u("photo-1502672260266-1c1ef2d93688"),
    gallery: [u("photo-1502672260266-1c1ef2d93688"), u("photo-1560448204-e02f11c3d0e2"), u("photo-1505691938895-1758d7feb511"), u("photo-1600585154340-be6161a56a0c")],
    description: "Семейный квартал малоэтажной застройки рядом с пляжами Витязево. Уютные дворы без машин, игровые площадки и зелёный променад.",
    advantages: ["700 м до пляжа", "Дворы без машин", "Школа на территории", "Велодорожки"],
    infrastructure: ["Школа", "2 детских сада", "Поликлиника", "Гипермаркет", "Аквапарк рядом"],
  },
  {
    id: "c3", slug: "anapa-park", name: "ЖК Анапа Парк", district: "Центр",
    priceFrom: 5_200_000, deadline: "III квартал 2025", status: "в продаже",
    badges: ["семейный", "инвестиции"], class: "комфорт", floors: 12, buildings: 3,
    cover: u("photo-1430285561322-7808604715df"),
    gallery: [u("photo-1430285561322-7808604715df"), u("photo-1600596542815-ffad4c1539a9"), u("photo-1600210492486-724fe5c67fb0")],
    description: "Жилой комплекс в самом центре Анапы — рядом парк 30-летия Победы, бульвар и Центральный рынок.",
    advantages: ["В центре города", "Готовая инфраструктура", "Большие планировки", "Витражное остекление"],
    infrastructure: ["Парк рядом", "Школы и сады", "ТРЦ Красная площадь", "Поликлиника"],
  },
  {
    id: "c4", slug: "vysokiy-bereg", name: "ЖК Высокий Берег", district: "Высокий берег",
    priceFrom: 8_900_000, deadline: "I квартал 2027", status: "скоро",
    badges: ["у моря", "бизнес-класс", "инвестиции"], class: "премиум", floors: 18, buildings: 2,
    cover: u("photo-1582268611958-ebfd161df9d8"),
    gallery: [u("photo-1582268611958-ebfd161df9d8"), u("photo-1613977257363-707ba9348227"), u("photo-1600607687939-ce8a6c25118c")],
    description: "Премиум-проект на Высоком берегу с панорамой моря. Видовые квартиры, рестораны, SPA и закрытая клубная инфраструктура.",
    advantages: ["Панорама моря", "Клубный дом", "SPA и фитнес", "Кончьерж-сервис 24/7"],
    infrastructure: ["Маяк и пляжи", "Рестораны", "Яхт-клуб", "Спортивные клубы"],
  },
  {
    id: "c5", slug: "solnechny", name: "ЖК Солнечный", district: "Джемете",
    priceFrom: 3_800_000, deadline: "IV квартал 2025", status: "в продаже",
    badges: ["семейный", "инвестиции"], class: "комфорт", floors: 10, buildings: 5,
    cover: u("photo-1545324418-cc1a3fa10c00", 1000),
    gallery: [u("photo-1545324418-cc1a3fa10c00"), u("photo-1549517045-bc93de075e53")],
    description: "Доступное жильё в Джемете с готовой инфраструктурой и тёплым морем в 10 минутах ходьбы.",
    advantages: ["10 мин до моря", "Готовая отделка", "Доступная цена", "Большой двор"],
    infrastructure: ["Школа", "Детсад", "Магазины", "Пляжи Джемете"],
  },
  {
    id: "c6", slug: "centralniy", name: "ЖК Центральный", district: "Центр",
    priceFrom: 7_400_000, deadline: "II квартал 2026", status: "в продаже",
    badges: ["бизнес-класс", "инвестиции"], class: "бизнес", floors: 14, buildings: 1,
    cover: u("photo-1600585154340-be6161a56a0c"),
    gallery: [u("photo-1600585154340-be6161a56a0c"), u("photo-1600607687939-ce8a6c25118c")],
    description: "Бизнес-класс в самом центре. Авторская архитектура, лобби с консьержем, видовые квартиры на парк.",
    advantages: ["Авторская архитектура", "Консьерж-сервис", "Видовые этажи", "Премиум-отделка МОПов"],
    infrastructure: ["Парк рядом", "Театр", "Музеи", "Рестораны"],
  },
  {
    id: "c7", slug: "sukko-residence", name: "ЖК Сукко Резиденс", district: "Сукко",
    priceFrom: 5_800_000, deadline: "III квартал 2026", status: "в продаже",
    badges: ["у моря", "инвестиции"], class: "бизнес", floors: 8, buildings: 3,
    cover: u("photo-1493809842364-78817add7ffb"),
    gallery: [u("photo-1493809842364-78817add7ffb"), u("photo-1512917774080-9991f1c4c750")],
    description: "Малоэтажный курортный комплекс у можжевеловой рощи и моря. Идеален для сдачи в аренду.",
    advantages: ["Курортная локация", "Можжевеловая роща", "Бассейн", "Управляющая компания"],
    infrastructure: ["Пляж Сукко", "Кафе", "Аквапарк", "Конные прогулки"],
  },
  {
    id: "c8", slug: "anapskaya-sloboda", name: "ЖК Анапская Слобода", district: "Анапская",
    priceFrom: 3_200_000, deadline: "I квартал 2026", status: "в продаже",
    badges: ["семейный"], class: "комфорт", floors: 5, buildings: 8,
    cover: u("photo-1560448204-e02f11c3d0e2"),
    gallery: [u("photo-1560448204-e02f11c3d0e2"), u("photo-1505691938895-1758d7feb511")],
    description: "Малоэтажный квартал в пригороде Анапы — тишина, свой участок, парковка у дома.",
    advantages: ["Малоэтажная застройка", "Парковка у дома", "Тихий район", "Свежий воздух"],
    infrastructure: ["Школа", "Магазины", "Поликлиника"],
  },
];

// Generate 24 properties across complexes
const finish = ["без отделки", "предчистовая", "чистовая", "с мебелью"] as const;
const types: PropertyType[] = ["квартира", "апартаменты", "дом", "коммерция"];

export const PROPERTIES: Property[] = (() => {
  const list: Property[] = [];
  const photos = [
    u("photo-1502672260266-1c1ef2d93688"), u("photo-1560448204-e02f11c3d0e2"),
    u("photo-1505691938895-1758d7feb511"), u("photo-1600585154340-be6161a56a0c"),
    u("photo-1600607687939-ce8a6c25118c"), u("photo-1613977257363-707ba9348227"),
    u("photo-1600210492486-724fe5c67fb0"), u("photo-1600596542815-ffad4c1539a9"),
    u("photo-1549517045-bc93de075e53"), u("photo-1493809842364-78817add7ffb"),
  ];
  let i = 0;
  for (const c of COMPLEXES) {
    const count = 3;
    for (let k = 0; k < count; k++) {
      i++;
      const rooms = [0, 1, 2, 3, 1, 2][i % 6];
      const area = [28, 38, 52, 74, 42, 60][i % 6];
      const t: PropertyType = k === 2 && c.id === "c6" ? "коммерция" : "квартира";
      const price = c.priceFrom + rooms * 1_200_000 + (i % 5) * 250_000;
      list.push({
        id: `p${i}`,
        complexId: c.id,
        type: t,
        title: rooms === 0 ? `Студия ${area} м² в ${c.name}` : `${rooms}-комн. ${area} м² в ${c.name}`,
        rooms, area,
        floor: 2 + (i % (c.floors - 2)),
        totalFloors: c.floors,
        price,
        district: c.district,
        address: `г. Анапа, ${c.district}, ${c.name}, корп. ${1 + (k % c.buildings)}`,
        deadline: c.deadline,
        status: c.status,
        finishing: finish[i % finish.length],
        photos: [photos[i % photos.length], photos[(i + 1) % photos.length], photos[(i + 2) % photos.length]],
        description: `Светлая ${rooms === 0 ? "студия" : `${rooms}-комнатная квартира`} с панорамным остеклением в ${c.name}. Высокие потолки, продуманная планировка, видовой этаж.`,
        badges: c.badges.slice(0, 2),
      });
    }
  }
  return list;
})();

export const NEWS: NewsItem[] = [
  {
    id: "n1", slug: "ipoteka-2026", title: "Семейная ипотека 2026: что изменится для покупателей в Анапе",
    category: "Ипотека", date: "2026-06-10",
    cover: u("photo-1554224155-6726b3ff858f"),
    excerpt: "Разбираем новые условия семейной ипотеки и считаем, какие ЖК в Анапе выгоднее всего покупать в этом году.",
    content: "С июня 2026 года вступили в силу обновлённые условия семейной ипотеки. Главное изменение — расширение программы на семьи с одним ребёнком в курортных регионах, в том числе на Анапу.\n\nСтавка осталась на уровне 6%, лимит — 12 млн рублей. Это означает, что большинство квартир в ЖК комфорт-класса можно приобрести с льготным платежом.\n\nНаши эксперты подобрали 12 жилых комплексов Анапы, которые полностью подходят под обновлённые условия.",
    seoTitle: "Семейная ипотека 2026 в Анапе — условия, ставки, ЖК",
    seoDescription: "Новые условия семейной ипотеки 2026 в Анапе: ставка 6%, лимит 12 млн. Подборка ЖК, подходящих под программу.",
  },
  {
    id: "n2", slug: "novostroyki-vysokiy-bereg", title: "Новостройки Высокого Берега: 5 проектов, которые стартуют в 2026",
    category: "Новостройки", date: "2026-05-28",
    cover: u("photo-1486325212027-8081e485255e"),
    excerpt: "Обзор премиальных проектов на Высоком берегу: от клубных домов до курортных резиденций.",
    content: "Высокий берег — самая премиальная локация Анапы. В 2026 году здесь стартует сразу 5 проектов разных классов: от клубных домов на 36 квартир до больших курортных кварталов.\n\nМы посетили площадки и разобрали каждый проект: архитектура, инфраструктура, цена входа и инвестиционный потенциал.",
    seoTitle: "Новостройки Высокого Берега Анапы 2026 — обзор 5 ЖК",
    seoDescription: "Премиальные новостройки Высокого Берега Анапы: цены, сроки, инвестиционный потенциал.",
  },
  {
    id: "n3", slug: "investicii-arenda", title: "Сколько приносит апартамент в Анапе: разбор доходности 2026",
    category: "Инвестиции", date: "2026-05-12",
    cover: u("photo-1560518883-ce09059eeffa"),
    excerpt: "Сравнили доходность от долгосрочной и посуточной аренды в 3 районах Анапы. Цифры могут удивить.",
    content: "Мы проанализировали 240 объектов за последние 18 месяцев и посчитали реальную доходность. Спойлер: посуточная аренда у моря даёт до 14% годовых, но требует управления.",
    seoTitle: "Доходность апартаментов в Анапе 2026 — посуточная и долгосрочная аренда",
    seoDescription: "Реальные цифры доходности недвижимости в Анапе: 240 объектов, 3 района, 18 месяцев данных.",
  },
  {
    id: "n4", slug: "rynok-2026-h1", title: "Рынок недвижимости Анапы: итоги первого полугодия 2026",
    category: "Рынок", date: "2026-06-20",
    cover: u("photo-1518770660439-4636190af475"),
    excerpt: "Цена квадратного метра, доли сделок, самые продаваемые ЖК. Подробный отчёт.",
    content: "Средняя цена квадратного метра в новостройках Анапы выросла на 8.4% за первое полугодие. Самые продаваемые проекты — ЖК Морской Квартал и ЖК Анапа Парк.",
    seoTitle: "Рынок недвижимости Анапы — итоги H1 2026",
    seoDescription: "Цены, сделки, лидеры продаж — полный обзор рынка новостроек Анапы за первое полугодие 2026.",
  },
  {
    id: "n5", slug: "kak-vybrat-zk", title: "Как выбрать ЖК у моря: чек-лист от Югэксэнд",
    category: "Новостройки", date: "2026-04-30",
    cover: u("photo-1502672260266-1c1ef2d93688"),
    excerpt: "11 пунктов, которые мы проверяем при подборе ЖК у моря для наших клиентов.",
    content: "За 8 лет работы мы составили внутренний чек-лист из 11 критериев, по которым оцениваем каждый ЖК у моря. Делимся им открыто.",
    seoTitle: "Как выбрать ЖК у моря в Анапе — чек-лист",
    seoDescription: "11 критериев выбора жилого комплекса у моря в Анапе от агентства Югэксэнд.",
  },
  {
    id: "n6", slug: "ipoteka-stavki", title: "Ключевая ставка снижена: что это значит для покупателей",
    category: "Ипотека", date: "2026-04-15",
    cover: u("photo-1554224154-22dec7ec8818"),
    excerpt: "ЦБ снизил ставку на 0.5 п.п. Разбираем, как это повлияет на ипотеку и цены.",
    content: "Снижение ключевой ставки приводит к удешевлению рыночной ипотеки. Прогнозируем рост спроса на 15-20% в ближайшие 3 месяца.",
    seoTitle: "Снижение ключевой ставки и ипотека в Анапе",
    seoDescription: "Как снижение ключевой ставки повлияет на ипотеку и рынок недвижимости Анапы.",
  },
];

export const INITIAL_LEADS: Lead[] = [
  { id: "l1", name: "Анна К.", phone: "+7 918 234-56-78", budget: "до 8 млн", purpose: "Для семьи", source: "сайт", status: "новая", context: "ЖК Морской Квартал", createdAt: "2026-06-22T10:24:00" },
  { id: "l2", name: "Игорь П.", phone: "+7 928 145-90-22", budget: "до 12 млн", purpose: "Инвестиции", source: "Avito", status: "в работе", context: "2-комн. в ЖК Южный Берег", createdAt: "2026-06-21T15:10:00" },
  { id: "l3", name: "Светлана М.", phone: "+7 905 678-12-44", budget: "до 5 млн", purpose: "Переезд", source: "сайт", status: "назначен звонок", context: "ЖК Солнечный", createdAt: "2026-06-21T09:02:00" },
  { id: "l4", name: "Алексей Д.", phone: "+7 962 333-21-09", budget: "15+ млн", purpose: "Инвестиции", source: "CRM", status: "в работе", context: "ЖК Высокий Берег", createdAt: "2026-06-20T18:40:00" },
  { id: "l5", name: "Марина С.", phone: "+7 988 002-88-11", budget: "до 7 млн", purpose: "Для родителей", source: "сайт", status: "закрыта", context: "ЖК Анапа Парк", createdAt: "2026-06-19T12:00:00" },
  { id: "l6", name: "Дмитрий В.", phone: "+7 918 765-43-21", budget: "до 10 млн", purpose: "Для семьи", source: "Avito", status: "новая", context: "ЖК Центральный", createdAt: "2026-06-22T08:15:00" },
  { id: "l7", name: "Ольга Н.", phone: "+7 952 121-31-41", budget: "до 4 млн", purpose: "Курортная", source: "сайт", status: "новая", context: "ЖК Сукко Резиденс", createdAt: "2026-06-22T11:55:00" },
  { id: "l8", name: "Артём Г.", phone: "+7 903 800-50-50", budget: "до 6 млн", purpose: "Инвестиции", source: "вручную", status: "в работе", context: "Студия в ЖК Морской Квартал", createdAt: "2026-06-18T14:20:00" },
];

const av = (s: string) => `https://i.pravatar.cc/100?u=${s}`;

export const INITIAL_CHATS: AvitoChat[] = [
  {
    id: "ch1", client: "Екатерина", avatar: av("ekaterina"),
    property: "2-комн. ЖК Южный Берег, 54 м²", lastMessage: "Скажите, торг возможен?",
    unread: 2, status: "новый",
    messages: [
      { from: "client", text: "Здравствуйте! Объект ещё актуален?", time: "10:14" },
      { from: "agent", text: "Здравствуйте! Да, в продаже.", time: "10:18" },
      { from: "client", text: "А когда сдача и какая отделка?", time: "10:20" },
      { from: "client", text: "Скажите, торг возможен?", time: "10:22" },
    ],
  },
  {
    id: "ch2", client: "Михаил", avatar: av("mihail"),
    property: "Студия ЖК Морской Квартал, 28 м²", lastMessage: "Спасибо, подумаю",
    unread: 0, status: "отвечен",
    messages: [
      { from: "client", text: "Какой первоначальный взнос по ипотеке?", time: "09:00" },
      { from: "agent", text: "От 15% по семейной программе. Могу подобрать банк.", time: "09:05" },
      { from: "client", text: "Спасибо, подумаю", time: "09:08" },
    ],
  },
  {
    id: "ch3", client: "Наталья", avatar: av("natalya"),
    property: "3-комн. ЖК Высокий Берег, 88 м²", lastMessage: "Готовы посмотреть в субботу",
    unread: 1, status: "в работе",
    messages: [
      { from: "client", text: "Можно ли посмотреть планировку?", time: "12:30" },
      { from: "agent", text: "Конечно, отправляю PDF.", time: "12:45" },
      { from: "client", text: "Готовы посмотреть в субботу", time: "13:10" },
    ],
  },
  {
    id: "ch4", client: "Сергей", avatar: av("sergey"),
    property: "1-комн. ЖК Анапа Парк, 42 м²", lastMessage: "Какой этаж лучше?",
    unread: 1, status: "новый",
    messages: [
      { from: "client", text: "Здравствуйте, рассматриваю под аренду", time: "16:00" },
      { from: "client", text: "Какой этаж лучше?", time: "16:02" },
    ],
  },
  {
    id: "ch5", client: "Виктория", avatar: av("victoria"),
    property: "Апартаменты ЖК Сукко Резиденс", lastMessage: "Спасибо, всё понятно",
    unread: 0, status: "отвечен",
    messages: [
      { from: "client", text: "Какая доходность от посуточной аренды?", time: "11:00" },
      { from: "agent", text: "По нашим данным — 10-14% годовых.", time: "11:20" },
      { from: "client", text: "Спасибо, всё понятно", time: "11:22" },
    ],
  },
];

export const COLLECTIONS = [
  { key: "sea", title: "У моря", description: "Квартиры в 5-15 минутах от пляжа", filter: (c: Complex) => c.badges.includes("у моря") },
  { key: "invest", title: "Для инвестиций", description: "Высокая доходность и ликвидность", filter: (c: Complex) => c.badges.includes("инвестиции") },
  { key: "family", title: "Семейные ЖК", description: "Школы, сады, дворы без машин", filter: (c: Complex) => c.badges.includes("семейный") },
  { key: "ready", title: "С готовой отделкой", description: "Заезжайте и живите", filter: (_c: Complex) => true },
  { key: "2026", title: "Сдача в 2026", description: "Ключи уже в этом году", filter: (c: Complex) => c.deadline.includes("2026") },
];
