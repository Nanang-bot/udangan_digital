export interface Person {
  name: string;
  parents: {
    father: string;
    mother: string;
  };
  order: string; // e.g., "Putra ke-1"
}

export interface EventDetails {
  date: string; // ISO format or human readable
  time: string; // e.g., "10.00 WIB - Selesai"
  location: {
    address: string;
    mapsUrl: string;
  };
}

export interface StoryEvent {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface BankAccount {
  name: string;
  accountNumber: string;
  bankName: string;
  type: 'transfer' | 'qris' | 'gift';
  phoneNumber?: string;
  qrCodeUrl?: string;
  address?: string;
}

export interface Comment {
  id: string;
  name: string;
  text: string;
  presence: '0' | '1' | '2'; // 0: Select, 1: Present, 2: Absent
  date: string;
}

export interface InvitationData {
  groom: Person;
  bride: Person;
  weddingDate: string; // For countdown
  akad: EventDetails;
  resepsi: EventDetails;
  stories: StoryEvent[];
  bankAccounts: BankAccount[];
  musicUrl: string;
  theme: {
    primary: string;
    secondary: string;
  };
}
