## SharePoint-hosted add-in for custom site header and footer

This is the code for the SharePoint-hosted add-in that renders a custom header and footer on all classic page experiences within a SharePoint Online site (or an on-premises SharePoint 2013/2016 site). You can read more details about it in my blog post [here](https://dannyjessee.com/blog/index.php/2015/08/custom-site-header-and-footer-using-a-sharepoint-hosted-add-in/).

[IMAGE]

Note that this solution requires a separate [SharePoint Framework application customizer extension](https://github.com/dannyjessee/SPFxHeaderFooter) to render the header and footer on all modern pages within a SharePoint Online site. You can read more details about that [here](https://dannyjessee.com/blog/index.php/2017/08/custom-modern-page-header-and-footer-using-sharepoint-framework-part-2/). <b>To use the application customizer extension, you must first install and configure this add-in.</b>

### Building the code (for local debugging)

- Set site URL to local development farm or SharePoint Online developer tenant site
- Enable app sideloading on target site if required
- Disable NoScript if modern site
- Build solution in Visual Studio
- F5
- Trust [IMAGE]
- Launch app to deploy JS and user custom actions [IMAGE]

### Building the code (for production deployment)

- Build solution in Visual Studio
- Package .app file
- Upload .app to tenant app catalog site
- Disable NoScript if modern site
- Add an app from target site
- Trust [IMAGE]
- Launch app to deploy JS and user custom actions [IMAGE]

### Configuring the header and footer

- Add add-in part to classic page experience
- Configure parameters

[IMAGE]
