import { Component } from '@angular/core';
import { ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss']
})
export class PricingPageComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  ngAfterViewInit(): void {
    const planBtns: NodeListOf<HTMLButtonElement> = this.el.nativeElement.querySelectorAll(".card-btn-parent button");
    const plans: NodeListOf<HTMLDivElement> = this.el.nativeElement.querySelectorAll(".card-body > div");

    planBtns.forEach(planBtn => {
      this.renderer.listen(planBtn, 'click', () => {
        this.removeClass();
        planBtn.classList.add("active");
        let btnVal = planBtn.getAttribute("id");
        let btnId = "#card-" + btnVal;
        this.el.nativeElement.querySelector(btnId).classList.add("active");
      });
    });
  }

  private removeClass() {
    const planBtns: NodeListOf<HTMLButtonElement> = this.el.nativeElement.querySelectorAll(".card-btn-parent button");
    const plans: NodeListOf<HTMLDivElement> = this.el.nativeElement.querySelectorAll(".card-body > div");

    planBtns.forEach(planBtn => {
      if (planBtn.classList.contains("active")) {
        planBtn.classList.remove("active");
      }
    });

    plans.forEach(plan => {
      if (plan.classList.contains("active")) {
        plan.classList.remove("active");
      }
    });
  }

}
