import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setAvatar,setEmail,setId,setName } from "../../ReduxService/UserSlice";
import { selectEmail,selectAvatar,selectId,selectName } from "../../ReduxService/UserSlice";

function BeforeUnload() {
    const dispatch=useDispatch()
    const avatar=useSelector(selectAvatar)
    const email=useSelector(selectEmail)
    const id=useSelector(selectId)
    const name=useSelector(selectName)
    
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
            console.log(email)
            if(email) {
                localStorage.setItem("avatar",avatar)
                localStorage.setItem("email",email)
                localStorage.setItem("id",id)
                localStorage.setItem("name",name)
            }
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        const avatar =localStorage.getItem("avatar")
        if(avatar) {
            dispatch(setAvatar(localStorage.getItem("avatar")))
            dispatch(setId(localStorage.getItem("id")))
            dispatch(setName(localStorage.getItem("name")))
            dispatch(setEmail(localStorage.getItem("email")))
            localStorage.clear()
        }
      };
    }, [email]);
  
    return null;
}
export default BeforeUnload