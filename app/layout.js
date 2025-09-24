import "../styles/globals.css"; 


export const metadata = {
  title: "Next Betting",
  description: "Interactive betting page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
