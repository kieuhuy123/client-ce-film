import React, { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'

const UploadWidget = ({ setPublicId }) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dladhhg6i',
        uploadPreset: 'tyck9wle'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setPublicId(result.info.public_id)
        }
      }
    )
  }, [setPublicId])
  return (
    <Button variant='light' onClick={() => widgetRef.current.open()}>
      Upload
    </Button>
  )
}

export default UploadWidget
