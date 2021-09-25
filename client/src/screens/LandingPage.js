import  './landingPage.css'
import {Link} from 'react-router-dom'
import posImage from '../posImage.jpg'
import record from '../record.png'
import admin from '../admin.jpg'
import others from '../others.jpg'
import eat1 from '../eat1.jpg'
import { useEffect } from 'react'
import AOS from 'aos'


const LandingPage = () => {
    // const reloads = () =>{
    //     window.location.reload()
        
    // }
    useEffect(() => {
        AOS.init({
          duration : 2000
        });
      }, []);
    
    return (
        <div className="landingPage">
            
            <div className="landingPage__left">
                <div className="landLeft__top">
                    <p className="landing__text">Healty Food Network</p>
                </div>
                <div className="landLeft__bottom">
                    <img src={eat1} alt="" className="landingImg" />
                </div>
            </div>
            <div className="landingPage__right">
                <div className="landingPage__rightBox">
                        <Link to="/home" className="landingPage__a" data-aos="zoom-out-up">
                            <img src={posImage} className="landing__img" />
                        </Link>
                        <Link to="/orders" className="landingPage__a" data-aos="zoom-out-up">
                            <img src={record} alt="" className="landing__img" />
                        </Link>
                    <Link to="/add" className="landingPage__a"  data-aos="zoom-out-down" >
                        <img src={admin} alt="" className="landing__img" />
                    </Link>
                    <Link className="landingPage__a"  data-aos="zoom-out-down">
                        <img src={others} alt="" className="landing__img" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
