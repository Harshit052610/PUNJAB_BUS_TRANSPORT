import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  IndianRupee, 
  Bus, 
  Clock, 
  MapPin,
  BarChart3,
  PieChart,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock analytics data
const todayStats = {
  totalPassengers: 2847,
  totalRevenue: 341640,
  activeBuses: 18,
  completedTrips: 142,
  avgPassengersPerTrip: 20,
  topRoute: "Chandigarh - Ludhiana"
};

const weeklyData = [
  { day: "Mon", passengers: 2654, revenue: 318480, trips: 138 },
  { day: "Tue", passengers: 2789, revenue: 334680, trips: 145 },
  { day: "Wed", passengers: 2943, revenue: 353160, trips: 152 },
  { day: "Thu", passengers: 2847, revenue: 341640, trips: 142 },
  { day: "Fri", passengers: 3156, revenue: 378720, trips: 164 },
  { day: "Sat", passengers: 3892, revenue: 467040, trips: 189 },
  { day: "Sun", passengers: 3245, revenue: 389400, trips: 158 }
];

const routePerformance = [
  { route: "Chandigarh - Ludhiana", passengers: 456, revenue: 54720, efficiency: 95 },
  { route: "Amritsar - Jalandhar", passengers: 389, revenue: 35010, efficiency: 87 },
  { route: "Patiala - Bathinda", passengers: 312, revenue: 43680, efficiency: 78 },
  { route: "Mohali - Zirakpur", passengers: 278, revenue: 22240, efficiency: 82 },
  { route: "Phagwara - Kapurthala", passengers: 234, revenue: 18720, efficiency: 71 }
];

const driverLeaderboard = [
  { driver: "Gurpreet Singh", trips: 24, passengers: 486, revenue: 58320, rating: 4.9 },
  { driver: "Harpreet Kaur", trips: 22, passengers: 445, revenue: 53400, rating: 4.8 },
  { driver: "Jasbir Singh", trips: 21, passengers: 420, revenue: 50400, rating: 4.7 },
  { driver: "Manpreet Singh", trips: 19, passengers: 380, revenue: 45600, rating: 4.6 },
  { driver: "Simranjit Kaur", trips: 18, passengers: 356, revenue: 42720, rating: 4.5 }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Performance insights and operational metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="today">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Passengers</p>
                <p className="text-2xl font-bold text-foreground">{todayStats.totalPassengers.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+12.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <IndianRupee className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-foreground">₹{(todayStats.totalRevenue / 1000).toFixed(0)}K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+8.7%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Bus className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed Trips</p>
                <p className="text-2xl font-bold text-foreground">{todayStats.completedTrips}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+15.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Passengers/Trip</p>
                <p className="text-2xl font-bold text-foreground">{todayStats.avgPassengersPerTrip}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+3.1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <Card className="transport-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {day.day}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{day.passengers.toLocaleString()} passengers</div>
                      <div className="text-sm text-muted-foreground">{day.trips} trips</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">₹{(day.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-success">+{Math.round(Math.random() * 10)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Route Performance */}
        <Card className="transport-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Route Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routePerformance.map((route, index) => (
                <div key={route.route} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground">{route.route}</div>
                      <div className="text-sm text-muted-foreground">{route.passengers} passengers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">₹{(route.revenue / 1000).toFixed(0)}K</div>
                      <Badge variant={route.efficiency >= 90 ? "default" : route.efficiency >= 80 ? "secondary" : "outline"}>
                        {route.efficiency}% efficient
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        route.efficiency >= 90 ? 'bg-success' : 
                        route.efficiency >= 80 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${route.efficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Leaderboard */}
      <Card className="transport-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Driver Performance Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {driverLeaderboard.map((driver, index) => (
              <div key={driver.driver} className="p-4 rounded-lg border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{driver.driver}</div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(driver.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">{driver.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Trips:</span>
                    <span className="font-medium">{driver.trips}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Passengers:</span>
                    <span className="font-medium">{driver.passengers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold text-foreground">₹{(driver.revenue / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}