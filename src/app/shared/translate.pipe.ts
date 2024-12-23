import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: "translates", pure: false })
export class TranslatePipe implements PipeTransform {
    constructor() { }

    transform(translation: any, attributeName: string): string {
        const currentLanaguage = localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE");
        return currentLanaguage == "ar" ? translation.translation[currentLanaguage][attributeName] : translation[attributeName];
    }
}
