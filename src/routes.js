import React from 'react'
//"homepage": "https://ahulosunday.github.io/ui-client",
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
//==============================
const Phc = React.lazy(() => import('./pages/hospital/list'))
const AddHospital = React.lazy(() => import('./pages/hospital/add'))
const EditHospital = React.lazy(() => import('./pages/hospital/edit'))
const ViewHospital = React.lazy(() => import('./pages/hospital/view'))

const ListUsers = React.lazy(() => import('./pages/user/list'))
const ActivateUser  = React.lazy(() => import( './pages/user/ActivateUser'));
const DeactivateUser  = React.lazy(() => import( './pages/user/deactivateUser'));
//==================
const getCodes = React.lazy(() => import( './pages/auth/getCodes'));

const PrintForm = React.lazy(()=> import('./pages/printout'))
const Receipt = React.lazy(()=> import('./components/receipt'))
const GifshipList = React.lazy(() => import('./pages/gifship/listall'));
const  GifshipType  = React.lazy(() => import( './pages/gifship/gifshipType'));
const GifshipEdit  = React.lazy(() => import( './pages/gifship/edit'));
const List  = React.lazy(() => import( './pages/role/list'));
const Add  = React.lazy(() => import( './pages/role/add'));
const Edit  = React.lazy(() => import( './pages/role/edit'));
const ListCountry  = React.lazy(() => import( './pages/country/list'));
const AddCountry  = React.lazy(() => import( './pages/country/add'));
const EditCountry  = React.lazy(() => import( './pages/country/edit'));
const ListStates  = React.lazy(() => import( './pages/states/list'));
const AddStates  = React.lazy(() => import( './pages/states/add'));
const EditStates  = React.lazy(() => import( './pages/states/edit'));
const ListRegion  = React.lazy(() => import( './pages/regions/list'));
const AddRegion  = React.lazy(() => import( './pages/regions/add'));
const EditRegion  = React.lazy(() => import( './pages/regions/edit'));
const ListLga  = React.lazy(() => import( './pages/lga/list'));
const AddLga  = React.lazy(() => import( './pages/lga/add'));
const EditLga  = React.lazy(() => import( './pages/lga/edit'));
//const ListHospital  = React.lazy(() => import( './pages/hospital/list'));
const ListRegister  = React.lazy(() => import( './pages/gforms/list'));
const AddRegister  = React.lazy(() => import( './pages/gforms/add'));
const AddGifshipPackage  = React.lazy(() => import( './pages/gifshipPackage/add'));
const GifshipPackageList  = React.lazy(() => import( './pages/gifshipPackage/list'));
const EditGifshipPackage  = React.lazy(() => import( './pages/gifshipPackage/edit'));
const ListHmo  = React.lazy(() => import( './pages/hmo/list'));
const AddHmo  = React.lazy(() => import( './pages/hmo/add'));
const EditHmo  = React.lazy(() => import( './pages/hmo/edit'));
const EditRegister  = React.lazy(() => import( './pages/gforms/edit'));
const ViewForm  = React.lazy(() => import( './pages/gforms/view'));
//const PrintForm  = React.lazy(() => import( './pages/printout'));
const GeneratePayment  = React.lazy(() => import('./pages/user-rrr/generatePayment'));
const ListRRR  = React.lazy(() => import('./pages/user-rrr/list'));
const ListRRRByUser = React.lazy(() => import( './pages/user-rrr/view-list'));
const Renewal = React.lazy(() => import( './pages/user-rrr/renewal'));
<<<<<<< HEAD
<<<<<<< HEAD
const BulkAdd= React.lazy(() => import( './pages/user-rrr/bulkAdd'));
const NewRegWithTransfer = React.lazy(() => import( './pages/user-rrr/new'));
=======
const NewRegWithTransfer = React.lazy(() => import( './pages/user-rrr/new'));

>>>>>>> e1f21e82cefd7bc01d28f5150f934ae20e79f212
=======
const NewRegWithTransfer = React.lazy(() => import( './pages/user-rrr/new'));

>>>>>>> e1f21e82cefd7bc01d28f5150f934ae20e79f212
const ListDependants  = React.lazy(() => import( './pages/user-rrr/dependants'));
const AddUserRRR  = React.lazy(() => import( './pages/user-rrr/add'));
const AssignPermissions  = React.lazy(() => import( './pages/role/assign-permissions'));
const ViewAssignPermissions  = React.lazy(() => import( './pages/role/view'));
const Delete  = React.lazy(() => import('./components/delete'));
const EditWard  = React.lazy(() => import( './pages/ward/edit'));
const AddWard  = React.lazy(() => import( './pages/ward/add'));
const ListWard  = React.lazy(() => import( './pages/ward/list'));
const ChangePassword  = React.lazy(() => import( './pages/auth/change-password'));
const ChangePort  = React.lazy(() => import( './pages/auth/change-passport'));

const PaymentInfo  = React.lazy(() => import( './pages/paymeninfo'));

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
    //=================================
  {path: '/hospitals', name:'Hospital', element: Phc},
  {path: '/hospital/add', name:'Hospital', element: AddHospital},
  {path: '/:id/hospital', name:'Hospital', element: EditHospital},
  {path: '/:id/hospital/view', name:'Hospital', element: ViewHospital },
//================================
 {path: '/users/list', name:'Users', element: ListUsers },
 {  path: "/user/activate/0/1", name:'Password',  element: ActivateUser},
 {  path: "/user/Deactivate/0/1/0", name:'Password',  element: DeactivateUser},
 {  path: "/auth/getcodes/", name:'Codes',  element: getCodes},
 
//================================
{path: '/print/form/:id', name : 'PrintForm', element: PrintForm },

{path: '/receipt', name : 'Receipt', element: Receipt },
{path: '/renewal/rrr/', name : 'Renewal', element: Renewal },
{path: '/new/auth/', name : 'New_Tariff', element: NewRegWithTransfer },
<<<<<<< HEAD
<<<<<<< HEAD
{path: '/new/auth/add', name : 'Bulk_Add', element: BulkAdd },
=======
>>>>>>> e1f21e82cefd7bc01d28f5150f934ae20e79f212
=======
>>>>>>> e1f21e82cefd7bc01d28f5150f934ae20e79f212
{path: '/user-rrr/', name: 'User_RRR', element: ListRRR},
{path: '/user-rrr/view-list/', name: 'RRR', element: ListRRRByUser},
{path: '/user-rrr/dependants', name: 'List_dependants', element: ListDependants},
{path: '/user-rrr/generate/payment', name: 'Generate_Payment', element: GeneratePayment},
{path: '/user-rrr/add', name: 'User_RRR', element:AddUserRRR },
{path: '/delete', name:'Delete', element: Delete},
{path: '/change-passport', name: 'Change_password', element: ChangePassword },
{ path: '/passport-change/auth/file/1', element: ChangePort},
{path: '/role/list', name:'List_roles', element:List},
{path: '/role/add', name:'Add_roles', element: Add},
{path: '/:id/role/0', name:'AssignPermissions', element: AssignPermissions},
{path: '/:id/role/view', name: 'ViewPermissions', element: ViewAssignPermissions},
{path: '/:id/role', name:'Edit', element: Edit},
  {
  path: "/country",
  name:'ListCountry',
  element: ListCountry
}
,
  {
  path: "/:id/country",
  name:'EditCountry',
  element: EditCountry
}
,
{
  path: "/country/add",
  name:'AddCountry',
  element: AddCountry
}
,
  {
  path: "/hmo",
  name:'HMO',
  element: ListHmo
}
,
  {
  path: "/:id/hmo",
  name:'EditHmo',
  element: EditHmo
}
,
{
  path: "/hmo/add",
  name:'AddHMO',
  element: AddHmo
},
 {
  path: "/region",
  name:'List_Region',
  element: ListRegion 
},
 {
  path: "/:id/region",
  name:'EditRegion',
  element: EditRegion
}
,
{
  path: "/region/add",
  name:'AddRegion',
  element: AddRegion
}
,
 {
  path: "/state",
  name:'ListStates',
  element: ListStates
},

 {
  path: "/state/add",
  name:'State',
  element: AddStates
},
 {
  path: "/0/state",
  name:'State',
  element: EditStates
},

 {
  path: "/lga",
  name:'LGA',
  element: ListLga 
},

 {
  path: "/lga/add",
  name:'LGA',
  element: AddLga
},
 {
  path: "/0/lga",
  name:'LGA',
  element: EditLga
},
{
  path: "/ward",
  name:'Ward',
  element: ListWard
},

 {
  path: "/ward/add",
  name:'Ward',
  element: AddWard
},
 {
  path: "/0/ward",
   name:'Ward',
  element: EditWard
},
 {
  path: "/form/register",
   name:'Registration',
  element: ListRegister
},

 {
  path: "/form/register/add",
  name:'Registration',
  element: AddRegister
},
{
  path: "/:id/register/3",
  name:'Registration',
  element: ViewForm
},
{
  path: "/:id/register",
  name:'Registration',
  element: EditRegister
},
  {
  path: "/change-password",
  name:'Password',
  element: ChangePassword
},
 
  {
  path: "/gifship-list",
  name:'Gifship',
  element: GifshipList
}
,
  {
  path: "/gifshipt",
    name:'Gifship',
  element: GifshipType
},
 {
  path: "/gifshipedit/:id",
    name:'Gifship',
  element: GifshipEdit
},
{
  path: "/gifshipPackage",
    name:'Gifship',
  element: GifshipPackageList
}
,
{
  path: "/gifshipPackage/add",
    name:'Gifship',
  element: AddGifshipPackage
},
{
  path: "/gifshipPackage/:id/edit",
    name:'Gifship',
  element: EditGifshipPackage
},
//==============================================

  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
