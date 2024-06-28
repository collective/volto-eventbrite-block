import React from 'react';
import { BlockDataForm } from '@plone/volto/components';
import { checkoutSchema } from './schema';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  buttonTextPlaceholder: {
    id: 'Buy tickets',
    defaultMessage: 'Buy tickets',
  },
  fallbackTextPlaceholder: {
    id: 'Buy Tickets on Eventbrite',
    defaultMessage: 'Buy Tickets on Eventbrite',
  },
});

const CheckoutBlockData = (props) => {
  const { data, block, onChangeBlock, blocksConfig, navRoot, contentType } =
    props;

  const intl = useIntl();
  const buttonTextPlaceholder = intl.formatMessage(
    messages.buttonTextPlaceholder,
  );
  const fallbackText = intl.formatMessage(messages.fallbackTextPlaceholder);
  data['buttonTextPlaceholder'] = data['buttonTextPlaceholder']
    ? data['buttonTextPlaceholder']
    : buttonTextPlaceholder;
  data['fallbackText'] = data['fallbackText']
    ? data['fallbackText']
    : buttonTextPlaceholder;
  const schema = checkoutSchema({
    ...props,
    intl,
    buttonTextPlaceholder,
    fallbackText,
  });
  const onChangeField = (id, value) => {
    onChangeBlock(block, {
      ...data,
      [id]: value,
    });
  };

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={onChangeField}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

export default CheckoutBlockData;
