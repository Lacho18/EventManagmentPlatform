import axios from "axios";

const url = "http://localhost:3000/";

//Hook that handles every fetch request
const useFetch = async (route, method, data) => {
    let response = {};
    switch (method) {
        case "GET":
            if (data) {
                response = await axios.get(url + route + "/?data=" + encodeURIComponent(JSON.stringify(data)));
                console.log(response);
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
            break;
        case "DELETE":
            break;
    }

    return response;
}


export default useFetch;