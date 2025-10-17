@register

Feature: Registro de usuario
  Como nuevo usuario quiero registrarme en la plataforma
  Para poder iniciar sesión y solicitar un crédito

  Background:
    Given el usuario se encuentra en la página de registro

  Scenario: Registro exitoso con todos los datos válidos
    When el usuario ingresa "Juán Perez" en el campo nombre completo
    And el usuario ingresa "<email>" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje "Bienvenid@"
    And se debe mostrar el inicio de la página

  Scenario: Intento de registro con campos vacíos
    When el usuario no ingresa ningún dato
    And hace click en el botón de registrarse
    Then no permite enviar registro con campos vacíos

  Scenario: Intento de registro con email inválido
    When el usuario ingresa "Juán Perez" en el campo nombre completo
    And el usuario ingresa "correo-invalido" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje "El formato del correo electrónico no es válido"

  Scenario: Intento de registro con contraseñas no coincidentes
    When el usuario ingresa "Juán Perez" en el campo nombre completo
    And  el usuario ingresa "correo@correo.com" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "Password456!" en el campo confirmar contraseña
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje "La contraseñas deben ser iguales"

  Scenario: Intento de registro con email ya registrado
    When el usuario ingresa "Juán Perez" en el campo nombre completo
    And el usuario ingresa "<email>" en el campo email
    And el usuario ingresa "<password>" en el campo contraseña
    And el usuario confirma "<password>" en el campo confirmar contraseña
    And hace click en el botón de registrarse
    Then se debe mostrar un mensaje "Email already registered"