import React, {useReducer} from 'react';
import RequestContext from './requestContext';
import requestReducer from './requestReducer';

const RequestStage = props => {
    const initialStage = {
        requests:[]
    }
    const [state, dispach] = useReducer(requestReducer,initialStage);

    return(
        <RequestContext.Provider
            value={{
                requests: state.requests
            }}
        >
            {props.children}
        </RequestContext.Provider>
    )
}

export default RequestStage