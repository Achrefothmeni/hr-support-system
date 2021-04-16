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
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addhr } from '../../actions/agentAction'
import Spinner from 'react-bootstrap/Spinner'
import { ADD_ALERT } from '../../constants/alertConstant'
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
} from 'reactstrap'
// core components
import UserHeader from 'components/Headers/UserHeader.js'

const AddProfile = ({ history }) => {
  const dispatch = useDispatch()

  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (!user || (user && !user.admin)) {
      console.log('not admin')
      history.push('/auth/login')
    }
  }, [dispatch, isAuthenticated, error, history])

  const { error: addError, loading: loadingAdd } = useSelector(
    (state) => state.listAgents
  )

  const [hr, setHr] = useState({
    name: {
      value: '',
      valid: null,
    },
    organisationName: {
      value: '',
      valid: null,
    },
    email: {
      value: '',
      valid: null,
    },
    password: {
      value: '',
      valid: null,
    },
    phoneNumber: {
      value: '',
      valid: null,
    },
  })
  const resetHR = () => {
    setHr({
      name: {
        value: '',
        valid: null,
      },
      organisationName: {
        value: '',
        valid: null,
      },
      email: {
        value: '',
        valid: null,
      },
      password: {
        value: '',
        valid: null,
      },
      phoneNumber: {
        value: '',
        valid: null,
      },
    })
  }

  const addAgent = (e) => {
    e.preventDefault()

    setHr({
      ...hr,
      email: {
        ...hr.email,
        valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hr.email.value),
      },
      name: {
        ...hr.name,
        valid: hr.name.value.length > 0,
      },
      password: {
        ...hr.password,
        valid: hr.password.value.length >= 8,
      },
      organisationName: {
        ...hr.organisationName,
        valid: hr.organisationName.value.length > 0,
      },
      phoneNumber: {
        ...hr.phoneNumber,
        valid: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
          hr.phoneNumber.value
        ),
      },
    })
    if (!hr.name.valid)
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'Name is Required' },
      })
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hr.email.value))
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'invalid Email!' },
      })
    else if (!hr.password.valid)
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'invalid Password!' },
      })
    else if (!hr.organisationName.valid)
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'invalid Organization name!' },
      })
    else if (!hr.phoneNumber.valid)
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'invalid Phone number!' },
      })
    else {
      dispatch(
        addhr({
          phoneNumber: hr.phoneNumber.value,
          name: hr.name.value,
          password: hr.password.value,
          email: hr.email.value,
          organisationName: hr.organisationName.value,
        })
      )

      resetHR()
    }
  }

  return (
    <>
      <UserHeader btnTitle='Edit profile' />
      {/* Page content */}
      <Container className='mt--7' fluid>
        <Row>
          <Col className='order-xl-1 ' xl='12'>
            <Card className='bg-secondary shadow justify-content-md-center'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>HR agent</h3>
                  </Col>
                  <Col className='text-right' xs='4'>
                    <Button
                      color='primary'
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      size='sm'
                    >
                      Account
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {loadingAdd ? (
                <Col md='12' className='justify-content-md-center'>
                  <Spinner animation='border' variant='dark' />
                </Col>
              ) : (
                <CardBody>
                  <Form onSubmit={addAgent}>
                    <h6 className='heading-small text-muted mb-4'>
                      Agent information
                    </h6>
                    <div className='pl-lg-4'>
                      <Row>
                        <Col lg='12'>
                          <FormGroup
                            className={
                              hr.name.valid === null
                                ? ''
                                : hr.name.valid
                                ? 'has-success'
                                : 'has-danger'
                            }
                          >
                            <label
                              className='form-control-label'
                              htmlFor='input-first-name'
                            >
                              Full name
                            </label>
                            <Input
                              name='name'
                              className={
                                hr.name.valid === null
                                  ? ''
                                  : hr.name.valid
                                  ? 'is-valid'
                                  : 'is-invalid'
                              }
                              value={hr.name.value}
                              onChange={(e) =>
                                setHr({
                                  ...hr,
                                  name: {
                                    value: e.target.value,
                                    valid: e.target.value.length > 0,
                                  },
                                })
                              }
                              onBlur={(e) =>
                                setHr({
                                  ...hr,
                                  name: {
                                    ...hr.name,
                                    valid: hr.name.value.length > 0,
                                  },
                                })
                              }
                              className='form-control-alternative'
                              defaultValue='Lucky'
                              id='input-first-name'
                              placeholder='First name'
                              type='text'
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6'>
                          <FormGroup
                            className={
                              hr.email.valid === null
                                ? ''
                                : hr.email.valid
                                ? 'has-success'
                                : 'has-danger'
                            }
                          >
                            <label
                              className='form-control-label'
                              htmlFor='input-email'
                            >
                              Email address
                            </label>
                            <Input
                              className={
                                hr.email.valid === null
                                  ? ''
                                  : hr.email.valid
                                  ? 'is-valid'
                                  : 'is-invalid'
                              }
                              name='email'
                              value={hr.email.value}
                              onChange={(e) =>
                                setHr({
                                  ...hr,
                                  email: {
                                    value: e.target.value,
                                    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                      hr.email.value
                                    ),
                                  },
                                })
                              }
                              onBlur={(e) =>
                                setHr({
                                  ...hr,
                                  email: {
                                    ...hr.email,
                                    valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                      hr.email.value
                                    ),
                                  },
                                })
                              }
                              className='form-control-alternative'
                              id='input-email'
                              placeholder='Email'
                              type='email'
                            />
                          </FormGroup>
                        </Col>
                        <Col lg='6'>
                          <FormGroup
                            className={
                              hr.password.valid === null
                                ? ''
                                : hr.password.valid
                                ? 'has-success'
                                : 'has-danger'
                            }
                          >
                            <label
                              className='form-control-label'
                              htmlFor='input-password'
                            >
                              Password
                            </label>
                            <Input
                              className={
                                hr.password.valid === null
                                  ? ''
                                  : hr.password.valid
                                  ? 'is-valid'
                                  : 'is-invalid'
                              }
                              value={hr.password.value}
                              onChange={(e) =>
                                setHr({
                                  ...hr,
                                  password: {
                                    value: e.target.value,
                                    valid: e.target.value.length >= 8,
                                  },
                                })
                              }
                              onBlur={(e) =>
                                setHr({
                                  ...hr,
                                  password: {
                                    ...hr.password,
                                    valid: hr.password.value.length >= 8,
                                  },
                                })
                              }
                              name='password'
                              className='form-control-alternative'
                              id='input-password'
                              placeholder='Password'
                              type='password'
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6'>
                          <FormGroup
                            className={
                              hr.organisationName.valid === null
                                ? ''
                                : hr.organisationName.valid
                                ? 'has-success'
                                : 'has-danger'
                            }
                          >
                            <label
                              className='form-control-label'
                              htmlFor='input-Organization'
                            >
                              Organization name
                            </label>
                            <Input
                              className={
                                hr.organisationName.valid === null
                                  ? ''
                                  : hr.organisationName.valid
                                  ? 'is-valid'
                                  : 'is-invalid'
                              }
                              name='organisationName'
                              className='form-control-alternative'
                              id='input-Organization'
                              placeholder='Organization name'
                              type='text'
                              value={hr.organisationName.value}
                              onChange={(e) =>
                                setHr({
                                  ...hr,
                                  organisationName: {
                                    value: e.target.value,
                                    valid: hr.organisationName.value.length > 0,
                                  },
                                })
                              }
                              onBlur={(e) =>
                                setHr({
                                  ...hr,
                                  organisationName: {
                                    ...hr.organisationName,
                                    valid: hr.organisationName.value.length > 0,
                                  },
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg='6'>
                          <FormGroup
                            className={
                              hr.phoneNumber.valid === null
                                ? ''
                                : hr.phoneNumber.valid
                                ? 'has-success'
                                : 'has-danger'
                            }
                          >
                            <label
                              className='form-control-label'
                              htmlFor='input-phone'
                            >
                              Phone number
                            </label>
                            <Input
                              className={
                                hr.phoneNumber.valid === null
                                  ? ''
                                  : hr.phoneNumber.valid
                                  ? 'is-valid'
                                  : 'is-invalid'
                              }
                              name='phoneNumber'
                              value={hr.phoneNumber.value}
                              onChange={(e) =>
                                setHr({
                                  ...hr,
                                  phoneNumber: {
                                    value: e.target.value,
                                    valid: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
                                      hr.phoneNumber.value
                                    ),
                                  },
                                })
                              }
                              onBlur={(e) =>
                                setHr({
                                  ...hr,
                                  phoneNumber: {
                                    ...hr.phoneNumber,
                                    valid: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
                                      hr.phoneNumber.value
                                    ),
                                  },
                                })
                              }
                              className='form-control-alternative'
                              id='input-phone'
                              placeholder='Phone number'
                              type='text'
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <Col md='12' className='justify-content-center'>
                      <Button color='success' type='submit'>
                        Add HR Agent
                      </Button>
                    </Col>
                  </Form>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddProfile
