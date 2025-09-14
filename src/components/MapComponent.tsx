import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const createBusIcon = (status: string) => {
  const color = status === 'enroute' ? '#22c55e' : status === 'idle' ? '#f59e0b' : '#ef4444';
  return L.divIcon({
    html: `<div style="
      width: 24px; 
      height: 24px; 
      background-color: ${color}; 
      border: 2px solid white; 
      border-radius: 50%; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: bold;
    ">🚌</div>`,
    className: 'custom-bus-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

// Admin location icon
const adminIcon = L.divIcon({
  html: `<div style="
    width: 20px; 
    height: 20px; 
    background-color: #f97316; 
    border: 2px solid white; 
    border-radius: 50%; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    animation: pulse 2s infinite;
  "></div>`,
  className: 'admin-location-icon',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

interface Bus {
  id: string;
  vehicleNumber: string;
  driver: string;
  route: string;
  location: { lat: number; lng: number };
  status: string;
  passengers: number;
  capacity: number;
  estimatedRevenue: number;
  nextStop: string;
}

interface MapComponentProps {
  buses: Bus[];
  selectedBus: string | null;
  onBusSelect: (busId: string | null) => void;
  adminLocation?: { lat: number; lng: number } | null;
}

// Component to handle map updates
function MapUpdater({ buses, selectedBus }: { buses: Bus[]; selectedBus: string | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedBus) {
      const bus = buses.find(b => b.id === selectedBus);
      if (bus) {
        map.setView([bus.location.lat, bus.location.lng], 15);
      }
    }
  }, [selectedBus, buses, map]);

  return null;
}

export default function MapComponent({ buses, selectedBus, onBusSelect, adminLocation }: MapComponentProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(adminLocation);
  const movementRef = useRef<{ [key: string]: { interval: NodeJS.Timeout; path: { lat: number; lng: number }[] } }>({});

  // Get user's GPS location
  useEffect(() => {
    if (!adminLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to Chandigarh coordinates
          setUserLocation({ lat: 30.7333, lng: 76.7794 });
        }
      );
    }
  }, [adminLocation]);

  // Simulate bus movement for each bus
  useEffect(() => {
    buses.forEach(bus => {
      if (bus.status === 'enroute' && !movementRef.current[bus.id]) {
        // Define a simple route path for Punjab cities
        const routePaths: { [key: string]: { lat: number; lng: number }[] } = {
          "bus123": [ // Chandigarh to Ludhiana route
            { lat: 30.7333, lng: 76.7794 },
            { lat: 30.7046, lng: 76.7179 },
            { lat: 30.6513, lng: 76.7233 },
            { lat: 30.5937, lng: 76.8621 },
            { lat: 30.9010, lng: 75.8573 }
          ],
          "bus456": [ // Amritsar to Jalandhar route
            { lat: 31.6340, lng: 74.8723 },
            { lat: 31.4304, lng: 74.9496 },
            { lat: 31.3260, lng: 75.5762 },
            { lat: 31.3260, lng: 75.5762 }
          ],
          "bus789": [ // Patiala to Bathinda route
            { lat: 30.3398, lng: 76.3869 },
            { lat: 30.2084, lng: 76.1101 },
            { lat: 29.9988, lng: 75.8926 },
            { lat: 30.2118, lng: 74.9455 }
          ]
        };

        const path = routePaths[bus.id] || [bus.location];
        let currentIndex = 0;

        const interval = setInterval(() => {
          if (currentIndex < path.length - 1) {
            currentIndex++;
            // Update bus location in the buses array would happen here
            // For simulation, we'll just log the movement
            console.log(`Bus ${bus.vehicleNumber} moving to:`, path[currentIndex]);
          } else {
            // Reset to start of route
            currentIndex = 0;
          }
        }, 3000); // Move every 3 seconds

        movementRef.current[bus.id] = { interval, path };
      }
    });

    // Cleanup intervals for buses that are no longer enroute
    Object.keys(movementRef.current).forEach(busId => {
      const bus = buses.find(b => b.id === busId);
      if (!bus || bus.status !== 'enroute') {
        clearInterval(movementRef.current[busId].interval);
        delete movementRef.current[busId];
      }
    });

    return () => {
      // Cleanup all intervals on unmount
      Object.values(movementRef.current).forEach(({ interval }) => {
        clearInterval(interval);
      });
    };
  }, [buses]);

  if (!userLocation) {
    return (
      <div className="w-full h-full bg-surface-variant rounded-lg border-2 border-dashed border-border flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={[userLocation.lat, userLocation.lng] as [number, number]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater buses={buses} selectedBus={selectedBus} />

        {/* Admin location marker */}
        <Marker position={[userLocation.lat, userLocation.lng] as [number, number]} icon={adminIcon}>
          <Popup>
            <div className="text-center">
              <strong>Admin Location</strong>
              <br />
              <span className="text-sm text-muted-foreground">Your current position</span>
            </div>
          </Popup>
        </Marker>

        {/* Bus markers */}
        {buses.map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.location.lat, bus.location.lng] as [number, number]}
            icon={createBusIcon(bus.status)}
            eventHandlers={{
              click: () => onBusSelect(bus.id)
            }}
          >
            <Popup>
              <div className="space-y-2 min-w-48">
                <div className="flex items-center justify-between">
                  <strong className="text-foreground">{bus.vehicleNumber}</strong>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    bus.status === 'enroute' ? 'bg-success/20 text-success' :
                    bus.status === 'idle' ? 'bg-warning/20 text-warning' :
                    'bg-destructive/20 text-destructive'
                  }`}>
                    {bus.status}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div><strong>Driver:</strong> {bus.driver}</div>
                  <div><strong>Route:</strong> {bus.route}</div>
                  <div><strong>Passengers:</strong> {bus.passengers}/{bus.capacity}</div>
                  <div><strong>Revenue:</strong> ₹{bus.estimatedRevenue}</div>
                  <div><strong>Next Stop:</strong> {bus.nextStop}</div>
                </div>

                <div className="pt-2 border-t">
                  <button 
                    onClick={() => onBusSelect(bus.id)}
                    className="w-full px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}