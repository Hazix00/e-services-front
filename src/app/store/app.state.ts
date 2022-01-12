import { WorkflowState } from './workflows/workflows.reducer';
import { RegisterState } from './auth/register/register.reducer';
import { LoginState } from './auth/login/login.reducer';
import { AuthState } from './auth/auth.reducer';
import { UserState } from './user/user.reducer';
import { FolderState } from './folders/folders.reducer';

export interface AppState {
  workflows: WorkflowState;
  register: RegisterState;
  login: LoginState;
  auth: AuthState;
  user: UserState;
  folders: FolderState;
}
