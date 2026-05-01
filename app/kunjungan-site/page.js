"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Phone, 
  User, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X, 
  AlertTriangle, 
  Send, 
  Calendar, 
  Users2 
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function KunjunganSitePage() {
  const [activeTab, setActiveTab] = useState('Belum Berkunjung'); // Default filter Belum Berkunjung
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // Data for new visit
  const [newVisit, setNewVisit] = useState({
    name: '',
    wa: '',
    sales: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Target for status change
  const [statusChangeTarget, setStatusChangeTarget] = useState(null);

  const [visits, setVisits] = useState([
    { id: 1, name: 'Budi Santoso', wa: '081234567890', sales: 'Ahmad Faisal', date: '2026-05-10', status: 'Belum Berkunjung' },
    { id: 2, name: 'Siti Aminah', wa: '081298765432', sales: 'Linda Wati', date: '2026-05-12', status: 'Sudah Berkunjung' },
    { id: 3, name: 'Andi Wijaya', wa: '085678901234', sales: 'Ahmad Faisal', date: '2026-05-15', status: 'Belum Berkunjung' },
    { id: 4, name: 'Dewi Lestari', wa: '087765432109', sales: 'Eko Prasetyo', date: '2026-05-08', status: 'Sudah Berkunjung' },
    { id: 5, name: 'Hendra Kurniawan', wa: '081345678901', sales: 'Linda Wati', date: '2026-05-20', status: 'Belum Berkunjung' },
    { id: 6, name: 'Rina Saputri', wa: '081122334455', sales: 'Ahmad Faisal', date: '2026-05-11', status: 'Belum Berkunjung' },
    { id: 7, name: 'Joko Widodo', wa: '082233445566', sales: 'Eko Prasetyo', date: '2026-05-09', status: 'Sudah Berkunjung' },
    { id: 8, name: 'Maya Indah', wa: '083344556677', sales: 'Linda Wati', date: '2026-05-18', status: 'Belum Berkunjung' },
    { id: 9, name: 'Rizky Pratama', wa: '084455667788', sales: 'Ahmad Faisal', date: '2026-05-14', status: 'Belum Berkunjung' },
    { id: 10, name: 'Siska Putri', wa: '085566778899', sales: 'Eko Prasetyo', date: '2026-05-07', status: 'Sudah Berkunjung' },
  ]);

  const handleOpenConfirmModal = (visit) => {
    setStatusChangeTarget(visit);
    setIsConfirmModalOpen(true);
  };

  const confirmStatusChange = () => {
    if (statusChangeTarget) {
      setVisits(prev => prev.map(visit => {
        if (visit.id === statusChangeTarget.id) {
          return {
            ...visit,
            status: visit.status === 'Sudah Berkunjung' ? 'Belum Berkunjung' : 'Sudah Berkunjung'
          };
        }
        return visit;
      }));
    }
    setIsConfirmModalOpen(false);
    setStatusChangeTarget(null);
  };

  const updateDate = (id, newDate) => {
    setVisits(prev => prev.map(visit => {
      if (visit.id === id) {
        return { ...visit, date: newDate };
      }
      return visit;
    }));
  };

  const handleAddVisit = (e) => {
    e.preventDefault();
    const id = visits.length + 1;
    setVisits([...visits, { ...newVisit, id, status: 'Belum Berkunjung' }]);
    setIsAddModalOpen(false);
    setNewVisit({ name: '', wa: '', sales: '', date: new Date().toISOString().split('T')[0] });
  };

  const filteredVisits = visits.filter(visit => {
    const matchesStatus = activeTab === 'Semua' || visit.status === activeTab;
    const matchesSearch = visit.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         visit.sales.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && visit.date >= startDate;
    }
    if (endDate) {
      matchesDate = matchesDate && visit.date <= endDate;
    }

    return matchesStatus && matchesSearch && matchesDate;
  });

  const countSudah = visits.filter(v => v.status === 'Sudah Berkunjung').length;
  const countBelum = visits.filter(v => v.status === 'Belum Berkunjung').length;
  const totalLeads = visits.length;

  return (
    <div className="flex min-h-screen bg-slate-50 flex-col md:flex-row">
      <Sidebar activeMenu="Kunjungan Site" />
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        <Header title="Monitoring Kunjungan Site">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            <Plus size={20} />
            Tambah Kunjungan
          </button>
        </Header>


        {/* Stats Grid - 3 Cards (Visit Rate removed) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Total Leads */}
          <div className="card-stat bg-white flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">Total Leads</div>
                <div className="text-3xl font-bold text-slate-900">{totalLeads}</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl">
                <Users2 size={20} />
              </div>
            </div>
          </div>
          
          {/* Card 2: Belum Berkunjung */}
          <div className="card-stat bg-white flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">Belum Berkunjung</div>
                <div className="text-3xl font-bold text-slate-900">{countBelum}</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-500 rounded-xl">
                <Clock size={20} />
              </div>
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-2">
              <span className="text-orange-600 font-bold mr-1">{totalLeads > 0 ? Math.round((countBelum/totalLeads)*100) : 0}%</span> dari total leads
            </div>
          </div>

          {/* Card 3: Sudah Berkunjung */}
          <div className="card-stat bg-white flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm font-medium text-slate-500 mb-1">Sudah Berkunjung</div>
                <div className="text-3xl font-bold text-slate-900">{countSudah}</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-600 rounded-xl">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">{totalLeads > 0 ? Math.round((countSudah/totalLeads)*100) : 0}%</span>
              <span className="text-[11px] font-medium text-slate-400">leads datang</span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <h2 className="text-lg font-bold text-slate-800">Daftar Kunjungan Site</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                {/* Moved Tabs Filter here */}
                <div className="flex bg-slate-200/50 p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar">
                  {['Semua', 'Sudah Berkunjung', 'Belum Berkunjung'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Cari leads atau sales..." 
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-slate-700">Filter Jadwal Kunjungan:</span>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="date" 
                  className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="text-slate-400 text-sm font-medium">s/d</span>
                <input 
                  type="date" 
                  className="px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-y border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16 text-center">No</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Nama Leads / Kontak</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jadwal Berkunjung</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredVisits.map((visit, idx) => (
                  <tr key={visit.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5 text-sm text-slate-500 text-center font-medium">{idx + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <User size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800">{visit.name}</span>
                          <a 
                            href={`https://wa.me/${visit.wa.replace(/\D/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 hover:underline decoration-emerald-300 decoration-2 underline-offset-2"
                          >
                            <Phone size={10} strokeWidth={3} />
                            {visit.wa}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-slate-600">{visit.sales}</span>
                    </td>
                    <td className="px-6 py-5">
                      <input 
                        type="date" 
                        value={visit.date}
                        onChange={(e) => updateDate(visit.id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500 transition-colors cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => handleOpenConfirmModal(visit)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 mx-auto ${
                          visit.status === 'Sudah Berkunjung'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100'
                        }`}
                      >
                        {visit.status === 'Sudah Berkunjung' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {visit.status}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredVisits.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm italic">
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row justify-between items-center bg-slate-50 gap-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 tracking-wide">
              Menampilkan {filteredVisits.length} dari {visits.length} Data Kunjungan
            </div>
            <div className="flex gap-1.5">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-200">1</button>
              <div className="px-2 flex items-center text-slate-400">...</div>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:shadow-sm transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Tambah Kunjungan */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-slideUp">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Tambah Kunjungan</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddVisit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nama Leads</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Masukkan nama leads..." 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                    value={newVisit.name}
                    onChange={(e) => setNewVisit({...newVisit, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nomor WhatsApp</label>
                  <input 
                    required
                    type="text" 
                    placeholder="0812xxxxxxxx" 
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                    value={newVisit.wa}
                    onChange={(e) => setNewVisit({...newVisit, wa: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Sales</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Nama sales" 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                      value={newVisit.sales}
                      onChange={(e) => setNewVisit({...newVisit, sales: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Jadwal</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                      value={newVisit.date}
                      onChange={(e) => setNewVisit({...newVisit, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-4 text-sm font-bold text-slate-500 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 text-sm font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Simpan Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Status */}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden animate-slideUp p-8 text-center">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Konfirmasi Status</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Ubah status <span className="font-bold text-slate-800">{statusChangeTarget?.name}</span>?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={confirmStatusChange}
                  className="flex-1 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Ya, Ubah
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
