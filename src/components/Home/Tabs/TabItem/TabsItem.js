import React from 'react'
import s from './TabsItem.module.scss'

const TabsItem = ({name, onTabClick, type, active, hide = false}) => {
  const handleClick = (e) => {
    e.preventDefault()
    onTabClick && onTabClick(type)
  }
  if(hide) return null

  return(
    <li className = {s.item}>
      <a 
        href="#" 
        className = {`${s.item__link} ${active ? s.item__link_active : null}`} 
        onClick = {handleClick}
      >
        {name}
      </a>
    </li>
  )
}
export default TabsItem