require('mongoose');
const Ord = require('../models/order.js');
const Cust = require('../models/customer.js');
const Prod = require('../models/prodduct.js');



const addOrder = async(ordId, customerId, date,detail,total,street,isConfirmed ) =>{

    let existOrder = await Ord.findOne({ordId:ordId});
    if (!existOrder){

        const order = new Ord({
            ordId: ordId,
            customerId:customerId,
            date:date,
            detail:detail,
            total:total,
            street:street,
            isConfirmed:isConfirmed
        })
        let newOrd = await order.save();
        console.log("Orden nueva");
        console.log( newOrd);
        return { newOrd }; 
    }else
    {
        return(false);
    };

};


const getOrder = async(Id) => {
    const order = await Ord.findById(Id);
    return order;
};

const getAllOrders = async(limit,offset) =>{
    const results = await Ord.find({}).limit(limit).skip(offset);
    return results;
};

const editOrder = async(order) =>{
    const result = await Ord.findByIdAndUpdate(order.id,order,{new:true});
    return result;
};

const deleteOrder = async(id) =>{
    const result = await Ord.findByIdAndDelete(id);
    return result;
};

module.exports = {getAllOrders, getOrder, deleteOrder, editOrder, addOrder};