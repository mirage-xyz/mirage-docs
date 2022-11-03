import TagManager from 'react-gtm-module';

const GTM_ID = '';

const tagManagerArgs = {
  gtmId: GTM_ID,
};

export function initGoogleGtm() {
  if (GTM_ID && navigator.userAgent !== 'ReactSnap') {
    TagManager.initialize(tagManagerArgs);
  }
}