import { useEffect, useState } from "preact/hooks";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function FileExplorer() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);

    const handleStorageChange = () => {
      const updatedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      setNotes(updatedNotes);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const createNote = () => {
    const noteId = crypto.randomUUID();
    const newNote = {
      id: noteId,
      title: "!!!! to come !!!!",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    existingNotes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(existingNotes));
    setNotes(existingNotes); 
  };

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  return (
    <div class="flex flex-col h-full">
      <div class="flex overflow-y-auto">
        <ul class="flex flex-col gap-y-6 p-6">
          {notes.map(note => (
            <li 
              key={note.id} 
              class="p-2 bg-emerald-300 rounded cursor-pointer text-emerald-50 flex justify-between items-center"
            >
              <span>{note.id}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                class="bg-emerald-400 hover:bg-emerald-600 rounded-md px-2 py-4 transition-colors"
              >
                ×
              </button>
            </li>
        ))}
        </ul>
      </div>
      
      <button 
        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors mt-auto p-5"
        onClick={createNote}
      >
        Create New Note
      </button>
    </div>
  );
}