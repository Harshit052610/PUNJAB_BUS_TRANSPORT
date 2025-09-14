import { useState } from "react";
import { 
  Map as MapIcon, 
  Bus, 
  Users, 
  Navigation, 
  Maximize, 
  Filter,
  Search,
  MessageSquare,
  AlertTriangle
} from "lucide-react";
import MapComponent from "./MapComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock bus location data
const buses = [
  {
    id: "bus123",
    vehicleNumber: "AP07 XX 1234",
    driver: "Ravi Kumar",
    route: "Route A",
    passengers: 32,
    capacity: 40,
    status: "enroute",
    location: { lat: 16.3067, lng: 80.4365 },
    lastUpdate: "30s ago",
    estimatedRevenue: 1600,
    nextStop: "City Center - 3 min"
  },
  {
    id: "bus456",
    vehicleNumber: "AP07 XX 5678",
    driver: "Suresh Reddy", 
    route: "Route B",
    passengers: 28,
    capacity: 40,
    status: "enroute",
    location: { lat: 16.3167, lng: 80.4465 },
    lastUpdate: "45s ago",
    estimatedRevenue: 1400,
    nextStop: "Main Bus Stand - 5 min"
  },
  {
    id: "bus789",
    vehicleNumber: "AP07 XX 9012",
    driver: "Lakshmi Prasad",
    route: "Route C", 
    passengers: 15,
    capacity: 35,
    status: "idle",
    location: { lat: 16.2967, lng: 80.4265 },
    lastUpdate: "2 min ago",
    estimatedRevenue: 750,
    nextStop: "Terminal 2 - At Stop"
  }
];

export default function LiveMap() {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [routeFilter, setRouteFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bus.route.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRoute = routeFilter === "all" || bus.route === routeFilter;
    
    return matchesSearch && matchesRoute;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enroute":
        return "status-online";
      case "idle":
        return "status-idle";
      case "offline":
        return "status-offline";
      default:
        return "status-offline";
    }
  };

  const selectedBusData = selectedBus ? buses.find(b => b.id === selectedBus) : null;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Map</h1>
          <p className="text-muted-foreground">Real-time tracking of all buses and routes</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-indicator status-online">
            <div className="w-2 h-2 bg-success rounded-full pulse-dot"></div>
            <span>Live Tracking Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Left Sidebar - Bus List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="transport-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Active Buses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search buses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={routeFilter} onValueChange={setRouteFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    <SelectItem value="Route A">Route A</SelectItem>
                    <SelectItem value="Route B">Route B</SelectItem>
                    <SelectItem value="Route C">Route C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bus List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {filteredBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedBus === bus.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-surface hover:bg-surface-variant'
                    }`}
                    onClick={() => setSelectedBus(bus.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Bus className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm text-foreground">{bus.vehicleNumber}</div>
                          <div className="text-xs text-muted-foreground">{bus.driver}</div>
                        </div>
                      </div>
                      <Badge className={`status-indicator ${getStatusBadge(bus.status)} text-xs`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          bus.status === 'enroute' ? 'bg-success pulse-dot' : 
                          bus.status === 'idle' ? 'bg-warning' : 'bg-destructive'
                        }`}></div>
                        {bus.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Passengers:</span>
                        <span className="font-medium text-foreground">{bus.passengers}/{bus.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium text-foreground">₹{bus.estimatedRevenue}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{bus.nextStop}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center - Map View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="transport-card h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">Live Map View</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Navigation className="h-4 w-4" />
                  Center Map
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Maximize className="h-4 w-4" />
                  Fullscreen
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              {/* Placeholder for actual map integration */}
              <MapComponent 
                buses={filteredBuses}
                selectedBus={selectedBus}
                onBusSelect={setSelectedBus}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Bus Details */}
        <div className="lg:col-span-1 space-y-4">
          {selectedBusData ? (
            <Card className="transport-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Bus Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{selectedBusData.vehicleNumber}</div>
                    <div className="text-sm text-muted-foreground">{selectedBusData.driver}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Route:</span>
                    <Badge variant="outline">{selectedBusData.route}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={`status-indicator ${getStatusBadge(selectedBusData.status)}`}>
                      <div className={`w-2 h-2 rounded-full ${
                        selectedBusData.status === 'enroute' ? 'bg-success pulse-dot' : 
                        selectedBusData.status === 'idle' ? 'bg-warning' : 'bg-destructive'
                      }`}></div>
                      {selectedBusData.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Passengers:</span>
                      <span className="font-medium text-foreground">
                        {selectedBusData.passengers}/{selectedBusData.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(selectedBusData.passengers / selectedBusData.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Est. Revenue:</span>
                    <span className="font-semibold text-foreground">₹{selectedBusData.estimatedRevenue}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Next Stop:</span>
                    <div className="text-sm font-medium text-foreground">{selectedBusData.nextStop}</div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last updated: {selectedBusData.lastUpdate}
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <Button className="w-full gap-2" size="sm">
                    <MessageSquare className="h-4 w-4" />
                    Message Driver
                  </Button>
                  <Button variant="outline" className="w-full gap-2" size="sm">
                    <AlertTriangle className="h-4 w-4" />
                    Send Alert
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="transport-card">
              <CardContent className="p-6 text-center">
                <MapIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Select a Bus</h3>
                <p className="text-muted-foreground text-sm">
                  Click on a bus from the list to view detailed information and controls.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}