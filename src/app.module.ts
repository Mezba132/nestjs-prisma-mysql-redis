import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './api/category/category.module';
import { AttributesModule } from './api/attributes/attributes.module';
import { ProductsModule } from './api/products/products.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      envFilePath: ['.env'],
    }),
    CategoryModule,
    AttributesModule,
    ProductsModule,
  ],
})
export class AppModule {}
