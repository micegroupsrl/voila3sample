/*CREATE SEQUENCE user_seq 
  MINVALUE 1 
  MAXVALUE 999999999 
  INCREMENT BY 1 
  START WITH 1
  NOCACHE 
  NOCYCLE;*/
CREATE TABLE categoria_ordine (
  id_cat_ordine INTEGER NOT NULL
);
CREATE TABLE stato_ordine (
  id_stato_ordine INTEGER NOT NULL,
  descrizione VARCHAR(80)
);
CREATE TABLE ordine (
  id_ordine INTEGER NOT NULL,
  descrizione VARCHAR(80),
  datetime DATETIME,
  date DATE,
  time TIME,
 
   
  created_by VARCHAR(80), 
  last_modified_by VARCHAR(80), 
  created_date DATETIME, 
  last_modified_date DATETIME,
  id_stato_ordine INTEGER,    anno INTEGER(11),    id_tipo_ordine INTEGER,    id_cat_ordine INTEGER,    id_persona INTEGER,    cf VARCHAR(80),    id_ordine_aggregato INTEGER);
CREATE TABLE cliente (
  id_persona INTEGER NOT NULL,
  cf VARCHAR(80) NOT NULL,
  punti INTEGER(11)
);
CREATE TABLE persona (
  nome VARCHAR(80),
  cognome VARCHAR(80),
  email VARCHAR(80),
  telefono VARCHAR(80),
  id_persona INTEGER NOT NULL,
  cf VARCHAR(80) NOT NULL,
 
   
  created_by VARCHAR(80), 
  last_modified_by VARCHAR(80), 
  created_date DATETIME, 
  last_modified_date DATETIME
);
CREATE TABLE riga_ordine (
  qta NUMERIC(12,2),
  id_ordine INTEGER NOT NULL,    id_prodotto INTEGER NOT NULL);
CREATE TABLE prodotto (
  id_prodotto INTEGER NOT NULL,
  descrizione VARCHAR(80),
 
   
  created_by VARCHAR(80), 
  last_modified_by VARCHAR(80), 
  created_date DATETIME, 
  last_modified_date DATETIME,
  id_persona INTEGER,    cf VARCHAR(80));
CREATE TABLE tipo_ordine (
  anno INTEGER(11) NOT NULL,
  id_tipo_ordine INTEGER NOT NULL,
  id_cat_ordine INTEGER NOT NULL);
CREATE TABLE fornitore (
  id_persona INTEGER NOT NULL,
  cf VARCHAR(80) NOT NULL,
  piva VARCHAR(80)
);

 
ALTER TABLE categoria_ordine
  ADD PRIMARY KEY (id_cat_ordine);
 
ALTER TABLE stato_ordine
  ADD PRIMARY KEY (id_stato_ordine);
 
ALTER TABLE ordine
  ADD PRIMARY KEY (id_ordine);
 
ALTER TABLE cliente
  ADD PRIMARY KEY (id_persona, cf);
 
ALTER TABLE persona
  ADD PRIMARY KEY (id_persona, cf);
 
ALTER TABLE riga_ordine
  ADD PRIMARY KEY (id_ordine, id_prodotto);
 
ALTER TABLE prodotto
  ADD PRIMARY KEY (id_prodotto);
 
ALTER TABLE tipo_ordine
  ADD PRIMARY KEY (anno, id_tipo_ordine,  id_cat_ordine);  
 
ALTER TABLE fornitore
  ADD PRIMARY KEY (id_persona, cf);
 
 
 
ALTER TABLE ordine
  ADD CONSTRAINT FK_ordine__stato_ordine FOREIGN KEY (id_stato_ordine) REFERENCES stato_ordine(id_stato_ordine) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE ordine
  ADD CONSTRAINT FK_ordine__tipo_ordine FOREIGN KEY (anno, id_tipo_ordine, id_cat_ordine) REFERENCES tipo_ordine(anno, id_tipo_ordine,  id_cat_ordine  ) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE ordine
  ADD CONSTRAINT FK_ordine__cliente FOREIGN KEY (id_persona, cf) REFERENCES cliente(id_persona, cf) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE ordine
  ADD CONSTRAINT FK_ordine__ordine_aggregato FOREIGN KEY (id_ordine_aggregato) REFERENCES ordine(id_ordine) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE cliente
  ADD CONSTRAINT FK_cliente__persona FOREIGN KEY (id_persona, cf) REFERENCES persona(id_persona, cf) ON DELETE CASCADE ON UPDATE CASCADE;
   
 
ALTER TABLE riga_ordine
  ADD CONSTRAINT FK_riga_ordine__ordine FOREIGN KEY (id_ordine) REFERENCES ordine(id_ordine) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE riga_ordine
  ADD CONSTRAINT FK_riga_ordine__prodotto FOREIGN KEY (id_prodotto) REFERENCES prodotto(id_prodotto) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE prodotto
  ADD CONSTRAINT FK_prodotto__fornitore FOREIGN KEY (id_persona, cf) REFERENCES fornitore(id_persona, cf) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE tipo_ordine
  ADD CONSTRAINT FK_tipo_ordine__categoria_ordine FOREIGN KEY (id_cat_ordine) REFERENCES categoria_ordine(id_cat_ordine) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE fornitore
  ADD CONSTRAINT FK_fornitore__persona FOREIGN KEY (id_persona, cf) REFERENCES persona(id_persona, cf) ON DELETE CASCADE ON UPDATE CASCADE;
  
