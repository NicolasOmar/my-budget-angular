import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
// MODULES
import { SharedModule } from '@shared/shared.module';
// COMPONENTS
import { SignUpComponent } from './sign-up.component';
// SERVICES
import { AuthService } from '@auth/services/auth.service';
import { MessageService } from '@shared/services/message.service';
// MOCKS
import { AuthServiceMock } from '@mocks/services/auth-service.mock';
import { formInputs } from '@mocks/data/sign-up-data.mock';
import { newUserMock } from '@mocks/data/user-data.mock';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        FormBuilder,
        {
          provider: AuthService,
          useClass: AuthServiceMock
        },
        MessageService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formInputs = formInputs;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should fill form data and submit changes', () => {
    component.ngOnInit();
    component.signUpForm.patchValue(newUserMock);
    component.onSubmit();
    fixture.detectChanges();

    // expect(component.isLoading).toBeFalsy();
    expect(component.errorMsg).toBeNull();
  });

  it('should fire logIn function and nullify error message', () => {
    component.closeMessage();
    fixture.detectChanges();
    expect(component.errorMsg).toBeNull();
  });
});
