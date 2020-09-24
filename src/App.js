import React from 'react';
import './App.css';
import Row from './Row';
import io from 'socket.io-client';
import axios from 'axios';
import HighchartsReact from "highcharts-react-official";

let dateTime = new Date();
// let min = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 15, 00).getTime();
// let max = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 21, 0).getTime();
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      apiStockResult:[],
      chartOptions:{
        title:{
          text: null
        },
        credits:{
          enabled: false
        },
        chart: {
          backgroundColor: '#353535',
          type: 'line',
          width: 800,
          height: 200
      },
        plotOptions: {
          series: {
              marker: {
                  enabled: false
              }
          }
      },
        xAxis: {
          labels: {
            style: {
                color: 'white'
            }
        },
          type: 'datetime',
          // min: min,
          // max: max
        },
        yAxis:{
          title:{
            text: null
          }
        },
        // time: {
        //   useUTC: false
        // },
        series: [{
          showInLegend: false,
          data: []
        }]
      }
    }
    this.socket = null;
  }
  componentDidMount(){
    this.socket = io('http://45.119.213.117:5000');
    axios.post('http://45.119.213.117:5000/api/v1/users/login', {
      username: 'admin02',
      password: '123456'
    }).then((res)=>{
      // console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    this.socket.on('connect', res => {
      console.log("Socket connected");
      this.socket.emit('authenticate', {
        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDM1NDA3NjE4NDksInBheWxvYWQiOnsiaWQiOiI1ZjZjODkzNjk5MmQxNTAwMzIzZGZmY2IiLCJleHBpcmVkVGltZSI6MTYwMzU0MDc2MTg0OX0sImlhdCI6MTYwMDk0ODc2MX0.9uDpoDfuF4_JHRgsmho8mkfnI_ekusvl8ihhhqWAUPY'
      })
    })
    this.socket.on('derivative', res => {
      console.log(res.items)
      // console.log("Getting stock data...");
      this.setState({
        apiStockResult: res.items
      })
    })
    this.socket.on('derivativeChart', res=>{
      // console.log(res)
      // console.log('Getting chart data...');
      let dataSeries=res.data.map((value)=>{
        return Object.keys(value).map((key)=>{
          if(key==='createdAt'){
            return new Date(value[key]).getTime()
          }
          return value[key]
        })
      })
      // console.log(dataSeries)
      let plotLine=res.firstIndex;
      this.setState({
        chartOptions:{
          series:[{
            data: dataSeries,
            threshold: plotLine,
            negativeColor: 'red',
            color: 'green'
          }],
          yAxis:{
            plotLines:[{
              dashStyle: 'shortdash',
              color: 'orange',
              width: 2,
              value: plotLine
            }]
          }
        }
      })
    })
  }
  render(){
    // console.log(this.state.chartOptions)
    return(
      <div id="main">
        <div className='logoNchart'>
          <div className='item1'>
            <HighchartsReact options={this.state.chartOptions}/>
          </div>
          <img className='item2' src='/icon.png' alt='ICON' width='70%' height='70%'/>
        </div>
        <div className="container" id="table">
          <table className='banggia'>
            <thead>
              <tr>
                  <th rowSpan="2">Mã CK</th>
                  <th rowSpan="2">TC</th>
                  <th rowSpan="2">Tổng KL</th>
                  <th colSpan="6">Bên mua</th>
                  <th colSpan="3" className='khoplenh'>Khớp lệnh</th>
                  <th colSpan="6">Bên bán</th>
                </tr>
                <tr>
                  <th>Giá 3</th>
                  <th>KL 3</th>
                  <th>Giá 2</th>
                  <th>KL 2</th>
                  <th>Giá 1</th>
                  <th>KL 1</th>
                  <th className='khoplenh'>Giá</th>
                  <th className='khoplenh'>KL</th>
                  <th className='khoplenh'>%</th>
                  <th>Giá 1</th>
                  <th>KL 1</th>
                  <th>Giá 2</th>
                  <th>KL 2</th>
                  <th>Giá 3</th>
                  <th>KL 3</th>
                </tr>
            </thead>
            <tbody>
              {
                this.state.apiStockResult.map((value, index)=>{
                  return(
                      <Row key={`row-${index}`} value={value}/>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App;
