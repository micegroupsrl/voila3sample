/**
 * * Get list for dropdown.
 *
 * @author Federico Gambardella<federico.gambardella@micegroup.it>
 * @param entityName
 * @param data
 * @param value
 * @param optionValue
 * @param label
 * @param optionLabel
 * @returns
 */
export function getListForDropdowns(data: any, value?: string, optionValue?: string, label?: string, optionLabel?: string): any {
    let list: any = data.content;
    const opLabel: string = optionLabel || 'objectTitle';
    const opValue: string = optionValue || 'objectKey';
    const labelValue: any = label || '';
    const valueToSend: any = value || null;
    let object = Object.assign({});
    object[opLabel] = labelValue;
    object[opValue] = valueToSend;
    list.unshift(object);
    return list;
}

export function getListForPopup(data: any): any {
    let list: any = data.content;
    return list;
}

// Metodi di libreria esterna riscritti
export function isInViewMode(pageStatus: string): boolean {
    if (pageStatus === 'view') {
        return true;
    }
    return false;
}

// Metodi di libreria esterna riscritti
export function isInViewEditMode(pageStatus: string): boolean {
    if (pageStatus === 'view' || pageStatus === 'edit') {
        return true;
    }
    return false;
}

export function isInNewMode(pageStatus: string): boolean {
    if (pageStatus === 'new') {
        return true;
    }
    return false;
}
