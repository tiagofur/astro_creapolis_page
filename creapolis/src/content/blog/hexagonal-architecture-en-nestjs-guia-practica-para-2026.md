---
title: "Hexagonal Architecture en NestJS: Guía práctica para 2026"
description: "En el mundo del desarrollo de software moderno, la elección de una arquitectura adecuada puede marcar la diferencia entre un proyecto que escala con facilidad y uno que se…"
pubDate: "2026-01-14"
author: "tiagofur"
tags: []
categories: ["Backend", "Backend - NestJs"]
slug: "hexagonal-architecture-en-nestjs-guia-practica-para-2026"
originalUrl: "https://creapolis.dev/hexagonal-architecture-en-nestjs-guia-practica-para-2026/"
draft: false
---

## Introducción a la Arquitectura Hexagonal

En el mundo del desarrollo de software moderno, la elección de una arquitectura adecuada puede marcar la diferencia entre un proyecto que escala con facilidad y uno que se convierte en un pesado caos técnico. La arquitectura hexagonal, también conocida como Ports & Adapters, se ha consolidado como una de los patrones arquitectónicos más robustos para aplicaciones empresariales.

Esta guía práctica te llevará desde los conceptos fundamentales hasta la implementación completa de una arquitectura hexagonal en NestJS, el framework de Node.js basado en TypeScript que ha ganado enorme popularidad por su enfoque estructurado y su ecosistema rico. Veremos cómo aplicar este patrón para crear aplicaciones más resilientes, testables y mantenibles, listas para los desafíos de 2026.

## Prerrequisitos

Para obtener el máximo valor de este artículo, se recomienda tener:

- Conocimientos básicos de TypeScript y JavaScript

- Experiencia previa con NestJS (fundamentos de decoradores, módulos, providers)

- Entendimiento básico de principios SOLID

- Familiaridad con conceptos de programación orientada a objetos

- Node.js y npm instalados en tu entorno

Si eres nuevo en NestJS, te sugiero familiarizarte primero con sus conceptos básicos antes de sumergirte en los patrones avanzados de arquitectura hexagonal.

## ¿Qué es la Arquitectura Hexagonal?

La arquitectura hexagonal, propuesta originalmente por Alistair Cockburn, es un enfoque de diseño de software que pone el dominio de la aplicación en el centro del sistema. El resto de los componentes se organizan alrededor de este núcleo, conectados mediante puertos (interfaces) y adaptadores (implementaciones).

### Los Pilares Fundamentales

**1. El Core del Dominio**

El corazón de la aplicación contiene la lógica de negocio pura, sin dependencias externas. Aquí residen las entidades, servicios de dominio y reglas de negocio que definen lo que realmente hace tu aplicación.

**2. Puertos (Ports)**

Son interfaces que definen cómo el sistema interactúa con el mundo exterior. Los puertos abstraen las capacidades del sistema, permitiendo que diferentes implementaciones puedan conectarse sin afectar el núcleo.

**3. Adaptadores (Adapters)**

Son las implementaciones concretas de los puertos. Se conectan con el mundo real: bases de datos, APIs externas, sistemas de mensajería, etc. Los adaptadores son fácilmente reemplazables, lo que facilita los tests y los cambios tecnológicos.

**4. Inversión de Dependencias**

El núcleo de la aplicación no depende de las tecnologías externas. En su lugar, las tecnologías externas dependen del núcleo a través de la inversión de dependencias.

## Beneficios de la Arquitectura Hexagonal

### 1. \*\*Alta Testabilidad\*\*

Al aislar la lógica de negocio de las dependencias externas, podemos probar el 100% de la aplicación sin necesidad de bases de datos reales, APIs externas o sistemas complejos.

### 2. \*\*Mantenibilidad\*\*

Los cambios en las tecnologías externas (cambiar de MongoDB a PostgreSQL, migrar de una API REST a GraphQL) no afectan el núcleo del negocio.

### 3. \*\*Escalabilidad\*\*

El sistema está diseñado para crecer. Cada componente está claramente delimitado, permitiendo que diferentes equipos puedan trabajar en distintas áreas sin conflictos.

### 4. \*\*Flexibilidad\*\*

Los adaptadores permiten que la misma lógica de negocio pueda exponerse a través de diferentes interfaces (REST, GraphQL, CLI, eventos en tiempo real, etc.).

### 5. \*\*Enfoque en el Dominio\*\*

Los desarrolladores se concentran en el valor real del negocio, no en las complejidades tecnológicas.

## Estructura Base de un Proyecto Hexagonal en NestJS

Vamos a crear una estructura de proyecto que siga los principios hexagonales:

```
src/
├── domain/
│   ├── entities/
│   ├── repositories/
│   ├── services/
│   └── value-objects/
├── application/
│   ├── use-cases/
│   └── dto/
├── infrastructure/
│   ├── adapters/
│   │   ├── primary/
│   │   └── secondary/
│   └── config/
└── presentation/
    ├── controllers/
    └── decorators/
```

## Implementación Práctica: Sistema de E-commerce

Para demostrar estos conceptos, construiremos un sistema de e-commerce con las siguientes funcionalidades:

- Gestión de productos

- Carrito de compras

- Procesamiento de pedidos

- Gestión de inventario

### 1. Entidades del Dominio

Las entidades son objetos que representan conceptos fundamentales de nuestro negocio. Estas no dependen de ninguna implementación externa.

```
// src/domain/entities/product.entity.ts
export class Product {
  constructor(
    public readonly id: ProductId,
    public readonly name: string,
    public readonly description: string,
    public readonly price: Money,
    public readonly stock: number,
    public readonly category: string,
    public readonly isActive: boolean = true
  ) {}

  static create(
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string
  ): Product {
    return new Product(
      ProductId.generate(),
      name,
      description,
      Money.from(price),
      stock,
      category
    );
  }

  updateStock(quantity: number): Product {
    const newStock = this.stock + quantity;
    if (newStock < 0) {
      throw new Error('Stock insuficiente');
    }
    return new Product(
      this.id,
      this.name,
      this.description,
      this.price,
      newStock,
      this.category,
      this.isActive
    );
  }

  deactivate(): Product {
    return new Product(
      this.id,
      this.name,
      this.description,
      this.price,
      this.stock,
      this.category,
      false
    );
  }

  activate(): Product {
    return new Product(
      this.id,
      this.name,
      this.description,
      this.price,
      this.stock,
      this.category,
      true
    );
  }
}

// Value Objects
export class ProductId {
  private constructor(public readonly value: string) {}

  static generate(): ProductId {
    return new ProductId(`product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }

  static from(id: string): ProductId {
    return new ProductId(id);
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }
}

export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string = 'USD'
  ) {
    if (amount < 0) {
      throw new Error('El monto no puede ser negativo');
    }
  }

  static from(amount: number): Money {
    return new Money(amount);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Las monedas no coinciden');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Las monedas no coinciden');
    }
    if (this.amount < other.amount) {
      throw new Error('Fondos insuficientes');
    }
    return new Money(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  format(): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: this.currency
    }).format(this.amount);
  }
}
```

### 2. Servicios de Dominio

Los servicios de dominio contienen la lógica de negocio compleja que no pertenece a ninguna entidad específica.

```
// src/domain/services/product.service.ts
import { Product } from '../entities/product.entity';

export interface IProductDomainService {
  checkStockAvailability(product: Product, quantity: number): boolean;
  calculateTotal(products: Array<{ product: Product; quantity: number }>): number;
  applyCategoryDiscount(products: Product[], category: string, discountRate: number): Product[];
}

export class ProductDomainService implements IProductDomainService {
  private categoryDiscounts: Map<string, number> = new Map();

  constructor() {
    this.categoryDiscounts.set('electronics', 0.1);
    this.categoryDiscounts.set('clothing', 0.15);
    this.categoryDiscounts.set('books', 0.05);
  }

  checkStockAvailability(product: Product, quantity: number): boolean {
    return product.stock >= quantity;
  }

  calculateTotal(products: Array<{ product: Product; quantity: number }>): number {
    return products.reduce((total, { product, quantity }) => {
      return total + (product.price.amount * quantity);
    }, 0);
  }

  applyCategoryDiscount(products: Product[], category: string, discountRate: number): Product[] {
    return products.map(product => {
      if (product.category === category && discountRate > 0) {
        const discountedPrice = product.price.multiply(1 - discountRate);
        return new Product(
          product.id,
          product.name,
          product.description,
          discountedPrice,
          product.stock,
          product.category,
          product.isActive
        );
      }
      return product;
    });
  }

  addCategoryDiscount(category: string, discountRate: number): void {
    if (discountRate < 0 || discountRate > 1) {
      throw new Error('La tasa de descuento debe estar entre 0 y 1');
    }
    this.categoryDiscounts.set(category, discountRate);
  }

  getDiscountRate(category: string): number {
    return this.categoryDiscounts.get(category) || 0;
  }
}
```

### 3. Interfaces y Contratos (Puertos)

Definimos los contratos que el dominio espera para interactuar con el mundo exterior.

```
// src/domain/repositories/product.repository.ts
import { Product } from '../entities/product.entity';
import { ProductId } from '../entities/product.entity';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: ProductId): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
  updateStock(id: ProductId, quantity: number): Promise<Product>;
  deactivate(id: ProductId): Promise<void>;
  activate(id: ProductId): Promise<void>;
  delete(id: ProductId): Promise<void>;
}

export interface IUnitOfWork {
  productRepository: IProductRepository;
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
}

// Domain Events
export interface IDomainEvent {
  getAggregateId(): string;
  getOccurredOn(): Date;
  getEventType(): string;
}

export interface IDomainEventPublisher {
  publish(event: IDomainEvent): Promise<void>;
  publishAll(events: IDomainEvent[]): Promise<void>;
}
```

### 4. Casos de Uso (Aplicación)

Los casos de uso orquestan las operaciones del dominio para satisfacer los requisitos del negocio.

```
// src/application/use-cases/create-product.use-case.ts
import { IProductRepository } from '../domain/repositories/product.repository';
import { ProductDomainService, IProductDomainService } from '../domain/services/product.service';
import { Product } from '../domain/entities/product.entity';

export interface CreateProductCommand {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productDomainService: IProductDomainService
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    // Validar lógica de negocio
    if (command.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }

    if (command.price <= 0) {
      throw new Error('El precio debe ser mayor que cero');
    }

    // Crear la entidad del dominio
    const product = Product.create(
      command.name,
      command.description,
      command.price,
      command.stock,
      command.category
    );

    // Guardar a través del repositorio
    return await this.productRepository.save(product);
  }
}

// src/application/use-cases/process-order.use-case.ts
import { IProductRepository, IUnitOfWork } from '../domain/repositories/product.repository';
import { ProductDomainService, IProductDomainService } from '../domain/services/product.service';
import { Order } from '../domain/entities/order.entity';
import { OrderItem } from '../domain/entities/order.entity';
import { Product } from '../domain/entities/product.entity';

export interface OrderItemDto {
  productId: string;
  quantity: number;
}

export interface ProcessOrderCommand {
  userId: string;
  items: OrderItemDto[];
  shippingAddress: string;
}

export class ProcessOrderUseCase {
  constructor(
    private readonly unitOfWork: IUnitOfWork,
    private readonly productDomainService: IProductDomainService
  ) {}

  async execute(command: ProcessOrderCommand): Promise<Order> {
    await this.unitOfWork.beginTransaction();

    try {
      const orderItems: OrderItem[] = [];
      let totalAmount = 0;

      for (const itemDto of command.items) {
        const product = await this.unitOfWork.productRepository.findById(
          ProductId.from(itemDto.productId)
        );

        if (!product) {
          throw new Error(`Producto no encontrado: ${itemDto.productId}`);
        }

        if (!this.productDomainService.checkStockAvailability(product, itemDto.quantity)) {
          throw new Error(`Stock insuficiente para el producto: ${product.name}`);
        }

        const orderItem = OrderItem.create(
          product.id,
          product.name,
          product.price,
          itemDto.quantity
        );

        orderItems.push(orderItem);
        totalAmount += product.price.amount * itemDto.quantity;
      }

      const order = Order.create(
        command.userId,
        orderItems,
        totalAmount,
        command.shippingAddress
      );

      // Actualizar stock
      for (const itemDto of command.items) {
        await this.unitOfWork.productRepository.updateStock(
          ProductId.from(itemDto.productId),
          -itemDto.quantity
        );
      }

      await this.unitOfWork.commitTransaction();
      return order;

    } catch (error) {
      await this.unitOfWork.rollbackTransaction();
      throw error;
    }
  }
}
```

### 5. Adaptadores Secundarios (Implementación Externa)

Estos adaptadores conectan el dominio con tecnologías externas como bases de datos, APIs, etc.

```
// src/infrastructure/adapters/secondary/product.repository.mongodb.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductId } from '../../../domain/entities/product.entity';
import { IProductRepository } from '../../../domain/repositories/product.repository';
import { ProductDocument, Product as MongooseProduct } from './schemas/product.schema';

@Injectable()
export class MongoProductRepository implements IProductRepository {
  constructor(
    @InjectModel(MongooseProduct.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  async save(product: Product): Promise<Product> {
    const existing = await this.productModel.findOne({ id: product.id.value });

    if (existing) {
      existing.name = product.name;
      existing.description = product.description;
      existing.price = product.price.amount;
      existing.stock = product.stock;
      existing.category = product.category;
      existing.isActive = product.isActive;
      await existing.save();
      return product;
    }

    const createdProduct = new this.productModel({
      id: product.id.value,
      name: product.name,
      description: product.description,
      price: product.price.amount,
      stock: product.stock,
      category: product.category,
      isActive: product.isActive
    });

    await createdProduct.save();
    return product;
  }

  async findById(id: ProductId): Promise<Product | null> {
    const document = await this.productModel.findOne({ id: id.value, isActive: true });
    return document ? this.toDomain(document) : null;
  }

  async findAll(): Promise<Product[]> {
    const documents = await this.productModel.find({ isActive: true });
    return documents.map(doc => this.toDomain(doc));
  }

  async findByCategory(category: string): Promise<Product[]> {
    const documents = await this.productModel.find({
      category,
      isActive: true
    });
    return documents.map(doc => this.toDomain(doc));
  }

  async updateStock(id: ProductId, quantity: number): Promise<Product> {
    const document = await this.productModel.findOneAndUpdate(
      { id: id.value },
      { $inc: { stock: quantity } },
      { new: true }
    );

    if (!document) {
      throw new Error(`Producto no encontrado: ${id.value}`);
    }

    return this.toDomain(document);
  }

  async deactivate(id: ProductId): Promise<void> {
    await this.productModel.updateOne(
      { id: id.value },
      { isActive: false }
    );
  }

  async activate(id: ProductId): Promise<void> {
    await this.productModel.updateOne(
      { id: id.value },
      { isActive: true }
    );
  }

  async delete(id: ProductId): Promise<void> {
    await this.productModel.deleteOne({ id: id.value });
  }

  private toDomain(document: ProductDocument): Product {
    return new Product(
      ProductId.from(document.id),
      document.name,
      document.description,
      Money.from(document.price),
      document.stock,
      document.category,
      document.isActive
    );
  }
}
```

```
// src/infrastructure/adapters/secondary/rabbitmq.publisher.ts
import { Injectable } from '@nestjs/common';
import { IDomainEvent, IDomainEventPublisher } from '../../../domain/repositories/product.repository';
import { AmqpConnection } from '@golevelup/natsjs';

@Injectable()
export class RabbitMQEventPublisher implements IDomainEventPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(event: IDomainEvent): Promise<void> {
    await this.amqpConnection.publish('events', event.getEventType(), event);
  }

  async publishAll(events: IDomainEvent[]): Promise<void> {
    const promises = events.map(event => this.publish(event));
    await Promise.all(promises);
  }
}
```

### 6. Adaptadores Primarios (API Externa)

Estos adaptadores exponen el dominio a través de interfaces como REST, GraphQL, etc.

```
// src/presentation/controllers/product.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { ProcessOrderUseCase } from '../../application/use-cases/process-order.use-case';
import { CreateProductCommand, ProcessOrderCommand } from '../../application/use-cases';
import { Product } from '../../domain/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly processOrderUseCase: ProcessOrderUseCase
  ) {}

  @Post()
  async create(@Body() command: CreateProductCommand) {
    return await this.createProductUseCase.execute(command);
  }

  @Get()
  async findAll() {
    // Inyectar el repositorio aquí o a través de un servicio
    return { message: 'Implementación pendiente' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { message: 'Implementación pendiente' };
  }

  @Put(':id/stock')
  async updateStock(@Param('id') id: string, @Body() body: { quantity: number }) {
    return { message: 'Implementación pendiente' };
  }

  @Post('process-order')
  async processOrder(@Body() command: ProcessOrderCommand) {
    return await this.processOrderUseCase.execute(command);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return { message: 'Implementación pendiente' };
  }
}
```

### 7. Módulos y Configuración

Ahora configuramos los módulos de NestJS siguiendo los principios hexagonales.

```
// src/infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/natsjs';
import { MongoProductRepository } from './adapters/secondary/product.repository.mongodb';
import { RabbitMQEventPublisher } from './adapters/secondary/rabbitmq.publisher';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'),
    RabbitMQModule.forRoot('amqp://localhost')
  ],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: MongoProductRepository
    },
    {
      provide: 'IDomainEventPublisher',
      useClass: RabbitMQEventPublisher
    }
  ],
  exports: [
    'IProductRepository',
    'IDomainEventPublisher'
  ]
})
export class InfrastructureModule {}
```

```
// src/application/application.module.ts
import { Module } from '@nestjs/common';
import { ProductDomainService } from '../domain/services/product.service';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { ProcessOrderUseCase } from './use-cases/process-order.use-case';

@Module({
  providers: [
    ProductDomainService,
    CreateProductUseCase,
    ProcessOrderUseCase
  ],
  exports: [
    CreateProductUseCase,
    ProcessOrderUseCase
  ]
})
export class ApplicationModule {}
```

```
// src/presentation/presentation.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';

@Module({
  controllers: [ProductController]
})
export class PresentationModule {}
```

```
// src/src.module.ts
import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    PresentationModule
  ]
})
export class AppModule {}
```

### 8. Unit of Work Pattern

Para garantizar la consistencia de las operaciones transaccionales:

```
// src/infrastructure/adapters/secondary/mongo.unit-of-work.ts
import { Injectable } from '@nestjs/common';
import { IUnitOfWork } from '../../domain/repositories/product.repository';
import { MongoProductRepository } from './product.repository.mongodb';

@Injectable()
export class MongoUnitOfWork implements IUnitOfWork {
  private transactionSession: any = null;

  constructor(
    private readonly productRepository: MongoProductRepository
  ) {}

  get productRepository(): MongoProductRepository {
    return this.productRepository;
  }

  async beginTransaction(): Promise<void> {
    this.transactionSession = await this.productRepository.productModel.startSession();
    this.transactionSession.startTransaction();
  }

  async commitTransaction(): Promise<void> {
    if (this.transactionSession) {
      await this.transactionSession.commitTransaction();
      await this.transactionSession.endSession();
      this.transactionSession = null;
    }
  }

  async rollbackTransaction(): Promise<void> {
    if (this.transactionSession) {
      await this.transactionSession.abortTransaction();
      await this.transactionSession.endSession();
      this.transactionSession = null;
    }
  }
}
```

### 9. Testing con Mocks

Una de las mayores ventajas de la arquitectura hexagonal es la facilidad para testing:

```
// __tests__/unit/domain/product.service.test.ts
import { ProductDomainService } from '../../src/domain/services/product.service';
import { Product } from '../../src/domain/entities/product.entity';
import { ProductId, Money } from '../../src/domain/entities/product.entity';

describe('ProductDomainService', () => {
  let service: ProductDomainService;

  beforeEach(() => {
    service = new ProductDomainService();
  });

  describe('checkStockAvailability', () => {
    it('debe devolver true cuando hay suficiente stock', () => {
      const product = Product.create(
        'Laptop Pro',
        'Laptop de alto rendimiento',
        1200,
        10,
        'electronics'
      );

      const result = service.checkStockAvailability(product, 5);

      expect(result).toBe(true);
    });

    it('debe devolver false cuando no hay suficiente stock', () => {
      const product = Product.create(
        'Laptop Pro',
        'Laptop de alto rendimiento',
        1200,
        2,
        'electronics'
      );

      const result = service.checkStockAvailability(product, 5);

      expect(result).toBe(false);
    });
  });

  describe('calculateTotal', () => {
    it('debe calcular correctamente el total de productos', () => {
      const product1 = Product.create('Producto 1', 'Descripción', 100, 10, 'category');
      const product2 = Product.create('Producto 2', 'Descripción', 200, 5, 'category');

      const result = service.calculateTotal([
        { product: product1, quantity: 2 },
        { product: product2, quantity: 1 }
      ]);

      expect(result).toBe(400);
    });
  });
});
```

```
// __tests__/integration/use-cases/create-product.use-case.test.ts
import { CreateProductUseCase } from '../../src/application/use-cases/create-product.use-case';
import { MockProductRepository } from '../../__tests__/mocks/product.repository.mock';
import { ProductDomainService } from '../../src/domain/services/product.service';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let mockProductRepository: MockProductRepository;

  beforeEach(() => {
    mockProductRepository = new MockProductRepository();
    useCase = new CreateProductUseCase(
      mockProductRepository,
      new ProductDomainService()
    );
  });

  it('debe crear un producto exitosamente', async () => {
    const command = {
      name: 'Laptop Pro',
      description: 'Laptop de alto rendimiento',
      price: 1200,
      stock: 10,
      category: 'electronics'
    };

    const result = await useCase.execute(command);

    expect(result).toBeInstanceOf(Product);
    expect(result.name).toBe(command.name);
    expect(result.price.amount).toBe(command.price);
    expect(result.stock).toBe(command.stock);
  });

  it('debe lanzar error cuando el precio es negativo', async () => {
    const command = {
      name: 'Producto Inválido',
      description: 'Descripción',
      price: -100,
      stock: 10,
      category: 'electronics'
    };

    await expect(useCase.execute(command)).rejects.toThrow('El precio debe ser mayor que cero');
  });

  it('debe lanzar error cuando el stock es negativo', async () => {
    const command = {
      name: 'Producto Inválido',
      description: 'Descripción',
      price: 100,
      stock: -5,
      category: 'electronics'
    };

    await expect(useCase.execute(command)).rejects.toThrow('El stock no puede ser negativo');
  });
});
```

### 10. Manejo de Errores Excepcionalidades

Implementemos un manejo robusto de errores específicos del dominio:

```
// src/domain/errors/domain.errors.ts
export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InsufficientStockError extends DomainError {
  constructor(productId: string, requested: number, available: number) {
    super(`Stock insuficiente para el producto ${productId}. Solicitado: ${requested}, Disponible: ${available}`);
  }
}

export class ProductNotFoundError extends DomainError {
  constructor(productId: string) {
    super(`Producto no encontrado: ${productId}`);
  }
}

export class InvalidOrderAmountError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class PaymentFailedError extends DomainError {
  constructor(transactionId: string, reason: string) {
    super(`Pago fallido para transacción ${transactionId}: ${reason}`);
  }
}
```

```
// src/application/use-cases/process-order.use-case.ts
import {
  InsufficientStockError,
  ProductNotFoundError,
  InvalidOrderAmountError
} from '../../domain/errors/domain.errors';

// ... (código existente)

  async execute(command: ProcessOrderCommand): Promise<Order> {
    await this.unitOfWork.beginTransaction();

    try {
      const orderItems: OrderItem[] = [];
      let totalAmount = 0;

      for (const itemDto of command.items) {
        const product = await this.unitOfWork.productRepository.findById(
          ProductId.from(itemDto.productId)
        );

        if (!product) {
          throw new ProductNotFoundError(itemDto.productId);
        }

        if (!this.productDomainService.checkStockAvailability(product, itemDto.quantity)) {
          throw new InsufficientStockError(
            itemDto.productId,
            itemDto.quantity,
            product.stock
          );
        }

        const orderItem = OrderItem.create(
          product.id,
          product.name,
          product.price,
          itemDto.quantity
        );

        orderItems.push(orderItem);
        totalAmount += product.price.amount * itemDto.quantity;
      }

      if (command.items.length === 0) {
        throw new InvalidOrderAmountError('El pedido debe contener al menos un producto');
      }

      if (totalAmount <= 0) {
        throw new InvalidOrderAmountError('El monto total del pedido debe ser mayor que cero');
      }

      const order = Order.create(
        command.userId,
        orderItems,
        totalAmount,
        command.shippingAddress
      );

      // Actualizar stock
      for (const itemDto of command.items) {
        await this.unitOfWork.productRepository.updateStock(
          ProductId.from(itemDto.productId),
          -itemDto.quantity
        );
      }

      await this.unitOfWork.commitTransaction();
      return order;

    } catch (error) {
      await this.unitOfWork.rollbackTransaction();

      if (error instanceof DomainError) {
        throw error;
      }

      throw new Error(`Error al procesar el pedido: ${error.message}`);
    }
  }
```

### 11. Eventos de Dominio

Implementemos el patrón de eventos de dominio para desacoplar componentes:

```
// src/domain/events/product-created.event.ts
import { IDomainEvent } from '../repositories/product.repository';

export class ProductCreatedEvent implements IDomainEvent {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly category: string
  ) {}

  getAggregateId(): string {
    return this.productId;
  }

  getOccurredOn(): Date {
    return new Date();
  }

  getEventType(): string {
    return 'ProductCreatedEvent';
  }
}

// src/domain/events/product-updated.event.ts
export class ProductUpdatedEvent implements IDomainEvent {
  constructor(
    public readonly productId: string,
    public readonly changes: {
      name?: string;
      price?: number;
      stock?: number;
      category?: string;
    }
  ) {}

  getAggregateId(): string {
    return this.productId;
  }

  getOccurredOn(): Date {
    return new Date();
  }

  getEventType(): string {
    return 'ProductUpdatedEvent';
  }
}
```

```
// src/application/use-cases/create-product.use-case.ts
import { ProductCreatedEvent } from '../domain/events/product-created.event';
import { IDomainEventPublisher } from '../domain/repositories/product.repository';

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productDomainService: IProductDomainService,
    private readonly eventPublisher: IDomainEventPublisher
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    // ... validaciones existentes

    const product = Product.create(
      command.name,
      command.description,
      command.price,
      command.stock,
      command.category
    );

    const savedProduct = await this.productRepository.save(product);

    // Publicar evento
    const event = new ProductCreatedEvent(
      savedProduct.id.value,
      savedProduct.name,
      savedProduct.price.amount,
      savedProduct.stock,
      savedProduct.category
    );

    await this.eventPublisher.publish(event);

    return savedProduct;
  }
}
```

### 12. Decoradores y Pipes

Implementemos validaciones avanzadas con NestJS decorators:

```
// src/presentation/validators/create-product.validator.ts
import { IsString, IsNumber, IsPositive, IsNotEmpty, validateOrReject } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateProductCommand } from '../../application/use-cases';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseInt(value))
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}

export function validateCreateProductCommand(command: CreateProductCommand): Promise<CreateProductCommand> {
  const dto = new CreateProductDto();
  Object.assign(dto, command);
  return validateOrReject(dto).then(() => command);
}
```

```
// src/presentation/controllers/product.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { CreateProductCommand } from '../../application/use-cases';
import { validateCreateProductCommand } from '../validators/create-product.validator';
import { Product } from '../../domain/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() command: CreateProductCommand) {
    const validatedCommand = await validateCreateProductCommand(command);
    return await this.createProductUseCase.execute(validatedCommand);
  }

  // ... otros endpoints
}
```

## Preguntas Frecuentes (FAQ)

### 1. ¿Cuándo debería usar arquitectura hexagonal en lugar de arquitectura limpia (Clean Architecture)?

La arquitectura hexagonal es ideal para:

- Aplicaciones empresariales complejas con muchos requisitos de persistencia y notificación

- Sistemas que necesitan ser altamente testables

- Proyectos donde la tecnología externa puede cambiar

- Aplicaciones que requieren múltiples interfaces de usuario/APIs

La arquitectura limpia es más adecuada para:

- Aplicaciones más pequeñas o medianas

- Proyectos con equipos pequeños

- Cuando no se necesita la complejidad completa de los adaptadores

- Aplicaciones web tradicionales con menos requisitos de integración

### 2. ¿Cómo manejo las dependencias cíclicas en NestJS con arquitectura hexagonal?

Las dependencias cíclicas se evitan naturalmente con la arquitectura hexagonal porque:

1. Los dominios no dependen de infraestructura

2. Los casos de uso dependen solo de dominio y repositorios

3. Los controladores dependen solo de casos de uso

4. Los repositorios implementados dependen solo de la base de datos

Si encuentras dependencias cíclicas, revisa si:

- Estás inyectando un servicio de infraestructura en el dominio

- Estás rompiendo la separación de capas

- Necesitas mover alguna dependencia a otra capa

### 3. ¿Es demasiado complejo para pequeños proyectos?

Para proyectos pequeños o MVPs, puede ser excesivo. Pero considera:

- El costo técnico acumulado del "tech debt" a largo plazo

- La facilidad de testing y mantenimiento

- La escalabilidad futura

- La separación de responsabilidades

Una regla general: si el proyecto crecerá más allá de 3 meses de desarrollo, vale la pena invertir en una arquitectura sólida.

### 4. ¿Cómo integro servicios externos de terceros como Stripe o PayPal?

Los servicios de terceros se integran a través de adaptadores secundarios:

```
// src/infrastructure/adapters/secondary/payment.adapter.stripe.ts
import { Injectable } from '@nestjs/common';
import { IDomainEventPublisher } from '../../domain/repositories/product.repository';

@Injectable()
export class StripePaymentAdapter implements IDomainEventPublisher {
  private stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  async publish(event: IDomainEvent): Promise<void> {
    if (event.getEventType() === 'PaymentRequiredEvent') {
      // Lógica de pago con Stripe
      await this.stripe.paymentIntents.create({
        amount: event.amount,
        currency: 'usd',
        payment_method: event.paymentMethodId,
        description: event.description
      });
    }
  }

  async publishAll(events: IDomainEvent[]): Promise<void> {
    // Implementación para múltiples eventos
  }
}
```

### 5. ¿Cómo manejo migraciones de base de datos con esta arquitectura?

Las migraciones son responsabilidad de la capa de infraestructura:

```
// src/infrastructure/migrations/001-create-products-table.ts
export const up = async (queryRunner: QueryRunner): Promise<void> => {
  await queryRunner.createTable(
    new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'price',
          type: 'decimal',
          isNullable: false
        },
        // ... otras columnas
      ]
    })
  );
};

export const down = async (queryRunner: QueryRunner): Promise<void> => {
  await queryRunner.dropTable('products');
};
```

### 6. ¿Cómo hago para probar las integraciones con bases de datos reales?

Usa test containers para pruebas de integración:

```
// __tests__/integration/repositories/product.repository.test.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MongoProductRepository } from '../../src/infrastructure/adapters/secondary/product.repository.mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

describe('MongoProductRepository', () => {
  let repository: MongoProductRepository;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri)
      ],
      providers: [MongoProductRepository]
    }).compile();

    repository = module.get<MongoProductRepository>(MongoProductRepository);
  });

  afterAll(async () => {
    await mongod.stop();
  });

  // Pruebas de integración aquí
});
```

### 7. ¿Cómo manejo la autenticación y autorización en esta arquitectura?

La autenticación y autorización se manejan en la capa de presentación:

```
// src/presentation/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// src/presentation/guards/role.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
```

## Puntos Clave a Recordar

1. **Dominio Central**: El dominio debe ser independiente de cualquier implementación externa

2. **Puertos y Adaptadores**: Define contratos claros entre capas

3. **Inversión de Dependencias**: Las capas externas dependen del dominio, no al revés

4. **Pruebas Unitarias**: Al aislar el dominio, puedes probarlo sin dependencias externas

5. **Cambio Tecnológico**: Cambiar de base de datos o sistema de mensajería no afecta el dominio

6. **Escalabilidad**: El sistema puede crecer añadiendo nuevos adaptadores sin cambiar el núcleo

7. **Enfoque en Negocio**: Los desarrolladores se enfocan en el valor del negocio, no en la tecnología

## Conclusión

La arquitectura hexagonal representa un enfoque poderoso y flexible para el desarrollo de aplicaciones modernas. Aunque inicialmente puede parecer compleja, los beneficios a largo plazo en términos de mantenibilidad, testabilidad y escalabilidad la convierten en una excelente inversión para proyectos serios.

En 2026, con la creciente complejidad de las aplicaciones empresariales y la necesidad de adaptarse rápidamente a cambios tecnológicos, dominar la arquitectura hexagonal se vuelve una habilidad crítica para desarrolladores y arquitectos de software.

Recuerda que la arquitectura es un medio, no un fin. Adapt estos principios a las necesidades específicas de tu proyecto y equipo, pero nunca pierdas de vista los fundamentos: dominio central, puertos claros y adaptadores intercambiables.

## Recursos Adicionales

### Documentación Oficial

- [NestJS Documentation](https://docs.nestjs.com/)

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

- [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)

### Libros Recomendados

- "Domain-Driven Design: Tackling Complexity in the Heart of Software" by Eric Evans

- "Implementing Domain-Driven Design" by Vaughn Vernon

- "Clean Architecture: A Craftsman's Guide to Software Structure and Design" by Robert C. Martin

- "Node.js Design Patterns" by Mario Casciaro

### Herramientas y Librerías

- [Testcontainers](https://www.testcontainers.org/) para pruebas de integración

- [TypeORM](https://typeorm.io/) para ORM con TypeScript

- [Prisma](https://www.prisma.io/) como alternativa moderna

- [Jest](https://jestjs.io/) para testing

- [InversifyJS](https://inversify.io/) para inyección de dependencias

### Repositorios de Ejemplo

- [NestJS Clean Architecture Example](https://github.com/nestjs/nest/tree/master/sample/19-clean-architecture)

- [Hexagonal Architecture with Node.js](https://github.com/4lessandrodev/hexagonal-architecture-node-typescript)

- [DDD Starter Kit with NestJS](https://github.com/nestjs-typescript-ddd/nestjs-typescript-ddd)

## Ruta de Aprendizaje Sugerida

### Fase 1: Fundamentos (2-3 semanas)

1. Domina TypeScript avanzado y decoradores

2. Estudia los principios SOLID en profundidad

3. Entiende los conceptos básicos de NestJS

4. Lee sobre DDD y patrones de diseño de dominio

### Fase 2: Implementación Práctica (3-4 semanas)

1. Implementa una pequeña aplicación usando arquitectura hexagonal

2. Practica con diferentes tipos de adaptadores (REST, GraphQL, CLI)

3. Aprende testing unitario e integración

4. Experimenta con diferentes bases de datos sin cambiar el dominio

### Fase 3: Escalamiento Avanzado (2-3 semanas)

1. Implementa microservicios con comunicación por eventos

2. Aprende sobre CQRS y Event Sourcing

3. Domina patrones de rendimiento y caching

4. Estudia seguridad avanzada y monitoreo

### Fase 4: Especialización (1-2 semanas)

1. Elige un dominio específico (e-commerce, fintech, healthtech)

2. Estudia los requisitos de negocio complejos

3. Implementa un proyecto real con arquitectura hexagonal

4. Contribuye a proyectos open source usando este patrón

## Desafío para 2026

Para consolidar tus conocimientos, te propongo este desafío práctico:

**Proyecto: Sistema de Gestión de Inventario para Retail**

Requisitos:

- Gestionar productos, categorías y proveedores

- Controlar niveles de stock y alertas

- Procesar órdenes de compra

- Generar reportes de ventas e inventario

- Integrar con sistema contable externo

Tareas:

1. Diseña el dominio con entidades y servicios

2. Implementa los puertos para almacenamiento y notificación

3. Crea adaptadores para MongoDB y RabbitMQ

4. Expón la API con GraphQL

5. Implementa pruebas unitarias y de integración

6. Agrega monitoreo con Prometheus y Grafana

7. Implementa CQRS para optimizar consultas

Entrega:

- Código fuente completo en GitHub

- Documentación técnica y de negocio

- Video demostrando la funcionalidad

- Métricas de rendimiento y test coverage

Este desafío te preparará para los requisitos más complejos que enfrentarás como desarrollador senior o arquitecto en 2026, combinando todos los aspectos de la arquitectura hexagonal con las mejores prácticas modernas.

¡Manos a la obra y domina la arquitectura hexagonal en NestJS para 2026!
