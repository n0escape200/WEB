import "./HomeFilter.css"
import axios from "axios";
import {useEffect, useState} from "react";


const HomeFilter = () =>{

    const [dataDB,setDataDB] = useState(null);
    const [rawData, setRawData] = useState(null);

    const [brand,setBrands] = useState("Brand");
    const [models,setModels] = useState(null);

    const [fromPrice, setFromPrice] = useState(0);

    // eslint-disable-next-line no-unused-vars
    const [toPrice, setToPrice] = useState(null);

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
        if(brand != "Brand"){
            if(rawData){
                const models = rawData[brand]
                setModels(models)
            }
        }
    }

    useEffect(()=>{
        getCarBrands();
    },[])

    return <div style={{
        display: "flex",
        justifyContent: "center",
    }}>
        <fieldset style={{
            display:"flex",
            gap:30,
            borderRadius:10,
            marginBottom:20,
            padding:20
        }}>
            <legend style={{
                fontSize:23
            }}>Cars filter</legend>
            <select  onChange={(event)=>{
                setBrands(event.target.value);
                getBrandModels(event.target.value)
            }}  style={{fontSize:32}}>
                <option>Brand</option>
                {dataDB ? <>
                    {dataDB.map((item,index)=>{
                        return (<option key={index}>{item}</option>)
                    })}
                </>:<>
                </>}
            </select>

            <select disabled={brand == "Brand" ? true:false} style={{fontSize:32, padding:"5 10 5 10"}}>
                <option style={{maxHeight:150}}>Model</option>
                {models && <>
                    {models.map((item,index)=>{
                        return <option key={index}>{item}</option>
                    })}
                </>}
            </select>

            <select disabled={brand == "Brand" ? true:false} style={{fontSize:32,padding:"5 10 5 10"}}>
                <option>Years</option>
                {//@ts-ignore
                    Array.from({length:100},(_,index)=>{
                    return <option key={index}>{2024 - index}</option>
                })}
            </select>

            <fieldset>
                <legend>Price</legend>
                <div style={{display:"flex",gap:20}}>
                    <select onChange={(event)=>{
                        const value = event.target.value;
                        if(value != "From"){
                           const intValue = parseInt(value);
                           setFromPrice(intValue)
                        }
                    }} style={{
                        fontSize:28
                    }}>
                        <option>From</option>
                        {//@ts-ignore
                            Array.from({length:51},(_,index)=>{
                            return <option key={index}>{index * 1000}</option>
                        })}
                    </select>
                    <select style={{
                        fontSize:28
                    }}>
                        <option>To</option>
                        {//@ts-ignore
                            Array.from({length:30},(_,index)=>{
                            if(fromPrice > 0){
                                return <option key={index}>{fromPrice + index * 1000}</option>
                            }else{
                                return <option key={index}>{index * 1000}</option>
                            }
                        })}
                    </select>
                </div>
            </fieldset>
            <button style={{
                fontSize:32
            }}>Search</button>
        </fieldset>
    </div>
}

export default HomeFilter