
import type { RuralRoad } from "@/types";

const createTimestamp = (): { toDate: () => Date } => ({
  toDate: () => {
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 24));
    return date;
  },
});

export const mockRuralRoads: RuralRoad[] = [
  {
    id: "camino-01",
    name: "Camino a Vagues",
    status: "Verde",
    coordinates: [
      [-34.248, -59.47],
      [-34.255, -59.472],
      [-34.265, -59.474],
      [-34.275, -59.475],
      [-34.285, -59.475],
    ],
    description: "Circulación normal. Pavimento en buen estado.",
    updatedAt: createTimestamp(),
  },
  {
    id: "camino-02",
    name: "Circunvalación Este",
    status: "Amarillo",
    coordinates: [
        [-34.23, -59.46],
        [-34.24, -59.45],
        [-34.25, -59.455],
        [-34.26, -59.45],
    ],
    description: "Precaución por maquinaria trabajando. Carga máxima 8 toneladas.",
    updatedAt: createTimestamp(),
  },
  {
    id: "camino-03",
    name: "Camino a Duggan (Tramo Norte)",
    status: "Rojo",
    coordinates: [
      [-34.206, -59.639],
      [-34.216, -59.638],
      [-34.226, -59.637],
    ],
    description: "Tránsito pesado prohibido por anegamiento. Solo vehículos de emergencia.",
    updatedAt: createTimestamp(),
  },
  {
    id: "camino-04",
    name: "Camino a Villa Lía",
    status: "Verde",
    coordinates: [
        [-34.185, -59.335],
        [-34.195, -59.345],
        [-34.205, -59.355],
    ],
    description: "Circulación normal.",
    updatedAt: createTimestamp(),
  },
   {
    id: "camino-05",
    name: "Camino del Medio",
    status: "Amarillo",
    coordinates: [
      [-34.26, -59.5],
      [-34.26, -59.52],
      [-34.26, -59.54],
    ],
    description: "Calzada con barro. Circular a baja velocidad. Restringido a 10t.",
    updatedAt: createTimestamp(),
  },
];
