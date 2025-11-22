declare module './components/ChatRoom' {
  import React from 'react'

  export interface ChatRoomProps {
    courseId?: string
    userId?: string
  }

  const ChatRoom: React.ComponentType<ChatRoomProps>
  export default ChatRoom
}

declare module './components/SyllabusImport' {
  import React from 'react'

  export interface SyllabusImportProps {
    userId?: string
  }

  const SyllabusImport: React.ComponentType<SyllabusImportProps>
  export default SyllabusImport
}

declare module '*.jsx' {
  import React from 'react'
  const Component: React.ComponentType<any>
  export default Component
}
