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
} from 'reactstrap'
// core components
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import UserHeader from 'components/Headers/UserHeader.js'
import { planforMeet, getMeets } from '../../actions/meetAction'

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
  const dispatch = useDispatch()
  const classes = useStyles()
  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  )

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
    if (!user || (user && !user.admin)) {
      console.log('not admin')
      history.push('/auth/login')
    }
  }, [dispatch, isAuthenticated, error, history])
  const addMeet = (e) => {
    e.preventDefault()
    const test = new Date(meet.day.value) - new Date(Date.now()) > 0
    console.log(meet)
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
    }
  }
  return (
    <>
      <UserHeader />
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
                  <Agenda
                    // The list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key has to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    items={{
                      '2012-05-22': [{ name: 'item 1 - any js object' }],
                      '2012-05-23': [
                        { name: 'item 2 - any js object', height: 80 },
                      ],
                      '2012-05-24': [],
                      '2012-05-25': [
                        { name: 'item 3 - any js object' },
                        { name: 'any js object' },
                      ],
                    }}
                    // Callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={(month) => {
                      console.log('trigger items loading')
                    }}
                    // Callback that fires when the calendar is opened or closed
                    onCalendarToggled={(calendarOpened) => {
                      console.log(calendarOpened)
                    }}
                    // Callback that gets called on day press
                    onDayPress={(day) => {
                      console.log('day pressed')
                    }}
                    // Callback that gets called when day changes while scrolling agenda list
                    onDayChange={(day) => {
                      console.log('day changed')
                    }}
                    // Initially selected day
                    selected={'2012-05-16'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2012-05-30'}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // Specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => {
                      return <View />
                    }}
                    // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
                    renderDay={(day, item) => {
                      return <View />
                    }}
                    // Specify how empty date content with no items should be rendered
                    renderEmptyDate={() => {
                      return <View />
                    }}
                    // Specify how agenda knob should look like
                    renderKnob={() => {
                      return <View />
                    }}
                    // Specify what should be rendered instead of ActivityIndicator
                    renderEmptyData={() => {
                      return <View />
                    }}
                    // Specify your item comparison function for increased performance
                    rowHasChanged={(r1, r2) => {
                      return r1.text !== r2.text
                    }}
                    // Hide knob button. Default = false
                    hideKnob={true}
                    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                    markedDates={{
                      '2012-05-16': { selected: true, marked: true },
                      '2012-05-17': { marked: true },
                      '2012-05-18': { disabled: true },
                    }}
                    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                    disabledByDefault={true}
                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                    onRefresh={() => console.log('refreshing...')}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                    refreshControl={null}
                    // Agenda theme
                    theme={{
                      ...calendarTheme,
                      agendaDayTextColor: 'yellow',
                      agendaDayNumColor: 'green',
                      agendaTodayColor: 'red',
                      agendaKnobColor: 'blue',
                    }}
                    // Agenda container style
                    style={{}}
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
