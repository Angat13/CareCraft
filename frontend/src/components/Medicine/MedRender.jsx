import MedNavbar from "./MedNavbar"
import MedExplore from "./MedExplore/MedExplore";
import MedDisplay from './MedDisplay/MedDisplay'
import MedHeader from './MedHeader/MedHeader'
import Footer from "../Footer/Footer";

const MedRender = () => {
  return (
    <>
    <MedNavbar/>
    <MedHeader/>
    <MedExplore/>
    <MedDisplay/>
<Footer/>
    </>
  )
}

export default MedRender