"use client";

export interface Download {
  gid: string;
  status: string;
  totalLength: string;
  completedLength: string;
  downloadSpeed: string;
  files?: { path?: string; uris?: { uri: string }[] }[];
}

interface DownloadListProps {
  downloads: Download[];
  onPause: (gid: string) => void;
  onResume: (gid: string) => void;
  onRemove: (gid: string) => void;
}

export default function DownloadList({
  downloads,
  onPause,
  onResume,
  onRemove,
}: DownloadListProps) {
  if (!downloads.length)
    return <div className="text-gray-500">{"No downloads found."}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow text-gray-500">
        <thead>
          <tr>
            <th className="px-2 py-1">{"File"}</th>
            <th className="px-2 py-1">{"Directory"}</th>
            <th className="px-2 py-1">{"Status"}</th>
            <th className="px-2 py-1">{"Progress"}</th>
            <th className="px-2 py-1">{"Speed"}</th>
            <th className="px-2 py-1">{"Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {downloads.map((d) => (
            <tr key={d.gid} className="border-t">
              <td className="px-2 py-1 truncate max-w-xs text-gray-700">
                {d.files?.[0]?.path?.split("/").pop() ||
                  d.files?.[0]?.uris?.[0]?.uri ||
                  "N/A"}
              </td>
              <td className="px-2 py-1">
                {d.files?.[0]?.path
                  ? d.files[0].path.split("/").slice(0, -1).join("/")
                  : "-"}
              </td>
              <td className="px-2 py-1">{d.status}</td>
              <td className="px-2 py-1">
                {d.totalLength && parseInt(d.totalLength) > 0
                  ? `${(
                      (parseInt(d.completedLength) / parseInt(d.totalLength)) *
                      100
                    ).toFixed(1)}%`
                  : "0%"}
              </td>
              <td className="px-2 py-1">
                {d.downloadSpeed
                  ? `${(parseInt(d.downloadSpeed) / 1024).toFixed(1)} KB/s`
                  : "-"}
              </td>
              <td className="px-2 py-1 flex gap-1">
                {d.status === "active" ? (
                  <button
                    className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 cursor-pointer"
                    onClick={() => onPause(d.gid)}
                  >
                    {"Pause"}
                  </button>
                ) : d.status === "paused" ? (
                  <button
                    className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 cursor-pointer"
                    onClick={() => onResume(d.gid)}
                  >
                    {"Resume"}
                  </button>
                ) : null}
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                  onClick={() => onRemove(d.gid)}
                >
                  {"Remove"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
