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

import { forgotPassword, clearErrors } from '../../actions/userActions'


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

const ForgotPassword = ({ history }) => {

  const [email, setEmail] = useState('')
  const [disable, setDisable] = useState(false)
  const dispatch = useDispatch();

  const { isAuthenticated, error, user, errorAuth } = useSelector(state => state.auth)
  const { loading} = useSelector(state => state.forgot)
  


  
  useEffect(() => {
    if (isAuthenticated) {

      history.push('/admin/user-profile')

    }



  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email))
    

    console.log(disable);

  }

  return (

    <>
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">


            <CardHeader className="bg-transparent pb-5">

              <img className="center"

                alt="..."
                src={
                  require("../../assets/img/HR.png")
                    .default
                }
              />
              {/* <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
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
              <small>Or sign in with credentials</small>
            </div> */}
              <Form role="form" onSubmit={submitHandler}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      //value = {email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>


                <div className="text-center">
                  <Button className="my-4" color="primary" type="submit" disabled={loading?true:false} >
                    Send Email
                </Button>
                </div>
              </Form>
            </CardBody>
          </Card>

        </Col>
      </>


    </>
  );
};

export default ForgotPassword;
