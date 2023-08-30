import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibPicartoTv,
  cilBell,
  cilCalculator,
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
    name: 'REGISTRATION',
  },
  {
    component: CNavItem,
    name: 'Enrolee',
    to: '/form/register',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  //========================
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
    name: 'HMOs',
    to: '/hmo',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
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


/*
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
      */
    ],
  },
  {
  component: CNavItem,
  name: 'Change Password',
  to: '/change-password',
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
  /*
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  */
]

export default _nav
