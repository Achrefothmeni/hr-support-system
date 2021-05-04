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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,

} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Modal } from "react-bootstrap";

import { updateUser } from '../../actions/userActions'
//testing
import { SameProfiles } from '../../actions/profileAction'
import Header from "components/Headers/Header.js";




const Profile = () => {

  const { isAuthenticated, error, loading, user } = useSelector(state => state.auth)

  //testing

  const listProfiles = useSelector((state) => state.same)
  const { sameProfiles } = listProfiles

  //
  const [disabled, setDisabled] = useState(true);
  const [btnName, setbtnName] = useState('Edit');

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [organisationName, setOrganisationName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [exampleModal, setExampleModal] = useState(false)

  const toggleModal = () => {

    setExampleModal(true)
    console.log("exampleModal", exampleModal)
  };


  const [show, setShow] = useState(false);

  const handleShow = (p) => {
    setShow(true)
    console.log(p)
    setTestProfile(p)



  };
  const handleClose = () => setShow(false);

  const [testProfile, setTestProfile] = useState('')



  const handleInputDisable = () => {
    setDisabled(!disabled);
    if (btnName == 'Edit') {
      setbtnName('Cancel')
    }

    if (btnName == 'Cancel') {
      setbtnName('Edit')
    }

  }

  const dispatch = useDispatch();


  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setPhoneNumber(user.phoneNumber)
    setOrganisationName(user.organisationName)
    console.log("exampleModal", exampleModal)
  }, []);

  useEffect(async () => {
    dispatch(SameProfiles(user.name))
  }, [dispatch])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(user, name, organisationName, email, phoneNumber))
    handleInputDisable();
    console.log({ name, organisationName, email, phoneNumber });

  }
  return (
    <>




    <Header />
      {/* Page content */}








      <Container className="mt--7" fluid>

        {/*       {exampleModal &&  <ModalsTest name={"test"} exampleModal={exampleModal} />}
 */}
        <div style={{marginBottom : 10}} >
          {sameProfiles && sameProfiles.length !== 0 && (
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                color='secondary'
                id='dropdownMenuButton'
                type='button'
              >
                --Select a profile--
                    </DropdownToggle>

              <DropdownMenu aria-labelledby='dropdownMenuButton'>
                {sameProfiles.users.map((p, i) => (

                  <>
                    <DropdownItem
                      key={i}
                      onClick={() => { handleShow(p) }}
                    >
                      {p.name + ' ' + p.createdAt}
                    </DropdownItem>

                    <Modal show={show}>
                      <Modal.Header >
                        <Modal.Title>{testProfile.createdAt}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <>


                          <Card className="bg-secondary shadow">

                            <CardBody>
                              <Form>
                                <h3 className="heading-small text-muted mb-4">
                                  Changed informations are displayed in red
                        </h3>
                                <div className="pl-lg-4">
                                  <Row>
                                    <Col lg="6">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-username"
                                        >
                                          Username
                          </label>
                                        <Input
                                          defaultValue={testProfile.name}
                                          id="input-username"
                                          placeholder="Username"
                                          type="text"
                                          disabled
                                          className={testProfile.name != user.name ? 'redTest form-control-alternative' : 'form-control-alternative'}

                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-email"
                                        >
                                          Email address
                          </label>
                                        <Input
                                          className={testProfile.email != user.email ? 'redTest form-control-alternative' : 'form-control-alternative'}
                                          id="input-email"
                                          defaultValue={testProfile.email}
                                          type="email"
                                          disabled
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col lg="6">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-first-name"
                                        >
                                          Organisation name
                          </label>
                                        <Input
                                          className={testProfile.organisationName != user.organisationName ? 'redTest form-control-alternative' : 'form-control-alternative'}
                                          defaultValue={testProfile.organisationName}
                                          id="input-first-name"
                                          placeholder="First name"
                                          type="text"
                                          disabled
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-last-name"
                                        >
                                          Phone Number
                          </label>
                                        <Input
                                          className={testProfile.phoneNumber != user.phoneNumber ? 'redTest form-control-alternative' : 'form-control-alternative'}
                                          defaultValue={testProfile.phoneNumber}
                                          id="input-last-name"
                                          placeholder="Last name"
                                          type="text"
                                          disabled
                                        />
                                      </FormGroup>
                                    </Col>

                                  </Row>
                                </div>


                              </Form>
                            </CardBody>
                          </Card>





                        </>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close </Button>
                      </Modal.Footer>
                    </Modal>

                  </>

                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          )}

        </div>

        <Row>



          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                {/* <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          require("../../assets/img/theme/team-4-800x800.jpg")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col> */}
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                {/* <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row> */}
                <div className="text-center">

                  {user && <h3 >
                    {user.name}
                  </h3>}


                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>

                  <hr className="my-4" />
                  {/* <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p> */}
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Button
                      color="secondary"

                      onClick={handleInputDisable}
                      size="sm"
                    >
                      {btnName}
                    </Button>
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.name}
                            onChange={(e) => setName(e.target.value)}

                            id="input-username"
                            placeholder="Username"
                            type="text"
                            disabled={disabled}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            defaultValue={user.email}
                            onChange={(e) => setEmail(e.target.value)}

                            type="email"
                            disabled={disabled}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Organisation name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.organisationName}
                            onChange={(e) => setOrganisationName(e.target.value)}

                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            disabled={disabled}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}

                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            disabled={disabled}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="text-right" xs="12">
                        <hr className="my-4" />
                        {!disabled && < Button
                          color="primary"
                          //onClick={(e) => e.preventDefault()}
                          onClick={submitHandler}
                          size="sm"
                        >
                          Save
                    </Button>}
                      </Col>
                    </Row>
                  </div>


                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>

    </>
  );
};

export default Profile;
