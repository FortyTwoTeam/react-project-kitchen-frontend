import React from "react"
import s from './TabsNavigation.module.scss'

const TabsNavigation = ({children}) => {

  return(
    <ul className = {s.TabsNavigation}>
        {children}
    </ul>
  )
}
export default TabsNavigation