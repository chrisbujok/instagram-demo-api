import { Injectable } from '@nestjs/common';
import {
    CypherStatement,
    InjectCypher,
    InjectPersistenceManager,
    PersistenceManager,
    QuerySpecification
} from '@liberation-data/drivine';
import { User } from './ineterfaces/UserInterface';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
        @InjectCypher(__dirname, 'userByUsername') readonly userByUsername: CypherStatement,
        @InjectCypher(__dirname, 'userPhotos') readonly userPhotos: CypherStatement
    ) {}

    async findByUsername(username: string): Promise<User> {
        const spec = new QuerySpecification().withStatement(this.userByUsername).bind({ username });
        const user = await this.persistenceManager.query<User>(spec);

        return user[0];
    }

    async findUserPhotos(username: string): Promise<any> {
        const spec = new QuerySpecification().withStatement(this.userPhotos).bind({ username });
        return this.persistenceManager.query(spec);
    }
}
