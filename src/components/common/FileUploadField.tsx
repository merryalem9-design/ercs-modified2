import React, { useRef, useState } from 'react';
import { UploadCloud, File, CheckCircle2, X, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { formatFileSize } from '../../utils/knowledgeValidation';

export interface UploadedFileMeta {
  name: string;
  dataUrl: string;
  sizeBytes: number;
}

interface FileUploadFieldProps {
  label?: string;
  helperText?: string;
  required?: boolean;
  accept?: string;
  value?: UploadedFileMeta | null;
  onChange: (file: UploadedFileMeta | null) => void;
  error?: string;
  className?: string;
  accentColorClass?: string;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label = 'Upload File',
  helperText,
  required = false,
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp',
  value,
  onChange,
  error,
  className = '',
  accentColorClass = 'text-teal-600',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [readError, setReadError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setReadError(null);
    if (!file) return;

    // Read as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange({
          name: file.name,
          dataUrl: reader.result,
          sizeBytes: file.size,
        });
      }
    };
    reader.onerror = () => {
      setReadError('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClickBrowse = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
          {label}
          {required && <span className="text-rose-500">*</span>}
        </label>
        {value && (
          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ready
          </span>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleInputChange}
        accept={accept}
        className="hidden"
      />

      {value ? (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 transition-all hover:bg-slate-100/70">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs shrink-0 text-slate-700">
              <File className="w-5 h-5 text-slate-600" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{value.name}</div>
              <div className="text-[10px] text-slate-500 font-mono">
                {formatFileSize(value.sizeBytes)} • Ready in session memory
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleClickBrowse}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
              title="Replace file"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClickBrowse}
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-4 text-center transition-all ${
            isDragging
              ? 'border-teal-500 bg-teal-50/50 scale-[0.99]'
              : error
              ? 'border-rose-300 bg-rose-50/30 hover:border-rose-400'
              : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="p-2 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-500">
              <UploadCloud className={`w-5 h-5 ${accentColorClass}`} />
            </div>
            <div className="text-xs font-semibold text-slate-700">
              Click to choose file <span className="font-normal text-slate-400">or drag and drop</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Supported: PDF, Word, Excel, PowerPoint, Images (up to 25 MB)
            </div>
          </div>
        </div>
      )}

      {/* Visible Prototype In-Memory Storage Banner */}
      <div className="flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[10px] text-amber-800">
        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Prototype Session Storage:</strong> Uploaded files are converted to in-memory data URLs for this session only and will require cloud storage integration in production.
        </span>
      </div>

      {helperText && !error && (
        <p className="text-[10px] text-slate-400">{helperText}</p>
      )}
      {(error || readError) && (
        <p className="text-[10px] font-medium text-rose-600 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          {error || readError}
        </p>
      )}
    </div>
  );
};
