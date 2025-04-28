"use client";
import { useState } from "react";

interface RpcManagerProps {
  rpcUrls: string[];
  setRpcUrls: (urls: string[]) => void;
  current: string;
  setCurrent: (url: string) => void;
}

export default function RpcManager({
  rpcUrls,
  setRpcUrls,
  current,
  setCurrent,
}: RpcManagerProps) {
  const [input, setInput] = useState("");

  const addUrl = () => {
    if (input && !rpcUrls.includes(input)) {
      setRpcUrls([...rpcUrls, input]);
      setCurrent(input);
      setInput("");
    }
  };

  const removeUrl = (url: string) => {
    const filtered = rpcUrls.filter((u) => u !== url);
    setRpcUrls(filtered);
    if (current === url && filtered.length > 0) setCurrent(filtered[0]);
    else if (filtered.length === 0) setCurrent("");
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow flex flex-col gap-2 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1 text-gray-700"
          placeholder="Add aria2c RPC URL (e.g. http://localhost:6800/jsonrpc)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
          onClick={addUrl}
        >
          {"Add"}
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {rpcUrls.map((url) => (
          <div
            key={url}
            className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer ${
              current === url
                ? "bg-blue-100 border border-blue-400"
                : "bg-gray-100"
            }`}
            onClick={() => setCurrent(url)}
          >
            <span className="truncate max-w-xs text-gray-700">{url}</span>
            <button
              className="text-red-500 hover:text-red-700 ml-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removeUrl(url);
              }}
            >
              {"×"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
