import React from 'react';

const greenStyle = {
    backgroundColor: '#2EB101'
},
redStyle = {
    backgroundColor: '#DF0001'
},
orangeStyle = {
    backgroundColor: '#E8892B'
}

export class MaCP extends React.Component {
    render() {
        // console.log(this.props)
        if(''===this.props.giaKhopLenh){
        // console.log(this.props.value)    
        return(
                <td>{this.props.value}</td>
            )
        }
        return (
            <td style={this.props.giaKhopLenh===this.props.giaTC?{color:'yellow'}:this.props.giaKhopLenh>this.props.giaTC?{color:'green'}:{color:'red'}}>{this.props.value}</td>
        )
    }
}

export class GiaTC extends React.Component {
    render() {
        return (
            <td>{this.props.value}</td>
        )
    }
}

export class TongCP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            tileStyle: {}
        }
    }
    static getDerivedStateFromProps(nextProps, currentState){
        if(nextProps.value !== currentState.value){
            return{
                value: nextProps.value,
                tileStyle: orangeStyle
            }
        }
        else return null;
    }
    componentDidUpdate(prevProps, prevState){
       if(this.state.value!==prevState){
           setTimeout(()=>{
               this.setState({
                   tileStyle:{}
               })
           }, 1000)
       }
   }
    render() {
        return (
            <td style={this.state.tileStyle}>{this.state.value===0?'':this.state.value}</td>
        )
    }
}
export default class MuaBan extends React.Component{
    constructor(props){
        super(props);
        this.state={
            gia: this.props.gia,
            giaTC: this.props.giaTC,
            tileStyle:{}
        }
    }
    componentDidMount(){
        // console.log("Calling componentDidMount");
        let textColor = this.state.gia===this.state.giaTC?{color:'yellow'}:this.state.gia>this.state.giaTC?{color:'green'}:{color:'red'};
        this.setState({
            tileStyle: textColor
        })
    }
    static getDerivedStateFromProps(nextProps, currentState){
        // console.log("Calling getDerivedStateFromProps")
        if(nextProps.gia > currentState.gia){
            return{
                gia: nextProps.gia,
                giaTC: nextProps.giaTC,
                tileStyle: greenStyle
            }
        }
        else if(nextProps.gia < currentState.gia){
            return{
                gia: nextProps.gia,
                giaTC: nextProps.giaTC,
                tileStyle: redStyle
            }
        }
        else return null;
        
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.gia!==prevState.gia){
            let textColor = this.state.gia===this.state.giaTC?{color:'yellow'}:this.state.gia>this.state.giaTC?{color:'green'}:{color:'red'};
            //Xu li backgroundTile
            setTimeout(()=>{
                this.setState({
                    tileStyle: textColor
                })
            }, 1000)
        }
    }
    render(){
        // console.log('Calling render');
        return (
            <td style={this.state.tileStyle}>{this.state.gia===0?'':this.state.gia}</td>
        )
    }
}
export class KhoiLuong extends React.Component{
    constructor(props){
        super(props);
        this.state={
            giaTC: this.props.giaTC,
            gia: this.props.gia,
            kl: this.props.kl,
            tileStyle:{}
        }
    }
    componentDidMount(){
        let textColor = this.props.gia===this.props.giaTC?{color: 'yellow'}:this.props.gia>this.props.giaTC?{color: 'green'}:{color: 'red'};
        this.setState({
            tileStyle: textColor
        })
    }
    static getDerivedStateFromProps(nextProps, currentState){
        // console.log("Calling getDerivedStateFromProps")
        let textColor=nextProps.gia===nextProps.giaTC?{color:'yellow'}:nextProps.gia>nextProps.giaTC?{color:'green'}:{color:'red'};
        if(nextProps.kl > currentState.kl){
            return{
                giaTC: nextProps.giaTC,
                gia: nextProps.gia,
                kl: nextProps.kl,
                tileStyle: greenStyle
            }
        }
        else if(nextProps.kl < currentState.kl){
            return{
                giaTC: nextProps.giaTC,
                gia: nextProps.gia,
                kl: nextProps.kl,
                tileStyle: redStyle
            }
        }
        // Xu li truong hop gia thay doi nhung khoi luong giu nguyen
        else if(nextProps.kl === currentState.kl&&nextProps.gia!==currentState.gia){
            return{
                giaTC: nextProps.giaTC,
                gia: nextProps.gia,
                tileStyle: textColor
            }
        }
        else return null
        
    }
    componentDidUpdate(prevProps, prevState){
        // Xu li backgroundColor cua tile
        if(this.state.kl!==prevState.kl){
            let textColor = this.state.gia===this.state.giaTC?{color:'yellow'}:this.state.gia>this.state.giaTC?{color:'green'}:{color:'red'};
            setTimeout(()=>{
                this.setState({
                    tileStyle: textColor
                })
            }, 1000)
        }
    }
    render() {
        return (
            <td style={this.state.tileStyle}>{this.state.kl}</td>
        )
    }
}

export class KhopLenh extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: this.props.value,
            giaTC: this.props.giaTC,
            giaKhopLenh: this.props.giaKhopLenh,
            tileStyle:{}
        }
    }
    componentDidMount(){
        let textColor = this.state.giaKhopLenh===this.state.giaTC?{color:'yellow'}:this.state.giaKhopLenh>this.state.giaTC?{color: 'green'}: {color:'red'};
        this.setState({
            tileStyle: textColor
        })
    }
    static getDerivedStateFromProps(nextProps, currentState){
        // let textColor=nextProps.gia===nextProps.giaTC?{color:'yellow'}:nextProps.gia>nextProps.giaTC?{color:'green'}:{color:'red'};
        if(nextProps.value!==currentState.value){
            return{
                value: nextProps.value,
                giaTC: nextProps.giaTC,
                giaKhopLenh: nextProps.giaKhopLenh,
                tileStyle: orangeStyle
            }
        }
        else if(nextProps.value===currentState.value&&nextProps.giaKhopLenh!==currentState.giaKhopLenh){
            return{
                giaTC: nextProps.giaTC,
                giaKhopLenh: nextProps.giaKhopLenh,
                tileStyle: orangeStyle
            }
        }
        else return null
    }
    componentDidUpdate(prevProps, prevState){
        let textColor = this.state.giaKhopLenh===this.state.giaTC?{color:'yellow'}:this.state.giaKhopLenh>this.state.giaTC?{color: 'green'}: {color:'red'};
        if(this.state.value!==prevState.value){
          setTimeout(()=>{
            this.setState({
              tileStyle:textColor
            })
          },1000)
        }
        if(this.state.giaKhopLenh!==prevState.giaKhopLenh){
            setTimeout(()=>{
                this.setState({
                  tileStyle:textColor
                })
              },1000)
        }
      }
    render() {
        return (
            <td style={this.state.tileStyle} className='khoplenh'>{this.state.value===0?'':this.state.value}</td>
        )
    }
}

