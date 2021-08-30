import { SET_BREEDS, SET_SELECTED_BREEDS, SET_LOADING_IMAGES } from '../../constants/ActionTypes';
import {HYDRATE} from 'next-redux-wrapper'

const INIT_STATE = {
    breeds:[],
    selectedBreeds:[],
    loadingImages:false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_BREEDS: {
        return { ...state,  breeds: action.breeds};
    }
    case SET_SELECTED_BREEDS: {
        return { ...state,  selectedBreeds: action.selectedBreeds};
    }
    case SET_LOADING_IMAGES: {
        return { ...state,  loadingImages: action.loadingImages};
    }
    case HYDRATE: {
        return {...state, ...action.payload.dogs};
    }
    default:
      return state;
  }
};
