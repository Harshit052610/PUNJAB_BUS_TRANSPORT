import { useState } from "react";
import { 
  Route, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin,
  Clock,
  Users,
  IndianRupee,
  Navigation
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock route data
const routes = [
  {
    id: "route1",
    name: "Chandigarh - Ludhiana Express",
    code: "CL-001",
    origin: "Chandigarh",
    destination: "Ludhiana", 
    distance: "98 km",
    duration: "2h 30m",
    fare: 120,
    stops: 8,
    frequency: "Every 30 min",
    activeBuses: 5,
    status: "active",
    stopsList: [
      "Chandigarh Bus Stand",
      "Mohali Phase 7",
      "Kharar",
      "Kurali",
      "Morinda",
      "Samrala",
      "Khanna",
      "Ludhiana"
    ]
  },
  {
    id: "route2",
    name: "Amritsar - Jalandhar Highway",
    code: "AJ-002", 
    origin: "Amritsar",
    destination: "Jalandhar",
    distance: "78 km", 
    duration: "1h 45m",
    fare: 90,
    stops: 6,
    frequency: "Every 45 min",
    activeBuses: 3,
    status: "active",
    stopsList: [
      "Amritsar Junction",
      "Tarn Taran",
      "Patti",
      "Nakodar",
      "Phillaur", 
      "Jalandhar City"
    ]
  },
  {
    id: "route3",
    name: "Patiala - Bathinda Route",
    code: "PB-003",
    origin: "Patiala",
    destination: "Bathinda",
    distance: "106 km",
    duration: "2h 15m", 
    fare: 140,
    stops: 7,
    frequency: "Every 1 hour",
    activeBuses: 2,
    status: "maintenance",
    stopsList: [
      "Patiala Bus Stand",
      "Nabha",
      "Dhuri",
      "Sangrur",
      "Barnala",
      "Tapa",
      "Bathinda"
    ]
  }
];

export default function RouteManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingRoute, setIsAddingRoute] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [newRoute, setNewRoute] = useState({
    name: "",
    code: "",
    origin: "",
    destination: "",
    fare: "",
    stops: ""
  });

  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "status-online";
      case "maintenance":
        return "status-idle";
      case "inactive":
        return "status-offline";
      default:
        return "status-offline";
    }
  };

  const handleAddRoute = () => {
    if (newRoute.name && newRoute.code && newRoute.origin && newRoute.destination) {
      console.log("Adding new route:", newRoute);
      setIsAddingRoute(false);
      setNewRoute({
        name: "",
        code: "",
        origin: "",
        destination: "",
        fare: "",
        stops: ""
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Route Management</h1>
          <p className="text-muted-foreground">Manage bus routes, stops, and schedules across Punjab</p>
        </div>
        
        <Dialog open={isAddingRoute} onOpenChange={setIsAddingRoute}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Route
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Route</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="routeName">Route Name</Label>
                <Input
                  id="routeName"
                  placeholder="Chandigarh - Ludhiana Express"
                  value={newRoute.name}
                  onChange={(e) => setNewRoute({...newRoute, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="routeCode">Route Code</Label>
                <Input
                  id="routeCode"
                  placeholder="CL-001"
                  value={newRoute.code}
                  onChange={(e) => setNewRoute({...newRoute, code: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    placeholder="Chandigarh"
                    value={newRoute.origin}
                    onChange={(e) => setNewRoute({...newRoute, origin: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Ludhiana"
                    value={newRoute.destination}
                    onChange={(e) => setNewRoute({...newRoute, destination: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="fare">Base Fare (₹)</Label>
                <Input
                  id="fare"
                  type="number"
                  placeholder="120"
                  value={newRoute.fare}
                  onChange={(e) => setNewRoute({...newRoute, fare: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="stops">Bus Stops (comma-separated)</Label>
                <Textarea
                  id="stops"
                  placeholder="Chandigarh Bus Stand, Mohali Phase 7, Kharar..."
                  value={newRoute.stops}
                  onChange={(e) => setNewRoute({...newRoute, stops: e.target.value})}
                  rows={3}
                />
              </div>
              <Button onClick={handleAddRoute} className="w-full">
                Add Route
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Route className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Routes</p>
                <p className="text-2xl font-bold text-foreground">{routes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Navigation className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Routes</p>
                <p className="text-2xl font-bold text-foreground">{routes.filter(r => r.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Stops</p>
                <p className="text-2xl font-bold text-foreground">{routes.reduce((sum, route) => sum + route.stops, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Fare</p>
                <p className="text-2xl font-bold text-foreground">₹{Math.round(routes.reduce((sum, route) => sum + route.fare, 0) / routes.length)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routes List */}
        <div className="lg:col-span-2">
          <Card className="transport-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Routes</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search routes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Fare</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Buses</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.map((route) => (
                    <TableRow 
                      key={route.id} 
                      className={selectedRoute?.id === route.id ? "bg-muted/50" : "cursor-pointer"}
                      onClick={() => setSelectedRoute(route)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Route className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{route.name}</div>
                            <div className="text-sm text-muted-foreground">{route.code}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{route.distance}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {route.duration}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          <span className="font-medium">{route.fare}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`status-indicator ${getStatusBadge(route.status)}`}>
                          {route.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium text-foreground">{route.activeBuses}</div>
                          <div className="text-xs text-muted-foreground">active</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Route Details */}
        <div className="lg:col-span-1">
          {selectedRoute ? (
            <Card className="transport-card">
              <CardHeader>
                <CardTitle className="text-lg">Route Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-foreground">{selectedRoute.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedRoute.code}</div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Distance:</span>
                    <span className="font-medium">{selectedRoute.distance}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{selectedRoute.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Frequency:</span>
                    <span className="font-medium">{selectedRoute.frequency}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Base Fare:</span>
                    <span className="font-medium flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {selectedRoute.fare}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-2">Bus Stops ({selectedRoute.stops})</div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedRoute.stopsList.map((stop: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="transport-card">
              <CardContent className="p-6 text-center">
                <Route className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Select a Route</h3>
                <p className="text-muted-foreground text-sm">
                  Click on a route from the list to view detailed information and stops.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}