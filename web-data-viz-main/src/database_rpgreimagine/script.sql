USE Rpg_Reimagine;

CREATE TABLE Usuario (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
email VARCHAR(254) NOT NULL UNIQUE,
senha VARCHAR (100) NOT NULL,
dt_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
super_usuario TINYINT NOT NULL DEFAULT 0,
ativo TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE Mesas (
id_mesa INT AUTO_INCREMENT PRIMARY KEY,
nome_mesa VARCHAR(50) NOT NULL,
dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
mesa_ativa TINYINT NOT NULL DEFAULT 1,
codigo CHAR(16),
fk_usuario_criador INT,
CONSTRAINT cfk_mesa_criador FOREIGN KEY (fk_usuario_criador) REFERENCES Usuario (id_usuario) ON DELETE SET NULL
);

CREATE TABLE Personagens (
id_personagem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
descricao VARCHAR(500),
vida_max INT,
vida_atual INT,
nivel INT,
xp INT,
especie VARCHAR(100),
classe VARCHAR(100),
patente VARCHAR(100),
fk_usuario INT NOT NULL,
CONSTRAINT cfk_usuario_personagem FOREIGN KEY (fk_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE CampanhaJogadores (
fkpk_idmesa INT,
fkpk_idusuario INT,
dt_entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(fkpk_idmesa, fkpk_idusuario),
CONSTRAINT cfkpk_idmesa FOREIGN KEY (fkpk_idmesa) REFERENCES Mesas (id_mesa),
CONSTRAINT cfkpk_idusuario FOREIGN KEY (fkpk_idusuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE CampanhaPersonagens (
fkpk_idmesa INT,
fkpk_idpersonagem INT,
PRIMARY KEY(fkpk_idmesa, fkpk_idpersonagem),
CONSTRAINT cfkpk_idmesapersonagem FOREIGN KEY (fkpk_idmesa) REFERENCES Mesas (id_mesa),
CONSTRAINT cfkpk_idpersonagem FOREIGN KEY (fkpk_idpersonagem) REFERENCES Personagens(id_personagem)
);

CREATE TABLE ElementosMesa(
id_elementos_mesa INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
descricao VARCHAR(500),
valor_max_inteiro INT,
valor_max_flutuante FLOAT,
tipo_elemento INT,
fk_mesa_elemento INT NOT NULL,
CONSTRAINT cfk_mesa_elemento FOREIGN KEY (fk_mesa_elemento) REFERENCES Mesas (id_mesa) ON DELETE CASCADE
);

CREATE TABLE ElementosPersonagem (
fkpk_idpersonagem INT NOT NULL,
fkpk_idelemento INT,
PRIMARY KEY (fkpk_idpersonagem,fkpk_idelemento),
CONSTRAINT cfk_personagem FOREIGN KEY (fkpk_idpersonagem) REFERENCES Personagens(id_personagem) ON DELETE CASCADE,
CONSTRAINT cfk_elemento FOREIGN KEY (fkpk_idelemento) REFERENCES ElementosMesa (id_elementos_mesa) ON DELETE CASCADE,
valor_atual_inteiro INT,
Quantidade INT,
valor_atual_flutuante FLOAT
);

SHOW TABLES;

SELECT * FROM Campanha;
SELECT * FROM ElementosMesa;
SELECT * FROM ElementosPersonagem;
SELECT * FROM Mesas;
SELECT * FROM Personagens;
SELECT * FROM Usuario;

INSERT INTO Usuario (nome, email, senha) VALUES
('admin','admin@email.com','rpg_reimagine_123');

INSERT INTO Mesas (nome_mesa, fk_usuario_criador) VALUES
('Mesa Teste', 1);

INSERT INTO Personagens (nome, fk_usuario) VALUES
('Personagem1',1),
('Personagem2',1);

INSERT INTO ElementosMesa (nome,fk_mesa_elemento,valor_max_inteiro,valor_max_flutuante) VALUES
('Espada', 1, 20,null),
('Escudo', 1, null, 31.55),
('Bolsa de moedas Simples',1 ,null, 999.99);

INSERT INTO CampanhaPersonagens (fkpk_idmesa,fkpk_idpersonagem) VALUES
(1,1),
(1,2);

INSERT INTO CampanhaJogadores (fkpk_idmesa,fkpk_idusuario) VALUES
(1,1);

INSERT INTO ElementosPersonagem (fkpk_idpersonagem,fkpk_idelemento) VALUES
(1,1),
(1,3);

INSERT INTO ElementosPersonagem (fkpk_idpersonagem, fkpk_idelemento, Quantidade) VALUES
(1,1,1),
(1,2,1),
(1,3,3);


-- Vendo os Usuarios Criadores de Cada Mesa
SELECT 
u.nome AS 'Nome_Usuario',
u.email AS 'Email_Usuario',
m.nome_mesa AS 'Nome_Mesa',
m.dt_criacao AS 'Data_Criacao'
FROM Usuario u
LEFT JOIN Mesas m 
ON m.fk_usuario_criador=u.id_usuario;

-- FAZENDO UM SELECT GERAL CONTENDO INFORMAÇÕES DE USUÁRIO, PERSONAGEM, MESA E ELEMENTOS VINCULADOS A CADA PERSONAGEM

SELECT
u.nome AS 'Nome_Usuario',
u.email AS 'Email_Usuario',
cj.dt_entrada AS 'Data_entrada_jogador',
p.nome AS 'Personagem',
e.nome AS 'Item',
ep.Quantidade AS 'Qtd',
p.dt_criacao AS 'Data_criacao_personagem',
m.nome_mesa AS 'Nome_Mesa',
uc.nome AS 'Criador_Mesa'
FROM Usuario u
JOIN Usuario uc
JOIN Mesas m ON m.fk_usuario_criador = uc.id_usuario
JOIN Personagens p ON p.fk_usuario = u.id_usuario
JOIN ElementosMesa e ON e.fk_mesa_elemento = m.id_mesa
JOIN CampanhaJogadores cj ON cj.fkpk_idusuario = u.id_usuario AND cj.fkpk_idmesa = m.id_mesa
JOIN ElementosPersonagem ep ON ep.fkpk_idpersonagem = p.id_personagem AND ep.fkpk_idelemento = e.id_elementos_mesa
JOIN CampanhaPersonagens cp ON cp.fkpk_idmesa = m.id_mesa AND cp.fkpk_idpersonagem = p.id_personagem
ORDER BY p.id_personagem;

-- SELECIONANDO APENAS OS PERSONAGENS E SUAS RESPECTIVAS MESAS

CREATE VIEW Personagem_Mesa AS
SELECT
p.id_personagem AS 'ID Personagem',
p.nome AS 'Nome_Personagem',
u.nome AS 'Usuário',
m.nome_mesa AS 'Nome_Mesa'
FROM Usuario AS u
JOIN Personagens AS p ON p.fk_usuario = u.id_usuario
JOIN Mesas AS m
JOIN CampanhaPersonagens AS cp ON cp.fkpk_idpersonagem = p.id_personagem;

SELECT * FROM Personagem_Mesa;

-- SELECIONANDO OS ELEMENTOS VINCULADOS A CADA PERSONAGEM

CREATE VIEW Personagem_elementos AS
SELECT
p.id_personagem AS 'id_personagem',
p.nome AS 'nome_personagem',
e.nome AS 'elemento_personagem',
m.nome_mesa AS 'nome_mesa'
FROM Mesas AS m
JOIN Personagens AS p
JOIN ElementosMesa AS e
JOIN CampanhaPersonagens AS cp ON cp.fkpk_idpersonagem = p.id_personagem AND cp.fkpk_idmesa = m.id_mesa
JOIN ElementosPersonagem AS ep ON ep.fkpk_idpersonagem = p.id_personagem AND ep.fkpk_idelemento = e.id_elementos_mesa 
ORDER BY p.id_personagem;

SELECT * FROM Personagem_elementos;

-- SELECIONANDO OS ELEMENTOS EXISTENTES EM UMA MESA

CREATE VIEW Elementos_Mesa_View AS
SELECT 
e.nome AS 'Elemento',
m.nome_mesa AS 'Nome_Mesa'
FROM Mesas AS m
JOIN ElementosMesa AS e ON e.fk_mesa_elemento = m.id_mesa;

SELECT * FROM Elementos_Mesa_View;

-- SELECIONANDO USUÁRIOS VINCULADOS A UMA MESA

SELECT
u.id_usuario AS 'id_usuario',
u.nome AS 'usuario_nome',
m.nome_mesa AS 'nome_mesa'
FROM Usuario AS u
JOIN Mesas AS m
JOIN CampanhaJogadores AS cp ON cp.fkpk_idusuario = u.id_usuario AND cp.fkpk_idmesa = m.id_mesa;

-- SELECIONANDO AS INFORMAÇÕES DE TODOS OS USUÁRIOS

SELECT
u.id_usuario AS 'id_usuario',
u.nome AS 'usuario_nome',
u.email AS 'email_usuario',
u.dt_registro AS 'data_registro',
u.super_usuario AS 'super_usuario',
u.ativo AS 'ativo'
FROM Usuario AS u;