import React from 'react';
import CurrencyFormat from 'react-currency-format';
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
        // Trường hợp chưa có khớp lệnh nên mã CP sẽ không có màu
        if(''===this.props.matchedCommandPrice){
        return(
                <td>{this.props.value}</td>
            )
        }
        return (
            <td style={this.props.matchedCommandPrice===this.props.referencePrice?{color:'yellow'}:this.props.matchedCommandPrice>this.props.referencePrice?{color:'green'}:{color:'red'}}>{this.props.value}</td>
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

// Ý tưởng: sử dụng getDerivedStateFromProps tạo hiệu ứng thay đổi màu ô khi giá trị trong ô thay đổi, sử dụng componentDidUpdate để xóa hiệu ứng,
// tránh trường hợp ô bị dính 1 màu khi dữ liệu không thay đổi
export class TongCP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            tileStyle: {}
        }
    }
    // Ô đổi sang màu cam khi giá trị trong ô thay đổi
    static getDerivedStateFromProps(nextProps, currentState){
        if(nextProps.value !== currentState.value){
            return{
                value: nextProps.value,
                tileStyle: orangeStyle
            }
        }
        else return null;
    }
    //Xóa hiệu ứng đổi màu của ô trong 1s, tránh trường hợp ô luôn có màu cam
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
            price: this.props.price,
            referencePrice: this.props.referencePrice,
            tileStyle:{}
        }
    }
    componentDidMount(){
        // console.log("Calling componentDidMount");
        let textColor = this.state.price===this.state.referencePrice?{color:'yellow'}:this.state.price>this.state.referencePrice?{color:'green'}:{color:'red'};
        this.setState({
            tileStyle: textColor
        })
    }
    static getDerivedStateFromProps(nextProps, currentState){
        // console.log("Calling getDerivedStateFromProps")
        if(nextProps.price > currentState.price){
            return{
                price: nextProps.price,
                referencePrice: nextProps.referencePrice,
                tileStyle: greenStyle
            }
        }
        else if(nextProps.price < currentState.price){
            return{
                price: nextProps.price,
                referencePrice: nextProps.referencePrice,
                tileStyle: redStyle
            }
        }
        else return null;
        
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.price!==prevState.price){
            let textColor = this.state.price===this.state.referencePrice?{color:'yellow'}:this.state.price>this.state.referencePrice?{color:'green'}:{color:'red'};
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
            <td style={this.state.tileStyle}>{this.state.price===0?'':this.state.price}</td>
        )
    }
}
export class KhoiLuong extends React.Component{
    constructor(props){
        super(props);
        this.state={
            referencePrice: this.props.referencePrice,
            price: this.props.price,
            volume: this.props.volume,
            tileStyle:{}
        }
    }
    componentDidMount(){
        let textColor = this.props.price===this.props.referencePrice?{color: 'yellow'}:this.props.price>this.props.referencePrice?{color: 'green'}:{color: 'red'};
        this.setState({
            tileStyle: textColor
        })
    }
    static getDerivedStateFromProps(nextProps, currentState){
        let textColor=nextProps.price===nextProps.referencePrice?{color:'yellow'}:nextProps.price>nextProps.referencePrice?{color:'green'}:{color:'red'};
        if(nextProps.volume > currentState.volume){
            return{
                referencePrice: nextProps.referencePrice,
                price: nextProps.price,
                volume: nextProps.volume,
                tileStyle: greenStyle
            }
        }
        else if(nextProps.volume < currentState.volume){
            return{
                referencePrice: nextProps.referencePrice,
                price: nextProps.price,
                volume: nextProps.volume,
                tileStyle: redStyle
            }
        }
        // Xử lí trường hợp price thay đổi nhưng volume không thay đổi
        else if(nextProps.volume === currentState.volume&&nextProps.price!==currentState.price){
            return{
                referencePrice: nextProps.referencePrice,
                price: nextProps.price,
                tileStyle: textColor
            }
        }
        else return null
        
    }
    componentDidUpdate(prevProps, prevState){
        // Xu li backgroundColor cua tile
        if(this.state.volume!==prevState.volume){
            let textColor = this.state.price===this.state.referencePrice?{color:'yellow'}:this.state.price>this.state.referencePrice?{color:'green'}:{color:'red'};
            setTimeout(()=>{
                this.setState({
                    tileStyle: textColor
                })
            }, 1000)
        }
    }
    render() {
        return (
            <td style={this.state.tileStyle}><CurrencyFormat value={this.state.volume} displayType={'text'} thousandSeparator={true}/></td>

        )
    }
}

export class KhopLenh extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: this.props.value,
            referencePrice: this.props.referencePrice,
            matchedCommandPrice: this.props.matchedCommandPrice,
            tileStyle:{}
        }
    }
    componentDidMount(){
        let textColor = this.state.matchedCommandPrice===this.state.referencePrice?{color:'yellow'}:this.state.matchedCommandPrice>this.state.referencePrice?{color: 'green'}: {color:'red'};
        this.setState({
            tileStyle: textColor
        })
    }
    static getDerivedStateFromProps(nextProps, currentState){
        if(nextProps.value!==currentState.value){
            return{
                value: nextProps.value,
                referencePrice: nextProps.referencePrice,
                matchedCommandPrice: nextProps.matchedCommandPrice,
                tileStyle: orangeStyle
            }
        }
        else if(nextProps.value===currentState.value&&nextProps.matchedCommandPrice!==currentState.matchedCommandPrice){
            return{
                referencePrice: nextProps.referencePrice,
                matchedCommandPrice: nextProps.matchedCommandPrice,
                tileStyle: orangeStyle
            }
        }
        else return null
    }
    componentDidUpdate(prevProps, prevState){
        let textColor = this.state.matchedCommandPrice===this.state.referencePrice?{color:'yellow'}:this.state.matchedCommandPrice>this.state.referencePrice?{color: 'green'}: {color:'red'};
        if(this.state.value!==prevState.value){
          setTimeout(()=>{
            this.setState({
              tileStyle:textColor
            })
          },1000)
        }
        if(this.state.matchedCommandPrice!==prevState.matchedCommandPrice){
            setTimeout(()=>{
                this.setState({
                  tileStyle:textColor
                })
              },1000)
        }
      }
    render() {
        return (
            <td style={this.state.tileStyle} className='khoplenh'>{this.state.value===0||this.state.value===-100?'':this.state.value}</td>
        )
    }
}

