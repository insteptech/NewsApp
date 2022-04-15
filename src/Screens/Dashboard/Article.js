import React from 'react';
import {ActivityIndicator} from 'react-native';

import {WebView} from 'react-native-webview';

export default function Article(props) {
  const {navigation, route} = props;

  const article = route.params.article;
  const title = route.params.title;

  //==================================================================================================

  return (
    <WebView
      source={{uri: article.url}}
      startInLoadingState={true}
      onError={() => alert('Failed to load article.')}
      renderLoading={() => <ActivityIndicator style={{paddingVertical: 8}} />}
    />
  );
}
