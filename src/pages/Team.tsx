import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Mail, 
  Shield, 
  User, 
  Settings,
  Clock,
  CheckCircle
} from "lucide-react";

const Team = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@company.com",
      role: "admin",
      department: "Design Engineering",
      status: "active",
      lastActive: "2 hours ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "michael.r@company.com",
      role: "frontend",
      department: "RTL Design",
      status: "active",
      lastActive: "1 hour ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      name: "Emily Johnson",
      email: "emily.j@company.com",
      role: "backend",
      department: "Physical Design",
      status: "active",
      lastActive: "30 minutes ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@company.com",
      role: "project_manager",
      department: "Project Management",
      status: "away",
      lastActive: "1 day ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 5,
      name: "Anna Petrov",
      email: "anna.p@company.com",
      role: "team_leader",
      department: "Verification",
      status: "active",
      lastActive: "15 minutes ago",
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.w@company.com",
      role: "frontend",
      department: "RTL Design",
      status: "inactive",
      lastActive: "1 week ago",
      avatar: "/api/placeholder/32/32"
    }
  ];

  const roleColors = {
    admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    backend: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    project_manager: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    team_leader: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
  };

  const roleNames = {
    admin: "Admin",
    frontend: "Frontend Engineer",
    backend: "Backend Engineer", 
    project_manager: "Project Manager",
    team_leader: "Team Leader"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'away':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      case 'inactive':
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleStats = {
    admin: teamMembers.filter(m => m.role === 'admin').length,
    frontend: teamMembers.filter(m => m.role === 'frontend').length,
    backend: teamMembers.filter(m => m.role === 'backend').length,
    project_manager: teamMembers.filter(m => m.role === 'project_manager').length,
    team_leader: teamMembers.filter(m => m.role === 'team_leader').length,
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
                <User className="h-8 w-8 text-primary" />
                Team Management
              </h1>
              <p className="text-muted-foreground">Manage project team members and roles</p>
            </div>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          {Object.entries(roleStats).map(([role, count]) => (
            <Card key={role}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {roleNames[role as keyof typeof roleNames]}
                    </p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {filteredMembers.length} of {teamMembers.length} members shown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{member.name}</span>
                        {getStatusIcon(member.status)}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </p>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge 
                        variant="secondary" 
                        className={roleColors[member.role as keyof typeof roleColors]}
                      >
                        {roleNames[member.role as keyof typeof roleNames]}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {member.lastActive}
                      </p>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Permissions Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Default access levels for each role in the ASIC design flow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Badge className={roleColors.admin}>Admin</Badge>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Full system access</li>
                  <li>• User management</li>
                  <li>• Tool configuration</li>
                  <li>• Audit logs</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <Badge className={roleColors.frontend}>Frontend Engineer</Badge>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• RTL design files</li>
                  <li>• Synthesis flows</li>
                  <li>• Simulation access</li>
                  <li>• Design reports</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <Badge className={roleColors.backend}>Backend Engineer</Badge>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Physical design flows</li>
                  <li>• Place & route tools</li>
                  <li>• Timing analysis</li>
                  <li>• Layout verification</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <Badge className={roleColors.project_manager}>Project Manager</Badge>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Project dashboards</li>
                  <li>• Progress reports</li>
                  <li>• Resource allocation</li>
                  <li>• Timeline management</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <Badge className={roleColors.team_leader}>Team Leader</Badge>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Team coordination</li>
                  <li>• Flow management</li>
                  <li>• Quality oversight</li>
                  <li>• Technical reviews</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Team;