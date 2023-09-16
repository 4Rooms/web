import React from 'react'
import styles from './ChatGroup.module.css'
import Infrotmation from './Infrotmation/Infrotmation'
import Online from './Online/Online'
import Chat from './Chat/Chat'
import MessageForm from './MessageForm/MessageForm'

export default function ChatGroup() {
  return (
    <div className={styles.container__chatGroups}>
        <Infrotmation />
        <Online />
        <Chat />
        <MessageForm />
    </div>
  )
}
