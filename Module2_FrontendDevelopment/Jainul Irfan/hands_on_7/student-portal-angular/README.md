# Student Portal — Angular

A standalone Angular implementation of the Student Portal, covering components & data
binding, services & dependency injection, HttpClient, routing, and reactive forms.

## Structure

```
src/
  app/
    header/             -> top nav bar, shows student name, routerLink navigation
    course-list/         -> search box, loading state, renders course-card via *ngFor
    course-card/         -> presentational component, @Input() name/code/credits/grade
    student-profile/     -> Reactive Form (name, email, semester) with validation
    course.service.ts    -> injectable service, wraps HttpClient call, providedIn: 'root'
    app-routing.module.ts-> routes: '' -> CourseListComponent, 'profile' -> StudentProfileComponent
    app.module.ts         -> declares components, imports FormsModule/ReactiveFormsModule/HttpClientModule
```

## Setup

```bash
npm install -g @angular/cli
npm install
ng serve
```

Then open http://localhost:4200.

## What each task demonstrates

**Components & data binding**
- `CourseCardComponent` uses `@Input()` for `name`, `code`, `credits`, `grade`, rendered
  with `{{ }}` interpolation.
- `CourseListComponent` renders cards with `*ngFor` and `[(ngModel)]` two-way binds the
  search box to `searchTerm`. `FormsModule` is imported in `AppModule` for this.
- `*ngIf` shows "No courses found." when the filtered list is empty, and a spinner while
  `isLoading` is true.

**Services, DI & HttpClient**
- `CourseService` (`providedIn: 'root'`, so it's a singleton) injects `HttpClient` and
  exposes `getCourses()` as an `Observable<Course[]>`, calling the JSONPlaceholder API.
- `CourseListComponent` injects `CourseService` via its constructor and subscribes in
  `ngOnInit()`, unsubscribing in `ngOnDestroy()`.

**Routing & Reactive Forms**
- `app-routing.module.ts` defines `''` and `'profile'` routes; `app.component.html` hosts
  `<router-outlet>`; the header uses `[routerLink]` / `routerLinkActive`.
- `StudentProfileComponent` builds a `FormGroup` with `name` (required), `email`
  (required + email validator), `semester` (required, min 1, max 8), shows inline error
  messages once a field is touched, and disables Submit via `[disabled]="profileForm.invalid"`.

## Tests

```bash
ng test
```
