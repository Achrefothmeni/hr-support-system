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
import { useToasts } from 'react-toast-notifications'
import { Rate } from 'antd'
import 'antd/dist/antd.css'
// reactstrap components
import EventForm from './EventForm'
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
  Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Alert,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'

// core components
import Header from 'components/Headers/Header.js'
import {
  getCollections,
  getContent,
  addCol,
  subRate,
  addNote,
  deleteNote,
  deleteElement,
} from '../../actions/collectionAction'

const CollectionsTable = ({ history }) => {
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']
  const [note, setNote] = useState({ value: '', edit: false })
  const [rate, setRate] = useState(0)
  const [modal, setModal] = useState(false)
  const [element, setElement] = useState(null)

  const toggleModal = () => {
    setModal(!modal)
  }
  const { addToast } = useToasts()

  const dispatch = useDispatch()
  const [selected, setSelected] = useState(-1)
  const [show, setShow] = useState(true)
  const [collection, setCollection] = useState({
    title: { value: '', valid: null },
    notification: { active: false, value: '', valid: null },
  })
  useEffect(() => {
    if (element)
      dispatch(subRate({ rate: rate }, element._id, collections[selected]))
  }, [rate])
  useEffect(() => {
    if (element)
      element.ratings.map((r) => {
        if (r.by == user._id) setRate(r.rate)
      })
  }, [element, content])
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const {
    collections,
    content,
    error: errorColl,
    loading: loadingColl,
  } = useSelector((state) => state.collection)
  useEffect(() => {
    if (!user /* || (user && !user.admin) */) {
      /* console.log('not admin') */
      history.push('/auth/login')
    }
    dispatch(getCollections())
  }, [dispatch, isAuthenticated, history])

  useEffect(() => {
    if (selected !== -1) dispatch(getContent(collections[selected]))
  }, [selected])
  const removeElement = () => {
    setNote({ ...note, removeEle: true })
    dispatch(deleteElement(element._id))
  }
  const submitAddNote = (e) => {
    e.preventDefault()
    setNote({ ...note, submit: true })
    if (note.value) dispatch(addNote(note.value, element._id))
  }
  useEffect(() => {
    if (note.submit && !loadingColl) {
      setElement(content[note.index].events[note.index1])
      setNote({ ...note, value: '', submit: false })
    }
    if (note.remove && !loadingColl) {
      setElement(content[note.index].events[note.index1])
      setNote({ ...note, value: '', remove: false })
    }
    if (note.removeEle && !loadingColl) {
      setNote({ ...note, value: '', removeEle: false })
    }
  }, [content])
  const removeNote = (n) => {
    setNote({ ...note, remove: true })
    dispatch(deleteNote(element._id, n._id))
  }
  const addCollection = (e) => {
    e.preventDefault()
    let msg = ''
    setCollection({
      ...collection,
      title: { ...collection.title, valid: collection.title.value.length > 3 },
      notification: {
        ...collection.notification,
        valid:
          (collection.notification.value && collection.notification.active) ||
          !collection.notification.active,
      },
    })
    if (!collection.title.valid) {
      msg = 'Title is required!\n'
      addToast(msg, {
        appearance: 'error',
        autoDismiss: true,
      })
    }

    if (collection.notification.active && !collection.notification.value) {
      msg = 'Notification is required!\n'
      addToast(msg, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    if (!msg) {
      dispatch(
        addCol({
          title: collection.title.value,
          notification: collection.notification.value,
          notifActivated: collection.notification.active,
        })
      )
      setCollection({
        title: { value: '', valid: null },
        notification: { active: false, value: '', valid: null },
      })
      setShow(!show)
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
                <h3 className='mb-2'>Collections</h3>
                <Row className='mb-2'>
                  {' '}
                  <div>
                    <UncontrolledDropdown>
                      <DropdownToggle caret color='secondary'>
                        {selected === -1
                          ? '--Choose a collection--'
                          : collections[selected].title}
                      </DropdownToggle>

                      <DropdownMenu>
                        {collections.map((e, i) => (
                          <DropdownItem
                            key={i}
                            onClick={(e) => {
                              e.preventDefault()
                              setSelected(i)
                            }}
                          >
                            {e.title}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>{' '}
                  <Button
                    size='sm'
                    onClick={(e) => {
                      e.preventDefault()
                      setShow(!show)
                    }}
                    className={show ? 'btn btn-success' : 'btn btn-warning'}
                  >
                    {show ? 'Show Form' : 'Hide Form'}
                  </Button>
                </Row>
                <Form hidden={show} onSubmit={addCollection}>
                  <h6 className='heading-small text-muted mb-4'>
                    Add Collection
                  </h6>
                  <Col lg='4'>
                    <FormGroup
                      className={
                        collection.title.valid === null
                          ? ''
                          : collection.title.valid === false
                          ? 'has-danger'
                          : 'has-success'
                      }
                    >
                      <label
                        className='form-control-label'
                        htmlFor='input-title'
                      >
                        Collection Title
                      </label>
                      <Input
                        className={
                          collection.title.valid === null
                            ? 'form-control-alternative'
                            : collection.title.valid === false
                            ? 'is-invalid'
                            : 'is-valid'
                        }
                        id='input-title'
                        placeholder='Title'
                        type='text'
                        value={collection.title.value}
                        onChange={(e) => {
                          setCollection({
                            ...collection,
                            title: {
                              valid: e.target.value.length > 3,
                              value: e.target.value,
                            },
                          })
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <div className='pl-lg-4'>
                    <Button
                      onClick={(e) =>
                        setCollection({
                          ...collection,
                          notification: {
                            ...collection.notification,
                            active: !collection.notification.active,
                          },
                        })
                      }
                      color={
                        collection.notification.active ? 'danger' : 'primary'
                      }
                      size='sm'
                      type='button'
                    >
                      {collection.notification.active
                        ? 'Disable Notification'
                        : 'Enable Notification'}
                    </Button>

                    <FormGroup>
                      <label htmlFor='notif'>Notification</label>
                      <Input
                        disabled={!collection.notification.active}
                        id='notif'
                        value={collection.notification.value}
                        onChange={(e) =>
                          setCollection({
                            ...collection,
                            notification: {
                              ...collection.notification,
                              value: e.target.value,
                            },
                          })
                        }
                        className='form-control-alternative'
                        placeholder='Setup Notification message ...'
                        rows='4'
                        type='textarea'
                      />
                    </FormGroup>
                  </div>
                  <Button type='submit' color='success'>
                    ADD COLLECTION
                  </Button>
                </Form>
              </CardHeader>

              <Table className='align-items-center' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Profile</th>
                    <th scope='col'>Position</th>
                    <th scope='col'>Events</th>

                    <th scope='col' />
                  </tr>
                </thead>
                <tbody>
                  {content.map((c, indec) => (
                    <tr>
                      <th scope='row'>{c.profile.name}</th>
                      <td>{c.profile.position}</td>
                      <td>
                        {c &&
                          c.events.map((e, i) => (
                            <Button
                              color='primary'
                              onClick={(ev) => {
                                setRate(0)
                                setNote({ value: '', index: indec, index1: i })
                                ev.ratings &&
                                  ev.ratings.map((r) => {
                                    if (r.by == user._id) {
                                      setRate(r.rate)
                                    }
                                  })
                                ev.preventDefault()
                                setElement(e)

                                toggleModal()
                              }}
                              size='sm'
                              type='button'
                            >
                              {e.title}{' '}
                            </Button>
                          ))}
                      </td>

                      <td className='text-right'>
                        <EventForm id={c._id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <CardFooter className='py-4'></CardFooter>
            </Card>
          </div>
        </Row>
        <Modal
          className='modal-dialog-centered'
          isOpen={modal}
          toggle={() => toggleModal()}
        >
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              {element && element.title}
            </h5>
            <Container>
              <span>
                Rate :{' '}
                <Rate
                  tooltips={desc}
                  onChange={(value) => {
                    setRate(value)
                  }}
                  value={rate}
                />
                {rate ? (
                  <span className='ant-rate-text'>{desc[rate - 1]}</span>
                ) : (
                  ''
                )}
              </span>
              <Form>
                <FormGroup className=' mb-1'>
                  <label htmlFor='note'>Note</label>
                  <Input
                    value={note.value}
                    onChange={(e) =>
                      setNote({ ...note, value: e.target.value })
                    }
                    id='note'
                    className='form-control-alternative'
                    placeholder='Add your notes ...'
                    rows='4'
                    type='textarea'
                  />
                </FormGroup>
                <Button
                  color='success'
                  className='mb-3'
                  size='sm'
                  type='button'
                  onClick={submitAddNote}
                >
                  add
                </Button>
              </Form>
              {element &&
                element.notes &&
                element.notes.map((n, inx) => (
                  <>
                    <Alert key={inx} className='alert-default'>
                      {n.note}{' '}
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          removeNote(n)
                        }}
                        color='danger'
                        size='sm'
                        type='button'
                      >
                        <i className='fas fa-trash-alt'></i>
                      </Button>
                    </Alert>
                  </>
                ))}
            </Container>
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
          <div className='modal-body'>...</div>
          <div className='modal-footer'>
            <Button
              color='danger'
              onClick={(e) => {
                toggleModal()
                e.preventDefault()
                removeElement()
              }}
              size='sm'
              type='button'
            >
              <i className='fas fa-trash-alt'></i>
            </Button>
            <Button
              color='secondary'
              data-dismiss='modal'
              type='button'
              onClick={() => toggleModal()}
            >
              Close
            </Button>
          </div>
        </Modal>
        {/* Dark table */}
      </Container>
    </>
  )
}

export default CollectionsTable
