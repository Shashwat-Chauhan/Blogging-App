import { Avatar } from "./BlogCard"

function Appbar() {
  return ( 
    <div className="flex border-b justify-between px-10 py-4 ">
        <div className="flex flex-col justify-center">
            Medium
        </div>
        <div>
            <Avatar size="big" name="Shashwat"/>
        </div>
    </div>
  )
}

export default Appbar