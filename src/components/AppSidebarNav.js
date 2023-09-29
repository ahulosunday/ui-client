import React, { useState, useContext, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CBadge } from '@coreui/react'
import { AuthContext } from "../context/authContext";
export const AppSidebarNav = ({ items }) => {
  const {currentUser, permissions } = useContext(AuthContext);
  const [show, setShow] = useState(true)
  const location = useLocation()
  //Logins for Role with id 3, that is Guest
   const arr = ['Change Password', 'Enrolement', 'Profile Pix', 'Dashboard', 'Renewal', 'Reg. Codes']
  useEffect(()=>{
 if(currentUser?.roleid === 3) setShow(false)
  }, [currentUser])

  const navLink = (name, icon, badge, ok) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items? show?
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))
        : items.map((item, index) => ((arr.includes(item.name))? navItem(item, index): ''))
         : null}
         {
         
         }
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
