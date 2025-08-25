import type { Report, ReportCategory, ReportPriority, ReportStatus } from "@/types";

const createTimestamp = (): { toDate: () => Date } => ({
  toDate: () => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    return date;
  },
});

const locations = {
  "san_antonio_de_areco": { lat: -34.246, lng: -59.479, name: "San Antonio de Areco", tag: "san_antonio_de_areco" },
  "villa_lia": { lat: -34.185, lng: -59.335, name: "Villa Lía", tag: "villa_lia" },
  "duggan": { lat: -34.206544, lng: -59.639175, name: "Duggan", tag: "duggan" },
  "vagues": { lat: -34.285, lng: -59.475, name: "Vagues", tag: "vagues" },
};

const categories: ReportCategory[] = ['baches', 'alumbrado', 'basura', 'senalizacion', 'espacios_verdes', 'infraestructura', 'accesibilidad', 'otros'];
const statuses: ReportStatus[] = ['pending', 'in_progress', 'resolved', 'rejected'];
const priorities: ReportPriority[] = ['low', 'medium', 'high', 'urgent'];
const userIds = ['user1', 'user2', 'user3', 'user4', 'user5'];

const rejectionReasons = [
  "Reporte duplicado. Ya existe una incidencia para este problema.",
  "Información insuficiente para verificar el problema.",
  "El problema reportado no corresponde a una responsabilidad municipal.",
  "La incidencia ya fue resuelta anteriormente.",
  "Fuera del área de cobertura de servicios."
];

const reportTemplates = {
    baches: (loc: string) => ({ title: `Bache en calle principal de ${loc}`, description: `Hay un bache peligroso en una de las calles céntricas de ${loc} que necesita reparación.` }),
    alumbrado: (loc: string) => ({ title: `Poste de luz sin funcionar en ${loc}`, description: `Un poste de alumbrado público lleva varios días sin funcionar en ${loc}, dejando la zona a oscuras.` }),
    basura: (loc: string) => ({ title: `Contenedor desbordado en ${loc}`, description: `El contenedor de la plaza principal de ${loc} está lleno y la basura se acumula alrededor.` }),
    senalizacion: (loc: string) => ({ title: `Señal de tránsito dañada en ${loc}`, description: `Una señal de 'PARE' fue vandalizada y es ilegible, generando un riesgo en ${loc}.` }),
    espacios_verdes: (loc: string) => ({ title: `Pasto muy alto en plaza de ${loc}`, description: `El césped de la plaza de ${loc} no se corta hace semanas y está muy descuidado.` }),
    infraestructura: (loc: string) => ({ title: `Vereda rota en ${loc}`, description: `La vereda de la calle principal de ${loc} está rota y es peligrosa para los peatones.` }),
    accesibilidad: (loc: string) => ({ title: `Rampa de esquina inaccesible en ${loc}`, description: `La rampa para sillas de ruedas en la esquina céntrica de ${loc} está obstruida o en mal estado.` }),
    otros: (loc: string) => ({ title: `Problema vario en ${loc}`, description: `Se reporta un problema de mantenimiento general en la zona comercial de ${loc}.` }),
};

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateReportsForLocation = (location: { lat: number, lng: number, name: string, tag: string }, count: number, startId: number): Report[] => {
  const reports: Report[] = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const category = getRandomElement(categories);
    const template = reportTemplates[category](location.name);
    const status = getRandomElement(statuses);
    
    // Create slightly different coordinates for each report
    const newLat = location.lat + (Math.random() - 0.5) * 0.01;
    const newLng = location.lng + (Math.random() - 0.5) * 0.01;

    const report: Report = {
      id: `${id}`,
      title: template.title,
      description: template.description,
      category,
      location: { latitude: newLat, longitude: newLng },
      address: `${location.name}, Buenos Aires`,
      coordinates: { lat: newLat, lng: newLng },
      images: [`https://placehold.co/600x400.png?text=${encodeURIComponent(location.name)}+${i+1}`],
      status,
      priority: getRandomElement(priorities),
      isPublic: Math.random() > 0.2,
      userId: getRandomElement(userIds),
      municipalityId: "areco",
      upvotes: Math.floor(Math.random() * 50),
      upvotedBy: [],
      tags: [location.tag, category],
      createdAt: createTimestamp(),
      updatedAt: createTimestamp(),
    };

    if (status === 'rejected') {
        report.rejectionReason = getRandomElement(rejectionReasons);
    }

    reports.push(report);
  }
  return reports;
};

export const mockReports: Report[] = [
  ...generateReportsForLocation(locations["san_antonio_de_areco"], 50, 1),
  ...generateReportsForLocation(locations["villa_lia"], 50, 51),
  ...generateReportsForLocation(locations["duggan"], 50, 101),
  ...generateReportsForLocation(locations["vagues"], 50, 151),
];
