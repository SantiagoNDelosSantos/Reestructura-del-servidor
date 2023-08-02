import mongoose from "mongoose";
import { messageModel } from "./models/messages.model.js"

// Importación de variables de entorno:
import { envMongoURL } from "../../config.js";

export default class ManagerMessage {

    // Conexión Mongoose:
    connection = mongoose.connect( envMongoURL);

    async nuevoMensaje(sms) {
        let result = await messageModel.create(sms);
        return result;
    };

    async verMensajes() {
        let result = await messageModel.find().lean();
        return result;
    }

    async eliminarMensaje(mid) {
        let result = await messageModel.deleteOne({_id: mid})
        return result;
    };
}