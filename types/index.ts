export interface Company {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number;
  status: 'active' | 'inactive' | 'pending';
}

export interface Communication {
  id: string;
  companyId: string;
  type: string;
  date: string;
  notes: string;
}

export interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  mandatory: boolean;
  status: 'active' | 'inactive' | 'pending';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

