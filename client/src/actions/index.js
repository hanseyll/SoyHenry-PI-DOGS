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
        // le paso la ruta que me cree en el back que me trae todos los personajes 
        var temperaments = await axios.get('http://localhost:3001/temperaments') 
        
        var temperamentsMap =temperaments.data.map(t => t.name)

        //console.log('HOLA ESTOS SON LOS TEMPERAMENTOS: ' ,temperaments.data.map(el => el.name))
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
            console.log(error)
        }
    }

}

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post('http://localhost:3001/dogs',payload)
    console.log(response);
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
