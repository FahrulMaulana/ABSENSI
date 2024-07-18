/* eslint-disable linebreak-style */
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
  return (
    <CTableRow>
      <CTableDataCell>{user.user.nama}</CTableDataCell>
      <CTableDataCell>{user.user.username}</CTableDataCell>
      <CTableDataCell>{user.link_absen.link}</CTableDataCell>
      <CTableDataCell>{user.absen_at}</CTableDataCell>
    </CTableRow>
  )
}

UserRow.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.shape({
      nama: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    link_absen: PropTypes.shape({
      link: PropTypes.string.isRequired,
    }).isRequired,
    absen_at: PropTypes.string.isRequired,
  }).isRequired,
}

const UserTable = ({ users }) => {
  return (
    <CTable striped hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Nama</CTableHeaderCell>
          <CTableHeaderCell>Username</CTableHeaderCell>
          <CTableHeaderCell>Link Absen</CTableHeaderCell>
          <CTableHeaderCell>Absen At</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users.map((user) => (
          <UserRow key={user.user.username} user={user} />
        ))}
      </CTableBody>
    </CTable>
  )
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        nama: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
      link_absen: PropTypes.shape({
        link: PropTypes.string.isRequired,
      }).isRequired,
      absen_at: PropTypes.string.isRequired,
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
        const response = await axios.get('/api/absensi/list/absen') // Menggunakan instance axios
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
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>User List</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            <UserTable users={users} />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Users
