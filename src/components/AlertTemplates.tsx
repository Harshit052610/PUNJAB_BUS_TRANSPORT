import { useState } from "react";
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Send,
  Clock,
  Users,
  MessageSquare,
  Bell
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock alert templates
const alertTemplates = [
  {
    id: "alert1",
    code: "ALRT-001",
    title: "Door Malfunction",
    message: "Please check door {door_number} - possible malfunction detected",
    priority: "high",
    category: "maintenance",
    usageCount: 23,
    lastUsed: "2024-09-14T09:30:00Z",
    targetType: "driver"
  },
  {
    id: "alert2", 
    code: "ALRT-002",
    title: "Route Deviation",
    message: "Bus has deviated from assigned route. Please return to designated path.",
    priority: "medium",
    category: "operations",
    usageCount: 15,
    lastUsed: "2024-09-14T08:45:00Z",
    targetType: "driver"
  },
  {
    id: "alert3",
    code: "ALRT-003",
    title: "Emergency Stop Required",
    message: "Emergency situation ahead. Please stop at the nearest safe location.",
    priority: "critical",
    category: "safety",
    usageCount: 2,
    lastUsed: "2024-09-13T14:20:00Z", 
    targetType: "driver"
  },
  {
    id: "alert4",
    code: "ALRT-004",
    title: "Service Disruption Notice",
    message: "Bus service on {route_name} will be temporarily suspended due to {reason}.",
    priority: "medium",
    category: "information",
    usageCount: 8,
    lastUsed: "2024-09-12T11:15:00Z",
    targetType: "passenger"
  },
  {
    id: "alert5",
    code: "ALRT-005", 
    title: "Passenger Limit Exceeded",
    message: "Bus is at full capacity. Please do not board additional passengers.",
    priority: "medium",
    category: "operations",
    usageCount: 34,
    lastUsed: "2024-09-14T10:10:00Z",
    targetType: "driver"
  }
];

const categories = ["maintenance", "operations", "safety", "information"];
const priorities = ["low", "medium", "high", "critical"];
const targetTypes = ["driver", "passenger", "both"];

export default function AlertTemplates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingAlert, setIsAddingAlert] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [newAlert, setNewAlert] = useState({
    code: "",
    title: "",
    message: "",
    priority: "medium",
    category: "operations",
    targetType: "driver"
  });

  const filteredAlerts = alertTemplates.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return "status-offline";
      case "high":
        return "bg-destructive/10 text-destructive border border-destructive/20";
      case "medium":
        return "status-idle";
      case "low":
        return "status-online";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleSendAlert = (template: any) => {
    console.log("Sending alert:", template.code);
    // This would open a dialog to select recipients and send the alert
  };

  const handleAddAlert = () => {
    if (newAlert.code && newAlert.title && newAlert.message) {
      console.log("Adding new alert template:", newAlert);
      setIsAddingAlert(false);
      setNewAlert({
        code: "",
        title: "",
        message: "",
        priority: "medium", 
        category: "operations",
        targetType: "driver"
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alert Templates</h1>
          <p className="text-muted-foreground">Manage pre-defined alert messages and emergency notifications</p>
        </div>
        
        <Dialog open={isAddingAlert} onOpenChange={setIsAddingAlert}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Alert Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="alertCode">Alert Code</Label>
                <Input
                  id="alertCode"
                  placeholder="ALRT-006"
                  value={newAlert.code}
                  onChange={(e) => setNewAlert({...newAlert, code: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="alertTitle">Title</Label>
                <Input
                  id="alertTitle"
                  placeholder="Fuel Level Low"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="alertMessage">Message Template</Label>
                <Textarea
                  id="alertMessage"
                  placeholder="Fuel level is below {percentage}%. Please refuel at nearest station."
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use {'{}'} for dynamic placeholders like {'{route_name}'}, {'{door_number}'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newAlert.priority} onValueChange={(value) => setNewAlert({...newAlert, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map(priority => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newAlert.category} onValueChange={(value) => setNewAlert({...newAlert, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="targetType">Target Audience</Label>
                <Select value={newAlert.targetType} onValueChange={(value) => setNewAlert({...newAlert, targetType: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {targetTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddAlert} className="w-full">
                Create Template
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
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold text-foreground">{alertTemplates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-foreground">{alertTemplates.filter(a => a.priority === 'critical').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Send className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold text-foreground">{alertTemplates.reduce((sum, a) => sum + a.usageCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transport-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Most Used</p>
                <p className="text-lg font-bold text-foreground">{alertTemplates.reduce((max, a) => a.usageCount > max.usageCount ? a : max, alertTemplates[0])?.code}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates List */}
        <div className="lg:col-span-2">
          <Card className="transport-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alert Templates</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search templates..."
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
                    <TableHead>Template</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow 
                      key={alert.id}
                      className={selectedTemplate?.id === alert.id ? "bg-muted/50" : "cursor-pointer"}
                      onClick={() => setSelectedTemplate(alert)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{alert.title}</div>
                            <div className="text-sm text-muted-foreground">{alert.code}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`status-indicator ${getPriorityBadge(alert.priority)}`}>
                          {alert.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {alert.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-medium text-foreground">{alert.usageCount}</div>
                          <div className="text-xs text-muted-foreground">times</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatTimestamp(alert.lastUsed)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendAlert(alert);
                            }}
                            className="gap-1"
                          >
                            <Send className="h-3 w-3" />
                            Send
                          </Button>
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

        {/* Template Preview */}
        <div className="lg:col-span-1">
          {selectedTemplate ? (
            <Card className="transport-card">
              <CardHeader>
                <CardTitle className="text-lg">Template Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-foreground">{selectedTemplate.title}</div>
                    <div className="text-sm text-muted-foreground">{selectedTemplate.code}</div>
                  </div>
                  
                  <div className="p-3 bg-surface rounded-lg border border-border">
                    <div className="text-sm text-foreground">{selectedTemplate.message}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Priority:</span>
                      <Badge className={`status-indicator ${getPriorityBadge(selectedTemplate.priority)}`}>
                        {selectedTemplate.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{selectedTemplate.category}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Target:</span>
                      <span className="font-medium">{selectedTemplate.targetType}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage:</span>
                      <span className="font-medium">{selectedTemplate.usageCount} times</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <Button onClick={() => handleSendAlert(selectedTemplate)} className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Send Alert Now
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Edit className="h-4 w-4" />
                    Edit Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="transport-card">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Select a Template</h3>
                <p className="text-muted-foreground text-sm">
                  Click on an alert template from the list to preview and send alerts.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}