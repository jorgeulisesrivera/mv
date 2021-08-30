import React,{useEffect} from 'react';
import {useDispatch } from 'react-redux';
import {initAppAction} from '../../redux/actions'

const PageInit = ({children}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAppAction())
  }, [])
  return (children);
};

export default PageInit;