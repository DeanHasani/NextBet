"use client"; import { useEffect, useState } from "react"; 
import Header from "../components/Header"; 
import BetCard from "../components/BetCard"; 
import BetSlip from "../components/BetSlip"; 
import { availableBets } from "../utils/bets"; 

export default function Page() { 
  const [betSlip, setBetSlip] = useState([]);
  
  useEffect(() => { 
    const stored = JSON.parse(localStorage.getItem("betSlip") || "[]"); 
    setBetSlip(stored); 
  }, []);
    
  const addToSlip = (bet) => { 
    if (!betSlip.find((b) => b.id === bet.id)) { 
      const updated = [...betSlip, bet]; 
      setBetSlip(updated); 
      localStorage.setItem("betSlip", JSON.stringify(updated)); 
    } 
  }; 
  
  const removeFromSlip = (id) => { 
    const updated = betSlip.filter((b) => b.id !== id); 
    setBetSlip(updated); localStorage.setItem("betSlip", JSON.stringify(updated)); 
  };
  
  return ( 
  <> 
  <Header /> 
  <main className="container mx-auto p-4">
  <h2 className="text-xl font-bold mb-3 text-white">Available Bets</h2>
  <div className="flex flex-wrap gap-4">
    {availableBets.map((bet) => (
      <BetCard key={bet.id} bet={bet} addToSlip={addToSlip} />
    ))}
  </div>
  <BetSlip slip={betSlip} removeFromSlip={removeFromSlip} />
</main>
  </> 
  ); 
}
