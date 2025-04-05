
import FileExplorer from "../islands/FileExplorer.tsx";

export default function Sidebar() {
  return (
    <div class='w-full min-h-full bg-emerald-300'>
      <div class='h-16 w-full bg-emerald-500 flex items-center justify-center'>
        <h1 class='text-2xl text-emerald-100'>noteable</h1>
      </div>
      <FileExplorer />
    </div>  
  );
}