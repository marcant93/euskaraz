// ===== Euskaraz - App de aprendizaje de euskera =====
// Las preguntas estan embebidas directamente aqui (sin fetch),
// para que la app funcione abriendo index.html con doble clic.
//
// NUEVO MODELO: ya no hay niveles fijos (I, II, III). Cada tema tiene un
// banco de 30 preguntas ("questions"). Cada vez que se entra a un tema,
// se eligen 10 preguntas al azar de ese banco, en orden aleatorio.
// No hay sistema de desbloqueo: los 4 temas estan siempre disponibles.

const STORAGE_KEY = 'euskaraz_progress_v4';
const OLD_STORAGE_KEYS = ['euskaraz_progress_v1', 'euskaraz_progress_v2', 'euskaraz_progress_v3'];
const MAX_HEARTS = 5;
const QUESTIONS_PER_SESSION = 10;

const TOPICS = [
  {
    "key": "agurrak",
    "name": "Agurrak",
    "subtitle": "Saludos",
    "icon": "👋",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Hola' en euskera?",
        "options": [
          "Kaixo",
          "Agur",
          "Bai",
          "Ez"
        ],
        "answer": "Kaixo"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Agur'?",
        "options": [
          "Hola",
          "Adiós",
          "Gracias",
          "Buenos días"
        ],
        "answer": "Adiós"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Buenos días'?",
        "options": [
          "Gabon",
          "Egun on",
          "Arratsalde on",
          "Kaixo"
        ],
        "answer": "Egun on"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Arratsalde on'",
        "answer": "Buenas tardes",
        "options": [
          "Buenas tardes",
          "Buenas noches",
          "Buenos días",
          "Hasta luego"
        ]
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Gabon'",
        "answer": "Buenas noches",
        "options": [
          "Buenos días",
          "Buenas noches",
          "Hola",
          "Adiós"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice '¿Qué tal?'",
        "options": [
          "Zer moduz?",
          "Nor zara?",
          "Zenbat da?",
          "Non dago?"
        ],
        "answer": "Zer moduz?"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Hasta luego'",
        "answer": "Gero arte",
        "options": [
          "Gero arte",
          "Bihar arte",
          "Agur",
          "Egun on"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Eskerrik asko'?",
        "options": [
          "De nada",
          "Por favor",
          "Muchas gracias",
          "Perdón"
        ],
        "answer": "Muchas gracias"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'De nada'",
        "answer": "Ez horregatik",
        "options": [
          "Ez horregatik",
          "Mesedez",
          "Barkatu",
          "Bai"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Buenas noches' de despedida?",
        "options": [
          "Gabon",
          "Egun on",
          "Kaixo",
          "Agur"
        ],
        "answer": "Gabon"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Encantado/a de conocerte'?",
        "options": [
          "Atsegin da zu ezagutzea",
          "Zer moduz?",
          "Ongi nago",
          "Gero arte"
        ],
        "answer": "Atsegin da zu ezagutzea"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Ongi, eta zu?'",
        "answer": "Bien, ¿y tú?",
        "options": [
          "Bien, ¿y tú?",
          "Mal, ¿y tú?",
          "¿Cómo estás?",
          "Muchas gracias"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Hasta mañana'?",
        "options": [
          "Bihar arte",
          "Gero arte",
          "Agur",
          "Ikusi arte"
        ],
        "answer": "Bihar arte"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Buenas tardes a todos'",
        "answer": "Arratsalde on guztioi",
        "options": [
          "Arratsalde on guztioi",
          "Egun on guztioi",
          "Gabon guztioi",
          "Kaixo guztioi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ondo pasa!'?",
        "options": [
          "¡Que te vaya bien!",
          "¡Buenos días!",
          "¡Adiós!",
          "¡Cuídate!"
        ],
        "answer": "¡Que te vaya bien!"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zaindu zaitez'",
        "answer": "Cuídate",
        "options": [
          "Cuídate",
          "Adiós",
          "Buena suerte",
          "Hasta pronto"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Mucho gusto' (formal)?",
        "options": [
          "Poztu naiz",
          "Barkatu",
          "Mesedez",
          "Ez horregatik"
        ],
        "answer": "Poztu naiz"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Bienvenido/a'",
        "answer": "Ongi etorri",
        "options": [
          "Ongi etorri",
          "Ongi nago",
          "Ongi da",
          "Ongi joan"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ikusi arte'?",
        "options": [
          "Hasta la vista",
          "Buenos días",
          "Bienvenido",
          "Por favor"
        ],
        "answer": "Hasta la vista"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zorte on!'",
        "answer": "¡Buena suerte!",
        "options": [
          "¡Buena suerte!",
          "¡Feliz cumpleaños!",
          "¡Buen provecho!",
          "¡Enhorabuena!"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Espero verte pronto'?",
        "options": [
          "Laster ikusiko dut zu",
          "Laster ikusiko zaitut",
          "Gero ikusiko zaitut",
          "Bihar ikusiko dut"
        ],
        "answer": "Laster ikusiko zaitut"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Milesker etortzeagatik'",
        "answer": "Gracias por venir",
        "options": [
          "Gracias por venir",
          "Gracias por todo",
          "Bienvenido de nuevo",
          "Hasta la próxima"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Que tengas un buen día'?",
        "options": [
          "Egun on izan",
          "Egun ona izan dezazula",
          "Egun ona da",
          "Egun on guztiei"
        ],
        "answer": "Egun ona izan dezazula"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Ha sido un placer conocerte'",
        "answer": "Plazer bat izan da zu ezagutzea",
        "options": [
          "Plazer bat izan da zu ezagutzea",
          "Atsegin da zu ezagutzea",
          "Ongi etorri",
          "Poztu naiz zurekin"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Harik eta berriz elkar ikusi arte'?",
        "options": [
          "Hasta que nos volvamos a ver",
          "Hasta luego",
          "Nos vemos mañana",
          "Cuídate mucho"
        ],
        "answer": "Hasta que nos volvamos a ver"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Eskerrik asko bihotz-bihotzez'",
        "answer": "Muchas gracias de corazón",
        "options": [
          "Muchas gracias de corazón",
          "Muchas gracias por todo",
          "Gracias otra vez",
          "De nada en absoluto"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Siento mucho el retraso'?",
        "options": [
          "Barkatu berandu iritsi izana",
          "Barkatu asko",
          "Ez dut ulertzen",
          "Mesedez itxaron"
        ],
        "answer": "Barkatu berandu iritsi izana"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Cuídense todos'",
        "answer": "Zaindu zaitezte denok",
        "options": [
          "Zaindu zaitezte denok",
          "Zaindu zaitez ondo",
          "Ongi egon zaitezte",
          "Ondo pasa denok"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Laster arte, bada'?",
        "options": [
          "Hasta pronto, entonces",
          "Buenos días a todos",
          "Ha sido un placer",
          "Cuídate mucho, amigo"
        ],
        "answer": "Hasta pronto, entonces"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Ondo etorriak izan zaitezte gure etxera'",
        "answer": "Sed bienvenidos a nuestra casa",
        "options": [
          "Sed bienvenidos a nuestra casa",
          "Cuidad bien la casa",
          "Volved pronto a casa",
          "Buenas noches en casa"
        ]
      }
    ]
  },
  {
    "key": "zenbakiak",
    "name": "Zenbakiak",
    "subtitle": "Números",
    "icon": "🔢",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'uno' en euskera?",
        "options": [
          "Bat",
          "Bi",
          "Hiru",
          "Lau"
        ],
        "answer": "Bat"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'cinco'?",
        "options": [
          "Lau",
          "Bost",
          "Sei",
          "Zazpi"
        ],
        "answer": "Bost"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hiru'",
        "answer": "Tres",
        "options": [
          "Dos",
          "Tres",
          "Cuatro",
          "Cinco"
        ]
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zazpi'",
        "answer": "Siete",
        "options": [
          "Seis",
          "Siete",
          "Ocho",
          "Nueve"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'diez'?",
        "options": [
          "Bederatzi",
          "Hamar",
          "Hamaika",
          "Hogei"
        ],
        "answer": "Hamar"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'ocho'",
        "answer": "Zortzi",
        "options": [
          "Zazpi",
          "Zortzi",
          "Bederatzi",
          "Sei"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué número es 'Hogei'?",
        "options": [
          "Doce",
          "Quince",
          "Veinte",
          "Diez"
        ],
        "answer": "Veinte"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'cuatro'",
        "answer": "Lau",
        "options": [
          "Hiru",
          "Lau",
          "Bost",
          "Bi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'nueve'?",
        "options": [
          "Zortzi",
          "Bederatzi",
          "Hamar",
          "Sei"
        ],
        "answer": "Bederatzi"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hamabi'",
        "answer": "Doce",
        "options": [
          "Once",
          "Doce",
          "Trece",
          "Catorce"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'treinta'?",
        "options": [
          "Hogeita hamar",
          "Berrogei",
          "Hirurogei",
          "Hemeretzi"
        ],
        "answer": "Hogeita hamar"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Berrogei'",
        "answer": "Cuarenta",
        "options": [
          "Treinta",
          "Cuarenta",
          "Cincuenta",
          "Sesenta"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'cien'?",
        "options": [
          "Ehun",
          "Mila",
          "Berrehun",
          "Hogei"
        ],
        "answer": "Ehun"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'veintidós' (20+2)",
        "answer": "Hogeita bi",
        "options": [
          "Hogeita bi",
          "Hogeita hamar",
          "Hamabi",
          "Berrogeita bi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Hirurogei'?",
        "options": [
          "Treinta",
          "Cuarenta",
          "Sesenta",
          "Setenta"
        ],
        "answer": "Sesenta"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Mila'",
        "answer": "Mil",
        "options": [
          "Cien",
          "Quinientos",
          "Mil",
          "Diez mil"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'primero' (ordinal)?",
        "options": [
          "Lehena",
          "Bigarrena",
          "Hirugarrena",
          "Azkena"
        ],
        "answer": "Lehena"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'segundo' (ordinal)",
        "answer": "Bigarrena",
        "options": [
          "Bigarrena",
          "Hirugarrena",
          "Lehena",
          "Laugarrena"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué número es 'Laurogei'?",
        "options": [
          "Setenta",
          "Ochenta",
          "Noventa",
          "Sesenta"
        ],
        "answer": "Ochenta"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hirurogeita hamar'",
        "answer": "Setenta",
        "options": [
          "Sesenta",
          "Setenta",
          "Ochenta",
          "Noventa"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'quinientos'?",
        "options": [
          "Bostehun",
          "Bosteun",
          "Bost mila",
          "Bosgarren"
        ],
        "answer": "Bostehun"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Bi mila eta hogeita sei'",
        "answer": "Dos mil veintiséis",
        "options": [
          "Dos mil veintiséis",
          "Dos mil dieciséis",
          "Doscientos veintiséis",
          "Veinte mil seis"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'un millón'?",
        "options": [
          "Milioi bat",
          "Mila mila",
          "Ehun mila",
          "Milaka bat"
        ],
        "answer": "Milioi bat"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'último' (ordinal)",
        "answer": "Azkena",
        "options": [
          "Azkena",
          "Lehena",
          "Erdikoa",
          "Hurrengoa"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Erdia'?",
        "options": [
          "El doble",
          "La mitad",
          "El tercio",
          "El total"
        ],
        "answer": "La mitad"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hiru laurden'",
        "answer": "Tres cuartos",
        "options": [
          "Tres cuartos",
          "Un tercio",
          "Media docena",
          "Tres décimas"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'décimo' (ordinal)?",
        "options": [
          "Hamargarrena",
          "Hamarrena",
          "Hamaikagarrena",
          "Bederatzigarrena"
        ],
        "answer": "Hamargarrena"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'novecientos noventa y nueve'",
        "answer": "Bederatziehun eta laurogeita hemeretzi",
        "options": [
          "Bederatziehun eta laurogeita hemeretzi",
          "Bederatzi mila eta laurogeita hemeretzi",
          "Bederatziehun eta hirurogeita hemeretzi",
          "Zortziehun eta laurogeita hemeretzi"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Docena' en euskera?",
        "options": [
          "Dozena",
          "Hamabiko",
          "Talde bat",
          "Sail bat"
        ],
        "answer": "Dozena"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Ehuneko hogei'",
        "answer": "Veinte por ciento",
        "options": [
          "Veinte por ciento",
          "Cien entre veinte",
          "Veinte de cien",
          "Ciento veinte"
        ]
      }
    ]
  },
  {
    "key": "hiztegia",
    "name": "Oinarrizko hiztegia",
    "subtitle": "Vocabulario",
    "icon": "📚",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'agua'?",
        "options": [
          "Ur",
          "Su",
          "Lur",
          "Aire"
        ],
        "answer": "Ur"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Etxe'?",
        "options": [
          "Coche",
          "Casa",
          "Calle",
          "Ciudad"
        ],
        "answer": "Casa"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Lagun'",
        "answer": "Amigo",
        "options": [
          "Amigo",
          "Familia",
          "Vecino",
          "Hermano"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'pan'",
        "answer": "Ogi",
        "options": [
          "Ogi",
          "Ur",
          "Esne",
          "Sagar"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'perro'?",
        "options": [
          "Katu",
          "Txakur",
          "Zaldi",
          "Behi"
        ],
        "answer": "Txakur"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Eguzki'?",
        "options": [
          "Luna",
          "Estrella",
          "Sol",
          "Cielo"
        ],
        "answer": "Sol"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Mendi'",
        "answer": "Montaña",
        "options": [
          "Río",
          "Mar",
          "Montaña",
          "Bosque"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'libro'",
        "answer": "Liburu",
        "options": [
          "Liburu",
          "Mahai",
          "Aulki",
          "Leiho"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'mesa'?",
        "options": [
          "Aulki",
          "Mahai",
          "Leiho",
          "Ate"
        ],
        "answer": "Mahai"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Sagar'",
        "answer": "Manzana",
        "options": [
          "Pera",
          "Manzana",
          "Naranja",
          "Uva"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'madre'?",
        "options": [
          "Ama",
          "Aita",
          "Anaia",
          "Arreba"
        ],
        "answer": "Ama"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Aita'",
        "answer": "Padre",
        "options": [
          "Padre",
          "Hermano",
          "Abuelo",
          "Tío"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'hermano' (de hombre)?",
        "options": [
          "Anaia",
          "Arreba",
          "Neba",
          "Ahizpa"
        ],
        "answer": "Anaia"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'color rojo'",
        "answer": "Gorria",
        "options": [
          "Gorria",
          "Urdina",
          "Horia",
          "Berdea"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Urdin'?",
        "options": [
          "Verde",
          "Azul",
          "Amarillo",
          "Blanco"
        ],
        "answer": "Azul"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Astelehen'",
        "answer": "Lunes",
        "options": [
          "Lunes",
          "Martes",
          "Miércoles",
          "Domingo"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'viernes'?",
        "options": [
          "Osteguna",
          "Ostirala",
          "Larunbata",
          "Igandea"
        ],
        "answer": "Ostirala"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'enero'",
        "answer": "Urtarrila",
        "options": [
          "Urtarrila",
          "Otsaila",
          "Martxoa",
          "Abendua"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Berdea'?",
        "options": [
          "Verde",
          "Marrón",
          "Negro",
          "Gris"
        ],
        "answer": "Verde"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Abendua'",
        "answer": "Diciembre",
        "options": [
          "Noviembre",
          "Diciembre",
          "Octubre",
          "Enero"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'gato'?",
        "options": [
          "Katu",
          "Txakur",
          "Zaldi",
          "Untxi"
        ],
        "answer": "Katu"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zaldi'",
        "answer": "Caballo",
        "options": [
          "Vaca",
          "Caballo",
          "Oveja",
          "Cerdo"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'camiseta'?",
        "options": [
          "Kamiseta",
          "Praka",
          "Jaka",
          "Zapata"
        ],
        "answer": "Kamiseta"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'zapatos'",
        "answer": "Zapatak",
        "options": [
          "Zapatak",
          "Prakak",
          "Jakak",
          "Galtzerdiak"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Autobusa'?",
        "options": [
          "Coche",
          "Autobús",
          "Tren",
          "Bicicleta"
        ],
        "answer": "Autobús"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Hegazkin'",
        "answer": "Avión",
        "options": [
          "Barco",
          "Avión",
          "Tren",
          "Coche"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'primavera'?",
        "options": [
          "Udaberri",
          "Uda",
          "Udazken",
          "Negu"
        ],
        "answer": "Udaberri"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'invierno'",
        "answer": "Negu",
        "options": [
          "Negu",
          "Uda",
          "Udazken",
          "Udaberri"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Udazken'?",
        "options": [
          "Verano",
          "Otoño",
          "Primavera",
          "Invierno"
        ],
        "answer": "Otoño"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Eguraldia'",
        "answer": "El tiempo (clima)",
        "options": [
          "El tiempo (clima)",
          "El día",
          "La estación",
          "El calendario"
        ]
      }
    ]
  },
  {
    "key": "esaldiak",
    "name": "Eguneroko esaldiak",
    "subtitle": "Frases",
    "icon": "💬",
    "questions": [
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Me llamo...'?",
        "options": [
          "Nire izena da...",
          "Nongoa zara?",
          "Zer moduz?",
          "Ongi nago"
        ],
        "answer": "Nire izena da..."
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ongi nago'?",
        "options": [
          "Estoy mal",
          "Estoy bien",
          "Tengo hambre",
          "Tengo sueño"
        ],
        "answer": "Estoy bien"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: '¿Nongoa zara?'",
        "answer": "¿De dónde eres?",
        "options": [
          "¿Cómo te llamas?",
          "¿De dónde eres?",
          "¿Cuántos años tienes?",
          "¿Dónde vives?"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Por favor'",
        "answer": "Mesedez",
        "options": [
          "Mesedez",
          "Barkatu",
          "Eskerrik asko",
          "Bai"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Perdón/Disculpa'?",
        "options": [
          "Bai",
          "Ez",
          "Barkatu",
          "Mesedez"
        ],
        "answer": "Barkatu"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Ez dut ulertzen'?",
        "options": [
          "No entiendo",
          "No lo sé",
          "No quiero",
          "No puedo"
        ],
        "answer": "No entiendo"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Non dago komuna?'",
        "answer": "¿Dónde está el baño?",
        "options": [
          "¿Dónde está el baño?",
          "¿Qué hora es?",
          "¿Cuánto cuesta?",
          "¿Dónde vives?"
        ]
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: '¿Cuánto cuesta?'",
        "answer": "Zenbat da?",
        "options": [
          "Zenbat da?",
          "Zer da hau?",
          "Non dago?",
          "Zer moduz?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Sí' y 'No'?",
        "options": [
          "Bai / Ez",
          "Ez / Bai",
          "Bai / Bai",
          "Ez / Ez"
        ],
        "answer": "Bai / Ez"
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Laguntzerik al didazu?'",
        "options": [
          "¿Me puedes ayudar?",
          "¿Te puedo ayudar?",
          "¿Dónde está?",
          "¿Qué necesitas?"
        ],
        "answer": "¿Me puedes ayudar?"
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Yo soy' (izan, 1ª persona)?",
        "options": [
          "Naiz",
          "Da",
          "Zara",
          "Gara"
        ],
        "answer": "Naiz"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zu zara'",
        "answer": "Tú eres",
        "options": [
          "Tú eres",
          "Él es",
          "Yo soy",
          "Nosotros somos"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Nosotros somos' (izan)?",
        "options": [
          "Gara",
          "Zarete",
          "Dira",
          "Naiz"
        ],
        "answer": "Gara"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Yo tengo' (ukan)",
        "answer": "Nik dut",
        "options": [
          "Nik dut",
          "Nik naiz",
          "Nik dugu",
          "Nik dira"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Etxean nago'?",
        "options": [
          "Estoy en casa",
          "Voy a casa",
          "Vengo de casa",
          "Vivo en casa"
        ],
        "answer": "Estoy en casa"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Bilbotik nator'",
        "answer": "Vengo de Bilbao",
        "options": [
          "Voy a Bilbao",
          "Vengo de Bilbao",
          "Vivo en Bilbao",
          "Soy de Bilbao"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Mañana voy a trabajar'?",
        "options": [
          "Bihar lanera joango naiz",
          "Atzo lanean nengoen",
          "Gaur lanean nago",
          "Lehen lanera joan nintzen"
        ],
        "answer": "Bihar lanera joango naiz"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: '¿Puedes repetir, por favor?'",
        "answer": "Errepika dezakezu, mesedez?",
        "options": [
          "Errepika dezakezu, mesedez?",
          "Ulertzen duzu?",
          "Berriz esan, mesedez?",
          "Entzun al duzu?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Denbora asko daramat hemen'?",
        "options": [
          "Llevo mucho tiempo aquí",
          "Voy a estar poco tiempo",
          "Tengo poco tiempo",
          "El tiempo pasa rápido"
        ],
        "answer": "Llevo mucho tiempo aquí"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Zer ordu da?'",
        "answer": "¿Qué hora es?",
        "options": [
          "¿Qué hora es?",
          "¿Qué día es?",
          "¿Cuándo llegas?",
          "¿A qué hora vienes?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Yo sé' (jakin)?",
        "options": [
          "Badakit",
          "Banaiz",
          "Badut",
          "Banoa"
        ],
        "answer": "Badakit"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Nora zoaz?'",
        "answer": "¿A dónde vas?",
        "options": [
          "¿A dónde vas?",
          "¿De dónde vienes?",
          "¿Dónde estás?",
          "¿Cuándo vas?"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Estamos andando' (ibili)?",
        "options": [
          "Gabiltza",
          "Gaude",
          "Goaz",
          "Gatoz"
        ],
        "answer": "Gabiltza"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Ellos vienen'",
        "answer": "Haiek datoz",
        "options": [
          "Haiek datoz",
          "Haiek doaz",
          "Haiek daude",
          "Haiek dabiltza"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Creo que tienes razón' (arrazoi)?",
        "options": [
          "Uste dut arrazoi duzula",
          "Uste dut arrazoia dela",
          "Ez dut arrazoirik",
          "Arrazoi naiz"
        ],
        "answer": "Uste dut arrazoi duzula"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Nik uste dut hori ez dela egia'",
        "answer": "Yo creo que eso no es verdad",
        "options": [
          "Yo creo que eso no es verdad",
          "Yo sé que eso es verdad",
          "Tú crees que es mentira",
          "Él dice que es verdad"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Cómo se dice 'Si tuviera tiempo, iría' (baldintza)?",
        "options": [
          "Denbora banu, joango nintzateke",
          "Denbora dut, joango naiz",
          "Denbora banu, joan naiz",
          "Denbora ez badut, ez naiz joango"
        ],
        "answer": "Denbora banu, joango nintzateke"
      },
      {
        "type": "translate_es_eu",
        "question": "Traduce al euskera: 'Aunque llueva, saldremos'",
        "answer": "Euria eginda ere, aterako gara",
        "options": [
          "Euria eginda ere, aterako gara",
          "Euria egiten badu, ez gara aterako",
          "Euririk gabe aterako gara",
          "Euria egingo du, esan didate"
        ]
      },
      {
        "type": "mcq",
        "question": "¿Qué significa 'Nahiz eta gaizki egon, lanera joan nintzen'?",
        "options": [
          "Aunque estaba mal, fui a trabajar",
          "Como estaba mal, no fui a trabajar",
          "Si estoy mal, no voy a trabajar",
          "Estaba mal así que me quedé en casa"
        ],
        "answer": "Aunque estaba mal, fui a trabajar"
      },
      {
        "type": "translate_eu_es",
        "question": "Traduce: 'Espero dut dena ondo ateratzea'",
        "answer": "Espero que todo salga bien",
        "options": [
          "Espero que todo salga bien",
          "Creo que todo saldrá mal",
          "Todo ha salido bien",
          "Quiero que salga todo perfecto"
        ]
      }
    ]
  }
];

let state = null;

const defaultState = () => ({
  points: 0,
  hearts: MAX_HEARTS,
  streak: 0,
  lastPlayedDate: null,
  topicStats: {}
});

function loadState() {
  OLD_STORAGE_KEYS.forEach(k => {
    if (localStorage.getItem(k)) localStorage.removeItem(k);
  });
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { return defaultState(); }
  }
  return defaultState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetProgress() {
  state = defaultState();
  saveState();
  renderHome();
  showScreen('home-screen');
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak() {
  const today = todayStr();
  if (state.lastPlayedDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (state.lastPlayedDate === yesterday) {
    state.streak += 1;
  } else {
    state.streak = 1;
  }
  state.lastPlayedDate = today;
  saveState();
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandomQuestions(topic) {
  const shuffled = shuffle(topic.questions);
  return shuffled.slice(0, Math.min(QUESTIONS_PER_SESSION, shuffled.length));
}

function renderHome() {
  document.getElementById('streak-count').textContent = state.streak;
  document.getElementById('hearts-count').textContent = state.hearts;
  document.getElementById('points-count').textContent = state.points;

  const list = document.getElementById('units-list');
  list.innerHTML = '';

  TOPICS.forEach(topic => {
    const stats = state.topicStats[topic.key] || { timesPlayed: 0, bestAccuracy: 0 };

    const card = document.createElement('div');
    card.className = 'unit-card';

    card.innerHTML = `
      <div class="unit-icon">${topic.icon}</div>
      <div class="unit-info">
        <h3>${topic.name}</h3>
        <p>${topic.subtitle} · ${topic.questions.length} preguntas en el banco</p>
        ${stats.timesPlayed > 0 ? `<span class="unit-badge">Mejor: ${stats.bestAccuracy}%</span>` : ''}
      </div>
    `;

    card.addEventListener('click', () => startLesson(topic));
    list.appendChild(card);
  });
}

let currentTopic = null;
let currentQuestions = [];
let currentExerciseIndex = 0;
let sessionCorrect = 0;
let sessionTotal = 0;
let selectedOption = null;
let answered = false;
let currentAnswerCorrect = false;

function startLesson(topic) {
  if (state.hearts <= 0) {
    showScreen('no-hearts-screen');
    return;
  }
  currentTopic = topic;
  currentQuestions = pickRandomQuestions(topic);
  currentExerciseIndex = 0;
  sessionCorrect = 0;
  sessionTotal = currentQuestions.length;
  showScreen('lesson-screen');
  document.getElementById('footer-bar').classList.remove('hidden');
  renderExercise();
}

function renderExercise() {
  answered = false;
  selectedOption = null;
  const ex = currentQuestions[currentExerciseIndex];

  const progressPct = (currentExerciseIndex / currentQuestions.length) * 100;
  document.getElementById('lesson-progress').style.width = progressPct + '%';
  document.getElementById('lesson-hearts').textContent = state.hearts;

  document.getElementById('exercise-question').textContent = ex.question;

  const optionsContainer = document.getElementById('exercise-options');
  optionsContainer.innerHTML = '';
  const opts = shuffle(ex.options);
  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectOption(btn, opt, ex));
    optionsContainer.appendChild(btn);
  });

  const feedback = document.getElementById('feedback-banner');
  feedback.className = 'feedback-banner hidden';
  const actionBtn = document.getElementById('action-btn');
  actionBtn.textContent = 'Comprobar';
  actionBtn.className = 'big-btn';
  actionBtn.onclick = checkAnswer;
}

function selectOption(btn, value, ex) {
  if (answered) return;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedOption = value;
  document.getElementById('action-btn').classList.add('active');
}

function checkAnswer() {
  if (answered) {
    nextExercise();
    return;
  }
  if (selectedOption === null) return;

  const ex = currentQuestions[currentExerciseIndex];
  answered = true;
  currentAnswerCorrect = selectedOption === ex.answer;

  document.querySelectorAll('.option-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === ex.answer) {
      b.classList.add('correct');
    } else if (b.classList.contains('selected') && !currentAnswerCorrect) {
      b.classList.add('incorrect');
    }
  });

  const feedback = document.getElementById('feedback-banner');
  const actionBtn = document.getElementById('action-btn');

  if (currentAnswerCorrect) {
    sessionCorrect += 1;
    state.points += 10;
    feedback.className = 'feedback-banner correct';
    feedback.innerHTML = '✅ &nbsp;<strong>¡Correcto!</strong>';
    actionBtn.className = 'big-btn active';
  } else {
    state.hearts = Math.max(0, state.hearts - 1);
    feedback.className = 'feedback-banner incorrect';
    feedback.innerHTML = `❌ &nbsp;<strong>Respuesta correcta:</strong> ${ex.answer}`;
    actionBtn.className = 'big-btn wrong-state active';
    document.getElementById('app').classList.add('shake');
    setTimeout(() => document.getElementById('app').classList.remove('shake'), 400);
  }
  saveState();
  actionBtn.textContent = 'Continuar';
  document.getElementById('lesson-hearts').textContent = state.hearts;
}

function nextExercise() {
  if (state.hearts <= 0 && !currentAnswerCorrect) {
    showScreen('no-hearts-screen');
    document.getElementById('footer-bar').classList.add('hidden');
    return;
  }

  currentExerciseIndex += 1;
  if (currentExerciseIndex >= currentQuestions.length) {
    finishLesson();
  } else {
    renderExercise();
  }
}

function finishLesson() {
  document.getElementById('lesson-progress').style.width = '100%';
  const accuracy = Math.round((sessionCorrect / sessionTotal) * 100);
  const earnedPoints = sessionCorrect * 10;

  const prevStats = state.topicStats[currentTopic.key] || { timesPlayed: 0, bestAccuracy: 0 };
  state.topicStats[currentTopic.key] = {
    timesPlayed: prevStats.timesPlayed + 1,
    bestAccuracy: Math.max(prevStats.bestAccuracy, accuracy)
  };
  updateStreak();
  saveState();

  document.getElementById('result-emoji').textContent = accuracy >= 80 ? '🎉' : (accuracy >= 60 ? '👍' : '😅');
  document.getElementById('result-title').textContent = accuracy >= 60 ? '¡Lección completada!' : 'Sigue practicando';
  document.getElementById('result-points').textContent = '+' + earnedPoints;
  document.getElementById('result-accuracy').textContent = accuracy + '%';

  document.getElementById('footer-bar').classList.add('hidden');
  showScreen('result-screen');
}

document.addEventListener('DOMContentLoaded', () => {
  state = loadState();
  renderHome();

  document.getElementById('exit-lesson-btn').addEventListener('click', () => {
    document.getElementById('footer-bar').classList.add('hidden');
    renderHome();
    showScreen('home-screen');
  });

  document.getElementById('continue-btn').addEventListener('click', () => {
    renderHome();
    showScreen('home-screen');
  });

  document.getElementById('refill-hearts-btn').addEventListener('click', () => {
    state.hearts = MAX_HEARTS;
    saveState();
    renderHome();
    showScreen('home-screen');
  });

  document.getElementById('reset-progress-btn').addEventListener('click', () => {
    const ok = confirm('¿Seguro que quieres reiniciar todo el progreso, puntos, racha y vidas?');
    if (ok) resetProgress();
  });
});
