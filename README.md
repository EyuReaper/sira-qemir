# Sira Qemir - Task Management App

Sira Qemir (ሥራ ቀምር) is a modern task management web application built with React, Supabase, and Tailwind CSS. It features a glassmorphic UI, Amharic text, and a seamless user experience for managing tasks. Users must log in or register to access task functionality, with a focus on intuitive design and real-time task updates.

## Features

- **Authentication**: Secure login and registration using Supabase Auth (email/password).
- **Task Management**: Create, read, update, and delete (CRUD) tasks with real-time updates via Supabase.
- **Protected Routes**: Unauthenticated users are redirected to login; authenticated users access tasks and home page.
- **Glassmorphic UI**: Sleek, modern design with transparent, blurred backgrounds and smooth animations.
- **Amharic Localization**: Interface in Amharic (e.g., “ተግባራትን ጀምር” for "Start Tasks").
- **User Profile**: User icon in header with dropdown showing email and logout option.
- **Dark Mode**: Toggle between light and dark themes with an animated switch (stars/clouds).
- **Responsive Design**: Mobile-friendly navigation and layout.
- **Error Handling**: Robust error boundaries for task loading failures.
- **Real-Time Updates**: Task changes sync instantly using Supabase subscriptions.

## Tech Stack

- **Frontend**: React 18, React Router 6
- **Backend**: Supabase (Authentication, PostgreSQL)
- **Styling**: Tailwind CSS (glassmorphism, gradient background)
- **Build Tool**: Vite
- **Language**: JavaScript, JSX
- **Localization**: Amharic text

## Prerequisites

- **Node.js**: v18 or higher (node -v to check)
- **npm**: v9 or higher (npm -v to check)
- **Supabase Account**: Sign up at Supabase Dashboard
- **Git**: For cloning the repository

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/sira-qemir.git
   cd sira-qemir/client