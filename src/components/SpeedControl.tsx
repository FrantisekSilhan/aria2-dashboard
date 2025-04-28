"use client";
import { useState } from "react";

export default function SpeedControl({ onSetSpeed }: { onSetSpeed: (speed: string) => void }) {
  const [speed, setSpeed] = useState("");

  return (
    <form
      className="flex gap-2 flex-col max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (speed) {
          onSetSpeed(speed);
          setSpeed("");
        }
      }}
    >
      <input
        className="border rounded px-2 py-1 flex-1 text-gray-700"
        placeholder="Max speed (e.g. 500K, 2M)"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
      />
      <button
        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 cursor-pointer mx-auto"
        type="submit"
      >
        {"Set Speed"}
      </button>
    </form>
  );
}
