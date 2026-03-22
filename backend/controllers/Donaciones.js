import pkg from 'mercadopago';
const { MercadoPagoConfig, Preference } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});

export const donar = async (req, res) => {
    const { monto, nombre } = req.body;

    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: [
                    {
                        title: `Donación de ${nombre || 'Anónimo'}`,
                        quantity: 1,
                        unit_price: Number(monto),
                        currency_id: 'MXN',
                    },
                ],
                back_urls: {
                    success: 'http://localhost:5173/gracias?status=success',
                    failure: 'http://localhost:5173/gracias?status=failure',
                    pending: 'http://localhost:5173/gracias?status=pending',
                },
                // auto_return: 'approved',
            },
        });

        res.json({ checkoutUrl: result.sandbox_init_point });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando preferencia' });
    }
};