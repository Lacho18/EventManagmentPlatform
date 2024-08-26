import { useNavigate } from "react-router-dom"

const useRoutingNavigation = (location) => {
    const navigate = useNavigate();

    const goTo = (path) => { };
    navigate('/' + location);
}

export default useRoutingNavigation;