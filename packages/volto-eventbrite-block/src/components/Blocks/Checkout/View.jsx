import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import CheckoutView from './DefaultView';

const CheckoutBlockView = (props) => {
  const { data, isEditMode, className } = props;
  return (
    <CheckoutView data={data} isEditMode={isEditMode} className={className} />
  );
};

export default withBlockExtensions(CheckoutBlockView);
