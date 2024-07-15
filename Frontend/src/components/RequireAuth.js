import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />}
    />
  )
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  // Add other props if necessary
}

export default ProtectedRoute
