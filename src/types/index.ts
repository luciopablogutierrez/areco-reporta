

// Using a simplified version of Timestamp for client-side representation
type Timestamp = {
  toDate: () => Date;
};

// Using a simplified version of GeoPoint for client-side representation
type GeoPoint = {
  latitude: number;
  longitude: number;
};

// A placeholder for GeoJSON objects
type GeoJSON = Record<string, any>;

export interface User {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: 'citizen' | 'admin' | 'superadmin';
  municipalityId?: string;
  notificationSettings: {
    email: boolean;
    push: boolean;
    reportUpdates: boolean;
    nearbyReports: boolean;
  };
  createdAt: Timestamp;
  lastLogin: Timestamp;
}

export type ReportStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';
export type ReportCategory = 'baches' | 'alumbrado' | 'basura' | 'senalizacion' | 'espacios_verdes' | 'infraestructura' | 'accesibilidad' | 'otros';
export type ReportPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  subcategory?: string;
  location: GeoPoint;
  address: string;
  coordinates: { lat: number; lng: number };
  images: string[]; // URLs de Storage
  status: ReportStatus;
  rejectionReason?: string;
  priority: ReportPriority;
  isPublic: boolean;
  userId: string;
  assignedTo?: string; // userId del admin
  municipalityId: string;
  upvotes: number;
  upvotedBy: string[]; // userIds
  tags: string[];
  estimatedResolution?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  resolvedAt?: Timestamp;
  history?: ReportUpdate[];
}

interface Category {
  id: string;
  name: string;
  subcategories?: string[];
}

export interface Municipality {
  id: string;
  name: string;
  boundaries: GeoJSON; // Límites geográficos
  categories: Category[];
  admins: string[]; // userIds
  settings: {
    autoAssignment: boolean;
    publicByDefault: boolean;
    requireApproval: boolean;
    workingHours: { start: string; end:string };
    responseTime: { target: number; unit: 'hours' | 'days' };
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    website?: string;
  };
  createdAt: Timestamp;
}

export interface ReportUpdate {
  id: string;
  reportId: string;
  type: 'status_change' | 'comment' | 'assignment' | 'image_added' | 'created';
  message: string;
  previousStatus?: string;
  newStatus?: string;
  userId: string; // Quien hizo el update
  isPublic: boolean;
  attachments?: string[];
  createdAt: Timestamp;
}

export interface Notification {
  id: string;
  type: 'status_change' | 'new_comment' | 'report_resolved' | 'mention';
  message: string;
  read: boolean;
  createdAt: Date;
}

export type RuralRoadStatus = 'Verde' | 'Amarillo' | 'Rojo';

export interface RuralRoad {
  id: string;
  name: string;
  status: RuralRoadStatus;
  coordinates: [number, number][];
  description?: string;
  updatedAt: Timestamp;
}

export type PetType = 'perro' | 'gato' | 'equino' | 'otro';
export type PetSex = 'macho' | 'hembra';
export type PetCastrated = 'yes' | 'no';
export type LocationZone = 'san_antonio_de_areco' | 'villa_lia' | 'vagues' | 'duggan';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  sex?: PetSex;
  color?: string;
  weight?: string;
  castrated: PetCastrated;
  image: string;
  createdAt: Timestamp;
}

export interface PetAlert {
  id: string;
  pet: Pet;
  type: 'lost' | 'found';
  zone: LocationZone;
  lastSeenDetails: string;
  notes?: string;
  alertCreatedAt: Timestamp;
  status: 'active' | 'resolved';
}
