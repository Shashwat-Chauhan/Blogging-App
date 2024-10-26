
interface BlogCardTypes{
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({authorName,title,content,publishedDate}:BlogCardTypes) => {
    return (
    <div className="border-b p-4 border-slate-300 pb-4">
        <div className="flex">
            <div className="">
                <Avatar name={authorName}/>
            </div>
            <div className="font-extralight text-sm pl-2 flex justify-center flex-col">
                {authorName}
            </div>
            <div className="flex flex-col justify-center pl-2">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500 flex text-sm justify-center flex-col ">
                {publishedDate}
            </div>
        </div>
        <div className="font-semibold text-2xl pt-1">
            {title}
        </div>
        <div className="text-md font-light  pt-1">
            {content}
        </div>
        <div className="text-sm font-thin text-slate-800 pt-4">
            {`${Math.ceil(content.length / 1000)} minute(s) read`}
        </div>
    </div>
)}

export function Avatar({name, size = "small"}: {name: string,size?:"small"| "big"}){
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-7 h-7" : "w-10 h-10"} `}>
            <span className={`${size === "small" ? "text-sm" : "text-base"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
    )
}

function Circle(){
    return(
        <div className="bg-slate-600 rounded-full h-1 w-1">

        </div>
    )
}