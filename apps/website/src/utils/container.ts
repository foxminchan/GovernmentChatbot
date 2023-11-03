import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '../@types/types';
import HttpService from '../services/http.service';
import { IHttpService } from '../@types/interfaces';

const container = new Container();

container.bind<IHttpService>(TYPES.IHttpService).to(HttpService);

export { container };
