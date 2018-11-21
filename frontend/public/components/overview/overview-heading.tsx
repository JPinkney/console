/* eslint-disable no-unused-vars, no-undef */

import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash-es';
import * as classnames from 'classnames';
import { Toolbar } from 'patternfly-react';

import { TextFilter } from '../factory';
import { K8sResourceKind } from '../../module/k8s';
import { ProjectModel } from '../../models';
import { UIActions } from '../../ui/ui-actions';
import {
  ActionsMenu,
  KebabAction,
  Dropdown,
} from '../utils';

import { OverviewPerspective } from './';
import { overviewMenuActions } from './namespace-overview';

const headingStateToProps = ({UI}): OverviewHeadingPropsFromState => {
  const selectedPerspective = UI.getIn(['overview', 'selectedPerspective']);
  return { selectedPerspective };
};

const headingDispatchToProps = (dispatch): OverviewHeadingPropsFromDispatch => ({
  selectView: (view: OverviewPerspective) => dispatch(UIActions.selectOverviewPerspective(view)),
});

const OverviewHeading_: React.SFC<OverviewHeadingProps> = ({disabled, firstLabel = '', groupOptions, handleFilterChange = _.noop, handleGroupChange = _.noop, selectedGroup = '', selectView, selectedPerspective, title, project}) => (
  <div className="co-m-nav-title co-m-nav-title--overview">
    {
      title &&
      <h1 className="co-m-pane__heading co-m-pane__heading--overview">
        <div className="co-m-pane__name co-m-pane__name--overview">{title}</div>
        <div className="toolbar-pf">
          <div className="form-group toolbar-pf-view-selector overview-view-selector">
            <button
              type="button"
              className={classnames('btn btn-link', { active: selectedPerspective === OverviewPerspective.Workloads })}
              aria-label="Resources"
              title="Resources"
              disabled={disabled}
              onClick={() => selectView(OverviewPerspective.Workloads)}
            >
              <i className="fa fa-list-ul" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={classnames('btn btn-link', { active: selectedPerspective === OverviewPerspective.NamespaceDashboard })}
              aria-label="Dashboard"
              title="Dashboard"
              disabled={disabled}
              onClick={() => selectView(OverviewPerspective.NamespaceDashboard)}
            >
              <i className="fa fa-dashboard" aria-hidden="true" />
            </button>
          </div>
        </div>
      </h1>
    }
    <Toolbar className="overview-toolbar">
      <Toolbar.RightContent>
        {selectedPerspective === OverviewPerspective.Workloads && <React.Fragment>
          <div className="form-group overview-toolbar__form-group">
            <label className="overview-toolbar__label co-no-bold">
              Group by
            </label>
            <Dropdown
              className="overview-toolbar__dropdown"
              disabled={disabled}
              items={groupOptions}
              onChange={handleGroupChange}
              title={groupOptions[selectedGroup]}
              spacerBefore={new Set([firstLabel])}
              headerBefore={{[firstLabel]: 'Label'}}
            />
          </div>
          <div className="form-group overview-toolbar__form-group">
            <div className="overview-toolbar__text-filter">
              <TextFilter
                autoFocus={!disabled}
                defaultValue={''}
                disabled={disabled}
                label="Resources by name"
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </React.Fragment>}
        {selectedPerspective === OverviewPerspective.NamespaceDashboard && !_.isEmpty(project) && <div className="form-group overview-toolbar__form-group">
          <ActionsMenu actions={overviewMenuActions.map((a: KebabAction) => a(ProjectModel, project))} />
        </div>}
      </Toolbar.RightContent>
    </Toolbar>
  </div>
);

export const OverviewHeading = connect<OverviewHeadingPropsFromState, OverviewHeadingPropsFromDispatch, OverviewHeadingOwnProps>(headingStateToProps, headingDispatchToProps)(OverviewHeading_);

type OverviewHeadingPropsFromState = {
  selectedPerspective: OverviewPerspective;
};

type OverviewHeadingPropsFromDispatch = {
  selectView: (view: OverviewPerspective) => void;
};

type OverviewHeadingOwnProps = {
  disabled?: boolean;
  firstLabel?: string;
  groupOptions?: any;
  handleFilterChange?: (event: any) => void;
  handleGroupChange?: (selectedLabel: string) => void;
  selectedGroup?: string;
  selectedPerspective?: OverviewPerspective;
  title: string;
  project: K8sResourceKind;
};

type OverviewHeadingProps = OverviewHeadingPropsFromState & OverviewHeadingPropsFromDispatch & OverviewHeadingOwnProps;
