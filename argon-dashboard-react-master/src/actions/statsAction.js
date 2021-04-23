import axios from 'axios'
import {
    
    GET_TAGS_SUCCESS,
    GET_TAGS_REQUEST,
    GET_TAGS_FAIL,
    

} from '../constants/statsConstants'


export const getTags = (startDate,endDate) => async (dispatch) => {

    try {

        dispatch({
            type: GET_TAGS_REQUEST
        })

        

        const { data } = await axios.get('https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow', {
           params: {
                fromdate: startDate,
                todate : endDate
            }
        })


        //const {data} = await axios.get('https://api.stackexchange.com/2.2/tags?fromdate='+{startDate},'&todate='+{endDate},'&order=desc&sort=popular&site=stackoverflow')

        dispatch({
            type: GET_TAGS_SUCCESS,
            payload: data.items
        })


    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_TAGS_FAIL,
            payload: error
        })
        


    }

}