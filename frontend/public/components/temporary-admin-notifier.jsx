import * as React from 'react';
import { connect } from 'react-redux';

import { usernameStateToProps } from '../ui/ui-reducers';

export const TemporaryAdminNotifier = connect(usernameStateToProps)(({username}) => {
  if (username === 'kube:admin') {
    return <div className="co-global-notification">
      <div className="co-global-notification__content">
        <p className="co-global-notification__text">
          <span className="text-uppercase co-global-notification__impersonate-kind">{`Temporary user ${username}`}</span> You are logged in as temporary cluster admin <span className="co-global-notification__impersonate-name">{username}</span>. Configure an identity provider for the cluster.
        </p>
      </div>
    </div>;
  }
  return null;
});
