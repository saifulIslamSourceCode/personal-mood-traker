# Mood Tracker UI

A clean, responsive React-based UI for a Mood Tracker web application. This frontend integrates with a Laravel backend and provides users a smooth experience to log, view, and manage daily moods.

---

## Features

### 🌐 User Authentication
- Register with phone number and password
- Login with phone and password
- Access only your own mood data after login
- Logout functionality

### 😊 Mood Entry (CRUD)
- Add one mood per day (e.g., Happy, Sad)
- Optional short note with each mood
- Prevent multiple mood entries per day
- Edit moods of any day
- Soft delete moods (hide instead of permanently deleting)

### 📜 Mood History Page
- Display past moods in newest-first order
- Filter moods by selected date ranges
- View moods as a table (timeline view optional)

### 📊 Weekly Mood Summary (Bar Chart)
- Visualize mood frequency for current week (Mon–Sun) using Chart.js
- Each mood displayed as a separate bar (e.g., 3 Happy, 2 Sad)

### 🗑️ Soft Delete & Restore
- Soft delete moods by hiding
- Option to restore previously deleted moods

### 🔥 Streak Badge
- Earn badges for logging moods 3 or more consecutive days

### ⭐ Bonus (Optional)
- Mood of the Month: shows most selected mood in last 30 days
- Export mood history as PDF

### 🎨 Design & UI
- Built with React and Bootstrap 5
- Responsive and mobile-friendly design
- Modals for adding and editing moods smoothly

---

## Screenshorts
![image](https://github.com/user-attachments/assets/b90890a0-4577-4ae4-bb60-b015374b906b)
![image](https://github.com/user-attachments/assets/edfe0668-665b-43c5-b046-7f029b56342e)
![image](https://github.com/user-attachments/assets/3aa3dc71-e7e7-4b42-b0f6-1f3fb41e17e9)




---

## Tech Stack

- **Frontend:** React, Bootstrap 5, Chart.js  
- **Backend:** Express.js  
- **Database:** MSSQL


---

## Setup Instructions

1. **Clone the repo:**

   ```bash
   git clone https://github.com/saifulIslamSourceCode/personal-mood-traker
