import { useEffect, useContext } from 'react'
import MainContext from '../context/MainContext'

const Notification = () => {
  const { notification, setNotification } = useContext(MainContext)

  useEffect(() => {
    if (notification.msg === '') return
    setTimeout(() => setNotification({ msg: '' }), 3000)
  }, [notification.msg, setNotification])

  return (
    notification.msg && (
      <div className={'notification notification-' + notification.status}>{notification.msg}</div>
    )
  )
}

export default Notification
