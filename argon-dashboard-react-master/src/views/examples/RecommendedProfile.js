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
import React, {useEffect, useState} from "react";

// reactstrap components
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
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import {useSelector , useDispatch } from  'react-redux'
import { listProfiles} from '../../actions/profileAction'
import {listActivity } from '../../actions/activityAction'
import axios from 'axios';
const RecommendedProfile = () => {

  const dispatch = useDispatch()

  const profileList = useSelector(state => state.profileList)
  const activityList = useSelector(state => state.activityList)

  const [callback, setCallback] = useState(false)
  const {loading , error , profiles} = profileList
      useEffect( () => {
        dispatch(listProfiles())
      } , [dispatch])
      const {loadingg , errorr , activities} = activityList
      useEffect( () => {
        dispatch(listActivity())
      } , [dispatch,callback])
      console.log(profiles)

      const addReact = async (id) =>{
        try {
          await axios.post("/api/activity/add",{activity : {profile: id}})
          console.log('jawha behi')
          setCallback(!callback)
        } catch (error) {
          console.log(error)
        }
      }


     const veriff = (id) =>{
       return activities.some(a => a.profile === id)
     }
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-1">



        {profiles.map( profile =>  (

<Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
<Card className="card-profile shadow">
  <Row className="justify-content-center">
    <Col className="order-lg-2" lg="3">
      <div className="card-profile-image">
        <a href="#pablo" onClick={(e) => e.preventDefault()}>
          <img
            alt="..."
            className="rounded-circle"
            src={
              require("../../assets/img/theme/team-1-800x800.jpg")
                .default
            }
          />
        </a>
      </div>
    </Col>
  </Row>
  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
    <div className="d-flex justify-content-between">
      <Button
        className="mr-4"
        color="info"
        href="#pablo"
        onClick={(e) => e.preventDefault()}
        size="sm"
      >
        Mail
      </Button>
      <Button
        className="ml-4"
        color="default"
        href="#pablo"
        onClick={(e) => e.preventDefault()}
        size="sm"
      >
         meet 
      </Button>
    </div>
  </CardHeader>
  <CardBody className="pt-0 pt-md-4">
  <br/>        <br/>
    <div className="text-center">
    <center> <div className="ml-12 icon icon-shape bg-danger text-white rounded-circle shadow">
           
            
           <i className={veriff(profile._id) ? 'fas fa-heart' : 'far fa-heart'} onClick={() =>  addReact(profile._id)} />
       
       
      
            
             </div></center> <br></br> 
      <h3>
        {profile.name}
        <span className="font-weight-light">, 36</span>
      </h3>
      <div className="h5 font-weight-300">
        <i className="ni location_pin mr-2" />
        {profile.position}
      </div>
 
      <div>
     
      </div>
      <hr className="my-4" />
      <h2>Skills & endorsements</h2>
      <p>
      {profile.skills.map( s => (
         <p>
         {s.name}
          </p>
                      
                      ))}
      </p>
      <a href="#pablo" onClick={(e) => e.preventDefault()}>
        Show more
      </a>
    </div>
  </CardBody>
</Card>
</Col>

        ))}


     















          
          <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Mail
                  </Button>
                  <Button
                    className="ml-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                     meet 
                  </Button>
                
                </div>
              </CardHeader>
             
                 
              <CardBody className="pt-0 pt-md-4">
            <br></br> <br></br>
             <center> <div className="ml-12 icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-heart" />
                  </div></center>
              <br/>        <br/>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <h2>Skills & endorsements</h2>
                  <p>
                 Java , PHP , HTML , CSS , NodeJS , React , MySQL , MongoDB
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>





            
          </Col>
        
          <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-1-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Mail
                  </Button>
                  <Button
                    className="ml-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                     meet 
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
              <br/>        <br/>
                <div className="text-center">
                  <h3>
                    Eric Cantona
                    <span className="font-weight-light">, 36</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Nice, France
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University de Nice  
                  </div>
                  <hr className="my-4" />
                  <h2>Skills & endorsements</h2>
                  <p>
                 Java , PHP , HTML , CSS , NodeJS , React , MySQL , MongoDB
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>





            
          </Col>



          <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-2-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Mail
                  </Button>
                  <Button
                    className="ml-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                     meet 
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
              <br/>        <br/>
                <div className="text-center">
                  <h3>
                    Samira Philips
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Paris, France
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <h2>Skills & endorsements</h2>
                  <p>
                 Java , PHP , HTML , CSS , NodeJS , React , MySQL , MongoDB
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>





            
          </Col>




          <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-3-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Mail
                  </Button>
                  <Button
                    className="ml-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                     meet 
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
              <br/>        <br/>
                <div className="text-center">
                  <h3>
                    Erika Jones
                    <span className="font-weight-light">, 24</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Manchester, UK
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager 
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                   Manchester University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <h2>Skills & endorsements</h2>
                  <p>
                 Java , PHP , HTML , CSS , NodeJS , React , MySQL , Android
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>





            
          </Col>
          <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-5-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Mail
                  </Button>
                  <Button
                    className="ml-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                     meet 
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
              <br/>        <br/>
               
                <div className="text-center">
                  <h3>
                    Achraf Zaafrane
                    <span className="font-weight-light">, 25</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Tunis, Tunisia
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Web Developer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Esprit Tunisia
                  </div>
                  <hr className="my-4" />
                  <h2>Skills & endorsements</h2>
                  <p>
                 Java , PHP , HTML , CSS , NodeJS , React , MySQL , MongoDB, Symfony
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>





            
          </Col>
          <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-6-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Mail
                  </Button>
                  <Button
                    className="ml-12"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                     Meet 
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
              <br/>        <br/>
                <div className="text-center">
                  <h3>
                   Oussema Trabelsi 
                    <span className="font-weight-light">, 25</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Saint-Etienne, France
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Web developer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                   Université de Lyon
                  </div>
                  <hr className="my-4" />
                  <h2>Skills & endorsements</h2>
                  <p>
                 Java , PHP , HTML , CSS , NodeJS , React , MySQL , AI
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>





            
          </Col>
          <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Mail
                  </Button>
                  <Button
                    className="ml-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                     meet
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
        <br/>        <br/>

                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <h2>Skills & endorsements</h2>
                  <p>
                 Java , PHP , HTML , CSS , NodeJS , React , MySQL , MongoDB
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>





            
          </Col>

        </Row>
      </Container>





      
    </>
  );
};

export default RecommendedProfile;