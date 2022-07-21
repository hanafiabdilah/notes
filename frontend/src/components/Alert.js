import { useState, useEffect } from 'react'

export default function Alert(props) {
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    const hide = setTimeout(() => {
      setIsShow(false)
    }, 5000)

    return () => {
      clearTimeout(hide)
    }
  }, [])

  if (isShow) {
    return (
      <div
        className={
          'mt-3 alert alert-' + (props.isSuccess ? 'success' : 'danger')
        }
      >
        <small>{props.message}</small>
      </div>
    )
  }
}
