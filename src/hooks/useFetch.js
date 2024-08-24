import axios from "axios";

const url = "http://localhost:3000/";

//Hook that handles every fetch data
const useFetch = async (route, method, data) => {
    switch (method) {
        case "GET": const response = await axios.get(url + route);
            return response.data;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
    }
}


export default useFetch;