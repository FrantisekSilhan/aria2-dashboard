import { useState } from "react";

export function useAria2Rpc(rpcUrl: string) {
  const [error, setError] = useState<string | null>(null);

  const call = async (method: string, params: unknown[] = []) => {
    setError(null);
    try {
      const response = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Date.now(),
          method,
          params,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        return null;
      }
      return data.result;
    } catch (err: unknown) {
      const error = err as { message: string };
      setError(error.message);
      return null;
    }
  };

  return { call, error };
}
