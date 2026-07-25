import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Play, BookOpen, Settings, Info, Users, Sparkles, Volume2, VolumeX, X, Maximize } from 'lucide-react';

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

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-300 via-amber-100 to-emerald-200 flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden select-none">
      {/* Decorative Floating Clouds & Sun */}
      <div className="absolute top-6 left-12 text-6xl animate-bounce-subtle">☀️</div>
      <div className="absolute top-10 right-16 text-5xl animate-float-cloud">☁️</div>
      <div className="absolute top-24 left-1/4 text-4xl animate-float-cloud">☁️</div>

      {/* Header Logo Badge */}
      <div className="text-center pt-6 z-10 animate-fadeIn">
        <span className="neo-badge bg-amber-400 text-slate-900 px-4 py-1 text-xs md:text-sm uppercase tracking-widest mb-2 inline-block">
          Episode 01 • Media Pembelajaran SD
        </span>

        <h1 className="font-extrabold text-4xl sm:text-6xl md:text-7xl text-slate-900 tracking-tight drop-shadow-[4px_4px_0px_#000] font-baloo">
          DESAVERSE
        </h1>
        <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-emerald-950 mt-1 drop-shadow-[2px_2px_0px_#FFF]">
          🌾 MISI DESA MANDIRI 🌾
        </h2>
        <p className="text-xs sm:text-sm font-bold text-slate-800 max-w-md mx-auto mt-2 bg-white/80 px-3 py-1 rounded-full border border-black">
          Ekonomi Sirkular • Sampah • Ketahanan Pangan • UMKM
        </p>
      </div>

      {/* Mascot Mascot Graphic */}
      <div className="relative z-10 my-4 text-center">
        <div className="neo-box-lg bg-yellow-300 px-6 py-4 inline-flex items-center gap-4 animate-bounce-subtle">
          <span className="text-5xl md:text-6xl">👦🏻</span>
          <div className="text-left">
            <h3 className="font-extrabold text-xl md:text-2xl text-slate-900">Halo Pahlawan Desa!</h3>
            <p className="text-xs md:text-sm font-bold text-slate-800">
              Bantu Windah dan warga Desa Sukamaju berkembang!
            </p>
          </div>
        </div>
      </div>

      {/* Menu Buttons */}
      <div className="w-full max-w-sm space-y-3 z-10 pb-4">
        {/* Fullscreen Button */}
        <button
          onClick={() => {
            sound.playClick();
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            }
          }}
          className="w-full neo-btn bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 text-base md:text-lg flex items-center justify-center gap-2"
        >
          <Maximize className="w-5 h-5" />
          <span>LAYAR PENUH (Fullscreen)</span>
        </button>

        <button
          onClick={() => {
            sound.playSuccess();
            sound.startBGM();
            onStartGame();
          }}
          className="w-full neo-btn bg-emerald-400 hover:bg-emerald-300 text-black py-3.5 text-xl md:text-2xl flex items-center justify-center gap-3 animate-pulse"
        >
          <Play className="w-7 h-7 fill-black" />
          <span>MULAI BERMAIN</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('how_to');
            }}
            className="neo-btn bg-sky-300 hover:bg-sky-200 text-black py-2.5 text-sm md:text-base flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Cara Bermain</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenFacilitatorMode();
            }}
            className="neo-btn bg-indigo-300 hover:bg-indigo-200 text-black py-2.5 text-sm md:text-base flex items-center justify-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Mode KKN</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('settings');
            }}
            className="neo-btn bg-white hover:bg-slate-100 text-black py-2.5 text-sm md:text-base flex items-center justify-center gap-1.5"
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveModal('about');
            }}
            className="neo-btn bg-white hover:bg-slate-100 text-black py-2.5 text-sm md:text-base flex items-center justify-center gap-1.5"
          >
            <Info className="w-4 h-4" />
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
                <p>2. Ikuti alur cerita petualangan Windah menyelamatkan Desa Sukamaju.</p>
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
