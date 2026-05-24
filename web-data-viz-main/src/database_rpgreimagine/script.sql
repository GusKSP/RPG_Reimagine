USE Rpg_Reimagine;

CREATE TABLE Usuario (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
imagem_usuario VARCHAR (255),
nome VARCHAR(500) NOT NULL,
email VARCHAR(320) NOT NULL UNIQUE,
senha VARCHAR (4096) NOT NULL,
dt_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
super_usuario TINYINT NOT NULL DEFAULT 0,
ativo TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE Mesas (
id_mesa INT AUTO_INCREMENT PRIMARY KEY,
imagem_mesa VARCHAR (255),
nome_mesa VARCHAR(100) NOT NULL,
dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
mesa_ativa TINYINT NOT NULL DEFAULT 1,
codigo CHAR(16),
fk_usuario_criador INT,
CONSTRAINT cfk_mesa_criador FOREIGN KEY (fk_usuario_criador) REFERENCES Usuario (id_usuario) ON DELETE SET NULL
);

CREATE TABLE Personagens (
id_personagem INT PRIMARY KEY AUTO_INCREMENT,
imagem_personagem VARCHAR (255),
nome VARCHAR(100) NOT NULL,
dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
descricao VARCHAR(500),
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
imagem_elemento VARCHAR (255),
nome VARCHAR(100) NOT NULL,
descricao TEXT,
simbolo VARCHAR(255),
valor_inteiro INT,
valor_flutuante FLOAT,
tipo_elemento INT,
fk_mesa INT NOT NULL,
CONSTRAINT cfk_mesa_elemento FOREIGN KEY (fk_mesa) REFERENCES Mesas (id_mesa),
fk_elemento_dependencia INT,
CONSTRAINT cfk_elemento_dependencia FOREIGN KEY (fk_elemento_dependencia) REFERENCES ElementosMesa(id_elementos_mesa),
fk_elemento_multiplicador INT,
CONSTRAINT cfk_elemento_multiplicador FOREIGN KEY (fk_elemento_multiplicador) REFERENCES ElementosMesa(id_elementos_mesa),
fk_elemento_aditivo INT,
CONSTRAINT cfk_elemento_aditivo FOREIGN KEY (fk_elemento_aditivo) REFERENCES ElementosMesa(id_elementos_mesa)
);

CREATE TABLE ElementosPersonagem (
fkpk_idpersonagem INT NOT NULL,
fkpk_idelemento INT,
PRIMARY KEY (fkpk_idpersonagem,fkpk_idelemento),
CONSTRAINT cfk_personagem FOREIGN KEY (fkpk_idpersonagem) REFERENCES Personagens(id_personagem),
CONSTRAINT cfk_elemento FOREIGN KEY (fkpk_idelemento) REFERENCES ElementosMesa (id_elementos_mesa),
valor_atual_inteiro INT,
Quantidade INT,
valor_atual_flutuante FLOAT,
valor_atual_texto VARCHAR(1000)
);

SHOW TABLES;


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
JOIN ElementosMesa e ON e.id_elementos_mesa = m.id_mesa
JOIN CampanhaJogadores cj ON cj.fkpk_idusuario = u.id_usuario AND cj.fkpk_idmesa = m.id_mesa
JOIN ElementosPersonagem ep ON ep.fkpk_idpersonagem = p.id_personagem AND ep.fkpk_idelemento = e.id_elementos_mesa
JOIN CampanhaPersonagens cp ON cp.fkpk_idmesa = m.id_mesa AND cp.fkpk_idpersonagem = p.id_personagem
ORDER BY p.id_personagem;

-- SELECIONANDO APENAS OS PERSONAGENS E SUAS RESPECTIVAS MESAS

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

SELECT 
e.nome AS 'Elemento',
m.nome_mesa AS 'Nome_Mesa'
FROM Mesas AS m
JOIN ElementosMesa AS e ON e.id_elementos_mesa = m.id_mesa;

SELECT * FROM Elementos_Mesa_View;

-- SELECIONANDO USUÁRIOS VINCULADOS A UMA MESA

SELECT
u.id_usuario AS 'id_usuario',
u.nome AS 'usuario_nome',
m.nome_mesa AS 'nome_mesa'
FROM Usuario AS u
JOIN Mesas AS m
JOIN CampanhaJogadores AS cp ON cp.fkpk_idusuario = u.id_usuario AND cp.fkpk_idmesa = m.id_mesa;

-- SELECIONANDO TODOS OS USUÁRIOS CADASTRADOS

SELECT 
u.id_usuario AS 'id_usuario',
u.nome AS 'usuario_nome',
u.email AS 'usuario_email',
u.dt_registro AS 'usuario_dt_registro'
FROM Usuario AS u 
WHERE u.id_usuario > 0
LIMIT 100;