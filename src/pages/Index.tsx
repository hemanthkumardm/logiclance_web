import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Zap, Users, Shield, Settings, ArrowRight, Cpu, LogIn, UserPlus } from "lucide-react";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

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

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

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
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/auth')}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-5 w-5" />
              Create Account
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

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join LogicLance today and streamline your ASIC design workflow
          </p>
          <Button size="lg" onClick={() => navigate('/auth')}>
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
