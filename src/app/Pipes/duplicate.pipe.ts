import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'duplicate',
})

export class DuplicatePipe implements PipeTransform{
  transform(value: number, ...args: number[]): number {
      return value * 2
  }
}