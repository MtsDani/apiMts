import  express  from "express";
import cors from "cors";
import { executeQuery } from "./config/database.js";

const app = express();
//Middleware Jason e CORS
app.use(express.json());
app.use(cors());
//Rotas
//Lista os dados dos clientes
app.get("/clientes", function(req, res) {

    let filtro = [];
    let ssql = "SELECT CDCLIFOR, IDCLI, IDFOR, IDTRAN, NMCLIFOR, IDMAIL FROM  CADCLIFOR WHERE CDCLIFOR <> ''";

    if (req.query.descricao) {
      ssql += "AND NMCLIFOR LIKE?"
      filtro.push("%" + req.query.descricao + "%");
    }

    executeQuery(ssql, filtro, function(err, result) {
       if (err) {
        res.status(500).json(err);
       } else {
        res.status(200).json(result);
       }
    });
});

app.get("/produtos", function(req, res) {

  let filtro = [];
  let ssql = "SELECT CDPRO, DEPRO, VLVENDA, VLVENDA2 FROM  CADPRO WHERE CDPRO <> ''";

  if (req.query.descricao) {
    ssql += "AND DEPRO LIKE?"
    filtro.push("%" + req.query.descricao + "%");
  }
//Retirada dos comentarios dos testes de api
  executeQuery(ssql, filtro, function(err, result) {
     if (err) {
      res.status(500).json(err);
     } else {
      res.status(200).json(result);
     }
  });
});

app.get("/Ordens", function(req, res) {

  let filtro = [];
  let ssql = "SELECT CDFIL, NUCONS, DTEMISSAO, DTFECHA, CDCLIFOR, IDSIT FROM  VNDPEDOS WHERE NUCONS <> ''";

  if (req.query.descricao) {
    ssql += "AND CDCLIFOR LIKE?"
    filtro.push("%" + req.query.descricao + "%");
  }
//Retirada dos comentarios dos testes de api
  executeQuery(ssql, filtro, function(err, result) {
     if (err) {
      res.status(500).json(err);
     } else {
      res.status(200).json(result);
     }
  });
});



app.post("/clientes", function(req, res) {

  let ssql = 'INSERT INTO CADCLIFOR(CDCLIFOR, IDCLI, IDFOR, IDTRAN, NMCLIFOR, IDMAIL) VALUES(?,?,?,?,?,?) ';
     executeQuery(ssql, [ req.body.CDCLIFOR, req.body.IDCLI, req.body.IDFOR, req.body.IDTRAN, req.body.NMCLIFOR, req.body.IDMAIL],
     function(err, result) {
     if (err) {
      res.status(500).json(err);
     } else {
      res.status(201).json({result});
     }
  });
});



app.listen(3000, function() {
  console.log("Servidor Metasis no ar")
});