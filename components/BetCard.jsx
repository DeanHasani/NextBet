// components/BetCard.js
import React from "react";

export default function BetCard({ bet, addToSlip }) {
  const [team1, team2] = bet.match.split(" vs ");

  return (
    <div className="bet-card flex flex-col justify-between w-80 p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow mb-4 transition-transform hover:scale-105">
      {/* Match Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-lg">
          {team1} vs {team2}
        </h3>
      </div>

      {/* Odds buttons */}
      <div className="flex justify-between">
        {Object.keys(bet.odds).map((key) => (
          <button
            key={key}
            onClick={() =>
              addToSlip({
                ...bet,
                selection: key,
                selectedOdds: bet.odds[key],
              })
            }
            className="flex-1 mx-1 bg-black border border-white text-white px-2 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors duration-200"
          >
            {key}
            <div className="text-green-400 font-bold">
              {bet.odds[key].toFixed(2)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
