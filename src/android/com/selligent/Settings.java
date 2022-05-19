package com.selligent;


import org.json.JSONException;
import org.json.JSONObject;

class Settings {

    private String url;
    private String clientId;
    private String privateKey;
    private String googleApplicationId;
    private String activityName;
    private String notificationSmallIcon;
    private String notificationLargeIcon;
    private Boolean addInAppMessageFromPushToInAppMessageList;
    private Boolean configureLocationServices;
    private Boolean doNotFetchTheToken;
    private Boolean doNotListenToThePush;
    private Boolean loadCacheAsynchronously;
    private ClearCacheIntervalValue clearCacheIntervalValue;
    private InAppMessageRefreshType inAppMessageRefreshType;
    private RemoteMessageDisplayType remoteMessageDisplayType;
    private String notificationChannelId = "SMChannel001";
    private String notificationChannelName = "SMDefaultChannel";
    private String notificationChannelDescription = "";

    private Settings() { }

    public String getUrl() {
        return url;
    }

    public String getClientId() {
        return clientId;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public String getGoogleApplicationId() {
        return googleApplicationId;
    }

    public String getActivityName() {
        return activityName;
    }

    public String getNotificationSmallIcon() { return notificationSmallIcon; }

    public String getNotificationLargeIcon() { return notificationLargeIcon; }

    public Boolean getDoNotFetchTheToken() { return doNotFetchTheToken; }

    public Boolean getDoNotListenToThePush() { return doNotListenToThePush; }

    public Boolean getLoadCacheAsynchronously() { return loadCacheAsynchronously; }

    public Boolean getAddInAppMessageFromPushToInAppMessageList() {
        return addInAppMessageFromPushToInAppMessageList;
    }

    public Boolean getConfigureLocationServices() {
        return configureLocationServices;
    }

    public ClearCacheIntervalValue getClearCacheIntervalValue() {
        return clearCacheIntervalValue;
    }

    public InAppMessageRefreshType getInAppMessageRefreshType() {
        return inAppMessageRefreshType;
    }

    public RemoteMessageDisplayType getRemoteMessageDisplayType() {
        return remoteMessageDisplayType;
    }

    public String getNotificationChannelId() {
        return notificationChannelId;
    }

    public String getNotificationChannelName() {
        return notificationChannelName;
    }

    public String getNotificationChannelDescription() {
        return notificationChannelDescription;
    }

    public static Settings fromJSONObject(JSONObject settingsJSONObject) throws JSONException {
        final Settings settings = new Settings();

        settings.url = settingsJSONObject.getString("url");
        settings.clientId = settingsJSONObject.getString("clientId");
        settings.privateKey = settingsJSONObject.getString("privateKey");
        settings.googleApplicationId = settingsJSONObject.optString("googleApplicationId");
        settings.addInAppMessageFromPushToInAppMessageList = settingsJSONObject.optBoolean("addInAppMessageFromPushToInAppMessageList");
        settings.configureLocationServices = settingsJSONObject.optBoolean("configureLocationServices");
        settings.activityName = settingsJSONObject.getString("fullyQualifiedNotificationActivityClassName");
        settings.notificationSmallIcon = settingsJSONObject.optString("notificationSmallIcon");
        settings.notificationLargeIcon = settingsJSONObject.optString("notificationLargeIcon");
        settings.doNotFetchTheToken = settingsJSONObject.optBoolean("doNotFetchTheToken");
        settings.doNotListenToThePush = settingsJSONObject.optBoolean("doNotListenToThePush");
        settings.loadCacheAsynchronously = settingsJSONObject.optBoolean("loadCacheAsynchronously");
        settings.notificationChannelId = settingsJSONObject.optString("notificationChannelId");
        settings.notificationChannelName = settingsJSONObject.optString("notificationChannelName");
        settings.notificationChannelDescription = settingsJSONObject.optString("notificationChannelDescription");
        final Integer clearCacheIndex = settingsJSONObject.optInt("clearCacheIntervalValue");
        if (clearCacheIndex != 0) {
            settings.clearCacheIntervalValue = ClearCacheIntervalValue.valueOf(clearCacheIndex);
        }
        final Integer inAppMsgRefreshIndex = settingsJSONObject.optInt("inAppMessageRefreshType");
        if (inAppMsgRefreshIndex != 0) {
            settings.inAppMessageRefreshType = InAppMessageRefreshType.valueOf(inAppMsgRefreshIndex);
        }
        final Integer remoteMsgRefreshIndex = settingsJSONObject.optInt("remoteMessageDisplayType");
        if (remoteMsgRefreshIndex != 0) {
            settings.remoteMessageDisplayType = RemoteMessageDisplayType.valueOf(remoteMsgRefreshIndex);
        }

        return settings;
    }
}
