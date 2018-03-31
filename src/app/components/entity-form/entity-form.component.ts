import { Component, Input, forwardRef, EventEmitter, Output, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import { queryFactory } from '../../advanced-search/queries';

@Component({
  selector: 'pou-entity-form',
  templateUrl: './entity-form.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EntityFormComponent),
    multi: true,
  }]
})
export class EntityFormComponent implements OnInit, ControlValueAccessor {

  @Input()
  type: string;
  @Input()
  selectedEntities: any[];
  @Output()
  toggleEntity = new EventEmitter();

  source$: Observable<any>;
  _value: string;
  singleType: string;
  propagateChange: any = () => { };

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.singleType = this.type.slice(0, this.type.length - 1);
  }

  writeValue(str: string) {
    this._value = str;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void { }

  onChange(event) {
    const search = event.target.value;
    this._value = search;
    this.propagateChange(this._value);
    this.source$ = this.apollo.query({ query: queryFactory(this.type), variables: { search } }).pluck('data').pluck(this.type);
  }

  onToggleEntity(entityId) {
    this._value = '';
    this.propagateChange(this._value);
    this.toggleEntity.emit({type: this.type, entityId});
  }



}
