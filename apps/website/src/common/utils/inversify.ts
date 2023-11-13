import { TYPES } from '../constants/types';
import { container } from '../configs/inversify.config';
import { IHttpService } from '../interfaces/interfaces';

const axiosService = container.get<IHttpService>(TYPES.IHttpService);

export { axiosService };
