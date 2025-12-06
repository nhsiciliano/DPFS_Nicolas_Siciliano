window.addEventListener('load', function () {
    let form = document.querySelector('form.auth-form');

    form.addEventListener('submit', function (e) {
        let errors = [];

        let email = document.querySelector('#email');
        let password = document.querySelector('#password');

        if (email.value == '') {
            errors.push('El campo de email tiene que estar completo');
        } else {
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                errors.push('Debes escribir un formato de correo válido');
            }
        }

        if (password.value == '') {
            errors.push('El campo de contraseña tiene que estar completo');
        }

        if (errors.length > 0) {
            e.preventDefault();

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
