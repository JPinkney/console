import * as React from 'react';

import { ImpersonateNotifier } from './impersonate-notifier';
import { TemporaryAdminNotifier } from './temporary-admin-notifier';

export const GlobalNotifications = () => <div className="co-global-notifications">
  <ImpersonateNotifier />
  <TemporaryAdminNotifier />
</div>;
