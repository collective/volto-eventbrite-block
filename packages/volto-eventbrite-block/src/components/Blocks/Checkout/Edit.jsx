import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { SidebarPortal } from '@plone/volto/components';

import CheckoutBlockData from './Data';
import CheckoutBlockView from './View';

const CheckoutBlockEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  return (
    <>
      <CheckoutBlockView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <CheckoutBlockData
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(CheckoutBlockEdit);
