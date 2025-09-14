import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Bell, 
  Shield, 
  Database,
  Users,
  Save,
  RefreshCw,
  Key,
  MapPin,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    systemName: "Punjab Bus Management System",
    adminEmail: "admin@punjabbus.gov.in",
    defaultLanguage: "en",
    timeZone: "Asia/Kolkata",
    
    // Notification Settings
    emailNotifications: true,
    smsAlerts: true,
    pushNotifications: true,
    emergencyAlerts: true,
    
    // Map Settings
    mapProvider: "leaflet",
    defaultZoom: 10,
    trackingInterval: 5,
    gpsAccuracy: "high",
    
    // Security Settings
    sessionTimeout: 30,
    passwordPolicy: "strong",
    twoFactorAuth: false,
    auditLogging: true,
    
    // System Settings
    maintenanceMode: false,
    backupFrequency: "daily",
    dataRetention: 90,
    apiRateLimit: 1000
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Save settings to backend
  };

  const handleReset = () => {
    console.log("Resetting to defaults");
    // Reset to default values
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "ur", name: "اردو (Urdu)" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and administrative options</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="transport-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                value={settings.systemName}
                onChange={(e) => setSettings({...settings, systemName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select value={settings.defaultLanguage} onValueChange={(value) => setSettings({...settings, defaultLanguage: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timeZone">Time Zone</Label>
              <Select value={settings.timeZone} onValueChange={(value) => setSettings({...settings, timeZone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="transport-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send alerts via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsAlerts">SMS Alerts</Label>
                <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
              </div>
              <Switch
                id="smsAlerts"
                checked={settings.smsAlerts}
                onCheckedChange={(checked) => setSettings({...settings, smsAlerts: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
                <p className="text-sm text-muted-foreground">High-priority system alerts</p>
              </div>
              <Switch
                id="emergencyAlerts"
                checked={settings.emergencyAlerts}
                onCheckedChange={(checked) => setSettings({...settings, emergencyAlerts: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Map & GPS Settings */}
        <Card className="transport-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Map & GPS Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mapProvider">Map Provider</Label>
              <Select value={settings.mapProvider} onValueChange={(value) => setSettings({...settings, mapProvider: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leaflet">OpenStreetMap (Leaflet)</SelectItem>
                  <SelectItem value="google">Google Maps</SelectItem>
                  <SelectItem value="mapbox">Mapbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="defaultZoom">Default Zoom Level</Label>
              <Input
                id="defaultZoom"
                type="number"
                min="1"
                max="20"
                value={settings.defaultZoom}
                onChange={(e) => setSettings({...settings, defaultZoom: parseInt(e.target.value)})}
              />
            </div>
            
            <div>
              <Label htmlFor="trackingInterval">GPS Tracking Interval (seconds)</Label>
              <Input
                id="trackingInterval"
                type="number"
                min="1"
                max="60"
                value={settings.trackingInterval}
                onChange={(e) => setSettings({...settings, trackingInterval: parseInt(e.target.value)})}
              />
            </div>
            
            <div>
              <Label htmlFor="gpsAccuracy">GPS Accuracy</Label>
              <Select value={settings.gpsAccuracy} onValueChange={(value) => setSettings({...settings, gpsAccuracy: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Accuracy</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="low">Low Power</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="transport-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="5"
                max="480"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
              />
            </div>
            
            <div>
              <Label htmlFor="passwordPolicy">Password Policy</Label>
              <Select value={settings.passwordPolicy} onValueChange={(value) => setSettings({...settings, passwordPolicy: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (6+ characters)</SelectItem>
                  <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (12+ chars, symbols required)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auditLogging">Audit Logging</Label>
                <p className="text-sm text-muted-foreground">Log all administrative actions</p>
              </div>
              <Switch
                id="auditLogging"
                checked={settings.auditLogging}
                onCheckedChange={(checked) => setSettings({...settings, auditLogging: checked})}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Maintenance */}
      <Card className="transport-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Maintenance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  {settings.maintenanceMode ? "System is in maintenance mode" : "System is operational"}
                </span>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <Input
                id="dataRetention"
                type="number"
                min="1"
                max="365"
                value={settings.dataRetention}
                onChange={(e) => setSettings({...settings, dataRetention: parseInt(e.target.value)})}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card className="transport-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiRateLimit">API Rate Limit (requests/hour)</Label>
            <Input
              id="apiRateLimit"
              type="number"
              min="100"
              max="10000"
              value={settings.apiRateLimit}
              onChange={(e) => setSettings({...settings, apiRateLimit: parseInt(e.target.value)})}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <Key className="h-4 w-4" />
              Generate New API Key
            </Button>
            <Button variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              View API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}