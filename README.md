# COLLABRATIVE-TODO-24A95A0517

A feature-rich, collaborative Todo application built with **React**, **Tailwind CSS**, and **Vite**. This project demonstrates advanced state management using the **React Context API**, optimized rendering, and per-user task management using `localStorage`.

---



## **Overview**

This application allows multiple users to manage their own tasks and todo lists. It demonstrates:

- Complex state management with **React Context API**  
- Optimistic updates for instant UI feedback  
- Fully responsive UI using **Tailwind CSS**  
- Theme switching (light/dark mode)  
- Nested tasks and tagging  
- Simulated real-time collaboration (within the browser)  

---

## **Features**

### **User Authentication**
- Mock login/logout system  
- Protected routes; unauthenticated users cannot access dashboard  
- User-specific task storage

### **Task Management**
- Create, update, delete todo lists  
- Add, edit, complete, and delete tasks  
- Support for nested subtasks  
- Assign tags or categories to tasks  

### **Collaboration**
- Simulated collaboration using **per-user storage**  
- Global activity log (optional: filtered per user)  

---

## **Tech Stack**

- **Frontend:** React 18, Vite  
- **State Management:** React Context API, useReducer, custom hooks  
- **Styling:** Tailwind CSS  
- **Icons:** Heroicons  
- **Storage:** Browser `localStorage` (per-user)  

---

## **Getting Started**

### **Installation**

```bash
# Clone repository
git clone https://github.com/LakshmiVisalakshi25/COLLABRATIVE-TODO-24A95A0517
cd collaborative-todo-app

# Install dependencies
npm install

# Start development server
npm run dev
