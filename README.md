# Calendar Application for Communication Tracking

## Project Overview

The Calendar Application for Communication Tracking is a React-based tool designed to help organizations maintain and manage their interactions with various companies. It provides a centralized platform to log past interactions, plan future communications, and manage engagement frequency based on predefined schedules. The application comprises three main modules:

1. **Admin Module**: Allows administrators to configure companies and set communication parameters.
2. **User Module**: Enables users to visualize, manage, and perform communication tasks.
3. **Reporting and Analytics Module** (Optional): Provides actionable insights based on communication data.

## Features

### Admin Module

- **Company Management**: Add, edit, and delete company information, including name, location, LinkedIn profile, emails, phone numbers, comments, and communication periodicity.
- **Communication Method Management**: Define available communication methods with attributes like name, description, sequence, and mandatory flag.

### User Module

- **Dashboard**: View a grid of companies with details such as company name, last five communications, and next scheduled communication.
- **Color-Coded Highlights**: Visual indicators for overdue (red) and due today (yellow) communications.
- **Interactive Features**: Hover effects displaying notes or comments for completed communications.
- **Communication Actions**: Log new communications by selecting companies and specifying communication type, date, and notes.
- **Notifications**: Dedicated sections for overdue and today's communications, with badge counts.
- **Calendar View**: Interface to view past communications and manage upcoming ones.

## Requirements

Before deploying the application, ensure that the following prerequisites are installed on your system:

- **Node.js**: A JavaScript runtime environment. Download and install the latest version from [nodejs.org](https://nodejs.org/).
- **npm**: Node.js package manager, typically installed alongside Node.js.
- **Git**: Version control system to clone the repository. Download and install from [git-scm.com](https://git-scm.com/).

## Deployment Instructions

Follow these steps to deploy the application:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Pranay898/Calender_based_app_ENTNT.git
   cd Calender_based_app_ENTNT
