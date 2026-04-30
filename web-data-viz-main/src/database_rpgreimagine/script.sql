CREATE DATABASE Rpg_Reimagine;

USE Rpg_Reimagine;

CREATE TABLE Usuario (
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(50) NOT NULL,
email VARCHAR(254) NOT NULL,
senha VARCHAR (100) NOT NULL,
senha_antiga VARCHAR (100),
dt_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
super_usuario TINYINT NOT NULL,
ativo TINYINT NOT NULL DEFAULT 1,
CONSTRAINT chk_ativo CHECK (ativo = 0 OR ativo = 1)
);

CREATE TABLE Mesas (
id_mesa INT AUTO_INCREMENT PRIMARY KEY,
nome_mesa VARCHAR(50) NOT NULL,
dt_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
mesa_ativa TINYINT NOT NULL DEFAULT 1,
CONSTRAINT chk_mesa_ativa CHECK (mesa_ativa = 0 OR mesa_ativa = 1),
codigo CHAR(16),
fk_usuario_criador INT,
CONSTRAINT cfk_mesa_criador FOREIGN KEY (fk_usuario_criador) REFERENCES Usuario (id_usuario) ON DELETE SET NULL
);

CREATE TABLE Campanha (
fkid_mesa INT,
fkid_usuario INT,
PRIMARY KEY(fkid_mesa, fkid_usuario),
CONSTRAINT cfkid_mesa FOREIGN KEY (fkid_mesa) REFERENCES Mesas (id_mesa),
CONSTRAINT cfkid_usuario FOREIGN KEY (fkid_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Personagens (
id_personagem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
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
fkid_personagem INT NOT NULL,
fkid_elemento INT,
PRIMARY KEY (fkid_personagem,fkid_elemento),
CONSTRAINT cfk_personagem FOREIGN KEY (fkid_personagem) REFERENCES Personagens(id_personagem) ON DELETE CASCADE,
CONSTRAINT cfk_elemento FOREIGN KEY (fkid_elemento) REFERENCES ElementosMesa (id_elementos_mesa) ON DELETE CASCADE,
valor_atual_inteiro INT,
valor_atual_flutuante FLOAT
);