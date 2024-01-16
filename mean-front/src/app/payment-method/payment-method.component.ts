import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    const planBtns: NodeListOf<HTMLButtonElement> =
      this.el.nativeElement.querySelectorAll('.card-btn-parent button');
    const plans: NodeListOf<HTMLDivElement> =
      this.el.nativeElement.querySelectorAll('.card-body > div');

    planBtns.forEach((planBtn) => {
      this.renderer.listen(planBtn, 'click', () => {
        this.removeClass();
        planBtn.classList.add('active');
        let btnVal = planBtn.getAttribute('id');
        let btnId = '#card-' + btnVal;
        this.el.nativeElement.querySelector(btnId).classList.add('active');
      });
    });
  }

  private removeClass() {
    const planBtns: NodeListOf<HTMLButtonElement> =
      this.el.nativeElement.querySelectorAll('.card-btn-parent button');
    const plans: NodeListOf<HTMLDivElement> =
      this.el.nativeElement.querySelectorAll('.card-body > div');

    planBtns.forEach((planBtn) => {
      if (planBtn.classList.contains('active')) {
        planBtn.classList.remove('active');
      }
    });

    plans.forEach((plan) => {
      if (plan.classList.contains('active')) {
        plan.classList.remove('active');
      }
    });
  }

  checkProduct(plan: string, price: string) {
    const queryParams = { plan: plan, price: price };
    this.router.navigate(['home/paymentMethod'], { queryParams });
  }
}
