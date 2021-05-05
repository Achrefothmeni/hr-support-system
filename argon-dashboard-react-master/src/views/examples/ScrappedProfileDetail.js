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

//testing
import { SameProfiles, getProfileDetail } from '../../actions/profileAction'
import Header from "components/Headers/Header.js";




const ScrappedProfileDetail = ({ match }) => {

  const { isAuthenticated, error, loading, user } = useSelector(state => state.auth)

  const { detailedProfile } = useSelector(state => state.detail)



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
    dispatch(getProfileDetail(match.params.id))
  }, [dispatch])

  useEffect(async () => {
    if (detailedProfile)
      dispatch(SameProfiles(detailedProfile.name))
  }, [detailedProfile])








  return (
    <>




      <Header />
      <Container className="mt--7" fluid>

        <div style={{ marginBottom: 10 }} >
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
                {sameProfiles.profiles?.map((p, i) => (

                  <>
                    <DropdownItem
                      key={i}
                      onClick={() => { handleShow(p) }}
                    >
                      {p.name + ' '}
                    </DropdownItem>

                    <Modal show={show}>
                      <Modal.Header >
                        <Modal.Title> Changed informations are displayed in red</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <>

                          <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                              <Row className="align-items-center">
                                <Col xs="8">
                                  <h3 className="mb-0">Scrapped Profile</h3>
                                </Col>
                                <Col xs="4">
                                  <Button variant="secondary" onClick={handleClose}>X</Button>
                                </Col>

                              </Row>
                            </CardHeader>
                            <CardBody>
                              <Form>
                                <h6 className="heading-small text-muted mb-4">
                                  information
                  </h6>
                                <div className="pl-lg-4">
                                  <Row>
                                    <Col lg="4">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-username"
                                        >
                                          Username
                          </label>
                                        <Input
                                          className={testProfile.name != detailedProfile.name ? 'redTest form-control-alternative' : 'form-control-alternative'}
                                          defaultValue={testProfile.name}
                                          id="input-username"
                                          placeholder="Username"
                                          type="text"
                                          disabled
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col lg="4">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"

                                        >
                                          Position
                          </label>
                                        <Input
                                          className={testProfile.position != detailedProfile.position ? 'redTest form-control-alternative' : 'form-control-alternative'}
                                          defaultValue={testProfile.position}

                                          type="text"
                                          disabled
                                        />
                                      </FormGroup>
                                    </Col>

                                    <Col lg="4">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-username"
                                        >
                                          Years of experience
                          </label>
                                        <Input
                                          className={testProfile.years_exp != detailedProfile.years_exp ? 'redTest form-control-alternative' : 'form-control-alternative'}
                                          defaultValue={testProfile.years_exp}
                                          id="input-username"
                                          placeholder="Username"
                                          type="text"
                                          disabled
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>




                                </div>
                                <hr className="my-4" />
                                {/* Address */}
                                <h6 className={testProfile.experience?.length != detailedProfile.experience?.length ? ' heading-small mb-4 redTest' : 'heading-small text-muted mb-4'} >

                                  Experience
                  </h6>
                                <div className="pl-lg-4">
                                  <Row>

                                    {testProfile.experience?.map((e, i) => (
                                      <>
                                        <Col lg="4">
                                          <FormGroup>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-first-name"
                                            >
                                              Job title
                                            </label>
                                            <Input
                                              className="form-control-alternative"
                                              defaultValue={e.title}
                                              id="input-first-name"
                                              placeholder="First name"
                                              type="text"
                                              disabled
                                            />
                                          </FormGroup>
                                        </Col>


                                        <Col lg="4">
                                          <FormGroup>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-first-name"
                                            >
                                              Date
                                            </label>
                                            <Input
                                              className="form-control-alternative"
                                              defaultValue={e.date}
                                              id="input-first-name"
                                              placeholder="First name"
                                              type="text"
                                              disabled
                                            />
                                          </FormGroup>
                                        </Col >
                                        <Col lg="4">
                                          <FormGroup>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-first-name"
                                            >
                                              Company
                                                </label>
                                            <Input
                                              className="form-control-alternative"
                                              defaultValue={e.company}
                                              id="input-first-name"
                                              placeholder="First name"
                                              type="text"
                                              disabled
                                            />
                                          </FormGroup>
                                        </Col>
                                      </>
                                    ))}

                                  </Row>
                                </div>
                                <hr className="my-4" />
                                {/* Address */}
                                <h6 className="heading-small text-muted mb-4">
                                  Contact information
                  </h6>
                                <div className="pl-lg-4">
                                  <Row>
                                    <Col md="12">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-address"
                                        >
                                          Linkedin url
                          </label>
                                        <Input
                                          className="form-control-alternative"
                                          defaultValue={testProfile.url}
                                          id="input-address"
                                          placeholder="Home Address"
                                          type="text"
                                          disabled
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>

                                </div>
                                <hr className="my-4" />
                                {/* Description */}
                                <h6 className={testProfile.skills?.length != detailedProfile.skills?.length ? ' heading-small mb-4 redTest' : 'heading-small text-muted mb-4'} >

                                Skills
</h6>

                                <div className="pl-lg-4">


                                  {testProfile.skills?.map((s, i) => (
                                    <FormGroup>
                                      {Object.values(s)?.map((letter, j) => (
                                        <label>{letter}</label>

                                      ))}

                                    </FormGroup>))}



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

        {detailedProfile && (
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Scrapped Profile</h3>
                </Col>

              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  information
                  </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Username
                          </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={detailedProfile.name}
                          id="input-username"
                          placeholder="Username"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"

                        >
                          Position
                          </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={detailedProfile.position}

                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Years of experience
                          </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={detailedProfile.years_exp}
                          id="input-username"
                          placeholder="Username"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>




                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Experience
                  </h6>
                <div className="pl-lg-4">
                  <Row>

                    {detailedProfile.experience?.map((e, i) => (
                      <>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Job title
                          </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={e.title}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>


                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Date
                          </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={e.date}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col >
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Company
                          </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={e.company}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </>
                    ))}

                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <h6 className="heading-small text-muted mb-4">
                  Contact information
                  </h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-address"
                        >
                          Linkedin url
                          </label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={detailedProfile.url}
                          id="input-address"
                          placeholder="Home Address"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                </div>
                <hr className="my-4" />
                {/* Description */}
                <h6 className="heading-small text-muted mb-4">Skills</h6>
                <div className="pl-lg-4">


                  {detailedProfile.skills?.map((s, i) => (
                    <FormGroup>
                      {Object.values(s)?.map((letter, j) => (
                        <label>{letter}</label>

                      ))}

                    </FormGroup>))}



                </div>
              </Form>
            </CardBody>
          </Card>)}




      </Container>

    </>
  );
};

export default ScrappedProfileDetail;
