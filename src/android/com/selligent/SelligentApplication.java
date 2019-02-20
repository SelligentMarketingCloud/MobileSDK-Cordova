package com.selligent;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;
import android.support.multidex.MultiDex;
import android.util.Log;

import com.selligent.sdk.SMManager;
import com.selligent.sdk.SMSettings;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;

public class SelligentApplication extends Application {
    static final String TAG = "SM_CORDOVA_SDK";

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        try {
            final Settings settings = Settings.fromJSONObject(loadSettingsFromJSON());
            final SMSettings smSettings = SMSettingsFactory.getSMSettings(settings);
            final SMManager smManager = SMManager.getInstance();
            SMManager.NOTIFICATION_ACTIVITY = Class.forName(settings.getActivityName());

            smManager.start(smSettings, this);

            final Resources resources = this.getResources();

            final int smallIconResourceId = resources.getIdentifier(settings.getNotificationSmallIcon(), "drawable", this.getPackageName());
            if(smallIconResourceId != 0) {
                smManager.setNotificationSmallIcon(smallIconResourceId);
            }

            final int largeIconResourceId = resources.getIdentifier(settings.getNotificationLargeIcon(), "drawable", this.getPackageName());
            if(largeIconResourceId  != 0) {
                smManager.setNotificationLargeIcon(largeIconResourceId);
            }

        } catch (JSONException e) {
            Log.e(TAG, "SMManager start failed: an error occurred while parsing the selligent.json file", e);
        } catch (IOException e) {
            Log.e(TAG, "SMManager start failed: an error occurred while opening the selligent.json file", e);
        } catch (ClassNotFoundException e) {
            Log.e(TAG, "SMManager start failed: an error occurred while setting the NotificationActivity", e);
        }
    }

    private JSONObject loadSettingsFromJSON() throws JSONException, IOException {
        final InputStream is = getAssets().open("www/assets/selligent.json");
        final int size = is.available();
        final byte[] buffer = new byte[size];
        is.read(buffer);
        is.close();
        final String settingsJson = new String(buffer, "UTF-8");
        return new JSONObject(settingsJson);
    }
}