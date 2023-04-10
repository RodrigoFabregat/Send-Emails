document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputIssue = document.querySelector('#asunto');
    const inputMessage = document.querySelector('#mensaje');
    const form = document.querySelector('#f-form');
    const btnSubmit = document.querySelector('#f-form button[type="submit"]');
    const btnReset = document.querySelector('#f-form button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validate);
    inputIssue.addEventListener('input', validate);
    inputMessage.addEventListener('input', validate);

    form.addEventListener('submit', sendEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetForm();
    })

    function sendEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetForm();

            // Crear una alerta
            const alertaSuccess = document.createElement('P');
            alertaSuccess.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaSuccess.textContent = 'Successfully sent';

            form.appendChild(alertaSuccess);

            setTimeout(() => {
                alertaSuccess.remove(); 
            }, 3000);
        }, 3000);
    }

    function validate(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`The field ${e.target.id} is required`, e.target.parentElement);
            email[e.target.name] = '';
            CheckEmail();
            return;
        }

        if(e.target.id === 'email' && !ValidateEmail(e.target.value)) {
            mostrarAlerta('The email address is invalid.', e.target.parentElement);
            email[e.target.name] = '';
            CheckEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        CheckEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        
        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
       
        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function ValidateEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function CheckEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetForm() {
        // reiniciar el objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        form.reset();
        CheckEmail();
    }
});