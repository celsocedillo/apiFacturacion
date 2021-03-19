"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express from 'express';
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
//app.listen(config.puertoAPI);
app.listen(3000);
console.log("Servidor iniciado puerto 3000");
console.log("Iniciado");
