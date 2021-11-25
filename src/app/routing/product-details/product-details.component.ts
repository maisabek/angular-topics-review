import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from '../../modules/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  pageId: any;
  ProductContainer: any;
  constructor(private activateRoute: ActivatedRoute,private route: Router,
     private ProductService: ProductService) {
    this.getPageId();
    /*
    بعد ثانيتين ارجع للاكتف روت مترجعش للاول بايج
    لكن لو شيلت الاكسترا اللى هو
    {{relativeTo:this.activateRoute}
    هيرجع للاول

    setTimeout(()=>{
      this.route.navigate(['../'],{relativeTo:this.activateRoute});
    this.route.navigateByUrl('../',{relativeTo:this.activateRoute})
    },2000)
    this.ProductDetails();
    */
  }
   canDeactivate() {
     return false;
   }
   /*
   هنا احنا مش محتاجين الفنكشن انا
   عاملة على الكميونت دى  ريزولف فهخد الداتا من
   my data من activatedrout
   ProductDetails(){
     this.ProductService.getProduct(this.pageId).subscribe((product)=>{
          this.ProductContainer=product
     })
   }
  */
  ngOnInit() {
    setTimeout(() => {
      /*
      {skipLocationChange:true}
      يروح للمكان دة لوحدة وبتغير
   url المحتوى يعنى بتروح للصفحة دى من غير ما تغير فى ال
    */
        this.route.navigate(['/binding'], {skipLocationChange: true});
    }, 6000);
    console.log('activateRoute', this.activateRoute);
    this.activateRoute.data.subscribe((data) => {
      this.ProductContainer = data;
    });
  }

  goHome() {
    /*
    relative Path بدور من مكان ما انا واقف
    absolute Path بجيب من اول الروت لحد الحتة اللى واقفه فيها
    _______________________________________________________________
    navigateByUrl('')
    1- دى شغالة absolute path
    2- بتاخد الباص اللى هتروح لية وبتاخد باص واحد
    this.route.navigateByUrl('')
    this.router.navigateByUrl('')
    _____________________
    navigate
    1- دى شغالة relative path
    2- بتاخد اراى وممكن تاخد اكسترا زى
    {relativeTo:this.activateRoute}
    this.route.navigateByUrl('',{relativeTo:this.activateRoute})
    بتاخد اللينك تعمل علية
    procesess
    navigate ثم تعمل
    بستخدمها لما يبقى اللينك معقد يعنى مثلا فية
    id , queryparam
    this.route.navigate(['/binding'],{relativeTo:this.activateRoute});
    */
    this.route.navigate(['/binding'], {state: {data: 'hello'}});
  }
  getPageId() {
    /*
    params ==> is the observable,it's that stream of data that gives us new values
     هنا لأن الأنجولار هى اللى بتعملةunsubscribe مش محتاجة اعمل
    */
    this.activateRoute.params.subscribe((params) => {
      console.log(params);
      this.pageId = +params.id
    })
   }
   goToProductDetails(Id:any) {
    console.log(Id);
    this.route.navigate(['routing', Id]);
   }
/*
The router supports both styles with two LocationStrategy providers:
1- PathLocationStrategy—the default "HTML5 pushState" style.
2- HashLocationStrategy—the "hash URL" style.
*/

}
