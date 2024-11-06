import "./Home.css"
import Navbar from "../../Components/Navbar/Navbar";
import HomeFilter from "../../Components/HomeFilter/HomeFilter";

const Home = ()=>{
    return <div>
        <Navbar/>
        <div style={{
            position:"relative"
        }}>
            <img style={{
                width: "100%",
            }}
                 src={"https://wallpapers-clan.com/wp-content/uploads/2024/06/racing-car-night-speed-desktop-wallpaper-preview.jpg"}/>
            <div style={{
                position:"absolute",
                top:"10%",
                left:"10%",
                color:"white"
            }}>
                <div className={"fade-in-top"} style={{
                    fontSize:"10vw",
                    textShadow:"2px 2px 10px black"
                }}>Start driving</div>
                <div className={"fade-in-top-delayed"} style={{
                    fontSize:"8vw",
                    textShadow:"2px 2px 10px black"
                }}>your dreams today</div>
            </div>
        </div>
        <HomeFilter/>
    </div>
}

export default Home