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
import { Link } from 'react-router-dom'


import { register } from '../../actions/userActions'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";



const Register = ({ history }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [organisationName, setOrganisationName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [disable, setDisable] = useState(true)

  const [eye,setEye] = useState('fas fa-eye')
  const [passwordType,SetPasswordType] = useState('password')


  const handleEye = (e)=> {
    e.preventDefault();

    if(eye == 'fas fa-eye'){
      setEye('fas fa-eye-slash')
      SetPasswordType('text')

    }

      else {

      setEye('fas fa-eye')
      SetPasswordType('password')


      }

    

  }

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth)

  const [disabled, setDisabled] = useState(true);

  const handleInputDisable = ()=> {
    setDisabled(!disabled);
    
    
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/admin/user-profile')
    }

    if (error) {
      //to test redirect to /admin/tables
      console.log(error)
    }

  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (e)=> {
    e.preventDefault();
    dispatch(register(name,organisationName,email, password,phoneNumber))
    console.log({name,organisationName,email, password,phoneNumber});

  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">

          <img className ="center"
                    alt="..."
                    src={
                      require("../../assets/img/HR.png")
                        .default
                    }
                  />
          
           {/*  <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div> */}
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div> */}
            <Form role="form" onSubmit={submitHandler}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-briefcase" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Organisation Name" type="text"
                    onChange={(e) => setOrganisationName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => setEmail(e.target.value)}

                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    placeholder="Password"
                    type={passwordType}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}

                  />
                  <i className={eye} style={{cursor: "pointer",paddingTop:10}} onClick= {handleEye} />
                </InputGroup>
              </FormGroup>
              
             

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-phone-alt" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Phone number" type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      onClick={() => setDisable(!disable)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a  >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit" disabled={disable} >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>

      
    </>
  );
};

export default Register;
