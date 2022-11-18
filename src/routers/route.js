const express = require('express');
const userController=require("../controllers/userController");
const movimentoController=require("../controllers/movimentController");
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).send("<h1>CASHBOOK API</h1>");
})

router.get('/user', async (req, res, next)=> {
    user= await userController.get();
    res.status(200).send(user);
});

router.post('/user/login', async (req, res, next)=> {
    user= await userController.login(req.body);
    res.status(200).send(user);
});

router.post('/user/logout', async (req, res, next)=> {
    user= await userController.login(req.headers['x-access-token']);
    res.status(200).send(user);
});

router.get('/moviments', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.get();
           resp = Object.assign({}, resp, auth);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})
/*
router.get('/moviments', async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
           resp= await movimentoController.get(Buffer.from(req.query.query, 'base64').toString('utf-8'));
           resp = Object.assign({}, resp, auth);
        }else{ 
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)
})*/

router.post('/mov',async (req, res, next)=>{
    auth= userController.verifyJWT(req.headers['x-access-token'])
    if(auth.idUser){
        if(req.headers.iduser==auth.idUser){
            resp= await  movimentoController.post(req.body, req.headers.iduser);
            resp = Object.assign({}, resp, auth);
        }else{
            resp= {"status":"null", auth}
        }
    }else{
        resp= {"status":"null", auth}
    }
    res.status(200).send(resp)   
})

router.put('/mov', async (req, res, next)=>{
    movimento=movimentoController.put(req.body, req.headers.idUser);
})

router.delete('/movimento', async (req, res, next)=>{
    movimento=movimentoController.delete(req.headers.idUser);
})
/*-------1-----------*/
router.get("/moviments/cash-balance", async (req, res) => {
    auth = userController.verifyJWT(req.headers["x-access-token"]);
    if (auth.idUser) {
        if (req.headers.iduser == auth.idUser) {
            resp = await movimentoController.CashBalance(
                req.body,
                req.headers.iduser
            );
        } else {
            resp = { status: "null", auth };
        }
    } else {
        resp = { status: "null", auth };
    }
    res.status(200).send(resp);
});

/*-------2-----------*/
router.get("/moviments/io", async(req, res)=>{
    auth = userController.verifyJWT(req.headers["x-access-token"]);
    if(auth.idUser){
      if(req.headers.iduser == auth.idUser){
        resp = await movimentoController.io();
        resp = Object.assign({}, resp, auth);
      }else{
        resp={status: "null", auth};
      }
    }else{
      resp={status: "null", auth};
    }
    res.status(200).send(resp);
});

/*-------3----------*/
router.get("moviments/io/:year/:month",async(req, res)=>{
    auth=await userController.verifyJWT(req.headers["x-acess-token"]);
    if(auth.idUser){
      if(req.headers.idUser == auth.idUser){
         resp=await movimentoController.filtroAnoMes(req.params);
      }else{
        resp={status:"null", auth};
      }
    }else{
      resp={status:"null", auth};
    }resp.status(200).send(resp);
});

/*-----4---------*/
router.get("/moviments/io/:year/:month /:month/:year", async (req, res) => {
        auth = await userController.verifyJWT(req.headers["x-access-token"]);
        if (auth.idUser) {
            if (req.headers.iduser == auth.idUser){
                resp = await movimentoController.anoMesFinal(req.params);
            }else{
                resp = { status: "null", auth };
            }
        }else{
            resp={ status: "null", auth };
        }res.status(200).send(resp);
    }
);

/*-------5-------*/
router.get("/moviments/:year/:month", async(req,res)=>{
    auth = await userController.verifyJWT(req.headers["x-access-token"]);
    if(auth.idUser){
        if(req.headers.iduser == auth.idUser){
            resp=await movimentoController.anoMes(req.params);
        }else{
            resp={status:"null", auth};
        }
    }else{
        resp={status: "null", auth};
    }res.status(200).send(resp);
});
module.exports = router;