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
    }
  }
];

// GET: Obtener todas las papeleras
app.get('/api/bins', (req, res) => {
  res.status(200).json(bins);
});

// POST: Actualizar una papelera
// POST: Actualizar una papelera
app.post('/api/update-bin', (req, res) => {
  const { id, postDistance } = req.body;

  if (!id || postDistance === undefined) {
    return res.status(400).json({ error: "Faltan campos requeridos: id o postDistance" });
  }

  const binIndex = bins.findIndex(b => b.id === id);

  if (binIndex !== -1) {
    // 1. Definimos los límites del sensor
    const minDist = 18;  // Equivale a 100%
    const maxDist = 350; // Equivale a 0%

    // 2. Calculamos el porcentaje invertido
    let percentage = ((maxDist - postDistance) / (maxDist - minDist)) * 100;

    // 3. Restringimos los valores entre 0 y 100 (Clamping)
    percentage = Math.max(0, Math.min(100, percentage));

    // Redondeamos para no tener decimales infinitos
    const finalLevel = Math.round(percentage);

    // 4. Actualizamos el nivel (ejemplo con plástico)
    bins[binIndex].wasteLevels.plastico = finalLevel;

    console.log(`Papelera ${id} - Distancia: ${postDistance}mm -> Nivel: ${finalLevel}%`);

    return res.status(200).json({
      message: "Nivel de llenado actualizado",
      calculatedLevel: finalLevel,
      bin: bins[binIndex]
    });
  } else {
    return res.status(404).json({ error: "Papelera no encontrada" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});