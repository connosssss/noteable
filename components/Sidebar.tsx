
import FileExplorer from "../islands/FileExplorer.tsx";

export default function Sidebar() {
  return (
    <div class="w-full min-h-full theme-bg-primary">
      <div class="h-16 w-full theme-bg-secondary flex items-center justify-center">
        <h1 class="text-2xl theme-text-primary">noteable</h1>
      </div>
      <FileExplorer />
    </div>  
  );
}