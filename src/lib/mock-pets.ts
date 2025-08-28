
import type { PetAlert, Pet } from "@/types";

const createTimestamp = (): { toDate: () => Date } => ({
    toDate: () => {
      const date = new Date();
      date.setHours(date.getHours() - Math.floor(Math.random() * 48)); // Within last 48 hours
      return date;
    },
});

const mockRegisteredPets: Pet[] = [
    {
        id: "pet-001",
        name: "Fido",
        type: "perro",
        breed: "Mestizo",
        sex: "macho",
        color: "Marrón",
        castrated: "yes",
        image: "https://placehold.co/300x200.png?text=Fido",
        createdAt: createTimestamp(),
    },
    {
        id: "pet-002",
        name: "Misha",
        type: "gato",
        breed: "Siamés",
        sex: "hembra",
        color: "Crema",
        castrated: "yes",
        image: "https://placehold.co/300x200.png?text=Misha",
        createdAt: createTimestamp(),
    }
];

export const mockPetAlerts: PetAlert[] = [
  {
    id: "alert-001",
    pet: mockRegisteredPets[0],
    type: 'lost',
    lastSeenLocation: "Plaza principal, cerca del mástil.",
    notes: "Es amigable pero puede asustarse con ruidos fuertes. Llevaba un collar azul.",
    alertCreatedAt: createTimestamp(),
    status: 'active',
  },
  {
    id: "alert-002",
    pet: mockRegisteredPets[1],
    type: 'lost',
    lastSeenLocation: "Zona de la estación de tren.",
    notes: "Responde al sonido de su nombre.",
    alertCreatedAt: createTimestamp(),
    status: 'active',
  },
];
