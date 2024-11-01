import * as process from 'process';

const configs = () => ({
    STRIPE_CONFIG: {
        apiKey: process.env.STRIPE_SECRET_KEY,
        webhookConfig: {
            requestBodyProperty: 'rawBody',
            stripeSecrets: {
                account: process.env.STRIPE_WEBHOOK_SECRET,
                accountTest: process.env.STRIPE_WEBHOOK_SECRET_TEST
            },
        },
    }
})

export default configs