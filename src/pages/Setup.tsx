import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, Users, Settings, CheckCircle } from "lucide-react";

const Setup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: "",
    adminName: "",
    adminEmail: "",
    mode: "single", // single or team
    technologyNode: "",
    rtlPaths: "",
    testbenchPaths: "",
    pdkFiles: "",
    selectedTools: [] as string[],
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const edaTools = [
    { id: "cadence", name: "Cadence" },
    { id: "synopsys", name: "Synopsys" },
    { id: "opensource", name: "Open Source Tools" },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete setup
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleToolToggle = (toolId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTools: prev.selectedTools.includes(toolId)
        ? prev.selectedTools.filter(id => id !== toolId)
        : [...prev.selectedTools, toolId]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Project Information</h2>
              <p className="text-muted-foreground">Set up your ASIC design project basics</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                  placeholder="Enter your project name"
                />
              </div>
              
              <div>
                <Label htmlFor="adminName">Admin Name</Label>
                <Input
                  id="adminName"
                  value={formData.adminName}
                  onChange={(e) => setFormData(prev => ({ ...prev, adminName: e.target.value }))}
                  placeholder="Enter admin name"
                />
              </div>
              
              <div>
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, adminEmail: e.target.value }))}
                  placeholder="Enter admin email"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Setup Mode</h2>
              <p className="text-muted-foreground">Choose between single-user or team setup</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-colors ${formData.mode === 'single' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, mode: 'single' }))}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Single User
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Perfect for individual designers. Quick setup with minimal configuration.
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-colors ${formData.mode === 'team' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, mode: 'team' }))}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    For engineering teams. Includes role-based access and team management.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {formData.mode === 'team' && (
              <div className="mt-6">
                <Label>Team Members CSV</Label>
                <div className="mt-2 p-4 border-2 border-dashed rounded-lg text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Upload a CSV file with team members and roles
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Choose File
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Technology Configuration</h2>
              <p className="text-muted-foreground">Define your design parameters and file paths</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="technologyNode">Technology Node</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, technologyNode: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technology node" />
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
                <Label htmlFor="rtlPaths">RTL File Paths</Label>
                <Textarea
                  id="rtlPaths"
                  value={formData.rtlPaths}
                  onChange={(e) => setFormData(prev => ({ ...prev, rtlPaths: e.target.value }))}
                  placeholder="Enter RTL file paths (one per line)"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="testbenchPaths">Testbench Paths</Label>
                <Textarea
                  id="testbenchPaths"
                  value={formData.testbenchPaths}
                  onChange={(e) => setFormData(prev => ({ ...prev, testbenchPaths: e.target.value }))}
                  placeholder="Enter testbench paths (one per line)"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="pdkFiles">PDK Files</Label>
                <Textarea
                  id="pdkFiles"
                  value={formData.pdkFiles}
                  onChange={(e) => setFormData(prev => ({ ...prev, pdkFiles: e.target.value }))}
                  placeholder="Enter PDK file paths (one per line)"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">EDA Tool Selection</h2>
              <p className="text-muted-foreground">Choose your electronic design automation tools</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Select EDA Tool Suites</Label>
                <div className="mt-2 space-y-3">
                  {edaTools.map((tool) => (
                    <div key={tool.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={tool.id}
                        checked={formData.selectedTools.includes(tool.id)}
                        onCheckedChange={() => handleToolToggle(tool.id)}
                      />
                      <Label htmlFor={tool.id}>{tool.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {formData.selectedTools.length > 0 && (
                <div className="mt-6">
                  <Label>Environment Sourcing Scripts</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload environment setup scripts for each selected tool
                  </p>
                  
                  {formData.selectedTools.map((toolId) => {
                    const tool = edaTools.find(t => t.id === toolId);
                    return (
                      <div key={toolId} className="mb-4">
                        <Label>{tool?.name} Environment Script</Label>
                        <div className="mt-2 p-4 border-2 border-dashed rounded-lg">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-center text-muted-foreground">
                            Upload {tool?.name} setup script
                          </p>
                          <Button variant="outline" size="sm" className="mt-2 w-full">
                            Choose File
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Setup Complete!</h2>
              <p className="text-muted-foreground">Your LogicLance project is ready to go</p>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Name:</span>
                    <span>{formData.projectName || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mode:</span>
                    <Badge variant="secondary">{formData.mode === 'single' ? 'Single User' : 'Team'}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Technology Node:</span>
                    <span>{formData.technologyNode || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected Tools:</span>
                    <div className="flex gap-1">
                      {formData.selectedTools.map(toolId => {
                        const tool = edaTools.find(t => t.id === toolId);
                        return (
                          <Badge key={toolId} variant="outline" className="text-xs">
                            {tool?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Next Steps:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Credentials will be sent to team members via email</li>
                  <li>• Access your project dashboard to manage workflows</li>
                  <li>• Configure additional settings as needed</li>
                  <li>• Start your ASIC design project!</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Setup Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8">
              {renderStep()}
              
              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button onClick={handleNext}>
                  {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
                  {currentStep !== totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Setup;