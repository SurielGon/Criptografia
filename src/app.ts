import express from 'express';
import * as CryptoJS from 'crypto-js';

export class App{
	public server: express.Application;

	constructor(){
		this.server = express();
		this.middleware();
		this.router();
	}

	private middleware(){
		this.server.use(express.json());
	}

	private router(){
		this.server.post('/', (req, res, next) => {
			try {
				const privateKey = {
					128: 'NcRfUjXn2r5u8x/A'
				};
				const message = req.body.message as string;
				const response: {[x: string]: string} = {};
				if(message){
					// encriptar
					// CryptoJS supporta AES-128, AES-192 e AES-256. Depende do tamanho da chave.
					const msgEncriptada = CryptoJS.AES.encrypt(req.body.message, privateKey[128]).toString();
					response.msgEncriptada = msgEncriptada;
					// decriptar
					const bytes = CryptoJS.AES.decrypt(msgEncriptada, privateKey[128]);
					const msgDecriptada = bytes.toString(CryptoJS.enc.Utf8);
					response.msgDecriptada = msgDecriptada;
					res.json(response);
				}else{
					throw new Error('Envie uma mensagem para ser criptografada');
				}
			} catch (err) {
				next(err);
			}
		});
	}
}
