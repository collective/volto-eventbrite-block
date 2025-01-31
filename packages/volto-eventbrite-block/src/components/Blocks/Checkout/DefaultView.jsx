import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from '@plone/components';
import './styles.scss';

const loadScript = (callback) => {
  const widgetId = 'eventbritte-widget';
  const scriptSrc = `https://www.eventbrite.com/static/widgets/eb_widgets.js`;
  const existingScript = window.EBWidgets !== undefined;
  if (existingScript && callback) {
    callback(true);
  } else {
    if (callback) callback(false);
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.id = widgetId;
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback(true);
    };
  }
};

const CheckoutView = (props) => {
  const { isEditMode, data, className } = props;
  const { eventId, buttonText } = data;
  const isValidId = /^\d+$/.test(eventId);
  const align = data.align ? data.align : 'left';
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadScript(setLoaded);
  }, [loaded]);

  useEffect(() => {
    if (loaded && eventId && isValidId && typeof window !== 'undefined') {
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: eventId,
        modal: true,
        modalTriggerElementId: `eventbrite-widget-modal-trigger-${eventId}`,
      });
    }
  }, [loaded, isValidId, eventId]);
  return (
    <Container className={`block checkoutBlock ${className}`}>
      {loaded ? (
        <Container className={'wrapper'}>
          {data.fallbackURL && (
            <noscript>
              <a
                href={data.fallbackURL}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data.fallbackText}
              </a>
            </noscript>
          )}
          {eventId && isValidId ? (
            <button
              id={`eventbrite-widget-modal-trigger-${eventId}`}
              className={`eventbrite-cta ${align}`}
              type="button"
            >
              {buttonText}
            </button>
          ) : (
            <>
              <div className={'placeholder header'}>
                <FormattedMessage
                  id="Checkout Eventbrite"
                  defaultMessage="Checkout Eventbrite"
                />
              </div>
              <span className={'placeholder text'}>
                <FormattedMessage
                  id="Please, inform the Event ID"
                  defaultMessage="Please, inform the Event ID"
                />
              </span>
            </>
          )}
        </Container>
      ) : (
        !eventId && isEditMode && <Container>Loading</Container>
      )}
    </Container>
  );
};

export default CheckoutView;
