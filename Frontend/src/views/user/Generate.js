/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */
import axios from 'axios'
import QRCode from 'qrcode.react'
import React, { useState } from 'react'

const GenerateQRCode = () => {
  const [qrCode, setQrCode] = useState(null)
  const [error, setError] = useState(null)

  const generateLink = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/absensi',
        {
          /* request body if needed */
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust according to your auth setup
          },
        },
      )
      setQrCode(response.data)
      setError(null)
    } catch (err) {
      setError('Error generating link: ' + err.response?.data?.message || err.message)
    }
  }

  return (
    <div style={styles.container}>
      <button onClick={generateLink}>Generate QR Code</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {qrCode && (
        <div style={styles.qrContainer}>
          <QRCode value={qrCode} size={256} /> {/* Adjust size as needed */}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  qrContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
}

export default GenerateQRCode
