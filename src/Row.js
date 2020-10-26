import React from 'react';
import MuaBan from './Tile';
import {MaCP, GiaTC, TongCP, KhopLenh, KhoiLuong} from './Tile';
export default class Row extends React.Component{
    render(){
        //Xử lí dữ liệu trước khi gửi dữ liệu vào các ô để render
        let stockCode = this.props.value.stockCode;
        let referencePrice = this.props.value.referencePrice;
        let totalVolume = this.props.value.totalVolume;
        let buyPrice_1='';
        let buyVolume_1='';
        let buyPrice_2='';
        let buyVolume_2='';
        let buyPrice_3='';
        let buyVolume_3='';
        // console.log(this.props.value.buys.length)
        try{
            // Xử lí trường hợp mảng buys trả về chỉ có 1 hoặc 2 phần tử
            buyPrice_1 = this.props.value.buys[0].price.toFixed(1);
            buyVolume_1 = this.props.value.buys[0].volume;
            buyPrice_2 = this.props.value.buys[1].price.toFixed(1);
            buyVolume_2 = this.props.value.buys[1].volume;
            buyPrice_3 = this.props.value.buys[2].price.toFixed(1);
            buyVolume_3 = this.props.value.buys[2].volume;
        }
        catch(err){}

        let matchedCommandPrice='';
        let matchedCommandVolume='';
        let matchedCommandPercent='';
        try{
            matchedCommandPrice = this.props.value.matchedCommands.price;
            matchedCommandVolume = this.props.value.matchedCommands.volume;
            matchedCommandPercent= ((((((this.props.value.matchedCommands.price)-this.props.value.referencePrice))/this.props.value.referencePrice))*100).toFixed(2);
        }catch(err){}

        let sellPrice_1='';
        let sellVolume_1='';
        let sellPrice_2='';
        let sellVolume_2='';
        let sellPrice_3='';
        let sellVolume_3='';
        try{
            // Xử lí trường hợp mảng sells trả về chỉ có 1 hoặc 2 phần tử
            sellPrice_1 = this.props.value.sells[0].price.toFixed(1);
            sellVolume_1 = this.props.value.sells[0].volume;
            sellPrice_2 = this.props.value.sells[1].price.toFixed(1);
            sellVolume_2 = this.props.value.sells[1].volume;
            sellPrice_3 = this.props.value.sells[2].price.toFixed(1);
            sellVolume_3 = this.props.value.sells[2].volume;
        }catch(err){}
        return(
            <tr>
                <MaCP value={stockCode} referencePrice={referencePrice} matchedCommandPrice={matchedCommandPrice}/>
                <GiaTC value={referencePrice}/>
                <TongCP value={totalVolume}/>
                <MuaBan referencePrice={referencePrice} price={buyPrice_3}/>
                <KhoiLuong referencePrice={referencePrice} price={buyPrice_3} volume={buyVolume_3}/>
                <MuaBan referencePrice={referencePrice} price={buyPrice_2}/>
                <KhoiLuong referencePrice={referencePrice} price={buyPrice_2} volume={buyVolume_2}/>
                <MuaBan referencePrice={referencePrice} price={buyPrice_1}/>
                <KhoiLuong referencePrice={referencePrice} price={buyPrice_1} volume={buyVolume_1}/>
                <KhopLenh value={matchedCommandPrice} referencePrice={referencePrice} matchedCommandPrice = {matchedCommandPrice}/>
                <KhopLenh value={matchedCommandVolume} referencePrice={referencePrice} matchedCommandPrice = {matchedCommandPrice}/>
                <KhopLenh value={matchedCommandPercent} referencePrice={referencePrice} matchedCommandPrice = {matchedCommandPrice}/>
                <MuaBan referencePrice={referencePrice} price={sellPrice_1}/>
                <KhoiLuong referencePrice={referencePrice} price={sellPrice_1} volume={sellVolume_1}/>
                <MuaBan referencePrice={referencePrice} price={sellPrice_2}/>
                <KhoiLuong referencePrice={referencePrice} price={sellPrice_2} volume={sellVolume_2}/>
                <MuaBan referencePrice={referencePrice} price={sellPrice_3}/>
                <KhoiLuong referencePrice={referencePrice} price={sellPrice_3} volume={sellVolume_3}/>
            </tr>
        )
    }
}