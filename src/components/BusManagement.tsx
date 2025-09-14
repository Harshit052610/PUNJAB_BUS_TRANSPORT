import { useState } from "react";
import { 
  Bus, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin,
  Users,
  Fuel,
  Settings,
  Play,
  Pause,
  CheckCircle,
  XCircle
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock bus data
const buses = [
  {
    id: "bus1",
    vehicleNumber: "PB07 AB 1234",
    model: "Ashok Leyland Viking",
    capacity: 40,
    driver: "Gurpreet Singh",
    route: "Chandigarh - Ludhiana",
    status: "active",
    location: "Chandigarh Bus Stand",
    fuelLevel: 85,
    lastMaintenance: "2024-09-10",
    totalKm: 125000,
    isRunning: true
  },
  {
    id: "bus2", 
    vehicleNumber: "PB03 CD 5678",
    model: "Tata Starbus",
    capacity: 45,
    driver: "Harpreet Kaur",
    route: "Amritsar - Jalandhar", 
    status: "maintenance",
    location: "Amritsar Depot",
    fuelLevel: 45,
    lastMaintenance: "2024-09-14",
    totalKm: 89000,
    isRunning: false
  },
  {
    id: "bus3",
    vehicleNumber: "PB11 EF 9012", 
    model: "Mahindra Tourister",
    capacity: 35,
    driver: "Jasbir Singh",
    route: "Patiala - Bathinda",
    status: "active",
    location: "Patiala Junction",
    fuelLevel: 92,
    lastMaintenance: "2024-09-08",
    totalKm: 67000,
    isRunning: true
  }
];

const routes = [
  "Chandigarh - Ludhiana",
  "Amritsar - Jalandhar", 
  "Patiala - Bathinda",
  "Mohali - Zirakpur",
  "Phagwara - Kapurthala"
];

const drivers = [
  "Gurpreet Singh",
  "Harpreet Kaur",
  "Jasbir Singh",
  "Manpreet Singh", 
  "Simranjit Kaur"
];

export default function BusManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuses, setSelectedBuses] = useState<string[]>([]);
  const [isAddingBus, setIsAddingBus] = useState(false);
  const [newBus, setNewBus] = useState({
    vehicleNumber: "",
    model: "",
    capacity: "",
    driver: "",
    route: ""
  });

  const filteredBuses = buses.filter(bus => 
    bus.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.route.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleStartBus = (busId: string) => {
    // Simulate starting bus
    console.log(`Starting bus ${busId}`);
    // This would trigger the live map to show this bus
  };

  const handleAddBus = () => {
    if (newBus.vehicleNumber && newBus.model && newBus.capacity && newBus.driver && newBus.route) {
      console.log("Adding new bus:", newBus);
      setIsAddingBus(false);
      setNewBus({
        vehicleNumber: "",
        model: "",
        capacity: "",
        driver: "",
        route: ""
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bus Management</h1>
          <p className="text-muted-foreground">Manage your bus fleet, assignments, and operations</p>
        </div>
        
        <Dialog open={isAddingBus} onOpenChange={setIsAddingBus}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Bus</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                <Input
                  id="vehicleNumber"
                  placeholder="PB07 AB 1234"
                  value={newBus.vehicleNumber}
                  onChange={(e) => setNewBus({...newBus, vehicleNumber: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="model">Bus Model</Label>
                <Input
                  id="model"
                  placeholder="Ashok Leyland Viking"
                  value={newBus.model}
                  onChange={(e) => setNewBus({...newBus, model: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="capacity">Seating Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="40"
                  value={newBus.capacity}
                  onChange={(e) => setNewBus({...newBus, capacity: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="driver">Assign Driver</Label>
                <Select value={newBus.driver} onValueChange={(value) => setNewBus({...newBus, driver: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map(driver => (
                      <SelectItem key={driver} value={driver}>{driver}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="route">Assign Route</Label>
                <Select value={newBus.route} onValueChange={(value) => setNewBus({...newBus, route: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map(route => (
                      <SelectItem key={route} value={route}>{route}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddBus} className="w-full">
                Add Bus
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
                <Bus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Buses</p>
                <p className="text-2xl font-bold text-foreground">{buses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Buses</p>
                <p className="text-2xl font-bold text-foreground">{buses.filter(b => b.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-foreground">{buses.filter(b => b.status === 'maintenance').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold text-foreground">{buses.reduce((sum, bus) => sum + bus.capacity, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bus List */}
      <Card className="transport-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Bus Fleet</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search buses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fuel</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Bus className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{bus.vehicleNumber}</div>
                        <div className="text-sm text-muted-foreground">{bus.model}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{bus.driver}</div>
                      <div className="text-sm text-muted-foreground">{bus.capacity} seats</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{bus.route}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`status-indicator ${getStatusBadge(bus.status)}`}>
                      <div className={`w-2 h-2 rounded-full ${
                        bus.status === 'active' ? 'bg-success pulse-dot' : 
                        bus.status === 'maintenance' ? 'bg-warning' : 'bg-destructive'
                      }`}></div>
                      {bus.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {bus.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            bus.fuelLevel > 50 ? 'bg-success' : 
                            bus.fuelLevel > 25 ? 'bg-warning' : 'bg-destructive'
                          }`}
                          style={{ width: `${bus.fuelLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{bus.fuelLevel}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {bus.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant={bus.isRunning ? "outline" : "default"}
                          onClick={() => handleStartBus(bus.id)}
                          className="gap-1"
                        >
                          {bus.isRunning ? (
                            <>
                              <Pause className="h-3 w-3" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3" />
                              Start
                            </>
                          )}
                        </Button>
                      )}
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
  );
}