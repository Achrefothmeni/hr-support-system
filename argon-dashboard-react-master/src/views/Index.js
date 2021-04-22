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
import React, { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components


import Header from "components/Headers/Header.js";


import { useDispatch, useSelector } from 'react-redux'

import { getTags } from '../actions/userActions'
import { Chart } from "react-google-charts";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");



  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  React.useEffect(() => {
    //dispatch(getTags(startDate.getTime()/1000,endDate.getTime()/1000))
    dispatch(getTags(''))

  }, []);

  const { tags, loadingTags } = useSelector(state => state.auth)
  let tagsForChart = ''
  if (tags && !loadingTags) {
    console.log('test')
    console.log(tags)

    tagsForChart = tags?.map((tag, i) => {
      return [tag.name, tag.count]

    })

    let objectArray = ''
    if (tagsForChart)
      objectArray = Object.values(tagsForChart);




    console.log(tagsForChart)
    console.log(objectArray)


  }





  /*  let objectArray = ''
   const handleChart = () => {
     //dispatch(getTags(startDate.getTime() / 1000))
 
     if (loadingTags == false) {
       const tagsForChart = tags?.map((tag, i) => {
         return [tag.name, tag.count]
 
       })
 
       console.log(tagsForChart)
       if (tagsForChart)
         objectArray = Object.values(tagsForChart);
 
 
 
       console.log(...objectArray)
     }
 
 
 
   }
  */



  return (
    <>
      <Header />
      {/* Page content */}


      <Container className="mt--1" fluid>

        <div style={{ marginBottom: 10, display: "flex" }}>

          <div style={{ marginRight: 10 }}> <h3>Start Date  </h3><DatePicker selected={startDate} onChange={date => {
            setStartDate(date)
          }

          } /></div>

          <div> <h3>End Date</h3><DatePicker selected={endDate} onChange={date => setEndDate(date)} /></div>


          
        </div>
        <Button style={{ marginBottom: 10}} onClick={() => {
            dispatch(getTags(Math.round (startDate.getTime() / 1000),Math.round (endDate.getTime() / 1000)))

          }} >search</Button>

        {tags && Object.keys(tags).length>0&& <Chart
          width={'100%'}
          height={'300px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ['Tag', 'Count'],
            ...tagsForChart
            //...objectArray

          ]}
          options={{
            // Material design options
            chart: {
              title: 'Most researched ',
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
        />}


        {loadingTags && <h1>Loading </h1>}

       <h1>thiisss  {Math.round (startDate.getTime() / 1000)}</h1>
       { <h1>thiisss  {Math.round (endDate.getTime() / 1000)}</h1> }
        {tags && <h1>thiisss  {Object.keys(tags).length
}</h1>
}

      </Container>

    </>
  );
};

export default Index;
