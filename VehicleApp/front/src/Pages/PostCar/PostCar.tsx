import axios from "axios"
import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import "./PostCar.css"
import Navbar from "../../Components/Navbar/Navbar";

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
    }, []);

    const [uploadedFiles, uploadedFilesSet] = useState([])

    const handleFileChange = (event)=>{
        //@ts-ignore
        const files = Array.from(event.target.files)
        const urlArray = files.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }))
        uploadedFilesSet(prevState => [...prevState, ...urlArray])
    }

    useEffect(() => {
        console.log(uploadedFiles)
    }, [uploadedFiles]);


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
                <select style={{float: "right"}}>
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
                <input style={{float: "right"}}/>
            </div>
            <div>
                <span>Cylinder capacity</span>
                <input style={{float: "right"}}/>
            </div>
            <div>
                <span>Year</span>
                <input style={{float: "right"}}/>
            </div>
            <div>
                <span>Price</span>
                <input style={{float: "right"}}/>
            </div>
            <div>
                <span>Currency</span>
                <select style={{float: "right"}}>
                    <option>EUR</option>
                    <option>USD</option>
                </select>
            </div>
            <div>
                <span>Fuel type</span>
                <select style={{float: "right"}}>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>Electric</option>
                    <option>GPL</option>
                </select>
            </div>
            <div>
                <span>Condition</span>
                <select style={{float: "right"}}>
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
                }}>{uploadedFiles.length == 0 ? <div onClick={() => {
                        //@ts-ignore
                        fileUploadRef.current.click()
                    }} className={"add"}><FontAwesomeIcon icon={faPlus} size="2xl"/></div> :
                    <div style={{display:"flex", alignItems:"center", gap:30, flexWrap:"wrap"}}>
                        {uploadedFiles.map((image, index) => {
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
        </div>
    </div>
}

export default PostCar