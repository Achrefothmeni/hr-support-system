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
import React, { useEffect, useState } from 'react'
import { ADD_ALERT } from '../../constants/alertConstant'
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'
// core components
import Header from 'components/Headers/Header.js'
import { banHr, removeHr, getAgents, unbanHr } from '../../actions/agentAction'

const AgentsTable = ({ history }) => {
  const [forRemove, setForRemove] = useState(null)
  const [forMail, setForMail] = useState({
    subject: '',
    content: '',
    email: '',
  })
  const [defaultModal, setDefaultModal] = useState(false)
  const [mailModal, setMailModal] = useState(false)
  const dispatch = useDispatch()
  const listAgents = useSelector((state) => state.listAgents)
  const { loading, error, agents } = listAgents
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user || (user && !user.admin)) {
      console.log('not admin')
      history.push('/auth/login')
    }
  }, [dispatch, isAuthenticated, history])

  useEffect(() => {
    dispatch(getAgents())
  }, [dispatch])
  const banAgent = (a) => {
    dispatch(banHr(a._id))
  }

  const removeAgent = () => {
    dispatch(removeHr(forRemove._id))
    setForRemove(null)
    toggleModal()
  }
  const unbanAgent = (a) => {
    dispatch(unbanHr(a._id))
  }
  const toggleModal = () => {
    !defaultModal ? setDefaultModal(true) : setDefaultModal(false)
  }
  const toggleMailModal = () => {
    setMailModal(mailModal ? false : true)
  }
  const sendMail = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      await axios.post('/email', forMail, config)
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'success', message: 'Email sent successfully!' },
      })
      toggleMailModal()
    } catch (error) {
      dispatch({
        type: ADD_ALERT,
        payload: { type: 'error', message: 'Failed to send Email!' },
      })
      console.log(error)
    }
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='border-0'>
                <h3 className='mb-0'>Agents Table</h3>
              </CardHeader>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Agent</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Status</th>

                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    agents.map((a) => (
                      <tr>
                        <th scope='row'>
                          <Media className='align-items-center'>{a.name}</Media>
                        </th>
                        <td>{a.email} </td>
                        <td>
                          <Badge color='' className='badge-dot mr-4'>
                            <i
                              className={a.baned ? 'bg-danger' : 'bg-success'}
                            />
                            {a.baned ? 'BANED' : 'ACTIVE'}
                          </Badge>
                        </td>

                        <td className='text-right'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className='btn-icon-only text-light'
                              href='#pablo'
                              role='button'
                              size='sm'
                              color=''
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className='fas fa-ellipsis-v' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              <DropdownItem onClick={(e) => e.preventDefault()}>
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    unbanAgent(a)
                                  }}
                                  color='info'
                                  className='btn btn-block'
                                  type='button'
                                  onClick={() => {
                                    setForMail({
                                      email: a.email,
                                      subject: '',
                                      content: '',
                                    })
                                    toggleMailModal()
                                  }}
                                >
                                  Send Email
                                </Button>
                                <Modal
                                  className='modal-dialog-centered'
                                  isOpen={mailModal}
                                  toggle={() => {
                                    toggleMailModal()
                                  }}
                                >
                                  <div className='modal-header'>
                                    <h1
                                      className='modal-title'
                                      id='modal-title-default'
                                    >
                                      Send Email to your HR Agent
                                    </h1>
                                    <button
                                      aria-label='Close'
                                      className='close'
                                      data-dismiss='modal'
                                      type='button'
                                      onClick={() => toggleMailModal()}
                                    >
                                      <span aria-hidden={true}>×</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <Form
                                      role='form'
                                      onSubmit={(e) => {
                                        e.preventDefault()
                                        sendMail()
                                      }}
                                    >
                                      <FormGroup className='mb-3'>
                                        <InputGroup className='input-group-alternative'>
                                          <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                              <i className='ni ni-chat-round' />
                                            </InputGroupText>
                                          </InputGroupAddon>
                                          <Input
                                            value={forMail.subject}
                                            onChange={(e) =>
                                              setForMail({
                                                ...forMail,
                                                subject: e.target.value,
                                              })
                                            }
                                            placeholder='Subject'
                                            type='text'
                                          />
                                        </InputGroup>
                                      </FormGroup>
                                      <FormGroup>
                                        <InputGroup className='input-group-alternative'>
                                          <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                              <i className='ni ni-email-83' />
                                            </InputGroupText>
                                          </InputGroupAddon>
                                          <Input
                                            value={forMail.content}
                                            onChange={(e) =>
                                              setForMail({
                                                ...forMail,
                                                content: e.target.value,
                                              })
                                            }
                                            placeholder='Email content ...'
                                            rows='5'
                                            type='textarea'
                                          />
                                        </InputGroup>
                                      </FormGroup>

                                      <div className='text-center'>
                                        <Button
                                          className='my-4'
                                          color='primary'
                                          type='submit'
                                        >
                                          <span className='btn-inner-send'>
                                            <i className='ni ni-send' />
                                          </span>{' '}
                                          <span className='btn-inner--text'>
                                            Send
                                          </span>
                                        </Button>
                                      </div>
                                    </Form>
                                  </div>
                                </Modal>
                              </DropdownItem>
                              <DropdownItem onClick={(e) => e.preventDefault()}>
                                {a.baned ? (
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      unbanAgent(a)
                                    }}
                                    color='success'
                                    className='btn btn-block'
                                    type='button'
                                  >
                                    Unban
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      banAgent(a)
                                    }}
                                    color='danger'
                                    className='btn btn-block'
                                    type='button'
                                  >
                                    Ban
                                  </Button>
                                )}
                              </DropdownItem>
                              <DropdownItem onClick={(e) => e.preventDefault()}>
                                <Button
                                  onClick={() => {
                                    setForRemove(a)
                                    toggleModal()
                                  }}
                                  color='danger'
                                  className='btn btn-block'
                                  type='button'
                                >
                                  Remove
                                </Button>
                                <Modal
                                  className='modal-dialog-centered'
                                  isOpen={defaultModal}
                                  toggle={() => {
                                    toggleModal()
                                  }}
                                >
                                  <div className='modal-header'>
                                    <h1
                                      className='modal-title'
                                      id='modal-title-default'
                                    >
                                      Do you really want to remove this HR Agent
                                      ?
                                    </h1>
                                    <button
                                      aria-label='Close'
                                      className='close'
                                      data-dismiss='modal'
                                      type='button'
                                      onClick={() => toggleModal()}
                                    >
                                      <span aria-hidden={true}>×</span>
                                    </button>
                                  </div>
                                  <div className='modal-body'>
                                    <p>
                                      Confirm if you really want to remove this
                                      agent.
                                    </p>
                                  </div>
                                  <div className='modal-footer'>
                                    <Button
                                      color='danger'
                                      onClick={(e) => {
                                        e.preventDefault()
                                        removeAgent()
                                      }}
                                      type='button'
                                    >
                                      Remove
                                    </Button>
                                    <Button
                                      className='ml-auto'
                                      color='link'
                                      data-dismiss='modal'
                                      type='button'
                                      onClick={() => toggleModal()}
                                    >
                                      Close
                                    </Button>
                                  </div>
                                </Modal>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className='py-4'>
                <nav aria-label='...'>
                  <Pagination
                    className='pagination justify-content-end mb-0'
                    listClassName='justify-content-end mb-0'
                  >
                    <PaginationItem className='disabled'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                        tabIndex='-1'
                      >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='active'>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className='sr-only'>(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href='#pablo'
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className='fas fa-angle-right' />
                        <span className='sr-only'>Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        {/* Dark table */}
      </Container>
    </>
  )
}

export default AgentsTable
