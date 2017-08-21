$.getScript("/_layouts/15/MicrosoftAjax.js", function () {
    $.getScript("/_layouts/15/SP.Runtime.js", function () {
        $.getScript("/_layouts/15/SP.js", function () {
            Type.registerNamespace('DJ');
            DJ.HeaderFooter = DJ.HeaderFooter || {};

            DJ.HeaderFooter.Render = function () {
                var webProperties,

                getWebPropertiesSucceeded = function () {
                    var allProps = webProperties.get_fieldValues();
                    if (allProps.CustomSiteHeaderEnabled == "true") {
                        if (allProps.CustomSiteHeaderLocation == "above") {
                            $("<div id='customHeader' class='ms-dialogHidden' style='background-color:" + allProps.CustomSiteHeaderBgColor + ";color:" + allProps.CustomSiteHeaderColor + ";padding:3px;text-align:center'><b>" + allProps.CustomSiteHeaderText + "</b></div>").insertBefore("#suiteBarTop");
                        } else {
                            $("<div id='customHeader' class='ms-dialogHidden' style='background-color:" + allProps.CustomSiteHeaderBgColor + ";color:" + allProps.CustomSiteHeaderColor + ";padding:3px;text-align:center'><b>" + allProps.CustomSiteHeaderText + "</b></div>").insertAfter("#suiteBarTop");
                        }
                    }
                    if (allProps.CustomSiteFooterEnabled == "true") {
                        $("<div id='customFooter' class='ms-dialogHidden' style='display:none;background-color:" + allProps.CustomSiteFooterBgColor + ";color:" + allProps.CustomSiteFooterColor + ";padding:3px;text-align:center'><b>" + allProps.CustomSiteFooterText + "</b></div>").insertAfter("#s4-bodyContainer");
                    }

                    calcFooter();
                },

                handleError = function () {
                    alert('Error rendering header/footer');
                }

                return {
                    initializeHeaderFooter: function () {
                        var clientContext = SP.ClientContext.get_current();
                        var hostWeb = clientContext.get_web();
                        webProperties = hostWeb.get_allProperties();
                        clientContext.load(webProperties);
                        clientContext.executeQueryAsync(getWebPropertiesSucceeded, handleError);
                    }
                }
            }();

            if (typeof _spPageContextInfo != "undefined" && _spPageContextInfo != null) {
                // MDS enabled
                RegisterModuleInit(_spPageContextInfo.siteServerRelativeUrl + 'Style Library/Headerfooter.js', DJ.HeaderFooter.Render.initializeHeaderFooter);
            }
            // Run now on this page (and non-MDS scenarios)
            DJ.HeaderFooter.Render.initializeHeaderFooter();
        });
    });
});