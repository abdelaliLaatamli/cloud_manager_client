import { Observable } from 'rxjs';
import { InstanceDB } from './instance';

export interface InstallationResponse {
    code: number ;
    message: string ;
    db ? : Observable<InstanceDB>
}
