/* =====================================================================
   ✏️  GUÍA RÁPIDA PARA EDITAR ESTE ARCHIVO  (ábrelo con el Bloc de notas)
   ---------------------------------------------------------------------
   Usa Ctrl+F (buscar) y pega estas palabras para saltar a cada parte:
     DIRECCION        → dirección, horario y Facebook
     NOMBRES-COLUMNAS → cómo se llaman las 3 columnas (Personal/Mediano/Familiar)
     PRECIOS          → aquí están TODOS los precios de la carta

   Cada plato se ve así:   ["Nombre del plato", [precio1, precio2, precio3], "nota opcional"],
     • Cambia SOLO los números. Respeta las comas y los corchetes.
     • Un solo precio:             ["Sopa de pollo (dieta)", [8]],
     • Sin precio en una columna:  null    → [null, 60, 80]
     • Sin precio (sale "Consultar"):  []
     • Para agregar un plato: copia una línea completa y pégala debajo.
     • Para borrar un plato: borra su línea completa.
   Las fotos están en la carpeta img/ (se enlazan en js/imagenes.js).
   ===================================================================== */

// ───────── DIRECCION (dirección, horario, Facebook) ─────────
const INFO = {
  direccion: "Urb. Cossio del Pomar, atrás del Centro de Salud Cesamica",
  horario:   "Lunes-Domingo 10am – 6pm",
  facebook:  "Restaurant Cevichería LA CABAÑA "
};

// ───────── NOMBRES-COLUMNAS ─────────
const TAM =["Personal"  ,  "Mediano", "Familiar"];   // ← nombres de las 3 columnas (cámbialos si son otros)

// ═════════════════ PRECIOS ═════════════════
// Cada bloque { id:... } es una categoría de la carta. Dentro, "items" son los platos.
const PRECIOS = [

  // ───────── CEVICHES ─────────
  { id:"ceviches", titulo:"Ceviches", foto:"ceviche", tamanos:TAM, items:[
    ["Filete de Pescado",            [28, 40, 60]],
    ["Filete de Caballa",            [28, 40, 55]],
    ["Mixto (filete c/mariscos)",    [30, 45, 65]],
    ["Filete de Cabrillón",          [40, 55, 70]],
    ["Conchas Negras",               [30, 40, 55]],
    ["Filete c/ conchas negras",     [35, 45, 65]],
    ["Mixto c/ Conchas Negras",      [40, 60, 70]],
  
  ]},


  // ───────── COMBOS ─────────
  { id:"combos", titulo:"Combos", span:false, items:[
    ["Ceviche + Chicharrón",            [40]],
    ["Ceviche + Arroz c/ mariscos",     [45]],
    ["Chicharrón + Arroz c/ mariscos",  [45]],
    ["Trío Marino", [55], "ceviche + arroz con mariscos + chicharrón"],
    ["Chavelo c/ Costilla",             [45]],
    ["Majado c/ Costilla",              [45]],
    ["Chavelo + Majado",                [50]],
  ]},


  // ───────── ENTRADAS ─────────
  { id:"entradas", titulo:"Entradas", items:[
    ["Causa acevichada ",               [20]],
    ["Palta rellena c/ langostinos",    [15]],
    ["Tamal verde          ",           [10]],
    ["Patacones acevichados",           [20]],
    ["Patacones c/ salsa de mariscos",  [20]],
    ["Leche de tigre",                  [13]],
  ]},


  // ───────── CHUPES ─────────
  { id:"chupes", titulo:"Chupes", foto:"chupe", tamanos:TAM, items:[
    ["Mariscos", [28, 35, 55]],
    ["Cangrejo", [28, 35, 50]],
  ]},


  // ───────── SUDADOS ─────────
  { id:"sudados", titulo:"Sudados", tamanos:TAM, items:[
    ["Cabrilla",  [28, 40, 55]],
    ["Tramboyo",  [30, 40, 55]],
    ["Cabrillón", [40, 55, 70]],
    ["Parihuela", [30, 45, 65]],
  ]},


  // ───────── CHICHARRÓN ─────────
  { id:"chicharron", titulo:"Chicharrón", foto:"chicharron", tamanos:TAM, items:[
    ["Filete de Pescado",        [27, 40, 55]],
    ["Mixto (filete c/mariscos)",[30, 45, 60]],
    ["Pota",                     [18, 30, 45]],
    ["Pollo",                    [27, 40, 55]],
    ["Jalea de Cachema Mixta",   [30, 40, 55]],
    ["Jalea de Cabrillón Mixta", [null, 55, 70]],
  ]},


  // ───────── PESCADOS Y MARISCOS ─────────
  { id:"pescados", titulo:"Pescados y Mariscos", foto:"arroz", tamanos:TAM, items:[
    ["Arroz con Mariscos",    [28, 40, 60]],
    ["Arroz con Conchas",     [28, 40, 60]],
    ["Chaufa de Mariscos",    [25, 40, 60]],
    ["Picante de Mariscos",   [26, 40, 60]],
    ["Majariscos",            [25, 40, 60]],
    ["Pasado de Cabrillón",   [40, 50, 70]],
    ["Pasado de Caballa",     [28, 38, 50]],
    ["Cachema Encebollada",   [25, 35, 55]],
    ["Ronda Marina",          [null, 60, 75]],
    ["Ronda Mixta", [null, 60, 75], "pescados / carne"],
  ]},


  // ───────── PLATOS A LA CARTA ─────────
  { id:"carta", titulo:"Platos a la Carta", foto:"milanesa", items:[
    ["Carne o Cachema frita",        [18]],
    ["Pollo a la plancha",           [18]],
    ["Milanesa de Pollo",            [20]],
    ["Tacu Tacu con Lomo al Jugo",   [20]],
    ["Tacu Tacu con salsa de Mariscos",[20]],
    ["Bisteck a lo pobre",           [25]],
    ["Lomo Saltado",                 [20]],
    ["Saltado de Pollo",             [18]],
    ["Chaufa de Pollo o Carne",      [20]],
  ]},


  // ───────── CARNES ─────────
  { id:"carnes", titulo:"Carnes", foto:"seco", tamanos:TAM, items:[
    ["Costilla de Chancho", [30, 40, 60]],
    ["Seco de Chavelo",     [25, 40, 60]],
    ["Majado de Yuca",      [25, 40, 55]],
    ["Carne Aliñada",       [27, 45, 60]],
    ["Ronda Criolla",       [null, 65, 75]],
  ]},


  // ───────── GUARNICIONES ─────────
  { id:"guarniciones", titulo:"Guarniciones", items:[
    ["Porción de Arroz",            [6]],
    ["Porción de Yuca o Camote",    [4]],
    ["Porción de Yuca o Papa Frita",[10]],
    ["Porción de Ensalada Fresca",  [8]],
    ["Porción de Patacones",        [10]],
  ]},


  // ───────── FIN DE SEMANA ─────────
  { id:"finde", titulo:"Fin de Semana", weekend:true, items:[
    ["Arroz con Cabrito", [30]],
    ["Arroz con Pato",    [30]],
    ["Pavita criolla con tallarines",  [45]],
  ]},


  // ───────── BEBIDAS (sin precio aún: pon los precios entre los corchetes [ ]) ─────────
  { id:"bebidas", titulo:"Bebidas", items:[
    ["Jarra de Chicha Morada", [15]],
    ["Jarra de Clarito Helado",[18]],
    ["Gaseosas",               [5]],
    ["Cervezas",               [10]],
  ]},
];
