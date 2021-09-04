import { createStore,combineReducers } from "redux";
import {deploymentReducer} from './deploymentReducer'
import {getDeploymentReducers} from './getDeploymentReducers'


const rootReducers = combineReducers({
      deploymentReducer,
      getDeploymentReducers
});

export const store = createStore(rootReducers);