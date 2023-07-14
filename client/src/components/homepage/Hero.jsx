import  NavBar from "../nav/NavBar"
import  image from "../../assets/hero.jpg"

const Hero = () => {
  return (
    <div className="w-11/12 mx-auto mb-5 max-h-screen">
      <div >
        <NavBar/>
      </div>
      <div className="w-full md:w-4/6 m-auto text-center pt-8 pb-2">
        <h2 className="text-xl font-semibold sm:w-full md:text-4xl">Get your transcript delivered </h2>
        <h2 className="text-xl font-semibold sm:w-full md:text-4xl">with ease worldwide</h2>
      </div>
      <div className="flex justify-center align-center pt-5 ">
        <img src={image} alt="" />
      </div>
      <div className="w-5/6 font-semibold text-xl m-auto text-center">
        <h3 className="text-sm md:text-xl">Get your transcript delivered quickly and accurately with Transcript Digita from your school to anywhere in the world without stress. 100% Efficient and Reliable</h3>
      </div> 
      <div className="flex justify-around pt-4 lg:w-4/12 md:w-8/12 sm:w-full sm:jusify-between m-auto">
        <button className=" font-semibold sm:py-8 md:px-6 md:py-2 border border-primary text-gray-800 bg-white hover:bg-primary hover:text-white hover:border rounded-lg">Track Request</button>
        <button className="font-semibold px-6 py-2 text-white bg-primary hover:bg-white hover:text-black hover:border border-black rounded-lg">Get Started</button>
      </div>
    </div>
  )
}

export default Hero
