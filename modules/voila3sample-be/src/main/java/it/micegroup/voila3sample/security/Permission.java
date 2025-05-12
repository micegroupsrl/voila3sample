package it.micegroup.voila3sample.security;

import org.springframework.stereotype.Component;

@Component("permissionHolder")
public final class Permission {

	/// User
	public static final int USER_SEARCH = 64650;
	public static final int USER_READ = 64651;
	public static final int USER_CREATE = 64652;
	public static final int USER_UPDATE = 64653;
	public static final int USER_DELETE = 64654;
	public static final int USER_REPORT = 64655;

	/// Role
	public static final int ROLE_SEARCH = 99650;
	public static final int ROLE_READ = 99651;
	public static final int ROLE_CREATE = 99652;
	public static final int ROLE_UPDATE = 99653;
	public static final int ROLE_DELETE = 99654;
	public static final int ROLE_REPORT = 99655;

	/// Privilege
	public static final int PRIVILEGE_SEARCH = 83650;
	public static final int PRIVILEGE_READ = 83651;
	public static final int PRIVILEGE_CREATE = 83652;
	public static final int PRIVILEGE_UPDATE = 83653;
	public static final int PRIVILEGE_DELETE = 83654;
	public static final int PRIVILEGE_REPORT = 83655;

	/// RolePerUser
	public static final int ROLE_PER_USER_SEARCH = 97650;
	public static final int ROLE_PER_USER_READ = 97651;
	public static final int ROLE_PER_USER_CREATE = 97652;
	public static final int ROLE_PER_USER_UPDATE = 97653;
	public static final int ROLE_PER_USER_DELETE = 97654;
	public static final int ROLE_PER_USER_REPORT = 97655;

	/// PrivilegePerRole
	public static final int PRIVILEGE_PER_ROLE_SEARCH = 97160;
	public static final int PRIVILEGE_PER_ROLE_READ = 97161;
	public static final int PRIVILEGE_PER_ROLE_CREATE = 97162;
	public static final int PRIVILEGE_PER_ROLE_UPDATE = 97163;
	public static final int PRIVILEGE_PER_ROLE_DELETE = 97164;
	public static final int PRIVILEGE_PER_ROLE_REPORT = 97165;

	/// Ordine
	public static final int ORDINE_SEARCH = 56790;
	public static final int ORDINE_READ = 56791;
	public static final int ORDINE_CREATE = 56792;
	public static final int ORDINE_UPDATE = 56793;
	public static final int ORDINE_DELETE = 56794;
	public static final int ORDINE_REPORT = 56795;

	/// Cliente
	public static final int CLIENTE_SEARCH = 89460;
	public static final int CLIENTE_READ = 89461;
	public static final int CLIENTE_CREATE = 89462;
	public static final int CLIENTE_UPDATE = 89463;
	public static final int CLIENTE_DELETE = 89464;
	public static final int CLIENTE_REPORT = 89465;

	/// Persona
	public static final int PERSONA_SEARCH = 85280;
	public static final int PERSONA_READ = 85281;
	public static final int PERSONA_CREATE = 85282;
	public static final int PERSONA_UPDATE = 85283;
	public static final int PERSONA_DELETE = 85284;
	public static final int PERSONA_REPORT = 85285;

	/// Prodotto
	public static final int PRODOTTO_SEARCH = 89430;
	public static final int PRODOTTO_READ = 89431;
	public static final int PRODOTTO_CREATE = 89432;
	public static final int PRODOTTO_UPDATE = 89433;
	public static final int PRODOTTO_DELETE = 89434;
	public static final int PRODOTTO_REPORT = 89435;

	/// RigaOrdine
	public static final int RIGA_ORDINE_SEARCH = 89480;
	public static final int RIGA_ORDINE_READ = 89481;
	public static final int RIGA_ORDINE_CREATE = 89482;
	public static final int RIGA_ORDINE_UPDATE = 89483;
	public static final int RIGA_ORDINE_DELETE = 89484;
	public static final int RIGA_ORDINE_REPORT = 89485;

	/// TipoOrdine
	public static final int TIPO_ORDINE_SEARCH = 18640;
	public static final int TIPO_ORDINE_READ = 18641;
	public static final int TIPO_ORDINE_CREATE = 18642;
	public static final int TIPO_ORDINE_UPDATE = 18643;
	public static final int TIPO_ORDINE_DELETE = 18644;
	public static final int TIPO_ORDINE_REPORT = 18645;

	/// CategoriaOrdine
	public static final int CATEGORIA_ORDINE_SEARCH = 34550;
	public static final int CATEGORIA_ORDINE_READ = 34551;
	public static final int CATEGORIA_ORDINE_CREATE = 34552;
	public static final int CATEGORIA_ORDINE_UPDATE = 34553;
	public static final int CATEGORIA_ORDINE_DELETE = 34554;
	public static final int CATEGORIA_ORDINE_REPORT = 34555;

	private Permission() {
		// void method
	}
}
