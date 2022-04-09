# StoreFront Back-End project

### Create Database & User

#### Create A User

[Docs](https://www.postgresql.org/docs/14/sql-createuser.html)

```sql
CREATE USER abdelrahman WITH PASSWORD 'password' SUPERUSER;
```

#### Create Database

[Docs](https://www.postgresql.org/docs/14/sql-createdatabase.html)

```sql
CREATE DATABASE storefront
    OWNER abdelrahman
    ENCODING UTF8;
```

```sql
CREATE DATABASE storefront_test
    OWNER abdelrahman
    ENCODING UTF8;
```

#### Database Port

>: 5342

#### Server Port

>: 3000

#### Start Node app

```bash
npm install
```

### Database Schema
```psql
 Schema |       Name       | Type  |    Owner    
--------+------------------+-------+-------------
 public | migrations       | table | abdelrahman
 public | ordered_products | table | abdelrahman
 public | orders           | table | abdelrahman
 public | products         | table | abdelrahman
 public | users            | table | abdelrahman
```

#### Users Table

```
                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 username   | character varying(255) |           | not null |
 first_name | character varying(255) |           | not null |
 last_name  | character varying(255) |           | not null |
 role       | character varying(50)  |           | not null |
 password   | character varying(255) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_username_key" UNIQUE CONSTRAINT, btree (username)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE 
```

#### Products Table

```
                                     Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default
----------+------------------------+-----------+----------+--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(255) |           | not null |
 price    | character varying(255) |           | not null |
 category | character varying(255) |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
    "products_name_key" UNIQUE CONSTRAINT, btree (name)
Referenced by:
    TABLE "ordered_products" CONSTRAINT "ordered_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```

#### Orders Table

```
                                       Table "public.orders"
   Column   |           Type           | Collation | Nullable |              Default
------------+--------------------------+-----------+----------+------------------------------------
 id         | integer                  |           | not null | nextval('orders_id_seq'::regclass)
 user_id    | integer                  |           | not null |
 created_at | timestamp with time zone |           |          | CURRENT_TIMESTAMP
 status     | character varying(50)    |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
Referenced by:
    TABLE "ordered_products" CONSTRAINT "ordered_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
```

#### Ordered_products Table

```
            Table "public.ordered_products"
   Column   |  Type   | Collation | Nullable | Default
------------+---------+-----------+----------+---------
 order_id   | integer |           | not null |
 product_id | integer |           | not null |
 quantity   | integer |           | not null |
Foreign-key constraints:
    "ordered_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "ordered_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```

#### Data migration instructions :
```json
"db:up": "db-migrate up"
```

```json
"db:down": "db-migrate reset"
```

### ***SCRIPTS***

#### Run server:

>npm run dev


```json
"dev": "nodemon src/server.ts --watch"
```

[***REGISTER USER***](http://localhost:3000/register) 

[***INDEX USERS***](http://localhost:3000/users) : TOKEN REQUIRED

[***SHOW USER***](http://localhost:3000/user/1) : TOKEN REQUIRED - ADMIN

[***ADD PRODUCT***](http://localhost:3000/add-product) : TOKEN REQUIRED - ADMIN

[***LIST PRODUCTS***](http://localhost:3000/products) 

[***SHOW PRODUCT***](http://localhost:3000/product/1) 

[***SHOW USER'S ORDER***](http://localhost:3000/order/1) : TOKEN REQUIRED



#### Run test script

>npm run test
```json
    "test": "npm run build&&set ENV=test&&db-migrate --env test up&&jasmine&&db-migrate --env test reset"
```

