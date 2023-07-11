import image from "../../assets/aboutImg.jpg"
import image2 from "../../assets/loginImg.jpg"
const Testimonials = () => {
const review =[
    {
        name:"Seyi Ola",
        image:image,
        testimony:"I was so excited when i got my transcript processed and delivered within 48 hours when I needed to travel to the USA"
    },
    {
        name:"Manoah Luka",
        image:image2,
        testimony:"I was so excited when i got my transcript processed and delivered within 48 hours when I needed to travel to the USA"
    },
    {
        name:"Mr Isah",
        image:image,
        testimony:"I was so excited when i got my transcript processed and delivered within 48 hours when I needed to travel to the USA"
    }
]

  return (
    <div className="h-64">
    <div className="py-5 w-10/12 m-auto">
       <p className="py-2 text-2xl font-normal">Testimonials</p>
     <div className="flex flex-row gap-8 flex-wrap min-h-36">
         {
            review.map((review) => {
                return(
                <div className="bg-bgprimary flex-1 h-40 rounded-bl-3xl rounded-tr-3xl" key={review.name}>
                <div className="p-4 pb-0.5">
                    <p className="text-sm text-justify">{review.testimony}</p>
                    <div className="flex flex-row gap-3 align-baseline pt-3">
                        <img src={review.image} alt="One" className="h-10 w-10 rounded-full"/>
                        <h4 className="pt-3">{review.name}</h4>
                    </div>
                    </div>
                </div>
                )
            })
         } 
        </div>
       </div>
   </div>
  )
}

export default Testimonials

