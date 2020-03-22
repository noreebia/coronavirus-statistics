import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function GeneralStatisticChart() {

    const [data, setData] = useState('yolo');

    useEffect(()=>{
        axios({
            method: 'get',
            url: '/coronavirus/cases_by_country.php',
            baseURL: 'https://coronavirus-monitor.p.rapidapi.com',
            headers: {"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com", "x-rapidapi-key": "954e904005mshe0ee913ce742912p110862jsnf6cfa0b1be46"},
        }).then(res=>{
            console.log(res.data);
            setData(res.data.countries_stat[0].country_name);
        })
    }, [])

  return (
  <div>{data}</div>
  );
}

export default GeneralStatisticChart;
