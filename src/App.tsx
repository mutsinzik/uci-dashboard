import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Info, 
  Calendar, 
  Clock, 
  SquarePen, 
  Users, 
  CheckCircle, 
  BellRing, 
  Sparkles, 
  Globe, 
  Ticket, 
  BarChart, 
  Megaphone, 
  Lightbulb, 
  Link, 
  Monitor, 
  Activity, 
  Newspaper,
  Settings,
  LucideIcon
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';

// Types
interface DashboardConfig {
  eventStartDate: string;
  overview: {
    eventDates: string;
  };
  mediaAccreditation: {
    totalApplications: number;
    approved: number;
    pending: number;
    targetAccreditations: number;
    influencersEngaged: number;
    influencerReach: string;
  };
  ticketPurchases: {
    ticketsSold: number;
    ticketTarget: number;
    originRwanda: number;
    originEurope: number;
    originNorthAmerica: number;
  };
  communicationProgram: {
    contentMilestones: Array<{
      id: number;
      title: string;
      completed: boolean;
    }>;
    socialMediaMetrics: Array<{
      platform: string;
      followers?: string;
      engagement?: string;
      views?: string;
      subscribers?: string;
    }>;
    digitalAdPerformance: Array<{
      channel: string;
      impressions: string;
      clicks: string;
      conversions: string;
    }>;
    activations: Array<{
      name: string;
      status: 'Completed' | 'In Progress' | 'Pending';
      date: string;
    }>;
    mediaCoverage: Array<{
      title: string;
      source: string;
      url: string;
    }>;
  };
}

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  className?: string;
  iconColor?: string;
}

interface ProgressBarProps {
  current: number;
  target: number;
  label: string;
}

interface SectionBoxProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

interface SubSectionCardProps {
  children: ReactNode;
  className?: string;
}

interface StatusIconProps {
  status: 'Completed' | 'In Progress' | 'Pending';
}

// Default dashboard configuration
const defaultConfig = {
  eventStartDate: '2025-09-21T00:00:00',
  
  overview: {
    eventDates: 'Sep 21 - Sep 28, 2025'
  },

  mediaAccreditation: {
    totalApplications: 0,
    approved: 0,
    pending: 0,
    targetAccreditations: 300,
    influencersEngaged: 0,
    influencerReach: "0"
  },

  ticketPurchases: {
    ticketsSold: 0,
    ticketTarget: 15000,
    originRwanda: 45,
    originEurope: 30,
    originNorthAmerica: 15
  },

  communicationProgram: {
    contentMilestones: [
      { id: 1, title: '"3 months to go" video campaign launched', completed: false },
      { id: 2, title: '"Kigali is ready" series launched', completed: false },
      { id: 3, title: '"Our African Heroes" series launched', completed: false },
      { id: 4, title: '"More than just a race" series launched', completed: false },
      { id: 5, title: 'Final athlete profiles completed', completed: false },
      { id: 6, title: 'Event map & spectator guides published', completed: false },
      { id: 7, title: '"Legacy" content series production started', completed: false }
    ],
    socialMediaMetrics: [
      { platform: 'Instagram', followers: '150K', engagement: '4.2%' },
      { platform: 'Facebook', followers: '200K', engagement: '3.8%' },
      { platform: 'X (Twitter)', followers: '80K', engagement: '5.1%' },
      { platform: 'LinkedIn', followers: '25K', engagement: '6.5%' },
      { platform: 'TikTok', views: '5M+', engagement: '7.0%' },
      { platform: 'YouTube', subscribers: '30K', views: '2.5M+' }
    ],
    digitalAdPerformance: [
      { channel: 'Google Ads', impressions: '1.5M', clicks: '50K', conversions: '1.2%' },
      { channel: 'LinkedIn Ads', impressions: '800K', clicks: '15K', conversions: '0.8%' },
      { channel: 'Meta Ads (FB/IG)', impressions: '2.2M', clicks: '75K', conversions: '1.5%' }
    ],
    activations: [
      { name: 'Giants of Africa Activation', status: 'In Progress', date: 'July 26 - Aug 2' },
      { name: 'Kwita Izina Activation', status: 'Pending', date: 'September 5, 2025' },
      { name: 'Rwanda Convention (Dallas) Activation', status: 'Pending', date: 'July 4-6, 2025' },
      { name: 'Tour de France Activation', status: 'Pending', date: 'July 5-27, 2025' }
    ],
    mediaCoverage: [
      { title: "World cycling championships in Rwanda to go ahead as planned", source: "TRT Global", url: "https://www.trt.global/afrika-english/article/27aa5a83e5a5" },
      { title: "Africa 2025 project: final stretch before 2025 UCI Road World Championships", source: "UCI", url: "https://www.uci.org/article/africa-2025-project-final-stretch-before-2025-uci-road-world-championships/5i27kGqOdckv0fta3jH3kS" },
      { title: "Live Blog: Road To The Cycling World Championships #Africa2025", source: "Team Africa Rising", url: "https://teamafricarising.org/roadtotheworlds/" },
      { title: "2025 uci road world championships i kigali, rwanda i general information bulletin", source: "UCI Downloads", url: "https://downloads.ctfassets.net/761l7gh5x5an/5VZb3UdrW3N14HRxdmq1TL/2118e76dda8087f5ad0e6c99cdb57669/2025_UCI_ROAD_WCh_INFO-BULLETIN_EN_MD.pdf" },
      { title: "Road Worlds in Rwanda is turning into a nightmare for the UCI", source: "Escape Collective", url: "https://escapecollective.com/road-worlds-in-rwanda-is-turning-into-a-nightmare-for-the-uci/" },
      { title: "Cycling Teams Question World Championships 2025 Safety In Africa", source: "FloBikes", url: "https://www.flobikes.com/articles/13701427-cycling-teams-question-world-championships-2025-safety-in-africa" },
      { title: "No plans to move UCI Road World Championships away from Rwanda", source: "BBC Sport", url: "https://www.bbc.com/sport/cycling/articles/cx25d105lvro" },
      { title: "World Cycling Body Stands by Rwanda's 2025 Road Championships", source: "Rwanda Dispatch News Agency", url: "https://rwandadispatch.com/world-cycling-body-stands-by-rwandas-2025-road-world-championships/" },
      { title: "Rain Or Sunshine, Tour du Rwanda 2025 Set The Stage For UCI Road World Championships", source: "KT PRESS", url: "https://www.ktpress.rw/2025/03/rain-or-sunshine-tour-du-rwanda-2025-set-the-stage-for-uci-road-world-championships/" },
      { title: "Rwanda to Host 2025 UCI Road World Championships", source: "365 Rwanda", url: "https://365rwanda.com/rwanda-to-host-2025-uci-road-world-championships/" }
    ]
  }
};

// Reusable Components
const DashboardCard = ({ icon: Icon, title, value, className = "", iconColor = "text-white" }: DashboardCardProps) => (
  <div className={`bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center text-center ${className}`}>
    <div className={`bg-indigo-600 p-3 rounded-full mb-3 ${iconColor}`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-semibold text-gray-100 mb-1">{title}</h3>
    <p className="text-3xl font-bold text-indigo-400">{value}</p>
  </div>
);

const ProgressBar = ({ current, target, label }: ProgressBarProps) => {
  const progress = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  const getColorClass = () => {
    if (progress < 50) return 'bg-red-500';
    if (progress < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-300 font-medium">{label}</span>
        <span className="text-sm text-gray-400">
          {current.toLocaleString()} / {target.toLocaleString()} ({progress.toFixed(1)}%)
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${getColorClass()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const SectionBox = ({ children, className = "", id }: SectionBoxProps) => (
  <section id={id} className={`bg-gray-800 p-8 rounded-xl shadow-2xl mb-10 border border-gray-700 ${className}`}>
    {children}
  </section>
);

const SubSectionCard = ({ children, className = "" }: SubSectionCardProps) => (
  <div className={`bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-700 ${className}`}>
    {children}
  </div>
);

function App() {
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>(() => {
    const saved = localStorage.getItem('dashboardConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
  });
  
  const [daysUntilEvent, setDaysUntilEvent] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const [popup, setPopup] = useState<string | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const eventStart = new Date(dashboardConfig.eventStartDate);
      const diffTime = eventStart.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilEvent(diffDays > 0 ? diffDays : 0);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60);
    
    setLastUpdated(new Date().toLocaleString());

    return () => clearInterval(interval);
  }, [dashboardConfig.eventStartDate]);

  const handleSaveConfig = (newConfig: DashboardConfig) => {
    setDashboardConfig(newConfig);
    localStorage.setItem('dashboardConfig', JSON.stringify(newConfig));
    setLastUpdated(new Date().toLocaleString());
    setPopup('Changes saved');
    setTimeout(() => setPopup(null), 2000);
  };

  // For routing navigation in AdminPanel
  const AdminPanelRoute = () => {
    const navigate = useNavigate();
    const handleSave = (newConfig: DashboardConfig) => {
      setDashboardConfig(newConfig);
      localStorage.setItem('dashboardConfig', JSON.stringify(newConfig));
      setLastUpdated(new Date().toLocaleString());
      setPopup('Changes saved');
      setTimeout(() => setPopup(null), 2000);
      navigate('/');
    };
    const handleCancel = () => {
      navigate('/');
    };
    return (
      <AdminPanel
        config={dashboardConfig}
        onSave={handleSave}
        onClose={handleCancel}
      />
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-gray-100 p-6 sm:p-10 md:p-12 lg:p-16">
        {popup && <Popup message={popup} onClose={() => setPopup(null)} />}
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                dashboardConfig={dashboardConfig}
                daysUntilEvent={daysUntilEvent}
                lastUpdated={lastUpdated}
              />
            }
          />
          <Route path="/admin" element={<AdminPanelRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

const Popup: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="fixed top-8 right-8 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
    {message}
    <button className="ml-4 text-white font-bold" onClick={onClose}>&times;</button>
  </div>
);

function Dashboard({
  dashboardConfig,
  daysUntilEvent,
  lastUpdated
}: {
  dashboardConfig: DashboardConfig;
  daysUntilEvent: number;
  lastUpdated: string;
}) {
  const StatusIcon = ({ status }: StatusIconProps) => {
    if (status === 'Completed') {
      return <CheckCircle size={20} className="text-green-500 mr-2" />;
    } else if (status === 'In Progress') {
      return <Clock size={20} className="text-yellow-500 mr-2" />;
    } else {
      return <BellRing size={20} className="text-blue-500 mr-2" />;
    }
  };

  const getStatusBadgeClass = (status: 'Completed' | 'In Progress' | 'Pending') => {
    if (status === 'Completed') return 'bg-green-700 text-green-100';
    if (status === 'In Progress') return 'bg-yellow-700 text-yellow-100';
    return 'bg-blue-700 text-blue-100';
  };

  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 leading-tight mb-2">
          UCI Road World Championships Kigali 2025
        </h1>
      </header>
      <main className="max-w-7xl mx-auto">
        {/* Overview Section */}
        <SectionBox id="overview">
          <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center">
            <Info size={32} className="mr-3 text-blue-400" />
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard 
              icon={Calendar}
              title="Event Dates"
              value={dashboardConfig.overview.eventDates}
            />
            <DashboardCard 
              icon={Clock}
              title="Days Until Event"
              value={daysUntilEvent}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              iconColor="text-white"
            />
          </div>
        </SectionBox>

        {/* Media Accreditation Section */}
        <SectionBox id="media-accreditation">
          <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center">
            <SquarePen size={32} className="mr-3 text-indigo-400" />
            Media Accreditation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <DashboardCard 
              icon={Users}
              title="Total Applications"
              value={dashboardConfig.mediaAccreditation.totalApplications.toLocaleString()}
            />
            <DashboardCard 
              icon={CheckCircle}
              title="Approved"
              value={dashboardConfig.mediaAccreditation.approved.toLocaleString()}
            />
            <DashboardCard 
              icon={BellRing}
              title="Pending Review"
              value={dashboardConfig.mediaAccreditation.pending.toLocaleString()}
            />
          </div>
          
          <ProgressBar 
            current={dashboardConfig.mediaAccreditation.approved}
            target={dashboardConfig.mediaAccreditation.targetAccreditations}
            label="Accreditation Progress"
          />

          <SubSectionCard>
            <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <Sparkles size={20} className="mr-2 text-yellow-400" />
              Influencer Engagement
            </h3>
            <div className="flex flex-wrap justify-between items-center text-lg text-gray-300">
              <p className="flex items-center mb-2 md:mb-0">
                <Users size={18} className="mr-2 text-indigo-300" />
                Influencers Engaged: 
                <span className="font-bold text-indigo-400 ml-2">
                  {dashboardConfig.mediaAccreditation.influencersEngaged.toLocaleString()}
                </span>
              </p>
              <p className="flex items-center">
                <Globe size={18} className="mr-2 text-indigo-300" />
                Estimated Reach: 
                <span className="font-bold text-indigo-400 ml-2">
                  {dashboardConfig.mediaAccreditation.influencerReach}
                </span>
              </p>
            </div>
          </SubSectionCard>
        </SectionBox>

        {/* Ticket Purchases Section */}
        <SectionBox id="ticket-purchases">
          <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center">
            <Ticket size={32} className="mr-3 text-indigo-400" />
            Ticket Purchases
          </h2>
          <div className="grid grid-cols-1 gap-6 mb-8">
            <DashboardCard 
              icon={Ticket}
              title="Total Tickets Sold"
              value={dashboardConfig.ticketPurchases.ticketsSold.toLocaleString()}
            />
          </div>
          
          <ProgressBar 
            current={dashboardConfig.ticketPurchases.ticketsSold}
            target={dashboardConfig.ticketPurchases.ticketTarget}
            label="Tickets Sold Progress"
          />

          <SubSectionCard>
            <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <BarChart size={20} className="mr-2 text-emerald-400" />
              Sales Insights
            </h3>
            <p className="text-gray-300 mb-2">Geographic Origin of Purchasers (Top 3):</p>
            <ul className="list-disc list-inside text-gray-400 ml-4">
              <li>Rwanda: <span>{dashboardConfig.ticketPurchases.originRwanda}%</span></li>
              <li>Europe: <span>{dashboardConfig.ticketPurchases.originEurope}%</span></li>
              <li>North America: <span>{dashboardConfig.ticketPurchases.originNorthAmerica}%</span></li>
            </ul>
          </SubSectionCard>
        </SectionBox>

        {/* Communication Program Deliverables Section */}
        <SectionBox id="deliverables">
          <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center">
            <Megaphone size={32} className="mr-3 text-indigo-400" />
            Communication Program Deliverables
          </h2>

          <SubSectionCard className="mb-8">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <Lightbulb size={20} className="mr-2 text-cyan-400" />
              Content Production Milestones
            </h3>
            <ul className="space-y-3">
              {dashboardConfig.communicationProgram.contentMilestones.map((milestone: { id: number; title: string; completed: boolean }) => (
                <li key={milestone.id} className="flex items-center text-gray-300">
                  {milestone.completed ? (
                    <CheckCircle size={20} className="mr-2 text-green-500" />
                  ) : (
                    <Clock size={20} className="mr-2 text-yellow-500" />
                  )}
                  {milestone.title}
                </li>
              ))}
            </ul>
          </SubSectionCard>

          <SubSectionCard className="mb-8">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <Link size={20} className="mr-2 text-pink-400" />
              Social Media Performance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dashboardConfig.communicationProgram.socialMediaMetrics.map((metric: { platform: string; followers?: string; engagement?: string; views?: string; subscribers?: string }, index: number) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <p className="text-lg font-bold text-indigo-300 mb-1">{metric.platform}</p>
                  {metric.followers && <p className="text-sm text-gray-200">Followers: <span className="font-medium">{metric.followers}</span></p>}
                  {metric.engagement && <p className="text-sm text-gray-200">Engagement: <span className="font-medium">{metric.engagement}</span></p>}
                  {metric.views && <p className="text-sm text-gray-200">Views: <span className="font-medium">{metric.views}</span></p>}
                  {metric.subscribers && <p className="text-sm text-gray-200">Subscribers: <span className="font-medium">{metric.subscribers}</span></p>}
                </div>
              ))}
            </div>
          </SubSectionCard>

          <SubSectionCard className="mb-8">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <Monitor size={20} className="mr-2 text-orange-400" />
              Digital Advertising Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardConfig.communicationProgram.digitalAdPerformance.map((ad: { channel: string; impressions: string; clicks: string; conversions: string }, index: number) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-lg font-bold text-indigo-300 mb-1">{ad.channel}</p>
                  <p className="text-sm text-gray-200">Impressions: <span className="font-medium">{ad.impressions}</span></p>
                  <p className="text-sm text-gray-200">Clicks: <span className="font-medium">{ad.clicks}</span></p>
                  <p className="text-sm text-gray-200">Conversions: <span className="font-medium">{ad.conversions}</span></p>
                </div>
              ))}
            </div>
          </SubSectionCard>

          <SubSectionCard className="mb-8">
            <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <Activity size={20} className="mr-2 text-purple-400" />
              Local & Out-of-Home Activations
            </h3>
            <ul className="space-y-3">
              {dashboardConfig.communicationProgram.activations.map((activation: { name: string; status: 'Completed' | 'In Progress' | 'Pending'; date: string }, index: number) => (
                <li key={index} className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center">
                    <StatusIcon status={activation.status} />
                    {activation.name} 
                    <span className="ml-2 text-sm text-gray-400">({activation.date})</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(activation.status)}`}>
                    {activation.status}
                  </span>
                </li>
              ))}
            </ul>
          </SubSectionCard>

          <SubSectionCard>
            <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
              <Newspaper size={20} className="mr-2 text-green-400" />
              Recent Media Coverage
            </h3>
            <ul className="list-disc list-inside text-gray-400 ml-4">
              {dashboardConfig.communicationProgram.mediaCoverage.map((article: { title: string; source: string; url: string }, index: number) => (
                <li key={index}>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {article.title}
                  </a> - {article.source}
                </li>
              ))}
            </ul>
          </SubSectionCard>
        </SectionBox>
      </main>
      <footer className="text-center mt-16 text-gray-500 text-sm">
        <p>&copy; 2025 UCI Road World Championships Kigali. All rights reserved.</p>
        <p>Dashboard last updated: {lastUpdated}</p>
      </footer>
    </>
  );
}

export default App;