import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoriesListComponent } from "./categories-list.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CategoryService } from "src/app/Services/category.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { CategoryDTO } from "src/app/Models/category.dto";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { LocalStorageService } from "src/app/Services/local-storage.service";

class TemporalComponentForRoutes {}

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
         { path: 'user/category/:id', component: TemporalComponentForRoutes,}
        ])
      ],
      declarations: [CategoriesListComponent],
      providers: [
        CategoryService,
        LocalStorageService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('when loadCategories is called it calls the getCategoriesByUserId method on the service and returns the expected response', () => {
    const categoryService = fixture.debugElement.injector.get(CategoryService);
    const localStorageService = fixture.debugElement.injector.get(LocalStorageService);
    const categoryList: CategoryDTO[] = [];

    spyOn(localStorageService, 'get').and.returnValue('123');
    const spy = spyOn(categoryService, 'getCategoriesByUserId').and.returnValue(of(categoryList));

    component["loadCategories"]();

    expect(spy).toHaveBeenCalledWith('123');
    expect(component.categories.length).toBe(0);
  });

  it('should properly call navigateByUrl with the right argument when a category is CREATED', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.createCategory();
    expect(spy).toHaveBeenCalledWith('/user/category/');
  });

  it('should properly call navigateByUrl with the right argument when a category is UPDATED', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    const categoryId = '123';
    component.updateCategory(categoryId);
    expect(spy).toHaveBeenCalledWith('/user/category/' + categoryId);
  });
});