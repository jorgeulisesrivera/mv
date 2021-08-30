import {useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  imageList: {
    width: "100%",
    height: "100%",
    maxHeight:450
  },
}));


const Content = () => {

  const classes = useStyles();

  const {breeds} = useSelector(state => state.dogs);

  const [selectedBreeds,setSelectedBreeds] = useState([]);

  // useEffect(() => {
  //   //FIRST OR SECOND LEVEL:
  //   let selectedBreeds = [];
  //   breeds.forEach(breed => {
  //     if(breed.checked){
  //       selectedBreeds.push(breed);
  //     }
  //     breed.subBreeds.forEach(subBreed => {
  //       if(subBreed.checked){
  //         selectedBreeds.push(subBreed);
  //       }
  //     });
  //   });
  //   setSelectedBreeds(selectedBreeds)
  // }, [breeds])

  const isBreendOrSubBreend = (breed)=>{
    let select = false;
    if(breed.checked){
      select = true;
    }else{
      breed.subBreeds.forEach(subBreed => {
        if(subBreed.checked){
            select = true;
        }
      });
    }
    return select;
  }

  return (
    <div>
      {breeds.map(breed=>{
          if(isBreendOrSubBreend(breed)){
            return(<>
              <Typography gutterBottom variant="h4" component="h2" style={{marginTop:10}}>{breed.name}:</Typography>

              {/*FIRST LEVEL*/}
              {breed.checked && <ImageList rowHeight={160} className={classes.imageList} cols={5}>
                {breed.images.map((item) => (
                  <ImageListItem key={item} cols={1}>
                    <img src={item}/>
                  </ImageListItem>
                ))}
              </ImageList>
              }

              {/*SECOND LEVEL*/}
              {breed.subBreeds.length>0 && breed.subBreeds.map(subBreed=>{
                return <>
                  {subBreed.checked && <>
                  <Typography gutterBottom variant="h5" component="h2" style={{marginTop:10}}>{breed.name} / {subBreed.name}:</Typography>
                  {subBreed.images.length>0 ? <ImageList rowHeight={160} className={classes.imageList} cols={5}>
                    {subBreed.images.map((item) => (
                      <ImageListItem key={item} cols={1}>
                        <img src={item}/>
                      </ImageListItem>
                    ))}
                  </ImageList>
                  :
                  <span>NO HAY IMAGENES</span>
                  }
                  </>
                  }
                </>
              })
              }
            </>)
          }
      })}
    </div>
  );
};

export default Content;