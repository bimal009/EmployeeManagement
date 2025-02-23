import "./globals.css";

export const metadata = {
  title: "Employee Management",
  description: "created By Bimal Pandey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
