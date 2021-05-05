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
import React, { useState, useEffect } from 'react'
// node.js library that concatenates classes (strings)
import classnames from 'classnames'
// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2'
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
} from 'reactstrap'

// core components

import axios from 'axios'
import Header from 'components/Headers/Header.js'
import {
  listProfilesPhp,
  listProfilesAndroid,
  listProfilesJava,
  listProfilesJs,
  listProfilesPython,
  listProfilesSwift,
} from '../../src/actions/profileAction'

import { useDispatch, useSelector } from 'react-redux'

import { getTags } from '../actions/statsAction'
import { Chart } from 'react-google-charts'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { ButtonOptions } from 'devextreme-react/form'

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1)
  const [chartExample1Data, setChartExample1Data] = useState('data1')

  const toggleNavs = (e, index) => {
    e.preventDefault()
    setActiveNav(index)
    setChartExample1Data('data' + index)
  }

  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  React.useEffect(() => {
    //dispatch(getTags(startDate.getTime()/1000,endDate.getTime()/1000))
    dispatch(getTags(''))
  }, [])

  const { tags, loadingTags } = useSelector((state) => state.stats)
  let tagsForChart = ''

  if (tags && Object.keys(tags).length > 0 && !loadingTags) {
    tagsForChart = tags.map((tag) => {
      return [tag.name, tag.count]
    })
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
<<<<<<< Updated upstream
  const [responseData, setResponseData] = useState('')
  var options = {
    method: 'GET',
    url: 'https://covid-19-tracking.p.rapidapi.com/v1/tunisia',
    headers: {
      'x-rapidapi-key': '2410f79cfamsh18f92ca9a50d151p1f0d32jsn6b36b1b6edca',
      'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com',
    },
  }

  /*axios.request(options).then(function (response) {
    setResponseData(response.data)
    console.log('ahayaa '+response.data["Total Cases_text"])
  }).catch(function (error) {
    console.error(error);
  });*/

  // -----------------------------------------------------
=======
   const [responseData, setResponseData] = useState('')
  
 
  useEffect(() => {
  
    var options = {
      method: 'GET',
      url: 'https://covid-19-tracking.p.rapidapi.com/v1/tunisia',
      headers: {
        'x-rapidapi-key': '2410f79cfamsh18f92ca9a50d151p1f0d32jsn6b36b1b6edca',
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setResponseData(response.data)
      const arr = []
      responseData.map((m) => {
        
  
        arr.push(m)
      })
      setResponseData(arr)
      console.log('test use effect' + arr)
    }).catch(function (error) {
      console.error(error);
    });
  
  }, []
  
  )
   // -----------------------------------------------------
>>>>>>> Stashed changes

  const [javaa, setJava] = useState(null)
  const [phpp, setPhp] = useState(null)
  const [pythonn, setPython] = useState(null)
  const [androidd, setAndroid] = useState(null)
  const [javascriptt, setJavaScript] = useState(null)
  const [swiftt, setSwift] = useState(null)
  const java = async () => {
    try {
      const java = await axios.get('/api/profiles/java')
      setJava(java.data)
    } catch (error) {
      console.log(error)
    }
  }
  const php = async () => {
    try {
      const php = await axios.get('/api/profiles/php')
      setPhp(php.data)
    } catch (error) {
      console.log(error)
    }
  }
  const python = async () => {
    try {
      const python = await axios.get('/api/profiles/python')
      setPython(python.data)
    } catch (error) {
      console.log(error)
    }
  }
  const javascipt = async () => {
    try {
      const javascipt = await axios.get('/api/profiles/js')
      setJavaScript(javascipt.data)
    } catch (error) {
      console.log(error)
    }
  }
  const swift = async () => {
    try {
      const swift = await axios.get('/api/profiles/swift')
      setSwift(swift.data)
    } catch (error) {
      console.log(error)
    }
  }
  const android = async () => {
    try {
      const android = await axios.get('/api/profiles/android')
      setAndroid(android.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <center>
        <h1>{responseData.Country_text}</h1>
        <div class='row'>
          <div class='col-xl-3 col-md-6'>
            <div class='card card-stats'>
              <div class='card-body'>
                <div class='row'>
                  <div class='col'>
                    <h5 class='card-title text-uppercase text-muted mb-0'>
                      Total Cases
                    </h5>
                    <span class='h2 font-weight-bold mb-0'>
                      {responseData['Total Cases_text']}
                    </span>
                  </div>
                  <div class='col-auto'>
                    <div class='icon icon-shape bg-gradient-info text-white rounded-circle shadow'>
                      <i class='fas fa-lungs-virus'></i>
                    </div>
                  </div>
                </div>
                <p class='mt-3 mb-0 text-sm'>
                  <span class='text-success mr-2'>
                    <i class='fa fa-arrow-up'></i>{' '}
                    {responseData['New Cases_text']}
                  </span>
                  <span class='text-nowrap'>Today</span>
                </p>
              </div>
            </div>
          </div>
          <div class='col-xl-3 col-md-6'>
            <div class='card card-stats'>
              <div class='card-body'>
                <div class='row'>
                  <div class='col'>
                    <h5 class='card-title text-uppercase text-muted mb-0'>
                      Total Deaths
                    </h5>
                    <span class='h2 font-weight-bold mb-0'>
                      {responseData['Total Deaths_text']}
                    </span>
                  </div>
                  <div class='col-auto'>
                    <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                      <i class='fas fa-skull-crossbones'></i>
                    </div>
                  </div>
                </div>
                <p class='mt-3 mb-0 text-sm'>
                  <span class='text-success mr-2'>
                    <i class='fa fa-arrow-up'></i>{' '}
                    {responseData['New Deaths_text']}
                  </span>
                  <span class='text-nowrap'>Today</span>
                </p>
              </div>
            </div>
          </div>
          <div class='col-xl-3 col-md-6'>
            <div class='card card-stats'>
              <div class='card-body'>
                <div class='row'>
                  <div class='col'>
                    <h5 class='card-title text-uppercase text-muted mb-0'>
                      Total Recovered
                    </h5>

                    <span class='h2 font-weight-bold mb-0'>
                      {responseData['Total Recovered_text']}
                    </span>
                  </div>
                  <div class='col-auto'>
                    <div class='icon icon-shape bg-gradient-green text-white rounded-circle shadow'>
                      <i class='fas fa-briefcase-medical'></i>
                    </div>
                  </div>
                </div>
                <p class='mt-3 mb-0 text-sm'>
                  <span class='text-success mr-2'></span>
                  <span class='text-nowrap'></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </center>
      <Container className='mt--1' fluid>
        <div style={{ marginBottom: 10, display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            {' '}
            <h3>Start Date </h3>
            <DatePicker
              wrapperClassName='datePicker'
              dateFormat='dd/MM/yyyy'
              selected={startDate}
              onChange={(date) => {
                setStartDate(date)
              }}
            />
          </div>

          <div>
            {' '}
            <h3>End Date</h3>
            <DatePicker
              wrapperClassName='datePicker'
              dateFormat='dd/MM/yyyy'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
        <Button
          color='primary'
          style={{ marginBottom: 10 }}
          onClick={() => {
            dispatch(getTags(startDate, endDate))
          }}
        >
          search
        </Button>

        <Button
          style={{ marginBottom: 10 }}
          onClick={() => {
            dispatch(getTags(''))
            setStartDate(new Date())
            setEndDate(new Date())
          }}
        >
          <i class='fas fa-undo'></i>
        </Button>

        {tags && Object.keys(tags).length > 0 && (
          <Chart
            width={'100%'}
            height={'300px'}
            chartType='Bar'
            loader={<div>Loading Chart</div>}
            data={[
              ['Tag', 'Count'],
              ...tagsForChart,
              //...objectArray
            ]}
            options={{
              // Material design options
              chart: {
                title: 'Most researched technologies in stackoverflow ',
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '2' }}
          />
        )}

        {loadingTags && <h1>Loading </h1>}

        {/* <h1>thiisss  {Math.round (startDate.getTime() / 1000)}</h1>
       { <h1>thiisss  {Math.round (endDate.getTime() / 1000)}</h1> }
        {tags && <h1>thiisss  {Object.keys(tags).length
}</h1>
} */}
      </Container>
<<<<<<< Updated upstream
      <br /> <br />
      <div class='row'>
        <div class='col-xl-3 col-md-6'>
          <div class='card card-stats'>
            <div class='card-body'>
              <div class='row'>
                <div class='col'>
                  <h5 class='card-title text-uppercase text-muted mb-0'>
                    Total Profiles
                  </h5>
                  <span onClick={php()} class='h2 font-weight-bold mb-0'>
                    {phpp === '' ? 0 : phpp}
                  </span>
                </div>
                <div class='col-auto'>
                  <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                    <i class='fab fa-php'></i>
                  </div>
                </div>
              </div>
              <p class='mt-3 mb-0 text-sm'>
                <span class='text-success mr-2'>
                  <i class='fa fa-arrow-up'></i> 3.48%
                </span>
                <span class='text-nowrap'>Since last month</span>
              </p>
            </div>
          </div>
        </div>
        <div class='col-xl-3 col-md-6'>
          <div class='card card-stats'>
            <div class='card-body'>
              <div class='row'>
                <div class='col'>
                  <h5 class='card-title text-uppercase text-muted mb-0'>
                    Total Profiles
                  </h5>
                  <span onClick={java()} class='h2 font-weight-bold mb-0'>
                    {javaa === '' ? 0 : javaa}
                  </span>
                </div>
                <div class='col-auto'>
                  <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                    <i class='fab fa-java'></i>
                  </div>
                </div>
              </div>
              <p class='mt-3 mb-0 text-sm'>
                <span class='text-success mr-2'>
                  <i class='fa fa-arrow-up'></i> 3.48%
                </span>
                <span class='text-nowrap'>Since last month</span>
              </p>
            </div>
          </div>
        </div>
        <div class='col-xl-3 col-md-6'>
          <div class='card card-stats'>
            <div class='card-body'>
              <div class='row'>
                <div class='col'>
                  <h5 class='card-title text-uppercase text-muted mb-0'>
                    Total Profiles
                  </h5>

                  <span onClick={javascipt()} class='h2 font-weight-bold mb-0'>
                    {javascriptt === '' ? 0 : javascriptt}
                  </span>
                </div>
                <div class='col-auto'>
                  <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                    <i class='fab fa-js'></i>
                  </div>
                </div>
              </div>
              <p class='mt-3 mb-0 text-sm'>
                <span class='text-success mr-2'>
                  <i class='fa fa-arrow-up'></i> 3.48%
                </span>
                <span class='text-nowrap'>Since last month</span>
              </p>
            </div>
          </div>
        </div>
        <div class='col-xl-3 col-md-6'>
          <div class='card card-stats'>
            <div class='card-body'>
              <div class='row'>
                <div class='col'>
                  <h5 class='card-title text-uppercase text-muted mb-0'>
                    Total Profiles
                  </h5>
                  <span onClick={swift()} class='h2 font-weight-bold mb-0'>
                    {swiftt === '' ? 0 : swiftt}
                  </span>
                </div>
                <div class='col-auto'>
                  <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                    <i class='fab fa-swift'></i>
                  </div>
                </div>
              </div>
              <p class='mt-3 mb-0 text-sm'>
                <span class='text-success mr-2'>
                  <i class='fa fa-arrow-up'></i> 3.48%
                </span>
                <span class='text-nowrap'>Since last month</span>
              </p>
            </div>
          </div>
        </div>
        <div class='col-xl-3 col-md-6'>
          <div class='card card-stats'>
            <div class='card-body'>
              <div class='row'>
                <div class='col'>
                  <h5 class='card-title text-uppercase text-muted mb-0'>
                    Total Profiles
                  </h5>
                  <span onClick={python()} class='h2 font-weight-bold mb-0'>
                    {pythonn === '' ? 0 : pythonn}
                  </span>
                </div>
                <div class='col-auto'>
                  <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                    <i class='fab fa-python'></i>
                  </div>
                </div>
              </div>
              <p class='mt-3 mb-0 text-sm'>
                <span class='text-success mr-2'>
                  <i class='fa fa-arrow-up'></i> 3.48%
                </span>
                <span class='text-nowrap'>Since last month</span>
              </p>
            </div>
          </div>
        </div>
        <div class='col-xl-3 col-md-6'>
          <div class='card card-stats'>
            <div class='card-body'>
              <div class='row'>
                <div class='col'>
                  <h5 class='card-title text-uppercase text-muted mb-0'>
                    Total Porfiles
                  </h5>
                  <span onClick={android()} class='h2 font-weight-bold mb-0'>
                    {androidd === '' ? 0 : androidd}
                  </span>
                </div>
                <div class='col-auto'>
                  <div class='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                    <i class='fab fa-android'></i>
                  </div>
                </div>
              </div>
              <p class='mt-3 mb-0 text-sm'>
                <span class='text-success mr-2'>
                  <i class='fa fa-arrow-up'></i> 3.48%
                </span>
                <span class='text-nowrap'>Since last month</span>
              </p>
            </div>
          </div>
=======
      <br/>   <br/>
      <div class="row">
      <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Profiles</h5>
                    <span  onClick={php()}class="h2 font-weight-bold mb-0">{phpp === '' ? 0 :phpp}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                      <i class="fab fa-php"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Profiles</h5>
                    <span  onClick={java()}class="h2 font-weight-bold mb-0">{javaa === '' ? 0 :javaa}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                      <i class="fab fa-java"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 7.45%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Profiles</h5>
                   
                    <span  onClick={javascipt()}class="h2 font-weight-bold mb-0">{javascriptt === '' ? 0 :javascriptt}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                      <i class="fab fa-js"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 13.48%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Profiles</h5>
                      <span  onClick={swift()}class="h2 font-weight-bold mb-0">{swiftt === '' ? 0 :swiftt}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                      <i class="fab fa-swift"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 1.14%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Profiles</h5>
                      <span onClick={python()} class="h2 font-weight-bold mb-0">{pythonn === '' ? 0 :pythonn}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                      <i class="fab fa-python"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 33.7%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Porfiles</h5>
                      <span onClick={android()}class="h2 font-weight-bold mb-0">{androidd === '' ? 0 :androidd}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                      <i class="fab fa-android"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 2.4%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                    </div>
                    </div>
                    </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </>
  )
}

export default Index
