import { Component, Input, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-custom-renderer',
  templateUrl: './my-custom-renderer.component.html',
  styleUrls: ['./my-custom-renderer.component.scss']
})
export class MyCustomRendererComponent implements ICellRendererAngularComp {

 
  public params: any;
  public label: string | undefined;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || 'Click Me';
  }
  refresh(params: any): boolean { 
    this.params = params;
    return true;
  }

  onClick(event: any) {
    if (this.params.onClick instanceof Function) {
      this.params.onClick({
        event: event,
        rowData: this.params.node.data
      });
    }
  }
}
