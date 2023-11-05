import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue',
  standalone: true
})
export class KeyvaluePipe implements PipeTransform {

  transform(obj: Object): {key: string, value: string}[] {
    return Object.entries(obj).map(([key, value]) => ({key, value}));
  }

}
