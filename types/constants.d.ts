export namespace ClearCacheIntervalValue {
  const AUTO: number;
  const NONE: number;
  const WEEK: number;
  const MONTH: number;
  const QUARTER: number;
  namespace Android {
    const DAY: number;
  }
}
export namespace InAppMessageRefreshType {
  const NONE: number;
  const MINUTE: number;
  const HOUR: number;
  const DAY: number;
}
export namespace RemoteMessagesDisplayType {
  const AUTOMATIC: number;
  const NONE: number;
  const NOTIFICATION: number;
}
export namespace AndroidRemoteMessagesDisplayType {
  const AUTOMATIC: number;
  const NONE: number;
  const NOTIFICATION: number;
}
export namespace iOSLogLevel {
  const NONE: number;
  const INFO: number;
  const WARNING: number;
  const ERROR: number;
  const HTTP_CALL: number;
  const LOCATION: number;
  const ALL: number;
}
export namespace iOSBackgroundFetchResult {
  const NEW_DATA: number;
  const NO_DATA: number;
  const FAILED: number;
}
export namespace EventType {
  const USER_REGISTER: number;
  const USER_UNREGISTER: number;
  const USER_LOGIN: number;
  const USER_LOGOUT: number;
  const CUSTOM: number;
}
export namespace iOSNotificationButtonType {
  const UNKNOWN: number;
  const SIMPLE_OPEN_PHONE_CALL: number;
  const OPEN_SMS: number;
  const OPEN_MAIL: number;
  const OPEN_BROWSER: number;
  const OPEN_APPLICATION: number;
  const RATE_APPLICATION: number;
  const CUSTOM_ACTION_BROADCAST_EVENT: number;
  const RETURN_TEXT: number;
  const RETURN_PHOTO: number;
  const RETURN_TEXT_AND_PHOTO: number;
  const PASSBOOK: number;
}
export namespace BroadcastEventType {
  const BUTTON_CLICKED: string;
  const RECEIVED_IN_APP_MESSAGE: string;
  const WILL_DISPLAY_NOTIFICATION: string;
  const WILL_DISMISS_NOTIFICATION: string;
  const RECEIVED_DEVICE_ID: string;
  namespace Android {
    const RECEIVED_GCM_TOKEN: string;
  }
  namespace iOS {
    const RECEIVED_REMOTE_NOTIFICATION: string;
  }
}
