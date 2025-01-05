# Communication Tracker

## Overview

Communication Tracker is a comprehensive web application designed to help businesses manage and track their communications with clients and partners. Built with Next.js and React, this application provides a user-friendly interface for logging, analyzing, and visualizing communication data.

## Features

- **Dashboard**: Get an overview of recent activities and key metrics.
- **Companies Management**: Add, edit, and delete company profiles.
- **Communication Logging**: Record various types of communications with companies.
- **Calendar View**: Visualize communications on a monthly calendar.
- **Analytics**: Generate insights from communication data with interactive charts.
- **Admin Panel**: Manage communication methods and company data (admin-only access).
- **Real-time Notifications**: Stay updated on overdue and upcoming communications.
- **Responsive Design**: Fully functional on both desktop and mobile devices.

## Tech Stack

- Next.js 13 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/your-username/communication-tracker.git
   cd communication-tracker
   \`\`\`

2. Install the dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Create a \`.env.local\` file in the root directory and add the following environment variables:
   \`\`\`
   NEXT_PUBLIC_API_URL=your_api_url_here
   \`\`\`

## Running the Application

To run the application in development mode:

\`\`\`
npm run dev
\`\`\`

The application will be available at \`http://localhost:3000\`.

To build the application for production:

\`\`\`
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
communication-tracker/
├── app/
│   ├── admin/
│   │   ├── companies/
│   │   └── methods/
│   ├── analytics/
│   ├── calendar/
│   ├── companies/
│   ├── dashboard/
│   └── login/
├── components/
│   ├── layout/
│   └── ui/
├── lib/
├── public/
├── styles/
├── types/
├── .env.local
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
\`\`\`

## Usage

1. Log in using the provided demo credentials or create a new account.
2. Navigate through the sidebar to access different features.
3. Use the Companies page to manage company profiles and log communications.
4. View scheduled and past communications on the Calendar page.
5. Check the Analytics page for insights and trends.
6. Admins can manage communication methods and perform advanced operations.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.


