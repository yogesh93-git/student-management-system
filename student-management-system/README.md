# Campusly — Student Management System

A responsive React student management website built with Vite and React Router.

## Features
- Dashboard with campus summary cards, recent students and activity feed
- Student directory with search and status filters
- Add, edit and delete student records
- Student data persists in the browser using `localStorage`
- Export the currently filtered student list as CSV
- About page
- Custom 404 page for every unknown URL
- Responsive layout for desktop, tablet and mobile

## Requirements
- Node.js 18 or newer
- VS Code (or another code editor)

## Run locally
1. Extract `student-management-system.zip`.
2. Open the extracted `student-management-system` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Pages
- `/` — Dashboard
- `/students` — Student directory
- `/about` — About Campusly
- Any other URL — 404 page

## Notes
This is a front-end demo. Student records are saved in the browser on the device where they are created. There is no backend, login system, or shared database included.
