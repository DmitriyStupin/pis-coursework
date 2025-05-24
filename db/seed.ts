import { db, eq, User, Item, Order, OrderItem, CartItem } from 'astro:db';
import argon2 from 'argon2';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      login: "admin",
      passwordHash: await argon2.hash("admin"),
      isManager: true,
      name: "admin"
    },
    {
      login: "user",
      passwordHash: await argon2.hash("user"),
      name: "user 1"
    }
  ]);

  const items = await db.insert(Item).values([
    {
    "name": "Яблоня 'Антоновка' (2 года)",
    "unitsInStock": 35,
    "price": 749
  },
  {
    "name": "Груша 'Конференция' (однолетка)",
    "unitsInStock": 42,
    "price": 849
  },
  {
    "name": "Слива 'Венгерка московская'",
    "unitsInStock": 28,
    "price": 929
  },
  {
    "name": "Вишня 'Шоколадница' (саженец 2 года)",
    "unitsInStock": 30,
    "price": 699
  },
  {
    "name": "Черешня 'Ипуть'",
    "unitsInStock": 20,
    "price": 1049
  },
  {
    "name": "Абрикос 'Краснощекий'",
    "unitsInStock": 18,
    "price": 1149
  },
  {
    "name": "Персик 'Сатурн' (колоновидный)",
    "unitsInStock": 15,
    "price": 1349
  },
  {
    "name": "Малина ремонтантная 'Полька'",
    "unitsInStock": 60,
    "price": 279
  },
  {
    "name": "Смородина чёрная 'Добрыня'",
    "unitsInStock": 48,
    "price": 389
  },
  {
    "name": "Крыжовник 'Русский'",
    "unitsInStock": 36,
    "price": 349
  },
  {
    "name": "Ежевика 'Торнфри'",
    "unitsInStock": 32,
    "price": 399
  },
  {
    "name": "Черника садовая 'Блюкроп'",
    "unitsInStock": 25,
    "price": 549
  },
  {
    "name": "Жимолость 'Синяя птица'",
    "unitsInStock": 40,
    "price": 379
  },
  {
    "name": "Виноград 'Кишмиш Лучистый'",
    "unitsInStock": 20,
    "price": 629
  },
  {
    "name": "Гортензия метельчатая 'Лаймлайт'",
    "unitsInStock": 12,
    "price": 1149
  },
  {
    "name": "Роза плетистая 'Фламентанц'",
    "unitsInStock": 18,
    "price": 779
  },
  {
    "name": "Сирень обыкновенная 'Красавица Москвы'",
    "unitsInStock": 15,
    "price": 869
  },
  {
    "name": "Туя западная 'Смарагд' (60–80 см)",
    "unitsInStock": 22,
    "price": 999
  },
  {
    "name": "Ель голубая колючая (саженец, 40 см)",
    "unitsInStock": 10,
    "price": 1249
  },
  {
    "name": "Сосна обыкновенная (1,5 года)",
    "unitsInStock": 30,
    "price": 599
  }
  ]).returning();

  const user_id = (await db.select().from(User).where(
    eq(User.login, "user")
  ))[0].id;
  const order_id = (await db.insert(Order).values({
    userId: user_id,
    totalPrice: 10000,
    status: "completed"
  }).returning())[0].id;

  await db.insert(OrderItem).values([
    { orderId: order_id, itemId: items[0].id },
    { orderId: order_id, itemId: items[1].id, amount: 3 }
  ]);

  await db.insert(CartItem).values([
    { userId: user_id, itemId: items[2].id, amount: 1 },
    { userId: user_id, itemId: items[3].id, amount: 2 }
  ]);
}
