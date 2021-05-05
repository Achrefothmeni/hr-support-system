import UserHeader from 'components/Headers/UserHeader.js'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import Header from 'components/Headers/Header.js'
import { useToasts } from 'react-toast-notifications'
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardBody,
  Col,
  Button,
  Modal,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import axios from 'axios'
//import { Button } from "bootstrap";
import { getCollections } from '../../actions/collectionAction'
const RecommendedProfileList = () => {
  const [profiles, setProfiles] = useState(null)
  const [mailModal, setMailModal] = useState(false)
  const [collectionModal, setCollectionModal] = useState(false)
  const [selected, setSelected] = useState(-1)
  const [profileee, setProfile] = useState(null)
  const [forMail, setForMail] = useState({
    subject: '',
    content: '',
    email: '',
  })
  const { addToast } = useToasts()
  const dispatch = useDispatch()

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

  const toggleMailModal = () => {
    setMailModal(mailModal ? false : true)
  }
  const toggleCollectionModal = () => {
    setCollectionModal(!collectionModal)
  }
  const subCollection = () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      axios.post('/selections', {
        profile: profileee._id,
        to: collections[selected]._id,
      })
      setSelected(-1)
      setProfile(null)
      toggleCollectionModal()
      addToast(`Profile added successfully!`, {
        appearance: 'success',
        autoDismiss: true,
      })
    } catch (error) {
      addToast(`Failed to add Profile!`, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  const sendMail = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post('/email', forMail, config)
      addToast(`Email sent successfully!`, {
        appearance: 'success',
        autoDismiss: true,
      })
      toggleMailModal()
    } catch (error) {
      addToast(`Failed to send Email!`, {
        appearance: 'error',
        autoDismiss: true,
      })
      console.log(error)
    }
  }
  useEffect(() => {
    fetch('https://resume-parser-python-pi.herokuapp.com/recommendation')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setProfiles(data)
      })
  }, [setProfiles])

  return (
    <>
      <Header />
      <Container className='mt--7' fluid>
        <Modal
          className='modal-dialog-centered'
          isOpen={collectionModal}
          toggle={() => {
            toggleCollectionModal()
          }}
        >
          <div className='modal-header'>
            <h1 className='modal-title' id='modal-title-default'>
              Add to collection
            </h1>
            <button
              aria-label='Close'
              className='close'
              data-dismiss='modal'
              type='button'
              onClick={() => toggleCollectionModal()}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className='modal-body'>
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
          </div>

          <div className='modal-body'>
            <Form
              role='form'
              onSubmit={(e) => {
                e.preventDefault()
                subCollection()
              }}
            >
              <div className='text-center'>
                <Button className='my-4' color='primary' type='submit'>
                  <span className='btn-inner-send'>
                    <i className='ni ni-check-bold' />
                  </span>{' '}
                  <span className='btn-inner--text'>Add</span>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>

        <Modal
          className='modal-dialog-centered'
          isOpen={mailModal}
          toggle={() => {
            toggleMailModal()
          }}
        >
          <div className='modal-header'>
            <h1 className='modal-title' id='modal-title-default'>
              Send Email
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
                      <i className='fas fa-at'></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={forMail.email}
                    onChange={(e) =>
                      setForMail({
                        ...forMail,
                        email: e.target.value,
                      })
                    }
                    placeholder='Email'
                    type='email'
                  />
                </InputGroup>
              </FormGroup>
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
                <Button className='my-4' color='primary' type='submit'>
                  <span className='btn-inner-send'>
                    <i className='ni ni-send' />
                  </span>{' '}
                  <span className='btn-inner--text'>Send</span>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
        {profiles && (
          <Row className='mt-1'>
            {profiles.map((profile) => (
              <Col className='order-xl-2 mb-5 mb-xl-0 mb-3' xl='4'>
                <Card className='card-profile shadow'>
                  <Row className='justify-content-center'>
                    <Col className='order-lg-2' lg='3'>
                      <div className='card-profile-image'>
                        <a href='#pablo' onClick={(e) => e.preventDefault()}>
                          <img
                            alt='...'
                            className='rounded-circle'
                            src={
                              require('../../assets/img/Sample_User_Icon.png')
                                .default
                            }
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className='text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4'>
                    <div className='d-flex justify-content-between'>
                      <Button
                        className='mr-4'
                        color='info'
                        onClick={(e) => e.preventDefault()}
                        size='sm'
                        onClick={() => {
                          setForMail({
                            email: '',
                            subject: '',
                            content: '',
                          })
                          toggleMailModal()
                        }}
                      >
                        Mail
                      </Button>
                      <Button
                        className='ml-4'
                        color='default'
                        onClick={(e) => {
                          e.preventDefault()
                          dispatch({ type: 'ADD_FOR_MEET', payload: profile })
                        }}
                        size='sm'
                      >
                        meet
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className='pt-0 pt-md-4'>
                    <br /> <br />
                    <div className='text-center'>
                      <i
                        onClick={() => {
                          toggleCollectionModal()
                          setProfile(profile)
                        }}
                        className='fas fa-folder-plus fa-3x'
                        style={{ cursor: 'pointer', color: '#20e6a1' }}
                      ></i>
                      <h3>
                        {profile.name}
                        <span className='font-weight-light'></span>
                      </h3>
                      <div className='h5 font-weight-300'>
                        <i className='ni location_pin mr-2' />
                        Experience: {profile.years_exp} ans
                      </div>

                      <div></div>
                      <hr className='my-4' />
                      <h2>Skills & endorsements</h2>
                      <p>{profile.skills}</p>
                      <a href={profile.url} target='_blank'>
                        Show more
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  )
}

export default RecommendedProfileList
