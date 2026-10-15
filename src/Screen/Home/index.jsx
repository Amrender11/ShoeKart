import Hero from "../../Compnent/hero-shoe img"
import NewArrivals from "../../Compnent/Arrival-home/NewArrivals"
import Category from "../../Compnent/Collection/Category"
import { Brand } from "../../Compnent/Brand-home/Brand"
import { Foot } from "../../Compnent/Upper-Footer/Foot"
import Footer from "../../Compnent/Footer"

export const Home = ()=>{
    return(
        <>
<Hero/>
<Category/>
<NewArrivals/>
<Brand/>
<Foot/>
<Footer/>
        </>
    )
}