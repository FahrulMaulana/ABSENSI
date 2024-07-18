/* eslint-disable prettier/prettier */
/* eslint-disable linebreak-style */
import Quagga from 'quagga'
import React, { useEffect, useRef } from 'react'

const QRScanner = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: videoRef.current,
            constraints: {
              width: 640,
              height: 480,
              facingMode: 'environment', // or 'user' for front camera
            },
          },
          decoder: {
            readers: ['qrcode_reader'], // Specify the type of QR code reader
          },
        },
        function (err) {
          if (err) {
            console.error('Error initializing Quagga:', err)
            return
          }
          console.log('Quagga initialized successfully')
          Quagga.start()
        },
      )

      Quagga.onDetected((result) => {
        console.log('QR code detected and processed', result)
        alert(`QR Code detected: ${result.codeResult.code}`)
        Quagga.stop() // Stop detection after QR code is detected
      })

      return () => {
        Quagga.stop() // Stop detection when component unmounts
      }
    } else {
      console.error('Video element not found')
    }
  }, [videoRef])

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '400px' }} />
    </div>
  )
}

export default QRScanner
