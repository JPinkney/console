import * as React from 'react';
import { connect } from 'react-redux';

import { userStateToProps } from '../ui/ui-reducers';
import { TEMPORARY_ADMIN } from '../const';

export const TemporaryAdminNotifier = connect(userStateToProps)((user) => {
  if (user.metadata.name !== TEMPORARY_ADMIN) {
    return null;
  }
  return <div className="co-global-notification">
    <div className="co-global-notification__content">
      <p className="co-global-notification__text">
        <span className="text-uppercase co-global-notification__impersonate-kind">{`Temporary user ${user.metadata.name}`}</span> You are logged in as temporary cluster admin <span className="co-global-notification__impersonate-name">{user.metadata.name}</span>. Configure an identity provider for the cluster.
      </p>
    </div>
  </div>;
});
