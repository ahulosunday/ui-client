import PropTypes from 'prop-types'
import React from 'react'
import { CButton, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFoursquare, cilCode, cilMediaPause, cilMediaPlay } from '@coreui/icons'
import { Link } from 'react-router-dom'

const DocsExample = (props) => {
  const { children, href, add, showAdd} = props

  const _href = `/${href}`
  const _add = add
  const _showAdd = showAdd

  return (
    <div className="example">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink active>
           {_add}
          </CNavLink>
        </CNavItem>
        <CNavItem>
      { !_showAdd? '': <CButton color="light" size="sm">
        <Link  to={_href} style={{cursor:'pointer', textDecoration:'none', color:'white'}}>
          ADD NEW
          </Link></CButton>} 
        </CNavItem>
      </CNav>
      <CTabContent className="rounded-bottom">
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(DocsExample)
