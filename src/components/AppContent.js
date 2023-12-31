import React, { Suspense, useContext, useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import {AuthContext} from "../context/authContext";


// routes config
import routes from '../routes'

const AppContent = () => {
    const {currentUser } = useContext(AuthContext);

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
         <Route path="/" element={<Navigate to="dashboard" replace />} />

        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
