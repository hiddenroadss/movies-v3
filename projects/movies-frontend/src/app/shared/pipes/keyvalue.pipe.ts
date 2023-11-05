import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalue',
  standalone: true
})
export class KeyvaluePipe implements PipeTransform {

  transform(obj: Object): KeyValue<string, any>[] {
    return Object.entries(obj).map(([key, value]) => ({key, value}));
  }

}
