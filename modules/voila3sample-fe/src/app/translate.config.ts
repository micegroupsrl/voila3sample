import { Observable } from 'rxjs';
import { TranslateLoader, TranslateService } from '@micegroup/voila2-translate-ng';

export class LazyTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return TranslateService.getTranslationsFiles(I18NFiles(lang));
    }
}

export function I18NFiles(lang: string) {
    return [import(`../assets/i18n/${lang}.json`), import(`../app/pages/assets/i18n/${lang}.json`)];
}
