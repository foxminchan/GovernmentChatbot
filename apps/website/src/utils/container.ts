import 'reflect-metadata';
import { Container } from 'inversify';
import HttpService from '../services/http.service';
import { IHttpService } from '../@types/interface';
import { TYPES } from '../@types/types';

const container = new Container();

container.bind<IHttpService>(TYPES.IHttpService).to(HttpService);

export { container };
