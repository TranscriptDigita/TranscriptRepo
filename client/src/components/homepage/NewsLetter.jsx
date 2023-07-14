import Input from "../form/Input"
import Button from "../form/Button"

const NewsLetter = () => {
  return (
   <div className="bg-bgprimary h-32 w-10/12 mx-auto rounded-md mb-3"> 
   <div className="flex flex-row p-12">
      <div className="flex-1">
        <div className="w-full text-center">
        <h3 className="text-2xl font-semibold">Our Newsletter</h3>
        </div>
      </div>
      <div className="flex-1">
       <div className="w-full flex flex-row">
       <div className="px-4">
          <Input placeholder="enter your email" />
        </div>
        <div className="px-1">
          <Button btn="Subscribe"/>
        </div>
       </div>
      </div>
    </div>
    </div>
  )
}

export default NewsLetter
