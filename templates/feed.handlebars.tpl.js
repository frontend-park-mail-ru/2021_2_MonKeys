(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['feed'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <button class=\"menu-icon\">\n                <img\n                src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"actionIcon") || (depth0 != null ? lookupProperty(depth0,"actionIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actionIcon","hash":{},"data":data,"loc":{"start":{"line":16,"column":21},"end":{"line":16,"column":35}}}) : helper)))
    + "\"\n                class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"actionClass") || (depth0 != null ? lookupProperty(depth0,"actionClass") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actionClass","hash":{},"data":data,"loc":{"start":{"line":17,"column":23},"end":{"line":17,"column":38}}}) : helper)))
    + "\"\n                />\n            </button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card-container\">\n  <div class=\"card3\"></div>\n  <div class=\"card3\"></div>\n  <div class=\"card2\"></div>\n  <div class=\"card\">\n    <div class=\"card-main\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"img") : stack1), depth0))
    + "\" class=\"profile-image\" />\n      <div class=\"bottom-panel\">\n        <div class=\"name-container\">\n          <div class=\"name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\n          <div class=\"age\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"age") : stack1), depth0))
    + "</div>\n        </div>\n        <div class=\"actions-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"actions") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":12},"end":{"line":20,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
})();