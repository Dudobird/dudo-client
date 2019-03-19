import React from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
function NotifyBox(props) {
    const {controller, setDefaultStatus} = props
    if (controller.errors && controller.errors.length > 0) {
        NotificationManager.error(controller.errors[0].body)
        setDefaultStatus()
    }
    if (controller.messages && controller.messages.length > 0) {
        NotificationManager.success(controller.messages[0].body)
        setDefaultStatus()
    }
  return (
    <div>
      <NotificationContainer />
    </div>
  )
}

export default NotifyBox
