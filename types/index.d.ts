export function getVersionLib(
  successCallback: Function,
  errorCallback: Function
): string;
export function reloadSettings(
  successCallback: Function,
  errorCallback: Function,
  settings: any
): void;
export function sendDeviceInfo(
  successCallback: Function,
  errorCallback: Function,
  options: any
): void;
export function loadSettings(
  successCallback: Function,
  errorCallback: Function
): any;
export function getInAppMessages(
  successCallback: Function,
  errorCallback: Function
): void;
export function getDeviceId(
  successCallback: Function,
  errorCallback: Function
): string;
export function enableNotifications(
  successCallback: Function,
  errorCallback: Function,
  enabled: boolean
): void;
export function registerForProvisionalRemoteNotification(
  successCallback: Function,
  errorCallback: Function
): void;
export function displayLastReceivedRemotePushNotification(
  successCallback: Function,
  errorCallback: Function
): void;
export function getLastRemotePushNotification(
  successCallback: Function,
  errorCallback: Function
): any;
export function setInAppMessageAsSeen(
  successCallback: Function,
  errorCallback: Function,
  messageId: string
): void;
export function executeButtonAction(
  successCallback: Function,
  errorCallback: Function,
  buttonId: string,
  messageId: string
): void;

export function enableiOSLogging(
  successCallback: Function,
  errorCallback: Function,
  logLevels: any[]
): void;
export function enableInAppMessages(
  successCallback: Function,
  errorCallback: Function,
  enabled: boolean
): void;
export function sendEvent(
  successCallback: Function,
  errorCallback: Function,
  event: any
): void;
export function subscribeToEvents(
  successCallback: Function,
  errorCallback: Function
): any;
export function displayNotification(
  successCallback: Function,
  errorCallback: Function,
  notificationId: string
): void;
export function registerRemoteNotificationFetchCompletionHandler(
  successCallback: Function,
  errorCallback: Function
): void;
export function forceRemoteNotificationBackgroundFetchResult(
  successCallback: Function,
  errorCallback: Function,
  iOSBackgroundFetchResult: any
): void;
export function setApplication(
  successCallback: Function,
  errorCallback: Function
): void;
export function enableAndroidLogging(
  successCallback: Function,
  errorCallback: Function,
  shouldEnableLoggingMessages: boolean
): void;
export function enableInAppMessages(
  successCallback: Function,
  errorCallback: Function,
  options: any
): void;
export function areInAppMessagesEnabled(
  successCallback: Function,
  errorCallback: Function
): boolean;
export function displayMessage(
  successCallback: Function,
  errorCallback: Function,
  messageId: string
): void;
export function sendEvent(
  successCallback: Function,
  errorCallback: Function,
  event: any
): void;
export function subscribeToEvents(
  successCallback: Function,
  errorCallback: Function,
  customEvents: any[]
): any;
export function areNotificationsEnabled(
  successCallback: Function,
  errorCallback: Function
): boolean;
export function setNotificationSmallIcon(
  successCallback: Function,
  errorCallback: Function,
  iconName: string
): void;
export function setNotificationLargeIcon(
  successCallback: Function,
  errorCallback: Function,
  iconName: string
): void;
export function getGCMToken(
  successCallback: Function,
  errorCallback: Function
): string;
export function setFirebaseToken(
  successCallback: Function,
  errorCallback: Function,
  token: string
): void;
export function getRemoteMessagesDisplayType(
  successCallback: Function,
  errorCallback: Function
): string;
