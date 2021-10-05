(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['edit'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"inputEdit\">\n            <"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldTag") || (depth0 != null ? lookupProperty(depth0,"fieldTag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldTag","hash":{},"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":25}}}) : helper)))
    + " type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldType") || (depth0 != null ? lookupProperty(depth0,"fieldType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldType","hash":{},"data":data,"loc":{"start":{"line":5,"column":32},"end":{"line":5,"column":45}}}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldClass") || (depth0 != null ? lookupProperty(depth0,"fieldClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldClass","hash":{},"data":data,"loc":{"start":{"line":5,"column":54},"end":{"line":5,"column":68}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldPlaceholder") || (depth0 != null ? lookupProperty(depth0,"fieldPlaceholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldPlaceholder","hash":{},"data":data,"loc":{"start":{"line":5,"column":83},"end":{"line":5,"column":103}}}) : helper)))
    + "\"></"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldTag") || (depth0 != null ? lookupProperty(depth0,"fieldTag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldTag","hash":{},"data":data,"loc":{"start":{"line":5,"column":107},"end":{"line":5,"column":119}}}) : helper)))
    + ">\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <label class=\"checkbox-btn\">\n                        <input type=\"checkbox\" class=\"tag-checkbox\">\n                        <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tagText") || (depth0 != null ? lookupProperty(depth0,"tagText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tagText","hash":{},"data":data,"loc":{"start":{"line":15,"column":30},"end":{"line":15,"column":41}}}) : helper)))
    + "</span>\n                    </label>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<body id=\"root\">\n    <form class=\"edit-form\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"fields") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":17}}})) != null ? stack1 : "")
    + "        <div class=\"tag-container\">\n            <div class=\"column-container\">\n                <span class=\"tags-header\">Tags</span>\n                <div class=\"center-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":20},"end":{"line":17,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n        <div class=\"inputEdit\">\n            <div class=\"im-container\">\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button class=\"removeImg\"></button>\n                </div>\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button class=\"removeImg\"></button>\n                </div>\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button class=\"removeImg\"></button>\n                </div>\n            </div>\n            <button class=\"add\"></button>\n        </div>\n        <button type=\"submit\" class=\"login-button\">\n            <div class=\"center-container\">\n                <span class=\"edit-button-text\">Сохранить</span>\n                <img src=\"../icons/button_next_black.svg\" class=\"svg-next-edit\">\n            </div>\n        </button>\n    </form>\n</body>";
},"useData":true});
})();