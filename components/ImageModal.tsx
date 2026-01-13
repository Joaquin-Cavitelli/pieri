
import React from 'react';
import { X, Download } from 'lucide-react';

interface ImageModalProps {
  src: string | null;
  caption?: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, caption, onClose }) => {
  if (!src) return null;

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Try to create a nice filename from the caption
      const filename = caption 
        ? caption.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 30) 
        : 'nuestra-sorpresa';
      
      link.download = `${filename}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback for CORS issues: open in new tab
      window.open(src, '_blank');
    }
  };
  // Split caption by common separators to display in column format
  const getParts = () => {
    if (!caption) return [];
    // Try splitting by em-dash first (used in ultrasounds), then colon (used in history), then standard dash
    if (caption.includes(' — ')) return caption.split(' — ');
    if (caption.includes(': ')) return caption.split(': ');
    if (caption.includes(' - ')) return caption.split(' - ');
    return [caption];
  };

  const parts = getParts();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-in fade-in duration-300 backdrop-blur-sm"
      onClick={onClose}
    >
        {/* Top Action Bar */}
      <div className="absolute top-6 right-6 flex items-center space-x-2 z-50">
        <button 
          title="Descargar imagen"
          className="p-2 bg-slate-700 text-white rounded-md"
          onClick={handleDownload}
        >
          <Download className="w-5 h-5" />
        </button>
        <button 
          title="Cerrar"
          className="p-2 bg-slate-900 text-white rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div 
        className="flex flex-col items-center w-full min-h-[100dvh] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt="Vista detallada" 
          className="object-cover h-full w-full shadow-[0_0_60px_rgba(0,0,0,0.8)]  animate-in zoom-in-95 duration-300"
        />
        
        {/* {parts.length > 0 && (
          <div className="text-center animate-in slide-in-from-bottom-8 duration-500 flex flex-col px-6 max-w-md">
            {parts.map((part, idx) => (
              <p 
                key={idx}
                className={`text-white ${
                  idx === 0 
                    ? ' font-semibold leading-tight ' 
                    : 'font-light text-sm'
                }`}
              >
                {part.trim()}
              </p>
            ))}
          </div>
        )} */}
      </div>

      {/* Background layer to ensure clicking outside content always closes the modal */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
