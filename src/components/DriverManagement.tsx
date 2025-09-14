import { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare, 
  Edit, 
  MapPin,
  Phone,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock driver data
const drivers = [
  {
    id: "1",
    name: "Ravi Kumar",
    phone: "+91 98765 43210",
    busNumber: "PB07 XX 1234",
    route: "Route A",
    currentPassengers: 32,
    capacity: 40,
    status: "online",
    lastSeen: "2 min ago",
    location: "City Center",
    estimatedRevenue: 1600,
    trips: 8
  },
  {
    id: "2", 
    name: "Suresh Reddy",
    phone: "+91 87654 32109",
    busNumber: "PB07 XX 5678",
    route: "Route B", 
    currentPassengers: 28,
    capacity: 40,
    status: "online",
    lastSeen: "1 min ago",
    location: "Main Bus Stand",
    estimatedRevenue: 1400,
    trips: 6
  },
  {
    id: "3",
    name: "Lakshmi Prasad", 
    phone: "+91 76543 21098",
    busNumber: "PB07 XX 9012",
    route: "Route C",
    currentPassengers: 15,
    capacity: 35,
    status: "idle",
    lastSeen: "8 min ago", 
    location: "Terminal 2",
    estimatedRevenue: 750,
    trips: 4
  },
  {
    id: "4",
    name: "Venkat Rao",
    phone: "+91 65432 10987",
    busNumber: "PB07 XX 3456", 
    route: "Route D",
    currentPassengers: 0,
    capacity: 40,
    status: "offline",
    lastSeen: "25 min ago",
    location: "Depot",
    estimatedRevenue: 0,
    trips: 0
  },
  {
    id: "5",
    name: "Anjali Sharma",
    phone: "+91 54321 09876", 
    busNumber: "PB07 XX 7890",
    route: "Route E",
    currentPassengers: 22,
    capacity: 35,
    status: "online",
    lastSeen: "3 min ago",
    location: "University Area", 
    estimatedRevenue: 1100,
    trips: 5
  }
];

export default function DriverManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.route.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return "status-online";
      case "idle": 
        return "status-idle";
      case "offline":
        return "status-offline";
      default:
        return "status-offline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Management</h1>
          <p className="text-muted-foreground">Manage drivers, buses, and monitor performance</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Driver
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Drivers</p>
                <p className="text-2xl font-bold text-foreground">{drivers.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online</p>
                <p className="text-2xl font-bold text-success">
                  {drivers.filter(d => d.status === 'online').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-success rounded-full pulse-dot"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Idle</p>
                <p className="text-2xl font-bold text-warning">
                  {drivers.filter(d => d.status === 'idle').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold text-destructive">
                  {drivers.filter(d => d.status === 'offline').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="transport-card">
        <CardHeader>
          <CardTitle>Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search drivers, buses, or routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("online")}>
                  Online
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("idle")}>
                  Idle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("offline")}>
                  Offline
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Drivers Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Bus & Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Passengers</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Last Seen</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {driver.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{driver.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {driver.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{driver.busNumber}</div>
                        <div className="text-sm text-muted-foreground">{driver.route}</div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge className={`status-indicator ${getStatusBadge(driver.status)}`}>
                        <div className={`w-2 h-2 rounded-full ${
                          driver.status === 'online' ? 'bg-success pulse-dot' :
                          driver.status === 'idle' ? 'bg-warning' : 'bg-destructive'
                        }`}></div>
                        {driver.status}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="text-foreground">
                        {driver.currentPassengers}/{driver.capacity}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((driver.currentPassengers / driver.capacity) * 100)}% full
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="font-medium text-foreground">₹{driver.estimatedRevenue}</div>
                      <div className="text-xs text-muted-foreground">{driver.trips} trips</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {driver.location}
                      </div>
                      <div className="text-xs text-muted-foreground">{driver.lastSeen}</div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <MapPin className="h-4 w-4" />
                              View Location
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit Driver
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}