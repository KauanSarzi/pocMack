import '../styles/globals.css';

export const metadata = {
  title: 'Next.js App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}