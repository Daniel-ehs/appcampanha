import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Users, 
  Mail, 
  Calendar, 
  BarChart2, 
  LogOut, 
  Plus, 
  Upload, 
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Download,
  User,
  Search,
  RefreshCw,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Contact {
  id: string;
  name: string;
  email: string;
  lastSent?: string;
}

interface Campaign {
  id: string;
  title: string;
  content: string;
  schedule: string;
  recurrence?: number; // days
  status: 'pending' | 'sent' | 'failed';
  attachment?: string;
}

interface Log {
  id: string;
  campaignId: string;
  email: string;
  status: 'success' | 'error';
  timestamp: string;
}

// --- Components ---

const Login = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      onLogin(data.user);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700"></div>
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-violet-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6 sm:p-10 glass rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-white/40 z-10 mx-4"
      >
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-600 to-indigo-500 rounded-3xl flex items-center justify-center text-white font-black text-4xl mx-auto mb-6 shadow-2xl shadow-brand-600/40">C</div>
          <h1 className="text-4xl font-black font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-500 to-violet-600">Campaigner</h1>
          <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest text-xs">Acesse sua conta</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Usuário</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}
          <button 
            type="submit"
            className="w-full py-3.5 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-[0.98]"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
      active 
        ? 'bg-gradient-to-r from-brand-600 to-indigo-500 text-white shadow-xl shadow-brand-600/30' 
        : 'text-slate-500 hover:bg-brand-50 hover:text-brand-600'
    }`}
  >
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    {!collapsed && <span className={`font-semibold text-sm ${active ? 'opacity-100' : 'opacity-80'}`}>{label}</span>}
  </button>
);

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 sm:p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2.5 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-slate-600">
            <X size={22} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 1024) {
      setSidebarCollapsed(true);
    }
  };
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDirectEmailModalOpen, setIsDirectEmailModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactMode, setContactMode] = useState<'single' | 'bulk'>('single');
  const [searchTerm, setSearchTerm] = useState('');
  const [directEmail, setDirectEmail] = useState({ title: '', content: '' });
  const [isRecurrent, setIsRecurrent] = useState(false);
  
  // Data State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  // Form States
  const [newContact, setNewContact] = useState({ name: '', email: '' });
  const [bulkText, setBulkText] = useState('');
  const [newCampaign, setNewCampaign] = useState({ title: '', content: '', schedule: '', recurrence: 0, attachment: '' });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const [cRes, campRes, logRes] = await Promise.all([
      fetch('/api/contacts'),
      fetch('/api/campaigns'),
      fetch('/api/logs')
    ]);
    setContacts(await cRes.json());
    setCampaigns(await campRes.json());
    setLogs(await logRes.json());
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    });
    setNewContact({ name: '', email: '' });
    fetchData();
  };

  const handleBulkImport = async () => {
    const lines = bulkText.split('\n').filter(l => l.trim());
    const newContacts = lines.map(line => {
      const [name, email] = line.split(',').map(s => s.trim());
      return { name: name || 'Sem Nome', email: email || line.trim() };
    });
    await fetch('/api/contacts/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContacts)
    });
    setBulkText('');
    setIsContactModalOpen(false);
    fetchData();
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    const campaignData = {
      ...newCampaign,
      recurrence: isRecurrent ? newCampaign.recurrence : 0
    };
    await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaignData)
    });
    setNewCampaign({ title: '', content: '', schedule: '', recurrence: 0, attachment: '' });
    setIsRecurrent(false);
    fetchData();
  };

  const handleSendDirectEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    
    const newLog = {
      campaignId: 'direct',
      email: selectedContact.email,
      status: 'success',
      timestamp: new Date().toISOString()
    };

    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog)
    });
    
    setIsDirectEmailModalOpen(false);
    setDirectEmail({ title: '', content: '' });
    setSelectedContact(null);
    fetchData();
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadTemplate = () => {
    const content = "Nome, Email\nJoão Silva, joao@exemplo.com\nMaria Santos, maria@exemplo.com";
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modelo_contatos.csv';
    a.click();
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-20 glass border-b border-slate-200/60 z-30 flex items-center justify-between px-4 sm:px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-500"
          >
            <Menu size={24} />
          </button>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-600 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-xl shadow-brand-600/30">C</div>
          <span className="text-xl sm:text-2xl font-black font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-500 to-violet-600 truncate">Campaigner</span>
        </div>
        <button 
          onClick={() => setUser(null)}
          className="p-2 sm:px-4 sm:py-2 hover:bg-red-50 text-red-500 rounded-xl transition-all duration-300 flex items-center gap-2 font-semibold group"
          title="Sair"
        >
          <span className="text-sm hidden sm:inline group-hover:mr-1 transition-all">Sair</span>
          <LogOut size={20} className="group-hover:translate-x-0.5 transition-all" />
        </button>
      </header>

      <div className="flex flex-1 pt-20">
        {/* Sidebar Overlay for Mobile */}
        {!sidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ 
            width: sidebarCollapsed ? (window.innerWidth < 1024 ? 0 : 90) : 280,
            x: sidebarCollapsed && window.innerWidth < 1024 ? -280 : 0
          }}
          className={`bg-white border-r border-slate-100 flex flex-col fixed left-0 top-20 bottom-0 z-50 shadow-xl shadow-slate-200/20 lg:z-20 ${sidebarCollapsed && window.innerWidth < 1024 ? 'invisible' : 'visible'}`}
        >
          <div className="p-6 hidden lg:flex justify-end">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-brand-600 transition-all"
            >
              {sidebarCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            </button>
          </div>
          
          <div className="p-6 lg:hidden flex justify-between items-center border-b border-slate-50 mb-4">
            <span className="font-black text-brand-600 text-sm uppercase tracking-widest">Menu</span>
            <button onClick={() => setSidebarCollapsed(true)} className="p-2 text-slate-400">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-3">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => handleTabChange('dashboard')}
              collapsed={sidebarCollapsed}
            />
            <SidebarItem 
              icon={Users} 
              label="Lista de Contatos" 
              active={activeTab === 'contacts'} 
              onClick={() => handleTabChange('contacts')}
              collapsed={sidebarCollapsed}
            />
            <SidebarItem 
              icon={Mail} 
              label="Campanhas" 
              active={activeTab === 'campaigns'} 
              onClick={() => handleTabChange('campaigns')}
              collapsed={sidebarCollapsed}
            />
          </nav>

          {/* User Info at Sidebar Bottom */}
          <div className="p-6 border-t border-slate-50 bg-slate-50/30">
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : 'px-2'}`}>
              <div className="w-10 h-10 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 shadow-inner">
                <User size={20} strokeWidth={2.5} />
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-800 truncate">{user.username}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Administrador</p>
                </div>
              )}
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-10 transition-all duration-500 ${sidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'} ml-0`}>
          <header className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
            <div>
              <p className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-indigo-500 font-black text-xs sm:text-sm uppercase tracking-widest mb-1">Visão Geral</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-slate-800 tracking-tight">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'contacts' && 'Gerenciar Contatos'}
                {activeTab === 'campaigns' && 'Nova Campanha'}
              </h2>
            </div>
            {activeTab === 'contacts' && (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative group w-full sm:w-72">
                  <Search className="absolute left-4 top-3 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                  <input 
                    placeholder="Pesquisar contatos..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-3 rounded-2xl border border-slate-200 bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none text-sm shadow-sm transition-all"
                  />
                </div>
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-brand-600 to-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:shadow-xl hover:shadow-brand-600/30 transition-all active:scale-95 whitespace-nowrap"
                >
                  <Plus size={18} strokeWidth={3} /> Adicionar Contato
                </button>
              </div>
            )}
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {[
                    { label: 'Total Contatos', value: contacts.length, icon: Users, color: 'indigo' },
                    { label: 'Campanhas', value: campaigns.length, icon: Mail, color: 'violet' },
                    { label: 'Enviadas', value: campaigns.filter(c => c.status === 'sent').length, icon: CheckCircle, color: 'emerald' },
                    { label: 'Pendentes', value: campaigns.filter(c => c.status === 'pending').length, icon: Clock, color: 'orange' }
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm card-hover flex items-center gap-6 relative overflow-hidden group"
                    >
                      {/* Subtle accent background */}
                      <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${stat.color}-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className={`p-5 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon size={32} strokeWidth={2.5} />
                      </div>
                      
                      <div className="flex flex-col">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className={`text-4xl font-black font-display text-slate-800 tracking-tight`}>{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden card-hover">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-slate-50/50 to-white">
                      <h3 className="text-xl font-black font-display text-slate-800">Últimos Envios</h3>
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm">
                        <BarChart2 size={20} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {logs.slice(0, 5).map(log => (
                        <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${log.status === 'success' ? 'from-emerald-500 to-teal-400 shadow-emerald-500/20' : 'from-rose-500 to-pink-400 shadow-rose-500/20'} text-white shadow-lg`}>
                              {log.status === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-700">{log.email}</p>
                              <p className="text-xs text-slate-400 font-medium">{new Date(log.timestamp).toLocaleString()}</p>
                            </div>
                          </div>
                          <span className="text-[10px] uppercase font-black tracking-widest text-slate-300 bg-slate-100 px-3 py-1.5 rounded-lg group-hover:text-slate-500 transition-colors">
                            {log.campaignId === 'direct' ? 'Direto' : 'Campanha'}
                          </span>
                        </div>
                      ))}
                      {logs.length === 0 && <div className="p-12 text-center text-slate-400 font-medium italic">Nenhum envio registrado</div>}
                    </div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden card-hover">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-slate-50/50 to-white">
                      <h3 className="text-xl font-black font-display text-slate-800">Campanhas Registradas</h3>
                      <div className="p-3 bg-violet-50 text-violet-600 rounded-xl shadow-sm">
                        <Mail size={20} strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {campaigns.slice(0, 5).map(camp => (
                        <div key={camp.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${camp.status === 'sent' ? 'from-indigo-500 to-blue-400 shadow-indigo-500/20' : 'from-amber-500 to-orange-400 shadow-amber-500/20'} text-white shadow-lg`}>
                              {camp.status === 'sent' ? <CheckCircle size={18} /> : <Clock size={18} />}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-700">{camp.title}</p>
                              <p className="text-xs text-slate-400 font-medium italic">Programado: {new Date(camp.schedule).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                            camp.status === 'sent' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {camp.status === 'sent' ? 'Enviada' : 'Pendente'}
                          </span>
                        </div>
                      ))}
                      {campaigns.length === 0 && <div className="p-12 text-center text-slate-400 font-medium italic">Nenhuma campanha registrada</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contacts' && (
              <motion.div 
                key="contacts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden card-hover"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Nome</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Email</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Último Envio</th>
                        <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                      </tr>
                    </thead>
                        <tbody className="divide-y divide-slate-50">
                          {filteredContacts.map(contact => (
                            <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="p-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white flex items-center justify-center font-black shadow-lg shadow-brand-500/20">
                                    {contact.name.charAt(0)}
                                  </div>
                                  <span className="font-bold text-slate-700">{contact.name}</span>
                                </div>
                              </td>
                              <td className="p-6 text-slate-500 font-medium">{contact.email}</td>
                              <td className="p-6">
                                {contact.lastSent ? (
                                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100/50">
                                    {new Date(contact.lastSent).toLocaleDateString()}
                                  </span>
                                ) : (
                                  <span className="text-xs font-bold text-slate-300 italic">Nunca enviado</span>
                                )}
                              </td>
                              <td className="p-4 sm:p-6 text-right">
                                <button 
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setIsDirectEmailModalOpen(true);
                                  }}
                                  className="p-3 text-brand-600 hover:bg-brand-500 hover:text-white rounded-xl transition-all lg:opacity-0 lg:group-hover:opacity-100 shadow-sm hover:shadow-lg hover:shadow-brand-500/20"
                                  title="Enviar Email Direto"
                                >
                                  <Send size={18} strokeWidth={2.5} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      {filteredContacts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-20 text-center text-slate-400 font-medium italic">Nenhum contato encontrado</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

          {activeTab === 'campaigns' && (
            <motion.div 
              key="campaigns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="mb-8 sm:mb-10 flex justify-center">
                  <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-col sm:flex-row gap-1 w-full sm:w-auto">
                    <button 
                      type="button"
                      onClick={() => setIsRecurrent(false)}
                      className={`px-6 sm:px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${!isRecurrent ? 'bg-white text-brand-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Clock size={16} /> Envio Único
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsRecurrent(true)}
                      className={`px-6 sm:px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${isRecurrent ? 'bg-white text-brand-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <RefreshCw size={16} /> Recorrente
                    </button>
                  </div>
                </div>

                <form onSubmit={handleCreateCampaign} className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="md:col-span-2">
                      <label className="block text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Título da Campanha</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-4 text-slate-400" size={20} />
                        <input 
                          placeholder="Ex: Promoção de Verão"
                          value={newCampaign.title}
                          onChange={e => setNewCampaign({...newCampaign, title: e.target.value})}
                          className="w-full pl-14 pr-6 py-3.5 sm:py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-700"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">
                        {isRecurrent ? 'Início da Recorrência' : 'Data e Hora de Envio'}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-5 top-4 text-slate-400" size={20} />
                        <input 
                          type="datetime-local"
                          value={newCampaign.schedule}
                          onChange={e => setNewCampaign({...newCampaign, schedule: e.target.value})}
                          className="w-full pl-14 pr-6 py-3.5 sm:py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-700"
                          required
                        />
                      </div>
                    </div>

                    {isRecurrent && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Frequência (Dias)</label>
                        <div className="relative">
                          <RefreshCw className="absolute left-5 top-4 text-slate-400" size={20} />
                          <input 
                            type="number"
                            min="1"
                            placeholder="Ex: 10"
                            value={newCampaign.recurrence || ''}
                            onChange={e => setNewCampaign({...newCampaign, recurrence: parseInt(e.target.value) || 0})}
                            className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-700"
                            required={isRecurrent}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Conteúdo do E-mail</label>
                    <textarea 
                      rows={8}
                      placeholder="Escreva o conteúdo da sua campanha aqui..."
                      value={newCampaign.content}
                      onChange={e => setNewCampaign({...newCampaign, content: e.target.value})}
                      className="w-full px-6 py-4 rounded-3xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all h-48 font-medium text-slate-700 resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Anexo (Opcional)</label>
                    <div className="relative group">
                      <Upload className="absolute left-5 top-4 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                      <input 
                        type="file"
                        onChange={e => setNewCampaign({...newCampaign, attachment: e.target.files?.[0]?.name || ''})}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none file:hidden cursor-pointer transition-all font-bold text-slate-700"
                      />
                      {newCampaign.attachment && <span className="absolute right-6 top-4 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">{newCampaign.attachment}</span>}
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      className="flex items-center gap-3 px-12 py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95"
                    >
                      <Send size={20} strokeWidth={3} /> {isRecurrent ? 'Programar Recorrência' : 'Criar e Programar Campanha'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direct Email Modal */}
        <Modal 
          isOpen={isDirectEmailModalOpen} 
          onClose={() => setIsDirectEmailModalOpen(false)}
          title={`Enviar E-mail para ${selectedContact?.name}`}
        >
          <form onSubmit={handleSendDirectEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Assunto</label>
              <input 
                placeholder="Assunto do e-mail"
                value={directEmail.title}
                onChange={e => setDirectEmail({...directEmail, title: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Mensagem</label>
              <textarea 
                rows={6}
                placeholder="Escreva sua mensagem personalizada..."
                value={directEmail.content}
                onChange={e => setDirectEmail({...directEmail, content: e.target.value})}
                className="w-full px-6 py-4 rounded-3xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-700 resize-none"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-3"
            >
              <Send size={20} strokeWidth={3} /> Enviar Agora
            </button>
          </form>
        </Modal>

        {/* Contact Modal */}
        <Modal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)}
          title="Adicionar Novo Contato"
        >
          <div className="space-y-8">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
              <button 
                onClick={() => setContactMode('single')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${contactMode === 'single' ? 'bg-white text-brand-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Individual
              </button>
              <button 
                onClick={() => setContactMode('bulk')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${contactMode === 'bulk' ? 'bg-white text-brand-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Em Massa
              </button>
            </div>

            {contactMode === 'single' ? (
              <form onSubmit={(e) => { e.preventDefault(); handleAddContact(e); setIsContactModalOpen(false); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Nome Completo</label>
                  <input 
                    placeholder="Ex: João Silva"
                    value={newContact.name}
                    onChange={e => setNewContact({...newContact, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-2.5 ml-1">E-mail</label>
                  <input 
                    placeholder="Ex: joao@email.com"
                    type="email"
                    value={newContact.email}
                    onChange={e => setNewContact({...newContact, email: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold text-slate-700"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95"
                >
                  Salvar Contato
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Lista de Contatos</label>
                  <button 
                    onClick={downloadTemplate}
                    className="text-xs text-brand-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download size={14} /> Baixar Modelo .csv
                  </button>
                </div>
                <textarea 
                  rows={6}
                  placeholder="Ex: João, joao@email.com"
                  value={bulkText}
                  onChange={e => setBulkText(e.target.value)}
                  className="w-full px-6 py-4 rounded-3xl border border-slate-200 bg-slate-50/50 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-700 resize-none"
                />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1">Formato: Nome, Email (um por linha)</p>
                <button 
                  onClick={handleBulkImport}
                  className="w-full py-4 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Upload size={20} strokeWidth={3} /> Importar Lista
                </button>
              </div>
            )}
          </div>
        </Modal>
      </main>
      </div>
    </div>
  );
}
