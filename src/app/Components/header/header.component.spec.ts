import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: TemporalComponentForRoutes},
        ])
      ],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  // it('should navigate to home', () => {
  //   const router = TestBed.inject(Router);
  //   // check that the router is listening to the 'navigateByUrl' method
  //   const spy = spyOn(router, 'navigateByUrl')
  //   //execute the home() method
  //   component.home();
  //   //s'espera que es llanci un 'navigateByUrl' amb argument home
  //   expect(spy).toHaveBeenCalledWith('home');
  // });

});