# BLearn Frontend - Phase 1

## Project Overview

This repository contains the **Frontend UI Development** for the BLearn Learning Management System (Phase 1).

The objective of this project is to build a **pixel-perfect UI** based on the provided Figma design using React JS.

This repository is dedicated to **UI development only**.

---

# Technology Stack

- React JS
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Vite

---

# Project Scope

The frontend team is responsible only for implementing the UI based on the provided Figma designs.

The project will be developed **module-wise**, not screen-wise.

Modules included in this phase:

- Shared Layout
- Dashboard Module
- Course Module
- Assessment Module
- Lab Module
- Calendar Module

Each module may contain multiple related pages and reusable components.


# Out of Scope

The following are **NOT** included in this repository:

- API Integration
- Backend Development
- Authentication
- Database Connectivity
- Business Logic
- State Management
- Form Validation Logic
- Deployment

These will be implemented later by the Product Owner.

---

# Development Guidelines

- Follow the provided Figma design exactly.
- Create reusable React components.
- Keep the code clean and modular.
- Use Tailwind CSS for styling.
- Use dummy JSON data where required.
- Make the UI responsive.
- Avoid duplicate code.
- Write meaningful component names.

The frontend team is responsible for creating the project folder structure following React best practices.

# GitHub Workflow

## Branches

```
main
development
feature/*
```

### main

Contains only stable and approved code.

Do not push directly to this branch.

---

### development

Main working branch for the project.

All completed feature branches should be merged into this branch after review.

---

### feature branches

Every developer should create a separate feature branch.

Example:

```
feature/dashboard
feature/course-module
feature/assessment-module
feature/lab-module
feature/calendar-module
```

---

# Development Workflow

```
Clone Repository

↓

Checkout Development Branch

↓

Create Feature Branch

↓

Develop Assigned Module

↓

Commit Changes

↓

Push Feature Branch

↓

Create Pull Request

↓

Code Review

↓

Merge into Development Branch

↓

Testing

↓

Merge into Main
```

---

# Commit Message Format

Use meaningful commit messages.

Examples:

```
feat: completed dashboard UI

feat: completed course module

fix: responsive sidebar

refactor: reusable button component

style: improve spacing
```

---

# Pull Request Guidelines

Before creating a Pull Request, ensure:

- UI matches the Figma design
- Responsive layout
- No console errors
- Clean and reusable components
- No unnecessary files
- Dummy data only
- Code is tested locally

---

# Deliverables

The frontend team should deliver:

- React Project
- Responsive UI
- Pixel Perfect Implementation
- Reusable Components
- Clean Code Structure
- Dummy Data
- Proper Routing
- Updated GitHub Repository

---

# Important Notes

- Development is **module-based**, not screen-based.
- Multiple pages may share common components.
- Build reusable components wherever possible.
- Any feature outside the agreed project scope requires prior approval.

---

# Resources

- Figma Design: https://www.figma.com/design/jfxDP8o60NJtRxFtxN22FI/L-Backup?node-id=308-594&t=oSM9PgcokJsh3Ssg-1

- Project Owner: Saravanan S
