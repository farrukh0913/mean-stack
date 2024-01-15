import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { CommunityPageComponent } from './community-page/community-page.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'homePage', component: HomePageComponent },
      { path: 'aboutPage', component: AboutPageComponent },
      { path: 'newsPage', component: NewsPageComponent },
      { path: 'communtyPage', component: CommunityPageComponent },
      { path: 'blogsPage', component: BlogsPageComponent },
      { path: 'pricingPage', component: PricingPageComponent },
      { path: 'profilePage', component: ProfilePageComponent },

    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
