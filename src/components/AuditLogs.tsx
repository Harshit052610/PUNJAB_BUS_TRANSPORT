import { useState } from "react";
import { 
  Shield, 
  Search, 
  Filter, 
  Download,
  Clock,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock audit log data
const auditLogs = [
  {
    id: "log1",
    timestamp: "2024-09-14T10:30:00Z",
    action: "driver_message_sent",
    user: "Admin User",
    userId: "admin1",
    target: "Gurpreet Singh (Driver)",
    targetId: "driver1",
    details: "Sent alert: 'Please check door 2' to driver on Route CL-001",
    severity: "info",
    category: "messaging",
    ipAddress: "192.168.1.100"
  },
  {
    id: "log2", 
    timestamp: "2024-09-14T10:25:00Z",
    action: "bus_started",
    user: "Gurpreet Singh",
    userId: "driver1",
    target: "Bus PB07 AB 1234",
    targetId: "bus1",
    details: "Driver started bus service on Chandigarh - Ludhiana route",
    severity: "success",
    category: "operations",
    ipAddress: "192.168.1.101"
  },
  {
    id: "log3",
    timestamp: "2024-09-14T10:20:00Z", 
    action: "route_updated",
    user: "Admin User",
    userId: "admin1",
    target: "Route CL-001",
    targetId: "route1",
    details: "Updated bus stops for Chandigarh - Ludhiana Express route",
    severity: "warning",
    category: "configuration",
    ipAddress: "192.168.1.100"
  },
  {
    id: "log4",
    timestamp: "2024-09-14T10:15:00Z",
    action: "driver_offline",
    user: "System",
    userId: "system",
    target: "Harpreet Kaur (Driver)",
    targetId: "driver2", 
    details: "Driver went offline after 5 minutes of inactivity",
    severity: "warning",
    category: "system",
    ipAddress: "N/A"
  },
  {
    id: "log5",
    timestamp: "2024-09-14T10:10:00Z",
    action: "passenger_count_updated",
    user: "Jasbir Singh",
    userId: "driver3",
    target: "Bus PB11 EF 9012",
    targetId: "bus3",
    details: "Passenger count updated: 23/35 passengers on Patiala - Bathinda route",
    severity: "info",
    category: "operations",
    ipAddress: "192.168.1.103"
  },
  {
    id: "log6",
    timestamp: "2024-09-14T10:05:00Z",
    action: "emergency_alert_sent",
    user: "Admin User", 
    userId: "admin1",
    target: "All Drivers",
    targetId: "broadcast",
    details: "Emergency alert sent to all drivers about road closure on NH1",
    severity: "error",
    category: "alerts",
    ipAddress: "192.168.1.100"
  },
  {
    id: "log7",
    timestamp: "2024-09-14T09:55:00Z",
    action: "bus_maintenance_scheduled",
    user: "Admin User",
    userId: "admin1", 
    target: "Bus PB03 CD 5678",
    targetId: "bus2",
    details: "Scheduled maintenance for bus due to fuel efficiency issues",
    severity: "warning",
    category: "maintenance",
    ipAddress: "192.168.1.100"
  },
  {
    id: "log8",
    timestamp: "2024-09-14T09:50:00Z",
    action: "user_login",
    user: "Admin User",
    userId: "admin1",
    target: "Admin Panel",
    targetId: "system",
    details: "Administrator logged into the management system",
    severity: "info",
    category: "authentication",
    ipAddress: "192.168.1.100"
  }
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter;
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    
    return matchesSearch && matchesSeverity && matchesCategory;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "success":
        return "status-online";
      case "warning":
        return "status-idle";
      case "error":
        return "status-offline";
      case "info":
      default:
        return "bg-muted text-muted-foreground border border-muted";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const categories = ["all", "messaging", "operations", "configuration", "system", "alerts", "maintenance", "authentication"];
  const severities = ["all", "info", "success", "warning", "error"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">Monitor all system activities and administrative actions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Activities</p>
                <p className="text-2xl font-bold text-foreground">{auditLogs.length}</p>
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
                <p className="text-sm text-muted-foreground">Successful Actions</p>
                <p className="text-2xl font-bold text-foreground">{auditLogs.filter(l => l.severity === 'success').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-foreground">{auditLogs.filter(l => l.severity === 'warning').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-foreground">{auditLogs.filter(l => l.severity === 'error').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="transport-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            System Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search logs by action, user, or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                {severities.map(severity => (
                  <SelectItem key={severity} value={severity}>
                    {severity === "all" ? "All Severities" : severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{log.action.replace(/_/g, ' ')}</div>
                        <div className="text-sm text-muted-foreground max-w-xs truncate">{log.details}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">{log.user}</div>
                          <div className="text-xs text-muted-foreground">{log.ipAddress}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-foreground">{log.target}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`status-indicator ${getSeverityBadge(log.severity)} flex items-center gap-1`}>
                        {getSeverityIcon(log.severity)}
                        {log.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.category}
                      </Badge>
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