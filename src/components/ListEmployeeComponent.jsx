import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeSercise';
import {useNavigate} from 'react-router-dom'
const ListEmployeeComponent = () => {
  
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(()=>{
        getAllEmployee();
    },[]);

    function getAllEmployee()
    {
      listEmployees().then((response)=>{
            console.log(response.data); 
            setEmployees(response.data);
        }).catch(error=>{
            console.error(error);
        });
    }
    function addNewEmployee()
    {
      navigator('/add-employee')
    }

    function updateEmployee(id)
    {
      navigator(`/edit-employee/${id}`)
    }
    
    function removeEmployee(id)
    {
      console.log(id);
      deleteEmployee(id).then((response) => {
        getAllEmployee();
      }).catch(error=>{
            console.error(error);
        });
    }
  return (
    <div className='container'>
      <h2 className='text-center'>Employee List</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
      <table className='table table-striped table-bordered'>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Employee FirstName</th>
                <th>Employee LastName</th>
                <th>Employee Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
             {
                Array.isArray(employees) && employees.map(employee => 
                    <tr key={employee.id}> 
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                          <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>
                        </td>
                        <td>
                          <button className='btn btn-danger' onClick={()=> removeEmployee(employee.id)}>Delete</button>
                        </td>
                    </tr>)
            }
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
