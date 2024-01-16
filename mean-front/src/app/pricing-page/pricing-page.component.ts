import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { sharedService } from '../sharedServices/shared-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss'],
})
export class PricingPageComponent {
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef | any;
  stripe: any;
  showSuccsessMsg = false;
  card: any;
  price: string = '';
  productId: string = '';
  plan: string = '';
  cardHandler = this.onChange.bind(this);
  error: string = '';
  constructor(
    private sharedService: sharedService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: any) => {
      this.productId = params['plan'];
      this.price = params['price'];
      if (this.price === '60$') {
        this.plan = 'Basic';
      } else if (this.price === '120$') {
        this.plan = 'Standard';
      } else if (this.price === '180$') {
        this.plan = 'Permium';
      }
      console.log('this.productId: ', this.productId);
    });
  }
  ngAfterViewInit(): void {
    this.initializeStripe();
  }

  onChange(error: any) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = '';
    }

    // Trigger change detection
    this.cd.detectChanges();
  }

  async onSubmit(form: any) {
    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
    });

    if (error) {
      console.log('Error:', error);
    } else {
      this.sendPaymentMethodToServer({
        paymentMethodId: paymentMethod.id,
        priceId: this.productId,
        customerEmail: 'testStripe@gmail.com',
      });
      console.log('Success!', paymentMethod);
    }
  }

  async initializeStripe() {
    this.stripe = await loadStripe(
      'pk_test_51OZ9R5H0hyV9WvCf8OqOcrdL3k0OoFN8bIA12fWfrcT3KXjp9aTV2goSgizekN5dWRjF9HEQz6X4xGa4KP3EERU000bzaICDlJ'
    );

    // Create an instance of the card Element.
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  sendPaymentMethodToServer(body: any) {
    console.log('token: ', body);
    this.sharedService.paymentGateway(body).subscribe((res: any) => {
      console.log('res: ', res);
      if (res.subscriptionId) {
        this.showSuccsessMsg = true;
      }
    });
  }
}
