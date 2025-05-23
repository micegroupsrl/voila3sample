import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user',
                loadChildren: () => import('./user/user.module').then(m => m.UserModule)
            },
            {
                path: 'role',
                loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
            },
            {
                path: 'privilege',
                loadChildren: () => import('./privilege/privilege.module').then(m => m.PrivilegeModule)
            },
            {
                path: 'role-per-user',
                loadChildren: () => import('./role-per-user/role-per-user.module').then(m => m.RolePerUserModule)
            },
            {
                path: 'privilege-per-role',
                loadChildren: () => import('./privilege-per-role/privilege-per-role.module').then(m => m.PrivilegePerRoleModule)
            },
            {
                path: 'categoria-ordine',
                loadChildren: () => import('./categoria-ordine/categoria-ordine.module').then(m => m.CategoriaOrdineModule)
            },
            {
                path: 'stato-ordine',
                loadChildren: () => import('./stato-ordine/stato-ordine.module').then(m => m.StatoOrdineModule)
            },
            {
                path: 'ordine',
                loadChildren: () => import('./ordine/ordine.module').then(m => m.OrdineModule)
            },
            {
                path: 'cliente',
                loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
            },
            {
                path: 'riga-ordine',
                loadChildren: () => import('./riga-ordine/riga-ordine.module').then(m => m.RigaOrdineModule)
            },
            {
                path: 'prodotto',
                loadChildren: () => import('./prodotto/prodotto.module').then(m => m.ProdottoModule)
            },
            {
                path: 'tipo-ordine',
                loadChildren: () => import('./tipo-ordine/tipo-ordine.module').then(m => m.TipoOrdineModule)
            },
            {
                path: 'fornitore',
                loadChildren: () => import('./fornitore/fornitore.module').then(m => m.FornitoreModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Voila3sampleRoutingModule {}
