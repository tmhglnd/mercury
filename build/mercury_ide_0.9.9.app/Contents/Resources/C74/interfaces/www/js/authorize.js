/* globals max */

var ERR_NONE = 0
var ERR_NOAUTHFILE = 1
var ERR_SIG_NOTVERIFIED = 2
var ERR_PARSE = 3
var ERR_PROCESS = 4
var ERR_GENERIC = 5
var ERR_FILETIMEOUT = 6
var ERR_LICENSETIMEOUT = 7
var ERR_CONNECTIONERR = 8
var ERR_AUTHFILE_NOTVERIFIED = 9
var ERR_AUTHFILE_EXPIRED = 10
var ERR_AUTHFILE_CANNOTWRITE = 11

var errors = []
errors[ERR_NONE] = 'No error'
errors[ERR_NOAUTHFILE] = 'Not signed in.'
errors[ERR_SIG_NOTVERIFIED] = 'Could not verify the authorization file signature.'
errors[ERR_AUTHFILE_NOTVERIFIED] = 'Could not verify the authorization file. Possible machine mismatch.'
errors[ERR_PARSE] = 'Error parsing the license file.'
errors[ERR_PROCESS] = 'Process error.'
errors[ERR_GENERIC] = 'Unknown error.'
errors[ERR_FILETIMEOUT] = 'Taking too long to retrieve the license file from disk.'
errors[ERR_LICENSETIMEOUT] = 'Network error.  Timeout retrieving the license file.'
errors[ERR_CONNECTIONERR] = 'Network error. No connection.'
errors[ERR_AUTHFILE_EXPIRED] = 'Your authorization file has expired.'
errors[ERR_AUTHFILE_CANNOTWRITE] = 'Could not write the authorization file.'

var APM_LICENSE_TYPE_NONE = 0
var APM_LICENSE_TYPE_DEMO = 1
var APM_LICENSE_TYPE_SUBSCRIPTION = 2
var APM_LICENSE_TYPE_FULL = 3
var APM_LICENSE_TYPE_KEYSERVER = 4
var APM_LICENSE_TYPE_PACE = 5
var APM_LICENSE_TYPE_TERM = 6

var licenseType = []
licenseType[APM_LICENSE_TYPE_NONE] = 'None'
licenseType[APM_LICENSE_TYPE_DEMO] = 'Demo'
licenseType[APM_LICENSE_TYPE_SUBSCRIPTION] = 'Subscription'
licenseType[APM_LICENSE_TYPE_FULL] = 'Full'
licenseType[APM_LICENSE_TYPE_KEYSERVER] = 'Keyserver'
licenseType[APM_LICENSE_TYPE_PACE] = 'ilok'
licenseType[APM_LICENSE_TYPE_TERM] = 'Term'

var APM_AUTH_PROVIDER_AUTHFILE = 1
var APM_AUTH_PROVIDER_PACE = 2
var APM_AUTH_PROVIDER_KEYSERVER = 4
var APM_AUTH_PROVIDER_LIVE = 8

var provider = []
provider[APM_AUTH_PROVIDER_AUTHFILE] = ''
provider[APM_AUTH_PROVIDER_PACE] = 'iLok'
provider[APM_AUTH_PROVIDER_KEYSERVER] = 'Keyserver'
provider[APM_AUTH_PROVIDER_LIVE] = 'LIVE'

const toColorString = color => {
  const c = color.map((v, i) => i === 3 ? v : ~~(v * 255))
  return c.length === 3 || c[3] === 1 ? `rgb(${c.slice(0, -1).join(', ')})` : `rgba(${c.join(', ')})`
}

const parseMaxTheme = (theme = {}) => {
  return {
    colors: theme.colors.reduce((sum, color) => {
      sum[color.id] = toColorString(color.oncolor)
      return sum
    }, {})
  }
}

const updateGlobalStyles = (parsedTheme) => {
  document.body.style.backgroundColor = parsedTheme.colors.inspector_selectedrow // inspector_background // parsedTheme.colors.menu_background
  document.body.style.backgroundColor = parsedTheme.colors.maxwindow_posttext // parsedTheme.colors.menu_text
  document.querySelector('div#noConnectionContainer div#errorMsg').style.backgroundColor = parsedTheme.colors.maxwindow_errorbackground
  document.querySelector('div#noConnectionContainer div#errorMsg').style.text = parsedTheme.colors.maxwindow_errortext
}

function getExpirationInfo (authDict, authStatus) {
  return authStatus && authStatus.licenseType === APM_LICENSE_TYPE_PACE
    ? ''
    : authDict && authDict.max8 && authDict.max8.expires_on && new Date(authDict.max8.expires_on) < new Date('7474-01-01')
      ? '  , expires on ' + new Date(authDict.max8.expires_on).toLocaleDateString()
      : ''
}
function datediff (first, second) {
  return Math.round(second - first)
}

function getSessionExpirationAsText (authDict) {
  const diffMs = datediff(new Date(), new Date(authDict.expires_on))
  const day = 1000 * 60 * 60 * 24
  const hr = 1000 * 60 * 60
  const min = 1000 * 60
  return diffMs > day
    ? '. You have ' + Math.round(diffMs / day) + ' days offline.'
    : diffMs > hr
      ? '. You have ' + Math.round(diffMs / hr) + ' hours offline.'
      : diffMs > min
        ? '. You have ' + Math.round(diffMs / min) + ' seconds left offline.'
        : '. You have ' + Math.round(diffMs / 1000) + ' seconds left offline.'
}
function getSessionExpirationInfo (authDict, authStatus) {
  return authStatus && authStatus.licenseType === APM_LICENSE_TYPE_PACE
    ? ''
    : authDict && authDict.expires_on && new Date(authDict.expires_on) > new Date()
      ? getSessionExpirationAsText(authDict)
      : '. Your session has expired.  You must go online to renew.'
}

// there should be a .name field for institutions when using a key'd auth
function getInstName (authDict) {
  return authDict.name
    ? ', ' + authDict.name
    : ''
}
function setOfflineView (authDict, authStatus) {
  var el = document.querySelector('#noConnectionContainer')
  var errorMsgDiv = document.querySelector('div#noConnectionContainer div#errorMsg')
  var authStatusDiv = document.querySelector('div#noConnectionContainer div#authStatus')
  console.log('offline', authDict, authStatus)
  if (!el) return

  el.setAttribute('class', '')

  var error = authDict && authDict.error && authDict.error !== 'Error getting authorization dictionary!'
    ? authDict.error
    : authStatus && authStatus.error && [ERR_SIG_NOTVERIFIED, ERR_NONE, ERR_NOAUTHFILE, ERR_CONNECTIONERR, ERR_LICENSETIMEOUT].indexOf(authStatus.error) === -1
      ? errors[authStatus.error]
      : null

  var authInfo = authStatus && authStatus.hasmax && authDict && authDict.max8 && authDict.max8.type
    ? 'AUTHORIZED: Max 8, ' + authDict.max8.type + getExpirationInfo(authDict, authStatus) + getSessionExpirationInfo(authDict, authStatus)
    : authStatus && authStatus.hasmax
      ? 'AUTHORIZED: Max 8'
      : authStatus && authStatus.m4l
        ? 'AUTHORIZED by LIVE'
        : 'UNAUTHORIZED'

  var providerInfo = authStatus && authStatus.hasmax && authStatus.m4l
    ? '(Ableton LIVE)'
    : authStatus && authStatus.hasmax && authStatus.licenseType === APM_LICENSE_TYPE_KEYSERVER
      ? '(KeyServer)'
      : authStatus && authStatus.hasmax && authStatus.licenseType === APM_LICENSE_TYPE_PACE
        ? '(iLok)'
        : authDict && authDict.key_id
          ? '(KeyFile' + getInstName(authDict) + ')'
          : ''

  if (error && authStatus.m4l === 0) {
    errorMsgDiv.innerHTML = error
  } else {
    errorMsgDiv.setAttribute('class', 'hidden')
  }
  authStatusDiv.innerHTML = authInfo + ' ' + providerInfo
}

var startTime = new Date()
max.getAuthServerURL(function (baseUrl, webUrl) {
  var seconds = Math.floor((new Date() - startTime) / 1000)
  console.log('getAuthServerURL', seconds)
  return max.getMaxVersion(function (maxversion) {
    seconds = Math.floor((new Date() - startTime) / 1000)
    console.log('getMaxVersion', seconds)
    return max.getTheme(function (theme) {
      seconds = Math.floor((new Date() - startTime) / 1000)
      console.log('getTheme', seconds)
      var parsedTheme = parseMaxTheme(theme)
      console.log('theme', theme, parsedTheme)
      updateGlobalStyles(parsedTheme)
      console.log('connecting to ' + baseUrl, maxversion)
      console.log(' main web: ' + webUrl)
      var tmp = baseUrl.split('://')
      var serverProto = tmp[0]
      var url = tmp[1].split('/')
      var serverUrl = url[0]
      var serverVersion = url[1]
      console.log(serverProto, serverUrl, serverVersion)
      function doit () {
        seconds = Math.floor((new Date() - startTime) / 1000)
        console.log('starting', seconds)
        if (navigator && navigator.onLine) {
          seconds = Math.floor((new Date() - startTime) / 1000)
          return window.location.replace('' + webUrl + '/auth?inMax=1')
        }
        max.getAuthorizationDict(function (authDict) {
          return max.authorize(JSON.stringify(authDict, null, 2), function (authStatus) {
            setOfflineView(authDict, authStatus)
            setTimeout(doit, 3000)
          })
        })
        return null
      }
      doit()
    })
  })
})
