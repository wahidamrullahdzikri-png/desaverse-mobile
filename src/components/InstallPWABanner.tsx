import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWABanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed as PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return; // Already installed, no need for banner

    // Check if already dismissed in this session
    if (sessionStorage.getItem('pwa-banner-dismissed')) return;

    const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 1024;

    if (ios && isMobile) {
      // iOS: show manual instructions
      setTimeout(() => setShowBanner(true), 2000);
    }

    // Android: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (isMobile) {
        setTimeout(() => setShowBanner(true), 2000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    sessionStorage.setItem('pwa-banner-dismissed', '1');
  };

  if (!showBanner || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] p-2 animate-fadeIn">
      <div className="bg-emerald-600 text-white rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] p-2.5 flex items-start gap-2.5 max-w-lg mx-auto">
        <div className="flex-shrink-0 bg-white rounded-lg p-1.5 border border-black">
          <Smartphone className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-xs leading-tight">
            🎮 Install DesaVerse — Main Tanpa Browser!
          </p>
          {isIOS ? (
            <p className="text-[9px] mt-0.5 opacity-90 leading-tight">
              Ketuk <strong>Bagikan</strong> (kotak + panah) → <strong>"Tambahkan ke Layar Utama"</strong> → game buka layar penuh tanpa browser!
            </p>
          ) : (
            <p className="text-[9px] mt-0.5 opacity-90 leading-tight">
              Install ke HP untuk pengalaman fullscreen tanpa address bar browser!
            </p>
          )}
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="mt-1.5 bg-yellow-300 text-black font-black text-[9px] px-2.5 py-1 rounded-lg border border-black flex items-center gap-1"
            >
              <Download className="w-3 h-3" /> Install Sekarang
            </button>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 bg-white/20 hover:bg-white/30 rounded-lg p-1 border border-white/40"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
