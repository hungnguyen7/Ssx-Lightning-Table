import React from 'react';
import MuaBan from './Tile';
import {MaCP, GiaTC, TongCP, KhopLenh, KhoiLuong} from './Tile';
export default class Row extends React.Component{
    constructor(props){
        super(props);
        this.state={
            kl_gia:this.props.value.matchedCommands.price,
            kl_pt:0
        }
    }
    static getDerivedStateFromProps(nextProps, currentState){
        // console.log(currentState.kl_gia, nextProps.value.matchedCommands.price)
        if(nextProps.value.matchedCommands.price!==currentState.kl_gia){
            return{
                kl_gia: nextProps.value.matchedCommands.price,
                // kl_pt: Math.round( currentState.kl_gia/nextProps.value.matchedCommands.price * 100 + Number.EPSILON ) / 100
                kl_pt: Math.ceil(currentState.kl_gia/nextProps.value.matchedCommands.price)
            }
        }
        else return null;
    }
    render(){
        // let valueOfOneRow = Object.keys(this.props.value).map(key=>this.props.value[key]);
        // console.log(valueOfOneRow);
        let maCP = this.props.value.stockCode;
        let giaTC = this.props.value.referencePrice;
        let tongKhoiLuong = this.props.value.totalVolume;
        let mua1 = this.props.value.buys[0].price;
        let mua1_kl = this.props.value.buys[0].volume;
        let mua2 = this.props.value.buys[1].price;
        let mua2_kl = this.props.value.buys[1].volume;
        let mua3 = this.props.value.buys[2].price;
        let mua3_kl = this.props.value.buys[2].volume;
        let kl_gia = this.props.value.matchedCommands.price;
        let kl_kl = this.props.value.matchedCommands.volume;
        let ban1 = this.props.value.sells[2].price;
        let ban1_kl = this.props.value.sells[2].volume;
        let ban2 = this.props.value.sells[1].price;
        let ban2_kl = this.props.value.sells[1].volume;
        let ban3 = this.props.value.sells[0].price;
        let ban3_kl = this.props.value.sells[0].volume;
        //Gia 3,2,1 de truyen vao Child Component de so sanh
        return(
            <tr>
                <MaCP value={maCP} giaTC={giaTC} giaKhopLenh={kl_gia}/>
                <GiaTC value={giaTC}/>
                <TongCP value={tongKhoiLuong}/>
                <MuaBan giaTC={giaTC} gia={mua3}/>
                <KhoiLuong giaTC={giaTC} gia={mua3} kl={mua3_kl}/>
                <MuaBan giaTC={giaTC} gia={mua2}/>
                <KhoiLuong giaTC={giaTC} gia={mua2} kl={mua2_kl}/>
                <MuaBan giaTC={giaTC} gia={mua1}/>
                <KhoiLuong giaTC={giaTC} gia={mua1} kl={mua1_kl}/>
                <KhopLenh value={kl_gia} giaTC={giaTC} giaKhopLenh = {kl_gia}/>
                <KhopLenh value={kl_kl} giaTC={giaTC} giaKhopLenh = {kl_gia}/>
                <KhopLenh value={this.state.kl_pt} giaTC={giaTC} giaKhopLenh = {kl_gia}/>
                <MuaBan giaTC={giaTC} gia={ban1}/>
                <KhoiLuong giaTC={giaTC} gia={ban1} kl={ban1_kl}/>
                <MuaBan giaTC={giaTC} gia={ban2}/>
                <KhoiLuong giaTC={giaTC} gia={ban2} kl={ban2_kl}/>
                <MuaBan giaTC={giaTC} gia={ban3}/>
                <KhoiLuong giaTC={giaTC} gia={ban3} kl={ban3_kl}/>
            </tr>
        )
    }
}