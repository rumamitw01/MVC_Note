import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

// 操作 輸入 指令 最終 都要送到 main 

export default class App {
    constructor(root){
        this.notes =[];
        this.activeNote = null;
        //要把參數傳過去!
        this.view = new NotesView(root, this._handlers());
 
        this._refreshNotes();
    }

    _refreshNotes(){
        // 抓出所有的 LIST
        const notes = NotesAPI.getAllNotes();

        //使用者目前點選的是哪一個 
        this._setNotes(notes); 

        //如果甚麼資料都沒有? 
        if(notes.length >0){
            this._setActiveNote(notes[0]);
        }
    }

     //_setNotes
     _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }


    //_setActiveNote
    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers(){
        return{
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "",
                    body: ""
                };

                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title,
                    body
                });

                this._refreshNotes();
            },
            onNoteDelete:noteID=>{
                noteID=this.activeNote.id;
                NotesAPI.deletNote(noteID);
                this._refreshNotes();
            }



        }


    }



}