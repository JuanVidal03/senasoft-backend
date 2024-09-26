import mailer  from 'nodemailer'
import crypto from 'crypto';
import { UserModel } from '../models/user.model.js';
export const enviarCorreoInvitacion = async (req, res) => {
    const { email, idUser } = req.body;
    try {
        const token = crypto.randomBytes(20).toString('hex');
        const user = await UserModel.findById(idUser);
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        user.invitationToken = token; 
        user.invitationExpires = Date.now() + 3600000;
        await user.save();
        const trasporte = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mainOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Correo de invitación`,
            text: `Tu amigo te ha invitado a ser parte del cambio. 
            Haz clic en el siguiente enlace para registrarte:
            http://localhost:8080/api/user/invitation/${token}
            `
        };
        trasporte.sendMail(mainOptions, (error, info) => {
            if (error) return res.json({ error });
            return res.json({ msg: "Verificación enviada correctamente" });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error, msg: 'Hubo un error interno' });
    }
};
export const verificarInvitacion = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await UserModel.findOne({
            invitationToken: token,
            invitationExpires: { $gt: Date.now() } 
        });
        if (!user) {
            return res.status(400).json({ msg: 'Token de invitación no válido o expirado' });
        }
        user.invitationToken = undefined;
        user.invitationExpires = undefined;
        user.puntos = user.puntos + 1;  
        await user.save();
        return res.status(200).json({ msg: 'Invitación verificada correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error al verificar la invitación' });
    }
};