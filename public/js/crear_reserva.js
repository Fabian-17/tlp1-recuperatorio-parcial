const formCrearReserva = document.querySelector("#formNuevaReserva")

formCrearReserva.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const fecha = document.querySelector('#fecha').value;
    const telefono = document.querySelector('#telefono').value;
    const email = document.querySelector('#email').value;
    const cantidad_personas = document.querySelector('#cantidad_personas').value;

    const reserva = {
        nombre,
        apellido,
        fecha,
        telefono,
        email,
        cantidad_personas
    }


    const response = await fetch('http://localhost:4000/api', {
        method: 'POST',
        body: JSON.stringify(reserva),
        headers: {
            'Content-Type': 'application/json' // Cuando se envían datos JSON al servidor
        }
    })

    const data = await response.json();

   
            try {
                Swal.fire({
                    icon: 'success',
                    title: 'Reserva creada',
                    text: 'La reserva se ha creado correctamente'
                })

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message
                })
            }

        });
