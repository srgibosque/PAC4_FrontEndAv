import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CategoryDTO } from "../Models/category.dto";
import { PostDTO } from "../Models/post.dto";
import { PostService } from "./post.service";
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { deleteResponse } from "./post.service";
import { updateResponse } from "./post.service";

const postsList: PostDTO[] = [
  {
    postId: '1',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [new CategoryDTO('cat1', '', '')],
    userId: '1',
    userAlias: '',
  },
  {
    postId: '2',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [new CategoryDTO('cat1', '', '')],
    userId: '1',
    userAlias: '',
  },
  {
    postId: '3',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [new CategoryDTO('cat1', '', '')],
    userId: '2',
    userAlias: '',
  },
];

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and get all posts', () => {
    service.getPosts().subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postsList);
    });
    
    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('GET');

    req.flush(postsList);
  });

  it('GET method and get all posts with the same user id', () => {
    const filteredPosts = postsList.filter(post => post.userId === '1');

    service.getPostsByUserId('1').subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(filteredPosts);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/posts/1');
    expect(req.request.method).toBe('GET');

    req.flush(filteredPosts);
  });

  it('POST method and create a post', () => {
    const post: PostDTO = {
      postId: '4',
      title: '',
      description: '',
      num_likes: 0,
      num_dislikes: 0,
      publication_date: new Date(),
      categories: [new CategoryDTO('cat1', '', '')],
      userId: '1',
      userAlias: '',
    };

    service.createPost(post).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(post);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(post);

    req.flush(post);
  });

  it('GET method and get a single post', () => {
    const post: PostDTO | undefined = postsList.find(post => post.postId === '1');

    if(post){
      service.getPostById('1').subscribe((resp: PostDTO) => {
        expect(resp).toEqual(post);
      });
  
      const req = httpMock.expectOne('http://localhost:3000/posts/1');
      expect(req.request.method).toBe('GET');
  
      req.flush(post);
    }

  });

  it('PUT method and update an existing post', () => {
    let post: PostDTO = {
      postId: '1',
      title: 'New title',
      description: '',
      num_likes: 0,
      num_dislikes: 0,
      publication_date: new Date(),
      categories: [new CategoryDTO('cat1', '', '')],
      userId: '1',
      userAlias: '',
    }
    service.updatePost('1', post).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(post);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(post);

    req.flush(post);
  });

  it('DELETE method and delete and existing post', () => {
    service.deletePost('1').subscribe((resp: deleteResponse) => {
      expect(resp.affected).toEqual(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/1');
    expect(req.request.method).toBe('DELETE');

    req.flush({affected: 1});
  });

  it('PUT method and increment the number of likes of a post by 1', () => {
    service.likePost('1').subscribe((resp: updateResponse) => {
      expect(resp.affected).toEqual(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/like/1');
    expect(req.request.method).toBe('PUT');

    req.flush({affected: 1});
  });

  it('PUT method and increment the number of dislikes of a post by 1', () => {
    service.dislikePost('1').subscribe((resp: updateResponse) => {
      expect(resp.affected).toEqual(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/posts/dislike/1');
    expect(req.request.method).toBe('PUT');

    req.flush({affected: 1});
  });
});