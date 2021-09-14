import React from 'react';
import profile_image from '../../assets/image.jpg'

const ReadOnlyRow = ({employee, handleEditClick}) => (
  <tr key={employee.user.name} className='flex w-full items-center'>
    <td className='pl-2 py-6 w-1/3 whitespace-nowrap'>
      <div className='flex items-center'>
        <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src={profile_image} alt=''/>
        </div>
        <div className='pl-2'>
          <div className='font-medium text-gray-800'>{employee.user.name}</div>
          <div className="text-gray-500">{employee.user.email}</div>
        </div>
      </div>
    </td>
    <td className="pl-1 py-6 w-1/3 whitespace-nowrap">
      <div className='font-medium text-gray-800  border-2 border-transparent'>{employee.user.title}</div>
      <div className="text-gray-500 border-2 border-transparent ">{employee.user.department}</div>
    </td>
    <td className="md:pl-4  sm:pl-4 lg:pl-6 py-6 w-1/12 text-center whitespace-nowrap">
      {employee.status.toLowerCase() === 'active'? 
        (<span className='px-2 bg-green-200 rounded-full font-semibold text-gray-800'>
          {employee.status[0].toUpperCase() + employee.status.substring(1)}
        </span>
        ):( 
        <span className='px-2 bg-red-200 rounded-full font-semibold text-gray-800'>
          {employee.status[0].toUpperCase() + employee.status.substring(1)}
        </span>
        )
      }
    </td>
    <td className="pl-8 py-6 w-2/12  text-center whitespace-nowrap text-gray-500">
      <select className='appearance-none' name="role" value={employee.role} readOnly>
        <option value={employee.role}>{employee.role}</option>
      </select>
    </td>
    <td className='py-6 w-1/12 text-right pr-4 whitespace-nowrap'><button  type="button" className='font-medium text-purple-500 hover:text-purple-900'
        onClick={(event)=>handleEditClick(event,employee)}>
          Edit
        </button>
    </td>
  </tr>
);

export default ReadOnlyRow;
