const formEditar = document.querySelector('#formEditar');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const telefono = document.querySelector('#telefono');
const email = document.querySelector('#email');
const fecha = document.querySelector('#fecha');
const cantidad_personas = document.querySelector('#cantidad_personas');

const reservaId = formEditar.getAttribute('data-id');


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(`http://localhost:4000/api/${reservaId}`)
    const data = await response.json();

    nombre.value = data.nombre;
    apellido.value = data.apellido;
    telefono.value = data.telefono;
    email.value = data.email;
    fecha.value = dayjs(data.fecha).format('YYYY-MM-DD HH:mm');
    cantidad_personas.value = data.cantidad_personas;
})



formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();


    const formData = {
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        telefono: e.target.telefono.value,
        email: e.target.email.value,
        fecha: e.target.fecha.value,
        cantidad_personas: e.target.cantidad_personas.value,
    }

    try {
        const resp = await fetch(`http://localhost:4000/api/${reservaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (resp.status !== 200) {
            throw ({
                message: 'Error al editar la reserva'
            })
        }

        const data = await resp.json();

        Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.message,
            timer: 2000,
        })
    }
});