// src/app/layout.tsx (or /layout.tsx depending on structure)

import '../../public/styles/global.css'; // Ensure global styles are imported
import { ReactNode } from 'react';

export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
