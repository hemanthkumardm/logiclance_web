import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Zap, Users, Shield, Settings, ArrowRight, Cpu, Terminal, MonitorSpeaker } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Fast Setup",
      description: "Get your ASIC design project running in minutes with automated configuration"
    },
    {
      icon: Users,
      title: "Team Ready",
      description: "Role-based access for frontend, backend, admin, and project management roles"
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Built-in permissions and audit trails for enterprise-grade security"
    },
    {
      icon: Settings,
      title: "EDA Integration",
      description: "Seamless integration with Cadence, Synopsys, and open-source tools"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Cpu className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold">LogicLance</h1>
          </div>
          <Badge variant="secondary" className="mb-4">MVP Platform</Badge>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Streamlined platform for fast and frictionless ASIC design project setup. 
            Built for individuals and engineering teams who need to get EDA projects running quickly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/setup')}
              className="flex items-center gap-2"
            >
              <MonitorSpeaker className="h-5 w-5" />
              Start GUI Setup
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/setup?mode=cli')}
              className="flex items-center gap-2"
            >
              <Terminal className="h-5 w-5" />
              CLI Setup Guide
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Project Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate('/team')}>
              Team Management
            </Button>
            <Button variant="outline" onClick={() => navigate('/settings')}>
              Project Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
