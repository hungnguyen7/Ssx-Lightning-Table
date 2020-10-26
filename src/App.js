import React from 'react';
import './App.css';
import icon from './icon.png';
import Row from './Row';
import Index from './IndexValue';
import io from 'socket.io-client';
import axios from 'axios';
import HighchartsReact from "highcharts-react-official";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      index:null,
      accessToken: '',
      dataTable:[],
      chartOptions:{
        title:{
          text: null
        },
        credits:{
          enabled: false
        },
        chart: {
          // borderWidth: 1,
          backgroundColor: '#353535',
          type: 'line',
          width: 800,
          height: 200
      },
        plotOptions: {
          series: {
              marker: {
                  enabled: false
              },
              lineWidth: 1.5
          }
      },
        xAxis: {
          gridLineDashStyle: 'dot',
          gridLineWidth: 0.2,
          tickInterval: 1000*60*5,
          labels: {
            style: {
                color: 'white'
            }
        },
          type: 'datetime',
        },
        yAxis:{
          title:{
            text: null
          },
          gridLineDashStyle: 'dot',
          gridLineWidth: 0.2
        },
        time: {
          useUTC: false
        },
        series: [{
          showInLegend: false,
          data: []
        }]
      }
    }
    this.socket = null;
  }
  async componentDidMount(){
    //Get access token
    let accessToken = await axios.post('//45.119.213.117:5000/api/v1/users/login', {
      username: 'dltruongc',
      password: 'dltruongc'
    }).then((res)=>{
      return res.data.accessToken.value
    }).catch((err)=>{
      console.log(err)
    });
    this.setState({
      accessToken
    })
    //Connect socket
    this.socket = io('//45.119.213.117:5000');
    this.socket.on('connect', res => {
      console.log("Socket connected");
      this.socket.emit('authenticate', {
        token: `Bearer ${this.state.accessToken}`
      })
    })
    // Get data bảng điện
    this.socket.on('derivative', res => {
      // console.log(res)
      try{
        this.setState({
          dataTable: res.items
        })
      }
      catch(error){
        console.log(error.message)
      }
    })
    // Get data chart 
    this.socket.on('derivativeChart', res=>{
      console.log('Getting chart data...');
      // console.log(res)
      let dataSeries;
      try{
        dataSeries=res.data.map((value)=>{
          return Object.keys(value).map((key)=>{
            // Covert property createdAt sang getTime()
            if(key==='createdAt'){
              return new Date(value[key]).getTime()
            }
            return value[key]
          })
        })
      }
      catch(error){
        console.log(error)
      }
      let plotLine=res.firstIndex;
      try{
        this.setState({
          index: (dataSeries[dataSeries.length-1][1]).toFixed(2)
        })
      }
      catch(error){
        console.log(error.message)
      }
        
      
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
              color: 'orange',
              width: 1,
              value: plotLine
            }]
          },
          xAxis: {
            // Set min max cho chart
            min: new Date(res.openTime).getTime(),
            max: new Date(res.closeTime).getTime()
          }
        }
      })
    })
  }
  render(){
    return(
      <div id="main">
        <div className='logoNchart'>
        <div className='item1'>
            <Index value={this.state.index}/>
          </div>
          <div className='item2'>
            <HighchartsReact options={this.state.chartOptions}/>
          </div>
          <div className='item3'>
            <img className='logo' src={icon} alt='ICON'/>
          </div>
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
                this.state.dataTable.map((value, index)=>{
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
