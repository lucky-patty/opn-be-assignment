--Requirements
--As a store owner, I'd like to save customer information, so I can track age, gender and location for analysis purpose.
--As a store owner, I'd like to have a list of products, so my customers can browse and discover my collections.
--Each product can be listed in categories.
--Each product has different and multiple variation which can be color, size or anything.
--As a store owner, I would like my customers to be able to add items to cart, so they can process to check out.

create table countries (
  id serial primary key,
  name varchar(100) not null,
  code varchar(5) not null,
  created_at timestamp default now(),
  updated_at timestamp null
);

create index idx_countries_id on countries(id);

create table customers (
  id serial primary key,
  name varchar(100) not null,
  email varchar(100) unique not null,
  gender varchar(10) check (gender in ('male', 'female', 'other')),
  dob DATE not null,
  address varchar(100),
  zipcode varchar(5) not null,
  country_id integer references countries(id),
  created_at timestamp default now(),
  updated_at timestamp null
);

create index idx_customers_email on customers(email);

create table categories(
  id serial primary key,
  name varchar(100) unique not null,
  description TEXT,
  created_at timestamp default now(),
  updated_at timestamp null
);

create index idx_categories_name on categories(name);

create table products(
  id serial primary key,
  name varchar(100) not null,
  description TEXT,
  category_id integer references categories(id),
  created_at timestamp default now(),
  updated_at timestamp
);

create index idx_products_category_id on products(category_id);
create index idx_products_id on products(id);

create table variation_types(
  id serial primary key,
  name varchar(50) unique not null,
  created_at timestamp default now(),
  updated_at timestamp null
);

create table product_variations(
  id serial primary key,
  product_id integer references products(id) on delete cascade,
  variation_type_id integer references variation_types(id),
  variation_value varchar(50) not null,
  price numeric(10,2) not null,
  stock integer default 0,
  created_at timestamp default now(),
  updated_at timestamp null
);

create index idx_product_variations_product_id on product_variations(product_id);
create index idx_product_variations_variation_type_id on product_variations(variation_type_id);

create table carts(
  id serial primary key,
  customer_id integer references customers(id),
  status varchar(20) check (status in ('active','completed','cancelled')),
  created_at timestamp default now(),
  updated_at timestamp null
);

create table cart_items (
  id serial primary key,
  cart_id integer references carts(id),
  product_variation_id integer references product_variations(id),
  qty integer not null check (qty > 0),
  created_at timestamp default now(),
  updated_at timestamp null
);

create index idx_cart_items_cart_id on cart_items(cart_id);
create index idx_cart_items_product_variation_id on cart_items(product_variation_id);

create table orders (
  id serial primary key,
  customer_id integer references customers(id),
  order_date timestamp default now(),
  status varchar(20) check (status in ('pending', 'shipped', 'delivered', 'cancelled')),
  total numeric(10, 2) not null,
  created_at timestamp default now(),
  updated_at timestamp null
);

create index idx_orders_customer_id on orders(customer_id);

create table order_items (
  id serial primary key,
  order_id integer references orders(id),
  product_variation_id integer references product_variations(id),
  qty integer not null check (qty > 0),
  price_at numeric(10,2) not null,
  created_at timestamp default now(),
  updated_at timestamp null
);

create index idx_order_items_order_id on order_items(order_id);
create index idx_order_items_product_variation_id on order_items(product_variation_id);
