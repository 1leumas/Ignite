import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

//criar a database
const database = new Database();

export const routes = [
  {
    //se o metodo for get e a url for /users, crie uma variavel users
    //e atribua a ela o retorno do metodo select da classe database
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = database.select("users");
      console.log(database.select("users"));
      return res.end(JSON.stringify(users));
    },
  },
  {
    //faca um request no body
    //e crie uma variavel user que recebe o name e o email do body
    //depois armazene na database com o metodo insert, na tabela users, o user
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, email } = req.body;

      //usuario
      const user = {
        id: randomUUID(), //gera o id com o randomUUID
        name, // nome do body
        email, //email do body
      };

      database.insert("users", user); //inserir na tabela `users` o user

      return res.writeHead(201).end(); //retornar o status 201
    },
  },
];
