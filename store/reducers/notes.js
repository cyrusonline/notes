import {ADD_NOTES, TOGGLE_FAVORITE} from '../actions/notes'
import Note from  '../../models/note'
const NOTES = [
    new Note('c1','Buying Milk'),
    new Note('c2','Going to School'),
    new Note('c3','Watch Neflix'),
]
const initialState = {
    notes:NOTES,
    favNotes:[]
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTES:
            const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
            const newNote  = new Note(id, action.noteContent)
            const existingNotes = [...state.notes]
            return {...state,notes:existingNotes.concat(newNote)}
            break;
        case TOGGLE_FAVORITE:

            const existingIndex = state.favNotes.findIndex(note => note.id === action.noteId)
            if (existingIndex>=0) {
                const updatedFavNotes = [...state.favNotes]
                updatedFavNotes.splice(existingIndex,1)
                return {...state,favNotes:updatedFavNotes}
            } else {
                const note = state.notes.find(note => note.id===action.noteId)
                return {...state,favNotes:state.favNotes.concat(note)}
            }
            break;
    
        default:
            return state
            break;
    }
}

export default notesReducer