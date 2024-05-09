import { PostService } from './../../Services/post.service';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostDTO } from 'src/app/Models/post.dto';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // it executes before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      // simulates API calls, used for testing purposes
      imports: [HttpClientTestingModule],
      // component to test
      declarations: [HomeComponent],
      //dependencies injected in the component's constructor
      providers: [PostService],
      // added to avoid errors
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
  });

  // before each test we instantiate the component
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // It's like executing the component instance in the ngOnInit
    fixture.detectChanges();
  });

  //TEST 1
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('loadPosts success from subscription', () => {
    //definition of the dependency service
    const postService = fixture.debugElement.injector.get(PostService);
    //creation of a mock list of posts
    const listPosts: PostDTO[] = [];
    // Spy to simulate the 'getPosts' method form the service
    // we indicate that it will return a list of posts. We use 'of' since it return an observable
    const spy = spyOn(postService, 'getPosts').and.returnValue(of(listPosts));
    // call the priced method 'loadPosts'
    component['loadPosts']();
    //we expect from the 'getPosts' method to be called
    expect(spy).toHaveBeenCalled();
    // we expect that the list of Posts have a number of posts of '0';
    expect(component.posts.length).toBe(0);
  });

});