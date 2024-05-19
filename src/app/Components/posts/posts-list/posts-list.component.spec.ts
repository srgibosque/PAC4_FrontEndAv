import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { PostsListComponent } from "./posts-list.component";
import { PostService } from "src/app/Services/post.service";
import { PostDTO } from "src/app/Models/post.dto";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { LocalStorageService } from "src/app/Services/local-storage.service";

class TemporalComponentForRoutes {}

describe('PostListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'user/category/:id', component: TemporalComponentForRoutes,}
         ])
      ],
      declarations: [PostsListComponent],
      providers: [
        PostService,
        LocalStorageService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('when loadPosts is called it calls the getPostsByUserId method on the service and returns the expected response', () => {
    const postService = fixture.debugElement.injector.get(PostService);
    const localStorageService = fixture.debugElement.injector.get(LocalStorageService);
    const postList: PostDTO[] = [];

    spyOn(localStorageService, 'get').and.returnValue('123');
    const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(of(postList));

    component['loadPosts']();

    expect(spy).toHaveBeenCalledWith('123');
    expect(component.posts.length).toBe(0);
  });

  it('should properly call navigateByUrl with the right argument when a post is CREATED', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.createPost();
    expect(spy).toHaveBeenCalledWith('/user/post/');
  });

  it('should properly call navigateByUrl with the right argument when a post is UPDATED', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    const postId = '123'
    component.updatePost(postId);
    expect(spy).toHaveBeenCalledWith('/user/post/' + postId);
  });
});