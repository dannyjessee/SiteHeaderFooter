## SharePoint-hosted add-in for custom site header and footer

This is the code for the SharePoint-hosted add-in that renders a custom header and footer on all classic page experiences within a SharePoint Online site (or an on-premises SharePoint 2013/2016 site):

![Custom header and footer on classic page](https://dannyjessee.com/blog/wp-content/uploads/2017/08/classichf.png)

To set up and configure the custom header and footer parameters, the add-in also includes an app part that can be added to a classic page:

![App part for header and footer configuration](https://dannyjessee.com/blog/wp-content/uploads/2017/08/customhfapppart.png)

You can read more details about it in my blog post [here](https://dannyjessee.com/blog/index.php/2015/08/custom-site-header-and-footer-using-a-sharepoint-hosted-add-in/).

Note that this solution requires a separate [SharePoint Framework application customizer extension](https://github.com/dannyjessee/SPFxHeaderFooter) to render the header and footer on all modern pages within a SharePoint Online site. You can read more details about that [here](https://dannyjessee.com/blog/index.php/2017/08/custom-modern-page-header-and-footer-using-sharepoint-framework-part-2/). <b>To use the application customizer extension, you must first install and configure this add-in.</b>

### Building the code (for local debugging)

- Git clone the repo
- Open solution in Visual Studio
- Set site URL to local development farm or SharePoint Online developer tenant site
- Enable app sideloading on target site (if required)
- [Disable NoScript](https://dannyjessee.com/blog/index.php/2017/07/sharepoint-online-modern-team-sites-are-noscript-sites-but-communication-sites-are-not/) (if modern site)
- Press F5 to build/deploy solution for local debugging
- Trust the add-in when prompted
- Click the app's tile in the Site Contents screen to launch the add-in, which initially deploys JS files and user custom actions to the host web

### Building the code (for production deployment)

- Git clone the repo
- Open solution in Visual Studio
- Build solution in Visual Studio
- Package .app file
- Upload .app file to tenant app catalog
- [Disable NoScript](https://dannyjessee.com/blog/index.php/2017/07/sharepoint-online-modern-team-sites-are-noscript-sites-but-communication-sites-are-not/) (if modern site)
- Add an app from target site
- Trust the add-in when prompted
- Click the app's tile in the Site Contents screen to launch the add-in, which initially deploys JS files and user custom actions to the host web

### Configuring the header and footer

- Add "Set Custom Header/Footer" add-in part to a classic page
- Configure header/footer parameters
- Refresh page after setting parameters
