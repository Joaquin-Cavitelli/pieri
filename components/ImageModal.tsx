
import React, { useState } from 'react';
import { X, Download, Share2, ZoomIn, ExternalLink, ZoomOut } from 'lucide-react';

interface ImageModalProps {
  src: string | null;
  caption?: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, caption, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!src) return null;

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
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
      window.open(src, '_blank');
    }
  };

  const handleOpenInBrowser = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(src, '_blank');
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const getParts = () => {
    if (!caption) return [];
    if (caption.includes(' — ')) return caption.split(' — ');
    if (caption.includes(': ')) return caption.split(': ');
    if (caption.includes(' - ')) return caption.split(' - ');
    return [caption];
  };

  const parts = getParts();
  const mainTitle = parts[0] || "Nuestra Sorpresa";
  const subTitle = parts[1] || "";

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-[#0b0b0b] animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Header Bar - Discord/Gallery Style */}
      <div 
        className="w-full h-16 md:h-20 px-4 md:px-6 flex items-center justify-between bg-black/40 backdrop-blur-md z-50 select-none border-b border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex flex-col overflow-hidden">
            <span className="text-white font-bold text-sm md:text-base leading-tight truncate max-w-[200px] md:max-w-md">
              {mainTitle}
            </span>
            {subTitle && (
              <span className="text-white/50 text-[10px] md:text-xs font-medium uppercase tracking-wider truncate">
                {subTitle}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Zoom Button */}
          <button 
            title={isZoomed ? "Alejar" : "Acercar"}
            className="text-white/60 p-2 hover:text-white hover:bg-white/10 rounded transition-all"
            onClick={toggleZoom}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5 md:w-6 md:h-6" /> : <ZoomIn className="w-5 h-5 md:w-6 md:h-6" />}
          </button>

          {/* Open in Browser Button */}
          <button 
            title="Abrir en navegador"
            className="text-white/60 p-2 hover:text-white hover:bg-white/10 rounded transition-all"
            onClick={handleOpenInBrowser}
          >
            <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          {/* Download Button */}
          <button 
            title="Descargar"
            className="text-white/60 p-2 hover:text-white hover:bg-white/10 rounded transition-all"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button className="hidden md:flex text-white/60 p-2 hover:text-white hover:bg-white/10 rounded transition-all">
            <Share2 className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1 md:mx-2" />
          
          <button 
            title="Cerrar"
            className="ml-1 bg-white/5 md:bg-transparent text-white/80 p-2 hover:text-white hover:bg-white/20 md:hover:bg-red-500/80 rounded-lg transition-all"
            onClick={onClose}
          >
            <X className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div 
        className={`flex-1 relative overflow-auto ${isZoomed ? 'cursor-zoom-out' : 'cursor-default flex items-center justify-center'}`}
        onClick={onClose}
      >
        <div 
          className={`relative transition-all duration-300 ease-in-out ${isZoomed ? 'w-[200%] h-auto' : 'w-full h-full max-w-full max-h-full flex items-center justify-center p-4 md:p-12'} animate-in zoom-in-95`}
          onClick={toggleZoom}
        >
          <img 
            src={src} 
            alt="Vista detallada" 
            className={`object-contain shadow-2xl transition-all duration-300 rounded-md ${isZoomed ? 'w-full h-auto cursor-zoom-out' : 'max-w-full max-h-[85vh] md:max-h-[90vh] cursor-zoom-in'}`}
          />
        </div>
      </div>

      {/* Decorative background overlay click-to-close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
