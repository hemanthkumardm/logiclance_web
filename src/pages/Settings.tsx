import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Settings as SettingsIcon, 
  Cpu, 
  FolderOpen, 
  Wrench, 
  Shield, 
  Bell,
  Save,
  RefreshCw,
  AlertTriangle
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  
  const [projectSettings, setProjectSettings] = useState({
    name: "Advanced Processor Core",
    description: "High-performance 64-bit processor with advanced caching",
    technologyNode: "7nm",
    targetFrequency: "3.2 GHz",
    powerBudget: "150W",
    rtlPaths: "/project/rtl/src\n/project/rtl/includes",
    testbenchPaths: "/project/tb/unit\n/project/tb/integration",
    pdkFiles: "/pdk/7nm/libs\n/pdk/7nm/techfiles"
  });

  const [toolSettings, setToolSettings] = useState({
    cadenceGenus: true,
    cadenceInnovus: true,
    synopsysPrimeTime: true,
    cadencePegasus: false,
    openSourceTools: true
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    flowCompletion: true,
    errorNotifications: true,
    dailyReports: false,
    weeklyDigest: true
  });

  const edaTools = [
    { id: "cadenceGenus", name: "Cadence Genus", status: "configured", version: "21.1" },
    { id: "cadenceInnovus", name: "Cadence Innovus", status: "configured", version: "21.1" },
    { id: "synopsysPrimeTime", name: "Synopsys PrimeTime", status: "configured", version: "2022.03" },
    { id: "cadencePegasus", name: "Cadence Pegasus", status: "not_configured", version: "-" },
    { id: "openSourceTools", name: "Open Source Tools", status: "configured", version: "latest" }
  ];

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving settings...", { projectSettings, toolSettings, notifications });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <SettingsIcon className="h-8 w-8 text-primary" />
                Project Settings
              </h1>
              <p className="text-muted-foreground">Configure your ASIC design project</p>
            </div>
          </div>
          
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="project" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="tools">EDA Tools</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Project Settings */}
          <TabsContent value="project" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Project Configuration
                </CardTitle>
                <CardDescription>Basic project information and design parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        value={projectSettings.name}
                        onChange={(e) => setProjectSettings(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="technologyNode">Technology Node</Label>
                      <Select 
                        value={projectSettings.technologyNode}
                        onValueChange={(value) => setProjectSettings(prev => ({ ...prev, technologyNode: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="28nm">28nm</SelectItem>
                          <SelectItem value="16nm">16nm</SelectItem>
                          <SelectItem value="7nm">7nm</SelectItem>
                          <SelectItem value="5nm">5nm</SelectItem>
                          <SelectItem value="3nm">3nm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="targetFrequency">Target Frequency</Label>
                      <Input
                        id="targetFrequency"
                        value={projectSettings.targetFrequency}
                        onChange={(e) => setProjectSettings(prev => ({ ...prev, targetFrequency: e.target.value }))}
                        placeholder="e.g., 3.2 GHz"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="powerBudget">Power Budget</Label>
                      <Input
                        id="powerBudget"
                        value={projectSettings.powerBudget}
                        onChange={(e) => setProjectSettings(prev => ({ ...prev, powerBudget: e.target.value }))}
                        placeholder="e.g., 150W"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      value={projectSettings.description}
                      onChange={(e) => setProjectSettings(prev => ({ ...prev, description: e.target.value }))}
                      rows={6}
                      placeholder="Describe your project..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  File Paths
                </CardTitle>
                <CardDescription>Configure design file locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="rtlPaths">RTL Source Paths</Label>
                  <Textarea
                    id="rtlPaths"
                    value={projectSettings.rtlPaths}
                    onChange={(e) => setProjectSettings(prev => ({ ...prev, rtlPaths: e.target.value }))}
                    rows={3}
                    placeholder="Enter RTL paths (one per line)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="testbenchPaths">Testbench Paths</Label>
                  <Textarea
                    id="testbenchPaths"
                    value={projectSettings.testbenchPaths}
                    onChange={(e) => setProjectSettings(prev => ({ ...prev, testbenchPaths: e.target.value }))}
                    rows={3}
                    placeholder="Enter testbench paths (one per line)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pdkFiles">PDK Files</Label>
                  <Textarea
                    id="pdkFiles"
                    value={projectSettings.pdkFiles}
                    onChange={(e) => setProjectSettings(prev => ({ ...prev, pdkFiles: e.target.value }))}
                    rows={3}
                    placeholder="Enter PDK file paths (one per line)"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* EDA Tools */}
          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  EDA Tool Configuration
                </CardTitle>
                <CardDescription>Manage your electronic design automation tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {edaTools.map((tool) => (
                    <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={toolSettings[tool.id as keyof typeof toolSettings]}
                          onCheckedChange={(checked) => 
                            setToolSettings(prev => ({ ...prev, [tool.id]: checked }))
                          }
                        />
                        <div>
                          <h3 className="font-medium">{tool.name}</h3>
                          <p className="text-sm text-muted-foreground">Version: {tool.version}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={tool.status === 'configured' ? 'default' : 'secondary'}
                        >
                          {tool.status === 'configured' ? 'Configured' : 'Not Configured'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Environment Setup Required</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Make sure to upload environment sourcing scripts for each enabled tool. 
                        These scripts will be used to set up the proper environment for each EDA tool.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Access Control
                </CardTitle>
                <CardDescription>Manage project security settings and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all team members
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">
                        Track all user actions and system events
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP Access Restrictions</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit access to specific IP addresses
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>File Encryption</Label>
                      <p className="text-sm text-muted-foreground">
                        Encrypt sensitive design files at rest
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t">
                  <h4 className="font-medium">Session Management</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                      <Select defaultValue="8">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="maxSessions">Max Concurrent Sessions</Label>
                      <Select defaultValue="3">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 session</SelectItem>
                          <SelectItem value="3">3 sessions</SelectItem>
                          <SelectItem value="5">5 sessions</SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure how you receive project updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailAlerts: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Flow Completion</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when EDA flows complete
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.flowCompletion}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, flowCompletion: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Error Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Alert on flow failures and errors
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.errorNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, errorNotifications: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Daily project progress summaries
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.dailyReports}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, dailyReports: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Weekly project summary and metrics
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, weeklyDigest: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;