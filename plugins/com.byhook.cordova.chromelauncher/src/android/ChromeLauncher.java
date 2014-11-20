/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package com.byhook.cordova.chromelauncher;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;


public class ChromeLauncher extends CordovaPlugin {

    public static String TAG = "ChromeLauncher";
	
    /**
     * Executes the request and returns PluginResult.
     * @param action                 The action to execute.
     * @param args                         JSONArry of arguments for the plugin.
     * @param callbackContext                The callback context used when calling back into JavaScript.
     * @return                                 A PluginResult object with a status and message.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		
		PluginResult.Status status = PluginResult.Status.OK;
        String result = "";

        if (action.equals("open")) {
			String url = args.getString(0);
			
			Intent i = new Intent("android.intent.action.MAIN");
			i.setComponent(ComponentName.unflattenFromString("com.android.chrome/com.android.chrome.Main"));
			i.addCategory("android.intent.category.LAUNCHER");
			i.setData(Uri.parse(url));
			((Activity)cordova).startActivity(i);
		}
		else if (action.equals("checkInstall")) {
			if(isInstalled("com.android.chrome")) {
        		callbackContext.sendPluginResult(new PluginResult(status, true));
				return true;
			}
			else {
				status = PluginResult.Status.ERROR;
        		callbackContext.sendPluginResult(new PluginResult(status, false));
				return true;
			}
		}
		else if (action.equals("openStore")) {
			Uri marketUri = Uri.parse("market://details?id=com.android.chrome");
			Intent marketIntent = new Intent(Intent.ACTION_VIEW, marketUri);
			((Activity)cordova).startActivity(marketIntent);
		}

        callbackContext.sendPluginResult(new PluginResult(status, result));
        return true;
	}
	
	private boolean isInstalled(String uri) {
		PackageManager pm = ((Activity)cordova).getPackageManager();
		try {
			pm.getPackageInfo(uri, PackageManager.GET_ACTIVITIES);
			return true;
		} catch (PackageManager.NameNotFoundException e) {}
		return false;
	}
	
}