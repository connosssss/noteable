import { Head } from "$fresh/runtime.ts";
import  Sidebar  from '../components/Sidebar.tsx';

export default function Home() {
  return (
    <>
    <div class='w-1/5 min-h-screen h-full bg-slate-400'>
      <Sidebar />
    </div>
      
    </>
  );
}
