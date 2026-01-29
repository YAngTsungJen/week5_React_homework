import { useEffect } from "react";
import { useNavigate } from "react-router";
function NotFound(){
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(() => {
            navigate('/')
        }, 2000);
    },[navigate])
    return(<>
    <h2>頁面不存在</h2>
    </>)
}
export default NotFound;