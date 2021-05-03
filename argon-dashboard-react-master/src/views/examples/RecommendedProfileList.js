import UserHeader from "components/Headers/UserHeader.js";
import {useSelector , useDispatch} from  'react-redux'
import {useState, useEffect} from 'react';
import Header from "components/Headers/Header.js";
import {
    Card,
    CardHeader,
    Container,
    Row,
    CardBody,
    Col,
    Button
  } from "reactstrap";
//import { Button } from "bootstrap";

const RecommendedProfileList = () => {

  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    fetch('https://resume-parser-python-pi.herokuapp.com/recommendation').then(res => {return res.json();})
    .then(data => {
      console.log(data);
      setProfiles(data);
    })
  }, [setProfiles]);
 
    return (
    <>
    <Header />
    <Container className="mt--7" fluid>
      { profiles &&
        <Row className="mt-1">
          {profiles.map((profile) => (
        <Col className="order-xl-2 mb-5 mb-xl-0 mb-3" xl="4">
<Card className="card-profile shadow">
  <Row className="justify-content-center">
    <Col className="order-lg-2" lg="3">
      <div className="card-profile-image">
        <a href="#pablo" onClick={(e) => e.preventDefault()}>
          <img
            alt="..."
            className="rounded-circle"
            src={
              require("../../assets/img/Sample_User_Icon.png")
                .default
            }
          />
        </a>
      </div>
    </Col>
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
        Mail
      </Button>
      <Button
        className="ml-4"
        color="default"
        href="#pablo"
        onClick={(e) => e.preventDefault()}
        size="sm"
      >
         meet 
      </Button>
    </div>
  </CardHeader>
  <CardBody className="pt-0 pt-md-4">
  <br/>        <br/>
    <div className="text-center">
      <h3>
        {profile.name}
        <span className="font-weight-light"></span>
      </h3>
      <div className="h5 font-weight-300">
        <i className="ni location_pin mr-2" />
        Experience: {profile.years_exp} ans
      </div>
 
      <div>
     
      </div>
      <hr className="my-4" />
      <h2>Skills & endorsements</h2>
      <p>
      {profile.skills}
      </p>
      <a href={profile.url} target="_blank">
        Show more
      </a>
    </div>
  </CardBody>
</Card>
</Col>
) )}
        </Row>
}
    </Container>
    </>
    )
}


export default RecommendedProfileList;