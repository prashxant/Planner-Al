import { Password } from "@mui/icons-material";
import { Signup } from "@repo/ui/Signup";
import axios from 'axios';

export default function SignupPage() {
    return(
        <>
            <Signup onClick ={ async (username, Password)=>{

                // const response = await axios.post("admin.kirat.com/signup",{
                //     username,
                //     Password
                // }) 
            }


            }
            />
        </>
    )
}