import nodeMailer from "nodemailer";

export const emailSender = async(email, token) => {
    try{
        const resetTokens = {}; // { token: email }

        resetTokens[token] = email;

        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: "noel.maldonado.1908@gmail.com",
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            },
            family: 4,
            tls: {
                rejectUnauthorized: false
            },
        });

        const resetLink = `http://localhost:5173/recuperar-contraseña?token=${token}`;

        await transporter.sendMail({
            from: '"Raices de vida" <noel.maldonado.1908@gmail.com>',
            to: email,
            subject: "Recupera tu contraseña",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div style="background-color: #4CAF50; color: white; padding: 15px; text-align: center;">
                        <h2>Recuperación de contraseña</h2>
                    </div>
                    <div style="padding: 20px; color: #333;">
                        <p>Hola,</p>
                        <p>Has solicitado recuperar tu contraseña. Para continuar, haz clic en el botón de abajo:</p>
                        <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Restablecer contraseña
                        </a>
                        </div>
                        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
                        <p style="font-size: 12px; color: #777;">Este enlace expirará en 1 hora por motivos de seguridad.</p>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
                        © 2026 Raíces de vida
                    </div>
                    </div>
                </div>
            `
        });

        return true;
    } catch(error){
        console.log(error);
        return res.status(500).json({error: "Error al enviar el email"});
    }
};
