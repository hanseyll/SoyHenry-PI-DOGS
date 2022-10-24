import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs',{});
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}


// export function getDogs() {
//     return function (dispatch) {
//       axios.get("http://localhost:3001/dogs").then(res => {
//         dispatch({
//           type: 'GET_DOGS',
//           payload: res.data
//         })
//       }).catch((error)=> console.log(error)) 
//     };
//   }





export function filterDogsByWeight(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_WEIGHT',
        payload
        
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }

}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}


export function getTemperaments() {


    return async function (dispatch) {
        var temperaments = await axios.get('http://localhost:3001/temperaments') 
        
        var temperamentsMap =temperaments.data.map(t => t.name)

        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: temperamentsMap
        })

    }
}

export function getNameDogs(name){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/dogs?name=' + name)
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (error) {
            alert('Dog doesnt exist')
        }
    }

}

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/dogs',payload)
    return response;
    }
}

export function getDetail(id){
    return async function(dispatch){

        try {
            var json = await axios.get('http://localhost:3001/dogs/' + id)
            return dispatch({
                type: 'GET_DETAILS',
                payload:json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const orderByTemperament =(payload) =>{
    return{
        type: 'ORDER_BY_TEMPERAMENT',
        payload,
    }
}
