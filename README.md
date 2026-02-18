# Croper CRUD - Frontend Angular

![Angular](https://img.shields.io/badge/Angular-21.1.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Signals](https://img.shields.io/badge/Angular-Signals-FFD700?style=for-the-badge&logo=angular&logoColor=black)

**Croper CRUD** is a state-of-the-art frontend application built with Angular v21, focusing on performance, scalability, and a premium user experience. It serves as a comprehensive administrative and marketplace platform for the agricultural sector.

---

## 🚀 Key Features

- **🛍️ Marketplace:** Dynamic product listing with optimized image loading using `NgOptimizedImage`.
- **🔐 Advanced Authentication:**
  - Secure Login & Registration.
  - Role-based Access Control (RBAC) with Admin and Public guards.
  - Session persistence across page refreshes.
  - SSR-ready authentication management.
- **📊 Admin Dashboard:**
  - Comprehensive Management of Users and Products.
  - Real-time metrics and system overview.
- **⚡ Reactive Architecture:**
  - Built 100% with **Angular Signals** for granular reactivity.
  - State management powered by lightweight stores.
  - Zoneless-ready approach for maximum performance.
- **🎨 Premium UI/UX:**
  - Responsive design using **Tailwind CSS v4**.
  - Harmonious color palettes and modern typography.
  - Micro-animations and smooth transitions.
  - Fully accessible (WCAG AA compliant).

---

## 🛠️ Technology Stack

- **Core:** [Angular v21](https://angular.dev/) (Signals, Standalone Components, `httpResource`).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/).
- **State Management:** Custom Signal-based stores (Lightweight & Reactive).
- **Architecture:** [SSR (Server-Side Rendering)](https://angular.dev/guide/ssr) enabled for better SEO and initial load.
- **Forms:** [Angular Signal Forms](https://angular.dev/guide/forms/signals) (Reactive approach).
- **Tooling:** PNPM, ESLint, Prettier, Husky & Lint-staged.

---

## 📂 Project Structure

```bash
src/app
├── core           # Singleton services, guards, interceptors, and global state
│   ├── auth       # Authentication logic and session management
│   ├── store      # Reactive stores for users and products
│   └── services   # API communication (HttpClient & httpResource)
├── domain         # Business logic: Models, DTOs, and Enums
├── features       # Functional modules (Auth, Dashboard, Catalog)
├── layouts        # Main application shells (Admin, Public)
└── shared         # Reusable components and pages (Header, Footer, Modals)
```

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [PNPM](https://pnpm.io/) (v10 recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alexcoronell/croper-crud-frontend-angular.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm start
   ```

The application will be available at `http://localhost:4200`.

---

## 📜 Available Scripts

- `pnpm start`: Run the development server.
- `pnpm build`: Generate a production-ready bundle.
- `pnpm lint`: Run ESLint to analyze code quality.
- `pnpm format`: Format the codebase using Prettier.
- `pnpm test`: Execute unit tests with Vitest/Karma.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

Developed with ❤️ for the agricultural digital transformation.
