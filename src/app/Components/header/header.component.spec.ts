import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: TemporalComponentForRoutes},
          { path: 'dashboard', component: TemporalComponentForRoutes },
          { path: 'login', component: TemporalComponentForRoutes },
          { path: 'register', component: TemporalComponentForRoutes },
          { path: 'profile', component: TemporalComponentForRoutes },
          { path: 'posts', component: TemporalComponentForRoutes },
          { path: 'categories', component: TemporalComponentForRoutes }
          ])
        ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    // check that the router is listening to the 'navigateByUrl' method
    const spy = spyOn(router, 'navigateByUrl');
    //execute the navigationTo() method
    component.navigationTo('home');
    //s'espera que es llanci un 'navigateByUrl' amb argument home
    expect(spy).toHaveBeenCalledWith('home');
  });

  it('should navigate to dashboard', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigationTo('dashboard');
    expect(spy).toHaveBeenCalledWith('dashboard');
  });

  it('should navigate to login', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigationTo('login');
    expect(spy).toHaveBeenCalledWith('login');
  });

  it('should navigate to register', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigationTo('register');
    expect(spy).toHaveBeenCalledWith('register');
  });

  it('should navigate to profile', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigationTo('profile');
    expect(spy).toHaveBeenCalledWith('profile');
  });

  it('should navigate to adminPosts', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigationTo('posts');
    expect(spy).toHaveBeenCalledWith('posts');
  });

  it('should navigate to adminCategories', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.navigationTo('categories');
    expect(spy).toHaveBeenCalledWith('categories');
  });
});