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
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Progress 
  
  
} from "reactstrap";

import {FormControl, FormGroup, Form} from 'react-bootstrap'
// core components
import Header from "components/Headers/Header.js";
import FileUpload from "components/FileUpload/FileUpload.js";

const CvUpload = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      {/* <Container className="mt--7" fluid>
        <Card className="shadow card-700">
            <CardHeader className="border-0">
                <h2 className="mb-0">Upload resume</h2>
            </CardHeader>
            <Form className="ml-4 mt-5">
                <Form.Group>
                    <Form.File id="cv-input" label="Upload resume" />
                </Form.Group>
            </Form>
            <div className="progress-wrapper p-5">
                <div className="progress-info">
                <div className="progress-label">
                    <span></span>
                </div>
                <div className="progress-percentage">
                    <span></span>
                </div>
            </div>
                <Progress max="100" value="0" color="default" />
            </div>
        </Card>
      </Container> */}
      <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className='fab fa-react' /> Resume Upload
    </h4>

    <FileUpload />
  </div>
    </>
  );
};

export default CvUpload;
