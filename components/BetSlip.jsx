"use client";
import { useEffect, useState } from "react";

export default function BetSlip({ slip, removeFromSlip }) {
  const [stake, setStake] = useState(10);
  const [totalOdds, setTotalOdds] = useState(0);
  const [potentialWin, setPotentialWin] = useState(0);
  const [betHistory, setBetHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const odds = slip.reduce((acc, bet) => acc * bet.selectedOdds, 1);
    setTotalOdds(odds);
    setPotentialWin((odds * stake).toFixed(2));
  }, [slip, stake]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("betHistory") || "[]");
    setBetHistory(history);
  }, []);

  const placeBet = () => {
    if (slip.length === 0) return;

    const newBet = {
      id: Date.now(),
      bets: slip,
      stake,
      totalOdds,
      potentialWin,
      status: "pending", 
    };

    const updatedHistory = [newBet, ...betHistory];
    setBetHistory(updatedHistory);
    localStorage.setItem("betHistory", JSON.stringify(updatedHistory));

    setMessage("Bet placed successfully! Waiting for matches...");
    setTimeout(() => setMessage(""), 3000);

    // Clear current slip
    localStorage.setItem("betSlip", JSON.stringify([]));
    slip.length = 0; // clear array
  };

  return (
    <div className="bet-slip bg-gray-900 text-white p-5 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-3 border-b border-gray-700 pb-2">
        Bet Slip
      </h3>

      {message && <p className="text-green-400 mb-2">{message}</p>}

      {slip.length === 0 && <p className="text-gray-400">No bets added yet.</p>}

      {slip.map((bet) => (
        <div
          key={`${bet.id}-${bet.selection}`}
          className="flex justify-between items-center mb-2 border-b border-gray-700 pb-1 shadow-sm"
        >
          <span>
            {bet.match} <span className="text-green-400">({bet.selection})</span>
          </span>
          <button
            onClick={() => removeFromSlip(bet.id, bet.selection)}
            className="text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      {slip.length > 0 && (
        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            Stake ($):
            <input
              type="number"
              value={stake}
              min="1"
              onChange={(e) => setStake(Number(e.target.value))}
              className="w-full mt-1 border border-gray-600 bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </label>

          <p>
            Total Odds:{" "}
            <span className="text-green-400 font-bold">{totalOdds.toFixed(2)}</span>
          </p>
          <p className="potential-win">
            Potential Win:{" "}
            <span className="text-green-400 font-bold">${potentialWin}</span>
          </p>

          <button
            onClick={placeBet}
            className="w-full mt-2 bg-black border border-white text-white font-bold py-2 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            Place Bet
          </button>
        </div>
      )}

      {/* Bet history */}
      {betHistory.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold mb-2">Your Bet History</h4>
          {betHistory.map((b) => (
            <div
              key={b.id}
              className="border border-gray-700 rounded p-2 mb-2 bg-gray-800"
            >
              <p className="font-semibold">
                Stake: ${b.stake} | Potential Win: ${b.potentialWin}
              </p>
              <p className="text-sm mb-1">
                Status:{" "}
                <span
                  className={
                    b.status === "won"
                      ? "text-green-400"
                      : b.status === "lost"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }
                >
                  {b.status}
                </span>
              </p>
              <ul className="text-sm list-disc pl-5">
                {b.bets.map((bet) => (
                  <li key={`${bet.id}-${bet.selection}`}>
                    {bet.match} ({bet.selection}) @ {bet.selectedOdds.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
