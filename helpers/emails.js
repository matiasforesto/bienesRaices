import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const emailRegistro = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, 
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS 
        }
    })

    const { email, nombre, token } = datos

    //enviar el email
    await transport.sendMail({
        from: 'BienesRaices',
        to: email,
        subject: 'Confirma tu Cuenta en BienesRaices',
        text: 'Confirma tu Cuenta en BienesRAices',
        html:  `
            <p>Hola ${nombre}, comprueba tu cuenta en BienesRaices</p>
            <p> Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">
                    Confirma cuenta
                </a>  
            </p>
            <p>
                Si tu no creaste esta cuenta, puedes ignorar el mensaje
            </p>
        `
    })
}

const emailOlvidePassword = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, 
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS 
        }
    })

    const { email, nombre, token } = datos

    //enviar el email
    await transport.sendMail({
        from: 'BienesRaices',
        to: email,
        subject: 'Reestablece tu password en BienesRaices',
        text: 'Reestablece tu password en BienesRAices',
        html:  `
            <p>Hola ${nombre}, has solicitado reestablecer tu password en BienesRaices</p>
            <p> Sigue el siguiente enlace para generar un password nuevo:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">
                    Reestablecer password
                </a>  
            </p>
            <p>
                Si tu no solicitaste el cambio de password, puedes ignorar el mensaje
            </p>
        `
    })
}

export{
    emailRegistro,
    emailOlvidePassword
}