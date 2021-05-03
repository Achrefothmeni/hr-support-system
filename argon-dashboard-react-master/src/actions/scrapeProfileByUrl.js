import axios from 'axios'

export const scrapeProfile = (url) => async(dispatch) => {
    try {
        dispatch({type: "SCRAPE_PROFILE"})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('http://192.168.1.9:8001/scrape_profile' , {"url":url} )
   
        dispatch({type: "SUCCESS", payload: data})
    } catch (error) {
        dispatch({type: "FAIL", payload: error.response && error.response.data.message ? error.response.data.message: error.message}
           )
    }
   }