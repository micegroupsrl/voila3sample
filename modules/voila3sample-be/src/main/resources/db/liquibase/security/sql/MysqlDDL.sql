/*CREATE SEQUENCE user_seq 
  MINVALUE 1 
  MAXVALUE 999999999 
  INCREMENT BY 1 
  START WITH 1
  NOCACHE 
  NOCYCLE;*/
CREATE TABLE security_user (
  user_id BIGINT(20) NOT NULL COMMENT 'Identificativo dell''utente',
  email VARCHAR(80) COMMENT 'L''email dell''utente',
  password VARCHAR(80) COMMENT 'Password',
  username VARCHAR(80) COMMENT 'Il nome utente'
) COMMENT 'Entità rappresentativa di un utente dell''applicativo';
CREATE TABLE role (
  role_id VARCHAR(80) NOT NULL,
  name VARCHAR(80),
  role_id_role_group VARCHAR(80));
CREATE TABLE privilege (
  privilege_id BIGINT(20) NOT NULL,
  name VARCHAR(80),
  description VARCHAR(80)
) COMMENT 'Entità rappresentativa di un privilegio';
CREATE TABLE user_role_membership (
  role_id VARCHAR(80) NOT NULL,    user_id BIGINT(20) NOT NULL) COMMENT 'Relazione fra User e Role';
CREATE TABLE role_privilege_mapping (
  role_id VARCHAR(80) NOT NULL,    privilege_id BIGINT(20) NOT NULL) COMMENT 'Relazione fra Role e Privilege';

 
ALTER TABLE security_user
  ADD PRIMARY KEY (user_id);
ALTER TABLE security_user  
  MODIFY user_id BIGINT(20) NOT NULL AUTO_INCREMENT;
 
ALTER TABLE role
  ADD PRIMARY KEY (role_id);
 
ALTER TABLE privilege
  ADD PRIMARY KEY (privilege_id);
 
ALTER TABLE user_role_membership
  ADD PRIMARY KEY (role_id, user_id);
 
ALTER TABLE role_privilege_mapping
  ADD PRIMARY KEY (role_id, privilege_id);
 
 
ALTER TABLE role
  ADD CONSTRAINT FK_role__role_role_group FOREIGN KEY (role_id_role_group) REFERENCES role(role_id) ON DELETE CASCADE ON UPDATE CASCADE;
 
 
ALTER TABLE user_role_membership
  ADD CONSTRAINT FK_user_role_membership__role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE user_role_membership
  ADD CONSTRAINT FK_user_role_membership__security_user FOREIGN KEY (user_id) REFERENCES security_user(user_id) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE role_privilege_mapping
  ADD CONSTRAINT FK_role_privilege_mapping__role FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE ON UPDATE CASCADE;ALTER TABLE role_privilege_mapping
  ADD CONSTRAINT FK_role_privilege_mapping__privilege FOREIGN KEY (privilege_id) REFERENCES privilege(privilege_id) ON DELETE CASCADE ON UPDATE CASCADE;
