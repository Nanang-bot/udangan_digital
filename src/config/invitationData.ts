import type { InvitationData } from '../types/invitation';

export const invitationData: InvitationData = {
  groom: {
    name: "Jams",
    parents: {
      father: "Bapak lorem ipsum",
      mother: "Ibu lorem ipsum"
    },
    order: "Putra ke-1"
  },
  bride: {
    name: "Liber",
    parents: {
      father: "Bapak lorem ipsum",
      mother: "Ibu lorem ipsum"
    },
    order: "Putri ke-2"
  },
  weddingDate: "2026-10-10T09:00:00",
  akad: {
    date: "Sabtu, 10 Juni 2026",
    time: "10.00 WIB - Selesai",
    location: {
      address: "DESA TULO KEC DOLO, KAB. SIGI, SULAWESI TENGAH, SIGI, DOLO, TULO",
      mapsUrl: "https://goo.gl/maps/ALZR6FJZU3kxVwN86"
    }
  },
  resepsi: {
    date: "Sabtu, 10 Juni 2026",
    time: "13.00 WIB - Selesai",
    location: {
      address: "DESA TULO KEC DOLO, KAB. SIGI, SULAWESI TENGAH, SIGI, DOLO, TULO",
      mapsUrl: "https://goo.gl/maps/ALZR6FJZU3kxVwN86"
    }
  },
  stories: [
    {
      id: 1,
      title: "💼 Awal Pertemuan Sederhana",
      date: "Januari 2026",
      content: "Pada Januari 2026, Jams, seorang programmer berusia 28 tahun, bertemu Liber, copywriter yang dikenal cerdas dan pendiam, dalam proyek pengembangan aplikasi perusahaan. Interaksi mereka di ruang rapat terbatas pada urusan kerja, penuh adab dan profesional."
    },
    {
      id: 2,
      title: "💞 Benih Cinta dalam Ujian",
      date: "Februari 2026",
      content: "Memasuki Februari 2026, proyek mereka menghadapi krisis. Di tengah tekanan, Liber tampil dengan solusi kreatif yang menyelamatkan proyek, membuat Jams terkesan dengan ketenangan dan kecerdasannya."
    },
    {
      id: 3,
      title: "💍 Langkah Menuju Ridha Allah",
      date: "Maret 2026",
      content: "Proses taaruf berjalan penuh keikhlasan. Setelah istikharah dan mendapat restu keluarga, Jams melamar Liber dalam acara sederhana namun penuh makna."
    }
  ],
  bankAccounts: [
    {
      name: "Liber",
      accountNumber: "1234567891234",
      bankName: "Bank Central Asia",
      type: "transfer"
    },
    {
      name: "Jams",
      accountNumber: "0812345678",
      bankName: "Qris / E-Wallet",
      type: "qris",
      qrCodeUrl: "assets/images/donate.png"
    },
    {
      name: "Jams",
      accountNumber: "0812345678",
      bankName: "Kirim Hadiah",
      type: "gift",
      address: "Palu"
    }
  ],
  musicUrl: "assets/music/pure-love-304010.mp3",
  theme: {
    primary: "#8573F1",
    secondary: "#7A5CD9"
  }
};
