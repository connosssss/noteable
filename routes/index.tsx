import { Head } from "$fresh/runtime.ts";
import Sidebar from "../components/Sidebar.tsx";
import Preview from "../islands/Preview.tsx";

export default function Home() {
  return (
    <div class="flex h-screen">
      <div class="w-1/5 min-h-screen">
        <Sidebar />
      </div>
      <div class="flex-1">
        <Preview />
      </div>
    </div>
  );
}
