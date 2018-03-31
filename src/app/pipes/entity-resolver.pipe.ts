import { Pipe, PipeTransform } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { queryFactory } from '../advanced-search/queries';

@Pipe({
  name: 'entityResolver'
})
export class EntityResolverPipe implements PipeTransform {

  constructor(private apollo: Apollo) { }

  transform(value: string, type: string): Observable<string> {
    const query = queryFactory(type);

    return this.apollo.query({ query, variables: { id: value } })
      .pluck('data')
      .pluck(type)
      .map((response: any) => {
        if (response.name) return response.name;
        if (response.first_name) return `${response.first_name} ${response.last_name}`
        return 'not found';
      });
  }

}
