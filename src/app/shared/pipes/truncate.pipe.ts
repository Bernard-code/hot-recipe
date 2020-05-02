import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, args: number): any {
    return value.length > args ? value.slice(0, args) + '...' : value;
  }

}
