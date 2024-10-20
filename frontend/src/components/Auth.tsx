import { SignupInput } from "@shashwat_1205/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {BACKEND_URL} from "../../config"
function Auth({type}: {type: "signup" | "signin"}) {
  const navigate = useNavigate();
  const [postInputs , setPostInputs] = useState<SignupInput>({
      name: "",
      username: "",
      password: ""
  })


  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup" : "signin"}`, postInputs)
      const jwt = await response.data;
      localStorage.setItem("token",JSON.stringify(jwt))
      navigate("/blogs")
    }catch{
      alert("Autorization Failed")
    }

  }
  return (
    <div className="h-screen flex justify-center flex-col ">
      <div>
        <div className="flex flex-col text-center mx-20">
          <div className="text-3xl font-bold text-center">
              Create an Account
          </div>
          <div className="text-slate-500 mb-6">
             {type === "signin" ? "Don't have an account?": "Already have an account?" } <Link to={type === "signin"? "/signup": "/signin"} className="underline ">{type === "signin"? "Sign Up" : "Login"}</Link>
          </div>
          {type === "signup" ? <LabelledInput label="Username" placeholder="Shashwat Singh Chauhan" onChange = {(e) => {
            setPostInputs({
              ...postInputs,
              name: e.target.value,
            })
          }}/> : null}
          <LabelledInput label="Email" placeholder="User@gmail.com" onChange = {(e) => {
            setPostInputs({
              ...postInputs,
              username: e.target.value,
            })
          }}/>
          <LabelledInput label="Password" placeholder="Password" type="password" onChange = {(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            })
          }}/>
          <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 mt-5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === 
            "signup" ? "Sign up" : "Sign in"}</button>

          
        </div>
      </div>
    </div>
  )
}

export default Auth
interface labelledInputType{
  label:string,
  placeholder:string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
}

function LabelledInput({label, placeholder, onChange, type}: labelledInputType ){
  return (
    <div>
        <label  className="block text-left mb-2 text-base font-medium text-gray-900">{label}</label>
        <input type={type || "text"} onChange={onChange} className="text-black font-semibold bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" placeholder={placeholder} required />
    </div>
  )

}