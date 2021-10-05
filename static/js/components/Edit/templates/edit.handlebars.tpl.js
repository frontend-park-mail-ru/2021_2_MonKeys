(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['edit'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"inputEdit\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"fieldInput") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":9,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldTag") || (depth0 != null ? lookupProperty(depth0,"fieldTag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldTag","hash":{},"data":data,"loc":{"start":{"line":6,"column":13},"end":{"line":6,"column":25}}}) : helper)))
    + " type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldType") || (depth0 != null ? lookupProperty(depth0,"fieldType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldType","hash":{},"data":data,"loc":{"start":{"line":6,"column":32},"end":{"line":6,"column":45}}}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldClass") || (depth0 != null ? lookupProperty(depth0,"fieldClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldClass","hash":{},"data":data,"loc":{"start":{"line":6,"column":54},"end":{"line":6,"column":68}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldPlaceholder") || (depth0 != null ? lookupProperty(depth0,"fieldPlaceholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldPlaceholder","hash":{},"data":data,"loc":{"start":{"line":6,"column":83},"end":{"line":6,"column":103}}}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldValue") || (depth0 != null ? lookupProperty(depth0,"fieldValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldValue","hash":{},"data":data,"loc":{"start":{"line":6,"column":112},"end":{"line":6,"column":126}}}) : helper)))
    + "\"></"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldTag") || (depth0 != null ? lookupProperty(depth0,"fieldTag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldTag","hash":{},"data":data,"loc":{"start":{"line":6,"column":130},"end":{"line":6,"column":142}}}) : helper)))
    + ">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldTag") || (depth0 != null ? lookupProperty(depth0,"fieldTag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldTag","hash":{},"data":data,"loc":{"start":{"line":8,"column":13},"end":{"line":8,"column":25}}}) : helper)))
    + " type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldType") || (depth0 != null ? lookupProperty(depth0,"fieldType") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldType","hash":{},"data":data,"loc":{"start":{"line":8,"column":32},"end":{"line":8,"column":45}}}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldClass") || (depth0 != null ? lookupProperty(depth0,"fieldClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldClass","hash":{},"data":data,"loc":{"start":{"line":8,"column":54},"end":{"line":8,"column":68}}}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldPlaceholder") || (depth0 != null ? lookupProperty(depth0,"fieldPlaceholder") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldPlaceholder","hash":{},"data":data,"loc":{"start":{"line":8,"column":83},"end":{"line":8,"column":103}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldValue") || (depth0 != null ? lookupProperty(depth0,"fieldValue") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldValue","hash":{},"data":data,"loc":{"start":{"line":8,"column":105},"end":{"line":8,"column":119}}}) : helper)))
    + "</"
    + alias4(((helper = (helper = lookupProperty(helpers,"fieldTag") || (depth0 != null ? lookupProperty(depth0,"fieldTag") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fieldTag","hash":{},"data":data,"loc":{"start":{"line":8,"column":121},"end":{"line":8,"column":133}}}) : helper)))
    + ">\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <label class=\"checkbox-btn\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tagActive") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":18,"column":24},"end":{"line":22,"column":31}}})) != null ? stack1 : "")
    + "                        <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tagText") || (depth0 != null ? lookupProperty(depth0,"tagText") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"tagText","hash":{},"data":data,"loc":{"start":{"line":23,"column":30},"end":{"line":23,"column":41}}}) : helper)))
    + "</span>\n                    </label>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                        <input type=\"checkbox\" class=\"tag-checkbox\" checked>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                        <input type=\"checkbox\" class=\"tag-checkbox\">\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<body id=\"root\">\n    <form class=\"edit-form\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"fields") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "        <div class=\"tag-container\">\n            <div class=\"column-container\">\n                <span class=\"tags-header\">Tags</span>\n                <div class=\"center-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":20},"end":{"line":25,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n        <div class=\"inputEdit\">\n            <div class=\"im-container\">\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button type=\"button\" class=\"removeImg\"></button>\n                </div>\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button type=\"button\" class=\"removeImg\"></button>\n                </div>\n                <div style=\"position: relative;\">\n                    <img src=\"../img/Elon_Musk_2015.jpg\" class=\"im\">\n                    <button type=\"button\" class=\"removeImg\"></button>\n                </div>\n            </div>\n            <button type=\"button\" class=\"add\"></button>\n        </div>\n        <button type=\"submit\" class=\"login-button\">\n            <div class=\"center-container\">\n                <span class=\"edit-button-text\">Сохранить</span>\n            </div>\n        </button>\n    </form>\n</body>";
},"useData":true});
})();