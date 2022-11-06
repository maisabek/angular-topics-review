import {Pipe, PipeTransform} from '@angular/core';
// What is the PipeTransform interface?
@Pipe({name:'defaultImage'})
export class DefaultImage implements PipeTransform {
    transform(imageUrl: string, placeholder: string, forceHttp: boolean= false){

    let image = imageUrl ? imageUrl : placeholder
    if (forceHttp){
        if (image.indexOf('https') === -1) {
           console.log('https not found')
           image = image.replace('http', 'https')
       }
    }
    return image
}
}
