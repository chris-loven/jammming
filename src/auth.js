// src/auth.js
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = process.env.REACT_APP_SPOTIFY_SCOPE ? process.env.REACT_APP_SPOTIFY_SCOPE.split(' ') : [];

console.log('env vars:');
console.log(clientId ? ('Client ID:', clientId) : ('Client ID not defined'));
console.log('Redirect URI:', redirectUri);
console.log('Scopes:', scopes);

export const getAuthUrl = () => {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const queryParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
    response_type: 'token',
    show_dialog: true,
  });

  return `${authEndpoint}?${queryParams.toString()}`;
};

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((acc, item) => {
      const parts = item.split('=');
      acc[parts[0]] = decodeURIComponent(parts[1]);
      return acc;
    }, {});
};
