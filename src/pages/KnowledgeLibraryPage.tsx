// src/pages/KnowledgeLibraryPage.tsx
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  VaultReportRecord,
  ToolRecord,
  LessonLearnedRecord,
  MediaUpdateRecord,
  TemplateGuidelineRecord,
  ResourceCenterRecord,
} from '../types';
import {
  getVisibleKnowledgeRecords,
  canManageMediaContent,
  validateMandatoryFields,
  formatFileSize,
  VAULT_SCHEMA,
  TOOL_SCHEMA,
  LESSON_SCHEMA,
  MEDIA_SCHEMA,
  TEMPLATE_SCHEMA,
  RESOURCE_SCHEMA,
} from '../utils/knowledgeValidation';
import { FileUploadField, UploadedFileMeta } from '../components/common/FileUploadField';
import {
  Search,
  Plus,
  X,
  Download,
  ExternalLink,
  Pin,
  PinOff,
  Calendar,
  User,
  ShieldAlert,
  Tag,
  BookOpen,
  Video,
  Wrench,
  Newspaper,
  Layers,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  Info,
  CheckCircle2,
  FileText,
} from 'lucide-react';

type KMTab = 'vault' | 'tools' | 'lessons' | 'media' | 'templates' | 'resources';

export const KnowledgeLibraryPage: React.FC = () => {
  const {
    currentRole,
    regions,
    zones,
    projects,
    vaultReports,
    addVaultReport,
    toolRecords,
    addToolRecord,
    lessonLearnedRecords,
    addLessonLearnedRecord,
    mediaUpdateRecords,
    addMediaUpdateRecord,
    updateMediaUpdateRecord,
    templateGuidelineRecords,
    addTemplateGuidelineRecord,
    resourceCenterRecords,
    addResourceCenterRecord,
  } = useApp();

  const [activeTab, setActiveTab] = useState<KMTab>('vault');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedMediaDetail, setSelectedMediaDetail] = useState<MediaUpdateRecord | null>(null);

  // Visible records after applying Restricted access check
  const visibleVaultReports = useMemo(
    () => getVisibleKnowledgeRecords(vaultReports, currentRole),
    [vaultReports, currentRole]
  );
  const visibleTools = useMemo(
    () => getVisibleKnowledgeRecords(toolRecords, currentRole),
    [toolRecords, currentRole]
  );
  const visibleLessons = useMemo(
    () => getVisibleKnowledgeRecords(lessonLearnedRecords, currentRole),
    [lessonLearnedRecords, currentRole]
  );
  const visibleMedia = useMemo(
    () => getVisibleKnowledgeRecords(mediaUpdateRecords, currentRole),
    [mediaUpdateRecords, currentRole]
  );
  const visibleTemplates = useMemo(
    () => getVisibleKnowledgeRecords(templateGuidelineRecords, currentRole),
    [templateGuidelineRecords, currentRole]
  );
  const visibleResources = useMemo(
    () => getVisibleKnowledgeRecords(resourceCenterRecords, currentRole),
    [resourceCenterRecords, currentRole]
  );

  const canManageMedia = canManageMediaContent(currentRole);

  const handleDownloadOrPreview = (file: { name: string; dataUrl: string; sizeBytes?: number }) => {
    if (!file || !file.dataUrl) {
      alert(`File preview not available for ${file?.name || 'this item'}`);
      return;
    }
    const win = window.open();
    if (win) {
      win.document.write(
        `<iframe src="${file.dataUrl}" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`
      );
    } else {
      const a = document.createElement('a');
      a.href = file.dataUrl;
      a.download = file.name;
      a.click();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Prototype Limitation Banner */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 px-4 flex items-center justify-between text-xs text-amber-900 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>PMER-MIS Knowledge Hub Prototype:</strong> Files and media are held in session memory for instant preview. Uploaded files do not persist across hard reloads in this demo environment.
          </span>
        </div>
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-300 shrink-0 ml-3">
          Role: {currentRole}
        </span>
      </div>

      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2.5">
            Knowledge Management Hub
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Centralized ERCS repository for institutional reports, mobile M&amp;E tools, field lessons, announcements, and guidelines.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* 6-Branch Tab Bar with Color Accents */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Tab 1: Vault (Teal) */}
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'vault'
                ? 'border-teal-600 text-teal-700 bg-teal-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>Repository / Vault</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'vault' ? 'bg-teal-200/80 text-teal-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {visibleVaultReports.length}
            </span>
          </button>

          {/* Tab 2: Tools (Purple) */}
          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'tools'
                ? 'border-purple-600 text-purple-700 bg-purple-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Wrench className="w-4 h-4 text-purple-600" />
            <span>Tools &amp; KoBo</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'tools' ? 'bg-purple-200/80 text-purple-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {visibleTools.length}
            </span>
          </button>

          {/* Tab 3: Lessons Learned (Amber) */}
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'lessons'
                ? 'border-amber-600 text-amber-700 bg-amber-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Video className="w-4 h-4 text-amber-600" />
            <span>Lessons Learned</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'lessons' ? 'bg-amber-200/80 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {visibleLessons.length}
            </span>
          </button>

          {/* Tab 4: Media & Updates (Coral) */}
          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'media'
                ? 'border-rose-500 text-rose-700 bg-rose-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Newspaper className="w-4 h-4 text-rose-500" />
            <span>Media &amp; Updates</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'media' ? 'bg-rose-200/80 text-rose-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {visibleMedia.length}
            </span>
          </button>

          {/* Tab 5: Templates & Guidelines (Blue) */}
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'templates'
                ? 'border-blue-600 text-blue-700 bg-blue-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>Templates &amp; Guidelines</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'templates' ? 'bg-blue-200/80 text-blue-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {visibleTemplates.length}
            </span>
          </button>

          {/* Tab 6: Resource Center (Green) */}
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'resources'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Resource Center</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'resources' ? 'bg-emerald-200/80 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {visibleResources.length}
            </span>
          </button>
        </div>
      </div>

      {/* Branch Views */}
      <div className="mt-4">
        {activeTab === 'vault' && (
          <VaultBranchView
            records={visibleVaultReports}
            onDownload={handleDownloadOrPreview}
          />
        )}
        {activeTab === 'tools' && (
          <ToolsBranchView
            records={visibleTools}
            onDownload={handleDownloadOrPreview}
          />
        )}
        {activeTab === 'lessons' && (
          <LessonsBranchView
            records={visibleLessons}
            onDownload={handleDownloadOrPreview}
          />
        )}
        {activeTab === 'media' && (
          <MediaBranchView
            records={visibleMedia}
            canManageMedia={canManageMedia}
            onOpenDetail={setSelectedMediaDetail}
            onTogglePin={(id, isPinned) => {
              updateMediaUpdateRecord(id, {
                pin_to_top: !isPinned,
                pin_until: !isPinned ? undefined : undefined,
              });
            }}
          />
        )}
        {activeTab === 'templates' && (
          <TemplatesBranchView
            records={visibleTemplates}
            onDownload={handleDownloadOrPreview}
          />
        )}
        {activeTab === 'resources' && (
          <ResourcesBranchView
            records={visibleResources}
          />
        )}
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <AddRecordModal
          activeTab={activeTab}
          regions={regions}
          zones={zones}
          projects={projects}
          onClose={() => setShowAddModal(false)}
          onAddVault={record => {
            addVaultReport(record);
            setShowAddModal(false);
          }}
          onAddTool={record => {
            addToolRecord(record);
            setShowAddModal(false);
          }}
          onAddLesson={record => {
            addLessonLearnedRecord(record);
            setShowAddModal(false);
          }}
          onAddMedia={record => {
            addMediaUpdateRecord(record);
            setShowAddModal(false);
          }}
          onAddTemplate={record => {
            addTemplateGuidelineRecord(record);
            setShowAddModal(false);
          }}
          onAddResource={record => {
            addResourceCenterRecord(record);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Media Detail Full Article Modal */}
      {selectedMediaDetail && (
        <MediaDetailModal
          item={selectedMediaDetail}
          onClose={() => setSelectedMediaDetail(null)}
        />
      )}
    </div>
  );
};

// =========================================================================
// 1. VAULT BRANCH VIEW (TEAL)
// =========================================================================
interface VaultBranchViewProps {
  records: VaultReportRecord[];
  onDownload: (file: { name: string; dataUrl: string; sizeBytes?: number }) => void;
}

const VaultBranchView: React.FC<VaultBranchViewProps> = ({ records, onDownload }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [formatFilter, setFormatFilter] = useState<string>('ALL');

  const categories = ['Assessments', 'Monitoring reports', 'Evaluation reports', 'PDM reports'];

  const filtered = useMemo(() => {
    return records.filter(r => {
      if (categoryFilter !== 'ALL' && r.report_category !== categoryFilter) return false;
      if (formatFilter !== 'ALL' && r.file_format !== formatFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          r.program_project_name.toLowerCase().includes(q) ||
          r.region_location.toLowerCase().includes(q) ||
          r.keywords.some(k => k.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [records, categoryFilter, formatFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setCategoryFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                categoryFilter === 'ALL'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Reports ({records.length})
            </button>
            {categories.map(cat => {
              const count = records.filter(r => r.report_category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    categoryFilter === cat
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-teal-50/70 text-teal-800 hover:bg-teal-100'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports, authors, regions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Secondary Format Filter */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase">Format:</span>
          <select
            value={formatFilter}
            onChange={e => setFormatFilter(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-700 text-xs focus:ring-1 focus:ring-teal-500"
          >
            <option value="ALL">All Formats (PDF, Word, Excel)</option>
            <option value="PDF">PDF</option>
            <option value="Word">Word</option>
            <option value="Excel">Excel</option>
            <option value="PowerPoint">PowerPoint</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No vault reports found</p>
          <p className="text-xs text-slate-400 mt-0.5">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(report => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                      {report.report_category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                      {report.file_format}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700">
                      {report.region_location}
                    </span>
                  </div>

                  {report.access_level === 'Restricted' && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                      <ShieldAlert className="w-3 h-3" />
                      Restricted
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-800 leading-snug">
                  {report.title}
                </h3>

                <p className="text-[11px] text-teal-800 font-semibold mt-1">
                  Project: {report.program_project_name}
                </p>

                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {report.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3">
                  {report.keywords.slice(0, 4).map((kw, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  <span>{report.author}</span>
                </div>

                <button
                  onClick={() => onDownload(report.file)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  <span>Download ({formatFileSize(report.file.sizeBytes)})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 2. TOOLS BRANCH VIEW (PURPLE)
// =========================================================================
interface ToolsBranchViewProps {
  records: ToolRecord[];
  onDownload: (file: { name: string; dataUrl: string; sizeBytes?: number }) => void;
}

const ToolsBranchView: React.FC<ToolsBranchViewProps> = ({ records, onDownload }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['PDM tool', 'Needs assessment tool', 'Beneficiary registration tool'];

  const filtered = useMemo(() => {
    return records.filter(r => {
      if (categoryFilter !== 'ALL' && r.tool_sub_category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.tool_name.toLowerCase().includes(q) ||
          r.associated_program.toLowerCase().includes(q) ||
          r.target_sector.toLowerCase().includes(q) ||
          r.region_coverage.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [records, categoryFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              categoryFilter === 'ALL'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Tools ({records.length})
          </button>
          {categories.map(cat => {
            const count = records.filter(r => r.tool_sub_category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-purple-50/70 text-purple-800 hover:bg-purple-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tools or sectors..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
          <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No tools found</p>
          <p className="text-xs text-slate-400 mt-0.5">Try a different category or search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(tool => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                    {tool.tool_sub_category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-600 bg-slate-100">
                    XLSForm {tool.xlsform_version}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 leading-snug">
                  {tool.tool_name}
                </h3>

                <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                  <p><strong className="text-slate-800">Program:</strong> {tool.associated_program}</p>
                  <p><strong className="text-slate-800">Mode:</strong> {tool.data_collection_mode}</p>
                  <p><strong className="text-slate-800">Coverage:</strong> {tool.region_coverage}</p>
                </div>

                {tool.access_level === 'Restricted' && (
                  <div className="mt-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Restricted Access
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={tool.kobo_form_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Form</span>
                </a>

                {tool.enumerator_guidance && (
                  <button
                    onClick={() => onDownload(tool.enumerator_guidance!)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Guide</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 3. LESSONS LEARNED BRANCH VIEW (AMBER)
// =========================================================================
interface LessonsBranchViewProps {
  records: LessonLearnedRecord[];
  onDownload: (file: { name: string; dataUrl: string; sizeBytes?: number }) => void;
}

const LessonsBranchView: React.FC<LessonsBranchViewProps> = ({ records, onDownload }) => {
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const subCategories = ['Video link', 'Document', 'Other'];

  const filtered = useMemo(() => {
    return records.filter(r => {
      if (subCategoryFilter !== 'ALL' && r.sub_category !== subCategoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.title.toLowerCase().includes(q) ||
          r.key_takeaway.toLowerCase().includes(q) ||
          r.thematic_area.toLowerCase().includes(q) ||
          r.related_project.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [records, subCategoryFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSubCategoryFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              subCategoryFilter === 'ALL'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Lessons ({records.length})
          </button>
          {subCategories.map(sub => {
            const count = records.filter(r => r.sub_category === sub).length;
            return (
              <button
                key={sub}
                onClick={() => setSubCategoryFilter(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  subCategoryFilter === sub
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50/70 text-amber-800 hover:bg-amber-100'
                }`}
              >
                {sub} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search lessons or takeaways..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
          <Video className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No lessons learned found</p>
          <p className="text-xs text-slate-400 mt-0.5">Try adjusting filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      {item.sub_category}
                    </span>
                    {item.video_duration && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-rose-50 text-rose-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.video_duration}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                      {item.region_location}
                    </span>
                  </div>

                  {item.access_level === 'Restricted' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Restricted
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-800 leading-snug">
                  {item.title}
                </h3>

                <p className="text-[11px] text-amber-800 font-semibold mt-1">
                  Project: {item.related_project} ({item.thematic_area})
                </p>

                <div className="mt-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs">
                  <strong className="text-amber-900 block font-semibold mb-1">Key Institutional Takeaway:</strong>
                  <p className="text-amber-950 leading-relaxed">{item.key_takeaway}</p>
                </div>
              </div>

              {/* Resource action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  By {item.submitted_by} • {item.event_date}
                </span>

                {item.resource.type === 'url' ? (
                  <a
                    href={item.resource.value}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Watch Video</span>
                  </a>
                ) : (
                  <button
                    onClick={() => onDownload(item.resource as any)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Case Study</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 4. MEDIA & UPDATES BRANCH VIEW (CORAL)
// =========================================================================
interface MediaBranchViewProps {
  records: MediaUpdateRecord[];
  canManageMedia: boolean;
  onOpenDetail: (item: MediaUpdateRecord) => void;
  onTogglePin: (id: string, isPinned: boolean) => void;
}

const MediaBranchView: React.FC<MediaBranchViewProps> = ({
  records,
  canManageMedia,
  onOpenDetail,
  onTogglePin,
}) => {
  const [filterPill, setFilterPill] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusView, setStatusView] = useState<'Published' | 'Draft'>('Published');

  const categories = ['PMER update', 'Field story', 'Announcement'];

  // Check pin validity (pin_until expiration check)
  const isItemActivePin = (item: MediaUpdateRecord) => {
    if (!item.pin_to_top) return false;
    if (!item.pin_until) return true;
    const now = new Date();
    const expiry = new Date(item.pin_until);
    return expiry >= now;
  };

  const filtered = useMemo(() => {
    return records
      .filter(item => {
        // Draft filter: only PMER Officer/System Admin can see drafts
        if (!canManageMedia && item.status === 'Draft') return false;
        if (canManageMedia && item.status !== statusView) return false;

        // Category filter pill
        if (filterPill !== 'ALL' && item.category !== filterPill) return false;

        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            item.headline.toLowerCase().includes(q) ||
            item.summary.toLowerCase().includes(q) ||
            item.body.toLowerCase().includes(q);
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Pinned first, then by date descending
        const aPinned = isItemActivePin(a);
        const bPinned = isItemActivePin(b);
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;
        return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
      });
  }, [records, filterPill, searchQuery, statusView, canManageMedia]);

  return (
    <div className="space-y-4">
      {/* PMER-MIS Media Feed Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Live Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterPill('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterPill === 'ALL'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Feeds
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterPill(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterPill === cat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50/70 text-rose-800 hover:bg-rose-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search updates, field stories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* PMER Officer / System Admin: Drafts vs Published Switcher */}
        {canManageMedia && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px] font-semibold uppercase">Feed Status:</span>
              <button
                onClick={() => setStatusView('Published')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  statusView === 'Published'
                    ? 'bg-emerald-100 text-emerald-800 font-semibold'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Published (Live)
              </button>
              <button
                onClick={() => setStatusView('Draft')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  statusView === 'Draft'
                    ? 'bg-amber-100 text-amber-800 font-semibold'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Drafts / Submissions
              </button>
            </div>
            <span className="text-[11px] text-slate-400">
              Content Management (PMER Officer / Admin)
            </span>
          </div>
        )}
      </div>

      {/* Chronological Feed */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
          <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No media updates or stories</p>
          <p className="text-xs text-slate-400 mt-0.5">Check back later or submit a new story.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(item => {
            const isPinned = isItemActivePin(item);
            // Left accent color bar per spec:
            // Announcements -> Coral (#f43f5e)
            // PMER updates -> Teal (#0d9488)
            // Field stories -> Amber (#d97706)
            let borderColor = 'border-l-rose-500';
            let badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
            if (item.category === 'PMER update') {
              borderColor = 'border-l-teal-600';
              badgeBg = 'bg-teal-50 text-teal-700 border-teal-200';
            } else if (item.category === 'Field story') {
              borderColor = 'border-l-amber-500';
              badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
            }

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border border-slate-200/80 border-l-4 ${borderColor} p-5 shadow-xs hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Top Row Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {isPinned && (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <Pin className="w-3 h-3 fill-rose-600 text-rose-600" />
                          Pinned to Top
                          {item.pin_until ? ` (until ${item.pin_until})` : ''}
                        </span>
                      )}

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeBg}`}>
                        {item.category}
                      </span>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.publish_date}
                      </span>

                      {item.author && (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.author}
                        </span>
                      )}

                      {item.status === 'Draft' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Draft
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h3
                      className="text-lg font-bold text-slate-800 leading-snug hover:text-rose-600 transition-colors cursor-pointer"
                      onClick={() => onOpenDetail(item)}
                    >
                      {item.headline}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>

                    {/* Read More Action */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={() => onOpenDetail(item)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
                      >
                        <span>Read full story</span>
                        <span>&rarr;</span>
                      </button>

                      {canManageMedia && (
                        <button
                          onClick={() => onTogglePin(item.id, isPinned)}
                          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          {isPinned ? (
                            <>
                              <PinOff className="w-3 h-3 text-slate-400" />
                              <span>Unpin</span>
                            </>
                          ) : (
                            <>
                              <Pin className="w-3 h-3 text-slate-400" />
                              <span>Pin to top</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Optional Image Thumbnail */}
                  {item.cover_image && (
                    <div className="shrink-0 w-full md:w-44 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={item.cover_image.dataUrl}
                        alt={item.headline}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 5. TEMPLATES & GUIDELINES BRANCH VIEW (BLUE)
// =========================================================================
interface TemplatesBranchViewProps {
  records: TemplateGuidelineRecord[];
  onDownload: (file: { name: string; dataUrl: string; sizeBytes?: number }) => void;
}

const TemplatesBranchView: React.FC<TemplatesBranchViewProps> = ({ records, onDownload }) => {
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const docTypes = ['ToR template', 'Logframe template', 'Report template', 'Checklist'];

  const filtered = useMemo(() => {
    return records.filter(r => {
      if (typeFilter !== 'ALL' && r.template_type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.template_name.toLowerCase().includes(q) ||
          r.applicable_module.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [records, typeFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setTypeFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Templates ({records.length})
          </button>
          {docTypes.map(type => {
            const count = records.filter(r => r.template_type === type).length;
            return (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  typeFilter === type
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-blue-50/70 text-blue-800 hover:bg-blue-100'
                }`}
              >
                {type} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates or modules..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
          <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No templates found</p>
          <p className="text-xs text-slate-400 mt-0.5">Try a different category or search keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {item.template_type}
                  </span>
                  {item.version && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-500 bg-slate-100">
                      {item.version}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-800 leading-snug">
                  {item.template_name}
                </h3>

                <p className="text-[11px] text-blue-800 font-semibold mt-1">
                  Module: {item.applicable_module}
                </p>

                <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600">
                  <strong className="text-slate-800 font-semibold block mb-0.5">When to use:</strong>
                  <p className="line-clamp-3 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Owner: {item.owner}
                </span>

                <button
                  onClick={() => onDownload(item.file)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 6. RESOURCE CENTER BRANCH VIEW (GREEN)
// =========================================================================
interface ResourcesBranchViewProps {
  records: ResourceCenterRecord[];
}

const ResourcesBranchView: React.FC<ResourcesBranchViewProps> = ({ records }) => {
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const resourceTypes = [
    'External link',
    'Glossary term',
    'Donor guideline',
    'FAQ',
  ];

  const filtered = useMemo(() => {
    return records.filter(r => {
      if (typeFilter !== 'ALL' && r.resource_type !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          r.resource_title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.link_or_definition.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [records, typeFilter, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setTypeFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === 'ALL'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Resources ({records.length})
          </button>
          {resourceTypes.map(type => {
            const count = records.filter(r => r.resource_type === type).length;
            return (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  typeFilter === type
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                {type} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources or terms..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No resources found</p>
          <p className="text-xs text-slate-400 mt-0.5">Try selecting another resource category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(item => {
            const isFaqOrGlossary =
              item.resource_type === 'Glossary term' || item.resource_type === 'FAQ';
            const isExpanded = expandedFaqId === item.id;
            const isUrl = item.link_or_definition.startsWith('http://') || item.link_or_definition.startsWith('https://');

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.resource_type}
                    </span>
                    {item.access_level === 'Restricted' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Restricted
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-800 leading-snug">
                    {item.resource_title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Polymorphic definition / FAQ Accordion */}
                  {isFaqOrGlossary && (
                    <div className="mt-3 bg-emerald-50/50 rounded-xl p-3 border border-emerald-100">
                      <div
                        onClick={() => setExpandedFaqId(isExpanded ? null : item.id)}
                        className="flex items-center justify-between cursor-pointer text-xs font-semibold text-emerald-900"
                      >
                        <span>{item.resource_type === 'FAQ' ? 'Answer / Protocol' : 'Official Definition'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
                        )}
                      </div>
                      {(isExpanded || item.resource_type === 'Glossary term') && (
                        <p className="text-xs text-emerald-800 mt-2 leading-relaxed whitespace-pre-wrap">
                          {item.link_or_definition}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Source: {item.source_organization}
                  </span>

                  {isUrl ? (
                    <a
                      href={item.link_or_definition}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Link</span>
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// =========================================================================
// MEDIA DETAIL MODAL (FULL ARTICLE READER)
// =========================================================================
interface MediaDetailModalProps {
  item: MediaUpdateRecord;
  onClose: () => void;
}

const MediaDetailModal: React.FC<MediaDetailModalProps> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              {item.category}
            </span>
            <span className="text-xs text-slate-400">
              {item.publish_date} {item.author ? `• by ${item.author}` : ''}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-800">
          <h2 className="text-xl font-bold leading-tight">{item.headline}</h2>

          {item.cover_image && (
            <div className="w-full max-h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={item.cover_image.dataUrl}
                alt={item.headline}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 text-xs text-rose-950 font-medium leading-relaxed">
            {item.summary}
          </div>

          <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
            {item.body}
          </div>

          {item.related_link && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Related Link: {item.related_link}
              </span>
              <a
                href={item.related_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Link</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// ADD RECORD MODAL (DYNAMIC FOR ALL 6 BRANCHES)
// =========================================================================
interface AddRecordModalProps {
  activeTab: KMTab;
  regions: Array<{ id: string; name: string }>;
  zones: Array<{ id: string; region_id: string; name: string }>;
  projects: Array<{ id: string; name: string }>;
  onClose: () => void;
  onAddVault: (record: Omit<VaultReportRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;
  onAddTool: (record: Omit<ToolRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;
  onAddLesson: (record: Omit<LessonLearnedRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;
  onAddMedia: (record: Omit<MediaUpdateRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;
  onAddTemplate: (record: Omit<TemplateGuidelineRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;
  onAddResource: (record: Omit<ResourceCenterRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;
}

const AddRecordModal: React.FC<AddRecordModalProps> = ({
  activeTab,
  regions,
  zones,
  projects,
  onClose,
  onAddVault,
  onAddTool,
  onAddLesson,
  onAddMedia,
  onAddTemplate,
  onAddResource,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<KMTab>(activeTab);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // 1. Vault form state
  const [vCategory, setVCategory] = useState<string>('Assessments');
  const [vCategoryOther, setVCategoryOther] = useState<string>('');
  const [vTitle, setVTitle] = useState<string>('');
  const [vFormat, setVFormat] = useState<string>('PDF');
  const [vFormatOther, setVFormatOther] = useState<string>('');
  const [vFile, setVFile] = useState<UploadedFileMeta | null>(null);
  const [vDescription, setVDescription] = useState<string>('');
  const [vProgramName, setVProgramName] = useState<string>('');
  const [vSectorCluster, setVSectorCluster] = useState<string>('Health & WASH');
  const [vRegionId, setVRegionId] = useState<string>('');
  const [vZoneId, setVZoneId] = useState<string>('');
  const [vReportingPeriod, setVReportingPeriod] = useState<string>('2025-2026 Annual');
  const [vAuthor, setVAuthor] = useState<string>('');
  const [vLanguage, setVLanguage] = useState<string>('English');
  const [vKeywords, setVKeywords] = useState<string>('Assessment, Baseline, Community');
  const [vAccessLevel, setVAccessLevel] = useState<'Public' | 'Internal' | 'Restricted'>('Public');

  // 2. Tools form state
  const [tName, setTName] = useState<string>('');
  const [tCategory, setTCategory] = useState<string>('PDM tool');
  const [tCategoryOther, setTCategoryOther] = useState<string>('');
  const [tKoBoLink, setTKoBoLink] = useState<string>('');
  const [tVersion, setTVersion] = useState<string>('v1.0');
  const [tProgram, setTProgram] = useState<string>('');
  const [tSector, setTSector] = useState<string>('Relief & DRM');
  const [tDeployMode, setTDeployMode] = useState<string>('Mobile (KoboCollect)');
  const [tHasGuide, setTHasGuide] = useState<boolean>(false);
  const [tGuideFile, setTGuideFile] = useState<UploadedFileMeta | null>(null);
  const [tRegionCoverage, setTRegionCoverage] = useState<string>('National Level (All Regions)');
  const [tOwner, setTOwner] = useState<string>('');
  const [tKeywords, setTKeywords] = useState<string>('KoBo, Survey, Field Data');
  const [tAccessLevel, setTAccessLevel] = useState<'Public' | 'Internal' | 'Restricted'>('Public');

  // 3. Lessons Learned form state
  const [lTitle, setLTitle] = useState<string>('');
  const [lSubCategory, setLSubCategory] = useState<string>('Video link');
  const [lSubCategoryOther, setLSubCategoryOther] = useState<string>('');
  const [lThematicArea, setLThematicArea] = useState<string>('Disaster Risk Reduction');
  const [lKeyTakeaway, setLKeyTakeaway] = useState<string>('');
  const [lRelatedProject, setLRelatedProject] = useState<string>('');
  const [lRegionLocation, setLRegionLocation] = useState<string>('Oromia');
  const [lEventDate, setLEventDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [lSubmittedBy, setLSubmittedBy] = useState<string>('');
  const [lVideoUrl, setLVideoUrl] = useState<string>('');
  const [lVideoDuration, setLVideoDuration] = useState<string>('');
  const [lFile, setLFile] = useState<UploadedFileMeta | null>(null);
  const [lKeywords, setLKeywords] = useState<string>('Field Lesson, Community Response');
  const [lAccessLevel, setLAccessLevel] = useState<'Public (all staff)' | 'Internal' | 'Restricted'>('Public (all staff)');

  // 4. Media & Updates form state
  const [mHeadline, setMHeadline] = useState<string>('');
  const [mCategory, setMCategory] = useState<string>('PMER update');
  const [mCategoryOther, setMCategoryOther] = useState<string>('');
  const [mPublishDate, setMPublishDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [mAuthor, setMAuthor] = useState<string>('');
  const [mSummary, setMSummary] = useState<string>('');
  const [mBody, setMBody] = useState<string>('');
  const [mCoverImage, setMCoverImage] = useState<UploadedFileMeta | null>(null);
  const [mRelatedLink, setMRelatedLink] = useState<string>('');
  const [mStatus, setMStatus] = useState<'Published' | 'Draft'>('Published');
  const [mPinToTop, setMPinToTop] = useState<boolean>(false);
  const [mPinUntil, setMPinUntil] = useState<string>('');
  const [mAccessLevel, setMAccessLevel] = useState<'Public' | 'Internal' | 'Restricted'>('Public');

  // 5. Templates form state
  const [tmpTitle, setTmpTitle] = useState<string>('');
  const [tmpType, setTmpType] = useState<string>('ToR template');
  const [tmpTypeOther, setTmpTypeOther] = useState<string>('');
  const [tmpFile, setTmpFile] = useState<UploadedFileMeta | null>(null);
  const [tmpDescription, setTmpDescription] = useState<string>('');
  const [tmpModule, setTmpModule] = useState<'Planning' | 'Reporting' | 'M&E' | 'Knowledge management'>('Planning');
  const [tmpOwner, setTmpOwner] = useState<string>('PMER Unit');
  const [tmpVersion, setTmpVersion] = useState<string>('v1.0');
  const [tmpAccessLevel, setTmpAccessLevel] = useState<'Public' | 'Internal' | 'Restricted'>('Public');

  // 6. Resource Center form state
  const [rTitle, setRTitle] = useState<string>('');
  const [rType, setRType] = useState<string>('External link');
  const [rTypeOther, setRTypeOther] = useState<string>('');
  const [rLinkOrDefinition, setRLinkOrDefinition] = useState<string>('');
  const [rSourceOrg, setRSourceOrg] = useState<string>('IFRC / Red Cross Movement');
  const [rSector, setRSector] = useState<string>('General PMER & Quality Assurance');
  const [rDescription, setRDescription] = useState<string>('');
  const [rKeywords, setRKeywords] = useState<string>('Standard, M&E, Guideline');
  const [rAccessLevel, setRAccessLevel] = useState<'Public' | 'Internal' | 'Restricted'>('Public');

  // Filtered zones based on selected region
  const filteredZones = useMemo(() => {
    if (!vRegionId) return [];
    return zones.filter(z => z.region_id === vRegionId);
  }, [zones, vRegionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages([]);

    if (selectedBranch === 'vault') {
      const finalCategory = vCategory === 'Other' ? vCategoryOther.trim() : vCategory;
      const finalFormat = vFormat === 'Other' ? vFormatOther.trim() : vFormat;
      const selectedRegion = regions.find(r => r.id === vRegionId);
      const selectedZone = zones.find(z => z.id === vZoneId);
      const regionLocationStr = selectedRegion
        ? selectedZone
          ? `${selectedRegion.name} / ${selectedZone.name}`
          : selectedRegion.name
        : 'National Level';

      const record: any = {
        title: vTitle.trim(),
        report_category: finalCategory,
        file_format: finalFormat,
        file: vFile ? { name: vFile.name, dataUrl: vFile.dataUrl, sizeBytes: vFile.sizeBytes } : null,
        description: vDescription.trim(),
        program_project_name: vProgramName.trim(),
        sector_cluster: vSectorCluster.split(',').map(s => s.trim()).filter(Boolean),
        region_location: regionLocationStr,
        reporting_period: vReportingPeriod.trim(),
        author: vAuthor.trim(),
        language: vLanguage,
        keywords: vKeywords.split(',').map(s => s.trim()).filter(Boolean),
        access_level: vAccessLevel,
      };

      const val = validateMandatoryFields(record, VAULT_SCHEMA);
      if (!val.isValid) {
        setErrorMessages(Object.values(val.errors));
        return;
      }
      onAddVault(record);
    } else if (selectedBranch === 'tools') {
      const finalCategory = tCategory === 'Other' ? tCategoryOther.trim() : tCategory;
      const record: any = {
        tool_name: tName.trim(),
        tool_sub_category: finalCategory,
        kobo_form_link: tKoBoLink.trim(),
        xlsform_version: tVersion.trim(),
        associated_program: tProgram.trim(),
        target_sector: tSector.trim(),
        data_collection_mode: tDeployMode,
        has_enumerator_guidance: tHasGuide,
        enumerator_guidance: tGuideFile ? { name: tGuideFile.name, dataUrl: tGuideFile.dataUrl, sizeBytes: tGuideFile.sizeBytes } : undefined,
        languages: ['English', 'Amharic'],
        region_coverage: tRegionCoverage.trim(),
        status: 'Active',
        owner: tOwner.trim(),
        keywords: tKeywords.split(',').map(s => s.trim()).filter(Boolean),
        access_level: tAccessLevel,
      };

      const val = validateMandatoryFields(record, TOOL_SCHEMA);
      if (!val.isValid) {
        setErrorMessages(Object.values(val.errors));
        return;
      }
      onAddTool(record);
    } else if (selectedBranch === 'lessons') {
      const finalSub = lSubCategory === 'Other' ? lSubCategoryOther.trim() : lSubCategory;
      const resource: any =
        finalSub === 'Video link'
          ? { type: 'url', value: lVideoUrl.trim() }
          : lFile
          ? { type: 'file', name: lFile.name, dataUrl: lFile.dataUrl, sizeBytes: lFile.sizeBytes }
          : null;

      const record: any = {
        title: lTitle.trim(),
        sub_category: finalSub,
        resource,
        thematic_area: lThematicArea.trim(),
        key_takeaway: lKeyTakeaway.trim(),
        related_project: lRelatedProject.trim(),
        region_location: lRegionLocation.trim(),
        event_date: lEventDate,
        submitted_by: lSubmittedBy.trim(),
        video_duration: finalSub === 'Video link' ? lVideoDuration.trim() : undefined,
        language: 'English',
        keywords: lKeywords.split(',').map(s => s.trim()).filter(Boolean),
        access_level: lAccessLevel,
      };

      const val = validateMandatoryFields(record, LESSON_SCHEMA);
      if (!val.isValid) {
        setErrorMessages(Object.values(val.errors));
        return;
      }
      onAddLesson(record);
    } else if (selectedBranch === 'media') {
      const finalCategory = mCategory === 'Other' ? mCategoryOther.trim() : mCategory;
      const record: any = {
        headline: mHeadline.trim(),
        category: finalCategory,
        publish_date: mPublishDate,
        author: mAuthor.trim(),
        summary: mSummary.trim(),
        body: mBody.trim(),
        cover_image: mCoverImage ? { name: mCoverImage.name, dataUrl: mCoverImage.dataUrl } : undefined,
        related_link: mRelatedLink.trim() || undefined,
        status: mStatus,
        pin_to_top: mPinToTop,
        pin_until: mPinUntil || undefined,
        access_level: mAccessLevel,
      };

      const val = validateMandatoryFields(record, MEDIA_SCHEMA);
      if (!val.isValid) {
        setErrorMessages(Object.values(val.errors));
        return;
      }
      onAddMedia(record);
    } else if (selectedBranch === 'templates') {
      const finalType = tmpType === 'Other' ? tmpTypeOther.trim() : tmpType;
      const record: any = {
        template_name: tmpTitle.trim(),
        template_type: finalType,
        file: tmpFile ? { name: tmpFile.name, dataUrl: tmpFile.dataUrl, sizeBytes: tmpFile.sizeBytes } : null,
        description: tmpDescription.trim(),
        applicable_module: tmpModule,
        owner: tmpOwner.trim(),
        language: 'English',
        version: tmpVersion.trim(),
        access_level: tmpAccessLevel,
      };

      const val = validateMandatoryFields(record, TEMPLATE_SCHEMA);
      if (!val.isValid) {
        setErrorMessages(Object.values(val.errors));
        return;
      }
      onAddTemplate(record);
    } else if (selectedBranch === 'resources') {
      const finalType = rType === 'Other' ? rTypeOther.trim() : rType;
      const record: any = {
        resource_title: rTitle.trim(),
        resource_type: finalType,
        link_or_definition: rLinkOrDefinition.trim(),
        source_organization: rSourceOrg.trim(),
        relevant_sector: rSector.trim(),
        description: rDescription.trim(),
        keywords: rKeywords.split(',').map(s => s.trim()).filter(Boolean),
        access_level: rAccessLevel,
      };

      const val = validateMandatoryFields(record, RESOURCE_SCHEMA);
      if (!val.isValid) {
        setErrorMessages(Object.values(val.errors));
        return;
      }
      onAddResource(record);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Add New Knowledge Record</h2>
            <p className="text-xs text-slate-400">Select branch and fill in institutional metadata.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Branch Selector Tabs */}
        <div className="px-6 pt-3 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'vault', label: 'Repository / Vault' },
              { id: 'tools', label: 'Tools & KoBo' },
              { id: 'lessons', label: 'Lessons Learned' },
              { id: 'media', label: 'Media & Updates' },
              { id: 'templates', label: 'Templates' },
              { id: 'resources', label: 'Resource Center' },
            ] as Array<{ id: KMTab; label: string }>
          ).map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                setSelectedBranch(b.id);
                setErrorMessages([]);
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                selectedBranch === b.id
                  ? 'border-red-600 text-red-600 bg-red-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {errorMessages.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-xs">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Please correct the following mandatory fields:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] pl-2">
                {errorMessages.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 1. VAULT FORM */}
          {selectedBranch === 'vault' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Report Category *</label>
                  <select
                    value={vCategory}
                    onChange={e => setVCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Assessments">Assessments</option>
                    <option value="Monitoring reports">Monitoring reports</option>
                    <option value="Evaluation reports">Evaluation reports</option>
                    <option value="PDM reports">PDM reports</option>
                    <option value="Other">Other (specify)</option>
                  </select>
                  {vCategory === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify report category..."
                      value={vCategoryOther}
                      onChange={e => setVCategoryOther(e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Report Title *</label>
                  <input
                    type="text"
                    value={vTitle}
                    onChange={e => setVTitle(e.target.value)}
                    placeholder="e.g. Annual Outcome Evaluation 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">File Format *</label>
                  <select
                    value={vFormat}
                    onChange={e => setVFormat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Word">Word</option>
                    <option value="Excel">Excel</option>
                    <option value="PowerPoint">PowerPoint</option>
                    <option value="Other">Other</option>
                  </select>
                  {vFormat === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify format..."
                      value={vFormatOther}
                      onChange={e => setVFormatOther(e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Program / Project *</label>
                  <input
                    type="text"
                    value={vProgramName}
                    onChange={e => setVProgramName(e.target.value)}
                    placeholder="e.g. Drought Relief Operation"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Author / Evaluator *</label>
                  <input
                    type="text"
                    value={vAuthor}
                    onChange={e => setVAuthor(e.target.value)}
                    placeholder="e.g. Joint Monitoring Team"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Region (cascading)</label>
                  <select
                    value={vRegionId}
                    onChange={e => {
                      setVRegionId(e.target.value);
                      setVZoneId('');
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="">National / Cross-Regional</option>
                    {regions.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Zone (cascading)</label>
                  <select
                    value={vZoneId}
                    onChange={e => setVZoneId(e.target.value)}
                    disabled={!vRegionId}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-50"
                  >
                    <option value="">Select Zone</option>
                    {filteredZones.map(z => (
                      <option key={z.id} value={z.id}>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Reporting Period *</label>
                  <input
                    type="text"
                    value={vReportingPeriod}
                    onChange={e => setVReportingPeriod(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Sector / Cluster *</label>
                  <input
                    type="text"
                    value={vSectorCluster}
                    onChange={e => setVSectorCluster(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Access Level *</label>
                  <select
                    value={vAccessLevel}
                    onChange={e => setVAccessLevel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                  >
                    <option value="Public">Public (All staff)</option>
                    <option value="Internal">Internal ERCS</option>
                    <option value="Restricted">Restricted (PMER &amp; Leadership)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description / Summary (50-150 words) *</label>
                <textarea
                  rows={3}
                  value={vDescription}
                  onChange={e => setVDescription(e.target.value)}
                  placeholder="Comprehensive background and key findings..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Keywords (comma separated) *</label>
                <input
                  type="text"
                  value={vKeywords}
                  onChange={e => setVKeywords(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              {/* File Upload Field */}
              <FileUploadField
                label="Attach Report File *"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                value={vFile}
                onChange={setVFile}
                required
              />
            </div>
          )}

          {/* 2. TOOLS FORM */}
          {selectedBranch === 'tools' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tool Sub-Category *</label>
                  <select
                    value={tCategory}
                    onChange={e => setTCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="PDM tool">PDM tool</option>
                    <option value="Needs assessment tool">Needs assessment tool</option>
                    <option value="Beneficiary registration tool">Beneficiary registration tool</option>
                    <option value="Other">Other (specify)</option>
                  </select>
                  {tCategory === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify tool sub-category..."
                      value={tCategoryOther}
                      onChange={e => setTCategoryOther(e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tool Name *</label>
                  <input
                    type="text"
                    value={tName}
                    onChange={e => setTName(e.target.value)}
                    placeholder="e.g. Household Drought Needs Assessment Form"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">XLSForm Version *</label>
                  <input
                    type="text"
                    value={tVersion}
                    onChange={e => setTVersion(e.target.value)}
                    placeholder="e.g. v2.3"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Data Collection Mode *</label>
                  <select
                    value={tDeployMode}
                    onChange={e => setTDeployMode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Mobile (KoboCollect)">Mobile (KoboCollect)</option>
                    <option value="Web form">Web form</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Associated Program *</label>
                  <input
                    type="text"
                    value={tProgram}
                    onChange={e => setTProgram(e.target.value)}
                    placeholder="e.g. Food Security & Livelihoods"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">KoBo Form Link (URL) *</label>
                  <input
                    type="url"
                    value={tKoBoLink}
                    onChange={e => setTKoBoLink(e.target.value)}
                    placeholder="https://kobo.humanitarianresponse.info/#/forms/..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Owner / Focal Person *</label>
                  <input
                    type="text"
                    value={tOwner}
                    onChange={e => setTOwner(e.target.value)}
                    placeholder="e.g. PMER & Cash Technical Team"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Region Coverage *</label>
                  <input
                    type="text"
                    value={tRegionCoverage}
                    onChange={e => setTRegionCoverage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Sector *</label>
                  <input
                    type="text"
                    value={tSector}
                    onChange={e => setTSector(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="hasGuide"
                    checked={tHasGuide}
                    onChange={e => setTHasGuide(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded-md focus:ring-purple-500"
                  />
                  <label htmlFor="hasGuide" className="text-purple-900 font-semibold">
                    Includes Enumerator Guidance document (conditional attachment)
                  </label>
                </div>

                {tHasGuide && (
                  <FileUploadField
                    label="Attach Enumerator Field Guide *"
                    accept=".pdf,.docx,.xlsx"
                    value={tGuideFile}
                    onChange={setTGuideFile}
                    required
                  />
                )}
              </div>
            </div>
          )}

          {/* 3. LESSONS LEARNED FORM */}
          {selectedBranch === 'lessons' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Sub-Category *</label>
                  <select
                    value={lSubCategory}
                    onChange={e => setLSubCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Video link">Video link</option>
                    <option value="Document">Document</option>
                    <option value="Other">Other (specify)</option>
                  </select>
                  {lSubCategory === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify sub-category..."
                      value={lSubCategoryOther}
                      onChange={e => setLSubCategoryOther(e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Lesson Title *</label>
                  <input
                    type="text"
                    value={lTitle}
                    onChange={e => setLTitle(e.target.value)}
                    placeholder="e.g. Engaging Elders for Early Warning Dissemination"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Related Project *</label>
                  <input
                    type="text"
                    value={lRelatedProject}
                    onChange={e => setLRelatedProject(e.target.value)}
                    placeholder="e.g. Drought Resilience"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Thematic Area *</label>
                  <input
                    type="text"
                    value={lThematicArea}
                    onChange={e => setLThematicArea(e.target.value)}
                    placeholder="e.g. Disaster Preparedness"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Region / Location *</label>
                  <input
                    type="text"
                    value={lRegionLocation}
                    onChange={e => setLRegionLocation(e.target.value)}
                    placeholder="e.g. Borena, Oromia"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Key Institutional Takeaway *</label>
                <textarea
                  rows={3}
                  value={lKeyTakeaway}
                  onChange={e => setLKeyTakeaway(e.target.value)}
                  placeholder="What was learned that should inform future project design?"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Event Date *</label>
                  <input
                    type="date"
                    value={lEventDate}
                    onChange={e => setLEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Submitted By *</label>
                  <input
                    type="text"
                    value={lSubmittedBy}
                    onChange={e => setLSubmittedBy(e.target.value)}
                    placeholder="Staff name or branch office"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Conditional Resource: Video fields vs Document upload */}
              {lSubCategory === 'Video link' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
                  <div>
                    <label className="block text-amber-900 font-semibold mb-1">Video URL (YouTube/Vimeo) *</label>
                    <input
                      type="url"
                      value={lVideoUrl}
                      onChange={e => setLVideoUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-amber-900 font-semibold mb-1">Video Duration (conditional) *</label>
                    <input
                      type="text"
                      value={lVideoDuration}
                      onChange={e => setLVideoDuration(e.target.value)}
                      placeholder="e.g. 14 mins"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                </div>
              ) : (
                <FileUploadField
                  label="Attach Lesson Document / Case Study File *"
                  accept=".pdf,.doc,.docx"
                  value={lFile}
                  onChange={setLFile}
                  required
                />
              )}
            </div>
          )}

          {/* 4. MEDIA & UPDATES FORM */}
          {selectedBranch === 'media' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Feed Category *</label>
                  <select
                    value={mCategory}
                    onChange={e => setMCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="PMER update">PMER update</option>
                    <option value="Field story">Field story</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Other">Other (specify)</option>
                  </select>
                  {mCategory === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify feed category..."
                      value={mCategoryOther}
                      onChange={e => setMCategoryOther(e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Author / Source *</label>
                  <input
                    type="text"
                    value={mAuthor}
                    onChange={e => setMAuthor(e.target.value)}
                    placeholder="e.g. PMER Department"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Headline *</label>
                <input
                  type="text"
                  value={mHeadline}
                  onChange={e => setMHeadline(e.target.value)}
                  placeholder="Engaging headline..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Card Summary (1-2 sentences) *</label>
                <textarea
                  rows={2}
                  value={mSummary}
                  onChange={e => setMSummary(e.target.value)}
                  placeholder="Short excerpt shown on the main feed card..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Story Full Body (rich write-up) *</label>
                <textarea
                  rows={5}
                  value={mBody}
                  onChange={e => setMBody(e.target.value)}
                  placeholder="Full article content revealed on 'Read full story'..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <FileUploadField
                label="Cover Image (optional)"
                accept="image/*"
                value={mCoverImage}
                onChange={setMCoverImage}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Status *</label>
                  <select
                    value={mStatus}
                    onChange={e => setMStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Published">Published (Live Feed)</option>
                    <option value="Draft">Draft (Internal)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="pinToTop"
                    checked={mPinToTop}
                    onChange={e => setMPinToTop(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-500"
                  />
                  <label htmlFor="pinToTop" className="text-slate-700 font-medium">
                    Pin to top
                  </label>
                </div>

                {mPinToTop && (
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Pin Until (optional)</label>
                    <input
                      type="date"
                      value={mPinUntil}
                      onChange={e => setMPinUntil(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. TEMPLATES & GUIDELINES FORM */}
          {selectedBranch === 'templates' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Template Type *</label>
                  <select
                    value={tmpType}
                    onChange={e => setTmpType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ToR template">ToR template</option>
                    <option value="Logframe template">Logframe template</option>
                    <option value="Report template">Report template</option>
                    <option value="Checklist">Checklist</option>
                    <option value="Other">Other (specify)</option>
                  </select>
                  {tmpType === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify template type..."
                      value={tmpTypeOther}
                      onChange={e => setTmpTypeOther(e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Template Name *</label>
                  <input
                    type="text"
                    value={tmpTitle}
                    onChange={e => setTmpTitle(e.target.value)}
                    placeholder="e.g. Standard ERCS Logframe Template"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Applicable Module *</label>
                  <select
                    value={tmpModule}
                    onChange={e => setTmpModule(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Reporting">Reporting</option>
                    <option value="M&E">M&amp;E</option>
                    <option value="Knowledge management">Knowledge management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Owner / Dept *</label>
                  <input
                    type="text"
                    value={tmpOwner}
                    onChange={e => setTmpOwner(e.target.value)}
                    placeholder="e.g. National PMER Department"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Version</label>
                  <input
                    type="text"
                    value={tmpVersion}
                    onChange={e => setTmpVersion(e.target.value)}
                    placeholder="e.g. v2.1"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">When to Use Guidance *</label>
                <textarea
                  rows={3}
                  value={tmpDescription}
                  onChange={e => setTmpDescription(e.target.value)}
                  placeholder="Describe exact criteria and workflow stage when this template must be applied..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <FileUploadField
                label="Attach Template Document *"
                accept=".xlsx,.xls,.docx,.doc,.pdf"
                value={tmpFile}
                onChange={setTmpFile}
                required
              />
            </div>
          )}

          {/* 6. RESOURCE CENTER FORM */}
          {selectedBranch === 'resources' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Resource Type *</label>
                  <select
                    value={rType}
                    onChange={e => setRType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="External link">External link</option>
                    <option value="Glossary term">Glossary term</option>
                    <option value="Donor guideline">Donor guideline</option>
                    <option value="FAQ">FAQ</option>
                    <option value="Other">Other (specify)</option>
                  </select>
                  {rType === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify resource type..."
                      value={rTypeOther}
                      onChange={e => setRTypeOther(e.target.value)}
                      className="mt-1.5 w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg"
                      required
                    />
                  )}
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Resource Title / Term *</label>
                  <input
                    type="text"
                    value={rTitle}
                    onChange={e => setRTitle(e.target.value)}
                    placeholder="e.g. Definition of Post-Distribution Monitoring (PDM)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Source Organization *</label>
                  <input
                    type="text"
                    value={rSourceOrg}
                    onChange={e => setRSourceOrg(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Relevant Sector *</label>
                  <input
                    type="text"
                    value={rSector}
                    onChange={e => setRSector(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description *</label>
                <textarea
                  rows={2}
                  value={rDescription}
                  onChange={e => setRDescription(e.target.value)}
                  placeholder="Summary overview of the resource..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {rType === 'Glossary term' || rType === 'FAQ'
                    ? 'Definition / Answer Content *'
                    : 'External Link (URL) or Definition *'}
                </label>
                <textarea
                  rows={4}
                  value={rLinkOrDefinition}
                  onChange={e => setRLinkOrDefinition(e.target.value)}
                  placeholder={
                    rType === 'Glossary term' || rType === 'FAQ'
                      ? 'Detailed institutional definition or answer text...'
                      : 'https://...'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
