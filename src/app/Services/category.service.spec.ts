import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CategoryDTO } from "../Models/category.dto";
import { CategoryService } from "./category.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

const categoryList: CategoryDTO[] = [
  {
    userId: '',
    categoryId: '1',
    css_color: '',
    description: '',
    title: '',
  },
  {
    userId: '',
    categoryId: '2',
    css_color: '',
    description: '',
    title: '',
  },
  {
    userId: '',
    categoryId: '3',
    css_color: '',
    description: '',
    title: '',
  }
];

describe('CategoryService', () => {
  let service: CategoryService;
  // declaramos esta variable mock para no hacer peticiones reales
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  //Instàncies necessaries per a cada test del servei.
  beforeEach(() => {
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  //Després de cada test cal assegurar que no es llanci el següent mentres hi hagi peticions pendents
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and getCategoriesByUserId return a list of categories', () => {
    //cridem al servei, ens suscrivim a la resposta i comprovem que es igual a l'esperat
    service.getCategoriesByUserId('1').subscribe((resp: CategoryDTO[]) => {
      expect(resp).toEqual(categoryList);
    });

    //definim la petició mock a la url determinada
    const req = httpMock.expectOne('http://localhost:3000/users/categories/1');
    // verifiquem que es una crida GET
    expect(req.request.method).toBe('GET');

    //Llancem la petició, més aviat la simulem
    req.flush(categoryList);
  });

});