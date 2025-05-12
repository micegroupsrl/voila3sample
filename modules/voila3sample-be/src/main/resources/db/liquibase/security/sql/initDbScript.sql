INSERT INTO security_user (username, email, password)
values ('admin','admin@email.it','$2a$10$Y52Ml4Yo/gC2w9FElU0ljOmKcnZvC7WM8LX48csdMJzgCGdw3cLNK');

INSERT INTO security_user (username, email, password)
values ('user','user@email.it','$2a$10$yGimO.xlYXKQUXaejwcpxeWEOidxQK41hHKyx/y9tC6DaDvumInh.');

INSERT INTO role(role_id, name)
values ('a0e054dc-ff85-4c6a-8c09-56c651ce1d2a', 'administrators');

INSERT INTO role(role_id, name)
values ('cfb65df7-9c94-439f-a2af-99e832d502d3', 'viewers');

INSERT INTO `user_role_membership` (`role_id`, `user_id`) VALUES
('a0e054dc-ff85-4c6a-8c09-56c651ce1d2a', 1);

INSERT INTO `user_role_membership` (`role_id`, `user_id`) VALUES
('cfb65df7-9c94-439f-a2af-99e832d502d3', 2);

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('64650', 'USER_SEARCH', '64650'),
('64651', 'USER_READ', '64651'),
('64652', 'USER_CREATE', '64652'),
('64653', 'USER_UPDATE', '64653'),
('64654', 'USER_DELETE', '64654'),
('64655', 'USER_REPORT', '64655');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('64650', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('64651', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('64652', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('64653', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('64654', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('64655', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('64654865', 'USER_FIND_BY_THE_ROLE_PER_USER_OBJECT_KEY' , '64654865');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('64654865', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('99650', 'ROLE_SEARCH', '99650'),
('99651', 'ROLE_READ', '99651'),
('99652', 'ROLE_CREATE', '99652'),
('99653', 'ROLE_UPDATE', '99653'),
('99654', 'ROLE_DELETE', '99654'),
('99655', 'ROLE_REPORT', '99655');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('99650', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('99651', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('99652', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('99653', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('99654', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('99655', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('99655101', 'ROLE_FIND_BY_ROLE_ROLE_GROUP' , '99655101');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('99655101', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('99656916', 'ROLE_FIND_BY_THE_PRIVILEGE_PER_ROLE_OBJECT_KEY' , '99656916');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('99656916', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('99655165', 'ROLE_FIND_BY_THE_ROLE_PER_USER_OBJECT_KEY' , '99655165');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('99655165', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('99655102', 'ROLE_FIND_BY_THE_ROLE_ROLE_CHILD_OBJECT_KEY' , '99655102');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('99655102', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('83650', 'PRIVILEGE_SEARCH', '83650'),
('83651', 'PRIVILEGE_READ', '83651'),
('83652', 'PRIVILEGE_CREATE', '83652'),
('83653', 'PRIVILEGE_UPDATE', '83653'),
('83654', 'PRIVILEGE_DELETE', '83654'),
('83655', 'PRIVILEGE_REPORT', '83655');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('83650', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('83651', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('83652', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('83653', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('83654', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('83655', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('83657516', 'PRIVILEGE_FIND_BY_THE_PRIVILEGE_PER_ROLE_OBJECT_KEY' , '83657516');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('83657516', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('97650', 'ROLE_PER_USER_SEARCH', '97650'),
('97651', 'ROLE_PER_USER_READ', '97651'),
('97652', 'ROLE_PER_USER_CREATE', '97652'),
('97653', 'ROLE_PER_USER_UPDATE', '97653'),
('97654', 'ROLE_PER_USER_DELETE', '97654'),
('97655', 'ROLE_PER_USER_REPORT', '97655');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('97650', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97651', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97652', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97653', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97654', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97655', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('97655165', 'ROLE_PER_USER_FIND_BY_ROLE' , '97655165');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('97655165', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('97654865', 'ROLE_PER_USER_FIND_BY_USER' , '97654865');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('97654865', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('97160', 'PRIVILEGE_PER_ROLE_SEARCH', '97160'),
('97161', 'PRIVILEGE_PER_ROLE_READ', '97161'),
('97162', 'PRIVILEGE_PER_ROLE_CREATE', '97162'),
('97163', 'PRIVILEGE_PER_ROLE_UPDATE', '97163'),
('97164', 'PRIVILEGE_PER_ROLE_DELETE', '97164'),
('97165', 'PRIVILEGE_PER_ROLE_REPORT', '97165');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('97160', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97161', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97162', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97163', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97164', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('97165', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('97166965', 'PRIVILEGE_PER_ROLE_FIND_BY_ROLE' , '97166965');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('97166965', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('97167565', 'PRIVILEGE_PER_ROLE_FIND_BY_PRIVILEGE' , '97167565');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('97167565', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('56790', 'ORDINE_SEARCH', '56790'),
('56791', 'ORDINE_READ', '56791'),
('56792', 'ORDINE_CREATE', '56792'),
('56793', 'ORDINE_UPDATE', '56793'),
('56794', 'ORDINE_DELETE', '56794'),
('56795', 'ORDINE_REPORT', '56795');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('56790', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('56791', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('56790', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('56791', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('56792', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('56793', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('56794', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('56795', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('56792346', 'ORDINE_FIND_BY_CLIENTE' , '56792346');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('56792346', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('56792346', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('56793964', 'ORDINE_FIND_BY_TIPO_ORDINE' , '56793964');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('56793964', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('56793964', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('56793801', 'ORDINE_FIND_BY_ORDINE_AGGREGATO' , '56793801');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('56793801', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('56793801', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('56795448', 'ORDINE_FIND_BY_THE_RIGA_ORDINE_OBJECT_KEY' , '56795448');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('56795448', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('56795448', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('56793802', 'ORDINE_FIND_BY_THE_ORDINE_FIGLIO_OBJECT_KEY' , '56793802');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('56793802', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('56793802', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('89460', 'CLIENTE_SEARCH', '89460'),
('89461', 'CLIENTE_READ', '89461'),
('89462', 'CLIENTE_CREATE', '89462'),
('89463', 'CLIENTE_UPDATE', '89463'),
('89464', 'CLIENTE_DELETE', '89464'),
('89465', 'CLIENTE_REPORT', '89465');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('89460', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89461', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89460', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89461', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89462', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89463', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89464', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89465', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('89462379', 'CLIENTE_FIND_BY_THE_ORDINE_OBJECT_KEY' , '89462379');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('89462379', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89462379', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('85280', 'PERSONA_SEARCH', '85280'),
('85281', 'PERSONA_READ', '85281'),
('85282', 'PERSONA_CREATE', '85282'),
('85283', 'PERSONA_UPDATE', '85283'),
('85284', 'PERSONA_DELETE', '85284'),
('85285', 'PERSONA_REPORT', '85285');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('85280', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('85281', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('85280', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('85281', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('85282', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('85283', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('85284', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('85285', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');



INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('89430', 'PRODOTTO_SEARCH', '89430'),
('89431', 'PRODOTTO_READ', '89431'),
('89432', 'PRODOTTO_CREATE', '89432'),
('89433', 'PRODOTTO_UPDATE', '89433'),
('89434', 'PRODOTTO_DELETE', '89434'),
('89435', 'PRODOTTO_REPORT', '89435');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('89430', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89431', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89430', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89431', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89432', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89433', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89434', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89435', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('89438648', 'PRODOTTO_FIND_BY_THE_RIGA_ORDINE_OBJECT_KEY' , '89438648');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('89438648', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89438648', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('89480', 'RIGA_ORDINE_SEARCH', '89480'),
('89481', 'RIGA_ORDINE_READ', '89481'),
('89482', 'RIGA_ORDINE_CREATE', '89482'),
('89483', 'RIGA_ORDINE_UPDATE', '89483'),
('89484', 'RIGA_ORDINE_DELETE', '89484'),
('89485', 'RIGA_ORDINE_REPORT', '89485');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('89480', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89481', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('89480', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89481', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89482', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89483', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89484', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('89485', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('89488643', 'RIGA_ORDINE_FIND_BY_PRODOTTO' , '89488643');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('89488643', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('89488643', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('89485479', 'RIGA_ORDINE_FIND_BY_ORDINE' , '89485479');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('89485479', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('89485479', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('18640', 'TIPO_ORDINE_SEARCH', '18640'),
('18641', 'TIPO_ORDINE_READ', '18641'),
('18642', 'TIPO_ORDINE_CREATE', '18642'),
('18643', 'TIPO_ORDINE_UPDATE', '18643'),
('18644', 'TIPO_ORDINE_DELETE', '18644'),
('18645', 'TIPO_ORDINE_REPORT', '18645');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('18640', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('18641', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('18640', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('18641', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('18642', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('18643', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('18644', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('18645', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('18643255', 'TIPO_ORDINE_FIND_BY_CATEGORIA_ORDINE' , '18643255');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('18643255', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('18643255', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('18643979', 'TIPO_ORDINE_FIND_BY_THE_ORDINE_OBJECT_KEY' , '18643979');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('18643979', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('18643979', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('34550', 'CATEGORIA_ORDINE_SEARCH', '34550'),
('34551', 'CATEGORIA_ORDINE_READ', '34551'),
('34552', 'CATEGORIA_ORDINE_CREATE', '34552'),
('34553', 'CATEGORIA_ORDINE_UPDATE', '34553'),
('34554', 'CATEGORIA_ORDINE_DELETE', '34554'),
('34555', 'CATEGORIA_ORDINE_REPORT', '34555');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('34550', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('34551', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('34550', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('34551', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('34552', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('34553', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('34554', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('34555', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('34553264', 'CATEGORIA_ORDINE_FIND_BY_THE_TIPO_ORDINE_OBJECT_KEY' , '34553264');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('34553264', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('34553264', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

