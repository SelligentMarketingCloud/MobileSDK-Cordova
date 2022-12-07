package com.selligent;

import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Resources;
import android.util.Log;

import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.selligent.sdk.SMCallback;
import com.selligent.sdk.SMDeviceInfos;
import com.selligent.sdk.SMEvent;
import com.selligent.sdk.SMForegroundGcmBroadcastReceiver;
import com.selligent.sdk.SMInAppMessage;
import com.selligent.sdk.SMInAppMessageReturn;
import com.selligent.sdk.SMManager;
import com.selligent.sdk.SMNotificationButton;
import com.selligent.sdk.SMRemoteMessageDisplayType;
import com.selligent.sdk.SMSettings;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * This class echoes a string called from JavaScript.
 */

public class SelligentPlugin extends CordovaPlugin {

    private static final String GET_VERSION_LIB = "versionLib";
    private static final String SET_APPLICATION = "setApplication";
    private static final String SET_DEBUG = "setDebug";
    private static final String RELOAD = "reload";
    private static final String SEND_DEVICE_INFO = "sendDeviceInfo";
    private static final String ARE_IN_APP_MESSAGES_ENABLED = "areInAppMessagesEnabled";
    private static final String ENABLE_IN_APP_MESSAGES = "enableInAppMessages";
    private static final String DISPLAY_MESSAGE = "displayMessage";
    private static final String GET_IN_APP_MESSAGES = "getInAppMessages";
    private static final String SET_IN_APP_MESSAGE_AS_SEEN = "setInAppMessageAsSeen";
    private static final String EXECUTE_BUTTON_ACTION = "executeButtonAction";
    private static final String ENABLE_GEOLOCATION = "enableGeolocation";
    private static final String IS_GEOLOCATION_ENABLED = "isGeolocationEnabled";
    private static final String SEND_EVENT = "sendEvent";
    private static final String GET_DEVICE_ID = "getDeviceId";
    private static final String ENABLE_NOTIFICATIONS = "enableNotifications";
    private static final String ARE_NOTIFICATIONS_ENABLED = "areNotificationsEnabled";
    private static final String DISPLAY_LAST_RECEIVED_REMOTE_PUSH_NOTIFICATION = "displayLastReceivedRemotePushNotification";
    private static final String GET_LAST_REMOTE_PUSH_NOTIFICATION = "getLastRemotePushNotification";
    private static final String SET_NOTIFICATION_SMALL_ICON = "setNotificationSmallIcon";
    private static final String SET_NOTIFICATION_LARGE_ICON = "setNotificationLargeIcon";
    private static final String GET_REMOTE_MESSAGES_DISPLAY_TYPE = "getRemoteMessagesDisplayType";
    private static final String GET_GCM_TOKEN = "getGCMToken";
    private static final String SET_FIREBASE_TOKEN = "setFirebaseToken";
    private static final String SUBSCRIBE_TO_EVENTS = "subscribeToEvents";

    private SMManager smManager;
    private SMForegroundGcmBroadcastReceiver receiver;
    private EventReceiver eventReceiver;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        smManager = SMManager.getInstance();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch (action) {
            case GET_VERSION_LIB:
                return getVersionLib(callbackContext);
            case SET_APPLICATION:
                return setApplication(callbackContext);
            case SET_DEBUG:
                return setDebug(args, callbackContext);
            case RELOAD:
                return reload(args, callbackContext);
            case SEND_DEVICE_INFO:
                return sendDeviceInfo(args, callbackContext);
            case ARE_IN_APP_MESSAGES_ENABLED:
                return areInAppMessagesEnabled(callbackContext);
            case ENABLE_IN_APP_MESSAGES:
                return enableInAppMessages(args, callbackContext);
            case DISPLAY_MESSAGE:
                return displayMessage(args, callbackContext);
            case GET_IN_APP_MESSAGES:
                return getInAppMessages(callbackContext);
            case SET_IN_APP_MESSAGE_AS_SEEN:
                return setInAppMessageAsSeen(args, callbackContext);
            case EXECUTE_BUTTON_ACTION:
                return executeButtonAction(args, callbackContext);
            case ENABLE_GEOLOCATION:
                return enableGeolocation(args, callbackContext);
            case IS_GEOLOCATION_ENABLED:
                return isGeolocationEnabled(callbackContext);
            case SEND_EVENT:
                return sendEvent(args, callbackContext);
            case GET_DEVICE_ID:
                return getDeviceId(callbackContext);
            case ENABLE_NOTIFICATIONS:
                return enableNotifications(args, callbackContext);
            case ARE_NOTIFICATIONS_ENABLED:
                return areNotificationsEnabled(callbackContext);
            case DISPLAY_LAST_RECEIVED_REMOTE_PUSH_NOTIFICATION:
                return displayLastReceivedRemotePushNotification(callbackContext);
            case GET_LAST_REMOTE_PUSH_NOTIFICATION:
                return getLastRemotePushNotification(callbackContext);
            case SET_NOTIFICATION_SMALL_ICON:
                return setNotificationSmallIcon(args, callbackContext);
            case SET_NOTIFICATION_LARGE_ICON:
                return setNotificationLargeIcon(args, callbackContext);
            case GET_REMOTE_MESSAGES_DISPLAY_TYPE:
                return getRemoteMessagesDisplayType(callbackContext);
            case GET_GCM_TOKEN:
                return getGCMToken(callbackContext);
            case SET_FIREBASE_TOKEN:
                return setFirebaseToken(args, callbackContext);
            case SUBSCRIBE_TO_EVENTS:
                return subscribeToEvents(args, callbackContext);
            default:
                return false;
        }
    }

    // LOCAL METHODS
    private boolean getVersionLib(CallbackContext callbackContext) {
        callbackContext.success(SMManager.VERSION_LIB);
        return true;
    }

    private boolean setApplication(CallbackContext callbackContext) {
        smManager.setApplication(cordova.getActivity().getApplication());
        callbackContext.success();
        return true;
    }

    private boolean setDebug(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final boolean enabled = args.getBoolean(0);
        SMManager.DEBUG = enabled;
        callbackContext.success();
        return true;
    }

    private boolean reload(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final JSONObject settingsJSONObject = args.getJSONObject(0);
        final Settings settings = Settings.fromJSONObject(settingsJSONObject);
        final SMSettings smSettings = SMSettingsFactory.getSMSettings(settings);

        SMCallback callback = new SMCallback() {
            @Override
            public void onSuccess(String s) {
                callbackContext.success(s);
            }

            @Override
            public void onError(int i, Exception e) {
                callbackContext.error(i);
            }
        };

        smManager.reload(smSettings, callback);
        callbackContext.success();
        return true;
    }

    private boolean sendDeviceInfo(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final String externalId = args.getString(0);
        final SMDeviceInfos smDeviceInfos = new SMDeviceInfos();
        smDeviceInfos.ExternalId = externalId;

        smManager.sendDeviceInfos(smDeviceInfos);
        callbackContext.success();
        return true;
    }

    private boolean areInAppMessagesEnabled(CallbackContext callbackContext) {
        final Boolean areInAppMessagesEnabled = smManager.areInAppMessagesEnabled();

        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, areInAppMessagesEnabled));
        return true;
    }

    private boolean enableInAppMessages(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final Boolean enable = args.getBoolean(0);

        if (enable) {
            final Integer refreshTypeIndex = args.getInt(1);
            final InAppMessageRefreshType refreshType = InAppMessageRefreshType.valueOf(refreshTypeIndex);
            smManager.enableInAppMessages(refreshType.getSmInAppRefreshType());
        } else {
            smManager.disableInAppMessages();
        }

        callbackContext.success();
        return true;
    }

    private boolean displayMessage(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final String messageId = args.getString(0);

        smManager.displayMessage(messageId, cordova.getActivity());
        callbackContext.success();
        return true;
    }

    private boolean getInAppMessages(CallbackContext callbackContext) {
        smManager.getInAppMessages(new SMInAppMessageReturn() {
            @Override
            public void onRetrieve(ArrayList<SMInAppMessage> inAppMessages) {
                try {
                    JSONArray iamJSONArray = new JSONArray();

                    for (SMInAppMessage message : inAppMessages) {
                        JSONObject messageJSONObject = new JSONObject();

                        messageJSONObject.put("id", message.id);
                        messageJSONObject.put("title", message.title);
                        messageJSONObject.put("body", message.getBody());
                        messageJSONObject.put("creationDate", message.getCreationDate());
                        messageJSONObject.put("expirationDate", message.getExpirationDate());
                        messageJSONObject.put("receptionDate", message.getReceptionDate());
                        messageJSONObject.put("hasBeenSeen", message.hasBeenSeen());
                        messageJSONObject.put("type", message.getType());

                        JSONArray buttonsJSONArray = new JSONArray();

                        SMNotificationButton buttons[] = message.getButtons();

                        if(buttons != null) {
                            for(SMNotificationButton button : buttons) {
                                JSONObject buttonsJSONObject = new JSONObject();

                                buttonsJSONObject.put("id", button.id);
                                buttonsJSONObject.put("value", button.value);
                                buttonsJSONObject.put("label", button.label);
                                buttonsJSONObject.put("action", button.action.getValue());
                                buttonsJSONObject.put("type", button.type);

                                buttonsJSONArray.put(buttonsJSONObject);
                            }
                        }

                        messageJSONObject.put("buttons", buttonsJSONArray);

                        iamJSONArray.put(messageJSONObject);
                    }
                    callbackContext.success(iamJSONArray);
                } catch (JSONException e) {
                    callbackContext.error(e.getMessage());
                }
            }
        });
        return true;
    }

    private boolean setInAppMessageAsSeen(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final String messageId = args.getString(0);

        smManager.getInAppMessages(new SMInAppMessageReturn() {
            @Override
            public void onRetrieve(ArrayList<SMInAppMessage> inAppMessages) {
                for(SMInAppMessage message : inAppMessages) {
                    if(message.id.equals(messageId)) {
                        smManager.setInAppMessageAsSeen(message);
                        callbackContext.success();
                        return;
                    }
                }
                callbackContext.error(String.format("No message with id %s found", messageId));
            }
        });
        return true;
    }

    private boolean executeButtonAction(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final String buttonId = args.getString(0);
        final String messageId = args.getString(1);


        smManager.getInAppMessages(new SMInAppMessageReturn() {
            @Override
            public void onRetrieve(ArrayList<SMInAppMessage> inAppMessages) {
                for(SMInAppMessage message : inAppMessages) {
                    if(message.id.equals(messageId)) {
                        for(SMNotificationButton button : message.getButtons()) {
                            if(button.id.equals(buttonId)) {
                                smManager.executeButtonAction(cordova.getContext(), button, message);
                                callbackContext.success();
                                return;
                            }
                        }
                        callbackContext.error("buttonId does not exist in message.");
                        return;
                    }
                }
                callbackContext.error(String.format("No message with id %s found", messageId));
            }
        });
        return true;
    }

    private boolean enableGeolocation(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final Boolean enable = args.getBoolean(0);

        if (enable) {
            smManager.enableGeolocation();
        } else {
            smManager.disableGeolocation();
        }
        callbackContext.success();
        return true;
    }

    private boolean isGeolocationEnabled(CallbackContext callbackContext) {
        final Boolean isGeolocationEnabled = smManager.isGeolocationEnabled();

        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, isGeolocationEnabled));
        return true;
    }

    private boolean sendEvent(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final JSONObject eventJSONObject = args.getJSONObject(0);
        final Event event = Event.fromJSONObject(eventJSONObject);
        final SMEvent smEvent = SMEventFactory.getSMEvent(event, new SMCallback() {
            @Override
            public void onSuccess(String message) {
                callbackContext.success(message);
            }

            @Override
            public void onError(int responseCode, Exception e) {
                logError("SMManager sendEvent failed", e);
                callbackContext.error(String.valueOf(responseCode));
            }
        });

        smManager.sendSMEvent(smEvent);
        return true;
    }

    private boolean getDeviceId(CallbackContext callbackContext) {
        callbackContext.success(smManager.getDeviceId());
        return true;
    }

    private boolean enableNotifications(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final Boolean enable = args.getBoolean(0);

        if (enable) {
            smManager.enableNotifications();
        } else {
            smManager.disableNotifications();
        }
        callbackContext.success();
        return true;
    }

    private boolean areNotificationsEnabled(CallbackContext callbackContext) {
        final Boolean areNotificationsEnabled = smManager.areNotificationEnabled();

        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, areNotificationsEnabled));
        return true;
    }

    private boolean displayLastReceivedRemotePushNotification(CallbackContext callbackContext) {
        smManager.displayLastReceivedRemotePushNotification(cordova.getActivity());
        callbackContext.success();
        return true;
    }

    private boolean getLastRemotePushNotification(CallbackContext callbackContext) throws JSONException {
        final HashMap<String, String> notificationMap = smManager.getLastRemotePushNotification();

        if (notificationMap != null) {
            final String id = notificationMap.get("id");
            final String title = notificationMap.get("title");
            final JSONObject notificationJSONObject = new JSONObject();

            notificationJSONObject.put("id", id);
            notificationJSONObject.put("title", title);
            callbackContext.success(notificationJSONObject);
            return true;
        }

        callbackContext.success();
        return true;
    }

    private boolean setNotificationSmallIcon(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final int resourceId = processNotificationIcon(args);

        smManager.setNotificationSmallIcon(resourceId);
        callbackContext.success();
        return true;
    }

    private boolean setNotificationLargeIcon(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final int resourceId = processNotificationIcon(args);

        smManager.setNotificationLargeIcon(resourceId);
        callbackContext.success();
        return true;
    }

    private int processNotificationIcon(JSONArray args) throws JSONException {
        final String iconName = args.getString(0);
        final  Activity activity = cordova.getActivity();
        final Resources resources = activity.getResources();
        final int resourceId = resources.getIdentifier(iconName, "drawable", activity.getPackageName());

        if (resourceId == 0) {
            throw new IllegalArgumentException("Could not find a drawable with the name " + iconName);
        }

        return resourceId;
    }

    private boolean getRemoteMessagesDisplayType(CallbackContext callbackContext) {
        final SMRemoteMessageDisplayType smRemoteMessageDisplayType = smManager.getRemoteMessagesDisplayType();
        final RemoteMessageDisplayType remoteMessageDisplayType = RemoteMessageDisplayType.valueOf(smRemoteMessageDisplayType);

        callbackContext.success(remoteMessageDisplayType.getIndex());
        return true;
    }

    private boolean getGCMToken(CallbackContext callbackContext) {
        final String token = smManager.getGCMToken();

        callbackContext.success(token);
        return true;
    }

    private boolean setFirebaseToken(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final String token = args.getString(0);

        smManager.setFirebaseToken(token);
        callbackContext.success();
        return true;
    }

    private boolean subscribeToEvents(JSONArray args, CallbackContext callbackContext) throws JSONException {
        final LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(cordova.getActivity());

        if (eventReceiver == null) {
            eventReceiver = new EventReceiver(callbackContext);
        } else {
            localBroadcastManager.unregisterReceiver(eventReceiver);
            eventReceiver.setCallbackContext(callbackContext);
        }

        final IntentFilter filter = new IntentFilter();
        filter.addAction(SMManager.BROADCAST_EVENT_RECEIVED_IN_APP_MESSAGE);
        filter.addAction(SMManager.BROADCAST_EVENT_RECEIVED_IN_APP_CONTENTS);
        filter.addAction(SMManager.BROADCAST_EVENT_WILL_DISPLAY_NOTIFICATION);
        filter.addAction(SMManager.BROADCAST_EVENT_WILL_DISMISS_NOTIFICATION);
        filter.addAction(SMManager.BROADCAST_EVENT_BUTTON_CLICKED);
        filter.addAction(SMManager.BROADCAST_EVENT_RECEIVED_GCM_TOKEN);
        for (int i = 0; i < args.length(); i++) {
            filter.addAction(args.getString(i));
        }

        localBroadcastManager.registerReceiver(eventReceiver, filter);
        return true;
    }

    private void logError(String message, Exception exception) {
        if (SMManager.DEBUG) {
            Log.e(SelligentApplication.TAG, message, exception);
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        final Activity activity = cordova.getActivity();

        if (receiver == null)
        {
            receiver = new SMForegroundGcmBroadcastReceiver(activity);
        }

        activity.registerReceiver(receiver, receiver.getIntentFilter());
        smManager.checkAndDisplayMessage(activity.getIntent(), activity);
    }

    @Override
    public void onStop() {
        super.onStop();
        final Activity activity = cordova.getActivity();

        activity.unregisterReceiver(receiver);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        final Activity activity = cordova.getActivity();

        smManager.checkAndDisplayMessage(intent, activity);
    }
}