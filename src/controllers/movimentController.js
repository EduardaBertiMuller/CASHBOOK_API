const movimentoModel = require('../models/movimentModel');

exports.post=async(data,idUser)=>{
    return await movimentoModel.post(data, idUser);
}
exports.get=async()=>{
    return await movimentoModel.get();   
}

exports.put=async(req,res)=>{
    return await movimentoModel.put(data, idUser);
}
exports.delete=async(id)=>{
    return await movimentoModel.delete(id,idUser);
}
/*-------1------*/ 
exports.CashBalance = async () => {
    return await movimentoModel.CashBalance();
};

/*-----2--------*/
exports.io=async()=>{
    return await movimentoModel.io();
};

/*-----3--------*/
exports.filtroAnoMes=async(data)=>{
    return await movimentoModel.filtroAnoMes(data);
};

/*-------4------*/ 
exports.anoMesFinal=async(data)=>{
    return await movimentoModel.anoMesFinal(data);
};

/*-----5------*/
exports.movYearMonth=async(data)=>{
    return await movimentoModel.anoMes(data);
}; 