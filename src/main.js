const express = require('express');
const nodemailer = require('nodemailer');
const config = require('./config/config.js')

const app = express();

const port = config.PORT;

app.use(express.json())

app.post('/send-email', (req, res) => {

    const { email, name, type, date } = req.body;

    const transporter = nodemailer.createTransport(`smtps://${config.EMAIL}:${config.PASSWORD}@smtp.gmail.com:465`); 

    const content = `
    <table style="width: 600px; padding: 10px; margin: 0 auto; border-collapse: collapse; background-color: #00e093; text-align: center">
        <tr style= "width: 100%"> 
            <td style="width: 100%; background-color: #00e093">
                <div style="width: 100%;color: #0c5190; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                    <h2 style="color: #0c5190; margin: 0 0 7px">Hola ${name}</h2>
                    <p style="margin: 2px; font-size: 15px">
                    <h4>No olvides tu proxima cita</h4>
            <p>Tienes una cita de ${type} en la fecha ${date}</p>
        <br>
                        No olvides que tambien puedes consultar:</p>
                    <ul style="font-size: 15px;  margin: 10px 0">
                        <li>Planes alimenticios</li>
                        <li>Actividades saludables en tu zona</li>
                        <li>Especialistas medicos</li>
                        <li>Consultar tu IMC</li>
                        <li>Y actualizar tus registros medicos</li>
                    </ul>
                    <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">

                    </div>
                    <div style="width: 100%; text-align: left">
                        <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #0c5190" href="https://www.saludapp.com" target="_blank">>Ir a SaludApp</a>	
                    </div>
                    <p style="color: #232323; font-size: 12px; text-align: left;margin: 30px 0 0">Salud App</p>
                </div>
            </td>
        </tr>
    </table>
    `

    const mailOptions = {
        from: "Salud y bienestar <salud.app.alertas@gmail.com>",
        to: email,
        subject: `${name} se acerca tu proxima cita`,
        html: content
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if( error ) {
            res.status(500).send(error.message)
        }

        console.log("Email enviado")
        res.status(200).json(req.body)
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})