import { Dispatch } from "redux";
import { GET_CHARACTERS, GET_CHARACTERS_SUCCESS, GET_CHARACTERS_FAILURE, CharacterAction,  Character, CharacterState, GetCharactersAction, GetCharactersFailureAction, GetCharactersSuccessAction } from "../../interfaces/types";
import { getCharacters, getCharacterById, getCharactersByIds } from "../../config/cliAxios";


export const getCharacter = (page: number): CharacterAction => ({
    type: GET_CHARACTERS,
    payload: page,
  });
  
  export const getCharactersSuccess = (characters: Character[]): CharacterAction => ({
    type: GET_CHARACTERS_SUCCESS,
    payload: characters,
  });
  
  export const getCharactersFailure = (error: string): CharacterAction => ({
    type: GET_CHARACTERS_FAILURE,
    payload: error,
  });