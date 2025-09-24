export default function BetCard({ bet, addToSlip }) {
  return (
    <div className="bet-card">
      <div>
        <h3>{bet.match}</h3>
        <p>Odds: <span>{bet.odds}</span></p>
      </div>
      <button onClick={() => addToSlip(bet)}>Add Bet</button>
    </div>
  );
}
