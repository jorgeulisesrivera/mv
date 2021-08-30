import { SET_BREEDS, SET_SELECTED_BREEDS, SET_LOADING_IMAGES } from '../../constants/ActionTypes';
import {getBreedsApi,getBreedsImagesApi} from '../../api'

export const initAppAction = () => {
  return (dispatch) => {
    getBreedsApi()
    .then(response=>{
        let toArray = Object.keys(response.message);
        console.log("INIT",response.message,toArray);
        toArray = toArray.map((row,i)=>{
          return {
            id:`${row}`,
            name:row,
            checked:false,
            colapse:true,
            images:[],
            subBreeds:response.message[row].length==0?[]:response.message[row].map(row2=>({
              id:`${row}-${row2}`,
              name:row2,
              checked:false,
              images:[]
            }))
          }
        })
        dispatch(setBreedsAction(toArray))
    })
    .catch(err=>{
    })
  };
};

export const setBreedsAction = (breeds) => {
  return (dispatch) => {
    dispatch({
      type: SET_BREEDS,
      breeds
    });
  };
};

export const setLoadingImagesAction = (loadingImages) => {
  return (dispatch) => {
    dispatch({type: SET_LOADING_IMAGES,loadingImages});
  }
}

const requestImagesAction = (id) => {
  return (dispatch,getState) => {
    dispatch(setLoadingImagesAction(true));
    const url = id.replace("-","/");
    getBreedsImagesApi(url)
    .then(response=>{
      //SET IMAGES:
      let breeds = [...getState().dogs.breeds];
      for(let i=0;i<breeds.length;i++){
        if(breeds[i].id == id){
            breeds[i].images = response.message;
        }else{
            for(let a=0;a<breeds[i].subBreeds.length;a++){
                if(breeds[i].subBreeds[a].id == id){
                    breeds[i].subBreeds[a].images = response.message;
                }
            }
        }
      }
      dispatch(setBreedsAction(breeds))
    })
    .catch(err=>{
      console.log(err);
    })
    dispatch(setLoadingImagesAction(false));
  }
}

export const setCheckBreedAction = (id,value) => {
  return (dispatch,getState) => {
      let breeds = [...getState().dogs.breeds];
      for(let i=0;i<breeds.length;i++){
          if(breeds[i].id == id){
              breeds[i].checked = value;
              if(value && breeds[i].images.length==0){
                //REQUEST IMAGENES:
                dispatch(requestImagesAction(id));
              }
          }else{
              for(let a=0;a<breeds[i].subBreeds.length;a++){
                  if(breeds[i].subBreeds[a].id == id){
                      breeds[i].subBreeds[a].checked = value;
                      if(value && breeds[i].subBreeds[a].images.length==0){
                        //REQUEST IMAGES:
                        dispatch(requestImagesAction(id));
                      }
                  }
              }
          }
      }
      dispatch(setBreedsAction(breeds))
  };
};