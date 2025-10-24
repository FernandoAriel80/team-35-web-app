@login
Feature: Servicio de login
    Como usuario ya registrado quiero iniciar sesion para ingresar al sistema

    Background:
        Given el usuario esta previamente registrado y en la página de login

    Scenario: Intento de ingreso con credenciales válidas
        When el usuario ingresa "<email>" en el campo email del login
        And el usuario ingresa "<password>" en el campo contraseña del login
        And hace click en el boton de iniciar sesión
        Then se debe mostrar una notificación "Bienvenid@"

    Scenario: Intento de ingreso con campos vacíos
        When el usuario no ingresa ningún dato en el login
        Then algún campo vacio debe ser inválido
        And se mantiene en la página de login

    Scenario: Intento de ingreso con campo vacio de email
	    When el usuario ingresa "" en el campo email del login
        And el usuario ingresa "Tester" en el campo contraseña del login
	    Then algún campo vacio debe ser inválido
        And se mantiene en la página de login
	  
 	Scenario: Intento de ingreso con campo vacio de contraseña
	    When el usuario ingresa "correo@correo.com" en el campo email del login
        And el usuario ingresa "" en el campo contraseña del login
	    Then algún campo vacio debe ser inválido
        And se mantiene en la página de login

    Scenario: Intento de ingreso con email incorrecto
        When el usuario ingresa "correo-incorrecto@correo.com" en el campo email del login
        And el usuario ingresa "<password>" en el campo contraseña del login
        And hace click en el boton de iniciar sesión
        Then se debe mostrar una notificación "Email is incorrect"

    Scenario: Intento de ingreso con clave incorrecta
        When el usuario ingresa "<email>" en el campo email del login
        And el usuario ingresa "Password456!" en el campo contraseña del login
        And hace click en el boton de iniciar sesión
        Then se debe mostrar una notificación "Password is incorrect"