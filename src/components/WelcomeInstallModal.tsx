import React, { useState, useEffect } from 'react';
import { Download, Globe, Smartphone, HelpCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface WelcomeInstallModalProps {
  onContinueToBrowser: () => void;
}

export const WelcomeInstallModal: React.FC<WelcomeInstallModalProps> = ({ onContinueToBrowser }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Check if already running in PWA standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      // Already installed and running standalone, bypass choice and go straight to game
      onContinueToBrowser();
      return;
    }

    const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 1024;

    if (isMobile) {
      setShowModal(true);
    } else {
      // Desktop doesn't need this flow
      onContinueToBrowser();
    }

    // Android: Listen for PWA installation offer
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [onContinueToBrowser]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        // App is installing, close modal
        onContinueToBrowser();
      }
      setDeferredPrompt(null);
    } else {
      alert("Menyiapkan instalasi otomatis... Silakan tunggu 1-2 detik lalu ketuk kembali tombol Instal.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-stone-900 z-[99999] flex items-center justify-center p-4 select-none">
      <div className="neo-box-lg bg-amber-50 w-full max-w-md p-5 text-center flex flex-col items-center gap-4 animate-fadeIn shadow-[8px_8px_0px_#000]">
        
        {/* Circle Logo Header */}
        <div className="w-20 h-20 rounded-full border-4 border-black overflow-hidden bg-white shadow-md animate-bounce-subtle">
          <img src="/images/logo_desaverse.jpg" alt="DesaVerse Logo" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-1">
          <h1 className="font-extrabold text-2xl text-slate-900 font-baloo leading-none">
            DESAVERSE
          </h1>
          <p className="text-xs text-slate-700 font-bold tracking-wide uppercase">
            🌾 Misi Desa Sadasari 🌾
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-3 text-left w-full space-y-2">
          <p className="text-xs font-black text-slate-900 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-600" />
            Wajib Install Aplikasi Untuk Bermain
          </p>
          <p className="text-[10px] text-slate-600 font-bold leading-normal">
            Buka DesaVerse langsung dari beranda HP kamu dengan layar penuh otomatis, tanpa bar browser, dan berjalan lebih lancar!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 mt-2">
          {/* iOS Manual instructions or Android auto-install prompt */}
          {isIOS ? (
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-2.5 text-left text-[9px] md:text-xs text-yellow-900 font-bold leading-tight flex items-start gap-2">
              <span className="text-lg">💡</span>
              <div>
                <strong>Cara Install di iPhone/iPad (Wajib):</strong><br />
                Ketuk tombol <strong>Bagikan</strong> (ikon kotak dengan panah atas), lalu gulir ke bawah dan pilih <strong>"Tambahkan ke Layar Utama"</strong>.
              </div>
            </div>
          ) : (
            <button
              onClick={handleInstall}
              className="neo-btn w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 text-sm font-black flex items-center justify-center gap-2 transform active:scale-95 transition-transform"
            >
              <Download className="w-4 h-4 stroke-[3]" />
              INSTALL APLIKASI DESAVERSE
            </button>
          )}
        </div>

        <p className="text-[9px] text-slate-500 font-medium leading-none">
          Materi Pembelajaran KKM • Desa Sadasari
        </p>
      </div>
    </div>
  );
};
