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
import React , {useEffect, useState} from "react";
import { useDispatch, useSelector} from 'react-redux'
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
import InputTags from 'components/InputTags'
import { addSettings,deleteSettings } from "actions/settingsAction";

const Settings = () => {
 


 

  const [settingName, setSettingName] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [skills, setSkills] = useState([{name:'java'} , {name: 'PHP'}])
  const dispatch = useDispatch();

  const submitHandler = (e)=> {
    e.preventDefault();
    
    dispatch(addSettings(settingName,city,postalCode, country,skills))
    
    console.log({settingName,city,postalCode, country,skills});
  }

  const selectedTags = tags => {console.log(tags)};

 
  return (
    <>
  
      {/* Page content */}
      
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Profile's Settings </h3>
                  </Col>
                
                </Row>
                <Form  noValidate onSubmit={submitHandler}>
                  <h6 className="heading-small text-muted mb-4">
                    Profile Skills
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                     
                  
                    </Row>
                    <Row>
                   
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                           Job Name :  
                          </label>
                          <Input
                            className="form-control-alternative"
                        
                            id="input-job-name"
                            placeholder="Job Name"
                            type="text"   onChange={(e) => setSettingName(e.target.value)} /> 
                         
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                           Skills :  
                          </label>
                          <InputTags     /> 
                        
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Adress information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                     
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="City"
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create Settings
                </Button>
              </div>
               
                </Form>
        
    </>
  );
};

export default Settings;
