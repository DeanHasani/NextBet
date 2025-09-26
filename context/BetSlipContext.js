"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BetSlipContext = createContext();

export function BetSlipProvider({ children }) {
    const [betSlip, setBetSlip] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("betSlip") || "[]");
        setBetSlip(stored);
    }, []);

    useEffect(() => {
        localStorage.setItem("betSlip", JSON.stringify(betSlip));
    }, [betSlip]);

    const addToSlip = (bet) => {
        setBetSlip((prev) => {
            const exists = prev.find(
                (b) => b.id === bet.id && b.selection === bet.selection
            );
            if (!exists) return [...prev, bet];
            return prev;
        });
    };

    const removeFromSlip = (id, selection) => {
        setBetSlip((prev) =>
            prev.filter((b) => !(b.id === id && b.selection === selection))
        );
    };

    return (
        <BetSlipContext.Provider value={{ betSlip, addToSlip, removeFromSlip }}>
            {children}
        </BetSlipContext.Provider>
    );
}

export const useBetSlip = () => useContext(BetSlipContext);
