import {check, validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'

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

const formularioOlvidePassword = (req, res)=>{
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raices'
    })
}

const registrar = async (req, res) => {
    //validacion
    await check('nombre').notEmpty().withMessage('Nombre obligatorio').run(req)

    let resultado = validationResult(req)
    res.json(resultado.array())
    //const usuario = await Usuario.create(req.body)
    //res.json(usuario)
}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}