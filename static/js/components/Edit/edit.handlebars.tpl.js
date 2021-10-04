(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['edit'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"inputEdit\">\n            <input type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldType") || (depth0 != null ? lookupProperty(depth0,"fieldType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldType","hash":{},"data":data,"loc":{"start":{"line":5,"column":25},"end":{"line":5,"column":38}}}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldClass") || (depth0 != null ? lookupProperty(depth0,"fieldClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldClass","hash":{},"data":data,"loc":{"start":{"line":5,"column":47},"end":{"line":5,"column":61}}}) : helper)))
    + "\">\n        </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <li>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tagText") || (depth0 != null ? lookupProperty(depth0,"tagText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tagText","hash":{},"data":data,"loc":{"start":{"line":25,"column":32},"end":{"line":25,"column":43}}}) : helper)))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<body id=\"root\">\n    <form class=\"edit-form\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"fields") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":17}}})) != null ? stack1 : "")
    + "        <div class=\"edit-tags\">\n            Tags:\n            <button id=\"addID\" class=\"add-active\">\n            </button>\n            <span class=\"msg\"></span> \n        </div>\n        <div class=\"inputEdit\">\n            <div class=\"container\">   \n                <div class=\"dropdown-disactive\">\n                    <div class=\"select\">\n                        <span>Select Tags</span>\n                    </div>\n                    <ul class=\"dropdown-menu\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":24},"end":{"line":26,"column":33}}})) != null ? stack1 : "")
    + "                    </ul>\n                </div>\n            </div>\n        </div>\n        <div class=\"selectBox\">\n        </div>\n        <div class=\"inputEdit\">\n            <div class=\"im-container\">\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button class=\"removeImg\"></button>\n                </div>\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button class=\"removeImg\"></button>\n                </div>\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button class=\"removeImg\"></button>\n                </div>\n            </div>\n            <button class=\"add\"></button>\n        </div>\n        <button type=\"submit\" class=\"login-button\">\n            <div class=\"center-container\">\n                <span class=\"edit-button-text\">Сохранить</span>\n                <img src=\"../icons/button_next_black.svg\" class=\"svg-next-edit\">\n            </div>\n        </button>\n    </form>\n</body>";
},"useData":true});
})();