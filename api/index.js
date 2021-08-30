import axios from 'axios'

export function getBreedsApi(){
    return new Promise(async (resolve, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_DOG_API}/breeds/list/all`)
        .then(response=>{
            resolve(response.data);
        })
        .catch(err=>{
            reject(err);
        })
    });
}

export function getBreedsImagesApi(id){
    return new Promise(async (resolve, reject) => {
        axios.get(`${process.env.NEXT_PUBLIC_DOG_API}/breed/${id}/images`)
        .then(response=>{
            resolve(response.data);
        })
        .catch(err=>{
            reject(err);
        })
    });
}