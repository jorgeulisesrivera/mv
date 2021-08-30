import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight:400
  },
}));

export default function CheckboxListSecondary({data,onChange}) {

  const classes = useStyles();

  const Item = ({id, name, checked})=>{
    return (<ListItem key={id} button>
      <ListItemText id={id} primary={name}/>
      <ListItemSecondaryAction>
        <Checkbox
          edge="end"
          onChange={async(event)=>{onChange(id,event.target.checked)}}
          checked={checked}
          inputProps={{ 'aria-labelledby': id }}
        /> 
        {/* <span>{id}</span> */}
      </ListItemSecondaryAction>
    </ListItem>)
  }

  return (
    <div style={{maxHeight:"100vh",overflow:"auto"}}>
    <List dense className={classes.root}>
      {data.length>0 && data.map((breed,i) => {
        if(breed.subBreeds.length==0){
          //NO HAY SUBBREEDS
          return (<Item key={i} id={breed.id} name={breed.name} checked={breed.checked}/>);
        }else{
          //HAY SUBBREEDS
          return (<>
          <Item key={i} id={breed.id} name={breed.name} checked={breed.checked}/>
          <Collapse key={i} in={true} timeout="auto" unmountOnExit style={{paddingLeft:20}}>
          <List component="div" disablePadding>
             {breed.subBreeds.map((subBreed,i)=><Item key={i} id={subBreed.id} name={subBreed.name} checked={subBreed.checked}/>)}
          </List>
          </Collapse>
          </>)
        }
      })}
    </List>
    </div>
  );
}