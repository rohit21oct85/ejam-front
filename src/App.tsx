import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import {AddDeployment} from './components/AddDeployment';
import Header from './components/Header';

import { DeploymentState } from './store/deploymentReducer';

const App: React.FC = ()  => {

  const storeDeployments = useSelector<DeploymentState, DeploymentState["deployments"]>((state) => state.deployments);
  
  const dispatch = useDispatch();
  const [deployments, setDeployments] = React.useState([]);
  const addDeployment = (template: string, versions: string, url: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ template: template, versions: versions, url: url })
    };
    fetch('http://localhost:3000/api/deployment/add/deployment', requestOptions)
      .then(response => response.json())
      .then(data => {
        setDeployments(data);  
        dispatch({
          type: "ADD_DEPLOYMENT",
          payload: {template, versions, url}
        });
      });
    }
    async function getDeployments(){
      let response = await fetch('http://localhost:3000/api/deployment/get/deployments');
      let result = await response.json();
      let data = result.data;
      if(result.status === 200){
          setDeployments(data);  
          dispatch({
              type: 'GET_DEPLOYMENT',
              payload: data
            })
      }
}

    React.useEffect(() => {
          (async() => {
                await getDeployments();
          })()
    }, []);

    function deleteDeployment(deployment_id: any){
      let answer = window.confirm("do you want to delete this deployment..?")
      if(answer === true){
        const requestOptions = {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deployment_id: deployment_id })
        };
        fetch('http://localhost:3000/api/deployment/delete/deployments', requestOptions)
          .then(response => response.json())
          .then(data => {
            setDeployments(data);  
          });
        }
      }

  return (
    <div className="App col-md-12">
        <Header />
        <AddDeployment addDeployment={addDeployment}/>
        <br />
        <table className="table table-responsive table-bordered">
          <thead>
            <tr>
              <th>Templates</th>
              <th>Versions</th>
              <th>Urls</th>
              <th>Action</th>
            </tr>
          </thead>
        {deployments?.length > 0 && Object.entries(deployments).map(([_key, _value]: any) => {
          return(
            <tbody>
              <tr id={_value?._id}>
                <td>{_value.template}</td>
                <td>{_value.versions}</td>
                <td>{_value.url}</td>
                <td><span className="fa fa-trash deletebtn text-danger"
                onClick={e => deleteDeployment(_value._id)}></span></td>
              </tr>
            </tbody>
          );
        })}
        </table>
        
    </div>
  );
}

export default App;
