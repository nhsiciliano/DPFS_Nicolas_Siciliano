window.addEventListener('load', function () {
    let form = document.querySelector('form.auth-form');

    // Detectar si estamos editando (generalmente la url tiene 'edit' o el form method tiene algo particular, 
    // pero aquí usaremos la presencia del input hidden oldImage o el valor del input image)

    form.addEventListener('submit', function (e) {
        let errors = [];

        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let image = document.querySelector('#image');

        // Validación Nombre
        if (name.value == '') {
            errors.push('El campo de nombre tiene que estar completo');
        } else if (name.value.length < 5) {
            errors.push('El nombre del producto debe tener al menos 5 caracteres');
        }

        // Validación Descripción
        if (description.value == '') {
            errors.push('El campo de descripción tiene que estar completo');
        } else if (description.value.length < 20) {
            errors.push('La descripción debe tener al menos 20 caracteres');
        }

        // Validación Imagen
        // Si hay un archivo seleccionado, validamos extensión.
        // Si no hay archivo:
        // - En Create: es obligatorio (error).
        // - En Edit: es opcional (no error).
        // Podemos detectar Edit buscando si existe un input con value que indique persistencia o simplemente asumiendo:
        // Si image.value está vacío y no estamos en modo edición (difícil saberlo solo con JS puro sin helpers), 
        // pero podemos asumir: Si es create, el input file es required (pero el usuario puede hackearlo).
        // Vamos a validar la extensión SIEMPRE que haya valor.

        if (image.value) {
            let fileExtension = image.value.split('.').pop().toLowerCase();
            let acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            if (!acceptedExtensions.includes(fileExtension)) {
                errors.push('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', '));
            }
        }

        // Si queremos ser estrictos con el Create y la imagen obligatoria desde JS:
        // Chequeamos si hay un input hidden con name="oldImage"
        let oldImage = document.querySelector('input[name="oldImage"]');
        if (!image.value && !oldImage) {
            // Es create y no puso imagen
            errors.push('Tienes que subir una imagen del producto');
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
