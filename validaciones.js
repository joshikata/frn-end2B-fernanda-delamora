window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registroForm');
  const confirmationSection = document.getElementById('confirmationSection');
  const password = document.getElementById('owner-password');
  const passwordConfirm = document.getElementById('owner-password-confirm');
  const petSexGroup = document.getElementById('pet-sex');

  const fieldConfig = [
    {id: 'owner-name', name: 'Nombre completo', validator: value => value.trim().length >= 3, message: 'Ingrese al menos 3 caracteres.'},
    {id: 'owner-dob', name: 'Fecha de nacimiento', validator: value => {
      if (!value) return false;
      const birthDate = new Date(value);
      return birthDate < new Date();
    }, message: 'Ingrese una fecha de nacimiento válida.'},
    {id: 'owner-dni', name: 'DNI', validator: value => /^\d{7,8}$/.test(value.trim()), message: 'El DNI debe tener 7 u 8 dígitos.'},
    {id: 'owner-email', name: 'Correo electrónico', validator: value => /^\S+@\S+\.\S+$/.test(value), message: 'Ingrese un correo electrónico válido.'},
    {id: 'owner-password', name: 'Contraseña', validator: value => value.trim().length >= 6, message: 'La contraseña debe tener al menos 6 caracteres.'},
    {id: 'owner-password-confirm', name: 'Confirmar contraseña', validator: value => value.trim().length >= 6, message: 'Confirme la contraseña.'},
    {id: 'owner-phone', name: 'Teléfono', validator: value => /^\+?[0-9\s\-()]{7,20}$/.test(value.trim()), message: 'Ingrese un teléfono válido.'},
    {id: 'owner-city', name: 'Localidad', validator: value => value.trim().length > 0, message: 'Este campo es obligatorio.'},
    {id: 'owner-province', name: 'Provincia', validator: value => value.trim().length > 0, message: 'Este campo es obligatorio.'},
    {id: 'pet-name', name: 'Nombre de la mascota', validator: value => value.trim().length >= 2, message: 'Ingrese el nombre de la mascota.'},
    {id: 'pet-species', name: 'Especie', validator: value => value.trim().length > 0, message: 'Seleccione una especie.'},
    {id: 'pet-breed', name: 'Raza', validator: value => value.trim().length > 0, message: 'Ingrese la raza.'},
    {id: 'pet-dob', name: 'Fecha de nacimiento de la mascota', validator: value => {
      if (!value) return false;
      const birthDate = new Date(value);
      return birthDate < new Date();
    }, message: 'Ingrese una fecha de nacimiento válida para la mascota.'},
    {id: 'pet-color', name: 'Color', validator: value => value.trim().length > 0, message: 'Ingrese el color de la mascota.'}
  ];

  function getFieldGroup(el) {
    return el.closest('.field-group') || el.parentElement;
  }

  function markField(el, state, message) {
    const group = getFieldGroup(el);
    if (!group) return;
    group.classList.remove('campo-error', 'campo-ok');
    if (state === 'error') {
      group.classList.add('campo-error');
      el.setAttribute('aria-invalid', 'true');
      if (message) {
        el.title = message;
      }
    } else if (state === 'ok') {
      group.classList.add('campo-ok');
      el.removeAttribute('aria-invalid');
      el.title = '';
    } else {
      el.removeAttribute('aria-invalid');
      el.title = '';
    }
  }

  function validateField(field) {
    const config = fieldConfig.find(item => item.id === field.id);
    if (!config) return true;
    const value = field.value || '';
    const isValid = config.validator(value);
    if (!isValid) {
      markField(field, 'error', config.message);
      return false;
    }

    if (field.id === 'owner-password-confirm') {
      if (password.value !== value) {
        markField(field, 'error', 'Las contraseñas no coinciden.');
        markField(password, 'error', 'Las contraseñas no coinciden.');
        return false;
      }
    }

    if (field.id === 'owner-password' && passwordConfirm.value.trim().length > 0) {
      if (password.value !== passwordConfirm.value) {
        markField(field, 'error', 'Las contraseñas no coinciden.');
        markField(passwordConfirm, 'error', 'Las contraseñas no coinciden.');
        return false;
      }
    }

    markField(field, 'ok');
    return true;
  }

  function validateSex() {
    const checked = form.querySelector('input[name="pet_sex"]:checked');
    const group = petSexGroup.closest('.field-group');
    if (!group) return true;
    if (!checked) {
      group.classList.remove('campo-ok');
      group.classList.add('campo-error');
      petSexGroup.setAttribute('aria-invalid', 'true');
      return false;
    }
    group.classList.remove('campo-error');
    group.classList.add('campo-ok');
    petSexGroup.removeAttribute('aria-invalid');
    return true;
  }

  function buildConfirmation(data) {
    confirmationSection.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = 'Registro exitoso';
    const message = document.createElement('p');
    const bookingId = Math.floor(Math.random() * 900000) + 100000;
    message.textContent = `Gracias ${data.ownerName}. Su mascota ${data.petName} fue registrada correctamente. Su ID de registro es ${bookingId} y su teléfono es ${data.ownerPhone}.`;
    const details = document.createElement('p');
    details.textContent = `Recibirá una confirmación adicional en ${data.ownerEmail}.`;

    const actions = document.createElement('div');
    actions.classList.add('confirmation-actions');

    const newPetButton = document.createElement('button');
    newPetButton.type = 'button';
    newPetButton.textContent = 'Registrar otra mascota';
    newPetButton.addEventListener('click', function() {
      confirmationSection.classList.add('hidden');
      form.classList.remove('hidden');
      form.reset();
      [...form.querySelectorAll('.campo-error, .campo-ok')].forEach(el => el.classList.remove('campo-error', 'campo-ok'));
      form.scrollIntoView({behavior: 'smooth'});
    });

    const homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.classList.add('btn-secondary');
    homeLink.textContent = 'Volver al inicio';

    actions.appendChild(newPetButton);
    actions.appendChild(homeLink);
    confirmationSection.appendChild(title);
    confirmationSection.appendChild(message);
    confirmationSection.appendChild(details);
    confirmationSection.appendChild(actions);
    confirmationSection.classList.remove('hidden');
    confirmationSection.scrollIntoView({behavior: 'smooth'});
  }

  function validateForm() {
    let valid = true;
    fieldConfig.forEach(item => {
      const field = document.getElementById(item.id);
      if (!field) return;
      if (!validateField(field)) {
        valid = false;
      }
    });
    if (!validateSex()) {
      valid = false;
    }
    return valid;
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      const firstError = form.querySelector('.campo-error input, .campo-error select, .campo-error textarea, .campo-error .radio-row');
      if (firstError) {
        const focusTarget = firstError.querySelector('input, select, textarea') || firstError;
        focusTarget.focus();
        focusTarget.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
      return;
    }

    const formData = new FormData(form);
    const data = {
      ownerName: formData.get('owner_name').trim(),
      ownerEmail: formData.get('owner_email').trim(),
      ownerPhone: formData.get('owner_phone').trim(),
      petName: formData.get('pet_name').trim()
    };
    form.classList.add('hidden');
    buildConfirmation(data);
  });

  form.addEventListener('input', function(event) {
    const el = event.target;
    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'select' || el.tagName.toLowerCase() === 'textarea') {
      validateField(el);
    }
    if (el.name === 'pet_sex') {
      validateSex();
    }
  });

  [...form.querySelectorAll('input, select, textarea')].forEach(element => {
    element.addEventListener('blur', function() {
      validateField(element);
      if (element.name === 'pet_sex') validateSex();
    });
  });
});