import { Badge } from '../../enums/badge.enum';
import { Event } from '@server/utils';

export class BadgeAddedEvent extends Event<{ uid: string; badge: Badge }> {}
