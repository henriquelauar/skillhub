import { useState, useEffect } from "react";
import axios from "axios";
import { useErrorHandler } from "./useErrorHandler";
import { Match } from "../types";

export function useMatches(tipo: "pendentes" | "enviados" | "recebidos" | "aceitos") {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = useErrorHandler();

  useEffect(() => {
    async function fetchMatches() {
      if (!tipo) {
        const msg = "Tipo de match não especificado.";
        console.error(msg);
        setError(msg);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get<Match>(`/matches/${tipo}`);
        
        if (!response.data || !Array.isArray(response.data)) {
          const msg = `Resposta inesperada da API ao buscar matches do tipo "${tipo}".`;
          console.error(msg, response.data);
          setError(msg);
          return;
        }

        setMatches(response.data);
      } catch (err) {
        const msg = `Erro ao buscar matches do tipo "${tipo}".`;
        console.error(msg, err);
        setError(msg);
        handleError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, [tipo, handleError]);

  return { matches, loading, error };
}
