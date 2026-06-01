import { useNavigate } from "react-router-dom";


export function useHomeNavigation (){
     
    const navigate = useNavigate();

    function ToHome(){
        navigate("/home")
    }

    return {ToHome};
}