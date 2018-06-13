package com.selligent;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONObject;

class EventReceiver extends BroadcastReceiver {

    private CallbackContext callbackContext;

    public EventReceiver(CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
    }

    public void setCallbackContext(CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        final String smBroadcastEventType = intent.getAction();
        if (TextUtils.isEmpty(smBroadcastEventType)) return;

        try {
            final JSONObject broadcastData = BroadcastDataFactory.getBroadcastData(smBroadcastEventType, intent);

            final PluginResult eventResult = new PluginResult(PluginResult.Status.OK, broadcastData);
            eventResult.setKeepCallback(true);
            callbackContext.sendPluginResult(eventResult);
        } catch (Exception e) {
            final PluginResult eventErrorResult = new PluginResult(PluginResult.Status.ERROR, e.getMessage());
            eventErrorResult.setKeepCallback(true);
            callbackContext.sendPluginResult(eventErrorResult);
        }
    }

}
