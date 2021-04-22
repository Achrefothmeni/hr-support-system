/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from 'views/Index.js'
import AddProfile from 'views/examples/AddProfile'
import Maps from 'views/examples/Maps.js'
import Register from 'views/examples/Register.js'
import Login from 'views/examples/Login.js'
import Tables from 'views/examples/Tables.js'
import Icons from 'views/examples/Icons.js'
import AgentsTable from 'views/examples/AgentsTable'
import Profile from "views/examples/Profile.js";
import RecommendedProfile from "views/examples/RecommendedProfile";
import Settings from "views/examples/Settings";
import CvUpload from 'views/examples/CvUpload'
import PlanMeets from 'views/examples/PlanMeets'
var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-atom text-primary',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/add-agent',
    name: 'Add Agent',
    icon: 'ni ni-badge text-green',
    component: AddProfile,
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'ni ni-planet text-blue',
    component: Icons,
    layout: '/admin',
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: 'ni ni-pin-3 text-orange',
    component: Maps,
    layout: '/admin',
  },
  {
    path: '/agent-tables',
    name: 'Agents Table',
    icon: 'ni ni-bullet-list-67 text-red',
    component: AgentsTable,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Tables',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
  },
]

export const notLoggedRoutes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-atom text-primary',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
  },
]

export const managerRoutes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-atom text-primary',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/admin',
  },
  {
    path: "/recommended-profile",
    name: "Recommended Profile",
    icon: "ni ni-single-02 text-yellow",
    component: RecommendedProfile,
    layout: "/admin",

  },
  {
    path: '/add-agent',
    name: 'Add Agent',
    icon: 'ni ni-badge text-green',
    component: AddProfile,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: 'ni ni-settings-gear-65 text-yellow',
    component: Settings,
    layout: '/admin',
  },
  {
    path: '/meet-plan',
    name: 'Meeting Planning',
    icon: 'ni ni-calendar-grid-58 text-orange',
    component: PlanMeets,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Tables',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/agent-tables',
    name: 'Agents Table',
    icon: 'ni ni-bullet-list-67 text-red',
    component: AgentsTable,
    layout: '/admin',
  },



]

export const agentRoutes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-atom text-primary',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/meet-plan',
    name: 'Meeting Planning',
    icon: 'ni ni-calendar-grid-58 text-orange',
    component: PlanMeets,
    layout: '/admin',
  },
  {
    path: '/tables',
    name: 'Scrapped Profiles',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Tables,
    layout: '/admin',
  },
  {
    path: '/upload',
    name: 'Resume Upload',
    icon: 'ni ni-bullet-list-67 text-red',
    component: CvUpload,
    layout: '/admin',
  },
]
export default routes
