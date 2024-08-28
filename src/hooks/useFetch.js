import axios from "axios";

const url = "http://localhost:3000/";

//Hook that handles every fetch request
const useFetch = async (route, method, data) => {
    let response = {};
    switch (method) {
        case "GET":
            if (data) {
                console.log(data);
                try {
                    response = await axios.get(url + route + "/?data=" + encodeURIComponent(JSON.stringify(data)));
                } catch (error) {
                    console.log(error.response);
                    return error.response;
                }
            }
            else {
                response = await axios.get(url + route);
            }
            break;
        case "POST":
            try {
                response = await axios.post(url + route, data);
            }
            catch (error) {
                return error.response;
            }
            break;
        case "PUT":
            try {
                response = await axios.put(url + route, data);
            }
            catch (error) {
                return error.response;
            }
            break;
        case "DELETE":
            break;
    }

    return response;
}


export default useFetch;