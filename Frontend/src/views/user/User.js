/* eslint-disable prettier/prettier */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import axios from '../axiosInstance'

const UserRow = ({ user }) => {
  return React.createElement(
    CTableRow,
    null,
    React.createElement(CTableDataCell, null, user.id),
    React.createElement(CTableDataCell, null, user.nama),
    React.createElement(CTableDataCell, null, user.email),
    React.createElement(CTableDataCell, null, user.role),
  )
}

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nama: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
}

const UserTable = ({ users }) => {
  return React.createElement(
    CTable,
    { striped: true, hover: true },
    React.createElement(
      CTableHead,
      null,
      React.createElement(
        CTableRow,
        null,
        React.createElement(CTableHeaderCell, null, 'ID'),
        React.createElement(CTableHeaderCell, null, 'Nama'),
        React.createElement(CTableHeaderCell, null, 'Email'),
        React.createElement(CTableHeaderCell, null, 'Role'),
      ),
    ),
    React.createElement(
      CTableBody,
      null,
      users.map((user) => React.createElement(UserRow, { key: user.id, user: user })),
    ),
  )
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nama: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user') // Menggunakan instance axios
        setUsers(response.data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return React.createElement('div', null, 'Loading...')
  }

  if (error) {
    return React.createElement('div', null, `Error: ${error.message}`)
  }

  return React.createElement(
    CCard,
    { className: 'mb-4' },
    React.createElement(CCardHeader, null, 'User List'),
    React.createElement(
      CCardBody,
      null,
      React.createElement(
        CRow,
        null,
        React.createElement(CCol, null, React.createElement(UserTable, { users: users })),
      ),
    ),
  )
}

export default Users
