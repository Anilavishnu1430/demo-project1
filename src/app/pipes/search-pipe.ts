import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(item: any[], searchKey:string): any[] {

    let result:any[]=[]
    if(!item || !searchKey){
      return item
    }
    else{
      result = item.filter(item=>item.title.toLowerCase().trim().includes(searchKey.toLowerCase().trim()))
    }
    return result;
  }

}
