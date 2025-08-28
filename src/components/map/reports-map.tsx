
'use client';

import { useEffect, useRef } from 'react';
import type { Report, ReportCategory, ReportStatus, RuralRoad, RuralRoadStatus } from '@/types';

interface ReportsMapProps {
  reports: Report[];
  roads?: RuralRoad[];
  onReportClick?: (report: Report) => void;
  onMapClick?: (latlng: { lat: number; lng: number }) => void;
  center?: [number, number];
  zoom?: number;
  className?: string;
  selectedLocation?: { lat: number; lng: number } | null;
  selectedRoadId?: string | null;
}

const ReportsMap: React.FC<ReportsMapProps> = ({
  reports,
  roads = [],
  onReportClick,
  onMapClick,
  center = [-34.6037, -58.3816], // Buenos Aires default
  zoom = 13,
  className = "h-[calc(100vh-14rem)] w-full rounded-lg shadow-lg",
  selectedLocation,
  selectedRoadId,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any | null>(null);
  const markersGroupRef = useRef<any | null>(null);
  const roadsGroupRef = useRef<any | null>(null);
  const selectedMarkerRef = useRef<any | null>(null);
  const polylinesRef = useRef<Map<string, any>>(new Map());

  // Dynamically import Leaflet and MarkerCluster to avoid SSR issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      require('leaflet.markercluster');

      if (!mapRef.current || mapInstanceRef.current) return;

      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Initialize layer groups
      markersGroupRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
      });
      roadsGroupRef.current = L.layerGroup();
      
      mapInstanceRef.current.addLayer(markersGroupRef.current);
      mapInstanceRef.current.addLayer(roadsGroupRef.current);

      // Add map click handler
      if (onMapClick) {
        mapInstanceRef.current.on('click', (e: any) => {
          onMapClick(e.latlng);
        });
      }

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, []);

  // Center map when center prop changes
  useEffect(() => {
    if (mapInstanceRef.current && center) {
        mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);


  // Update markers when reports change
  useEffect(() => {
    if (typeof window !== 'undefined' && mapInstanceRef.current && markersGroupRef.current) {
      const L = require('leaflet');

      const getIconByCategory = (category: ReportCategory, status: ReportStatus) => {
        const categoryColors: Record<ReportCategory, string> = {
            'baches': '#ef4444',
            'alumbrado': '#f59e0b',
            'basura': '#10b981',
            'senalizacion': '#3b82f6',
            'espacios_verdes': '#22c55e',
            'infraestructura': '#8b5cf6',
            'otros': '#6b7280',
            'accesibilidad': '#9333ea'
        };
        const iconColor = categoryColors[category] || '#6b7280';
        const iconOpacity = status === 'resolved' ? 0.5 : 1;
        const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    
        return L.divIcon({
          html: `
            <div style="background-color: ${iconColor}; opacity: ${iconOpacity}" 
                 class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              ${iconHtml}
            </div>
          `,
          className: 'custom-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
      };

      // Clear existing markers
      markersGroupRef.current.clearLayers();

      // Add new markers
      reports.forEach((report) => {
        const marker = L.marker(
          [report.coordinates.lat, report.coordinates.lng],
          {
            icon: getIconByCategory(report.category, report.status),
          }
        );

        // Create popup content
        const popupContent = `
          <div class="p-1 max-w-64">
            <h3 class="font-bold text-base mb-1">${report.title}</h3>
            ${report.images.length > 0 ? `
              <div class="mb-2 rounded-md overflow-hidden">
                <img src="${report.images[0]}" alt="Reporte" class="w-full h-24 object-cover" />
              </div>
            ` : ''}
            <p class="text-xs text-muted-foreground mb-2">${report.description.substring(0, 80)}...</p>
            <div class="flex justify-between items-center text-xs">
              <span class="px-2 py-0.5 rounded-full font-medium bg-secondary text-secondary-foreground">
                ${report.category}
              </span>
              <span class="font-semibold text-primary">
                ${report.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        if (onReportClick) {
          marker.on('click', () => {
            onReportClick(report);
          });
        }

        markersGroupRef.current!.addLayer(marker);
      });
    }
  }, [reports, onReportClick]);

  // Update rural roads layer
  useEffect(() => {
    if (typeof window !== 'undefined' && mapInstanceRef.current && roadsGroupRef.current) {
      const L = require('leaflet');
      
      const statusColors: Record<RuralRoadStatus, string> = {
        'Verde': '#22c55e', // green-500
        'Amarillo': '#f59e0b', // amber-500
        'Rojo': '#ef4444', // red-500
      };

      roadsGroupRef.current.clearLayers();
      polylinesRef.current.clear();

      roads.forEach(road => {
        const isSelected = road.id === selectedRoadId;
        const polyline = L.polyline(road.coordinates, {
          color: statusColors[road.status] || '#6b7280',
          weight: isSelected ? 8 : 5,
          opacity: isSelected ? 1 : 0.8,
        });

        const popupContent = `
          <div class="p-1">
            <h3 class="font-bold text-base mb-1">${road.name}</h3>
            <div class="flex items-center gap-2 mb-2">
              <span style="background-color: ${statusColors[road.status]}" class="w-3 h-3 rounded-full"></span>
              <span class="font-semibold text-sm">${road.status}</span>
            </div>
            <p class="text-xs text-muted-foreground">${road.description}</p>
            <p class="text-xs text-muted-foreground mt-1">Última act.: ${road.updatedAt.toDate().toLocaleString()}</p>
          </div>
        `;
        polyline.bindPopup(popupContent);
        
        if (isSelected) {
            polyline.bringToFront();
        }

        roadsGroupRef.current.addLayer(polyline);
        polylinesRef.current.set(road.id, polyline);
      });
    }
  }, [roads, selectedRoadId]);

    // Highlight selected road
    useEffect(() => {
        polylinesRef.current.forEach((polyline, id) => {
            const isSelected = id === selectedRoadId;
            polyline.setStyle({
                weight: isSelected ? 8 : 5,
                opacity: isSelected ? 1 : 0.8,
            });
            if (isSelected) {
                polyline.bringToFront();
                 if (mapInstanceRef.current && !mapInstanceRef.current.getBounds().contains(polyline.getBounds())) {
                    mapInstanceRef.current.fitBounds(polyline.getBounds());
                }
            }
        });
  }, [selectedRoadId]);


  // Handle selected location marker
    useEffect(() => {
        if (mapInstanceRef.current) {
            const L = require('leaflet');
            
            // Remove previous marker
            if (selectedMarkerRef.current) {
                selectedMarkerRef.current.remove();
                selectedMarkerRef.current = null;
            }

            // Add new marker if a location is selected
            if (selectedLocation) {
                const marker = L.marker([selectedLocation.lat, selectedLocation.lng]).addTo(mapInstanceRef.current);
                marker.bindPopup("Ubicación de la nueva incidencia.").openPopup();
                selectedMarkerRef.current = marker;
            }
        }
    }, [selectedLocation]);

  return <div ref={mapRef} className={className} />;
};

export default ReportsMap;
