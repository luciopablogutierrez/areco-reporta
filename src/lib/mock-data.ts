import type { Report, ReportCategory, ReportPriority, ReportStatus } from "@/types";

const createTimestamp = (): { toDate: () => Date } => ({
  toDate: () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return date;
  },
});

const locations = {
  "San Antonio de Areco": { lat: -34.246, lng: -59.479, name: "San Antonio de Areco" },
  "Villa Lía": { lat: -34.185, lng: -59.335, name: "Villa Lía" },
  "Duggan": { lat: -34.398, lng: -59.355, name: "Duggan" },
  "Vagues": { lat: -34.285, lng: -59.475, name: "Vagues" },
};

const categories: ReportCategory[] = ['baches', 'alumbrado', 'basura', 'senalizacion', 'espacios_verdes', 'infraestructura', 'otros'];
const statuses: ReportStatus[] = ['pending', 'in_progress', 'resolved', 'rejected'];
const priorities: ReportPriority[] = ['low', 'medium', 'high', 'urgent'];
const userIds = ['user1', 'user2', 'user3', 'user4', 'user5'];

const reportTemplates = {
    baches: (loc: string) => ({ title: `Bache en calle principal de ${loc}`, description: `Hay un bache peligroso en una de las calles céntricas de ${loc} que necesita reparación.` }),
    alumbrado: (loc: string) => ({ title: `Poste de luz sin funcionar en ${loc}`, description: `Un poste de alumbrado público lleva varios días sin funcionar en ${loc}, dejando la zona a oscuras.` }),
    basura: (loc: string) => ({ title: `Contenedor desbordado en ${loc}`, description: `El contenedor de la plaza principal de ${loc} está lleno y la basura se acumula alrededor.` }),
    senalizacion: (loc: string) => ({ title: `Señal de tránsito dañada en ${loc}`, description: `Una señal de 'PARE' fue vandalizada y es ilegible, generando un riesgo en ${loc}.` }),
    espacios_verdes: (loc: string) => ({ title: `Pasto muy alto en plaza de ${loc}`, description: `El césped de la plaza de ${loc} no se corta hace semanas y está muy descuidado.` }),
    infraestructura: (loc: string) => ({ title: `Vereda rota en ${loc}`, description: `La vereda de la calle principal de ${loc} está rota y es peligrosa para los peatones.` }),
    otros: (loc: string) => ({ title: `Problema vario en ${loc}`, description: `Se reporta un problema de mantenimiento general en la zona comercial de ${loc}.` }),
};

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateReportsForLocation = (location: { lat: number, lng: number, name: string }, count: number, startId: number): Report[] => {
  const reports: Report[] = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const category = getRandomElement(categories);
    const template = reportTemplates[category](location.name);
    
    // Create slightly different coordinates for each report
    const newLat = location.lat + (Math.random() - 0.5) * 0.005;
    const newLng = location.lng + (Math.random() - 0.5) * 0.005;

    reports.push({
      id: `${id}`,
      title: template.title,
      description: template.description,
      category,
      location: { latitude: newLat, longitude: newLng },
      address: `${location.name}, Buenos Aires`,
      coordinates: { lat: newLat, lng: newLng },
      images: [`https://placehold.co/600x400.png?text=${encodeURIComponent(location.name)}+${i+1}`],
      status: getRandomElement(statuses),
      priority: getRandomElement(priorities),
      isPublic: Math.random() > 0.2,
      userId: getRandomElement(userIds),
      municipalityId: "areco",
      upvotes: Math.floor(Math.random() * 50),
      upvotedBy: [],
      tags: [location.name.toLowerCase().replace(/ /g, '_'), category],
      createdAt: createTimestamp(),
      updatedAt: createTimestamp(),
    });
  }
  return reports;
};

export const mockReports: Report[] = [
  ...generateReportsForLocation(locations["San Antonio de Areco"], 50, 1),
  ...generateReportsForLocation(locations["Villa Lía"], 50, 51),
  ...generateReportsForLocation(locations["Duggan"], 50, 101),
  ...generateReportsForLocation(locations["Vagues"], 50, 151),
];
