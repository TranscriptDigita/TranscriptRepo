import image from "../../assets/aboutImg.jpg"


const AboutUs = () => {
  return (
    <div className="bg-bgprimary h-96">
     <div className="flex flex-row w-10/12 m-auto py-16"> 
        <div className="flex-1">
            <img src={image} alt="ABOUT US" />
        </div>
        <div className="flex-1 text-Justify">
            <h2 className="text-xl font-semibold mb-2">About Transcript Digita</h2>
            <p>Undue Delays in in processing of transcript have remained major challenges to graduates of Tertiary Institutions Nigeria. This is has led to missing admissions and scholarships deadline, Job interviews and promotions at work place.<br/> At transcript digita, we solve this problem by creating an efficient and transparent system that make processing, delivery and verification of Transcripts seamless.<br/> We plan to work closely with institutions to  review their transcript administration procedures in order to customize our solutions to meet their needs.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
