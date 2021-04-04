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
import axios from 'axios'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from 'reactstrap'
// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap'

const UserHeader = ({ btnTitle }) => {
  const [profiles, setProfiles] = useState([])
  useEffect(async () => {
    if (btnTitle === 'Edit profile') {
      const { data } = await axios.get('/get-hrs-test')
      setProfiles([...data.users])
    }
  }, [btnTitle])

  const getHrs = async () => {
    const { data } = await axios.get('/get-hrs-test')
    console.log(data)
    return data.users
  }
  return (
    <>
      <div
        className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
        style={{
          minHeight: '600px',
          backgroundImage:
            'url(' +
            require('../../assets/img/theme/profile-cover.jpg').default +
            ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className='mask bg-gradient-default opacity-8' />
        {/* Header container */}
        <Container className='d-flex align-items-center' fluid>
          <Row>
            <Col lg='7' md='10'>
              <h1 className='display-2 text-white'>Hello Jesse</h1>
              <p className='text-white mt-0 mb-5'>
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <Row>
                {profiles.length !== 0 && (
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
                      {profiles.map((p, i) => (
                        <DropdownItem
                          key={i}
                          onClick={(e) => e.preventDefault()}
                        >
                          {p.name + ' ' + p.email}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
                <Button
                  color='info'
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                >
                  {btnTitle}
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default UserHeader
