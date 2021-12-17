package com.selligent;

import com.selligent.sdk.SMSettings;

class SMSettingsFactory {

    public static SMSettings getSMSettings(Settings settings) {
        final SMSettings smSettings = new SMSettings();
        smSettings.WebServiceUrl = settings.getUrl();
        smSettings.ClientId = settings.getClientId();
        smSettings.PrivateKey = settings.getPrivateKey();

        final Boolean doNotFetchTheToken = settings.getDoNotFetchTheToken();
        if (doNotFetchTheToken != null) {
            smSettings.DoNotFetchTheToken = doNotFetchTheToken;
        }

        final Boolean doNotListenToThePush = settings.getDoNotListenToThePush();
        if (doNotListenToThePush != null) {
            smSettings.DoNotListenToThePush = doNotListenToThePush;
        }

        final Boolean loadCacheAsynchronously = settings.getLoadCacheAsynchronously();
        if (loadCacheAsynchronously != null) {
            smSettings.LoadCacheAsynchronously = loadCacheAsynchronously;
        }

        final Boolean addInAppMessageFromPushToInAppMessageList = settings.getAddInAppMessageFromPushToInAppMessageList();
        if(addInAppMessageFromPushToInAppMessageList != null) {
            smSettings.AddInAppMessageFromPushToInAppMessageList = addInAppMessageFromPushToInAppMessageList;
        }

        final ClearCacheIntervalValue clearCacheIntervalValue = settings.getClearCacheIntervalValue();
        if (clearCacheIntervalValue != null) {
            smSettings.ClearCacheIntervalValue = clearCacheIntervalValue.getSmClearCache();
        }

        final InAppMessageRefreshType inAppMessageRefreshType = settings.getInAppMessageRefreshType();
        if (inAppMessageRefreshType != null) {
            smSettings.InAppMessageRefreshType = inAppMessageRefreshType.getSmInAppRefreshType();
        }

        final RemoteMessageDisplayType remoteMessageDisplayType = settings.getRemoteMessageDisplayType();
        if (remoteMessageDisplayType != null) {
            smSettings.RemoteMessageDisplayType = remoteMessageDisplayType.getSmRemoteMessageDisplayType();
        }

        return smSettings;
    }

}