    export interface Character {
        id: number;
        name: string;
        status: string;
        species: string;
        gender: string;
        image: string;
    }

    export interface CharacterState {
        loading: boolean;
        error: string | null;
        page: number;
        id: number;
        name: string;
        characters: Character[];
    }

    export const GET_CHARACTERS = 'GET_CHARACTERS';
    export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
    export const GET_CHARACTERS_FAILURE = 'GET_CHARACTERS_FAILURE';

    export interface GetCharactersAction {
        type: typeof GET_CHARACTERS;
        payload: number;
    }

    export interface GetCharactersSuccessAction {
        type: typeof GET_CHARACTERS_SUCCESS;
        payload: Character[];
    }

    export interface GetCharactersFailureAction {
        type: typeof GET_CHARACTERS_FAILURE;
        payload: string;
    }

    export interface FilterCharacterByName {
        charactersFilter: Character[];
        loading: boolean;
        error: string | null;
        name: string;

    }

    export type CharacterAction = GetCharactersAction | GetCharactersSuccessAction | GetCharactersFailureAction;


