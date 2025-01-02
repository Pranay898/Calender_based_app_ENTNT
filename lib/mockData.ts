import { Company, Communication, CommunicationMethod, User } from '@/types';

export const companies: Company[] = [
  {
    id: '1',
    name: 'BlueSky Industries',
    location: '82 18 Spring St, New York, NY 10012',
    linkedinProfile: 'https://linkedin.com/company/bluesky-industries',
    emails: ['contact@bluesky.com'],
    phoneNumbers: ['15550789'],
    comments: 'Key client in aerospace sector',
    communicationPeriodicity: 14,
    status: 'active',
  },
  {
    id: '2',
    name: 'Quantum Dynamics',
    location: '88 330 W Broadway, New York, NY 10013',
    linkedinProfile: 'https://linkedin.com/company/quantum-dynamics',
    emails: ['info@quantumdynamics.com'],
    phoneNumbers: ['15550789'],
    comments: 'Emerging player in quantum computing',
    communicationPeriodicity: 30,
    status: 'pending',
  },
  // Add more companies...
];

export const communications: Communication[] = [
  {
    id: '1',
    companyId: '1',
    type: 'Email',
    date: '2025-01-02',
    notes: 'Discussed Q1 projections',
  },
  {
    id: '2',
    companyId: '1',
    type: 'Visit',
    date: '2024-03-24',
    notes: 'On-site product demo',
  },
  // Add more communications...
];

export const communicationMethods: CommunicationMethod[] = [
  {
    id: '1',
    name: 'LinkedIn Post',
    description: 'Share content on company LinkedIn page',
    sequence: 1,
    mandatory: false,
    status: 'active',
  },
  {
    id: '2',
    name: 'LinkedIn Message',
    description: 'Direct message to company representatives',
    sequence: 2,
    mandatory: false,
    status: 'active',
  },
  {
    id: '3',
    name: 'Email',
    description: 'Email communication',
    sequence: 3,
    mandatory: true,
    status: 'active',
  },
  {
    id: '4',
    name: 'Phone Call',
    description: 'Voice call to company representatives',
    sequence: 4,
    mandatory: false,
    status: 'active',
  },
  {
    id: '5',
    name: 'Visit',
    description: 'In-person visit to company premises',
    sequence: 5,
    mandatory: false,
    status: 'active',
  },
];

export const users: User[] = [
  {
    id: '1',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@demo.com',
    name: 'Regular User',
    role: 'user',
  },
];

