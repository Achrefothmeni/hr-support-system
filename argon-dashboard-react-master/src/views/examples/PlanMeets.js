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
  Badge,
} from 'reactstrap'
// core components
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import UserHeader from 'components/Headers/UserHeader.js'
import { planforMeet, getMeets, cancelMeet } from '../../actions/meetAction'
import Scheduler from 'devextreme-react/scheduler'
import Header from 'components/Headers/Header.js'

import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import { ADD_FOR_MEET } from '../../constants/meetConstant'
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

const PlanMeets = ({ history }) => {
  const [data, setData] = useState([])
  const editing = {
    allowAdding: false,
    allowDeleting: true,
    allowResizing: true,
    allowDragging: false,
    allowUpdating: false,
  }
  const currentDate = new Date()
  const views = ['day', 'week']

  const dispatch = useDispatch()
  const classes = useStyles()
  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  )
  const {
    meets,
    error: meetError,
    loading: meetLoading,
    meetProfile,
  } = useSelector((state) => state.meet)
  let today = new Date()
  const [meet, setMeet] = useState({
    day: {
      value: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        '0'
      )}-${today.getDate()}T${String(today.getHours()).padStart(
        2,
        '0'
      )}:${today.getMinutes()}`,
      valid: false,
    },
    email: { value: '', valid: null },
    url: { value: '', valid: null },
    description: '',
  })
  useEffect(() => {
    dispatch(getMeets())
    const arr = []
    meets.map((m) => {
      const d = new Date(m.planedFor)
      d.setHours(d.getHours() + 1)

      arr.push({
        text: `Planed meet with ${m.email}`,
        startDate: new Date(m.planedFor),
        endDate: d,
        id: m._id,
      })
    })
    setData(arr)
  }, [])
  useEffect(() => {
    if (!user /* || (user && !user.admin) */) {
      /* console.log('not admin') */
      history.push('/auth/login')
    }
  }, [dispatch, isAuthenticated, error, history])

  useEffect(() => {
    const arr = []
    meets.map((m) => {
      const d = new Date(m.planedFor)
      d.setHours(d.getHours() + 1)

      arr.push({
        text: `Planed meet with ${m.email}`,
        startDate: new Date(m.planedFor),
        endDate: d,
        id: m._id,
      })
    })
    setData(arr)
  }, [meets])

  const addMeet = (e) => {
    e.preventDefault()

    setMeet({
      ...meet,
      email: {
        ...meet.email,
        valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(meet.email.value),
      },
      url: {
        ...meet.url,
        valid: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(meet.url.value),
      },
    })
    if (new Date(meet.day.value) - new Date(Date.now()) <= 0)
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'Please choose a valid date!' },
      })
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(meet.email.value))
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'invalid Email!' },
      })
    else if (!/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(meet.url.value))
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'invalid meet url!' },
      })
    else {
      if (meetProfile)
        dispatch(
          planforMeet({
            description: meet.description,
            url: meet.url.value,
            email: meet.email.value,
            day: meet.day.value,
            profile: meetProfile,
          })
        )
      else
        dispatch(
          planforMeet({
            description: meet.description,
            url: meet.url.value,
            email: meet.email.value,
            day: meet.day.value,
          })
        )

      setMeet({
        ...meet,
        email: { value: '', valid: null },
        url: { value: '', valid: null },
        description: '',
      })
      dispatch({ type: ADD_FOR_MEET, payload: null })
    }
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        <Row>
          <Col className='order-xl-1 ' xl='12'>
            <Card className='bg-secondary shadow justify-content-md-center'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>Meet Form</h3>
                  </Col>
                  <Col className='text-right' xs='4'>
                    <Button
                      color='primary'
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      size='sm'
                    >
                      Meeting
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={addMeet}>
                  <h6 className='heading-small text-muted mb-4'>Meet Form</h6>
                  <div className='pl-lg-4'>
                    {meetProfile && (
                      <Button
                        size='sm'
                        className='mb-4'
                        color='success'
                        onClick={(e) => e.preventDefault()}
                      >
                        {`meet with ${meetProfile.name}`}{' '}
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            dispatch({ type: ADD_FOR_MEET, payload: null })
                          }}
                          color='danger'
                          size='sm'
                          type='button'
                        >
                          <i className='fas fa-trash-alt'></i>
                        </Button>
                      </Button>
                    )}
                    <Row>
                      <Col lg='12'>
                        <FormGroup>
                          <TextField
                            id='datetime-local'
                            label='Next appointment'
                            type='datetime-local'
                            value={meet.day.value}
                            className={classes.textField}
                            onChange={(e) =>
                              setMeet({
                                ...meet,
                                day: { ...meet.day, value: e.target.value },
                              })
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </FormGroup>
                        <Row>
                          <Col md='6'>
                            <label htmlFor='mail'>Contact Email</label>
                            <FormGroup
                              className={
                                meet.email.valid === null
                                  ? ''
                                  : meet.email.valid
                                  ? 'has-success'
                                  : 'has-danger'
                              }
                            >
                              <Input
                                id='mail'
                                className={
                                  meet.email.valid === null
                                    ? ''
                                    : meet.email.valid
                                    ? 'is-valid'
                                    : 'is-invalid'
                                }
                                placeholder='Contact Email'
                                type='email'
                                value={meet.email.value}
                                onChange={(e) => {
                                  const exp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                  setMeet({
                                    ...meet,
                                    email: {
                                      value: e.target.value,
                                      valid: exp.test(e.target.value),
                                    },
                                  })
                                }}
                                onBlur={(e) => {
                                  const exp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                  setMeet({
                                    ...meet,
                                    email: {
                                      ...meet.email,
                                      valid: exp.test(e.target.value),
                                    },
                                  })
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col md='6'>
                            <label htmlFor='url'>Meet link</label>
                            <FormGroup
                              className={
                                meet.url.valid === null
                                  ? ''
                                  : meet.url.valid
                                  ? 'has-success'
                                  : 'has-danger'
                              }
                            >
                              <Input
                                id='url'
                                value={meet.url.value}
                                className={
                                  meet.url.valid === null
                                    ? ''
                                    : meet.url.valid
                                    ? 'is-valid'
                                    : 'is-invalid'
                                }
                                placeholder='Meet Link'
                                type='text'
                                onBlur={(e) => {
                                  const exp = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/
                                  setMeet({
                                    ...meet,
                                    url: {
                                      ...meet.url,
                                      valid: exp.test(e.target.value),
                                    },
                                  })
                                }}
                                onChange={(e) => {
                                  const exp = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/
                                  setMeet({
                                    ...meet,
                                    url: {
                                      value: e.target.value,
                                      valid: exp.test(e.target.value),
                                    },
                                  })
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Col md='12'>
                          <FormGroup>
                            <label htmlFor='desc'>Description</label>
                            <Input
                              id='desc'
                              className='form-control-alternative'
                              placeholder='Meeting Description ...'
                              rows='4'
                              value={meet.description}
                              onChange={(e) =>
                                setMeet({
                                  ...meet,
                                  description: e.target.value,
                                })
                              }
                              type='textarea'
                            />
                          </FormGroup>
                        </Col>
                      </Col>
                    </Row>
                  </div>

                  <Col md='12' className='justify-content-center'>
                    <Button color='success' type='submit'>
                      Plan Meet
                    </Button>
                  </Col>
                </Form>
              </CardBody>
            </Card>
            <Card className='bg-secondary shadow my-3 justify-content-md-center'>
              <CardHeader className='bg-white border-0'>
                <Row className='align-items-center'>
                  <Col xs='8'>
                    <h3 className='mb-0'>Calender</h3>
                  </Col>
                  <Col className='text-right' xs='4'>
                    <Button
                      color='primary'
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      size='sm'
                    >
                      Calender
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <hr className='my-4' />

                <Col md={12}>
                  <Scheduler
                    timeZone='Africa/Tunis'
                    dataSource={data}
                    views={views}
                    defaultCurrentView='week'
                    defaultCurrentDate={currentDate}
                    startDayHour={8}
                    endDayHour={19}
                    height={600}
                    editing={editing}
                    onAppointmentDeleted={(e) =>
                      dispatch(cancelMeet(e.appointmentData.id))
                    }
                  />
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlanMeets
