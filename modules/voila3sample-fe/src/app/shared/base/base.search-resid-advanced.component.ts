import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, Inject } from '@angular/core';
import { FilterBuilder } from 'src/app/utilities/function/filter-builder';

@Component({
    selector: 'app-base-search-resid-advanced',
    templateUrl: 'base.search-resid-advanced.component.html',
    styleUrls: ['base.search-resid-advanced.component.scss']
})
export abstract class BaseSearchResidAdvancedComponent implements OnInit {
    typeSelected: any[] = [];
    attributeList!: any[];
    searchForm!: FormGroup;
    seedData!: FormArray<FormControl>;
    filters: any[] = [];

    constructor(
        public dialogRef: MatDialogRef<any>,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            this.seedData = data;
        }
    }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            filters: this.fb.array([])
        });
        this.seedFiltersFormArray();
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }

    get filtersFormArray() {
        return <FormArray>this.searchForm.get('filters');
    }

    createFilterGroup() {
        return this.fb.group({
            filterType: [],
            apiType: [],
            orAnd: true
        });
    }

    createFormGroup(data: any): FormGroup {
        return new FormGroup({
            filterType: new FormControl(data.filterType),
            apiType: new FormControl(data.apiType),
            orAnd: new FormControl(data.orAnd)
        });
    }

    seedFiltersFormArray() {
        if (this.seedData.length != 0) {
            this.searchForm.setControl('filters', this.fb.array(this.seedData.controls.map(control => this.fb.group(control.value))));
            this.seedData.value.map(element => this.typeSelected.push(this.attributeList.find(({ name }) => name === element.filterType)));
        }
    }

    /**
     * Add filter into an array.
     */
    addFilterToFiltersFormArray() {
        this.filtersFormArray.push(this.createFilterGroup());
    }

    /**
     * Remove the filter from the array.
     */
    removeFilterFromFiltersFormArray(index: number) {
        this.filtersFormArray.removeAt(index);
        this.typeSelected.splice(index, 1);
    }

    getFilterGroupAtIndex(index: number) {
        return <FormGroup>this.filtersFormArray.at(index);
    }

    getFormControl() {
        return this.fb.control(null);
    }

    /**
     * Get Api.
     */
    selectedAPIChanged(i: number) {
        this.getFilterGroupAtIndex(i).addControl('value', this.getFormControl());
    }

    /**
     * Set selection.
     */
    setSelected(selectedAttribute: any, i: number) {
        if (this.typeSelected[i] != null && this.typeSelected[i].type != selectedAttribute.type) {
            this.getFilterGroupAtIndex(i).get('value')?.setValue(null);
        }
        this.typeSelected[i] = selectedAttribute;
    }

    /**
     * Get type.
     */
    getTypeSelected(i: number) {
        return this.typeSelected[i];
    }

    /**
     * Clear the filter fields.
     */
    clear(): void {
        while (this.typeSelected.length !== 0) {
            this.removeFilterFromFiltersFormArray(0);
        }
    }

    /**
     * Close the filter dialog.
     */
    close(): void {
        this.dialogRef.close();
    }

    /**
     * Sumbit the filter values for the search.
     */
    onSubmit() {
        let result = {
            data: this.filtersFormArray,
            filter: this.getFilter()
        };
        this.dialogRef.close(result);
    }

    addListToAttribute(parentName: string, parentList: any) {
        const index = this.attributeList.findIndex(el => el.parent === parentName);
        this.attributeList[index].parentList = parentList;
    }

    abstract getFilter(): any;

    abstract apiTypeSwitchCase(filterBuild: FilterBuilder, filterType: string, apiType: string, orAnd: string, value: string): FilterBuilder;

    getSelectedDialogValue(i: number): any {
        return null;
    }

    openDialog(i: number): any {
        return null;
    }
}
