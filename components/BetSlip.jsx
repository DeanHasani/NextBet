"use client";
import { useEffect, useState } from "react";

export default function BetSlip({ slip, removeFromSlip }) {
  const [stake, setStake] = useState(10);
  const [totalOdds, setTotalOdds] = useState(0);
  const [potentialWin, setPotentialWin] = useState(0);

  useEffect(() => {
    const odds = slip.reduce((acc, bet) => acc * bet.odds, 1);
    setTotalOdds(odds);
    setPotentialWin((odds * stake).toFixed(2));
    localStorage.setItem("betSlip", JSON.stringify(slip));
  }, [slip, stake]);

  return (
    <div className="bet-slip">
      <h3>Bet Slip</h3>
      {slip.length === 0 && <p>No bets added yet.</p>}
      {slip.map((bet) => (
        <div key={bet.id} className="flex justify-between mb-2">
          <span>{bet.match}</span>
          <button onClick={() => removeFromSlip(bet.id)}>Remove</button>
        </div>
      ))}
      {slip.length > 0 && (
        <div>
          <label>Stake ($):</label>
          <input type="number" value={stake} onChange={(e) => setStake(Number(e.target.value))} />
          <p>Total Odds: <span>{totalOdds.toFixed(2)}</span></p>
          <p className="potential-win">Potential Win: <span>${potentialWin}</span></p>
          <button>Place Bet</button>
        </div>
      )}
    </div>
  );
}
