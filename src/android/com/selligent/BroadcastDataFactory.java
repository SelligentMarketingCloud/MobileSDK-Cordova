package com.selligent;

import android.content.Intent;

import com.selligent.sdk.SMManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class BroadcastDataFactory {

    private static Map<String, BroadcastEventDataParser> broadcastDataParserMap = new HashMap<String, BroadcastEventDataParser>() {{
        put(SMManager.BROADCAST_EVENT_RECEIVED_IN_APP_MESSAGE, new InAppMessageBroadcastEventDataParser());
        put(SMManager.BROADCAST_EVENT_BUTTON_CLICKED, new ButtonBroadcastEventDataParser());
        put(SMManager.BROADCAST_EVENT_RECEIVED_GCM_TOKEN, new GCMTokenBroadcastEventDataParser());
    }};

    public static JSONObject getBroadcastData(String smBroadcastEventType, Intent intent) throws JSONException {
        final JSONObject broadcastData = new JSONObject();

        final BroadcastEventType broadcastEventType = BroadcastEventType.fromSMBroadcastEventType(smBroadcastEventType);
        String resultingBroadcastEventType = smBroadcastEventType;
        if (broadcastEventType != null) {
            resultingBroadcastEventType = broadcastEventType.getBroadcastEventType();
        }
        broadcastData.put("broadcastEventType", resultingBroadcastEventType);

        final BroadcastEventDataParser broadcastEventDataParser = broadcastDataParserMap.get(smBroadcastEventType);

        if (broadcastEventDataParser != null) {
            final JSONObject resultingData = broadcastEventDataParser.parse(intent);
            broadcastData.put("data", resultingData );
        } else {
            broadcastData.put("data", JSONObject.NULL);
        }

        return broadcastData;
    }
}
