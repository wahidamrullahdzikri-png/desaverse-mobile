import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import { Play, BookOpen, Settings, Info, Users, Sparkles, Volume2, VolumeX, X, Maximize, Minimize } from 'lucide-react';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenFacilitatorMode: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onOpenFacilitatorMode,
  isAudioMuted,
  onToggleAudio,
}) => {
  const [activeModal, setActiveModal] = useState<'how_to' | 'settings' | 'about' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(
    !!(document.fullscreenElement || (document as any).webkitFullscreenElement)
  );
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
      setIsFullscreen(isFs);
      if (isFs) {
        setShowFullscreenPrompt(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 1024);
    const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
    if (isMobile && !isFs) {
      setShowFullscreenPrompt(true);
    }
  }, []);

  // Start BGM on first user interaction
  useEffect(() => {
    const startAudioOnInteraction = () => {
      sound.startBGM();
      document.removeEventListener('click', startAudioOnInteraction);
      document.removeEventListener('touchstart', startAudioOnInteraction);
    };
    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);
    return () => {
      document.removeEventListener('click', startAudioOnInteraction);
      document.removeEventListener('touchstart', startAudioOnInteraction);
    };
  }, []);

  const toggleFullscreen = () => {
    sound.playClick();
    const isFs = !!(document.fullscreenElement || (document as any).webkitFullscreenElement);
    if (!isFs) {
      const el = document.documentElement as any;
      const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (req) {
        req.call(el).then(() => {
          setIsFullscreen(true);
          try {
            if (screen.orientation && typeof (screen.orientation as any).lock === 'function') {
              (screen.orientation as any).lock('landscape').catch(() => {});
            }
          } catch (_) {}
        }).catch(() => {});
      }
    } else {
      const exit = (document as any).exitFullscreen || (document as any).webkitExitFullscreen || (document as any).mozCancelFullScreen || (document as any).msExitFullscreen;
      if (exit) {
        exit.call(document).then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  return (
    <div className="relative flex-1 w-full min-h-[400px] bg-gradient-to-b from-sky-300 via-amber-100 to-emerald-200 flex flex-col items-center justify-between p-3 md:p-8 select-none">
      {/* Mobile Fullscreen Invitation Prompt Overlay */}
      {showFullscreenPrompt && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-fadeIn">
          <div className="neo-box-lg bg-yellow-100 max-w-sm w-full p-6 text-center shadow-[6px_6px_0px_#000]">
            <span className="text-4xl animate-bounce-subtle inline-block mb-2">📱</span>
            <h3 className="font-extrabold text-xl text-slate-900 mb-2">Petualangan Menanti!</h3>
            <p className="text-xs md:text-sm font-bold text-slate-800 leading-relaxed mb-4">
              Untuk pengalaman bermain lebih seru, gunakan mode Fullscreen.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowFullscreenPrompt(false);
                  toggleFullscreen();
                }}
                className="neo-btn bg-emerald-400 hover:bg-emerald-300 text-black py-2.5 text-sm font-black uppercase"
              >
                FULLSCREEN
              </button>
              <button
                onClick={() => setShowFullscreenPrompt(false)}
                className="neo-btn bg-white hover:bg-stone-100 text-stone-600 py-1.5 text-xs font-bold"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Audio Controls at Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <button
          onClick={onToggleAudio}
          className="neo-btn bg-white hover:bg-slate-100 p-1.5 md:p-2.5 text-black flex items-center justify-center"
          title={isAudioMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-red-500" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />}
        </button>
      </div>

      {/* Decorative Floating Clouds & Sun */}
      <div className="absolute top-6 left-12 text-6xl animate-bounce-subtle">☀️</div>
      <div className="absolute top-10 right-16 text-5xl animate-float-cloud">☁️</div>
      <div className="absolute top-24 left-1/4 text-4xl animate-float-cloud">☁️</div>

      {/* Header Logo Badge */}
      <div className="text-center pt-2 md:pt-6 z-10 animate-fadeIn">
        <span className="neo-badge bg-amber-400 text-slate-900 px-2 py-0.5 md:px-4 md:py-1 text-[8px] md:text-sm uppercase tracking-widest mb-1 md:mb-2 inline-block">
          Episode 01 • Media Pembelajaran SD
        </span>

        <h1 className="font-extrabold text-2xl sm:text-5xl lg:text-7xl text-slate-900 tracking-tight drop-shadow-[2px_2px_0px_#000] md:drop-shadow-[4px_4px_0px_#000] font-baloo leading-none">
          DESAVERSE
        </h1>
        <h2 className="font-extrabold text-xs sm:text-2xl lg:text-3xl text-emerald-950 mt-0.5 drop-shadow-[1px_1px_0px_#FFF] md:drop-shadow-[2px_2px_0px_#FFF]">
          🌾 MISI DESA MANDIRI 🌾
        </h2>
        <p className="text-[9px] sm:text-sm font-bold text-slate-800 max-w-md mx-auto mt-1 bg-white/80 px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-black leading-tight">
          Ekonomi Sirkular • Sampah • Ketahanan Pangan • UMKM
        </p>
      </div>

      {/* Mascot Mascot Graphic */}
      <div className="relative z-10 my-1 md:my-4 text-center">
        <div className="neo-box-lg bg-yellow-300 px-3 py-1.5 md:px-6 md:py-4 inline-flex items-center gap-2 md:gap-4 animate-bounce-subtle">
          <span className="text-2xl md:text-6xl">👦🏻</span>
          <div className="text-left">
            <h3 className="font-extrabold text-xs md:text-2xl text-slate-900">Halo Pahlawan Desa!</h3>
            <p className="text-[10px] md:text-sm font-bold text-slate-800">
              Bantu Yanti dan warga Desa Sadasari berkembang!
            </p>
          </div>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="w-full max-w-xs md:max-w-sm space-y-1.5 md:space-y-3 z-10 pb-2">
        <div className="flex gap-1.5 w-full">
          <button
            onClick={() => {
              sound.playSuccess();
              sound.startBGM();
              onStartGame();
            }}
            className="flex-1 neo-btn bg-emerald-400 hover:bg-emerald-300 text-black py-1.5 md:py-3.5 text-xs sm:text-lg lg:text-2xl flex items-center justify-center gap-1.5 md:gap-3 animate-pulse"
          >
            <Play className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7 fill-black" />
            <span>MULAI BERMAIN</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="neo-btn bg-yellow-300 hover:bg-yellow-200 text-black px-3 md:px-4 flex items-center justify-center border border-black"
            title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" /> : <Maximize className="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" />}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 md:gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('how_to');
            }}
            className="neo-btn bg-sky-300 hover:bg-sky-200 text-black py-1.5 md:py-2.5 text-[10px] md:text-sm lg:text-base flex items-center justify-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Cara Bermain</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenFacilitatorMode();
            }}
            className="neo-btn bg-indigo-300 hover:bg-indigo-200 text-black py-1.5 md:py-2.5 text-[10px] md:text-sm lg:text-base flex items-center justify-center gap-1"
          >
            <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Mode KKN</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5 md:gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('settings');
            }}
            className="neo-btn bg-white hover:bg-slate-100 text-black py-1.5 md:py-2.5 text-[10px] md:text-sm lg:text-base flex items-center justify-center gap-1"
          >
            <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Pengaturan</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('about');
            }}
            className="neo-btn bg-white hover:bg-slate-100 text-black py-1.5 md:py-2.5 text-[10px] md:text-sm lg:text-base flex items-center justify-center gap-1"
          >
            <Info className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Tentang</span>
          </button>
        </div>
      </div>

      {/* Footer credits */}
      <div className="text-center text-xs font-bold text-slate-800 z-10">
        Dikembangkan untuk KKN Pembelajaran Interaktif Sekolah Dasar • Dzikri Wahid Amrullah
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="neo-box-lg bg-yellow-100 max-w-lg w-full p-5 relative">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
              <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
                {activeModal === 'how_to' && '📖 Cara Bermain Bersama'}
                {activeModal === 'settings' && '⚙ Pengaturan Audio'}
                {activeModal === 'about' && '👥 Tentang DESAVERSE'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 bg-white hover:bg-slate-200 rounded-lg border-2 border-black"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {activeModal === 'how_to' && (
              <div className="space-y-3 text-sm text-slate-800 font-semibold max-h-80 overflow-y-auto">
                <p>1. Game ini ditampilkan di layar proyektor kelas melalui 1 laptop operator (Mahasiswa KKN).</p>
                <p>2. Ikuti alur cerita petualangan Yanti menyelamatkan Desa Sadasari.</p>
                <p>3. Saat muncul pilihan keputusan, seluruh kelas berdiskusi dan melakukan angkat tangan.</p>
                <p>4. Operator menggunakan tombol <strong>Voting Suara Kelas</strong> untuk memilih jawaban terbanyak.</p>
                <p>5. Selesaikan mini game dan lihat perkembangan 4 indikator kemandirian desa!</p>
              </div>
            )}

            {activeModal === 'settings' && (
              <div className="space-y-4 text-sm text-slate-900 font-bold py-2">
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border-2 border-black">
                  <span>Suara & Musik Efek Game</span>
                  <button
                    onClick={onToggleAudio}
                    className="neo-btn bg-yellow-300 px-3 py-1.5 text-xs flex items-center gap-1.5"
                  >
                    {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                    <span>{isAudioMuted ? 'Muted' : 'Aktif'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'about' && (
              <div className="space-y-2 text-xs md:text-sm text-slate-800 font-semibold">
                <p className="font-black text-slate-900 text-base">DESAVERSE: Misi Desa Mandiri (Episode 01)</p>
                <p>Versi: 1.0 (Draft PRD Specification Complete)</p>
                <p>Author: Dzikri Wahid Amrullah</p>
                <p className="pt-2">Tema KKN: Membangun Kemandirian Desa Melalui Penguatan Ekonomi Sirkular Berbasis UMKM, Pengelolaan Sampah, dan Ketahanan Pangan.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
