import { SetMetadata } from '@nestjs/common';
import { IGNORE_CACHING_META } from '../constants';

export const NoCache = () => SetMetadata(IGNORE_CACHING_META, true);
