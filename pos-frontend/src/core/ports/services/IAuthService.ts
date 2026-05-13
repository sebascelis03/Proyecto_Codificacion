// domain/ports/services/IAuthService.ts
// Port interface — no implementations here
import { AuthCredentials, AuthSession, MfaChallenge } from '../shared-types';

export interface IAuthService {
  login(credentials: AuthCredentials): Promise<AuthSession>;
  logout(sessionId: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthSession>;
  initiateMfa(userId: string): Promise<MfaChallenge>;
  verifyMfa(challengeId: string, code: string): Promise<AuthSession>;
  validatePin(userId: string, pin: string): Promise<boolean>;
}
