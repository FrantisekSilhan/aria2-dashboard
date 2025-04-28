"use client";
import { useState } from "react";

interface AddDownloadFormProps {
  onAdd: (url: string, dir?: string) => void;
}

export default function AddDownloadForm({ onAdd }: AddDownloadFormProps) {
  const [url, setUrl] = useState("");
  const [dir, setDir] = useState("");

  return (
    <form
      className="flex gap-2 flex-col max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (url) {
          onAdd(url, dir || undefined);
          setUrl("");
          setDir("");
        }
      }}
    >
      <input
        className="border rounded px-2 py-1 flex-1 text-gray-700"
        placeholder="Download URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        className="border rounded px-2 py-1 flex-1 text-gray-700"
        placeholder="Directory (optional)"
        value={dir}
        onChange={(e) => setDir(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer mx-auto"
        type="submit"
      >
        {"Add Download"}
      </button>
    </form>
  );
}
