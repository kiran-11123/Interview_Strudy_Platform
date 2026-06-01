import { useNavigate } from "react-router-dom";


export function useHomeNavigation (){
     
    const navigate = useNavigate();

    function ToHome(){
        navigate("/home")
    }

    return {ToHome};
}

export function useProfile(){
    const navigate = useNavigate();

    function ToProfile(){
        navigate("/profile")
    }

    return {ToProfile};
}

export function useDashBoard(){
    const navigate = useNavigate();

    function ToDashBoard(){
        navigate("/")
    }

    return {ToDashBoard};
}
