import React, {useEffect, createContext, useReducer} from 'react';
import { tagAction } from '../constants/actionType';
import tagReducer from "../reducers/TagReducer";
import postApi from '../api/postApi';

export const TagContext = createContext();

function TagContextProvider({children}) {
    const [tags, dispatch] = useReducer(tagReducer, []);
    
    // get tags from api
    useEffect(() => {
        const getTags = async () => {
            try {
                const res = await postApi.getTags();
              if(res.status && res.status === 'success'){
                // console.log(res.data.tags);
                // setTags(res.data.tags);
                dispatch({
                    type: tagAction.SAVE_TAGS,
                    payload: {
                        tags: res.data.tags
                    }
                })
              }else{
                console.log('error get tags ',res);
              } 
              } catch (error) {
                console.log('error get tags: ',error);
              }
            };
        
            getTags();
    }, []);

    const tagContextData = {
        tags,
        dispatch
    };

    return (
        <TagContext.Provider value={tagContextData}>
            {children}
        </TagContext.Provider>
    );
}

export default TagContextProvider;