import React, { useEffect, useContext, useState } from "react";
// import Table from 'react-bootstrap/Table';
import axios from "axios";
// import { socket } from './socket';
import { SocketContext, socket } from './socket';
const WEATHER_API = "http://localhost:7000/api/v1/modules/weather"
export let Weather = () => {
    const [time, setTime] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [temperature, setTemperature] = useState([]);

    console.log("---->inside weather api-->");
    const socket = useContext(SocketContext);
    useEffect(() => {
        let counter_initial = 0;
        let counter_final = 10;
        let first_hit=true;
        setInterval(() => {

            const api_hit = async () => {
                counter_initial = counter_final
                counter_final = counter_final + 10;
                first_hit=counter_initial>10?false:true;
                try {
                    const response_new = await axios({
                        method: 'post', //you can set what request you want to be
                        url: "http://localhost:7000/api/v1/modules/weather",
                        data: {
                            counter_initial,
                            counter_final,
                            first_hit:first_hit
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            "Accept-Encoding": "gzip, deflate, br",
                            "Connection": "keep-alive",
                            "Accept": "*/*",
                            "User-Agent": "PostmanRuntime/7.32.2"
                        }
                    })

                    // socket.on("weather_emitted",(data)=>{
                    //     console.log("socket --data---->",data);
                    // })
                    // return () => socket.disconnect();
                    // const response = await axios.get("http://localhost:7000/api/v1/modules/weather", {
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         "Accept-Encoding": "gzip, deflate, br",
                    //         "Connection": "keep-alive",
                    //         "Accept":"*/*"
                    //       }
                    // });
                    console.log("response---->", response_new?.data?.data);
                    setHumidity([...response_new?.data?.data?.relativehumidity_2m]);
                    setTemperature([...response_new?.data?.data?.temperature_2m]);
                    setTime([...response_new?.data?.data?.time]);
                    console.log("time---->", humidity);


                } catch (err) {
                    console.log("error in api_hit--->", err)
                }

            }
            api_hit()
        }, 5000)

    }, [])
    return (
        <div>
            <span>
                Time:     {
                    time.map(item => {
                        return <h1>{item}</h1>
                    })
                }
            </span>
            <span>
                temperature:  {
                    temperature.map(item => {
                        return <h1>{item}</h1>
                    })
                }
            </span>
            <span>
                Humidity:   {
                    humidity.map(item => {
                        return <h1>{item}</h1>
                    })
                }
            </span>

        </div>

    )
}