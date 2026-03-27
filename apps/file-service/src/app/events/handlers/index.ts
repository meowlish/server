import { FileAddedHandler } from './file-added.handler';
import { FileRemovedHandler } from './files-removed.handler';

export const IntegrationEventHandlers = [FileAddedHandler, FileRemovedHandler];
