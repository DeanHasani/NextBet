// components/BetSlip.js
"use client";
import { useEffect, useState } from "react";

export default function BetSlip({ slip, removeFromSlip }) {
  const [stake, setStake] = useState(10);
  const [totalOdds, setTotalOdds] = useState(0);
  const [potentialWin, setPotentialWin] = useState(0);

  useEffect(() => {
    if (slip.length === 0) {
      setTotalOdds(0);
      setPotentialWin(0);
      localStorage.setItem("betSlip", JSON.stringify(slip));
      return;
    }

    // Multiply selected odds for multi-bet
    const odds = slip.reduce((acc, bet) => acc * bet.selectedOdds, 1);
    setTotalOdds(odds);
    setPotentialWin((odds * stake).toFixed(2));

    localStorage.setItem("betSlip", JSON.stringify(slip));
  }, [slip, stake]);

  return (
    <div className="bet-slip">
      <h3>Bet Slip</h3>
      {slip.length === 0 && <p>No bets added yet.</p>}

      {slip.map((bet) => (
        <div key={bet.id} className="mb-3 border-b border-gray-700 pb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold text-white">{bet.match}</span>
            <button
              onClick={() => removeFromSlip(bet.id)}
              className="text-red-400 hover:text-red-600 font-bold"
            >
              Remove
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="bg-gray-800 px-2 py-1 rounded text-white font-bold">
              {bet.selection}
            </span>
            <span className="text-green-400 font-bold">
              {bet.selectedOdds.toFixed(2)}
            </span>
          </div>
        </div>
      ))}

      {slip.length > 0 && (
        <div className="mt-4">
          <label className="block text-white font-semibold mb-1">
            Stake ($):
          </label>
          <input
            type="number"
            value={stake}
            onChange={(e) => setStake(Number(e.target.value))}
            className="w-full border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white mb-2"
          />
          <p className="text-white">
            Total Odds: <span className="font-bold text-green-400">{totalOdds.toFixed(2)}</span>
          </p>
          <p className="potential-win text-white">
            Potential Win: <span className="font-bold text-green-400">${potentialWin}</span>
          </p>
          <button className="mt-3 w-full bg-black border border-white text-white font-bold py-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-200">
            Place Bet
          </button>
        </div>
      )}
    </div>
  );
}
