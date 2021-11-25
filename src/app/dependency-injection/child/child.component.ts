import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../modules/services/service.service';
import {ProductService} from '../../modules/services/product.service';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor(public ServiceService: ServiceService,
              private ProductService: ProductService) {
               this.ProductService.value = 'changed';
               }

  ngOnInit(){
    this.ServiceService.login()
  }

}
