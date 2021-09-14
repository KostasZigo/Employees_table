import React from 'react';
import profile_image from '../../assets/image.jpg'

const EditRow = ({editFormData, handleEditFormChange, uniqueRoles}) => (
  <tr className='flex w-full items-center'>
    <td className='pl-2 py-6 w-1/3  whitespace-nowrap'>
      <div className='flex items-center'>
        <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src={profile_image} alt=''/>
        </div>
        <div className='pl-2'>
          <div className='font-medium text-gray-800'>{editFormData.user.name}</div>
          <div className="text-gray-500">{editFormData.user.email}</div>
        </div>
      </div>
    </td>
    <td className="pl-1 py-6 w-1/3 whitespace-nowrap">
      <div>
        <input className="w-full border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none font-medium text-gray-800"
          type="text"
          required="required"
          placeholder="Enter title..."
          name="user.title"
          value={editFormData.user.title}
          onChange={handleEditFormChange}
        ></input>
      </div> 
      <div>
        <input className="w-full border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:outline-none  text-gray-500"
          type="text"
          required="required"
          placeholder="Enter department..."
          name="user.department"
          value={editFormData.user.department}
          onChange={handleEditFormChange}
        ></input>
      </div>
    </td>
    <td className="md:pl-4  sm:pl-4 lg:pl-6 py-6 w-1/12 text-center whitespace-nowrap">
      {editFormData.status.toLowerCase() === 'active'? 
        (<input className='px-2 bg-green-200 rounded-full font-semibold text-gray-800 hover:bg-green-400 cursor-pointer'
          type="button"
          name="status"
          value={editFormData.status[0].toUpperCase()+editFormData.status.substring(1)}
          onClick={handleEditFormChange}
          ></input>
        ):(
          <input className='px-2 bg-red-200 rounded-full font-semibold text-gray-800 hover:bg-red-400 cursor-pointer'
          type="button"
          name="status"
          value={editFormData.status[0].toUpperCase()+editFormData.status.substring(1)}
          onClick={handleEditFormChange}
          ></input>
        )}
    </td>
    <td className="pl-8 py-6 w-2/12  text-center  whitespace-nowrap text-gray-500">
      <select className='' name="role" value={editFormData.role} onChange={handleEditFormChange}>
        {uniqueRoles.map((role)=>(
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    </td>
    <td className='py-6 w-1/12 text-right pr-4 whitespace-nowrap'>
      <button className='font-medium text-blue-500 hover:text-blue-900' type="submit">Save</button>
    </td>
  </tr>
);

export default EditRow;
