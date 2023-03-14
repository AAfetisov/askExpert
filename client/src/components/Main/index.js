import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './style.module.css';

export default function Main() {
    const dispatch = useDispatch();
    // const loading = useSelector(state=>state.todos.loading);
    const loading = true;
    
    useEffect(()=>{
      const abortController = new AbortController();
      const { signal } = abortController;
      // dispatch(getTodoTh(signal));
      return () => abortController.abort();
    },[])
    
  return (
    <>
      <spacer-1rem></spacer-1rem>
      <flex-container-column>
        {loading && <h1>LOADING</h1>}
        <div>MAIN</div>
      </flex-container-column>
    </>
  )
}


