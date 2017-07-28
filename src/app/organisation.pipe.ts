import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { Organisation } from './core/organisation/organisation';

@Pipe({
    name: 'organisationFilter'
})
@Injectable()
export class OrganisationPipe implements PipeTransform {
    transform(organisations: Organisation[], name: string): Organisation[] {
        return organisations.filter(org => org.name.indexOf(name) !== -1);
    }
}
