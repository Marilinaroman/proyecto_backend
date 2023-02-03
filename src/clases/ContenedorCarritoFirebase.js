import admin from "firebase-admin";
import { getFirestore} from 'firebase-admin/firestore'

class ContainerCarritofirebase{
    constructor(){
        this.db = admin.firestore().collection('carrito')
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
    async newId() {
		try {
            const doc = this.db.doc()
            const timestamp = Date.now()
            const newProd = await doc.create({timestamp})
            console.log(newProd);
            const data = await this.getAll()
            const nuevo = await data.filter(e => e.timestamp == timestamp)
            const id = await nuevo.map((snap)=>{
                return snap.id
            })
            return id;
		} catch (err) {
			console.log(err);
		}
	}
	
	async getById(id) {
		try {
            const doc = this.db.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
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
			const doc = this.db.doc(`${id}`)
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
    async moreProd(id,modificacion){
        try{
            const moreData = await this.putById(id,modificacion)
            return moreData
        }catch(err){
            console.log(err);
        }
    }
    async deleteOneProd(id){
        try{
            await this.deleteById(id)
        }catch(err){
            console.log(err);
        }
    }
}

export {ContainerCarritofirebase}