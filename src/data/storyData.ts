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
        'Minta siswa duduk rapi dan bersiap petualangan Desa Sukamaju!',
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
    title: 'Perkenalan Windah',
    category: 'story',
    act: 1,
    background: 'village_dirty',
    nextSceneId: 'SC-004',
    dialogues: [
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'happy',
        text: 'Halo teman-teman semua! Namaku Windah, anak asli Desa Sukamaju! 👋'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'surprised',
        text: 'Wah, senang sekali hari ini kakak-kakak KKN sudah datang ke desa kami!'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'thinking',
        text: 'Tapi... sejujurnya, Desa Sukamaju sedang menghadapi masalah besar nih...'
      }
    ],
    facilitatorGuide: {
      objective: 'Memperkenalkan karakter Windah dan membangun keterikatan emosional.',
      discussionPrompts: [
        'Tanyakan kepada siswa: Siapa yang suka membantu teman?',
        'Siapkan perhatian siswa untuk menyimak masalah Desa Sukamaju.'
      ],
      keyTakeaway: 'Pendamping desa (Windah) akan memandu diskusi kelas.'
    }
  },

  'SC-004': {
    id: 'SC-004',
    title: 'Kondisi Desa Sukamaju',
    category: 'story',
    act: 1,
    background: 'village_dirty',
    nextSceneId: 'SC-005',
    dialogues: [
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'sad',
        text: 'Coba lihat sekeliling kita... Dulu desa ini sangat hijau dan bersih.'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'sad',
        text: 'Tapi sekarang sampah plastik berserakan di jalanan, kebun warga terbengkalai, dan UMKM kekurangan bahan.'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'surprised',
        text: 'Akibatnya warga jadi sedih dan desa kekurangan pendapatan. Kita harus berbuat sesuatu!'
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
        speaker: 'Windah',
        character: 'windah',
        expression: 'thinking',
        text: 'Teman-teman kelas, maukah kalian menjadi penasihatku dan membantu membersihkan Desa Sukamaju?'
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
        description: 'Coba tanya Windah lagi.',
        icon: '😅',
        nextSceneId: 'SC-005_loop',
        indicatorImpact: {}
      }
    ],
    facilitatorGuide: {
      objective: 'Mengajak siswa aktif menyetujui komitmen awal petualangan.',
      discussionPrompts: [
        'Lakukan voting tangan singkat: Siapa yang setuju membantu Windah sekarang?',
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
        speaker: 'Windah',
        character: 'windah',
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
    dialogues: [
      {
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
        expression: 'proud',
        text: 'Wahhh! Luar biasa! Jalanan desa sekarang kelihatan jauh lebih bersih dan asri! ✨'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'thinking',
        text: 'Tapi ingat, sampah yang kita kumpulkan tadi belum dipilah. Kalau langsung dibuang begitu saja, akan menumpuk di TPA.'
      },
      {
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
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
    title: 'Bank Sampah Pak Jaya',
    category: 'story',
    act: 2,
    background: 'bank_sampah',
    dialogPosition: 'right',
    nextSceneId: 'SC-010',
    dialogues: [
      {
        speaker: 'Pak Jaya',
        character: 'pak_jaya',
        expression: 'happy',
        text: 'Halo anak-anak hebat! Saya Pak Jaya pengelola Bank Sampah Desa Sukamaju. 🏦'
      },
      {
        speaker: 'Pak Jaya',
        character: 'pak_jaya',
        expression: 'proud',
        text: 'Karena kalian sudah memilah sampah anorganik dengan rapi, Bank Sampah membeli sampah botol dan kardus ini seharga Rp 50.000!'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'surprised',
        text: 'Horeee! 💰 Ternyata sampah yang dipilah mempunyai nilai ekonomi dan menghasilkan uang!'
      }
    ],
    facilitatorGuide: {
      objective: 'Mengenal konsep Bank Sampah dan nilai ekonomi dari barang bekas.',
      discussionPrompts: [
        'Siapa yang tahu apa itu Bank Sampah?',
        'Bagaimana sampah plastik bisa berubah menjadi modal uang Rp 50.000?'
      ],
      keyTakeaway: 'Sampah terpilah bukan lagi kotoran, melainkan tabungan ekonomi!'
    }
  },

  'SC-010': {
    id: 'SC-010',
    title: 'Keputusan 1: Penggunaan Uang',
    category: 'decision',
    act: 3,
    background: 'toko',
    dialogues: [
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'thinking',
        text: 'Kita sekarang punya uang Rp 50.000 dari Bank Sampah. Menurut teman-teman kelas, uang ini sebaiknya dipakai untuk apa ya? 🤔'
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
      keyTakeaway: 'Konsumsi memberikan kenikmatan sesaat, investasi membangun masa depan.'
    }
  },

  'SC-011A': {
    id: 'SC-011A',
    title: 'Konsekuensi: Membeli Permen & Jajanan',
    category: 'story',
    act: 3,
    background: 'toko',
    nextSceneId: 'SC-010', // Loop back to decision SC-010
    dialogues: [
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'happy',
        text: 'Nyam... nyam... Permen dan snack-nya enak banget! Tapi aduh...'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'sad',
        text: 'Uang Rp 50.000 kita langsung habis, dan malah menghasilkan tumpukan bungkus plastik snack di mana-mana! 😱'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'sad',
        text: 'Kebun desa tetap kosong, dan jalanan jadi kotor lagi...'
      },
      {
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
        expression: 'happy',
        text: 'Hari demi hari berganti... Siang ☀️ dan Malam 🌙 kita merawat kebun dengan tekun...'
      },
      {
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
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
        speaker: 'Windah',
        character: 'windah',
        expression: 'thinking',
        text: 'Warga memang kenyang sebentar, tetapi desa tidak mendapatkan pemasukan modal baru untuk perputaran UMKM.'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'happy',
        text: 'Yuk kita coba jual sebagian ke UMKM Bu Rina agar ekonomi desa berputar!'
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
    nextSceneId: 'SC-017',
    dialogues: [
      {
        speaker: 'Bu Rina',
        character: 'bu_rina',
        expression: 'proud',
        text: 'Terima kasih anak-anak! Dari tomat dan cabai ini, UMKM kami membuat Sambal Botol Desa dan Keripik Sayur Renyah! 🥫 Chips!'
      },
      {
        speaker: 'Bu Rina',
        character: 'bu_rina',
        expression: 'happy',
        text: 'Produk olahan ini laku keras dijual ke kota! UMKM untung, Pak Tani mendapat bayaran layak, dan warga mendapat pekerjaan!'
      },
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'proud',
        text: 'Inilah yang dinamakan Ekonomi Sirkular Berbasis UMKM! Semua pihak saling menguntungkan! 🎉'
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

  'SC-017': {
    id: 'SC-017',
    title: 'Rekap Perjalanan Kelas',
    category: 'story',
    act: 4,
    background: 'village_clean',
    nextSceneId: 'SC-018',
    dialogues: [
      {
        speaker: 'Windah',
        character: 'windah',
        expression: 'proud',
        text: 'Luar biasa teman-teman! Mari kita lihat rekapitulasi keputusan yang telah diambil oleh kelas kita!'
      }
    ],
    facilitatorGuide: {
      objective: 'Meningat kembali rantai keputusan dari awal hingga akhir.',
      discussionPrompts: [
        'Ajak kelas meninjau 4 indikator utama yang sudah terkumpul.',
        'Persiapkan pengumuman status akhir Desa Sukamaju!'
      ],
      keyTakeaway: 'Setiap pilihan kelas membentuk masa depan Desa Sukamaju.'
    }
  },

  'SC-018': {
    id: 'SC-018',
    title: 'Ending Desa Sukamaju',
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
      keyTakeaway: 'Selamat! Kelas berhasil membawa perubahan positif bagi Desa Sukamaju!'
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
