package com.selligent;


import org.json.JSONException;
import org.json.JSONObject;

class Settings {

    private String url;
    private String clientId;
    private String privateKey;
    private String googleApplicationId;
    private String activityName;
    private Boolean configureLocationServices;
    private ClearCacheIntervalValue clearCacheIntervalValue;
    private InAppMessageRefreshType inAppMessageRefreshType;
    private RemoteMessageDisplayType remoteMessageDisplayType;

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

    public static Settings fromJSONObject(JSONObject settingsJSONObject) throws JSONException {
        final Settings settings = new Settings();

        settings.url = settingsJSONObject.getString("url");
        settings.clientId = settingsJSONObject.getString("clientId");
        settings.privateKey = settingsJSONObject.getString("privateKey");
        settings.googleApplicationId = settingsJSONObject.optString("googleApplicationId");
        settings.configureLocationServices = settingsJSONObject.optBoolean("configureLocationServices");
        settings.activityName = settingsJSONObject.getString("fullyQualifiedNotificationActivityClassName");
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
