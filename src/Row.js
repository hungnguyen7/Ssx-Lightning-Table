import React from 'react';
import MuaBan from './Tile';
import {MaCP, GiaTC, TongCP, KhopLenh, KhoiLuong} from './Tile';
export default class Row extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         kl_gia:this.props.value.matchedCommands.price,
    //         kl_pt:0
    //     }
    // }
    // static getDerivedStateFromProps(nextProps, currentState){
    //     // console.log(currentState.kl_gia, nextProps.value.matchedCommands.price)
    //     if(nextProps.value.matchedCommands.price!==currentState.kl_gia){
    //         return{
    //             kl_gia: nextProps.value.matchedCommands.price,
    //             kl_pt: Math.round( currentState.kl_gia/nextProps.value.matchedCommands.price * 100 + Number.EPSILON ) / 100
    //             // kl_pt: Math.ceil(currentState.kl_gia/nextProps.value.matchedCommands.price)
    //         }
    //     }
    //     else return null;
    // }
    render(){
        let maCP = this.props.value.stockCode;
        let giaTC = this.props.value.referencePrice;
        let tongKhoiLuong = this.props.value.totalVolume;
        // console.log(this.props.value)
        let mua1;
        let mua1_kl;
        let mua2;
        let mua2_kl;
        let mua3;
        let mua3_kl;
        // console.log(this.props.value.buys.length)
        if(this.props.value.buys.length===3){
            mua1 = this.props.value.buys[0].price;
            mua1_kl = this.props.value.buys[0].volume;
            mua2 = this.props.value.buys[1].price;
            mua2_kl = this.props.value.buys[1].volume;
            mua3 = this.props.value.buys[2].price;
            mua3_kl = this.props.value.buys[2].volume;
        }
        else if(this.props.value.buys.length===2){
            mua1 = this.props.value.buys[0].price;
            mua1_kl = this.props.value.buys[0].volume;
            mua2 = this.props.value.buys[1].price;
            mua2_kl = this.props.value.buys[1].volume;
            mua3 = '';
            mua3_kl = '';
        }
        else if(this.props.value.buys.length===1){
            mua1 = this.props.value.buys[0].price;
            mua1_kl = this.props.value.buys[0].volume;
            mua2 = '';
            mua2_kl = '';
            mua3 = '';
            mua3_kl = '';
        }
        else{
            mua1 = '';
            mua1_kl = '';
            mua2 = '';
            mua2_kl = '';
            mua3 = '';
            mua3_kl = '';
        }
        let kl_gia='';
        let kl_kl='';
        let kl_phantram='';
        // console.log(undefined!==this.props.value.matchedCommands)
        if(null!==this.props.value.matchedCommands&&undefined!==this.props.value.matchedCommands){
            kl_gia = this.props.value.matchedCommands.price;
            kl_kl = this.props.value.matchedCommands.volume;
            kl_phantram= ((((((this.props.value.matchedCommands.price)-this.props.value.referencePrice))/this.props.value.referencePrice))*100).toFixed(2);
        }
        let ban1;
        let ban1_kl;
        let ban2;
        let ban2_kl;
        let ban3;
        let ban3_kl;
        if(this.props.value.sells.length===3){
            ban1 = this.props.value.sells[0].price;
            ban1_kl = this.props.value.sells[0].volume;
            ban2 = this.props.value.sells[1].price;
            ban2_kl = this.props.value.sells[1].volume;
            ban3 = this.props.value.sells[2].price;
            ban3_kl = this.props.value.sells[2].volume;
        }
        else if(this.props.value.sells.length===2){
            ban1 = this.props.value.sells[0].price;
            ban1_kl = this.props.value.sells[0].volume;
            ban2 = this.props.value.sells[1].price;
            ban2_kl = this.props.value.sells[1].volume;
            ban3 = '';
            ban3_kl = '';
        }
        else if(this.props.value.sells.length===1){
            ban1 = this.props.value.sells[0].price;
            ban1_kl = this.props.value.sells[0].volume;
            ban2 = '';
            ban2_kl = '';
            ban3 = '';
            ban3_kl = '';
        }
        else{
            ban1 = '';
            ban1_kl = '';
            ban2 = '';
            ban2_kl = '';
            ban3 = '';
            ban3_kl = '';
        }
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
                <KhopLenh value={kl_phantram} giaTC={giaTC} giaKhopLenh = {kl_gia}/>
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