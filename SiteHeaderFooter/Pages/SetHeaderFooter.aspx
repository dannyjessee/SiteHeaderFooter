<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>

    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.requestexecutor.js"></script>

    <script type="text/javascript" src="../Scripts/SetHeaderFooter.js"></script>

    <script type="text/javascript">
        // Set the style of the client web part page to be consistent with the host web.
        (function () {
            'use strict';

            var hostUrl = '';
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
            }
        })();        
    </script>
</head>
<body>
    <h1>Set site header/footer</h1>
    <input type="checkbox" id="chkHeaderEnabled" /> Enable header<br/>
    <label for="txtHeaderText">Header text: </label>
    <input type="text" ID="txtHeaderText" /><br />
    <label for="txtHeaderColor">Header color: </label>
    <input type="text" ID="txtHeaderColor" /><br />
    <label for="txtHeaderBgColor">Header background color: </label>
    <input type="text" ID="txtHeaderBgColor" /><br />
    <br />
    <input type="checkbox" id="chkFooterEnabled" /> Enable footer<br/>
    <label for="txtFooterText">Footer text: </label>
    <input type="text" ID="txtFooterText" /><br />
    <label for="txtFooterColor">Footer color: </label>
    <input type="text" ID="txtFooterColor" /><br />
    <label for="txtFooterBgColor">Footer background color: </label>
    <input type="text" ID="txtFooterBgColor" /><br /><br />
    <button onclick="DJ.SetHeaderFooter.SetValues.saveChanges()">Set Values</button>
    <br /><br />
    <p id="divOutput"></p>
</body>
</html>