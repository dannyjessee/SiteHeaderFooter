Type.registerNamespace('DJ');
DJ.SetHeaderFooter = DJ.SetHeaderFooter || {};

DJ.SetHeaderFooter.GetValues = function () {
    var webProperties,
        hostWebUrl,
        appWebUrl,    
    
    getSiteHeaderFooter = function () {
        var clientContext = new SP.ClientContext(appWebUrl);
        var factory = new SP.ProxyWebRequestExecutorFactory(appWebUrl);
        clientContext.set_webRequestExecutorFactory(factory);
        var appContextSite = new SP.AppContextSite(clientContext, hostWebUrl);
        var hostWeb = appContextSite.get_web();
        webProperties = hostWeb.get_allProperties();
        clientContext.load(webProperties);
        clientContext.executeQueryAsync(getWebPropertiesSucceeded, onQueryFailed);
    },

    getWebPropertiesSucceeded = function () {
        var allProps = webProperties.get_fieldValues();
        if (allProps.CustomSiteHeaderEnabled != undefined) {
            if (allProps.CustomSiteHeaderEnabled == "true") {
                chkHeaderEnabled.checked = true;
            }
        }
        if (allProps.CustomSiteHeaderLocation != undefined) {
            ddHeaderLocation.value = allProps.CustomSiteHeaderLocation;
        }
        if (allProps.CustomSiteHeaderText != undefined) {
            txtHeaderText.value = allProps.CustomSiteHeaderText;
        }
        if (allProps.CustomSiteHeaderColor != undefined) {
            txtHeaderColor.value = allProps.CustomSiteHeaderColor;
        }
        if (allProps.CustomSiteHeaderBgColor != undefined) {
            txtHeaderBgColor.value = allProps.CustomSiteHeaderBgColor;
        }

        if (allProps.CustomSiteFooterEnabled != undefined) {
            if (allProps.CustomSiteFooterEnabled == "true") {
                chkFooterEnabled.checked = true;
            }
        }
        if (allProps.CustomSiteFooterText != undefined) {
            txtFooterText.value = allProps.CustomSiteFooterText;
        }
        if (allProps.CustomSiteFooterColor != undefined) {
            txtFooterColor.value = allProps.CustomSiteFooterColor;
        }
        if (allProps.CustomSiteFooterBgColor != undefined) {
            txtFooterBgColor.value = allProps.CustomSiteFooterBgColor;
        }
    },

    onQueryFailed = function (sender, args) {
        $('#divOutput').html('<font color=red><b>ERROR: ' + args.get_message() + '</b></font>');
    },

    init = function () {
        hostWebUrl = decodeURIComponent(DJ.SetHeaderFooter.Utility.getQueryStringParameter("SPHostUrl"));
        appWebUrl = decodeURIComponent(DJ.SetHeaderFooter.Utility.getQueryStringParameter("SPAppWebUrl"));
    }

    return {
        execute: function () {
            init();

            // Attempt to read header/footer configuration values from web property bag
            getSiteHeaderFooter();
        }
    }
}();

DJ.SetHeaderFooter.SetValues = function() {
    var hostWebUrl,
        appWebUrl,

    setWebPropertiesSucceeded = function () {
        $('#divOutput').html('<font color=green><b>Values updated successfully! Refresh the page to see the changes.</b></font>');
    },

    onQueryFailed = function (sender, args) {
        $('#divOutput').html('<font color=red><b>ERROR: ' + args.get_message() + '</b></font>');
    }

    return {
        saveChanges: function () {
            hostWebUrl = decodeURIComponent(DJ.SetHeaderFooter.Utility.getQueryStringParameter("SPHostUrl"));
            appWebUrl = decodeURIComponent(DJ.SetHeaderFooter.Utility.getQueryStringParameter("SPAppWebUrl"));

            var clientContext = new SP.ClientContext(appWebUrl);
            var factory = new SP.ProxyWebRequestExecutorFactory(appWebUrl);
            clientContext.set_webRequestExecutorFactory(factory);
            var appContextSite = new SP.AppContextSite(clientContext, hostWebUrl);
            var hostWeb = appContextSite.get_web();
            webProperties = hostWeb.get_allProperties();
            if (chkHeaderEnabled.checked) {
                webProperties.set_item("CustomSiteHeaderEnabled", "true");
                webProperties.set_item("CustomSiteHeaderLocation", ddHeaderLocation.value);
                webProperties.set_item("CustomSiteHeaderText", txtHeaderText.value);
                webProperties.set_item("CustomSiteHeaderColor", txtHeaderColor.value);
                webProperties.set_item("CustomSiteHeaderBgColor", txtHeaderBgColor.value);
            } else {
                webProperties.set_item("CustomSiteHeaderEnabled", "false");
            }

            if (chkFooterEnabled.checked) {
                webProperties.set_item("CustomSiteFooterEnabled", "true");
                webProperties.set_item("CustomSiteFooterText", txtFooterText.value);
                webProperties.set_item("CustomSiteFooterColor", txtFooterColor.value);
                webProperties.set_item("CustomSiteFooterBgColor", txtFooterBgColor.value);
            } else {
                webProperties.set_item("CustomSiteFooterEnabled", "false");
            }

            hostWeb.update();

            clientContext.executeQueryAsync(setWebPropertiesSucceeded, onQueryFailed);
        }
    }
}();

DJ.SetHeaderFooter.Utility = {
    getQueryStringParameter: function (param) {
        var params = document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == param) {
                return singleParam[1];
            }
        }
    }
};

$(document).ready(function () {
    DJ.SetHeaderFooter.GetValues.execute();
});