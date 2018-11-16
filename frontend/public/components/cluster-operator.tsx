import * as React from 'react';
import * as _ from 'lodash-es';

import { Conditions } from './conditions';
import { ColHead, DetailsPage, List, ListHeader, ListPage } from './factory';
import { Kebab, navFactory, ResourceKebab, SectionHeading, ResourceLink, ResourceSummary, Timestamp } from './utils';
import { ClusterOperatorModel } from '../models';
import { referenceForModel } from '../module/k8s';

const { common } = Kebab.factory;
const menuActions = [...common];

const Header = props => <ListHeader>
  <ColHead {...props} className="col-sm-4 col-xs-6" sortField="metadata.name">Name</ColHead>
  <ColHead {...props} className="col-sm-4 col-xs-6" sortField="metadata.namespace">Namespace</ColHead>
  <ColHead {...props} className="col-sm-4 hidden-xs" sortField="metadata.creationTimestamp">Created</ColHead>
</ListHeader>;

const kind = referenceForModel(ClusterOperatorModel);
const Row = ({obj}) => <div className="row co-resource-list__item">
  <div className="col-sm-4 col-xs-6">
    <ResourceLink kind={kind} name={obj.metadata.name} namespace={obj.metadata.namespace} />
  </div>
  <div className="col-sm-4 col-xs-6 co-break-word">
    <ResourceLink kind="Namespace" name={obj.metadata.namespace} />
  </div>
  <div className="col-sm-4 hidden-xs">
    <Timestamp timestamp={obj.metadata.creationTimestamp} />
  </div>
  <div className="co-kebab-wrapper">
    <ResourceKebab actions={menuActions} kind={kind} resource={obj} />
  </div>
</div>;

const Details = ({obj}) => <React.Fragment>
  <div className="co-m-pane__body">
    <SectionHeading text="ClusterOperator Overview" />
    <ResourceSummary resource={obj} showPodSelector={false} showNodeSelector={false} />
  </div>
  <div className="co-m-pane__body">
    <SectionHeading text="Conditions" />
    <Conditions conditions={_.get(obj, 'status.conditions')} />
  </div>
</React.Fragment>;

export const ClusterOperatorList = props => <List {...props} Header={Header} Row={Row} />;
export const ClusterOperatorPage = props => <ListPage {...props} ListComponent={ClusterOperatorList} kind={kind} canCreate={false} />;
export const ClusterOperatorDetailsPage = props => <DetailsPage
  {...props}
  menuActions={menuActions}
  pages={[navFactory.details(Details), navFactory.editYaml()]}
/>;
