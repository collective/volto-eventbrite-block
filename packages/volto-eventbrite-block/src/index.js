import { cloneDeep } from 'lodash';

// Checkout Block
import CheckoutEdit from './components/Blocks/Checkout/Edit';
import CheckoutView from './components/Blocks/Checkout/View';
import eventbriteSVG from './icons/eventbrite.svg';

const applyConfig = (config) => {
  config.blocks.blocksConfig.checkoutBlock = {
    id: 'checkoutBlock',
    title: 'Eventbrite Checkout',
    group: 'common',
    icon: eventbriteSVG,
    view: CheckoutView,
    edit: CheckoutEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    blockHasOwnFocusManagement: false,
  };
  // Array of local blocks ids
  const localBlocks = ['checkoutBlock'];

  // Add Blocks to gridBlock and accordionBlock
  // It's important to maintain the chain, and do not introduce pass by reference in
  // the internal `blocksConfig` object, so we clone the object to avoid this.
  ['__grid', 'gridBlock', 'accordion'].forEach((blockId) => {
    const block = config.blocks.blocksConfig[blockId];
    if (
      block !== undefined &&
      block.allowedBlocks !== undefined &&
      block.blocksConfig !== undefined
    ) {
      block.allowedBlocks = [...block.allowedBlocks, ...localBlocks];
      localBlocks.forEach((blockId) => {
        block.blocksConfig[blockId] = cloneDeep(
          config.blocks.blocksConfig[blockId],
        );
      });
    }
  });
  return config;
};

export default applyConfig;
