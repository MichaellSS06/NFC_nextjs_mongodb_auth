"use client";

import alertaService from "@/services/alertas";
import { useState, useEffect, useCallback } from "react";

export function useAlertas() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlertas = useCallback(async () => {
    setLoading(true);
    try {
      const res = await alertaService.getAll();
      setAlertas(res);
    } catch (error) {
      console.error("Error al cargar alertas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlertas();
  }, [fetchAlertas]);

  return { alertas, loading, fetchAlertas };
}