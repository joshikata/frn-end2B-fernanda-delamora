window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registroForm');
  const password = document.getElementById('owner-password');
  const passwordConfirm = document.getElementById('owner-password-confirm');
  const petSexGroup = document.getElementById('pet-sex');

  const fieldConfig = [
    {id: 'owner-name', name: 'Nombre completo', validator: value => value.trim().length >= 3, message: 'Ingrese al menos 3 caracteres.'},
    {id: 'owner-dob', name: 'Fecha de nacimiento', validator: value => value && new Date(value) <= new Date(), message: 'Ingrese una fecha de nacimiento válida.'},
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
    {id: 'pet-dob', name: 'Fecha de nacimiento de la mascota', validator: value => value && new Date(value) <= new Date(), message: 'Ingrese una fecha de nacimiento válida para la mascota.'},
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
      el.title = message;
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
    } else {
      if (field.id === 'owner-password-confirm' && password.value !== passwordConfirm.value) {
        markField(field, 'error', 'Las contraseñas no coinciden.');
        markField(password, 'error', 'Las contraseñas no coinciden.');
        return false;
      }
      if (field.id === 'owner-password' && passwordConfirm.value.trim().length > 0 && password.value !== passwordConfirm.value) {
        markField(field, 'error', 'Las contraseñas no coinciden.');
        markField(passwordConfirm, 'error', 'Las contraseñas no coinciden.');
        return false;
      }
      markField(field, 'ok');
    }
    return isValid;
  }

  function validateSex() {
    const checked = form.querySelector('input[name="pet_sex"]:checked');
    const group = petSexGroup.closest('.field-group');
    if (!checked) {
      group.classList.add('campo-error');
      group.classList.remove('campo-ok');
      petSexGroup.setAttribute('aria-invalid', 'true');
      return false;
    }
    group.classList.remove('campo-error');
    group.classList.add('campo-ok');
    petSexGroup.removeAttribute('aria-invalid');
    return true;
  }

  function validatePasswords() {
    if (password.value.trim().length < 6 || passwordConfirm.value.trim().length < 6) {
      return true; // individual validators already handle lengths
    }
    if (password.value !== passwordConfirm.value) {
      markField(password, 'error', 'Las contraseñas no coinciden.');
      markField(passwordConfirm, 'error', 'Las contraseñas no coinciden.');
      return false;
    }
    markField(password, 'ok');
    markField(passwordConfirm, 'ok');
    return true;
  }

  function validateForm() {
    let valid = true;
    fieldConfig.forEach(fieldConfigItem => {
      const field = document.getElementById(fieldConfigItem.id);
      if (!field) return;
      const fieldValid = validateField(field);
      if (!fieldValid) {
        valid = false;
      }
    });

    if (!validatePasswords()) {
      valid = false;
    }
    if (!validateSex()) {
      valid = false;
    }
    return valid;
  }

  form.addEventListener('submit', function(event) {
    if (!validateForm()) {
      event.preventDefault();
      const firstError = form.querySelector('.campo-error input, .campo-error select, .campo-error textarea, .campo-error .radio-row');
      if (firstError) {
        const target = firstError.querySelector('input, select, textarea') || firstError;
        target.focus();
      }
    }
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