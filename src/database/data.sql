USE petspace_db;

-- 1. Poblar tablas paramétricas

-- Roles
INSERT INTO roles (name) VALUES 
('admin'),
('user');

-- Categorías
INSERT INTO categories (name) VALUES 
('Perros'),
('Gatos'),
('Alimentos'),
('Juguetes'),
('Confort'),
('Accesorios');

-- Marcas (Generadas para el ejemplo)
INSERT INTO brands (name) VALUES 
('PetSpace Original'),
('Royal Canin'),
('Whiskas'),
('Kong'),
('Pedigree');

-- Colores
INSERT INTO colors (name) VALUES 
('Marrón'),
('Rojo'),
('Azul'),
('Gris'),
('Beige'),
('Verde'),
('Negro'),
('Blanco');

-- 2. Poblar Usuarios

-- Contraseña '12345678' hasheada para todos los usuarios de prueba: $2a$10$EpIxNw... (ejemplo)
-- Nota: En producción usar hashes reales generados por bcrypt. 
-- Usamos el hash provisto por el usuario para user 3 como ejemplo válido, y generamos placeholder para los otros.

INSERT INTO users (id, first_name, last_name, email, password, role_id, image) VALUES 
(1, 'Admin', 'PetSpace', 'admin@petspace.com', '$2b$10$tUTX/901hlfYzMgCjXUPyufs9kllPqPsRqfmL5i84mIlGJEw8Gvcm', 1, 'default-admin.jpg'),
(2, 'Juan', 'Pérez', 'juan.perez@example.com', '$2b$10$tUTX/901hlfYzMgCjXUPyufs9kllPqPsRqfmL5i84mIlGJEw8Gvcm', 2, 'default-user.jpg'),
(3, 'Juan', 'Perez', 'juancitop@gmail.com', '$2b$10$N7UWVXkqAz3MdrWGYd9iSepFfz46OJZXtZoZzQXi8xgbR.bSw8Q22', 2, 'image-1765034035251-148319017.png');

-- 3. Poblar Productos

INSERT INTO products (id, name, description, price, category_id, brand_id, image) VALUES 
(1, 'Alimento Premium Perro - Adulto', 'Nutrición completa y balanceada para perros adultos de todas las razas. Formulado con ingredientes naturales de alta calidad.', 45.00, 3, 2, 'product-food.jpg'),
(2, 'Juguete Interactivo', 'Juguete resistente diseñado para estimular la mente de tu mascota y mantenerla entretenida durante horas.', 15.50, 4, 4, 'product-toy.jpg'),
(3, 'Cama Ortopédica', 'Cama con espuma de memoria que se adapta al cuerpo de tu mascota, proporcionando un descanso reparador.', 80.00, 5, 1, 'product-bed.jpg'),
(4, 'Collar Reflectivo', 'Collar ajustable con banda reflectiva para mayor seguridad durante los paseos nocturnos.', 12.00, 6, 1, 'product-collar.jpg');

-- 4. Poblar Relaciones (Product Colors)

INSERT INTO product_colors (product_id, color_id) VALUES 
(1, 1), -- Alimento Marrón
(2, 2), -- Juguete Rojo
(2, 3), -- Juguete Azul
(3, 4), -- Cama Gris
(3, 5), -- Cama Beige
(4, 2), -- Collar Rojo
(4, 6), -- Collar Verde
(4, 7); -- Collar Negro

-- 5. Poblar Carrito de Compras (Opcional)

INSERT INTO orders (id, user_id, status, total) VALUES 
(1, 2, 'completed', 60.50), -- Compra pasada de Juan Pérez
(2, 3, 'pending', 12.00);   -- Carrito activo de Juancito

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES 
(1, 1, 1, 45.00), -- 1 Alimento
(1, 2, 1, 15.50), -- 1 Juguete
(2, 4, 1, 12.00); -- 1 Collar
