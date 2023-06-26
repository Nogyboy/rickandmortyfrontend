import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterState, FilterCharacterByName } from '../interfaces/types';


const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
  page: 1,
  id: 0,
  name: "",
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharacterRequest(state, action: PayloadAction<number>) {
      state.loading = true;
      state.page = action.payload;
    },
    getCharactersSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.characters = action.payload;
      state.error = null;
    },
    getCharactersFailure(state, action: PayloadAction<string|null>) {
      state.loading = false;
      state.characters = [];
      state.error = action.payload;
    },  
    setDataCharacterByName(state, action: PayloadAction<string>){
      state.name = action.payload;
    },

    setDataCharacterId(state, action: PayloadAction<number>){
      state.id = action.payload;
    },

  },
});
 
export const { getCharacterRequest, getCharactersSuccess, getCharactersFailure, setDataCharacterByName, setDataCharacterId} = characterSlice.actions;

export default characterSlice.reducer;