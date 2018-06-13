package com.selligent;

import android.content.Intent;

import com.selligent.sdk.SMManager;

import org.json.JSONException;
import org.json.JSONObject;

public class GCMTokenBroadcastEventDataParser implements BroadcastEventDataParser {
    @Override
    public JSONObject parse(Intent intent) throws JSONException {
        final JSONObject resultingJSONObject = new JSONObject();

        final String token = intent.getStringExtra(SMManager.BROADCAST_DATA_GCM_TOKEN);
        resultingJSONObject.put("token", token);

        return resultingJSONObject;
    }
}
