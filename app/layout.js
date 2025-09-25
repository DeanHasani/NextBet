// app/layout.js
import "../styles/globals.css"; 

export const metadata = {
  title: "Next Betting",
  description: "Interactive betting page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        {children}
      </body>
    </html>
  );
}
