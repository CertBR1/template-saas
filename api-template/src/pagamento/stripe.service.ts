import { InjectStripeClient, StripeWebhookHandler, StripeWebhookService } from '@golevelup/nestjs-stripe';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Stripe } from 'stripe';
@Injectable()
export class StripeHandlerService {
    constructor(
        @InjectStripeClient()
        private stripeClient: Stripe,
        @Inject(forwardRef(() => UsuarioService))
        private usuarioService: UsuarioService
    ) { }

    // @StripeWebhookHandler('payment_intent.succeeded')
    // async handleWebhook(body: Stripe.PaymentIntentSucceededEvent) {

    //     try {
    //         console.log(body);
    //         console.log('body payment_intent.succeeded:', body.id);
    //         const idUsuarioStripe = body.data.object.customer;
    //         const usuarioStripe = await this.stripeClient.customers.retrieve(idUsuarioStripe.toString()) as Stripe.Customer;
    //         const usuarioSistema = await this.usuarioService.findOne(usuarioStripe.metadata.id);
    //         // const subscription = await this.stripeClient.subscriptions.retrieve(body.data.object.subscription);
    //         console.log('usuario do sistema:', usuarioSistema.nome, 'comprou o plano:', usuarioSistema.assinatura.status);
    //     } catch (error) {

    //     }
    // }

    // O Correto é invoice.paid
    @StripeWebhookHandler('invoice.payment_succeeded')
    async handleInvoicePaid(body: any) {
        // console.log('body invoice.paid:', body);
        const usuarioStripe = await this.stripeClient.customers.retrieve(body.data.object.customer) as Stripe.Customer;
        const subscription = await this.stripeClient.subscriptions.retrieve(body.data.object.subscription);
        const assinatura = await this.usuarioService.ativarAssinatura(
            usuarioStripe.metadata.id,
            subscription.current_period_start,
            subscription.current_period_end
        )

        return 'ok';
    }


    async criarUsuarioStripe(usuario: { id: string, nome: string, email: string }): Promise<Stripe.Response<Stripe.Customer>> {
        try {
            const customer = await this.stripeClient.customers.create({
                name: usuario.nome,
                email: usuario.email,
                metadata: {
                    id: usuario.id
                }
            })
            return customer
        } catch (error) {
            console.error(error);
            throw error
        }
    }


    async buscarPlanos(): Promise<Stripe.ApiList<Stripe.Price>> {
        try {
            const prices = await this.stripeClient.prices.list({
                active: true
            })
            return prices
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async buscarLinkPagamento() {
        try {
            const links = await this.stripeClient.paymentLinks.list()
            return links
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    async criarSessaoCheckout(priceId: string, customerId: string): Promise<Stripe.Response<Stripe.Checkout.Session>> {
        try {
            const checkout = await this.stripeClient.checkout.sessions.create({
                line_items: [
                    {
                        price: priceId,
                        quantity: 1
                    }
                ],
                mode: 'subscription',
                customer: customerId,
                payment_method_types: ['card'],
                success_url: process.env.SUCESSO_URL,
                cancel_url: process.env.ERRO_URL

            })
            return checkout
        } catch (error) {
            console.error(error);
            throw error
        }
    }


}
