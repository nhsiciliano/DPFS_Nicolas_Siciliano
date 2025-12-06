window.addEventListener('load', function () {
    let form = document.querySelector('form.auth-form');

    form.addEventListener('submit', function (e) {
        let errors = [];

        let firstName = document.querySelector('#firstName');
        let lastName = document.querySelector('#lastName');
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');
        let image = document.querySelector('#image');

        // Limpiar errores previos si los hubiera (para evitar duplicados visuales rápida implementación)
        // En una implementación más robusta, borraríamos elementos específicos de error.

        if (firstName.value == '') {
            errors.push('El campo de nombre tiene que estar completo');
        } else if (firstName.value.length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        if (lastName.value == '') {
            errors.push('El campo de apellido tiene que estar completo');
        } else if (lastName.value.length < 2) {
            errors.push('El apellido debe tener al menos 2 caracteres');
        }

        if (email.value == '') {
            errors.push('El campo de email tiene que estar completo');
        } else {
            // Regex simple para email
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                errors.push('Debes escribir un formato de correo válido');
            }
        }

        if (password.value == '') {
            errors.push('El campo de contraseña tiene que estar completo');
        } else if (password.value.length < 6) { // Coincidiendo con validación back (min 6)
            errors.push('La contraseña debe tener al menos 6 caracteres');
        } else {
            let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (!passwordRegex.test(password.value)) {
                errors.push('La contraseña debe tener letras y números');
            }
        }

        if (image.value) {
            let fileExtension = image.value.split('.').pop().toLowerCase();
            let acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            if (!acceptedExtensions.includes(fileExtension)) {
                errors.push('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', '));
            }
        }

        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('div.errores ul');
            // Si no existe el contenedor de errores, lo creamos dinámicamente o usamos alert por ahora
            // Lo ideal es tener un div en la vista. Vamos a asumir que lo agregaremos o usaremos alert si es muy invasivo modificar todo.
            // Para mejor UX, vamos a inyectar un div de errores al principio del form si no existe.

            let errorContainer = document.querySelector('.front-end-errors');
            if (!errorContainer) {
                errorContainer = document.createElement('div');
                errorContainer.classList.add('front-end-errors');
                errorContainer.style.color = 'red';
                errorContainer.style.marginBottom = '15px';
                form.insertBefore(errorContainer, form.firstChild);
            }

            errorContainer.innerHTML = '';
            let ul = document.createElement('ul');
            for (let i = 0; i < errors.length; i++) {
                let li = document.createElement('li');
                li.innerText = errors[i];
                ul.appendChild(li);
            }
            errorContainer.appendChild(ul);
        }
    });
});
