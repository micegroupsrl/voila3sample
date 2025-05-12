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
CREATE TABLE riga_ordine (
  quantita NUMERIC(12,2),
  id_prodotto INTEGER NOT NULL,    id_ordine INTEGER NOT NULL);

 
ALTER TABLE riga_ordine
  ADD PRIMARY KEY (id_prodotto, id_ordine);
 
ALTER TABLE riga_ordine
  ADD CONSTRAINT FK_riga_ordine__prodotto FOREIGN KEY (id_prodotto) REFERENCES prodotto(id_prodotto) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE riga_ordine
  ADD CONSTRAINT FK_riga_ordine__ordine FOREIGN KEY (id_ordine) REFERENCES ordine(id_ordine) ON DELETE CASCADE ON UPDATE CASCADE;
