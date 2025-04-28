"use client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAria2Rpc } from "../../hooks/useAria2Rpc";
import RpcManager from "../../components/RpcManager";
import AddDownloadForm from "../../components/AddDownloadForm";
import DownloadList, { Download } from "../../components/DownloadList";
import SpeedControl from "../../components/SpeedControl";

interface GlobalStat {
  downloadSpeed: string;
  uploadSpeed: string;
  numActive: string;
  numWaiting: string;
  numStopped: string;
}

export default function DashboardPage() {
  const [rpcUrls, setRpcUrls] = useLocalStorage<string[]>("rpcUrls", []);
  const [currentRpc, setCurrentRpc] = useLocalStorage<string>("currentRpc", "");
  const { call, error } = useAria2Rpc(currentRpc);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [globalStat, setGlobalStat] = useState<GlobalStat | null>(null);

  useEffect(() => {
    if (!currentRpc) return;
    let timer: NodeJS.Timeout;
    const fetchData = async () => {
      const active = (await call("aria2.tellActive")) || [];
      const waiting = (await call("aria2.tellWaiting", [0, 50])) || [];
      const stopped = (await call("aria2.tellStopped", [0, 50])) || [];
      setDownloads([...active, ...waiting, ...stopped]);
      setGlobalStat(await call("aria2.getGlobalStat"));
      timer = setTimeout(fetchData, 2000);
    };
    fetchData();
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [currentRpc]);

  const handleAdd = async (url: string, dir?: string) => {
    const options = dir ? { dir } : undefined;
    await call("aria2.addUri", [[url], options]);
  };

  const handlePause = async (gid: string) => await call("aria2.pause", [gid]);
  const handleResume = async (gid: string) => await call("aria2.unpause", [gid]);
  const handleRemove = async (gid: string) => await call("aria2.remove", [gid]);
  const handleSetSpeed = async (speed: string) => {
    await call("aria2.changeGlobalOption", [{ "max-overall-download-limit": speed }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-700">
          aria2c Dashboard
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Manage multiple aria2c RPC endpoints, add downloads, control speed, and more!
        </p>
        <RpcManager
          rpcUrls={rpcUrls}
          setRpcUrls={setRpcUrls}
          current={currentRpc}
          setCurrent={setCurrentRpc}
        />
        {currentRpc ? (
          <>
            <div className="flex flex-col gap-4 mb-4 max-w-xl mx-auto">
              <AddDownloadForm onAdd={handleAdd} />
              <SpeedControl onSetSpeed={handleSetSpeed} />
            </div>
            {globalStat && (
              <div className="mb-4 flex gap-4 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">DL:</span>{" "}
                  {(parseInt(globalStat.downloadSpeed) / 1024).toFixed(1)} KB/s
                </div>
                <div>
                  <span className="font-semibold">UL:</span>{" "}
                  {(parseInt(globalStat.uploadSpeed) / 1024).toFixed(1)} KB/s
                </div>
                <div>
                  <span className="font-semibold">Active:</span> {globalStat.numActive}
                </div>
                <div>
                  <span className="font-semibold">Waiting:</span> {globalStat.numWaiting}
                </div>
                <div>
                  <span className="font-semibold">Stopped:</span> {globalStat.numStopped}
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
                Error: {error}
              </div>
            )}
            <DownloadList
              downloads={downloads}
              onPause={handlePause}
              onResume={handleResume}
              onRemove={handleRemove}
            />
          </>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Add and select an aria2c RPC endpoint to get started.
          </div>
        )}
        <footer className="mt-8 text-center text-xs text-gray-400">
          Made with ❤️ using Next.js, React, and Tailwind CSS
        </footer>
      </div>
    </div>
  );
}
