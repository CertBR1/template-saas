import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-guard.guard';
import { UsuarioModule } from './usuario/usuario.module';
import { CredencialModule } from './credencial/credencial.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { StripeHandlerService } from './pagamento/stripe.service';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { AssinaturaModule } from './assinatura/assinatura.module';
import { PlanoModule } from './plano/plano.module';
import configs from './stripe.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    // StripeModule.forRootAsync(StripeModule, {
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     apiKey: configService.get<string>('STRIPE_SECRET_KEY'),
    //     webhookConfig: {
    //       stripeSecrets: {
    //         account: configService.get<string>('STRIPE_WEBHOOK_SECRET'),
    //         accountTest: configService.get<string>('STRIPE_WEBHOOK_SECRET_TEST'),
    //       },
    //       requestBodyProperty: 'rawBody',
    //     },

    //   }),
    // }),
    AuthModule,
    UsuarioModule,
    CredencialModule,
    PagamentoModule,
    AssinaturaModule,
    PlanoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
