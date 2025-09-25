"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import BetCard from "@/components/BetCard";
import BetSlip from "@/components/BetSlip";
import { betsData } from "@/utils/bets";

export default function SportBetsPage() {
  const { sport } = useParams();
  const [betSlip, setBetSlip] = useState([]);
  const sportBets = betsData[sport] || [];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("betSlip") || "[]");
    setBetSlip(stored);
  }, []);

  const addToSlip = (bet) => {
    setBetSlip((prev) => {
      const exists = prev.find(
        (b) => b.id === bet.id && b.selection === bet.selection
      );
      if (!exists) {
        const updated = [...prev, bet];
        localStorage.setItem("betSlip", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const removeFromSlip = (id, selection) => {
    const updated = betSlip.filter(
      (b) => !(b.id === id && b.selection === selection)
    );
    setBetSlip(updated);
    localStorage.setItem("betSlip", JSON.stringify(updated));
  };

  const sportName = sport ? sport.charAt(0).toUpperCase() + sport.slice(1) : "";

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-3 text-white">
          Available {sportName} Bets
        </h2>
        <div className="flex flex-wrap gap-4">
          {sportBets.map((bet) => (
            <BetCard key={`${sport}-${bet.id}`} bet={bet} addToSlip={addToSlip} />
          ))}
        </div>
        <BetSlip slip={betSlip} removeFromSlip={removeFromSlip} />
      </main>
    </>
  );
}
