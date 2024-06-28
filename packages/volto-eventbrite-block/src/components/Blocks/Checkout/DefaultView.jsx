import React, { useEffect, useState } from 'react';
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
  const align = data.align ? data.align : 'left';
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadScript(setLoaded);
    return () => {
      const wrapper = document.getElementById('tito-wrapper');
      if (wrapper) {
        const iframes = wrapper.querySelectorAll('iframe');
        iframes.forEach((element) => {
          element.remove();
        });
      }
    };
  }, [loaded]);

  useEffect(() => {
    if (loaded && typeof window !== 'undefined') {
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: eventId,
        modal: true,
        modalTriggerElementId: `eventbrite-widget-modal-trigger-${eventId}`,
      });
    }
  }, [loaded, eventId]);
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
          {eventId ? (
            <button
              id={`eventbrite-widget-modal-trigger-${eventId}`}
              className={`eventbrite-cta ${align}`}
              type="button"
            >
              {buttonText}
            </button>
          ) : (
            <span className={'placeholder'}>Eventbrite Checkout</span>
          )}
        </Container>
      ) : (
        !eventId && isEditMode && <Container>Loading</Container>
      )}
    </Container>
  );
};

export default CheckoutView;
