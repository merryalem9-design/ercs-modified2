// src/pages/KnowledgeLibraryPage.tsx
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { KnowledgeDocument } from '../types';
import { Search, Folder, FileText, LayoutGrid, List, Plus, X, ArrowLeft, Save } from 'lucide-react';

export const KnowledgeLibraryPage: React.FC = () => {
  const { knowledgeDocuments, addKnowledgeDocument, currentRole } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const isAop = currentRole === 'National Activity AOP';

  // Extract unique sorted categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    knowledgeDocuments.forEach(doc => {
      if (doc.category) set.add(doc.category);
    });
    return Array.from(set).sort();
  }, [knowledgeDocuments]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    knowledgeDocuments.forEach(doc => {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    });
    return counts;
  }, [knowledgeDocuments]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return knowledgeDocuments.filter(doc => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        doc.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [knowledgeDocuments, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Knowledge Library</h2>
        <p className="text-xs text-slate-500 mt-1">
          Policies, guidance, regulations, and reports — searchable and tagged.
        </p>
      </div>

      {/* Main layout: Categories left sidebar + Content area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Categories Sidebar */}
        <aside className="w-full lg:w-60 bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-sm shrink-0">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2.5">
            Categories
          </div>
          <nav className="space-y-1">
            {/* All documents */}
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                selectedCategory === 'ALL'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2.5 truncate">
                <Folder className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="truncate">All documents</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 ml-2">
                {knowledgeDocuments.length}
              </span>
            </button>

            {/* Individual categories */}
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                    isSelected
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Folder className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{cat}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400 ml-2">
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content area */}
        <div className="flex-1 min-w-0 space-y-4 w-full">
          {/* Top Toolbar Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap flex-1">
                {/* Search input */}
                <div className="flex items-center border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white shadow-xs focus-within:border-slate-500">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search title, summary,..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="text-xs bg-transparent focus:outline-none w-48 text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Category filter pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setSelectedCategory('ALL')}
                    className={`px-3.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === 'ALL'
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedCategory === cat
                          ? 'bg-slate-900 text-white'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Document button (AOP only) */}
              {isAop && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shrink-0 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Document
                </button>
              )}
            </div>

            {/* View toggle row */}
            <div className="flex justify-end items-center pt-1 border-t border-slate-100">
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-white text-xs shadow-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> List
                </button>
              </div>
            </div>
          </div>

          {/* Document list / grid */}
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <div className="text-sm font-bold text-slate-700">No documents found</div>
              <p className="text-xs text-slate-400 mt-1">
                No documents match the current search or category filter.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map(doc => {
                const isDisaster = doc.category === 'Disaster Management';
                return (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* File Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isDisaster
                            ? 'bg-rose-50 text-rose-500'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-sm mt-3 leading-snug">
                        {doc.title}
                      </h3>

                      {/* Category */}
                      <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-1">
                        {doc.category}
                      </div>

                      {/* Summary */}
                      <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-3">
                        {doc.summary}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border border-slate-200 text-slate-600 bg-slate-50">
                        {doc.version}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {doc.published_date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-2.5">
              {filteredDocuments.map(doc => {
                const isDisaster = doc.category === 'Disaster Management';
                return (
                  <div
                    key={doc.id}
                    className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div
                        className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center ${
                          isDisaster
                            ? 'bg-rose-50 text-rose-500'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-xs">
                            {doc.title}
                          </h3>
                          <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                            • {doc.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {doc.summary}
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium border border-slate-200 text-slate-600 bg-slate-50">
                        {doc.version}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        {doc.published_date}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Document Modal */}
      {isAddModalOpen && (
        <AddDocumentModal
          categories={categories}
          onClose={() => setIsAddModalOpen(false)}
          onSave={doc => {
            addKnowledgeDocument(doc);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

interface AddDocumentModalProps {
  categories: string[];
  onClose: () => void;
  onSave: (doc: KnowledgeDocument) => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ categories, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [categoryChoice, setCategoryChoice] = useState(categories[0] || 'Strategic Planning');
  const [customCategory, setCustomCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [version, setVersion] = useState('v1.0');
  const [publishedDate, setPublishedDate] = useState(() => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = String(today.getDate()).padStart(2, '0');
    return `${d} ${months[today.getMonth()]} ${today.getFullYear()}`;
  });

  const finalCategory = categoryChoice === '__new__' ? customCategory.trim() : categoryChoice;
  const canSave =
    title.trim().length > 0 &&
    finalCategory.length > 0 &&
    summary.trim().length > 0 &&
    version.trim().length > 0 &&
    publishedDate.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const newDoc: KnowledgeDocument = {
      id: `kdoc-${Date.now()}`,
      title: title.trim(),
      category: finalCategory,
      summary: summary.trim(),
      version: version.trim(),
      published_date: publishedDate.trim(),
    };
    onSave(newDoc);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-ercs-red shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h3 className="text-sm font-black text-slate-800 text-center flex-1 truncate">
            Add Document to Knowledge Library
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. ERCS Standard Operating Procedures"
              className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">
              Category
            </label>
            <select
              value={categoryChoice}
              onChange={e => setCategoryChoice(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="__new__">+ Create new category…</option>
            </select>
            {categoryChoice === '__new__' && (
              <input
                type="text"
                value={customCategory}
                onChange={e => setCustomCategory(e.target.value)}
                placeholder="Type new category name"
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 mt-2 focus:outline-none focus:ring-2 focus:ring-red-100"
              />
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">
              Summary
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Brief summary or description of the document contents..."
              className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">
                Version
              </label>
              <input
                type="text"
                value={version}
                onChange={e => setVersion(e.target.value)}
                placeholder="e.g. v1.0"
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">
                Published Date
              </label>
              <input
                type="text"
                value={publishedDate}
                onChange={e => setPublishedDate(e.target.value)}
                placeholder="e.g. 15 Jan 2025"
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t bg-slate-50 rounded-b-xl shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            disabled={!canSave}
            onClick={handleSave}
            className="bg-ercs-red text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40 hover:bg-red-700 transition-colors shadow-sm"
          >
            <Save className="w-3.5 h-3.5" /> Save Document
          </button>
        </div>
      </div>
    </div>
  );
};
