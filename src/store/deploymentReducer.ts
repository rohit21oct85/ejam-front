export interface DeploymentState {
      deployments: Array<{}>
}
const initialState = {
      deployments: new Array
}
type Action = { type: "ADD_DEPLOYMENT", payload: string }

export const deploymentReducer = (state: DeploymentState = initialState, action: Action) => {
      switch(action.type){
            case "ADD_DEPLOYMENT":{
                  return {
                        ...state,
                        deployments: [...state.deployments, action.payload]
                  }
            }
            default: 
             return state;
            
      }
}