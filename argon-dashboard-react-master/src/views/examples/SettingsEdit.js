
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

// reactstrap components
import {
  Button,
 
  Form,

  Container,
  
  Card,
  CardHeader,
  CardBody,
  FormGroup,

  Input,

  Row,
  Col,

} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import { updateSettings } from 'actions/settingsAction';
import Settings from './Settings';
import axios from 'axios'
import {useParams,useHistory} from 'react-router-dom'
const initialState = {

  settingName: '',
  city: '',
  country: '',
  postalCode: '',
  skills: [{name:'java'} , {name: 'PHP'}],
  
}

function SettingsEdit  ({ match, history })  {
  const {id} = useParams()
  const [settings,setSettings] = useState(initialState)
  const {settingName, city ,country , postalCode,skills} = settings

  const handleChangeInput= e => {
    const {name,value} = e.target
    setSettings({...settings, [name]:value })
    
        }
  //------------------------------------------------------------------------------------------

//  const { isAuthenticated, error, loading, settings } = useSelector(state => state.auth)

  //testing



  //
 
/*
  const [settingName, setSettingName] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [skills, setSkills] = useState([{name:'java'} , {name: 'PHP'}])





 
*/
  const dispatch = useDispatch();

/*
  useEffect(() => {
    setSettingName(settingName)
    setCity(city)
    setPostalCode(postalCode)
    setCountry(country)
    setSkills(skills)

  }, [city,postalCode,country,settingName,skills]); */
/*
  useEffect(async () => {
    dispatch(SameProfiles(settings.name))
  }, [dispatch])
*/
/*
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSettings(Settings, settingName, city, postalCode, country, skills))
    console.log({ settingName, city, postalCode, country, skills });

  }
*/

const handleUpdate = async () => {
 
try {

  const res = await axios.put(`/api/settings/edit/${id}`,{

    settingName, city ,country , postalCode,skills
  })
  return setSettings({...settings })
  
    
} catch (err) {
    


}
    }
  return (
    <>




      <UserHeader />
      {/* Page content */}








      <Container>


                <div className="text-center">
        <h1>Edit Skills</h1>
        
        <h6 className="heading-small text-muted mb-4">
                    Profile Skills 
                  </h6>
<div className="row">
                  <div className="col lg-6">
                    <div className="form-group">

                    </div>
                  </div>
                  </div>
                   
                     
                        
        <div className="form-group">
            <label htmlFor="settingName" > Setting Name : </label>
            <input className='form-control-alternative' type="text" name="settingName" value={settingName} onChange={handleChangeInput}   />
        </div>
        <div className="form-group">
            <label htmlFor="country" >  Country : </label>
            <input className='form-control-alternative' type="text" name="country" value={country} onChange={handleChangeInput}   />
        </div>
        <div className="form-group">
            <label htmlFor="city" > City : </label>
            <input  className='form-control-alternative' type="text" name="city" value={city} onChange={handleChangeInput}   />
        </div>
   
        <div className="form-group">
            <label htmlFor="postalCode" > Postal Code : </label>
            <input className='form-control-alternative' type="number" name="postalCode" value={postalCode} onChange={handleChangeInput}   />
        </div>
      
     
     
        <button className="btn btn-primary mt-4" color="primary"  onClick={handleUpdate}  >Update</button>
        </div>
      </Container>

    </>
  );
}

export default SettingsEdit
