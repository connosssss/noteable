//

export default function CreateNote() {

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
    
    //console.log("Created note with ID:", noteId);
    
    return noteId;
  };

  return (
    <button 
      class='w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors mt-5 p-5'
      onClick={createNote}
    >
      create new note
    </button>
  );
}