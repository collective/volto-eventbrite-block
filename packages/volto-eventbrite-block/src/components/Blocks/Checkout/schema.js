import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Eventbrite Checkout',
    defaultMessage: 'Eventbrite Checkout',
  },
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  eventId: {
    id: 'Event ID',
    defaultMessage: 'Event ID',
  },
  buttonText: {
    id: 'Button CTA',
    defaultMessage: 'Button CTA',
  },
  buttonTextPlaceholder: {
    id: 'Buy tickets',
    defaultMessage: 'Buy tickets',
  },
  fallbackURL: {
    id: 'Fallback URL',
    defaultMessage: 'Fallback URL',
  },
  fallbackText: {
    id: 'Text',
    defaultMessage: 'Text',
  },
  fallbackTextPlaceholder: {
    id: 'Buy Tickets on Eventbrite',
    defaultMessage: 'Buy Tickets on Eventbrite',
  },
});

export const checkoutSchema = (props) => {
  const buttonTextPlaceholder = props.intl.formatMessage(
    messages.buttonTextPlaceholder,
  );
  const fallbackText = props.intl.formatMessage(
    messages.fallbackTextPlaceholder,
  );
  return {
    title: props.intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['eventId', 'buttonText', 'align'],
      },
      {
        id: 'fallback',
        title: 'fallback',
        fields: ['fallbackURL', 'fallbackText'],
      },
    ],
    properties: {
      eventId: {
        title: props.intl.formatMessage(messages.eventId),
      },
      buttonText: {
        title: props.intl.formatMessage(messages.buttonText),
        default: buttonTextPlaceholder,
      },
      align: {
        title: props.intl.formatMessage(messages.align),
        widget: 'align',
        actions: ['left', 'right', 'center'],
        default: 'left',
      },
      fallbackURL: {
        title: props.intl.formatMessage(messages.fallbackURL),
      },
      fallbackText: {
        title: props.intl.formatMessage(messages.fallbackText),
        default: fallbackText,
      },
    },
    required: ['eventId'],
  };
};
