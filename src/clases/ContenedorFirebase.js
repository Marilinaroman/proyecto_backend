import admin from "firebase-admin";
import { getFirestore} from 'firebase-admin/firestore'
import {readFileSync} from "fs";
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(readFileSync(path.join(__dirname , "../config/firebaseKey.json")));
admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://proyectobackend2023.firebaseio.com"
})

console.log('base conectada');

class Containerfirebase{
    constructor(){
        this.db = admin.firestore().collection('productos')
    }
    async save(obj) {
		try {
            const doc = this.db.doc()
            const newProd = await doc.create({...obj})
            return newProd
		} catch (err) {
			console.log(err);
		}
	}
	
	async getById(id){
		try {
            const prod = this.db.doc(id)
            const item = await getDoc(prod)
            const response = item.data()
            console.log(response);
            return response
		} catch (err) {
			console.log(err);
		}
	}
    async getByGenero(genero) {
		try {
            const data = await this.db.get()
            const docs = data.docs

            const productosFiltrados = docs.filter((doc)=> genero == doc.data().genero)
            const response = productosFiltrados.map((doc)=>({
                id: doc.id,
                nombre:doc.data().nombre,
                price:doc.data().price,
                genero: doc.data().genero,
                stock:doc.data().stock,
                timestamp:doc.data().timestamp,
                url:doc.data().url
            }))
            return response
		} catch (err) {
			console.log(err);
		}
	}
	
	async getAll() {
		try {
			const data = await this.db.get()
            const docs = data.docs

            const response = docs.map((doc)=>({
                id: doc.id,
                nombre:doc.data().nombre,
                price:doc.data().price,
                genero: doc.data().genero,
                stock:doc.data().stock,
                timestamp:doc.data().timestamp,
                url:doc.data().url
            }))
            return response
        } catch (err) {
			console.log(err);
		}
	}
	
	async deleteById(id) {
		try {
			const doc = this.db.doc.id
            const item = await doc.delete()
            const data= this.getAll()
            return data
		} catch (err) {
			console.log(err);
		}
	}

    async putById(id,modificacion){
        try{
            const doc = this.db.doc(`${id}`)
            const item = await doc.update({...modificacion})
            const prod = await this.getById(id)
            return prod
            
        }catch(err){
            console.log(err);
        }
    }
}

export {Containerfirebase}