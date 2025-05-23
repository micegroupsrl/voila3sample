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
('55060', 'CATEGORIA_ORDINE_SEARCH', '55060'),
('55061', 'CATEGORIA_ORDINE_READ', '55061'),
('55062', 'CATEGORIA_ORDINE_CREATE', '55062'),
('55063', 'CATEGORIA_ORDINE_UPDATE', '55063'),
('55064', 'CATEGORIA_ORDINE_DELETE', '55064'),
('55065', 'CATEGORIA_ORDINE_REPORT', '55065');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('55060', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('55061', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('55060', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('55061', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('55062', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('55063', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('55064', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('55065', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('55063495', 'CATEGORIA_ORDINE_FIND_BY_THE_TIPO_ORDINE_OBJECT_KEY' , '55063495');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('55063495', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('55063495', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('62630', 'STATO_ORDINE_SEARCH', '62630'),
('62631', 'STATO_ORDINE_READ', '62631'),
('62632', 'STATO_ORDINE_CREATE', '62632'),
('62633', 'STATO_ORDINE_UPDATE', '62633'),
('62634', 'STATO_ORDINE_DELETE', '62634'),
('62635', 'STATO_ORDINE_REPORT', '62635');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('62630', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('62631', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('62630', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('62631', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('62632', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('62633', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('62634', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('62635', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('62638366', 'STATO_ORDINE_FIND_BY_THE_ORDINE_OBJECT_KEY' , '62638366');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('62638366', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('62638366', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('66660', 'ORDINE_SEARCH', '66660'),
('66661', 'ORDINE_READ', '66661'),
('66662', 'ORDINE_CREATE', '66662'),
('66663', 'ORDINE_UPDATE', '66663'),
('66664', 'ORDINE_DELETE', '66664'),
('66665', 'ORDINE_REPORT', '66665');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('66660', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('66661', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('66660', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('66661', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('66662', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('66663', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('66664', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('66665', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('66668363', 'ORDINE_FIND_BY_STATO_ORDINE' , '66668363');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('66668363', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('66668363', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('66662495', 'ORDINE_FIND_BY_TIPO_ORDINE' , '66662495');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('66662495', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('66662495', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('66661317', 'ORDINE_FIND_BY_CLIENTE' , '66661317');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('66661317', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('66661317', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('66662301', 'ORDINE_FIND_BY_ORDINE_AGGREGATO' , '66662301');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('66662301', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('66662301', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('66669871', 'ORDINE_FIND_BY_THE_RIGA_ORDINE_OBJECT_KEY' , '66669871');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('66669871', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('66669871', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('66662302', 'ORDINE_FIND_BY_THE_ORDINE_FIGLIO_OBJECT_KEY' , '66662302');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('66662302', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('66662302', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('07170', 'CLIENTE_SEARCH', '07170'),
('07171', 'CLIENTE_READ', '07171'),
('07172', 'CLIENTE_CREATE', '07172'),
('07173', 'CLIENTE_UPDATE', '07173'),
('07174', 'CLIENTE_DELETE', '07174'),
('07175', 'CLIENTE_REPORT', '07175');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('07170', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('07171', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('07170', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('07171', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('07172', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('07173', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('07174', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('07175', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('07171366', 'CLIENTE_FIND_BY_THE_ORDINE_OBJECT_KEY' , '07171366');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('07171366', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('07171366', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('44770', 'PERSONA_SEARCH', '44770'),
('44771', 'PERSONA_READ', '44771'),
('44772', 'PERSONA_CREATE', '44772'),
('44773', 'PERSONA_UPDATE', '44773'),
('44774', 'PERSONA_DELETE', '44774'),
('44775', 'PERSONA_REPORT', '44775');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('44770', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('44771', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('44770', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('44771', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('44772', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('44773', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('44774', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('44775', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');



INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('39710', 'RIGA_ORDINE_SEARCH', '39710'),
('39711', 'RIGA_ORDINE_READ', '39711'),
('39712', 'RIGA_ORDINE_CREATE', '39712'),
('39713', 'RIGA_ORDINE_UPDATE', '39713'),
('39714', 'RIGA_ORDINE_DELETE', '39714'),
('39715', 'RIGA_ORDINE_REPORT', '39715');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('39710', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('39711', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('39710', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('39711', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('39712', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('39713', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('39714', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('39715', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('39719866', 'RIGA_ORDINE_FIND_BY_ORDINE' , '39719866');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('39719866', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('39719866', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('39711808', 'RIGA_ORDINE_FIND_BY_PRODOTTO' , '39711808');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('39711808', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('39711808', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('84080', 'PRODOTTO_SEARCH', '84080'),
('84081', 'PRODOTTO_READ', '84081'),
('84082', 'PRODOTTO_CREATE', '84082'),
('84083', 'PRODOTTO_UPDATE', '84083'),
('84084', 'PRODOTTO_DELETE', '84084'),
('84085', 'PRODOTTO_REPORT', '84085');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('84080', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('84081', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('84080', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('84081', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('84082', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('84083', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('84084', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('84085', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('84081218', 'PRODOTTO_FIND_BY_FORNITORE' , '84081218');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('84081218', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('84081218', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('84081871', 'PRODOTTO_FIND_BY_THE_RIGA_ORDINE_OBJECT_KEY' , '84081871');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('84081871', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('84081871', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('60950', 'TIPO_ORDINE_SEARCH', '60950'),
('60951', 'TIPO_ORDINE_READ', '60951'),
('60952', 'TIPO_ORDINE_CREATE', '60952'),
('60953', 'TIPO_ORDINE_UPDATE', '60953'),
('60954', 'TIPO_ORDINE_DELETE', '60954'),
('60955', 'TIPO_ORDINE_REPORT', '60955');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('60950', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('60951', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('60950', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('60951', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('60952', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('60953', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('60954', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('60955', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES ('60953406', 'TIPO_ORDINE_FIND_BY_CATEGORIA_ORDINE' , '60953406');
INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('60953406', 'cfb65df7-9c94-439f-a2af-99e832d502d3'), 
('60953406', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('60952466', 'TIPO_ORDINE_FIND_BY_THE_ORDINE_OBJECT_KEY' , '60952466');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('60952466', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('60952466', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('29180', 'FORNITORE_SEARCH', '29180'),
('29181', 'FORNITORE_READ', '29181'),
('29182', 'FORNITORE_CREATE', '29182'),
('29183', 'FORNITORE_UPDATE', '29183'),
('29184', 'FORNITORE_DELETE', '29184'),
('29185', 'FORNITORE_REPORT', '29185');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('29180', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('29181', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('29180', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('29181', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('29182', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('29183', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('29184', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('29185', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');


INSERT INTO `privilege` (`privilege_id`, `description`, `name`) VALUES
('29181208', 'FORNITORE_FIND_BY_THE_PRODOTTO_OBJECT_KEY' , '29181208');

INSERT INTO `role_privilege_mapping` (`privilege_id`, `role_id`) VALUES
('29181208', 'cfb65df7-9c94-439f-a2af-99e832d502d3'),
('29181208', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

