const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());
app.use(cors());

// Datos iniciales (Simulando una base de datos)
let bins = [
  {
    "id": "1",
    "name": "Papelera PT-01",
    "lat": 41.4395,
    "lng": 2.1764,
    "description": "Papelera en el Parc Tecnològic, Carrer de Marie Curie.",
    "lastPickup": "2026-05-09T10:00:00+02:00",
    "nextPickup": "2026-05-10T04:00:00+02:00",
    "wasteLevels": {
      "cristal": 5,
      "papel": 40,
      "plastico": 25,
      "organico": 10,
      "resto": 30
    },
    "predictedFull": {
      "papel": "2026-05-10T15:00:00+02:00"
    },
    "animals": {
      "palomas": "baja",
      "ratas": "baja",
      "cerdos": "baja"
    },
    
  },
  {
    "id": "2",
    "name": "Contenedor Nou Barris-A",
    "lat": 41.4421,
    "lng": 2.1748,
    "description": "Cerca de la entrada del Parc Central de Nou Barris.",
    "lastPickup": "2026-05-10T02:00:00+02:00",
    "nextPickup": "2026-05-11T02:00:00+02:00",
    "wasteLevels": {
      "cristal": 80, "papel": 15, "plastico": 60, "organico": 45, "resto": 20
    },
    "predictedFull": { "cristal": "2026-05-10T20:00:00+02:00" },
    "animals": { "palomas": "alta", "ratas": "media", "cerdos": "baja" }
  },
  {
    "id": "3",
    "name": "Punto Verde Marie Curie",
    "lat": 41.4382,
    "lng": 2.1785,
    "description": "Esquina con Carrer de l'Alberes.",
    "lastPickup": "2026-05-08T18:00:00+02:00",
    "nextPickup": "2026-05-10T18:00:00+02:00",
    "wasteLevels": {
      "cristal": 10, "papel": 90, "plastico": 100, "organico": 5, "resto": 50
    },
    "predictedFull": { "papel": "2026-05-10T09:00:00+02:00", "plastico": "2026-05-10T11:00:00+02:00" },
    "animals": { "palomas": "media", "ratas": "baja", "cerdos": "baja" }
  },
  {
    "id": "4",
    "name": "Papelera Metro Canyelles",
    "lat": 41.4435,
    "lng": 2.1698,
    "description": "Salida de metro, zona de alto tránsito.",
    "lastPickup": "2026-05-10T06:00:00+02:00",
    "nextPickup": "2026-05-11T06:00:00+02:00",
    "wasteLevels": {
      "cristal": 0, "papel": 20, "plastico": 15, "organico": 80, "resto": 95
    },
    "predictedFull": { "resto": "2026-05-10T12:00:00+02:00" },
    "animals": { "palomas": "alta", "ratas": "alta", "cerdos": "baja" }
  },
  {
    "id": "5",
    "name": "Contenedor Collserola Edge",
    "lat": 41.4480,
    "lng": 2.1650,
    "description": "Límite forestal, zona propensa a fauna silvestre.",
    "lastPickup": "2026-05-07T08:00:00+02:00",
    "nextPickup": "2026-05-10T08:00:00+02:00",
    "wasteLevels": {
      "cristal": 12, "papel": 10, "plastico": 30, "organico": 75, "resto": 40
    },
    "predictedFull": { "organico": "2026-05-10T14:00:00+02:00" },
    "animals": { "palomas": "baja", "ratas": "media", "cerdos": "muy alta" }
  },
  {
    "id": "6",
    "name": "Papelera Biblioteca Vilapicina",
    "lat": 41.4312,
    "lng": 2.1721,
    "description": "Cerca de la zona de lectura exterior.",
    "lastPickup": "2026-05-09T22:00:00+02:00",
    "nextPickup": "2026-05-11T22:00:00+02:00",
    "wasteLevels": {
      "cristal": 0, "papel": 65, "plastico": 10, "organico": 5, "resto": 15
    },
    "predictedFull": { "papel": "2026-05-11T10:00:00+02:00" },
    "animals": { "palomas": "media", "ratas": "baja", "cerdos": "baja" }
  }
];

// GET: Obtener todas las papeleras
app.get('/api/bins', (req, res) => {
  res.status(200).json(bins);
});

// POST: Actualizar una papelera
app.post('/api/update-bin', (req, res) => {
  const { id, postDistance } = req.body;

  // Validación básica
  if (!id || postDistance === undefined) {
    return res.status(400).json({ error: "Faltan campos requeridos: id o postDistance" });
  }

  // Buscar la papelera por ID
  const binIndex = bins.findIndex(b => b.id === id);

  if (binIndex !== -1) {
    // Aquí actualizamos el campo deseado. 
    // Como 'postDistance' no estaba en el objeto original, lo añadimos o actualizamos.
    bins[binIndex].postDistance = postDistance;

    console.log(`Papelera ${id} actualizada con distancia: ${postDistance}`);
    
    return res.status(200).json({
      message: "Bin actualizada correctamente",
      bin: bins[binIndex]
    });
  } else {
    return res.status(404).json({ error: "Papelera no encontrada" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});