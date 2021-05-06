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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import AuthNavbar from "components/Navbars/AuthNavbar.js";

import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
/* import { loadUser } from '../actions/userActions'
import store from '../store' */

import routes, { notLoggedRoutes, managerRoutes, agentRoutes } from "routes.js";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,

} from "reactstrap";
const Home = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  const { isAuthenticated, error, loading, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  /* React.useEffect(() => {
    store.dispatch(loadUser())
  }, []);
 */
  /*  React.useEffect(() => {
     document.documentElement.scrollTop = 0;
     document.scrollingElement.scrollTop = 0;
     mainContent.current.scrollTop = 0;
   }, [location]);
 
 
   let routesSelected
 
   //manager route
   if(user && user.admin)
   {
     routesSelected = managerRoutes;
 
   }
 //agent route
   if(user && !user.admin)
   {
     routesSelected = agentRoutes;
 
   }
 
   //not logged it route
   if(!user){
     routesSelected = notLoggedRoutes
   }
   const getRoutes = (routes) => {
     return routes.map((prop, key) => {
       if (prop.layout === "/admin") {
         return (
           <Route
             path={prop.layout + prop.path}
             component={prop.component}
             key={key}
           />
         );
       } else {
         return null;
       }
     });
   };
 */
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>

      <HomeNavbar />



      <Container style={{ marginTop: 50 }}>



        <Row>
          <Col style={{ marginTop: 70 }} >
            <h1>Transform the way you recruit.</h1>
            <p>Recruiting candidates is easier than ever with HR SUPPORT recruitment ATS. Whether you work for a recruitment agency or in a human resources department, our cloud-based recruitment software is made for you. Start now!</p>
            <Row>
              <Col>                        <Button variant="secondary" >Start a free trial </Button>
              </Col>
              <Col>                        <Button color="primary" >Sign in </Button>
              </Col>
            </Row>
          </Col>
          <Col >
            <img className="center"

              alt="..."
              src={
                require("../assets/img/HR.png")
                  .default
              }
            />

          </Col>

        </Row>

      </Container>
    </>
  );
};

export default Home;
