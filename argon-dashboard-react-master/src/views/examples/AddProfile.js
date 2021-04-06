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
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addhr } from '../../actions/agentAction'
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

const AddProfile = () => {
  const dispatch = useDispatch()
  const listAgents = useSelector((state) => state.listAgents)

  const [hr, setHr] = useState({
    name: '',
    organisationName: '',
    email: '',
    password: '',
    phoneNumber: '',
  })
  const resetHR = () => {
    setHr({
      name: '',
      organisationName: '',
      email: '',
      password: '',
      phoneNumber: '',
    })
  }

  const addAgent = async (e) => {
    e.preventDefault()

    dispatch(addhr(hr))
    resetHR()
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
              <CardBody>
                <Form onSubmit={addAgent}>
                  <h6 className='heading-small text-muted mb-4'>
                    Agent information
                  </h6>
                  <div className='pl-lg-4'>
                    <Row>
                      <Col lg='12'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-first-name'
                          >
                            Full name
                          </label>
                          <Input
                            name='name'
                            value={hr.name}
                            onChange={(e) =>
                              setHr({ ...hr, [e.target.name]: e.target.value })
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
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-email'
                          >
                            Email address
                          </label>
                          <Input
                            name='email'
                            value={hr.email}
                            onChange={(e) =>
                              setHr({ ...hr, [e.target.name]: e.target.value })
                            }
                            className='form-control-alternative'
                            id='input-email'
                            placeholder='jesse@example.com'
                            type='email'
                          />
                        </FormGroup>
                      </Col>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-password'
                          >
                            Password
                          </label>
                          <Input
                            value={hr.password}
                            onChange={(e) =>
                              setHr({ ...hr, [e.target.name]: e.target.value })
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
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-Organization'
                          >
                            Organization name
                          </label>
                          <Input
                            name='organisationNname'
                            className='form-control-alternative'
                            id='input-Organization'
                            placeholder='Organization name'
                            type='text'
                            value={hr.organisationName}
                            onChange={(e) =>
                              setHr({ ...hr, [e.target.name]: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg='6'>
                        <FormGroup>
                          <label
                            className='form-control-label'
                            htmlFor='input-phone'
                          >
                            Phone number
                          </label>
                          <Input
                            name='phoneNumber'
                            value={hr.phoneNumber}
                            onChange={(e) =>
                              setHr({ ...hr, [e.target.name]: e.target.value })
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AddProfile
