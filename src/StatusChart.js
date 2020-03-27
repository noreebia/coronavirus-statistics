import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';

function GeneralStatisticChart() {

    // const [statsUpdateCount, setStatsUpdateCount] = useState(0);
    // const [casesPerCountry, setCasesPerCountry] = useState(null);
    const [totalStatsPerCountry, setTotalStatsPerCountry] = useState(null);
    const [deathsPerCountry, setDeathsPerCountry] = useState([]);
    const [casesPerCountry, setCasesPerCountry] = useState([]);

    useEffect(()=>{
        axios({
            method: 'get',
            url: '/coronavirus/cases_by_country.php',
            baseURL: 'https://coronavirus-monitor.p.rapidapi.com',
            headers: {"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com", "x-rapidapi-key": "954e904005mshe0ee913ce742912p110862jsnf6cfa0b1be46"},
        }).then(res=>{
            const {data: {countries_stat : totalStatsPerCountry }} = res;

            const statsPerCountry = totalStatsPerCountry.map(stats => {
                stats.cases = stats.cases.replace(",", "");
                stats.deaths = stats.deaths.replace(",", "");
                return stats;
            }).slice(0,20);
            // statsPerCountry.sort((statA, statB) => statB.cases - statA.cases);
            setTotalStatsPerCountry(statsPerCountry);

            // settotalStatsPerCountry(totalStatsPerCountry.map(stats =>  {
            //     stats.cases = stats.cases.replace(",", "");
            //     stats.deaths = stats.deaths.replace(",", "");
            //     return stats;
            // }).sort((statA, statB) => statB.cases - statA.cases).slice(0, 10))
            // console.log(totalStatsPerCountry);
            // totalStatsPerCountry.sort((statA, statB) => statB.cases.replace(",", "") - statA.cases.replace(",", ""))
            // // totalStatsPerCountry.sort((statA, statB) => statB.cases - statA.cases)

            // console.log(totalStatsPerCountry);
            // // setData(totalStatsPerCountry);
            // settotalStatsPerCountry(totalStatsPerCountry.slice(0,15));
        })
    }, []);

    useEffect(()=>{
        if(totalStatsPerCountry != null){
            // const deaths = JSON.parse(JSON.stringify(totalStatsPerCountry));
            // deaths.sort((statA, statB) => statB.deaths - statA.deaths);

            // const deaths = ;
            // deaths.sort((statA, statB) => statB.deaths - statA.deaths);

            setDeathsPerCountry(JSON.parse(JSON.stringify(totalStatsPerCountry)).sort((statA, statB) => statB.deaths - statA.deaths).slice(0,10));    

            // const cases = ;
            // cases.sort((statA, statB) => statB.cases - statA.cases);
            setCasesPerCountry(JSON.parse(JSON.stringify(totalStatsPerCountry)).sort((statA, statB) => statB.cases - statA.cases).slice(0,10));    
        }
    }, totalStatsPerCountry);

  return (
  <div>
      {casesPerCountry != null && <BarChart width={1000} height={500} data={casesPerCountry}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="country_name" />
        <YAxis ticks = {[0, 20000, 40000, 60000, 80000, 100000]}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="cases" fill="#0000000" />
        {/* <Bar dataKey="" fill="#82ca9d" /> */}
        </BarChart>}

        {deathsPerCountry != null && <BarChart width={1000} height={500} data={deathsPerCountry}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="country_name" />
        <YAxis ticks = {[0, 2000, 4000, 6000, 8000, 10000]}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="deaths" fill="#0000000" />
        {/* <Bar dataKey="" fill="#82ca9d" /> */}
        </BarChart>}

        {totalStatsPerCountry != null && <BarChart width={1000} height={500} data={totalStatsPerCountry.slice(0,10)}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="country_name" />
        <YAxis ticks = {[0, 20000, 40000, 60000, 80000, 100000]}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="cases" fill="#0000000" />
        <Bar dataKey="deaths" fill="#0000000" />
        {/* <Bar dataKey="" fill="#82ca9d" /> */}
        </BarChart>}
  </div>


);
}

export default GeneralStatisticChart;
