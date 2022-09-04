import {check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'
import { emailRegistro } from '../helpers/emails.js'

const formularioLogin = (req, res)=>{
    res.render('auth/login', {
        pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req, res)=>{
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}

const registrar = async (req, res) => {
    //Extraer los datos del req
    const {nombre, email, password} = req.body

    //validacion
    await check('nombre').notEmpty().withMessage('Nombre obligatorio').run(req)
    await check('email').isEmail().withMessage('Eso no es un Email').run(req)
    await check('password').isLength({min: 6}).withMessage('Password debe ser al menos de 6 caracteres').run(req)
    await check('repetirPassword').equals(password).withMessage('Los Passwords no son iguales').run(req)

    let resultado = validationResult(req)
    //console.log(req.body);
    //res.json(resultado.array())
    
    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        //errores
        return res.render('auth/registro', {
                pagina: 'Crear Cuenta',
                errores: resultado.array(),
                usuario: {
                    nombre: nombre,
                    email: email
                }
        })
    }
    
    //verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({where: {email: email} })
    if(existeUsuario){
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'Usuario ya registrado'}],
            usuario: {
                nombre: nombre,
                email: email
            }
        })
    }

    // Crea usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    }) //res.json(usuario)

    //envia email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Hemos enviado un email de confirmación, revisa tu correo'
    })
}

//Funcion que comprueba una cuenta
const confirmar = (req, res, next) => {
    const {token} = req.params
    //Verificar si el token es valido
    //Confirmar la cuenta
    next()
}

const formularioOlvidePassword = (req, res)=>{
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices'
    })
}


export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePassword
}