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
      title: "Untitled",
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
        <div class='w-full bg-emerald-600 text-white transition-colors h-8 
        flex flex-col justify-center items-center'>
        <button 
        class=" w-6 h-6 bg-emerald-700 hover:bg-emerald-900 rounded-md transition-colors "
        onClick={createNote}
      >
        +
      </button>
        </div>
        
      <div class="flex overflow-y-auto w-full">
        <ul class="flex flex-col gap-y-6 w-full justify-start pt-4">
          {notes.map(note => (
            
            <li 
              key={note.id}
              class=" hover:bg-emerald-500  rounded cursor-pointer text-emerald-50 flex justify-between items-center w-full pl-2
              "
              onClick={() => {
                localStorage.setItem("selectedNoteId", note.id);
                window.dispatchEvent(new Event("storage"));
              }}
            >   
              <div><span class="font-bold text-xl">  · </span>
              <span class="flex-grow truncate mr-2">  {note.title}</span>
                </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                class="bg-emerald-600 hover:bg-emerald-800 rounded-md  transition-colors px-2 mr-3"
              >
                ×
              </button>
            </li>
        ))}
        </ul>
      </div>
      
      
    </div>
  );
}