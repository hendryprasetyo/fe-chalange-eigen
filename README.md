# Hend News - Frontend Challenge

**Hend News** adalah proyek Frontend Challenge yang dibangun menggunakan **React**, **TypeScript**, **Vite**, dan **Redux Toolkit**. Aplikasi ini berfungsi sebagai portal berita yang menyajikan informasi terkini secara modern, cepat, dan responsif.

![Preview](public/preview_web.png)

---

## 🚀 Tech Stack

- **React 19** + **Vite 6**
- **TypeScript**
- **Redux Toolkit** & `redux-persist`
- **React Router v7**
- **Ant Design 5**
- **Tailwind CSS**
- **Axios**
- **Vitest** & **React Testing Library** for testing

---

## 📦 Features

- Portal berita dengan tampilan modern dan clean
- Responsive & mobile-friendly UI
- State management menggunakan Redux Toolkit
- Routing dengan React Router v7
- Component-based architecture
- Lazy-loaded & image optimization ready
- SEO-ready dengan React Helmet Async
- Full testing setup dengan Vitest
- Error boundary untuk handling kesalahan global
- Siap untuk di-scale lebih lanjut

---

## 🧱 Scalable Architecture

Struktur kode dan dependensi dalam proyek ini telah disusun dengan arsitektur yang scalable. Artinya, kamu bisa dengan mudah menambahkan fitur lanjutan seperti:

- **Authentication & Authorization**
- **Role-based Access Control (RBAC)**
- **User Management**
- **Notification System**
- **CMS Integration**
- **PWA support**, dan lainnya

Konfigurasi seperti interceptor Axios, Redux middleware, dan struktur modular komponen sudah disiapkan agar pengembangan lebih lanjut menjadi efisien dan rapi.

---

## Available Scripts

- **`pnpm dev`**: Runs the application in development mode.
- **`pnpm build:preprod`**: Builds the application for preprod.
- **`pnpm build:production`**: Builds the application for production.
- **`pnpm preview`**: Previews the production build locally.
- **`pnpm lint`**: Lints the codebase using ESLint.
- **`pnpm format`**: Format the codebase using Prettier.
- **`pnpm prepare`**: Husky.
- **`pnpm test`**: Runs the test using vitest and jest.

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/hendryprasetyo/fe-chalange-eigen.git
cd fe-chalange-eigen

# Dengan pnpm (disarankan)
```bash
pnpm install
```

# Atau dengan npm
```bash
npm install
```


# Atau dengan yarn
```bash
yarn install
```

```bash
pnpm dev
```

Access the application at `http://localhost:3000`.

## Lazy Loading of Pages

This boilerplate includes an implementation of lazy loading for pages using React's `React.lazy` and `Suspense` to load page components on demand, improving application performance.

### Example Usage:

```javascript
import React, { Suspense } from 'react'
const LazyPage = React.lazy(() => import('./pages/LazyPage'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyPage />
    </Suspense>
  )
}
```