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

#import "WifiLauncher.h"
#import "OpenInChromeController.h"

@implementation WifiLauncher

- (void)checkInstall:(CDVInvokedUrlCommand *)command
{
	if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"googlechrome://"]]) {
		CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
	}
	else {
		CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
	}
	
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (bool)hasChromeInstalled
{
	return [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"googlechrome://"]];
}

- (void)open:(CDVInvokedUrlCommand*)command
{
    if([self hasChromeInstalled]) {
		CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
		
		NSURL *inputURL = <the URL to open>;
		NSString *scheme = inputURL.scheme;
		
		// Replace the URL Scheme with the Chrome equivalent.
		NSString *chromeScheme = nil;
		if ([scheme isEqualToString:@"http"]) {
		  	chromeScheme = @"googlechrome";
		} else if ([scheme isEqualToString:@"https"]) {
		  	chromeScheme = @"googlechromes";
		}
		
		// Proceed only if a valid Google Chrome URI Scheme is available.
		if (chromeScheme) {
			NSString *absoluteString = [inputURL absoluteString];
			NSRange rangeForScheme = [absoluteString rangeOfString:@":"];
			NSString *urlNoScheme = [absoluteString substringFromIndex:rangeForScheme.location];
			NSString *chromeURLString = [chromeScheme stringByAppendingString:urlNoScheme];
			NSURL *chromeURL = [NSURL URLWithString:chromeURLString];
		
			// Open the URL with Chrome.
			[[UIApplication sharedApplication] openURL:chromeURL];
		}
	}
	else {
		CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
	}
	
	[self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void) openStore:(CDVInvokedUrlCommand*)command
{
	[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"itms-apps://itunes.apple.com/us/app/chrome/id535886823"]];
}

@end