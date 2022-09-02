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
    await Usuario.create({
        nombre,
        email,
        password,
        token: 123
    }) //res.json(usuario)
}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}