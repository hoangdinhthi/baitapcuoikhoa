import * as React from 'react';
export const navigationRef = React.createRef();

export function navigate(routeName, params = {}) {
  navigationRef.current.navigate(routeName, params);
}

export function replace(routeName, params = {}) {
  navigationRef.current.replace(routeName, params);
}

export function goBack() {
  navigationRef.current.goBack();
}
