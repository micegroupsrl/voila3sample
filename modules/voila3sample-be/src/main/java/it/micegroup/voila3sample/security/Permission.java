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

  /// CategoriaOrdine
  public static final int CATEGORIA_ORDINE_SEARCH = 55060;
  public static final int CATEGORIA_ORDINE_READ = 55061;
  public static final int CATEGORIA_ORDINE_CREATE = 55062;
  public static final int CATEGORIA_ORDINE_UPDATE = 55063;
  public static final int CATEGORIA_ORDINE_DELETE = 55064;
  public static final int CATEGORIA_ORDINE_REPORT = 55065;

  /// StatoOrdine
  public static final int STATO_ORDINE_SEARCH = 62630;
  public static final int STATO_ORDINE_READ = 62631;
  public static final int STATO_ORDINE_CREATE = 62632;
  public static final int STATO_ORDINE_UPDATE = 62633;
  public static final int STATO_ORDINE_DELETE = 62634;
  public static final int STATO_ORDINE_REPORT = 62635;

  /// Ordine
  public static final int ORDINE_SEARCH = 66660;
  public static final int ORDINE_READ = 66661;
  public static final int ORDINE_CREATE = 66662;
  public static final int ORDINE_UPDATE = 66663;
  public static final int ORDINE_DELETE = 66664;
  public static final int ORDINE_REPORT = 66665;

  /// Cliente
  public static final int CLIENTE_SEARCH = 07170;
  public static final int CLIENTE_READ = 07171;
  public static final int CLIENTE_CREATE = 07172;
  public static final int CLIENTE_UPDATE = 07173;
  public static final int CLIENTE_DELETE = 07174;
  public static final int CLIENTE_REPORT = 07175;

  /// Persona
  public static final int PERSONA_SEARCH = 44770;
  public static final int PERSONA_READ = 44771;
  public static final int PERSONA_CREATE = 44772;
  public static final int PERSONA_UPDATE = 44773;
  public static final int PERSONA_DELETE = 44774;
  public static final int PERSONA_REPORT = 44775;

  /// RigaOrdine
  public static final int RIGA_ORDINE_SEARCH = 39710;
  public static final int RIGA_ORDINE_READ = 39711;
  public static final int RIGA_ORDINE_CREATE = 39712;
  public static final int RIGA_ORDINE_UPDATE = 39713;
  public static final int RIGA_ORDINE_DELETE = 39714;
  public static final int RIGA_ORDINE_REPORT = 39715;

  /// Prodotto
  public static final int PRODOTTO_SEARCH = 84080;
  public static final int PRODOTTO_READ = 84081;
  public static final int PRODOTTO_CREATE = 84082;
  public static final int PRODOTTO_UPDATE = 84083;
  public static final int PRODOTTO_DELETE = 84084;
  public static final int PRODOTTO_REPORT = 84085;

  /// TipoOrdine
  public static final int TIPO_ORDINE_SEARCH = 60950;
  public static final int TIPO_ORDINE_READ = 60951;
  public static final int TIPO_ORDINE_CREATE = 60952;
  public static final int TIPO_ORDINE_UPDATE = 60953;
  public static final int TIPO_ORDINE_DELETE = 60954;
  public static final int TIPO_ORDINE_REPORT = 60955;

  /// Fornitore
  public static final int FORNITORE_SEARCH = 29180;
  public static final int FORNITORE_READ = 29181;
  public static final int FORNITORE_CREATE = 29182;
  public static final int FORNITORE_UPDATE = 29183;
  public static final int FORNITORE_DELETE = 29184;
  public static final int FORNITORE_REPORT = 29185;

  private Permission() {
    // void method
  }
}
