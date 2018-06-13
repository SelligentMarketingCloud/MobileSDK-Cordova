package com.selligent;

import android.content.Intent;

import com.selligent.sdk.SMInAppMessage;
import com.selligent.sdk.SMManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class InAppMessageBroadcastEventDataParser implements BroadcastEventDataParser {
    @Override
    public JSONObject parse(Intent intent) throws JSONException {
        final JSONObject resultingJSONObject = new JSONObject();

        SMInAppMessage[] messages = (SMInAppMessage[])intent.getSerializableExtra(SMManager.BROADCAST_DATA_IN_APP_MESSAGES);
        final JSONArray messageJSONArray = new JSONArray();
        for (SMInAppMessage message : messages) {
            JSONObject messageJSONObject = new JSONObject();
            messageJSONObject.put("id", message.id);
            messageJSONObject.put("title", message.title);
            messageJSONArray.put(messageJSONObject);
        }
        resultingJSONObject.put("messages", messageJSONArray);

        return resultingJSONObject;
    }
}
