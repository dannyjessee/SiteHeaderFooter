Type.registerNamespace('DJ');
DJ.AddInInstall = DJ.AddInInstall || {};

DJ.AddInInstall.HostWebSetup = function () {
    var hostWebUrl,
        appWebUrl,
        hostWebContext,
        appWebContext,
        hostWebCustomActions,

    readFileFromAppWebAndProvisionToHost = function (fileName) {
        $.ajax({
            url: appWebUrl + '/Scripts/' + fileName,
            type: 'GET',
            dataType: 'text',
            async: false,
            cache: false
        }).done(function (fileContents) {
            if (fileContents !== undefined && fileContents.length > 0) {
                uploadFileToHostWebViaCSOM('Style Library', fileName, fileContents);
            }
            else {
                alert('Error: Failed to read file from app web.');
            }
        });
    },

    uploadFileToHostWebViaCSOM = function (serverRelativeUrl, filename, contents) {
        var createInfo = new SP.FileCreationInformation();
        createInfo.set_content(new SP.Base64EncodedByteArray());
        for (var i = 0; i < contents.length; i++) {
            createInfo.get_content().append(contents.charCodeAt(i));
        }
        createInfo.set_overwrite(true);
        createInfo.set_url(filename);
        var files = hostWebContext.get_web().getFolderByServerRelativeUrl(serverRelativeUrl).get_files();
        var file = files.add(createInfo);
        file.checkIn('Add-in deployment.')
        file.publish('Add-in deployment.');

        appWebContext.load(file);
        appWebContext.executeQueryAsync(onProvisionFileSuccess, onProvisionFileFail);
    },

    activateHeaderFooter = function () {
        hostWebCustomActions = hostWebContext.get_web().get_userCustomActions();

        activateUserCustomAction(10023, 'jquery-1.9.1.min.js');
        activateUserCustomAction(10024, 'HeaderFooter.js');
        activateUserCustomAction(10025, 'StickyFooter.js');

        appWebContext.load(hostWebCustomActions);
        appWebContext.executeQueryAsync(onActivateSuccess, onActivateError);
    },

    activateUserCustomAction = function (sequence, fileName) {
        var customAction = hostWebCustomActions.add();
        customAction.set_location("ScriptLink");
        customAction.set_sequence(sequence);
        customAction.set_scriptSrc('~SiteCollection/Style Library/' + fileName);
        customAction.update();
    },

    onProvisionFileSuccess = function () {
        $('#fileDeployOutput').html('<font color=green><b>Files deployed successfully to host web.</b></font><br/>');
    },
    onProvisionFileFail = function () {
        alert('Failed to provision file into host web. Error: ' + args.get_message());
    },

    onActivateSuccess = function () {
        $('#activateOutput').html('<font color=green><b>Header and footer custom actions activated successfully in host web.</b></font><br/>');
    },
    onActivateError = function (sender, args) {
        alert('Failed to activate header and footer custom actions in host web. Error: ' + args.get_message());
    },

    getQueryStringParameter = function (param) {
        var params = document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == param) {
                return singleParam[1];
            }
        }
    },

    init = function () {
        hostWebUrl = decodeURIComponent(getQueryStringParameter('SPHostUrl'));
        appWebUrl = decodeURIComponent(getQueryStringParameter('SPAppWebUrl'));

        appWebContext = new SP.ClientContext(appWebUrl);
        hostWebContext = new SP.AppContextSite(appWebContext, hostWebUrl);
    }

    return {
        execute: function () {
            init();

            // Provision these three files to the host web's Style Library and activate user custom action for each one
            readFileFromAppWebAndProvisionToHost('HeaderFooter.js');
            readFileFromAppWebAndProvisionToHost('StickyFooter.js');
            readFileFromAppWebAndProvisionToHost('jQuery-1.9.1.min.js');
            activateHeaderFooter();
        }
    }
}();

$(document).ready(function () {
    ExecuteOrDelayUntilScriptLoaded(DJ.AddInInstall.HostWebSetup.execute, "sp.js");
});