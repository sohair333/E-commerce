import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitter'
})
export class SplitterPipe implements PipeTransform {

  transform(input: any[], mod: number): any[][] {
    return input?.reduce((previous, next, index) => {
      if (index % mod === 0)
        previous.push([next]);
      else
        previous[previous.length - 1].push(next);
      return previous;
    }, <any[][]>[]);
  }

}
