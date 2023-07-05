const ctrlReservas = {};
const Reserva = require('../models/Reserva');


ctrlReservas.renderListaReservas = (req, res) => {
    res.render('index')
}

ctrlReservas.renderFormNuevaReserva = (req, res) => {
    res.render('crear-reserva');
}

ctrlReservas.renderFormEditarReserva = (req, res) => {
    const { id } = req.params;
    res.render('editar-reserva', { id })
}

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrlReservas.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: {
                estado: true
            }
        });

        return res.json(reservas);
    } catch (error) {
        console.log('Error al obtener las reservas', error);
        return res.status(500).json({
            message: 'Error al obtener las reservas'
        })
    }
}
// Obtener una reserva

ctrlReservas.obtenerReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reserva = await Reserva.findOne({
            where: {
                id,
                estado: true
            }
        });

        if (!reserva) {
            throw ({
                status: 404,
                message: 'No existe la reserva'
            })
        }
    
        return res.json(reserva);

    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}

// Crear una reserva
ctrlReservas.crearReserva = async (req, res) => {
    const {
        nombre,
        apellido,
        fecha,
        cantidad_personas,
        telefono,
        email
    } = req.body; // JSON.stringify(reserva);

    try {
        // Se crea una nueva instancia de reserva
        const nuevaReserva = new Reserva({
            nombre,
            apellido,
            fecha,
            cantidad_personas,
            telefono,
            email,
            codigo: new Date().getTime()
        });

        // Se guarda en la BD
        await nuevaReserva.save();

        return res.status(201).json({ message: 'Reserva creada con éxito' })
    } catch (error) {
        console.log('Error al crear la reserva', error);
        return res.status(500).json({ message: 'Error al crear la reserva' })
    }
}
// Actualizar una reserva

ctrlReservas.actualizarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByPk(id);

        console.log(reserva);

        if (!reserva) {
            return res.status(500).json(
                {
                    message:"Error"
                })
        }

        await reserva.update(req.body)
        return res.json({
            message: 'Reserva actualizada exitosamente'
        });
    } catch (error) {
        console.log('Error al actualizar la reserva', error);
        return res.status(500).json({
            message: 'Error al actualizar la reserva'
        })
    }
}
// Eliminar una reserva de forma lógica

ctrlReservas.eliminarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const reservaEliminada = await Reserva.update({
            estado: false
        }, {
            where: {
                id,
                estado: true
            }
        });

        if (!reservaEliminada) {
            throw ({
                status: 400,
                message: 'No se pudo eliminar la reserva'
            })
        }

         return res.json({
         message: 'Reserva eliminada correctamente',
         reservaEliminada
     });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || 'Error interno del servidor');
    }
}


module.exports = ctrlReservas;