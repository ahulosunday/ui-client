import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibKeybase,
  cibKhanAcademy,
  cibPicartoTv,
  cilBell,
  cilCalculator,
  cilChart,
  cilChartLine,
  cilChartPie,
  cilControl,
  cilCursor,
  cilDescription,
  cilDrop,
  cilHospital,
  cilLocationPin,
  cilMoney,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilRouter,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'CATEGORIES',
  },
  //==================3
   {
    component: CNavGroup,
    name: 'GIFSHIP',
    to: '#',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
    items: [
  {
    component: CNavItem,
    name: 'Enrolement',
    to: '/form/register',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'PHC',
    to: '/hospitals',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
  },
  //=======================
  {
    component: CNavItem,
    name: 'Payment',
    to: '/user-rrr/',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Renewal',
    to: '/renewal/rrr/',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Generate Payment',
    to: '/user-rrr/generate/payment',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
    {
    component: CNavItem,
    name: 'HMOs',
    to: '/hmo',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  }
   
  //=================3
  ,
   {
    component: CNavGroup,
    name: 'Reports',
    to: '#',
    icon: <CIcon icon={cibKeybase} customClassName="nav-icon" />,
    items: [
{
  component: CNavItem,
  name: 'Enrolees',
  to: '/'
},
{
  component: CNavItem,
  name: 'Transactions',
  to: '/'
},
{
  component: CNavItem,
  name: 'Others',
  to: '/'
},

    ]
  }
   ]
   },

  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavGroup,
    name: 'Programme Settings',
    to: '#',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
{
  component: CNavItem,
  name: 'Programme',
  to: '/gifship-list'
},
{
  component: CNavItem,
  name: 'Package',
  to: '/gifshipPackage'
},

    ]
  },
  {
    component: CNavGroup,
    name: 'Location Settings',
    to: '#',
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    items: [
{
  component: CNavItem,
  name: 'Countries',
  to: '/country'
},
{
  component: CNavItem,
  name: 'Regions',
  to: '/region'
},
{
  component: CNavItem,
  name: 'States',
  to: '/state'
},
{
  component: CNavItem,
  name: 'LGAs',
  to: '/lga'
},
{
  component: CNavItem,
  name: 'Wards',
  to: '/ward'
},

    ],
  },
 //===== 
   {
    component: CNavGroup,
    name: 'Account Settings',
    to: '#',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [{
      component: CNavItem,
  name: 'Chart of Account',
  to: '/chart/of/account/',
   icon: <CIcon icon={cilChart} customClassName="nav-icon" />
    },
    {
      component: CNavItem,
  name: 'Account',
  to: '/',
   icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />
    },
    {
      component: CNavItem,
  name: 'Type of Account',
  to: '/account/type/',
   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />
    }
]
},
   {
    component: CNavGroup,
    name: 'User Settings',
    to: '#',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
  {
  component: CNavItem,
  name: 'Reg. Codes',
  to: '/auth/getcodes/',
   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />
},
  {
  component: CNavItem,
  name: 'Change Password',
  to: '/change-password',
   icon: <CIcon icon={cilUser} customClassName="nav-icon" />
},
 {
  component: CNavItem,
  name: 'Users',
  to: '/users/list',
   icon: <CIcon icon={cilUser} customClassName="nav-icon" />
},
{
component: CNavItem,
  name: 'Profile Pix',
  to: '/passport-change/auth/file/1',
   icon: <CIcon icon={cibPicartoTv} customClassName="nav-icon" />
},
{
component: CNavItem, 
 name : 'Roles',
  to: '/role/list',
   icon: <CIcon icon={cilRouter} customClassName="nav-icon" />
}
    ]
   }
 //================
]

export default _nav
