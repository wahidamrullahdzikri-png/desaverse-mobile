import { SceneData } from '../types';

export const INITIAL_INDICATORS = {
  ekonomi: 20,
  lingkungan: 20,
  pangan: 20,
  kemandirian: 20,
};

export const STORY_SCENES: Record<string, SceneData> = {
  'SC-001': {
    id: 'SC-001',
    title: 'Splash Screen',
    category: 'opening',
    act: 1,
    background: 'splash',
    dialogues: [],
    nextSceneId: 'SC-002',
    facilitatorGuide: {
      objective: 'Memperkenalkan judul game dan mempersiapkan siswa di kelas.',
      discussionPrompts: [
        'Minta siswa duduk rapi dan bersiap petualangan Desa Sadasari!',
        'Jelaskan bahwa hari ini kita akan mengambil keputusan bersama.'
      ],
      keyTakeaway: 'Pembelajaran kolaboratif dimulai dari kesiapan bersama.'
    }
  },

  'SC-002': {
    id: 'SC-002',
    title: 'Menu Utama',
    category: 'opening',
    act: 1,
    background: 'village_clean',
    dialogues: [],
    nextSceneId: 'SC-003',
    facilitatorGuide: {
      objective: 'Navigasi awal dan pemilihan mode permainan.',
      discussionPrompts: [
        'Sapa seluruh kelas: "Apakah teman-teman siap menyelamatkan desa?"',
        'Gunakan proyektor agar seluruh siswa melihat layar dengan jelas.'
      ],
      keyTakeaway: 'Selamat datang di DESAVERSE: Misi Desa Mandiri!'
    }
  },

  'SC-003': {
    id: 'SC-003',
    title: 'Perkenalan Yanti & Dika',
    category: 'story',
    act: 1,
    background: 'village_dirty',
    nextSceneId: 'SC-004',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Halo teman-teman semua! Namaku Yanti, siswi kelas 5 SD di Desa Sadasari! 👋'
      },
      {
        speaker: 'Dika',
        character: 'dika',
        expression: 'happy',
        text: 'Dan aku Dika! Kami berdua siap menjaga desa kami agar tetap bersih dan sehat!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'surprised',
        text: 'Wah, senang sekali hari ini kakak-kakak KKM sudah datang ke desa kami!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Tapi... sejujurnya, Desa Sadasari sedang menghadapi masalah besar nih...'
      }
    ],
    facilitatorGuide: {
      objective: 'Memperkenalkan Yanti dan Dika serta membangun keterikatan emosional.',
      discussionPrompts: [
        'Tanyakan kepada siswa: Siapa yang suka membantu teman?',
        'Siapkan perhatian siswa untuk menyimak masalah Desa Sadasari.'
      ],
      keyTakeaway: 'Duo sahabat Yanti & Dika akan memandu diskusi kelas.'
    }
  },

  'SC-004': {
    id: 'SC-004',
    title: 'Kondisi Desa Sadasari',
    category: 'story',
    act: 1,
    background: 'village_dirty',
    nextSceneId: 'SC-005',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'sad',
        text: 'Coba lihat sekeliling kita... Dulu desa ini sangat hijau dan bersih.'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'sad',
        text: 'Tapi sekarang sampah plastik berserakan di jalanan, kebun warga tidak terurus, dan toko-toko kecil susah dapat bahan.'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'surprised',
        text: 'Warga jadi sedih dan desa jadi susah cari uang. Kita harus berbuat sesuatu!'
      }
    ],
    facilitatorGuide: {
      objective: 'Menumbuhkan empati terhadap kondisi lingkungan dan ekonomi desa.',
      discussionPrompts: [
        'Bagaimana perasaan kalian saat melihat lingkungan yang kotor?',
        'Apa dampak jika kebun tidak ditanami dan sampah menumpuk?'
      ],
      keyTakeaway: 'Kebiasaan buang sampah sembarangan merusak lingkungan dan ekonomi desa.'
    }
  },

  'SC-005': {
    id: 'SC-005',
    title: 'Misi Pertama',
    category: 'decision',
    act: 1,
    background: 'village_dirty',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Teman-teman kelas, maukah kalian menjadi penasihatku dan membantu membersihkan Desa Sadasari?'
      }
    ],
    choices: [
      {
        id: 'c1_ayo',
        label: 'AYO BANTU! 🚀',
        description: 'Mulai petualangan membersihkan sampah jalanan desa.',
        icon: '🚀',
        nextSceneId: 'SC-005A',
        indicatorImpact: { lingkungan: 80, kemandirian: 20 }
      },
      {
        id: 'c1_nanti',
        label: 'NANTI DULU... 😅',
        description: 'Coba tanya Yanti lagi.',
        icon: '😅',
        nextSceneId: 'SC-005_loop',
        indicatorImpact: {}
      }
    ],
    facilitatorGuide: {
      objective: 'Mengajak siswa aktif menyetujui komitmen awal petualangan.',
      discussionPrompts: [
        'Lakukan voting tangan singkat: Siapa yang setuju membantu Yanti & Dika sekarang?',
        'Ajak seluruh siswa bersorak "AYO BANTU!" bersama-sama.'
      ],
      keyTakeaway: 'Perubahan besar dimulai dari keputusan dan komitmen bersama.'
    }
  },

  'SC-005A': {
    id: 'SC-005A',
    title: 'Mulai Bersih-bersih',
    category: 'story',
    act: 1,
    background: 'village_dirty',
    nextSceneId: 'SC-006',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Terima kasih teman-teman semua! Mari kita mulai dengan membersihkan jalanan desa dari sampah.'
      }
    ]
  },

  'SC-005_loop': {
    id: 'SC-005_loop',
    title: 'Ayo Bersama!',
    category: 'story',
    act: 1,
    background: 'village_dirty',
    nextSceneId: 'SC-005', // Return back to SC-005 question so player can pick AYO BANTU
    skipTypewriter: true,
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Hehehe... Kalau bukan kita, siapa lagi yang menyelamatkan desa? Yuk, kita bersihkan bersama sekarang! 💪'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengarahkan siswa kembali ke pertanyaan keputusan SC-005.',
      discussionPrompts: ['Menegaskan bahwa semua siswa berharga untuk tim penyelamat desa.'],
      keyTakeaway: 'Setiap anak berperan penting dalam menjaga kebersihan.'
    }
  },

  'SC-006': {
    id: 'SC-006',
    title: 'Membersihkan Sampah',
    category: 'minigame',
    act: 2,
    background: 'village_dirty',
    miniGameType: 'trash_cleanup',
    nextSceneId: 'SC-007',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Lihat ada 10 sampah berserakan! Seret atau klik sampah-sampah ini ke dalam tempat sampah ya! 🗑️'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengidentifikasi dan mengumpulkan sampah yang berserakan.',
      discussionPrompts: [
        'Minta siswa menyebutkan nama sampah yang terlihat di layar.',
        'Seret sampah langsung dari jalanan ke tempat sampah.'
      ],
      keyTakeaway: 'Membersihkan sampah jalanan membuat desa indah dan sehat.'
    }
  },

  'SC-007': {
    id: 'SC-007',
    title: 'Desa Mulai Bersih',
    category: 'story',
    act: 2,
    background: 'village_clean',
    nextSceneId: 'SC-008',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'proud',
        text: 'Wahhh! Luar biasa! Jalanan desa sekarang kelihatan jauh lebih bersih dan asri! ✨'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Tapi ingat, sampah yang kita kumpulkan tadi belum dipilah. Kalau langsung dibuang campur-campur begitu saja, sampahnya jadi susah dipakai ulang!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Yuk kita pilah sampah sesuai jenisnya agar bisa dimanfaatkan kembali!'
      }
    ],
    facilitatorGuide: {
      objective: 'Menjelaskan pentingnya pemilahan sampah sebelum diolah.',
      discussionPrompts: [
        'Apa bedanya sampah yang langsung dibakar vs dipilah?',
        'Mengapa kita tidak boleh membakar sampah sembarangan?'
      ],
      keyTakeaway: 'Memilah sampah adalah kunci awal ekonomi sirkular.'
    }
  },

  'SC-008': {
    id: 'SC-008',
    title: 'Mini Game: Memilah Sampah',
    category: 'minigame',
    act: 2,
    background: 'village_clean',
    miniGameType: 'waste_sorting',
    nextSceneId: 'SC-009',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Pilah sampah ke dalam 3 tong: Organik (Hijau), Anorganik (Biru), dan B3 (Merah)! ♻️'
      }
    ],
    facilitatorGuide: {
      objective: 'Memahami 3 kategori utama sampah (Organik, Anorganik, B3).',
      discussionPrompts: [
        'Kulit pisang & daun kering masuk tong mana? (Organik)',
        'Botol plastik & kaleng? (Anorganik)',
        'Baterai bekas & botol obat? (B3 - Bahan Berbahaya)'
      ],
      keyTakeaway: 'Sampah organik bisa jadi pupuk, anorganik bisa didaur ulang!'
    }
  },

  'SC-009': {
    id: 'SC-009',
    title: 'Bank Sampah PKK Sadasari',
    category: 'story',
    act: 2,
    background: 'bank_sampah',
    dialogPosition: 'right',
    nextSceneId: 'SC-009B',
    dialogues: [
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'happy',
        text: 'Halo anak-anak! Saya pengurus Bank Sampah PKK Desa Sadasari. Wah, sampah kalian sudah dipilah rapi sekali! 🏦'
      },
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'proud',
        text: 'Di Bank Sampah PKK ini, kami mengelola dua jenis: 🟢 Bank Sampah Organik dan 🔵 Bank Sampah Plastik. Ibu-ibu PKK yang mengelolanya bersama!'
      },
      {
        speaker: 'Dika',
        character: 'dika',
        expression: 'thinking',
        text: 'Bu, kalau kita setor sampah ke sini, kita langsung dapat uang ya?'
      },
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'thinking',
        text: 'Belum tentu langsung dapat uang, Dika. Bank Sampah PKK kita masih baru. Sampah plastiknya nanti ibu-ibu PKK bikin jadi kerajinan atau dijual — uangnya masuk ke tabungan PKK buat kegiatan desa!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Wah keren! Jadi sampah kita berguna buat kegiatan PKK dan desa! Kalau sampah organiknya diapakan, Bu?'
      },
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'proud',
        text: 'Sampah organik kita pakai untuk budidaya maggot! Maggot-nya jadi pakan ayam dan ikan warga. Yuk kita lihat prosesnya!'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengenal konsep Bank Sampah PKK dan realita pengelolaannya di Desa Sadasari.',
      discussionPrompts: [
        'Siapa yang tahu apa itu Bank Sampah?',
        'Mengapa hasil bank sampah belum tentu langsung jadi uang untuk warga yang setor?',
        'Apa manfaat sampah plastik yang masuk kas PKK?'
      ],
      keyTakeaway: 'Bank Sampah PKK Sadasari mengelola plastik → kerajinan/dijual → kas PKK; organik → maggot → pakan ternak!'
    }
  },

  'SC-009B': {
    id: 'SC-009B',
    title: 'Menuju Area Budidaya Maggot',
    category: 'story',
    act: 2,
    background: 'maggot_real_bg',
    nextSceneId: 'SC-MAGGOT-INTRO',
    dialogues: [
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'happy',
        text: 'Ayo ikut Ibu ke area budidaya maggot! Di sini kita manfaatkan sisa sayur dan kulit buah dari rumah-rumah warga.'
      },
      {
        speaker: 'Dika',
        character: 'dika',
        expression: 'surprised',
        text: 'Wah! Ini maggot-nya? Seperti ulat kecil-kecil ya, Bu? Hiiih... tapi katanya bermanfaat!'
      },
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'happy',
        text: 'Betul, Dika! Maggot itu seperti ulat kecil dari lalat tentara hitam. Mereka bisa memakan sampah sisa makanan dengan sangat cepat, dan hasilnya jadi makanan ternak yang bagus! 🪱'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengenalkan budidaya maggot sebagai cara memanfaatkan sampah organik.',
      discussionPrompts: [
        'Apakah ada yang pernah melihat maggot / ulat sebelumnya?',
        'Kenapa maggot bisa memakan sampah organik?'
      ],
      keyTakeaway: 'Maggot itu seperti "mesin pemakan sampah" alami yang ramah lingkungan.'
    }
  },

  'SC-MAGGOT-INTRO': {
    id: 'SC-MAGGOT-INTRO',
    title: 'Cara Budidaya Maggot',
    category: 'story',
    act: 2,
    background: 'maggot_close_up_bg',
    nextSceneId: 'SC-MAGGOT-GAME',
    dialogues: [
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'proud',
        text: 'Yang pertama: kita harus pilih makanan yang pas buat maggot. Sisa sayuran, kulit buah, dan daun kering itu paling disukai maggot!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Kalau botol plastik atau baterai boleh dimasukkan ke wadah maggot, Bu?'
      },
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'sad',
        text: 'Jangan, Yanti! Maggot cuma bisa makan sisa makanan dan daun-daunan. Plastik dan baterai itu bahaya, bisa bikin maggotnya mati!'
      },
      {
        speaker: 'Dika',
        character: 'dika',
        expression: 'happy',
        text: 'Oke, ayo kita coba sendiri cara budidaya maggotnya! Pasti seru!'
      }
    ],
    facilitatorGuide: {
      objective: 'Memahami syarat bahan organik yang cocok untuk budidaya maggot.',
      discussionPrompts: [
        'Dari sisa makanan sehari-hari, kira-kira mana yang cocok untuk maggot?',
        'Apa yang terjadi jika kita salah memasukkan bahan ke wadah maggot?'
      ],
      keyTakeaway: 'Maggot hanya makan organik — tidak boleh dicampur plastik atau B3!'
    }
  },

  'SC-MAGGOT-GAME': {
    id: 'SC-MAGGOT-GAME',
    title: 'Mini Game: Budidaya Maggot',
    category: 'minigame',
    act: 2,
    background: 'kebun',
    miniGameType: 'maggot',
    nextSceneId: 'SC-MAGGOT-OUTRO',
    dialogues: [],
    facilitatorGuide: {
      objective: 'Mensimulasikan proses budidaya maggot secara interaktif.',
      discussionPrompts: [
        'Pilih bahan organik yang benar, isi wadah, percepat pertumbuhan, lalu panen!',
        'Maggot bisa diberi ke kandang ayam atau kolam ikan warga.'
      ],
      keyTakeaway: 'Proses budidaya maggot: pilih bahan → isi wadah → tumbuh → panen → distribusi ternak.'
    }
  },

  'SC-MAGGOT-OUTRO': {
    id: 'SC-MAGGOT-OUTRO',
    title: 'Hasil Budidaya Maggot',
    category: 'story',
    act: 2,
    background: 'chickens_maggot_real_bg',
    nextSceneId: 'SC-010',
    dialogues: [
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'proud',
        text: 'Hebat! Kalian berhasil budidaya maggot! Maggot ini sekarang jadi makanan ayam dan ikan warga, gratis! 🐔🐟'
      },
      {
        speaker: 'Dika',
        character: 'dika',
        expression: 'happy',
        text: 'Jadi sampah sisa makanan yang tadi bau, sekarang jadi makanan buat ternak? Keren banget!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'proud',
        text: 'Kita berhasil mengubah masalah jadi hal yang berguna! Sampah sisa makanan jadi makanan ternak — desa jadi lebih makmur! 🌱'
      },
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'happy',
        text: 'Sekarang lanjut! Sampah sisa makanan bisa juga jadi pupuk. Dan sampah plastik dari bank sampah bisa kita manfaatkan juga! ♻️'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengapresiasi hasil budidaya maggot dan menghubungkannya dengan ketahanan pangan.',
      discussionPrompts: [
        'Berapa banyak pakan ternak yang bisa dihemat jika semua sampah organik dibudidayakan maggot?',
        'Apa manfaat lain dari maggot selain pakan ternak?'
      ],
      keyTakeaway: 'Maggot = solusi sampah organik + ketahanan pangan desa secara bersamaan!'
    }
  },

  'SC-010': {
    id: 'SC-010',
    title: 'Keputusan: Penggunaan Kas PKK',
    category: 'decision',
    act: 3,
    background: 'toko',
    dialogues: [
      {
        speaker: 'Ibu PKK',
        character: 'ibu_pkk',
        expression: 'thinking',
        text: 'Anak-anak, dari hasil jual sampah plastik, tabungan PKK kita sudah terkumpul Rp 50.000. Menurut kalian, uang ini enaknya dipakai buat apa ya? 🤔'
      }
    ],
    choices: [
      {
        id: 'c2_permen',
        label: 'BELI PERMEN & JAJANAN 🍬🍿',
        description: 'Membeli permen, snack, dan minuman manis untuk dinikmati bersama.',
        icon: '🍬',
        nextSceneId: 'SC-011A',
        indicatorImpact: {},
        isConsumptiveChoice: true,
      },
      {
        id: 'c2_bibit',
        label: 'BELI BIBIT SAYUR 🌱',
        description: 'Membeli bibit cabai & tomat untuk ditanam di kebun desa.',
        icon: '🌱',
        nextSceneId: 'SC-011B',
        indicatorImpact: { ekonomi: 30, pangan: 40, kemandirian: 20 }
      }
    ],
    facilitatorGuide: {
      objective: 'Membedakan pengeluaran konsumtif (jajan) vs investasi produktif (bibit).',
      discussionPrompts: [
        'Klik pilihan A atau B langsung pada layar kelas!',
        'Tanyakan: Jika dibelikan permen & jajan, apa yang terjadi besok?',
        'Jika dibelikan bibit, apa yang akan tumbuh minggu depan?'
      ],
      keyTakeaway: 'Kas PKK lebih baik diputar untuk investasi produktif desa!'
    }
  },


  'SC-011A': {
    id: 'SC-011A',
    title: 'Konsekuensi: Membeli Permen & Jajanan',
    category: 'story',
    act: 3,
    background: 'toko',
    nextSceneId: 'SC-010', // Loop back to decision SC-010
    skipTypewriter: true,
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Nyam... nyam... Permen dan snack-nya enak banget! Tapi aduh...'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'sad',
        text: 'Uang Rp 50.000 kita langsung habis, dan malah nambah tumpukan bungkus plastik snack di mana-mana! 😱'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'sad',
        text: 'Kebun desa tetap kosong, dan jalanan jadi kotor lagi karena bungkus jajanan...'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Yuk kita ulang dan pilih opsi yang lebih bijak (Beli Bibit Sayur)!'
      }
    ],
    facilitatorGuide: {
      objective: 'Refleksi konsekuensi keputusan konsumtif dan generasi sampah bungkus makanan.',
      discussionPrompts: [
        'Apa yang dirasakan setelah uang habis dan sampah bungkus plastik menumpuk lagi?',
        'Ajak kelas memilih "Beli Bibit Sayur" agar desa bisa maju.'
      ],
      keyTakeaway: 'Uang yang dihabiskan untuk jajan tidak dapat berkembang dan menghasilkan sampah baru.'
    }
  },

  'SC-011B': {
    id: 'SC-011B',
    title: 'Membeli Bibit Tanaman',
    category: 'story',
    act: 3,
    background: 'kebun',
    nextSceneId: 'SC-012',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Pilihan hebat! 🌟 Kita berhasil membeli 5 kantong bibit sayuran segar dan unggul!'
      },
      {
        speaker: 'Pak Tani',
        character: 'pak_tani',
        expression: 'happy',
        text: 'Selamat datang anak-anak! Saya Pak Tani. Mari kita tanam bibit ini di tanah kebun yang sudah gembur.'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Yuk teman-teman, kita bantu Pak Tani menanam dan menyiram bibitnya!'
      }
    ],
    facilitatorGuide: {
      objective: 'Mempersiapkan proses bercocok tanam dan ketahanan pangan.',
      discussionPrompts: [
        'Tanaman membutuhkan apa saja untuk tumbuh? (Air, sinar matahari, tanah subur)',
        'Mari kita menuju lahan bercocok tanam!'
      ],
      keyTakeaway: 'Bibit adalah modal utama menuju ketahanan pangan desa.'
    }
  },

  'SC-012': {
    id: 'SC-012',
    title: 'Mini Game: Menanam Bibit',
    category: 'minigame',
    act: 3,
    background: 'kebun',
    miniGameType: 'planting',
    nextSceneId: 'SC-013',
    dialogues: [
      {
        speaker: 'Pak Tani',
        character: 'pak_tani',
        expression: 'happy',
        text: 'Pilih Kantung Bibit untuk menanam di lubang tanah, lalu ambil Gembor Air untuk menyiramnya! 🌱💦'
      }
    ],
    facilitatorGuide: {
      objective: 'Melatih langkah sederhana menanam (gali, tanam, siram).',
      discussionPrompts: [
        'Tanya siswa: Mengapa setelah ditanam harus disiram?',
        'Minta siswa menyebutkan tanaman yang sedang ditanam (Cabai, Tomat, Sawi).'
      ],
      keyTakeaway: 'Merawat tanaman membutuhkan ketelatenan dan kepedulian.'
    }
  },

  'SC-013': {
    id: 'SC-013',
    title: 'Menunggu Panen',
    category: 'story',
    act: 3,
    background: 'kebun_lebat',
    nextSceneId: 'SC-014',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Hari demi hari berganti... Siang ☀️ dan Malam 🌙 kita merawat kebun dengan tekun...'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'surprised',
        text: 'Lihat!! Tanaman cabai dan tomat kita tumbuh sangat tinggi, hijau, dan berbuah lebat! 🌶️🍅'
      },
      {
        speaker: 'Pak Tani',
        character: 'pak_tani',
        expression: 'proud',
        text: 'Saatnya kita melakukan panen raya bersama seluruh warga desa!'
      }
    ],
    facilitatorGuide: {
      objective: 'Memahami proses pertumbuhan tanaman hingga masa panen.',
      discussionPrompts: [
        'Ajak siswa bersorak gembira melihat hasil tanaman yang tumbuh!',
        'Jelaskan bahwa kesabaran bercocok tanam menghasilkan buah melimpah.'
      ],
      keyTakeaway: 'Usaha dan pemeliharaan yang baik menghasilkan panen melimpah.'
    }
  },

  'SC-014': {
    id: 'SC-014',
    title: 'Mini Game: Panen Hasil Tanam',
    category: 'minigame',
    act: 3,
    background: 'kebun_lebat',
    miniGameType: 'harvest',
    nextSceneId: 'SC-015',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Petik semua sayuran, cabai, dan tomat matang langsung dari pohon! Klik buah-buah yang ranum! 🧺'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengumpulkan hasil panen tanaman pangan desa.',
      discussionPrompts: [
        'Berapa banyak keranjang hasil panen yang berhasil kita dapatkan?',
        'Apa yang bisa kita lakukan dengan hasil panen ini?'
      ],
      keyTakeaway: 'Hasil panen adalah kekayaan sumber daya pangan desa.'
    }
  },

  'SC-015': {
    id: 'SC-015',
    title: 'Keputusan 2: Penjualan Hasil Panen',
    category: 'decision',
    act: 4,
    background: 'umkm',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Wah, hasil panen kita melimpah sekali! 🧺 Menurut teman-teman, hasil panen ini sebaiknya diapakan ya?'
      }
    ],
    choices: [
      {
        id: 'c3_umkm',
        label: 'DIJUAL KE UMKM BU RINA 🏪',
        description: 'Dijual ke UMKM olahan pangan lokal untuk dijadikan keripik & sambal botol.',
        icon: '🏪',
        nextSceneId: 'SC-016B',
        indicatorImpact: { ekonomi: 50, kemandirian: 40, pangan: 40 }
      },
      {
        id: 'c3_dimakan',
        label: 'DIMAKAN SENDIRI SEMUA 🍲',
        description: 'Dibagikan gratis untuk dimakan sendiri oleh warga tanpa dijual.',
        icon: '🍲',
        nextSceneId: 'SC-016A',
        indicatorImpact: {}
      }
    ],
    facilitatorGuide: {
      objective: 'Menghubungkan sektor pertanian dengan UMKM pengolahan pangan.',
      discussionPrompts: [
        'Klik A atau B langsung pada layar!',
        'Jika dijual ke UMKM Bu Rina: Apa produk olahan yang bisa dibuat Bu Rina?',
        'Jika dimakan sendiri habis: Apakah UMKM punya bahan baku untuk berjualan?'
      ],
      keyTakeaway: 'Sinergi petani dan UMKM menciptakan roda ekonomi sirkular yang kuat.'
    }
  },

  'SC-016A': {
    id: 'SC-016A',
    title: 'Hasil Panen Dimakan Sendiri',
    category: 'story',
    act: 4,
    background: 'sawah',
    nextSceneId: 'SC-015', // Loop back to decision SC-015
    skipTypewriter: true,
    dialogues: [
      {
        speaker: 'Warga',
        character: 'warga',
        expression: 'happy',
        text: 'Nyam... makanannya segar sekali! Semua warga kenyang hari ini. 😋'
      },
      {
        speaker: 'Bu Rina',
        character: 'bu_rina',
        expression: 'sad',
        text: 'Sayang sekali toko UMKM saya tidak punya bahan cabai dan tomat lokal, jadi toko terpaksa tutup sementara... 😔'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Warga memang kenyang hari ini, tapi desa tidak dapat uang baru dari hasil panen. Sayang kan?'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Yuk kita coba jual sebagian ke toko Bu Rina biar desa dapat uang juga!'
      }
    ],
    facilitatorGuide: {
      objective: 'Memahami pentingnya menjual sebagian hasil panen ke UMKM.',
      discussionPrompts: [
        'Apakah UMKM bisa tumbuh jika tidak ada pasokan bahan lokal?',
        'Mengapa sebagian hasil panen sebaiknya dijual ke UMKM?'
      ],
      keyTakeaway: 'Mengonsumsi seluruh hasil panen tanpa diolah UMKM membatasi pertumbuhan desa.'
    }
  },

  'SC-016B': {
    id: 'SC-016B',
    title: 'Dijual ke UMKM Bu Rina',
    category: 'story',
    act: 4,
    background: 'umkm',
    nextSceneId: 'SC-CRAFT-INTRO',
    dialogues: [
      {
        speaker: 'Bu Rina',
        character: 'bu_rina',
        expression: 'proud',
        text: 'Terima kasih anak-anak! Dari tomat dan cabai ini, toko kami bisa bikin Sambal Botol Desa dan Keripik Sayur Renyah! 🥫'
      },
      {
        speaker: 'Bu Rina',
        character: 'bu_rina',
        expression: 'happy',
        text: 'Sambal dan keripik ini laku dijual ke kota! Toko untung, Pak Tani dapat uang, dan warga dapat kerja!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'proud',
        text: 'Ini namanya saling bantu! Sampah jadi bersih, tanaman tumbuh, toko laku, semua warga senang! 🎉'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengenal konsep nilai tambah olahan UMKM dan ekonomi sirkular.',
      discussionPrompts: [
        'Mengapa harga sambal botol lebih mahal daripada cabai mentah? (Nilai tambah olahan UMKM)',
        'Bagaimana uang hasil UMKM membantu petani kembali membeli bibit?'
      ],
      keyTakeaway: 'Ekonomi sirkular: Sampah -> Bank Sampah -> Bibit -> Panen -> UMKM -> Kemandirian Desa!'
    }
  },

  'SC-CRAFT-INTRO': {
    id: 'SC-CRAFT-INTRO',
    title: 'Mengolah Limbah Plastik',
    category: 'story',
    act: 4,
    background: 'sampah_botol_real_bg',
    nextSceneId: 'SC-CRAFT-GAME',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'thinking',
        text: 'Oh iya Bu Rina! Di sudut UMKM ada banyak sekali botol plastik bekas kemasan yang menumpuk. Mau dikemanakan?'
      },
      {
        speaker: 'Bu Rina',
        character: 'bu_rina',
        expression: 'sad',
        text: 'Biasanya langsung kami buang atau dibakar, tapi asapnya membuat warga batuk-batuk... 😔'
      },
      {
        speaker: 'Dika',
        character: 'dika',
        expression: 'happy',
        text: 'Bagaimana kalau botol bekas ini kita daur ulang menjadi Pot Bunga Gantung Sadasari yang cantik? Warga pasti suka!'
      },
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Ide hebat, Dika! Ayo teman-teman kelas, mari kita buat pot bunga gantung yang indah dari botol bekas ini! 🌺'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengajak siswa peduli dengan limbah plastik di sekitar toko UMKM.',
      discussionPrompts: [
        'Apa dampak buruk jika botol plastik dibakar sembarangan?',
        'Siapa yang pernah membuat kerajinan dari botol bekas?'
      ],
      keyTakeaway: 'Limbah plastik harus dikelola dengan kreatif agar tidak mencemari udara.'
    }
  },

  'SC-CRAFT-GAME': {
    id: 'SC-CRAFT-GAME',
    title: 'Membuat Pot Bunga Gantung',
    category: 'minigame',
    act: 4,
    background: 'umkm',
    miniGameType: 'plastic_craft',
    nextSceneId: 'SC-CRAFT-OUTRO',
    dialogues: [],
    facilitatorGuide: {
      objective: 'Mempraktikkan langkah-langkah daur ulang botol plastik.',
      discussionPrompts: [
        'Ikuti langkah membersihkan, memotong, mencat, menghias, hingga menanam bunga!',
        'Ajak siswa memilih warna cat pot bersama-sama.'
      ],
      keyTakeaway: 'Proses daur ulang membutuhkan ketelitian dan kreativitas.'
    }
  },

  'SC-CRAFT-OUTRO': {
    id: 'SC-CRAFT-OUTRO',
    title: 'Hasil Karya Bermanfaat',
    category: 'story',
    act: 4,
    background: 'village_clean',
    nextSceneId: 'SC-QUIZ',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Lihat! Pot gantung kita sudah selesai dihias dan bunganya tumbuh sangat cantik! 🌸'
      },
      {
        speaker: 'Dika',
        character: 'dika',
        expression: 'proud',
        text: 'Wah, halaman desa kita sekarang jadi indah sekali karena dihiasi pot-pot gantung warna-warni ini!'
      },
      {
        speaker: 'Bu Rina',
        character: 'bu_rina',
        expression: 'happy',
        text: 'Hebat sekali! Selain mempercantik desa, pot gantung ini laku dijual seharga Rp 5.000 per buah! Ini menambah manfaat ekonomi desa kita! 💰'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengapresiasi hasil karya daur ulang siswa.',
      discussionPrompts: [
        'Bagaimana rasanya mengubah sampah plastik yang kotor menjadi pot bunga indah?',
        'Berapa harga jual pot bunga yang kita buat?'
      ],
      keyTakeaway: 'Kreativitas daur ulang memberikan nilai estetika dan manfaat finansial.'
    }
  },

  'SC-017': {
    id: 'SC-017',
    title: 'Ringkasan Perjalanan Kelas',
    category: 'story',
    act: 4,
    background: 'village_clean',
    nextSceneId: 'SC-018',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'proud',
        text: 'Hebat sekali teman-teman! Kita sudah menyelesaikan kuis dan sekarang mari kita lihat ringkasan perjalanan kita dari awal sampai sekarang! 🌟'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengingat kembali semua yang sudah dipelajari dari awal sampai akhir.',
      discussionPrompts: [
        'Ajak kelas melihat 4 batang indikator yang sudah terkumpul.',
        'Siapkan pengumuman status akhir Desa Sadasari!'
      ],
      keyTakeaway: 'Setiap pilihan kelas membentuk masa depan Desa Sadasari.'
    }
  },

  'SC-QUIZ': {
    id: 'SC-QUIZ',
    title: 'Kuis Interaktif Sadasari',
    category: 'minigame',
    act: 4,
    background: 'village_clean',
    miniGameType: 'quiz',
    nextSceneId: 'SC-017',
    dialogues: [
      {
        speaker: 'Yanti',
        character: 'yanti',
        expression: 'happy',
        text: 'Nah, sekarang saatnya kita tes pengetahuan kita! Siapa yang masih ingat apa yang sudah kita pelajari? Semangat ya! 🌟'
      }
    ],
    facilitatorGuide: {
      objective: 'Menguji dan memperkuat pemahaman siswa mengenai materi pengelolaan sampah.',
      discussionPrompts: [
        'Bacakan setiap pertanyaan kuis ke seluruh kelas.',
        'Minta siswa melakukan voting tunjuk tangan sebelum memilih jawaban.'
      ],
      keyTakeaway: 'Kuis interaktif melatih ingatan dan pemahaman siswa.'
    }
  },

  'SC-018': {
    id: 'SC-018',
    title: 'Ending Desa Sadasari',
    category: 'ending',
    act: 4,
    background: 'village_clean',
    nextSceneId: 'SC-019',
    dialogues: [],
    facilitatorGuide: {
      objective: 'Menampilkan pencapaian status Desa Mandiri dan memberikan apresiasi.',
      discussionPrompts: [
        'Berikan tepuk tangan meriah untuk seluruh siswa pahlawan desa!',
        'Ajak siswa melihat perubahan indikator akhir.'
      ],
      keyTakeaway: 'Selamat! Kelas berhasil membawa perubahan positif bagi Desa Sadasari!'
    }
  },

  'SC-019': {
    id: 'SC-019',
    title: 'Refleksi & Diskusi Kelas',
    category: 'reflection',
    act: 4,
    background: 'village_clean',
    dialogues: [],
    facilitatorGuide: {
      objective: 'Memimpin diskusi refleksi akhir (5 menit) sesuai Indikator Keberhasilan PRD.',
      discussionPrompts: [
        '1. Mengapa sampah harus dipilah sebelum dibuang?',
        '2. Apa manfaat Bank Sampah bagi warga desa?',
        '3. Mengapa membeli bibit lebih bermanfaat daripada membakar uang untuk permen?',
        '4. Mengapa UMKM membutuhkan hasil pertanian lokal?'
      ],
      keyTakeaway: 'Siswa paham ekonomi sirkular, memilah sampah, dan kemandirian desa.'
    }
  }
};
