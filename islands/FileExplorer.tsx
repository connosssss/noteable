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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Add transition class to body on mount
    document.body.classList.add('transition-colors', 'duration-300');
    
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(storedNotes);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    const handleStorageChange = () => {
      const updatedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
      setNotes(updatedNotes);
      
      if (localStorage.getItem("theme") === "light") {
        setIsDarkMode(false);
      } else {
        setIsDarkMode(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      document.body.classList.add('bg-gray-900', 'text-gray-200');
      document.body.classList.remove('bg-gray-100', 'text-gray-800');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      document.body.classList.add('bg-gray-100', 'text-gray-800');
      document.body.classList.remove('bg-gray-900', 'text-gray-200');
    }
    
    window.dispatchEvent(new Event("storage"));
  }, [isDarkMode]);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div class="flex flex-col h-full transition-colors duration-300">
        <div class={`w-full transition-colors duration-300 h-8 border-b pb-3
        flex flex-row justify-end items-center gap-2 pr-3 ${isDarkMode ? 'text-gray-200 border-gray-700' : 'text-gray-800 border-gray-300'}`}>
          <button 
            class={`w-auto h-6 px-3 rounded-md transition-all duration-300 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={toggleTheme}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button 
            class={`w-6 h-6 rounded-md transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={createNote}
          >
            +
          </button>
        </div>
        
      <div class="flex overflow-y-auto w-full">
        <ul class="flex flex-col gap-y-1 w-full justify-start pt-4">
          {notes.map(note => (
            
            <li 
              key={note.id}
              class={`rounded cursor-pointer flex justify-between items-center w-full pl-2 transition-colors duration-300 ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-200' 
                  : 'hover:bg-gray-300 text-gray-800'
              }`}
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
                class={`rounded-md transition-colors duration-300 px-2 mr-3 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-400'
                }`}
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