// src/hooks/useMatches.ts
import { useState, useEffect } from "react";
import axios from "axios";

export function useMatches(tipo: "pendentes" | "enviados" | "recebidos" | "aceitos") {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const response = await axios.get(`/matches/${tipo}`);
        setMatches(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [tipo]);

  return { matches, loading };
}
