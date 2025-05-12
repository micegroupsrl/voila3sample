import { setPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { voila3samplePrivileges } from '../pages/privilege.enum';

export function buildPrivilegesEnum() {
    const privileges = { ...voila3samplePrivileges };
    setPrivilegesEnum(privileges);
}
