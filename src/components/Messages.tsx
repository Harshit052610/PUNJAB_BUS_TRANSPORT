import { useState } from "react";
import { 
  MessageSquare, 
  Send, 
  Search, 
  AlertTriangle, 
  Clock,
  Check,
  CheckCheck,
  Phone,
  MoreVertical
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock conversation data
const conversations = [
  {
    id: "conv_1",
    type: "driver",
    participant: {
      name: "Ravi Kumar",
      phone: "+91 98765 43210",
      bus: "AP07 XX 1234",
      route: "Route A"
    },
    lastMessage: "Passenger count updated: 32",
    timestamp: "2 min ago",
    unread: 0,
    status: "online"
  },
  {
    id: "conv_2", 
    type: "driver",
    participant: {
      name: "Suresh Reddy",
      phone: "+91 87654 32109", 
      bus: "AP07 XX 5678",
      route: "Route B"
    },
    lastMessage: "Route completed successfully",
    timestamp: "5 min ago",
    unread: 2,
    status: "online"
  },
  {
    id: "conv_3",
    type: "driver",
    participant: {
      name: "Lakshmi Prasad",
      phone: "+91 76543 21098",
      bus: "AP07 XX 9012", 
      route: "Route C"
    },
    lastMessage: "Alert: Door issue reported",
    timestamp: "8 min ago",
    unread: 1,
    status: "idle"
  }
];

// Mock messages for selected conversation
const mockMessages = [
  {
    id: "1",
    from: "driver",
    text: "Started route at 9:00 AM",
    timestamp: "9:00 AM",
    type: "normal",
    delivered: true,
    read: true
  },
  {
    id: "2", 
    from: "admin",
    text: "Good morning! Have a safe trip today.",
    timestamp: "9:02 AM",
    type: "normal",
    delivered: true,
    read: true
  },
  {
    id: "3",
    from: "driver",
    text: "Door 2 seems to have an issue - making grinding noise",
    timestamp: "10:15 AM", 
    type: "normal",
    delivered: true,
    read: true
  },
  {
    id: "4",
    from: "admin",
    text: "ALERT: Please stop at next safe location and inspect door 2. Report back immediately.",
    timestamp: "10:16 AM",
    type: "alert",
    alertCode: "ALRT-01",
    delivered: true,
    read: false
  },
  {
    id: "5",
    from: "driver", 
    text: "Stopped at City Center terminal. Door seems okay now, might have been debris.",
    timestamp: "10:25 AM",
    type: "normal",
    delivered: true,
    read: false
  }
];

const alertCodes = [
  { code: "ALRT-01", description: "Door Issue" },
  { code: "ALRT-02", description: "Route Change" },
  { code: "ALRT-03", description: "Emergency Stop" },
  { code: "ALRT-04", description: "Passenger Issue" },
  { code: "ALRT-05", description: "Vehicle Breakdown" }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("conv_3");
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState<"normal" | "alert">("normal");
  const [selectedAlertCode, setSelectedAlertCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.bus.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConvData = selectedConversation 
    ? conversations.find(c => c.id === selectedConversation)
    : null;

  const handleSendMessage = () => {
    if (!messageText.trim() && messageType !== "alert") return;
    
    // Here you would normally send the message to the backend
    console.log("Sending message:", {
      to: selectedConversation,
      text: messageText,
      type: messageType,
      alertCode: messageType === "alert" ? selectedAlertCode : null
    });
    
    setMessageText("");
    setSelectedAlertCode("");
    setMessageType("normal");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages & Alerts</h1>
          <p className="text-muted-foreground">Communicate with drivers and manage alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="status-indicator status-online">
            <div className="w-2 h-2 bg-success rounded-full pulse-dot"></div>
            <span>Real-time Messaging</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Left - Conversations List */}
        <div className="lg:col-span-1">
          <Card className="transport-card h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[500px] overflow-y-auto">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 cursor-pointer border-b border-border transition-colors ${
                      selectedConversation === conv.id
                        ? 'bg-primary/5 border-l-4 border-l-primary'
                        : 'hover:bg-surface'
                    }`}
                    onClick={() => setSelectedConversation(conv.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {conv.participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{conv.participant.name}</div>
                          <div className="text-xs text-muted-foreground">{conv.participant.bus} • {conv.participant.route}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {conv.unread > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs h-5 w-5 p-0 rounded-full">
                            {conv.unread}
                          </Badge>
                        )}
                        <div className={`w-2 h-2 rounded-full ${
                          conv.status === 'online' ? 'bg-success' : 'bg-warning'
                        }`}></div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground truncate mb-1">{conv.lastMessage}</div>
                    <div className="text-xs text-muted-foreground">{conv.timestamp}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center - Message Thread */}
        <div className="lg:col-span-2">
          {selectedConvData ? (
            <Card className="transport-card h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {selectedConvData.participant.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{selectedConvData.participant.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      {selectedConvData.participant.bus} • {selectedConvData.participant.route}
                      <div className={`w-2 h-2 rounded-full ${
                        selectedConvData.status === 'online' ? 'bg-success' : 'bg-warning'
                      }`}></div>
                      <span>{selectedConvData.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Driver Profile</DropdownMenuItem>
                      <DropdownMenuItem>View Bus Location</DropdownMenuItem>
                      <DropdownMenuItem>Conversation History</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.from === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      message.from === 'admin' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-surface border'
                    } rounded-lg p-3 space-y-2`}>
                      {message.type === 'alert' && (
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <AlertTriangle className="h-3 w-3" />
                          ALERT {message.alertCode}
                        </div>
                      )}
                      <div className="text-sm">{message.text}</div>
                      <div className="flex items-center justify-between text-xs opacity-70">
                        <span>{message.timestamp}</span>
                        {message.from === 'admin' && (
                          <div className="flex items-center gap-1">
                            {message.read ? (
                              <CheckCheck className="h-3 w-3" />
                            ) : message.delivered ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex items-center gap-3">
                  <Select value={messageType} onValueChange={(value: "normal" | "alert") => setMessageType(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Message
                        </div>
                      </SelectItem>
                      <SelectItem value="alert">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Alert
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {messageType === "alert" && (
                    <Select value={selectedAlertCode} onValueChange={setSelectedAlertCode}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select alert code" />
                      </SelectTrigger>
                      <SelectContent>
                        {alertCodes.map((alert) => (
                          <SelectItem key={alert.code} value={alert.code}>
                            {alert.code} - {alert.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Textarea
                      placeholder={messageType === "alert" ? "Additional alert details (optional)..." : "Type your message..."}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="min-h-[60px] max-h-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim() && messageType === "normal"}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="transport-card h-full">
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Select a Conversation</h3>
                  <p className="text-muted-foreground text-sm">
                    Choose a conversation from the list to start messaging.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}