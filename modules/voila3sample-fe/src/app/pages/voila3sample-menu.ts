import { getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { MenuElement } from 'src/app/shared/base/base.menu-element';
const Privileges = getPrivilegesEnum();

export const MENU_MS_VOILA3SAMPLE: MenuElement[] = [
    /**
     * You can define here all the menu voices and their icon, path ecc..
     */
    {
        label: 'voila3sample.detail.User.labels',
        expectedPrivilege: Privileges?.USER_SEARCH,
        // path: "/pages/voila3sample/user/list-user",
        path: '/pages/voila3sample/user/list-user',
        // basePath: "/pages/voila3sample/user/"
        basePath: '/user/',
        iconClass: 'list'
    },
    {
        label: 'voila3sample.detail.Role.labels',
        expectedPrivilege: Privileges?.ROLE_SEARCH,
        // path: "/pages/voila3sample/role/list-role",
        path: '/pages/voila3sample/role/list-role',
        // basePath: "/pages/voila3sample/role/"
        basePath: '/role/',
        iconClass: 'list'
    },
    {
        label: 'voila3sample.detail.Privilege.labels',
        expectedPrivilege: Privileges?.PRIVILEGE_SEARCH,
        // path: "/pages/voila3sample/privilege/list-privilege",
        path: '/pages/voila3sample/privilege/list-privilege',
        // basePath: "/pages/voila3sample/privilege/"
        basePath: '/privilege/',
        iconClass: 'list'
    },
    // {
    //     label: 'voila3sample.detail.RolePerUser.labels',
    //     expectedPrivilege: Privileges?.ROLE_PER_USER_SEARCH,
    //     // path: "/pages/voila3sample/rolePerUser/list-rolePerUser",
    //     path: '/pages/voila3sample/role-per-user/list-role-per-user',
    //     // basePath: "/pages/voila3sample/rolePerUser/"
    //     basePath: '/rolePerUser/',
    //     iconClass: 'list'
    // },
    {
        label: 'voila3sample.detail.PrivilegePerRole.labels',
        expectedPrivilege: Privileges?.PRIVILEGE_PER_ROLE_SEARCH,
        // path: "/pages/voila3sample/privilegePerRole/list-privilegePerRole",
        path: '/pages/voila3sample/privilege-per-role/list-privilege-per-role',
        // basePath: "/pages/voila3sample/privilegePerRole/"
        basePath: '/privilegePerRole/',
        iconClass: 'list'
    },
    {
        label: 'voila3sample.detail.Ordine.labels',
        expectedPrivilege: Privileges?.ORDINE_SEARCH,
        // path: "/pages/voila3sample/ordine/list-ordine",
        path: '/pages/voila3sample/ordine/list-ordine',
        // basePath: "/pages/voila3sample/ordine/"
        basePath: '/ordine/',
        iconClass: 'list'
    },
    {
        label: 'voila3sample.detail.Cliente.labels',
        expectedPrivilege: Privileges?.CLIENTE_SEARCH,
        // path: "/pages/voila3sample/cliente/list-cliente",
        path: '/pages/voila3sample/cliente/list-cliente',
        // basePath: "/pages/voila3sample/cliente/"
        basePath: '/cliente/',
        iconClass: 'list'
    },
    {
        label: 'voila3sample.detail.Prodotto.labels',
        expectedPrivilege: Privileges?.PRODOTTO_SEARCH,
        // path: "/pages/voila3sample/prodotto/list-prodotto",
        path: '/pages/voila3sample/prodotto/list-prodotto',
        // basePath: "/pages/voila3sample/prodotto/"
        basePath: '/prodotto/',
        iconClass: 'list'
    },
    // {
    //     label: 'voila3sample.detail.RigaOrdine.labels',
    //     expectedPrivilege: Privileges?.RIGA_ORDINE_SEARCH,
    //     // path: "/pages/voila3sample/rigaOrdine/list-rigaOrdine",
    //     path: '/pages/voila3sample/riga-ordine/list-riga-ordine',
    //     // basePath: "/pages/voila3sample/rigaOrdine/"
    //     basePath: '/rigaOrdine/',
    //     iconClass: 'list'
    // },
    {
        label: 'voila3sample.detail.TipoOrdine.labels',
        expectedPrivilege: Privileges?.TIPO_ORDINE_SEARCH,
        // path: "/pages/voila3sample/tipoOrdine/list-tipoOrdine",
        path: '/pages/voila3sample/tipo-ordine/list-tipo-ordine',
        // basePath: "/pages/voila3sample/tipoOrdine/"
        basePath: '/tipoOrdine/',
        iconClass: 'list'
    },
    // {
    //     label: 'voila3sample.detail.CategoriaOrdine.labels',
    //     expectedPrivilege: Privileges?.CATEGORIA_ORDINE_SEARCH,
    //     // path: "/pages/voila3sample/categoriaOrdine/list-categoriaOrdine",
    //     path: '/pages/voila3sample/categoria-ordine/list-categoria-ordine',
    //     // basePath: "/pages/voila3sample/categoriaOrdine/"
    //     basePath: '/categoria-ordine/',
    //     iconClass: 'list'
    // }
];
