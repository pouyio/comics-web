import { Pipe, PipeTransform } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { queryFactory } from '../advanced-search/queries';
import { pluck, map } from 'rxjs/operators';

@Pipe({
  name: 'entityResolver'
})
export class EntityResolverPipe implements PipeTransform {

  constructor(private apollo: Apollo) { }

  transform(value: string, type: string): Observable<string> {
    const query = queryFactory(type);

    return this.apollo.query({ query, variables: { id: value } })
      .pipe(
        pluck('data'),
        pluck(type),
        map((response: any) => {
          if (response.name) return response.name;
          if (response.first_name) return `${response.first_name} ${response.last_name}`;
          return 'not found';
        }));
  }

}
