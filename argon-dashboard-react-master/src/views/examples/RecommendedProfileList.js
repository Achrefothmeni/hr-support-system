import UserHeader from "components/Headers/UserHeader.js";
import {useSelector , useDispatch} from  'react-redux'
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

    return (
    <>
    <Header />
    <Container className="mt--7" fluid>
        <Row className="mt-1">
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
              require("../../assets/img/theme/team-1-800x800.jpg")
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
        Test
        <span className="font-weight-light">, 36</span>
      </h3>
      <div className="h5 font-weight-300">
        <i className="ni location_pin mr-2" />
        Test
      </div>
 
      <div>
     
      </div>
      <hr className="my-4" />
      <h2>Skills & endorsements</h2>
      <p>
      Test
      </p>
      <a href="#pablo" onClick={(e) => e.preventDefault()}>
        Show more
      </a>
    </div>
  </CardBody>
</Card>
</Col>

        </Row>
    </Container>
    </>
    )
}


export default RecommendedProfileList;