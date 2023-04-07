import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterState } from '../interfaces/types';


const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
  page: 1,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharacter(state, action: PayloadAction<number>) {
      state.loading = true;
      state.page = action.payload;
    },
    getCharactersSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.characters = action.payload;
      state.error = null;
    },
    getCharactersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.characters = [];
      state.error = action.payload;
    },
  },
});

export const { getCharacter, getCharactersSuccess, getCharactersFailure } = characterSlice.actions;

export default characterSlice.reducer;
