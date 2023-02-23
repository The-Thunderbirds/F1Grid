import React from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export function Logout() {

  const { signOut } = useAuthContext()

  return (
    <button
      className="btn d-flex gap-2 align-items-center" style={{color:"white"}}
      onClick={() => {
        signOut()
      }}
    >
      Log Out
    </button>
  )
}
