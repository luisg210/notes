import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import { onErrorMsg, onDelete, onGetAll, onGetById, onSave } from "../store/notes/noteSlice";

export const useNoteStore = () => {
  const { notes, errorMsg, successMsg, note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const getAll = async () => {
    try {
      let { data } = await api.get("notes/");
      data = data.data;
      
      dispatch(onGetAll(data));

    } catch (error) {
      dispatch(onErrorMsg({ error }));
    }
  };

  const deleteNote = async (id) => {
    try {
      const { data } = await api.delete(`notes/${id}`);
      dispatch(onDelete({ data }));

    } catch (error) {
      dispatch(onErrorMsg({ error }));
    }
  };        

  const save = async ({ note }) => {
    try {
      const { data } = await api.post("notes", note);
      dispatch(onSave({ data }));

    } catch (err) {
      dispatch(onErrorMsg({ msg: err }));
    }

  };

  const getById = async ( { id } ) => {
    try {
      const { data } = await api.get(`notes/${id}`);
      
      dispatch( onGetById( {note: data.data} ) );

    } catch (err) {
      
      dispatch( onErrorMsg({msg: err}) );
    }
  }

  const update = async ( {note, id} ) => {
    try {
      const { data } = await api.put(`notes/${id}`, note);
      
      dispatch( onSave({data}) );

    } catch (err) { 
      dispatch( onErrorMsg({msg: err}) );
    }
  }
 
  return {
    notes,
    errorMsg,
    successMsg,
    note,

    getAll,
    deleteNote,
    save,
    getById,
    update
  };
};
