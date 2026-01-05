import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'
import { ContentType, PrismaClient } from 'generated/prisma'

const data = [
  {
    id: '6921fd56e2d88ece775d2a8f',
    comment:
      'Фемка максимального уровня унижала мужиков, это пиздец, против целой оравы, а Джастин пидорас',
    createdAt: '2025-11-22T18:13:42.719Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/sgl3Mlw1LHrXX7HYEHUe43nuTRS.jpg',
    rated: 7.5,
    title: 'Красотка на взводе',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '691a3065cde3c6a71bb595ff',
    comment:
      'мать шлюха, дырка, убийца, пидораска, просто ебаная нечесть, олицетворение современной женщины, но за то харизматичная шлюха, меркантильное убище, надеюсь, в реальной жизни она быстро помрет, а дочка это просто младшая версия её пизданутой матери, тупорылые шлюхи ',
    createdAt: '2025-11-16T20:13:25.942Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/1yGNxmIfzr9UqKGxGoPF4P1AKbH.jpg',
    rated: 2,
    title: 'Джинни и Джорджия',
    type: 'TV',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '69190618375621e2436911ed',
    comment:
      'пидорасы наебал жестко, эмоциональные качели на уровне отношений, кайфанул пизда, улыбался весь фильм и приуныл тоже так же, битва ебанутая, сучка ебанутая, вампир респект, стерпел поцелуй, а волкодав все таки педофил, респект легендам',
    createdAt: '2025-11-15T23:00:40.320Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/fgVXAUj9w6OrVlhQ0YPiZhO46j5.jpg',
    rated: 10,
    title: 'Сумерки. Сага: Рассвет — Часть 2',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '691508a324d23736b6ccbf2c',
    comment:
      'ТРЕШАЧОК, во первых джейкоб куколд, алень, а теперь ещё и в придачу педофил, ахуенный фильм, шутка, но понравилось, педофил остановил войну, а качок в ебычь прописал пару раз красиво, респект легенде, а батю как всегда держат за лоха, жалко его',
    createdAt: '2025-11-12T22:22:27.767Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/hnJ5U57LWu6xHp8w0z3o0ZdgFTf.jpg',
    rated: 8.8,
    title: 'Сумерки. Сага: Рассвет — Часть 1',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '690e7629fbd6bf642fafc9af',
    comment:
      'терпиугольник, 2 аленя боряться за хуй пойми че, за 200 грамм паленово вареника, который просрочился ещё с рождения, тупорылая пизда сама не ебет, что хочет, за то говорит одному - я выйду за тебя, а второму - целуй меня. Полный пиздец, нету слов, одни эмоции, пидораска, ебанная, тварь, шлюха, нечесть, вымри блядина',
    createdAt: '2025-11-07T22:43:53.201Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/dK4Gi1UdMiHzHc7r7CZQG4IQ9Sr.jpg',
    rated: 6,
    title: 'Сумерки. Сага: Затмение',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '690a6801e83ef7cacaca05e7',
    comment:
      'бля хуже первой, волгодак куколд, а вампир немощь ебанная, унизи лоха перед его девушкой, это пиздец',
    createdAt: '2025-11-04T20:54:25.360Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/skucxWub4EZh1spfrgVFOlHwYCU.jpg',
    rated: 3,
    title: 'Сумерки. Сага: Новолуние',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '690111cbdd62a9a4b250c07c',
    comment:
      'Китайский лох, альфач, фрик, эдвард кэнуей получается оргазм в течении всего фильма, но альфач лучший, но проявился слабо, он мог ебало всем снести нахуй, но веганы кучка лохов бестыжих ',
    createdAt: '2025-10-28T18:56:11.120Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/pWI6GBi4eMQttMtKSWbxIFO2HqC.jpg',
    rated: 7,
    title: 'Сумерки',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '68fa391e240950bb2ab46308',
    comment:
      'Бля ну начало прикольное, но чел объективно тюбик, рассталась и пошла поебалась с челом, будто это нормально и не считается...',
    createdAt: '2025-10-23T14:18:06.634Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/181frO8pQaK7UZUMycM3FodIBIf.jpg',
    rated: 7,
    title: 'Наша вина',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '68ebed62fd1ea38310b88263',
    comment: 'ХЭППИ ЭНД СУКА',
    createdAt: '2025-10-12T18:03:14.176Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/4q2rqiOXnn8oo4Uuvp0HkOgsE5D.jpg',
    rated: 8,
    title: 'Из моего окна 3: новая встреча',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '68ebc2cba00ef8c929a3c89b',
    comment:
      'Фильм то в целом не лохой, но блять, ахуенно она в конце обвинила челика в том, что будто из-за него розовый сдох, типикал телка, очень обидные слова говорила, на его месте я бы расстался с ней и больше бы не виделся, потому что так нельзя говорить, особенно - "он мой друг, а ты кто?", полный пиздец',
    createdAt: '2025-10-12T15:01:31.450Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/xaLEDuDtsL4xN0mee5wC40gnABm.jpg',
    rated: 7,
    title: 'Из моего окна: За морями',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '68cb04def105a66dcf1c2cff',
    comment:
      'смешной сериальчик, 1 сезон топовый, а вот 2ой ну так средне, а 3 сезон ну хз, может чуть лучше 2го, но 1 сезон топовый и смешной, по сути красиво завершили сериал, новым годом, ну, а хуле Федор смешной пидор, ЗАЙЦЕВ + 1',
    createdAt: '2025-09-17T18:58:38.818Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/8vAwWzC9QKW0z58VXcLKlZpaSXs.jpg',
    rated: 8.6,
    title: 'Зайцев+1',
    type: 'TV',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '68c6d5fb53c36e4c3a163f59',
    comment: '',
    createdAt: '2025-09-14T14:49:31.351Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/wL1S9750WaxxvbbuUBfkbAskDd8.jpg',
    rated: 9,
    title: 'Человек-паук: Вдали от дома',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '68b35aaa03e7f7e4ee92d88f',
    comment:
      'Шлюха, хавальщик и мажик, тупо трио пидорасов, но идеально показывает, что любовь за деньги не купишь, любовь Джона имеет смысл, но и мужество нужно иметь, а не хавать её пизду\n\nХАВАЛЬЩИК',
    createdAt: '2025-08-30T20:10:18.540Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/9i5hJa4OZLWKXv8NOrpy3ogAcRu.jpg',
    rated: 8,
    title: 'Материалистка',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6897b6c9a5908385261bf826',
    comment:
      'не знаю че. но как-то не особо зашло, хотя я люблю человека паука хохланда',
    createdAt: '2025-08-09T20:59:53.472Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/nfJ28YpTXuerXToj52d3maPOMnM.jpg',
    rated: 7,
    title: 'Человек-паук: Возвращение домой',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '688f8c51c751a36c070f99e5',
    comment:
      'бляя ну типо прикольно, но я был уставший и пиздец не впечатлился, даже заснуть хотел',
    createdAt: '2025-08-03T16:20:33.055Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/bXUHpvzSevyjjKgyNt7cfdehhrR.jpg',
    rated: 6,
    title: 'Верни её из мёртвых',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '688d17ff9d3b37cc9cc480d4',
    comment:
      'забавный фильм, есть конечно моменты которые прям похожие с мультиком и как-то завайбило, всегда любил этот мультик, но прям не очень похоже на него, но все равно прикольный фильм, особенно обожаю стича\n\nактеры как всегда не похожи...особенно негр, в фильме качек и лысый, а тут дед какой-то пердун',
    createdAt: '2025-08-01T19:39:43.910Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/6oStXJKWII37FkiT668C4GD3F5V.jpg',
    rated: 8.5,
    title: 'Лило и Стич',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '68888fc7e25ed2bdc9de9482',
    comment:
      'Не мой любимый жанр, но ахуенный фильм, интрига, романтика, все по кайфу, но по больше бы любви и было бы красиво',
    createdAt: '2025-07-29T09:09:27.984Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/hqegP9dEXPN4SWyYZmNlXRA6vdW.jpg',
    rated: 9.8,
    title: 'Формула 1',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '688524bb8152fd2ce980028e',
    comment:
      'ну такое, если честно, чуть озвучка подвела, что не оригинал ну и симбиоты, в частности веном показали как лохи, которые нихуя не могут, потому что в сравнении с веномом в игре чел паук 2, то это небо и земля....в трилогии веном - как маленький мальчик, веселый и балуется...ну хз такое се',
    createdAt: '2025-07-26T18:55:55.172Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/YFcQ65dRrLpUpMiMFrrRV6rkEs.jpg',
    rated: 6.2,
    title: 'Веном: Последний танец',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6856fd550cfcbdc1ac5add40',
    comment: 'Фрики + квиры + куколды',
    createdAt: '2025-06-21T18:43:33.434Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/mQdOFRfNcnX1rWrHlHBp5SMmgOF.jpg',
    rated: 8.1,
    title: 'Кто угодно, кроме тебя',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '684eb8bc65d9da36dd2f1269',
    comment:
      'Бля ну тупо классная мелодрама, фоновая музыка американская, вайб очень приятный, и как сказал чел: «Мы любим друг друга, это все, что важно»',
    createdAt: '2025-06-15T12:12:44.142Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/pHOfU2qUndqL9v3H38gLV1ObIAS.jpg',
    rated: 10,
    title: 'Зима, весна, лето или осень',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '683a4144275ed9e28b41411a',
    comment:
      'Бля Саммер шлюха ебливая непригодная пошла нахуй тварь ебливая, пацан конечно тоже жазику дал, но я на его стороне, а Саммер пидорша ебаная ',
    createdAt: '2025-05-30T23:37:40.203Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/yxmZkLwPQJrl5n5J9IKVSPAxh5K.jpg',
    rated: 9,
    title: '500 дней лета',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67e8604b7660e62b3488c379',
    comment: 'прикол №3 я вахуе красиво эмоционально x-фактор я вахуе давай!',
    createdAt: '2025-03-29T21:04:11.967Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/6UbnKS5KL9JCzeQca1jfGJzDpIF.jpg',
    rated: 5,
    title: 'Бриджит Джонс 3',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67e8447668bede6cbd3f78fb',
    comment: 'прикол №2',
    createdAt: '2025-03-29T19:05:26.168Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/1YdcRNePQNNhIa5WTochb2TY1Ix.jpg',
    rated: 3.5,
    title: 'Бриджит Джонс: Грани разумного',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67e8446168bede6cbd3f78fa',
    comment: 'прикол №1',
    createdAt: '2025-03-29T19:05:05.663Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/132tQ6hzei84HwrW3rZuIKi9JkO.jpg',
    rated: 3,
    title: 'Дневник Бриджит Джонс',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67c2d952165733186e7e179d',
    comment: 'Страхиття и кайф мне нрав реал страшно было скример ',
    createdAt: '2025-03-01T09:54:26.187Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/wc4b71qrP6tmrz8RsU6TQubnOV7.jpg',
    rated: 9,
    title: 'Улыбка 2',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67b33b044f0b2d4f407ddf9b',
    comment:
      'ну пиздец 3 часа кайфа, чел лега, не сломался...я вахуе, ахуенный фильм',
    createdAt: '2025-02-17T13:35:00.770Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/bv7XaMz155UTyQSOy2CHllMrAf9.jpg',
    rated: 10,
    title: 'Граф Монте-Кристо',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67abc32fb0d4b23394a3b46d',
    comment: '.......хз не испугал как-то и как-то сыро, если честно',
    createdAt: '2025-02-11T21:37:51.003Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/qIfasOp7pFgcUBGj6gjtaf51Yb0.jpg',
    rated: 4,
    title: 'Носферату',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67abc318b0d4b23394a3b46c',
    comment: 'ну бля проходняк ебучий, сори',
    createdAt: '2025-02-11T21:37:28.515Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/ldICnnu0eQ1hc0lgLn2sjlMKpGP.jpg',
    rated: 3,
    title: 'Вульфмен',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67abc2f2b0d4b23394a3b46b',
    comment:
      'Ну типо прикольно, даже мрачно моментами, особенно в концовке где ебанина улыбается вечно, ну страшновато лан',
    createdAt: '2025-02-11T21:36:50.019Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/c7UCvEsYspQu49U5JKf0rdUPdIp.jpg',
    rated: 7,
    title: 'Улыбка',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '67abc2bbb0d4b23394a3b46a',
    comment:
      'Телка хуйня ебаная, ради секса променяла семью, врала, оправдывала свое поведение какой-то хуйней, но муж тоже хуйню сделал, тупо стерпел это, но Дикенс мне запал в душу, дерзость и уверенность, это чисто я, он мое олицетворение, он тот кем я хочу стать',
    createdAt: '2025-02-11T21:35:55.462Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/wnXHqzDzGIEpCFJesXmZSLYYWlu.jpg',
    rated: 10,
    title: 'Плохая девочка',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '678d1f5446e05fbc0db762db',
    comment:
      'ахуенная комедия, я прям угарал, мне очень понрав, было бы прикольней, если бы по больше добавили откровенности  ',
    createdAt: '2025-01-19T15:50:44.286Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/b2OQYDWZJGUrfSP6dOSyXJ3xq2r.jpg',
    rated: 9.8,
    title: 'Хочу как ты',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '676aac0f3a6c9d74a44bfcfb',
    comment: 'ахуенная смешнявка',
    createdAt: '2024-12-24T12:41:51.883Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/aB7eWGAvM9zkf4r2vmBVA8Rbd1e.jpg',
    rated: 9.7,
    title: 'Здравствуй, папа, Новый год!',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6756d5d98860eaf18e8923d4',
    comment: 'Тупо каскадеры угар чик мне нравки',
    createdAt: '2024-12-09T11:34:49.716Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/6T36kuDbXCGRistIewSwKyTmijt.jpg',
    rated: 8.7,
    title: 'Миссия: Красный',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '674d67b224119edd6516a85e',
    comment: 'Удивился только с того как пизду разрезали',
    createdAt: '2024-12-02T07:54:26.872Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/knJUVRPou9y254Oa9ckdzK6XPpC.jpg',
    rated: 5,
    title: 'Ужасающий',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '674d679a24119edd6516a85d',
    comment: 'Ебанутый фильм, но мне понравился',
    createdAt: '2024-12-02T07:54:02.587Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/x3yhBGbTqlAjxM450BANUNCHpOO.jpg',
    rated: 7.9,
    title: 'Субстанция',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '674d677b24119edd6516a85c',
    comment:
      'Недостаточно слов в этом мире описать насколько это сильная работа...лучший в мире мультсериалов...Что 1 сезон, что 2 сезон, оставили след, авторы лола всегда делали лучшее кинцо',
    createdAt: '2024-12-02T07:53:31.965Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/jkGjAHaxMG5fLwigRNdyALJuvA5.jpg',
    rated: 10,
    title: 'Аркейн',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6714cca6073aabd7fe50e4c4',
    comment: 'Почти норм',
    createdAt: '2024-10-20T09:25:58.341Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/A2CU4WbCZlkYbz9gEFIpchlIGpq.jpg',
    rated: 6,
    title: 'Чужой: Ромул',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '670e4216d3d7f029e1ec8e1a',
    comment: 'блл просто ахуенный сериал',
    createdAt: '2024-10-15T10:21:09.999Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/5CKCyhNhIsgrgo2IUidmLyVsZfb.jpg',
    rated: 9.2,
    title: 'Восьмидесятые',
    type: 'TV',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '670abd3084fb54d294cdeed0',
    comment:
      'второй раз бы не смотрел, тупая блядина оставила ребенка от не любимого человека, втф и чел ещё ебалуша поедает останки ',
    createdAt: '2024-10-12T18:17:20.993Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/hsInJC61gvlAcNKe2BSleQQtC2E.jpg',
    rated: 6,
    title: 'Всё закончится на нас',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6701644eeedf7b848712d34d',
    comment:
      'бля хуйня если честно, внатуре мьюзикл хуйни не ну бля крч не реал точно бы не посмотрел 2 раз, 1 часть куда лучше и ещё харли уродина, без обид',
    createdAt: '2024-10-05T16:07:42.691Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/sqHQhhjsfZ0UAu67RiIaUkabZZD.jpg',
    rated: 3,
    title: 'Джокер: Безумие на двоих',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '66a6989c640a5248f228794f',
    comment: 'бля ахуенный фильм збс уграчик )) бейби нож',
    createdAt: '2024-07-28T19:14:36.550Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/wALEGObmsvzh03C3nw81RxAMf96.jpg',
    rated: 9.9,
    title: 'Дэдпул и Росомаха',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '66788e20e2b4aaa50f14502b',
    comment: 'пиздец фрики чел выебал малолетку лол!',
    createdAt: '2024-06-23T21:05:36.908Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/uE2QMiofUiPUyBAPagx35jpw9aF.jpg',
    rated: 1,
    title: 'Бедные-несчастные',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '66771765023f1112a7d7bcfe',
    comment: 'хороший фильм, посмотрел чуть так и на фоне, крч норм',
    createdAt: '2024-06-22T18:26:45.976Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/grzQRCyZEEdJomeq8324AV6AI6W.jpg',
    rated: 7.8,
    title: 'Фокус',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6665a216fc0ff47ad887e075',
    comment: 'бля на фоне был ну хуй пойми',
    createdAt: '2024-06-09T12:37:42.740Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/afUoM0zoNgDRdiXM38BndRTRzXQ.jpg',
    rated: 5,
    title: 'Ассистент звезды',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '665079ba942e24027bc9b9ac',
    comment:
      'очень хороший ужастик, но обезьяны ебла, а телка гг топовая сучка выебана будет',
    createdAt: '2024-05-24T11:27:54.709Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/nAplmw9sgUDCEHrX71apW6H9qa9.jpg',
    rated: 9.8,
    title: 'Поворот не туда: Наследие',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6648c06c3acbcbfd25d8e1f6',
    comment:
      'пиздец в моменте конечно страшненько, но бл может из-за того, что переел немного скучновато стало',
    createdAt: '2024-05-18T14:51:24.772Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/dMEMvscqDRhMeVaNIm0XqrEyaWv.jpg',
    rated: 6.5,
    title: 'Черная вдова. Укус смерти',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6637a962a7acb986640aff72',
    comment: 'Похожий фильм на - Без ответа, збс крч',
    createdAt: '2024-05-05T15:44:34.751Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/9XSM0lvQ4qoYmRXoHQA22gjhZmP.jpg',
    rated: 9.4,
    title: 'Каскадёры',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '662401465c6c126b509fd0f7',
    comment:
      'ваще ахуенный фильмик, ну не прям лучший, но топовый, пизделки хорошие, эффекты ебейшие, актеры ахуенные',
    createdAt: '2024-04-20T17:54:14.434Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/z8AWDW9BaZ1oQohej87TdACGszm.jpg',
    rated: 9.9,
    title: 'Дом у дороги',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '661adf4b41f01b1d3bda8647',
    comment:
      'посмотрел 1 сезон и бля ну прикол конечно, добланный наркоша, скорее фильм про порнуху и хуйню, но пойдет на разик',
    createdAt: '2024-04-13T19:38:51.281Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/iwducKl5rdbmKiKnjhbfRZ0HBlZ.jpg',
    rated: 8.3,
    title: 'Эйфория',
    type: 'TV',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '661aded516d8a1b3dcce0420',
    comment: 'ну бля тут послабее, не прям фрики, скорее лоу фрики',
    createdAt: '2024-04-13T19:36:53.567Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/862ipc5PUEvI2BoPnPBQqYhazfI.jpg',
    rated: 8,
    title: 'Моё прекрасное несчастье 2',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '661adeae16d8a1b3dcce041f',
    comment:
      'не плохо, много экшена, смотрел в кинотеатре в укр дубляже и дергался с выстрелов, эффекты крутые, но для меня не мало тупых моментов, но то хуйня, фильм норм, были завышенные ожидания',
    createdAt: '2024-04-13T19:36:14.416Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/jYgvPrQIx8dUTivvpqkoBYCPapf.jpg',
    rated: 8.6,
    title: 'Падение империи',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65faa79b3fceabb9aded481c',
    comment: 'очень сильный фильм...',
    createdAt: '2024-03-20T09:08:43.820Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/zIRp1IeuPh4GgqFCH3y0DQuY9xP.jpg',
    rated: 9.4,
    title: '20 дней в Мариуполе',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65eb9ba2064be21ac6f5aec6',
    comment: 'Ебанутеший фильм лайк легенда старперов ',
    createdAt: '2024-03-08T23:13:38.798Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/2q2r40CuIx3LpnZiW9IBYMqkQv8.jpg',
    rated: 10,
    title: 'Царь скорпионов',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65b6c178be4a7bdfbb3951df',
    comment: 'трейлер лучше фильма',
    createdAt: '2024-01-28T21:04:56.726Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/61xgXnzXGW6CBDc7DtYEwMLV9OM.jpg',
    rated: 7.6,
    title: 'Привидение',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65b698291599947625fa6d7d',
    comment:
      'ебанутый фильм я ваухе вообще не тот который ожидал, я думал это по максимум рофлан ебало фильм, в целом можно так и сказать) но не совсем так, он говорит о жизненных проблемах и я был в шоке, это не простой рофлан кино, это чуть больше',
    createdAt: '2024-01-28T18:08:41.553Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/qqwqW8jWjZ6iaLRU98z3fdghwRn.jpg',
    rated: 9,
    title: 'Барби',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65b54691f39a8cfd80507d5d',
    comment:
      'первый раз посмотрел фул фильм на англ и крч еба ну прикольно вроде, пока не понятно, ну норм иль чё короче и вообще по картинке ожидал как будто чуть другое, а сам фильм довольно не плохой, считаю негритоска зарешала сучка грязная выебана была после выпускного инфа 100',
    createdAt: '2024-01-27T18:08:17.520Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/d5spmLeGR9kxBRQ6qxCFad1ljvT.jpg',
    rated: 7.7,
    title: 'Прогулки вдвоём',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65ad5ff5c14d392a7ce42d93',
    comment:
      'ух сучка нигершка выебана будет её тело, а так фильм хороший такой',
    createdAt: '2024-01-21T18:18:29.860Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/kSYAOHE1BEFSW5ASlZ0QnPKqSJ5.jpg',
    rated: 9,
    title: 'Сумасшедшая любовь',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65a400cd67e417ba8341e793',
    comment:
      'это лучший аниме сериал, бесспорно лучший, последний сезон полный разьеба ебала..',
    createdAt: '2024-01-14T15:42:05.084Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/9whSxgqSW7dPIIMJyM4WG3BYVo7.jpg',
    rated: 10,
    title: 'Атака титанов',
    type: 'TV',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '659ad97d957a2be1ba02ae12',
    comment:
      'хороший такой боевичок мне по нрав, но момент когда телка прыгнула и её выстрелили, а потом чел подошёл и ебанул пулю в лоб это конечно вахуе, есть интрижка, мне по нрав крч лайк, но вот беленькую бы бурури аутвест сделал бы',
    createdAt: '2024-01-07T17:03:57.514Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/v6BOv4uNYtX0sQCutyf8Gw3Fy44.jpg',
    rated: 9.2,
    title: 'Тайна 7 сестер',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6599afdd744704ff33e89562',
    comment:
      'это один из лучших мультов тем более про любовь я вахуе реал кайфанул, концовка топ, особенно момент "гибели" Уэйда, крч реал годное дерьмо сделали, спасиб',
    createdAt: '2024-01-06T19:54:05.434Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/88xo5uF03kEgFWXRQJerXRdONBE.jpg',
    rated: 10,
    title: 'Элементарно',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '659483cadc3961b8d4d06c8d',
    comment: 'Сюжет странный и запутанный, но страшная и не понятная хуйня',
    createdAt: '2024-01-02T21:44:42.567Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/gUsZ6BvPynVQBAxOzW830eE7PeF.jpg',
    rated: 7.7,
    title: 'Реинкарнация',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '658d7fec65001555139b9b18',
    comment:
      'блять пишу 3 раз потому что 2 раза случайно удалил крч топчик ебал мать мсора топовый фильм ужастик',
    createdAt: '2023-12-28T14:02:20.333Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/r9iVxomEWiQvpxhXq6lPyvVjj86.jpg',
    rated: 9.7,
    title: 'День благодарения',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '657f4756d900610e4c7c82d0',
    comment:
      'просто добрый, безобидный фильм про любовь поначалу думал то его телочка но оказалсь сестра бурури аутвест в целом прикольно на разок пойдет ну это прям реал безобидный добрый фильм я хуею',
    createdAt: '2023-12-17T19:09:10.997Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/4DNMKb1ooFaLKGOTKcvUXiN8Yhk.jpg',
    rated: 8.8,
    title: 'Секрет',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '657df42e6cc3f0607eaa7ee5',
    comment:
      'Двоякие ощущение от фильма, вроде прикольно, спокойно осилил 3 часа, но бл почему-то для меня этот фильм сложным, местами запутанным и странным, что я потерялся в фильме, что когда идёт, но в целом хороший фильм',
    createdAt: '2023-12-16T19:02:05.379Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/8OQzw8keE6sDNH25sOqPRTxhFTO.jpg',
    rated: 9.4,
    title: 'Оппенгеймер',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '657629a1fabae172b16b87fe',
    comment:
      'Хороший такой комедийчик с романом прикольно классно музыкально лайк',
    createdAt: '2023-12-10T21:11:59.471Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/tRsmKCy32Y2gHPr84860HcTU6wO.jpg',
    rated: 9.4,
    title: 'Первый встречный',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6574ca2f44f30126bfb2eb35',
    comment:
      'оч хороший и трогательный фильм с грустной концовкой, 2 истории разделенные временем, напомнило о фильме Дальняя дорога, фильм оч хороший чёткий любовь морковь ебля сучка грязная оо даа сюддааа',
    createdAt: '2023-12-09T20:12:30.153Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/gwrzidaq6T7gsoY2cA6Mj95qi0N.jpg',
    rated: 9.7,
    title: 'Слова',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6574b2d02818a2269db78457',
    comment:
      'хороший фильмец под фон так чисто влево посматриваешь хороший такой и про любовь и юморка сверху крч нормик',
    createdAt: '2023-12-09T18:32:44.845Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/xg9syO3yCDJAPOfLe8Mw7hIGE5O.jpg',
    rated: 8.9,
    title: 'Идеальный бойфренд',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '656cd5e69f34f9aa3da5a83b',
    comment:
      'хороший такой фильмец не плохо милый есть моменты трогательные крч збс разок второй пойдет',
    createdAt: '2023-12-03T19:24:20.560Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/6l1IRzTNVMCigUa8EGZCsgm9FZj.jpg',
    rated: 9.4,
    title: 'Клятва',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '656b872df79a10cfa9f74a32',
    comment: 'бля раньше было но я влол играю хз скучно',
    createdAt: '2023-12-02T19:36:12.796Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/hbWU6Q6owywuCzLRSJ0Nzxh0E2E.jpg',
    rated: 3.2,
    title: 'Прежде, чем мы расстанемся',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '656378ec158227f7e549a68e',
    comment:
      'невероятно добрый, милый и просто очень очень ебеший фильм я прям кайфанул, актерский состав ебейший, эмоции ебейшие, на душе очень хорошо и тепло, приятно как-то, просто супер фильм любовь без всякой пошлятины пушка мм)',
    createdAt: '2023-11-26T16:57:15.065Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/xzQS5C2hFRpAqS77vVQn0gfqPEj.jpg',
    rated: 10,
    title: 'Навсегда моя девушка',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65623a5ce78311cc0ae0b68b',
    comment:
      'хороший фильм посмотреть на вечер, второй раз смотрю, по кайфу чёт думал там прям ток новый год но не только антихайп',
    createdAt: '2023-11-25T18:18:02.407Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/qvtShI9utX7tkrECeKJ0T9b1vMv.jpg',
    rated: 9.6,
    title: 'Пара на праздники',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '655a5ba1fa0f9d671e36e98d',
    comment:
      'хороший такой фильмец простой с грустным финалом ну а хуле за то прикольно в целом история получилась малая ты справишься все получится чел тебя не бросит инфа сотка',
    createdAt: '2023-11-19T19:01:50.417Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/co8S9w3Z6E4ShNv6FZDgNGLJxIf.jpg',
    rated: 8.7,
    title: 'Если я останусь',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6558dd4b89cbb2274f8c669f',
    comment:
      'ой блеаа скучненько того все ебал не не крч не моё не впечатлило не досмотрел пол часа',
    createdAt: '2023-11-18T15:50:31.108Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/kBgHz5JDWlq15aJvKdBJshcAJrW.jpg',
    rated: 2.1,
    title: 'Один день',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '654fc9e5ae0881515375e369',
    comment:
      'первая половина зашла даже мила милая но прикол чел говорит что друзья причем на фул ебале, а в конце ты моя пуси это конечно прикол но норм там дакота красавица я бы с ней встр милашка писька в целом на разик пойдет',
    createdAt: '2023-11-11T18:37:24.025Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/5CLbOmQ2npCsU3qrKTgX2GFEZ9g.jpg',
    rated: 9.1,
    title: 'Доводы рассудка',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '654686fd96911db011c02e63',
    comment:
      'хороший мульт на разик второй бим бим бам бам негр конечно прикол в моменте сразу научился летать хуй мотать паутина невидимка электричество еба поц  ',
    createdAt: '2023-11-04T18:01:29.227Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/wmEKJr81CABBU68Qy2wYPwQHn0L.jpg',
    rated: 8.9,
    title: 'Человек-паук: Через вселенные',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6542bbdfa48425fe8a591e68',
    comment:
      'Очень хороший ужастик, прям лютое мясо кишки кровь и голые сиськи, зашло крч топ да ммм ну прям когда было мясо меня прям воротило постарались на славу поцы',
    createdAt: '2023-11-01T20:58:06.479Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/u2nQ2PwHNHr5jVMIIdQ73XCA00m.jpg',
    rated: 9.4,
    title: 'Пила 10',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65356e596b3f76c9a6382fcf',
    comment:
      'Скорее один из лучших фильмов из серии После, все закончилось мило классно любовь поебушки бим бим бам бам крч очень хорошее настроение после фильма и вот подошла эта серия фильмов к концу\n\nзаебись #5',
    createdAt: '2023-10-22T18:47:52.239Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/qMPcBNHcgclpl4IUiriSVcyt2Xr.jpg',
    rated: 9.8,
    title: 'После. Навсегда',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6524291b57d48fe3d677edf2',
    comment: 'на разок пойдет',
    createdAt: '2023-10-09T16:23:53.904Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/gxOqCjZ3YGxZpkKchQbHX3DeQ3V.jpg',
    rated: 6.1,
    title: 'Счастливого дня смерти',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6522ed3c422fd0beb91462d2',
    comment:
      'бл писал такой отзыва будто книжку и закрыл вкладку крч коротко чел сделал очень хороший достойное аниме фильм мульт хуй поймешь чё это, "дубляжный" дубляж просто красавцы сделали так будто это оф дубляж правда нахуй они песни переводили прям пели ебанутые иль чё но то похуй само по себе произвдедение не сказал бы что прям уровень Твоё имя но ГАРАЗДО лучше Дитя погоды без негатива, крч очень понравилось эмоции положительные даже лучше',
    createdAt: '2023-10-08T17:56:11.457Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/6YkQu9TRAsZhGGh0t7U7DP1BuhQ.jpg',
    rated: 9.8,
    title: 'Судзумэ, закрывающая двери',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '65215b4b3d4b119848ee8051',
    comment:
      'Ебать сходил в кино ахуел пересрал удивлен что там пугало прям дрыгался как хоррор збс в кино 3д звук пизда ток пососать в конце хотел и как-то тупо убили демона',
    createdAt: '2023-10-07T13:21:14.504Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/rhB3QB2dOG11LyeFXV2WtVBJFPz.jpg',
    rated: 8.8,
    title: 'Проклятие монахини 2',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6511abc5682412e2f0aa44dd',
    comment:
      'ну в общем хуй знает не понятно, не поразило, посмотрел за 2 подхода',
    createdAt: '2023-09-25T15:48:18.838Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/ideBX5vDPECNb1sHGm16aRrBN4e.jpg',
    rated: 5.1,
    title: 'Дневник памяти',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '64d88468aceb8c80de2d6eb7',
    comment:
      'не впечатлил, проходняк (( ожидал большего, та малая тупая пизда!',
    createdAt: '2023-08-13T07:21:10.872Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/764gmK70eM4LVu7PcLHJhgiQNgy.jpg',
    rated: 3.2,
    title: 'Искупление',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '64a752ea6c89d58596a8d08b',
    comment:
      'ЭТО ПОЛНЫЙ ПИЗДЕЦ, ПРОСТО ПРОЕБАЛИ ФИЛЬМ, СТОЛЬКО ВСЕГО МОЖНО БЫЛО БЫ ПРИДУМАТЬ, ЗАДУМКА ПРОДОЛЖЕНИЕ ЖЕ, А ЭТО НАХУЙ ПРО ПАРАШКУ РФ ПРОПАГАНДУ АРМИИ ТАК ЕЩЕ И СЮЖЕТ В ЦЕЛОМ ПРОСТО ТУПЕЙШИЙ НАХУЙ ЭТО ХУДШИЙ ФИЛЬМ ЕВЕР НАХУЙ ТУПОРЫЛЫЕ ДАУНЫ ПРОЕБАЛИ ИНТЕРЕСНЫЙ ФИЛЬМ ЕБЛАНЫ',
    createdAt: '2023-07-06T23:48:58.132Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/bDrMVJddHGeFwa7sGAwPWt8EGMp.jpg',
    rated: 0,
    title: '14+ Продолжение',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '64a305df5cfcc016f8098422',
    comment:
      'милый фильм и прикольный прикольный сюжет ток минусы что у телочки вообще мини бурури абсолютли и +с возрастом вообще не меняются хотя там много лет проходит в моментах но то в целом похуй фильм то в любом случае приятный девочка такая красивая ммммм',
    createdAt: '2023-07-03T17:31:11.376Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/xWk8ukJ6dhRvlrboG3qgNWNtLJ1.jpg',
    rated: 9.7,
    title: 'Бойфренд из будущего',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '649c05d362060ac53ec2dc8d',
    comment:
      'не любитель таких жанров но мне очень понриавлось грязюку намутили челики им +рэп вот что значит долг',
    createdAt: '2023-06-28T10:05:06.742Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/Acxw9ik5MIodpsmLKTC2t8x5TtC.jpg',
    rated: 9.8,
    title: 'Переводчик',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6493052f502fd5719ca9f53c',
    comment:
      'бля проходняк вообще думал будет всё по другому, не понимаю хуле хардин на обложке если его почти не было и +он не ГГ, крч хуита ебучая проходная разик один ',
    createdAt: '2023-06-21T14:11:58.657Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/9BH2uc36PsjQAIZd8F9z1C0AYJh.jpg',
    rated: 3,
    title: 'Парень с того света',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '648ebec0adfef9aa211bd948',
    comment:
      'ахахаах пидорнули чела в конце вообще фильм прикольный, экшн, любовь, малышка не бурури конечно, но нормик красивая, испанцы сделали грязючку',
    createdAt: '2023-06-18T08:22:25.031Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/1cm1bUlNIXipuMPs928glLBqrSd.jpg',
    rated: 8,
    title: 'Моя вина',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '648eaf56a85d065b0442a135',
    comment: 'ты выебывался я тебе пизды дал нигерок ебучий хуй',
    createdAt: '2023-06-18T07:16:38.945Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/2y0c8NmNKpsFvTCInjRmCEjZtCZ.jpg',
    rated: 9.6,
    title: 'Крид 3',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '648eaf36a85d065b0442a134',
    comment: 'молодй уже богатый дал русскому по ебалу молодчина ',
    createdAt: '2023-06-18T07:16:06.820Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/1FZuRgUP3fPG5CD9sTNHaWK62qb.jpg',
    rated: 9.6,
    title: 'Крид 2',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '648eaf18a85d065b0442a133',
    comment: 'просто ахуенный фильм боксик мотивация ммм вообще крид ахуенен',
    createdAt: '2023-06-18T07:15:36.971Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/ziHzbNn684Odb138qUR16xydhmi.jpg',
    rated: 9.6,
    title: 'Крид: Наследие Рокки',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6471edadee1a6018c3671807',
    comment: 'Ну норм посмотреть разок можно ',
    createdAt: '2023-05-27T11:46:51.026Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/3XK3PvEGpOjmY6G081JNqRQmpv3.jpg',
    rated: 7.7,
    title: 'Люби снова',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6471ed78c13873ab08f6de46',
    comment: 'Опять дед фсола вывез катку',
    createdAt: '2023-05-27T11:45:58.428Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/fN5VTYFcndYp1rW9udHCqGE6eTs.jpg',
    rated: 8.8,
    title: 'Не дыши 2',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6471ed54c13873ab08f6de45',
    comment:
      'Прикольный фильм дед имба ходячая, троих считай уработал слепой фсола вывез катку, напряженка присутствует ',
    createdAt: '2023-05-27T11:45:22.449Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/ecK1Ijmz544Imk0GKjWmcQJJZvV.jpg',
    rated: 8.6,
    title: 'Не дыши',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6467c5b4736d018a68ba9ff4',
    comment:
      'скучная хуйня, проходняк, так бы поставил 3 бала, но 5 чисто из-за отсылки персов глвыных из твоег имени, лан чисто ещё из-за концовки 6',
    createdAt: '2023-05-19T18:53:38.717Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/kwgGR8nL74uVLzSbcsMFguz7bV8.jpg',
    rated: 6,
    title: 'Дитя погоды',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '646493dbc9495026d7dd5c4d',
    comment: 'без комментариев, скучная хуйня',
    createdAt: '2023-05-17T08:44:10.590Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/8xukbVG9JJfnpcdIEYPijVVOfhH.jpg',
    rated: 2,
    title: 'Вышка',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6460921443935603dd9bf3e9',
    comment:
      'ФРИКИ ЕБУЧИЕ!!!!!!! но и есть любовь это круто, но фрики пиздец смешно угар',
    createdAt: '2023-05-14T07:47:31.707Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/ySzBKYXH3fA3oe4GS3Y8ikZe7wI.jpg',
    rated: 9.8,
    title: 'Моё прекрасное несчастье',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6459317034c016ba834acd25',
    comment:
      'Один из лучших фильмов ужастикоу збс чётко страшно крипануто ебальничеки',
    createdAt: '2023-05-08T17:29:18.999Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/po4JZAYWs6VIejlSOxOehnUNRaI.jpg',
    rated: 9.8,
    title: 'Правда или действие',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6458bbb07c8665c0dbdf1546',
    comment: 'бля прикольно))))) концовка топ красиавицы пиздец ммммммм',
    createdAt: '2023-05-08T09:06:55.633Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/bfreoPO5aKNv2nJiHXHilXoIROO.jpg',
    rated: 8.8,
    title: 'Няня. Королева проклятых',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '64577a643d6466c6f8ef85b0',
    comment: 'прикольный фильм',
    createdAt: '2023-05-07T10:16:04.532Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/xMTu94081P6HL9pDEVHBEF0QUIC.jpg',
    rated: 7.8,
    title: 'Няня',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '64576a866cd9380faa8ca45d',
    comment:
      'ставлю 9 чисто из-за того что шлюха зафрендзонила норм чела а влюбилась в чсв, похуиста богатого хуя еблана, но так в целом норм) а ещё и порнухи не мало ммммм',
    createdAt: '2023-05-07T09:08:22.345Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/mDlsFNi0HdlEWbm7066KQM27bDE.jpg',
    rated: 9.8,
    title: 'Из моего окна',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '64576a3b6cd9380faa8ca45c',
    comment:
      'прикольный фильмец про любовь, даже в моменте похож на по наклонной, но первое впечатление испортила озвучка, ну так в целом заебенчик',
    createdAt: '2023-05-07T09:07:06.787Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/yeRbuPt9Rb7GRzAR8Ouep0KK23L.jpg',
    rated: 9,
    title: 'Пурпурные сердца',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '645765c97ce2afaf72c96bf7',
    comment:
      'бля просто хороший даже ахуенный фильм который точно стоит посмотреть и даже пару раз, очень понрав лайк супер кул',
    createdAt: '2023-05-07T08:48:09.191Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/iQgbTEBd0lnWV6g91v2tjETn6c.jpg',
    rated: 9.2,
    title: 'Мой ужасный сосед',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6456af31a8dbc1cc37658146',
    comment: 'заебись русский(ахуеть да) фильм про любовь, мне очень по нрав',
    createdAt: '2023-05-06T19:49:05.307Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/wOaLTv3CFkPkia1xHgvpHmHDQPa.jpg',
    rated: 9.7,
    title: '14+',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '6456aecda8dbc1cc37658145',
    comment:
      'Пиздец конечно фильм про куколда и шлюху, та ему открыто изменяет, а тот убивает её тюбиков, я вахуи, ну и хуйня',
    createdAt: '2023-05-06T19:47:25.205Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/22FWO9Z2SYZh5JVI3nyxmwGaG7G.jpg',
    rated: 4.2,
    title: 'Глубокие воды',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644fcad48f91e04630fa4748',
    comment:
      'ПЕРВЫЙ ФИЛЬМ ПРО ЛЮБОВЬ С КОТОРОГО Я И ПОЛЮБИЛ ПОДОБНЫЕ ФИЛЬМЫ!!!!!!!!!!!!!!!!!!!!!!!! ЛУЧШИЙ ИЗ ЛУЧШИХ!',
    createdAt: '2023-05-01T14:21:08.690Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/30xQ7FYFBrIXK5Y63jq1ilMD1Xk.jpg',
    rated: 10,
    title: 'До встречи с тобой',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644fc8a58f91e04630fa4747',
    comment:
      'просто ахуенный фильм про любовь с моей любимой актрисой и ахуенным сюжетом\n\nпосмотрел второй раз и крч не ну прикольный конечно фильм прям тот самый фильм который хороший но не прям вауц хауенный ебаись конем не ну норм чё збс',
    createdAt: '2023-05-01T14:11:49.664Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/vPToBZCLH7vWNUrQXFguUtH2IDJ.jpg',
    rated: 9.7,
    title: 'Космос между нами',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644e82885ef42293a6408607',
    comment: 'просто ахуенный фильм про любовь!',
    createdAt: '2023-04-30T15:00:24.176Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/gBT4oP6u8k6wYvbhSZXz6wt4qtt.jpg',
    rated: 10,
    title: 'Дальняя дорога',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644e1213049327c48c0cd91e',
    comment:
      'бля какой-то неоднозначный аниме нихуя не пон могли мутить туда сюда но чё та бля мдэ мдэ, школярык наорал тупо дэбил, но прикольно',
    createdAt: '2023-04-30T07:00:34.808Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/blXPUxtZjsdAMDoWfsKuKTsZkm4.jpg',
    rated: 7.5,
    title: 'Сад изящных слов',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644c06d1164d85d2e9282f7b',
    comment:
      'ну короче в прошлой части как будто джетта оргазм затащила но тут чёт не айс но в целом масище грязюка по больше мне нравки и тут по меньше тупых моментов и страшнее чутка если джетта оргазм была по больше было бы кул а так БЛЯЯЯ СТРАШНЫЙ МОМЕНТ Я СМОТРЕТЬ ПАКА',
    createdAt: '2023-04-28T17:47:58.399Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/7tOkO4fjKoh3kKRQVZwNT0eES9q.jpg',
    rated: 9,
    title: 'Крик 6',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644c032b607eb85606e837be',
    comment:
      'бля страшновато было да но сука как в типичном фильме все тупые))))))))))))))) но да грязюка имеется',
    createdAt: '2023-04-28T17:32:26.498Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/jmEJOTjj9IrfDZj0KQV13o274jZ.jpg',
    rated: 8,
    title: 'Крик',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644bcd28c91ce92dcdaa917a',
    comment: 'заебись #4',
    createdAt: '2023-04-28T13:41:59.090Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/7SAIQcQfPgimB7BHef9DANUQZkY.jpg',
    rated: 9.8,
    title: 'После. Долго и счастливо',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644bcd1bc91ce92dcdaa9179',
    comment: 'заебись #3',
    createdAt: '2023-04-28T13:41:47.036Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/eRmylmc17IIxKKQrGcQt1723APP.jpg',
    rated: 9.8,
    title: 'После. Глава 3',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644bcd13c91ce92dcdaa9178',
    comment: 'заебись #2',
    createdAt: '2023-04-28T13:41:38.534Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/kWkFxHdXhKBM3NmncrX8JYhVXEe.jpg',
    rated: 9.8,
    title: 'После. Глава 2',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644bcd08c91ce92dcdaa9177',
    comment: 'заебись',
    createdAt: '2023-04-28T13:41:27.912Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/7Prt3Le9H0EeRYVltAXFJqwDIig.jpg',
    rated: 9.8,
    title: 'После',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644bccdfc91ce92dcdaa9176',
    comment: 'сериал прикольный, но после сезона 3-4 можно в целом не смотреть',
    createdAt: '2023-04-28T13:40:46.010Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/3m1hRR6o29jBw72BLvSHKN9f8qP.jpg',
    rated: 8,
    title: 'Реальные пацаны',
    type: 'TV',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644ab88ff7863459b0248bdd',
    comment: 'По сюжету, саундтрекам и в целом атмосфере уровень По наклонной',
    createdAt: '2023-04-27T18:01:50.825Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/rPrqBqZLl8m6sUQmZCchqW7IEYo.jpg',
    rated: 10,
    title: 'Интерстеллар',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644aa912fea6d516d5bc9787',
    comment:
      'Бля буду один из лучших фильмов про любовь, пересматривал много раз, тронуло до глубины души, жирный лайк этому дерьму!\n\nupd. когда смотрел в последний раз ну как-то хз))))',
    createdAt: '2023-04-27T16:55:46.373Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/hDq0YRF4Aq92mJ9oinCBTJq3duU.jpg',
    rated: 9.8,
    title: 'Верю в любовь',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644aa316a353859d56c046fd',
    comment:
      'ЛУЧШЕЕ АНИМЕ КОТОРОЕ Я ТОЛЬКО СМОТРЕЛ, ПО КОЖЕ МУРАШКИ ОТ САУНДТРЕКА И ОСОБЕННО ОТ СЮЖЕТА, ЧЕЛ КОТОРЫЙ СОЗДАЛ ЭТО ПРОИЗВЕДЕНИЕ ИССКУСТВО ПРОСТО ГЕНИЙ',
    createdAt: '2023-04-27T16:30:13.677Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/iUQlwEFo90cUHD3MINhbhz3V8cR.jpg',
    rated: 10,
    title: 'Твоё имя',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '644957c46bc25bf28f6dd818',
    comment:
      'ЭТО ЛУЧШИЙ ФИЛЬМ ВСЕХ ВРЕМЕН И НАРОДОВ, ЛУЧШИЙ СУКА ПРОСТО ЛУЧШИЙ!!!!!!!! СПУСТЯ ДОЛГОЕ ВРЕМЯ ЭТА ОЦЕНКА И ЭТО ПРОСТО ПИЗДААА АТМОСФЕРА..............Я ЕБАЛ ТОГО ВСЁ АКТЕРСКАЯ ИГРА ПРОСТО ВЕЛИКОЛЕПНА А СЮЖЕТ АХУЕНЕН ТОМ ХОЛАНД ИДИ ТЫ НАХУЙ Я ТЯ РАСЦЕЛУЮ ОБОЖАЮ ФИЛЬМ!!!!!!!!!',
    createdAt: '2023-04-26T16:56:36.151Z',
    isBest: true,
    poster: 'https://image.tmdb.org/t/p/w342/pLdhxnJsJqFOBu1qrrjXLnyzMMN.jpg',
    rated: 10,
    title: 'По наклонной',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  },
  {
    id: '64468a59cb1203e8db75c0a5',
    comment:
      'фильм нормик в целом, боевик, а его не любл особо, так на разик посмотреть и забыть)) сюжетная любовная линия збс',
    createdAt: '2023-04-24T13:55:37.563Z',
    isBest: false,
    poster: 'https://image.tmdb.org/t/p/w342/qIR6P3QQJMgzO7ihHkfMGp9WYou.jpg',
    rated: 9.8,
    title: 'Без ответа',
    type: 'MOVIE',
    userId: '644107da99692a05336d56d0'
  }
]

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({ adapter })

const userId = 'cmk1n2f7p0000lguoqzy6yy58'

const main = async () => {
  // const itemReviewData = data.map((item) => {
  //   return {
  //     title: item.title,
  //     coverUrl: item.poster
  //   }
  // })

  // await prisma.itemReview.createMany({ data: itemReviewData })

  const result = await Promise.allSettled(
    data.map(async (item) => {
      const itemReview = await prisma.itemReview.findFirst({
        where: {
          title: item.title
        }
      })

      if (!itemReview) throw new Error('Item review not found')

      await prisma.review.create({
        data: {
          rating: item.rated,
          review: item.comment,
          type: item.type as ContentType,
          createdAt: item.createdAt,
          userId,
          itemReviewId: itemReview.id
        }
      })
    })
  )

  console.debug('result', result)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
