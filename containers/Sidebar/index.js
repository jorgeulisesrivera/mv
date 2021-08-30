import React from 'react';
import CheckBoxList from '../../components/CheckBoxList'
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import {setCheckBreedAction} from '../../redux/actions'


const Sidebar = () => {

  const dogs = useSelector(state => state.dogs)

  const dispatch = useDispatch();
  
  return (
     <div>

      <CheckBoxList data={dogs.breeds} onChange={(id,value) => dispatch(setCheckBreedAction(id,value))}/>

     </div>
  );
}

export default Sidebar;