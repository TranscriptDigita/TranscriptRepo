import insta from "../../assets/Instagram.png"
import facebook from "../../assets/facebook.png"
import twitter from "../../assets/twitter.png"

const Footer = () => {
  return (
    <div className="bg-primary text-white min-h-84">
      <div className="grid grid-cols-12 w-10/12 mx-auto py-5">
        <div className="col-span-5">
         <div className="w-5/6">
         <h4 className="text-3xl font-medium pb-4">Transcript Digita</h4>
          <p className="text-sm">The leading transcript service in Nigeria, providing reliable, fast services accross the nation and worldwide</p>
         </div>
        </div>
        <div className="col-span-4 text-sm ">
          <h4 className="font-medium text-xl py-3">QuickLinks</h4>
          <p><a href="/about" className="hover:border-b-white">About</a></p>
          <p><a href="/testimonial">Testimonial</a></p>
          <p><a href="/faq">FAQ</a></p>
        </div>
        <div className="col-span-3 text-sm">
          <h4 className="font-medium text-xl py-3">Contacts</h4>
          <p>+234-943827323</p>
          <p>Transdigita@gmail.com</p>
          <div className="flex flex-row gap-4 pt-1">
            <img src={insta} alt="" className="w-4.5 h-5"/>
            <img src={facebook} alt="" className="w-5 h-5"/>
            <img src={twitter} alt="" className="w-4.5 h-5"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
