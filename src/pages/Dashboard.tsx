import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Settings, 
  Users, 
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Cpu,
  FolderOpen,
  GitBranch
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const projectStats = {
    name: "Advanced Processor Core",
    status: "In Progress",
    completion: 65,
    technologyNode: "7nm",
    totalModules: 42,
    completedModules: 27,
    activeFlows: 8,
    teamMembers: 12
  };

  const recentActivity = [
    { id: 1, action: "Synthesis completed", module: "ALU_core", time: "2 hours ago", status: "success" },
    { id: 2, action: "Place & Route started", module: "Cache_controller", time: "4 hours ago", status: "running" },
    { id: 3, action: "DRC check failed", module: "Memory_interface", time: "6 hours ago", status: "error" },
    { id: 4, action: "Timing analysis passed", module: "Instruction_decoder", time: "1 day ago", status: "success" },
  ];

  const edaFlows = [
    { name: "RTL Synthesis", tool: "Cadence Genus", status: "running", progress: 80 },
    { name: "Place & Route", tool: "Cadence Innovus", status: "queued", progress: 0 },
    { name: "Static Timing Analysis", tool: "Synopsys PrimeTime", status: "completed", progress: 100 },
    { name: "Physical Verification", tool: "Cadence Pegasus", status: "pending", progress: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'running': return 'text-blue-500';
      case 'error': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running': return <Play className="h-4 w-4 text-blue-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Cpu className="h-8 w-8 text-primary" />
                {projectStats.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant={projectStats.status === 'In Progress' ? 'default' : 'secondary'}>
                  {projectStats.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Technology: {projectStats.technologyNode}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/team')}>
              <Users className="h-4 w-4 mr-2" />
              Team
            </Button>
            <Button variant="outline" onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{projectStats.completion}%</div>
              <Progress value={projectStats.completion} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {projectStats.completedModules}/{projectStats.totalModules}
              </div>
              <p className="text-sm text-muted-foreground">Completed modules</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Flows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{projectStats.activeFlows}</div>
              <p className="text-sm text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Team Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{projectStats.teamMembers}</div>
              <p className="text-sm text-muted-foreground">Active members</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* EDA Flows */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                EDA Flows
              </CardTitle>
              <CardDescription>Current design flow status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {edaFlows.map((flow, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{flow.name}</span>
                        <Badge 
                          variant={flow.status === 'completed' ? 'default' : 
                                 flow.status === 'running' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {flow.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{flow.tool}</p>
                      <Progress value={flow.progress} className="h-1" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button size="sm" className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Run Flow
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest project updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.module}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Play className="h-6 w-6 mb-2" />
                  Start New Flow
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  Configure Tools
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FolderOpen className="h-6 w-6 mb-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;