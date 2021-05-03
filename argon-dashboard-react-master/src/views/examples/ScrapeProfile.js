import UserHeader from "components/Headers/UserHeader.js";
import {useSelector , useDispatch} from  'react-redux'
import Header from "components/Headers/Header.js";
import React , {useEffect, useState} from "react";

import {
    Card,
    CardHeader,
    Container,
    Row,
    FormGroup,
    CardBody,
    Input,
    Form,
    Col,
    Badge,
    Button
  } from "reactstrap";
  import { scrapeProfile } from "actions/scrapeProfileByUrl";
  import Progress from "../../components/FileUpload/Progress"
  import Message from "../../components/FileUpload/Message"
//import { Button } from "bootstrap";

const ScrapeProfile = () => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState('')
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [message, setMessage] = useState('');
    const [completed, setCompleted] = useState(0);

    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(scrapeProfile(url))
        console.log({url});
        setCompleted(1);
      }

    return (
    <>
    <Header />
    
    <Container className="mt--7" fluid>
        <Row className="mt-1">
        <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="12">
<Card className="card-profile shadow">
  <Row className="justify-content-center">
    <Col className="order-lg-2" lg="3">
    </Col>
  </Row>
  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
  </CardHeader>
  <CardBody className="pt-0 pt-md-4">
  <Form  noValidate onSubmit={submitHandler}>
                  <h6 className="heading-small text-muted mb-4">
                    Scrape linked in profile
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                     
                  
                    </Row>
                    <Row>
                   
                      <Col lg="6">
                        <FormGroup>
                        <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                           Profile url :  
                          </label>
                          <Input
                            className="form-control-alternative"
                        
                            id="input-job-name"
                            placeholder="Profile url"
                            type="text"   onChange={(e) => setUrl(e.target.value)} /> 
                            </FormGroup>
                            </Col>
                            </Row>
                            <Button className="mt-4" color="primary" type="submit">
                  Continue
                </Button>
                <p></p>
                <Progress percentage={uploadPercentage} />

                <p>
                </p>

                {completed ? <Button color="primary" type="button">
          <span> Scraping profile is done, check it out !</span>
          <Badge className="badge-white">View</Badge>
        </Button> : null}
                            </div>
                            
                            </Form>
  </CardBody>
</Card>
</Col>

        </Row>
    </Container>

    </>
    )
}


export default ScrapeProfile;