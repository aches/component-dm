{
  "title":"<%= form.name %>",
  "dependencies":[],
  "author":"<%= form.developerName %>",
  "meta":{"viewport": "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"},
  "config": {
    "showReset": <%= form.reset%>,
    "adapterMobilePanel": <%= form.adaptationMobile%>,
    "showMobileExpandIco": <%= form.expand%>,
    "mobilePanelAlpha": <%= form.controlPanel%>,
    "showMobileResetIco": <%= form.resetMobile%>,
    "controlPanelAnimationDelay": <%= form.animationDelayTime%>,
    "isEncryption": <%= form.encryption%> ,
    "isForcedlandscape": <%= form.forcedLandscape%>
  }
}