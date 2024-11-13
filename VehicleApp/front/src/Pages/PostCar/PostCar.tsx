import axios from "axios"
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import "./PostCar.css"
import Navbar from "../../Components/Navbar/Navbar";
import Cookies from "js-cookie";

const PostCar = ()=>{
    const fileUploadRef = useRef()

    const [dataDB,setDataDB] = useState(null);
    const [rawData, setRawData] = useState(null);
    const [models,setModels] = useState(null);

    const getCarBrands = () =>{
        axios.get("http://localhost:3000/api/data//getData")
            .then((response)=>{
                const data = response.data[0];
                if(data){
                    const brands = Object.keys(data).filter(key => key !== "_id");
                    setRawData(data)
                    setDataDB(brands)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    const getBrandModels = (brand)=>{
        if(rawData){
            const models = rawData[brand]
            setModels(models)
        }
    }

    useEffect(() => {
        getCarBrands()
        const cookie = Cookies.get("User");
        if(cookie){
            payload.owner = cookie;
        }
    }, []);


    const [photosUrl, photosUrlSet] = useState([])
    const [photoUpload,photoUploadSet] = useState([])

    const handleFileChange = (event)=>{

        const formData = new FormData();
        const file = event.target.files[0]
        formData.append(file.name,file)
        formData.append("cloud_name","dvpfeykol")
        formData.append("upload_preset","ml_default")
        photoUploadSet(prevState => [...prevState,formData])

        //Used to set array that will render the imgaes on screen
        const url = { url: URL.createObjectURL(file)}
        photosUrlSet(prevState => [...prevState,url])
    }

    useEffect(() => {
        if(photoUpload){
            console.log(photoUpload)
        }
    }, [photoUpload]);


    const uploadData = ()=>{
        photoUpload.map(async (file,_)=>{
           await axios.post("https://api.cloudinary.com/v1_1/dvpfeykol/image/upload",file)
               .then(response=>{
                   console.log(response)})
               .catch(error =>{
                   console.log(error)})
        })
    }


    const payload = {
        brand:"",
        model:"",
        km:0,
        cc:0,
        year:0,
        price:0,
        currency:"EUR",
        fuel:"Petrol",
        condition:"New",
        photos:[],
        description:"",
        owner:""
    }

    return <div>
        <Navbar/>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: 540,
                margin: "auto",
                marginTop: "10vh",
                border: "1px solid black",
                padding: 10,
                borderRadius: 10,
                fontSize: 23
            }}>

            <div>
                <span>Brand</span>
                <select onChange={event => {
                    const modelsData = getBrandModels(event.target.value)
                    if (modelsData != null) {
                        setModels(modelsData)
                    }
                    payload.brand = event.target.value;
                }}
                        style={{float: "right"}}>
                    <option>Select...</option>
                    {dataDB && <>
                        {dataDB.map((item, index) => {
                            return <option key={index}>{item}</option>
                        })}
                    </>}
                </select>
            </div>
            <div>
                <span>Model</span>
                <select onChange={event => payload.model = event.target.value} style={{float: "right"}}>
                    <option>Select...</option>
                    {models && <>
                        {models.map((item, index) => {
                            return <option key={index}>{item}</option>
                        })}
                    </>}
                </select>
            </div>
            <div>
                <span>KM</span>
                <input onChange={event => payload.km = parseInt(event.target.value)} style={{float: "right"}}/>
            </div>
            <div>
                <span>Cylinder capacity</span>
                <input onChange={event => payload.cc = parseInt(event.target.value)} style={{float: "right"}}/>
            </div>
            <div>
                <span>Year</span>
                <input onChange={event => payload.year = parseInt(event.target.value)} style={{float: "right"}}/>
            </div>
            <div>
                <span>Price</span>
                <input onChange={event => payload.price = parseInt(event.target.value)} style={{float: "right"}}/>
            </div>
            <div>
                <span>Currency</span>
                <select onChange={event => payload.currency = event.target.value} style={{float: "right"}}>
                    <option>EUR</option>
                    <option>USD</option>
                </select>
            </div>
            <div>
                <span>Fuel type</span>
                <select onChange={event => payload.fuel = event.target.value} style={{float: "right"}}>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>Electric</option>
                    <option>GPL</option>
                </select>
            </div>
            <div>
                <span>Condition</span>
                <select onChange={event => payload.condition = event.target.value} style={{float: "right"}}>
                    <option>New</option>
                    <option>Used</option>
                    <option>Non usable</option>
                </select>
            </div>
            <div>
                <span>Photos</span>
                <input onChange={handleFileChange}
                       multiple
                       ref={fileUploadRef}
                       style={{display: "none"}} type={"file"}/>
                <div style={{
                    border: "1px solid black",
                    width: "fit-content",
                    padding:10
                }}>{photosUrl.length == 0 ? <div onClick={() => {
                        //@ts-ignore
                        fileUploadRef.current.click()
                    }} className={"add"}><FontAwesomeIcon icon={faPlus} size="2xl"/></div> :
                    <div style={{display:"flex", alignItems:"center", gap:30, flexWrap:"wrap"}}>
                        {photosUrl.map((image, index) => {
                            return <img style={{width: 150, height: "auto"}}
                                        src={image.url} alt="car" key={index}/>
                        })}
                        <div onClick={() => {
                            //@ts-ignore
                            fileUploadRef.current.click()
                        }} className={"add"}><FontAwesomeIcon icon={faPlus} size="2xl"/></div>
                    </div>}</div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <span>Description</span>
                <textarea style={{resize: "none"}} cols={30} rows={10}></textarea>
            </div>
            <button onClick={uploadData}
                style={{width:"fit-content", margin:"auto", marginTop:20, fontSize:32, padding:10, fontWeight:1000}}>Post car</button>
        </div>
    </div>
}

export default PostCar