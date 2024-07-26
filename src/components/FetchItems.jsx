import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = ()=>{
  const fetchStatus = useSelector(store=>store.fetchStatus);
  const dispatch = useDispatch();


   useEffect(()=>{
    if(fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(fetchStatusActions.markFetchingStarted());
    fetch('http://localhost:8080/items',{signal})
    .then(res => res.json())
    .then(({items}) =>{
      console.log(items);
      dispatch(fetchStatusActions.markFetchDone());
      dispatch(fetchStatusActions.markFetchingfinished());
      dispatch(itemsActions.addInitialItems(items[0]));
    });
    
    
    return ()=>{
      controller.abort();
    };
  },[fetchStatus]);

  return <>
  <div></div>
  </>

}

export default FetchItems;