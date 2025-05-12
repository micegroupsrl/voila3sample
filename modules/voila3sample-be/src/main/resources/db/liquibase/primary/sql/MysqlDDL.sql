/*CREATE SEQUENCE user_seq 
  MINVALUE 1 
  MAXVALUE 999999999 
  INCREMENT BY 1 
  START WITH 1
  NOCACHE 
  NOCYCLE;*/
/*CREATE SEQUENCE prodotto_seq 
  MINVALUE 1 
  MAXVALUE 999999999 
  INCREMENT BY 1 
  START WITH 1
  NOCACHE 
  NOCYCLE;*/
CREATE TABLE ordine (
  id_ordine INTEGER NOT NULL,
  data_ordine DATE NOT NULL,
  tempo_ordine TIME,
 
   
  created_by VARCHAR(80), 
  last_modified_by VARCHAR(80), 
  created_date DATETIME, 
  last_modified_date DATETIME,
  id_persona INTEGER NOT NULL,    codice_fiscale VARCHAR(80) NOT NULL,    id_tipo_ordine INTEGER,    anno_tipologia INTEGER,    id_categoria_ordine INTEGER,    id_ordine_aggregato INTEGER);
CREATE TABLE cliente (
  id_persona INTEGER NOT NULL,
  codice_fiscale VARCHAR(80) NOT NULL,
  email VARCHAR(80),
  telefono VARCHAR(80),
  indirizzo VARCHAR(80),
 
   
  created_by VARCHAR(80), 
  last_modified_by VARCHAR(80), 
  created_date DATETIME, 
  last_modified_date DATETIME
);
CREATE TABLE persona (
  id_persona INTEGER NOT NULL,
  codice_fiscale VARCHAR(80) NOT NULL
);
CREATE TABLE prodotto (
  id_prodotto INTEGER NOT NULL,
  nome_prodotto VARCHAR(80) UNIQUE
);
CREATE TABLE riga_ordine (
  quantita NUMERIC(12,2),
  id_prodotto INTEGER NOT NULL,    id_ordine INTEGER NOT NULL);
CREATE TABLE tipo_ordine (
  id_tipo_ordine INTEGER NOT NULL,
  nome_ordine VARCHAR(80),
  anno_tipologia INTEGER NOT NULL,
  id_categoria_ordine INTEGER NOT NULL) COMMENT 'Tipologia di Ordine';
CREATE TABLE categoria_ordine (
  id_categoria_ordine INTEGER NOT NULL
);

 
ALTER TABLE ordine
  ADD PRIMARY KEY (id_ordine);
 
ALTER TABLE cliente
  ADD PRIMARY KEY (id_persona, codice_fiscale);
 
ALTER TABLE persona
  ADD PRIMARY KEY (id_persona, codice_fiscale);
 
ALTER TABLE prodotto
  ADD PRIMARY KEY (id_prodotto);
ALTER TABLE prodotto  
  MODIFY id_prodotto INTEGER NOT NULL AUTO_INCREMENT;
 
ALTER TABLE riga_ordine
  ADD PRIMARY KEY (id_prodotto, id_ordine);
 
ALTER TABLE tipo_ordine
  ADD PRIMARY KEY (id_tipo_ordine, anno_tipologia,  id_categoria_ordine);  
 
ALTER TABLE categoria_ordine
  ADD PRIMARY KEY (id_categoria_ordine);
 
ALTER TABLE ordine
  ADD CONSTRAINT FK_ordine__cliente FOREIGN KEY (id_persona, codice_fiscale) REFERENCES cliente(id_persona, codice_fiscale) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE ordine
  ADD CONSTRAINT FK_ordine__tipo_ordine FOREIGN KEY (id_tipo_ordine, anno_tipologia, id_categoria_ordine) REFERENCES tipo_ordine(id_tipo_ordine, anno_tipologia,  id_categoria_ordine  ) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE ordine
  ADD CONSTRAINT FK_ordine__ordine_aggregato FOREIGN KEY (id_ordine_aggregato) REFERENCES ordine(id_ordine) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE cliente
  ADD CONSTRAINT FK_cliente__persona FOREIGN KEY (id_persona, codice_fiscale) REFERENCES persona(id_persona, codice_fiscale) ON DELETE CASCADE ON UPDATE CASCADE;
   
 
 
ALTER TABLE riga_ordine
  ADD CONSTRAINT FK_riga_ordine__prodotto FOREIGN KEY (id_prodotto) REFERENCES prodotto(id_prodotto) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE riga_ordine
  ADD CONSTRAINT FK_riga_ordine__ordine FOREIGN KEY (id_ordine) REFERENCES ordine(id_ordine) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE tipo_ordine
  ADD CONSTRAINT FK_tipo_ordine__categoria_ordine FOREIGN KEY (id_categoria_ordine) REFERENCES categoria_ordine(id_categoria_ordine) ON DELETE CASCADE ON UPDATE CASCADE;
 
