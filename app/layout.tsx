import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Cazual',
  description: 'El espacio donde todo ocurre: conexiones, experiencias y comunidad.',
  metadataBase: new URL('https://www.cazual.com'),
  openGraph: {
    title: 'Cazual',
    description: 'Plataforma premium de descubrimiento, reputación y comunidad para adultos.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
