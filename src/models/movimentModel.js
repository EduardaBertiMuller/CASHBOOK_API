const { filtroAnoMes } = require("../controllers/movimentController");
const mysql = require("./mysqlConnect");

get= async (query)=>{
    sql=" SELECT * FROM moviment"
    return await  mysql.query(sql);
}

post= async (date, idUser)=>{
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

 put= async (date, idUser)=>{
     sql="UPDATE moviments SET "
     +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
     +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 remove = async (idMov, idUser)=>{
    sql="DELETE INTO moviments"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }
 /*---------1--------------*/
 CashBalance = async () => {
    input = "SELECT sum(value) AS input FROM moviment WHERE type='input'";
    output = "SELECT sum(value) AS output FROM moviment WHERE type='output'";
    const resultinput = await mysql.query(input);
    const resultoutput = await mysql.query(output);

    total =
        parseFloat(resultinput[0].input) - parseFloat(resultoutput[0].output);

    resp = null;
    if (resultinput && resultoutput) {
        resp = {
            cash_balance: total,
        };
    }
    return resp;
};
/*----------2-----------*/
io=async()=>{
    sql=`SELECT sum(value) AS input FROM moviment WHERE type='input'`;
    sql=`SELECT sum(value) AS output FROM moviment WHERE type='output'`;
    input=await mysql.query(sql);
    output=await mysql.query(sql);
    data={input: input[0].input,
          output:output[0].output
    } 
    return data;
}

/*----------3-----------*/
filtroAnoMes=async(data) =>{
    input="SELECT sum (value) AS input FROM moviment WHERE type='input' AND YEAR(date)=${data.year} AND MONTH(date) = ${data.month}";
    const resultoutput = await mysql.query(output);
    output = "SELECT sum (value) AS output FROM moviment WHERE type='output' AND YEAR(date)=${data.year} AND MONTH(date) = ${data.month}";
    const resultinput = await mysql.query(input);
    let resp = null;
    if(resultinput && resultoutput){
        resp = {input: resultinput[0].input,
                output: resultoutput[0].output,
            };
        }
        return resp;
};

/*----------4-----------*/
anoMesFinal = async (data) => {
    input = `SELECT sum(value) AS input FROM moviment WHERE type='input' AND YEAR(date) BETWEEN ${data.year} 
    AND ${data.finalyear} AND MONTH(date) BETWEEN ${data.month} AND ${data.finalmonth}`;
    const resultinput = await mysql.query(input);
    output = `SELECT sum(value) AS output FROM moviment WHERE type='output' AND YEAR(date) BETWEEN ${data.year} AND ${data.finalyear} 
    AND MONTH(date) BETWEEN ${data.month} AND ${data.finalmonth}`;
    const resultoutput = await mysql.query(output);
    let resp = null;
    if (resultinput && resultoutput) {
        resp = {input: resultinput[0].input,
                output: resultoutput[0].output,
            };
    }return resp;
};
/*-------5-----------*/
anoMes=async(data) => {
    sql=`SELECT*FROM moviment WHERE YEAR(date)=${data.year} 
    AND MONTH(date) = ${data.month}`;
    const result = await mysql.query(sql);
    if(result){
        return result;
    }
};

module.exports= {get,post, put, remove,CashBalance,io,filtroAnoMes,anoMesFinal,anoMes};