import React, { ChangeEvent } from 'react'

interface NewDeploymentProps {
      addDeployment(template: string, versions: string, url: string): void;
}

export const AddDeployment: React.FC<NewDeploymentProps> = ({addDeployment}) => {
      const [template, setTemplate] = React.useState("");
      const [versions, setVersions] = React.useState("");
      const [url, setUrl] = React.useState("");
      const [templates, setTemplates] = React.useState([]);
      const [filterVersion, setFilterVersion] = React.useState([]);
      const [filterTemplate, setFilterTemplate] = React.useState("");

      async function getTemplates(){
            let response = await fetch('http://localhost:3000/api/template/get/templates');
            let result = await response.json();
            let data = result.data;
            if(result.status === 200){
                  setTemplates(data)
            }
      }
      
      React.useEffect(() => {
            (async() => {
                  await getTemplates();
            })()
      }, []);
      
      async function getFilterVersion(){
            try {
                  let filtered: any;
                  filtered = await templates?.filter((temp: any) => temp?._id === template);
                  if(filtered){
                        setFilterTemplate(filtered && filtered[0]?.name)
                        setFilterVersion(filtered && filtered[0]?.versions); 
                  }
            } catch (error) {
                 console.log(error) 
            }
      }
      React.useEffect(() => {
            (async() => {
                  await getFilterVersion();
            })()
      }, [template]);

      

      const updateTemplate = (event: ChangeEvent<HTMLSelectElement>)  => {
            setTemplate(event.target.value);
      }
      const updateVersions = (event: ChangeEvent<HTMLSelectElement>)  => {
            setVersions(event.target.value);
      }
      const updateUrl = (event: ChangeEvent<HTMLInputElement>)  => {
            setUrl(event.target.value);
      }
      
      const onClickAddDeployment = () => {
            addDeployment(filterTemplate, versions, url);
      }

      return (
            <div className="col-md-12 row mt-2">
                  <div className="form-group col-md-3">
                  <select 
                        name="template" 
                        className="form-control"
                        value={template}
                        onChange={updateTemplate}
                  >
                        <option value="">Template</option>
                        {templates?.map((temp: any) => {
                              return(
                                    <option 
                                          key={temp?._id} 
                                          value={temp?._id}>{temp?.name}</option>            
                              )
                        })}
                  </select>
                  </div>
                  <div className="form-group col-md-3"> 
                  <select 
                        name="verisons"
                        className="form-control"
                        value={versions}
                        onChange={updateVersions}
                        >
                        <option value="">Versions</option>
                        {filterVersion?.map((ver,ind) => {
                              return(
                                    <option 
                                    value={`${ver}`}
                                    key={`${ver}-${ind}`}
                                    >{`V-${ver}`}</option>
                              )
                        })}
                        
                  </select>
                  </div>
                  <div className="form-group col-md-6 pr-0">
                  <input 
                        name="url" 
                        className="form-control"
                        type="text" 
                        value={url} 
                        onChange={updateUrl} 
                        placeholder="Enter deployment url" 
                  />
                  
                  </div>
                  <div className="col-md-12 mt-2">
                        <button 
                              type="button"
                              className="btn-dark btn"
                              onClick={onClickAddDeployment}
                              >
                              Add Deployment
                        </button>
                  </div>
            </div>
      )
}

export default AddDeployment;