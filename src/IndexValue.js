import React from 'react';
const greenStyle = {
    color: 'green'
},
redStyle = {
    color: 'red'
}
export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: this.props.value,
            indexStyle:{}
        }
    }
    static getDerivedStateFromProps(nextProps, currentState){
        // Thay đổi màu khi nextProps khác với currentState
        if(nextProps.value > currentState.value){
            return{
                value: nextProps.value,
                indexStyle: greenStyle
            }
        }
        else if(nextProps.value < currentState.value){
            return{
                value: nextProps.value,
                indexStyle: redStyle
            }
        }
        else return null;
        
    }
    render(){
        return(
            <p className='test' style={this.state.indexStyle}>{this.state.value}</p>
        )
    }
}