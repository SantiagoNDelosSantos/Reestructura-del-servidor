import ManagerMessage from '../daos/mongodb/MessagesManager.class.js';

const managerMessage = new ManagerMessage();

export const verMensajes = async (req, res) => {
    try {
        const messages = await managerMessage.verMensajes();
        res.send({ messages });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al consultar los mensajes.' });
    }
};

export const nuevoMensaje = async (req, res) => {
    try {
        const message = req.body;
        const createdMessage = await managerMessage.nuevoMensaje(message);
        const messages = await managerMessage.verMensajes();
        req.socketServer.sockets.emit('messages', messages);
        res.send({ message: createdMessage });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al crear el mensaje.' });
    }
};

export const eliminarMensaje = async (req, res) => {
    try {
        const mid = req.params.mid;
        const result = await managerMessage.eliminarMensaje(mid);
        if (!result) {
            res.status(404).json({ error: `No se encontró ningún mensaje con el ID ${mid}.` });
        } else {
            const messages = await managerMessage.verMensajes();
            req.socketServer.sockets.emit('messages', messages);
            res.send(result);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al eliminar el mensaje.' });
    }
};