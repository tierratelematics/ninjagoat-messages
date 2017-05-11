import {ITranslationsManager} from "ninjagoat-translations";


export class MockTranslationsManager implements ITranslationsManager {
    translate(key: string, fallback?: string): string {
        return null;
    }

}