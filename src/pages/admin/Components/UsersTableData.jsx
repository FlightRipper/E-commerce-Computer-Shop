import React from 'react'

const UsersTableData = () => {
  return (
      <tbody>
              <tr>
                <td className='user-id-dashboard'>1</td>
                <td className='user-username-dashboard'>username</td>
                <td className='user-email-dashboard'>email</td>
                <td className='user-balance-dashboard'>balance</td>
                <td className='user-usertype-dashboard'>usertype</td>
                <td className='user-action-dashboard'>
                <i class="bi bi-trash"></i>
                </td>
              </tr>
      </tbody>
  )
}

export default UsersTableData
