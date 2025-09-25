import Link from "next/link";

export default function Header() {
  return (
    <header className="header flex justify-between items-center p-4">
      <h1 className="text-3xl font-bold text-white">Next Betting</h1>
      <nav className="space-x-4">
        <Link href="/football/bets" className="text-white hover:underline">
          Football
        </Link>
        <Link href="/basketball/bets" className="text-white hover:underline">
          Basketball
        </Link>
      </nav>
    </header>
  );
}
