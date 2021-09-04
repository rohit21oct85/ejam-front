export interface allDeploymentState {
      deployments: Array<{}>
}
const initialState = {
      deployments: new Array
}
type fetchAction = { type: "GET_DEPLOYMENT", payload: Array<{}> }

export const getDeploymentReducers = (state: allDeploymentState = initialState, action: fetchAction) => {
      switch(action.type){
            case "GET_DEPLOYMENT":{
                  return {
                        ...state,
                        deployments: [...state.deployments, action.payload]
                  }
            }
            default: 
             return state;
            
      }
}