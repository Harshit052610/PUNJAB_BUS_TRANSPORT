import { 
  Users, 
  Bus, 
  DollarSign, 
  Activity,
  TrendingUp,
  MapPin,
  Clock,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data - replace with real data from Firestore
const metrics = {
  totalPassengers: 1240,
  totalRevenue: 18650,
  activeBuses: 23,
  totalDrivers: 28,
  avgPassengersPerTrip: 29.5,
  revenueGrowth: 12.5,
};

const recentActivity = [
  {
    id: 1,
    type: "passenger_update",
    bus: "AP07 XX 1234",
    driver: "Ravi Kumar",
    message: "Bus capacity reached: 38/40 passengers",
    time: "2 min ago",
    status: "warning"
  },
  {
    id: 2,
    type: "route_complete",
    bus: "AP07 XX 5678", 
    driver: "Suresh Reddy",
    message: "Route completed successfully",
    time: "5 min ago",
    status: "success"
  },
  {
    id: 3,
    type: "alert",
    bus: "AP07 XX 9012",
    driver: "Lakshmi Prasad",
    message: "Driver reported door issue",
    time: "8 min ago",
    status: "error"
  },
  {
    id: 4,
    type: "driver_online",
    bus: "AP07 XX 3456",
    driver: "Venkat Rao",
    message: "Driver came online",
    time: "12 min ago",
    status: "success"
  }
];

const onlineBuses = [
  {
    id: "bus123",
    vehicleNumber: "AP07 XX 1234",
    driver: "Ravi Kumar",
    route: "Route A",
    passengers: 32,
    capacity: 40,
    status: "enroute",
    location: "Near City Center",
    estimatedRevenue: 1600
  },
  {
    id: "bus456", 
    vehicleNumber: "AP07 XX 5678",
    driver: "Suresh Reddy",
    route: "Route B",
    passengers: 28,
    capacity: 40,
    status: "enroute", 
    location: "Main Bus Stand",
    estimatedRevenue: 1400
  },
  {
    id: "bus789",
    vehicleNumber: "AP07 XX 9012", 
    driver: "Lakshmi Prasad",
    route: "Route C",
    passengers: 15,
    capacity: 35,
    status: "idle",
    location: "Terminal 2", 
    estimatedRevenue: 750
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Real-time overview of your fleet operations</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-indicator status-online">
            <div className="w-2 h-2 bg-success rounded-full pulse-dot"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transport-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.totalPassengers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{metrics.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{metrics.revenueGrowth}% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.activeBuses}</div>
            <p className="text-xs text-muted-foreground">of {metrics.totalDrivers} total</p>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Passengers/Trip</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metrics.avgPassengersPerTrip}</div>
            <p className="text-xs text-muted-foreground">Capacity utilization</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Buses */}
        <Card className="transport-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Live Buses</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {onlineBuses.map((bus) => (
              <div key={bus.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{bus.vehicleNumber}</div>
                    <div className="text-sm text-muted-foreground">{bus.driver} • {bus.route}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Badge className={`status-indicator ${
                      bus.status === 'enroute' ? 'status-online' : 'status-idle'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        bus.status === 'enroute' ? 'bg-success' : 'bg-warning'
                      } ${bus.status === 'enroute' ? 'pulse-dot' : ''}`}></div>
                      {bus.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {bus.passengers}/{bus.capacity} passengers
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="transport-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-success/10' :
                  activity.status === 'warning' ? 'bg-warning/10' :
                  'bg-destructive/10'
                }`}>
                  {activity.status === 'success' ? (
                    <Users className={`h-4 w-4 text-success`} />
                  ) : activity.status === 'warning' ? (
                    <AlertCircle className={`h-4 w-4 text-warning`} />
                  ) : (
                    <AlertCircle className={`h-4 w-4 text-destructive`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">{activity.bus}</p>
                  <p className="text-sm text-muted-foreground">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}