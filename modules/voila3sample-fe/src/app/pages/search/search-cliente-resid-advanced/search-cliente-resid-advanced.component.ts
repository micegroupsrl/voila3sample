import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

import { ClienteGroupApiService } from 'src/app/pages/services/services-cliente/cliente-group-api.service';
import { BaseSearchResidAdvancedComponent } from 'src/app/shared/base/base.search-resid-advanced.component';

@Component({
    selector: 'app-search-cliente-resid-advanced',
    templateUrl: './search-cliente-resid-advanced.component.html',
    styleUrls: ['./search-cliente-resid-advanced.component.scss']
})
export class SearchClienteResidAdvancedComponent extends BaseSearchResidAdvancedComponent implements OnInit {
    override attributeList = [
        // Definition of the object's list that will be used for build the filter
        { name: 'idPersona.idPersona', type: 'number', api: ['minoreDi', 'uguale', 'maggioreDi'], parent: 'idPersona' },
        { name: 'idPersona.cf', type: 'string', api: ['contiene'], parent: 'cf' },
        { name: 'punti', type: 'number', api: ['minoreDi', 'uguale', 'maggioreDi'] },
        { name: 'nome', type: 'string', api: ['contiene'] },
        { name: 'cognome', type: 'string', api: ['contiene'] },
        { name: 'email', type: 'string', api: ['contiene'] },
        { name: 'telefono', type: 'string', api: ['contiene'] }
    ];

    constructor(
        public clienteDialogRef: MatDialogRef<SearchClienteResidAdvancedComponent>,
        private clienteGroupApiService: ClienteGroupApiService,
        private clienteFb: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        public override dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public override data: any
    ) {
        super(clienteDialogRef, clienteFb, changeDetector, dialog, data);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
    }

    // Get the filter value and define when get them
    public getFilter(): any {
        const searchCliente = this.searchForm.value;
        if (!searchCliente) {
            return null;
        }

        const filters = this.filtersFormArray;
        let filterBuild = new FilterBuilder();

        for (let i = 0; i < filters.length; i++) {
            const { filterType, apiType, orAnd, value } = this.getFilterGroupAtIndex(i).value;
            filterBuild = this.apiTypeSwitchCase(filterBuild, filterType, apiType, orAnd, value);
        }
        return filterBuild.value();
    }
    public apiTypeSwitchCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder {
        switch (apiType) {
            case 'contiene':
                filterBuild[orAnd ? 'andLike' : 'orLike'](filterType, value);
                break;
            case 'minoreDi':
            case 'precedenteA':
                filterBuild[orAnd ? 'andLessOrEqual' : 'orLessOrEqual'](filterType, value);
                break;
            case 'maggioreDi':
            case 'successivaA':
                filterBuild[orAnd ? 'andGreaterOrEqual' : 'orGreaterOrEqual'](filterType, value);
                break;
            case 'uguale':
                filterBuild[orAnd ? 'andEquals' : 'orEquals'](filterType, value);

                break;
            default:
                break;
        }
        return filterBuild;
    }
}
