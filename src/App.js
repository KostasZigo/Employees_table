import './App.css';
import React, {useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ReadOnlyRow from './components/ReadOnlyRow/ReadOnlyRow';
import EditRow from './components/EditRow/EditRow';
import _ from 'lodash'

function App() {

  const [employees, setEmployees]= useState(null);
  const [editFormData, setEditFormData] = useState({
    user: {
      name: "",
      email: "",
      title: "",
      department: ""
    },
    status: "",
    role: ""
  })
  const [editEmployeeName, setEditEmployeeName] = useState(null);
  const [uniqueRoles, setUniqueRoles] = useState([]);
  useEffect( () => {
    async function fetchData (){
      const request=await axios.get('https://raw.githubusercontent.com/NoeticBlue/exercise-company-employees/main/employees.json')
        setEmployees(request.data.records)
        let foundUniqueRoles = _.keys(_.countBy(request.data.records, function(records) { return records.role; }));
        setUniqueRoles(foundUniqueRoles)
      }
    fetchData()
  }, []);

  const handleEditClick = (event, employee) => {
    event.preventDefault()
    setEditEmployeeName(employee.user.name)

    const formValues = {
      user: {
        name: employee.user.name,
        email: employee.user.email,
        title: employee.user.title,
        department: employee.user.department
      },
      status: employee.status,
      role: employee.role
    }
    setEditFormData(formValues)
  }

  const handleEditFormChange = (event) => {
    event.preventDefault()
    let fieldName = event.target.getAttribute("name")
    let fieldValue = event.target.value
    if (fieldName === "status"){
      if (fieldValue.toLowerCase() === "active"){
        fieldValue = "Inactive"
      }else{
        fieldValue = "Active"
      }
    }
    const newFormData = {...editFormData}
    
    
    fieldName = String(fieldName)
    let splitKey = fieldName.split(".")
    if(splitKey.length > 1){
      newFormData[splitKey[0]][splitKey[1]] = fieldValue 
    }else{
      newFormData[fieldName] = fieldValue
    }
    setEditFormData(newFormData)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()

    const newEmployees = [...employees]
    const index = employees.findIndex((employee) => employee.user.name === editEmployeeName)
    const editedEmployee={
      user:{
        name: editFormData.user.name,
        email: editFormData.user.email,
        title: editFormData.user.title,
        department: editFormData.user.department,
      },
      status: editFormData.status, 
      role : editFormData.role
    }

    newEmployees[index] = editedEmployee
    setEmployees(newEmployees)
    setEditEmployeeName(null)
  }

  return (
    <div class="container -my-2 py-2 min-w-full">
      <div className="m-8 shadow border border-gray-300 rounded-lg">
        <form onSubmit={handleEditFormSubmit} className=''> 
          <table className="table-fixed min-w-full divide-y divide-gray-300">
            <thead className="bg-black flex-col text-white w-full min-w-full bg-gray-100 uppercase text-left text-gray-500 ">
              <tr className="flex w-full ">
                <th scope='col' className='w-1/3 font-medium pl-2'>Name</th>
                <th scope='col' className='w-1/3 font-medium'>Title</th>
                <th scope='col' className='w-1/12 font-medium text-center'>Status</th>
                <th scope='col' className='w-2/12 font-medium text-center'>Role</th>
                <th scope='col' className='w-1/12'></th>
              </tr>
            </thead>
            <tbody class="flex flex-col bg-white divide-y divide-gray-300 overflow-y-auto" style={{height: 500}}>
              {employees && employees.map( (employee) => (
                <Fragment key={employee.user.name}>
                  {editEmployeeName === employee.user.name?(
                    <EditRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} uniqueRoles={uniqueRoles}/>
                  ):(
                    <ReadOnlyRow employee={employee} handleEditClick={handleEditClick}/>
                  )} 
                </Fragment>
              ))}
            </tbody>
          </table>
          </form> 
      </div>
    </div>    
  );
}

export default App;
