(function() {
  alert("LOADED");
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['feedExpanded'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"tag\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"cardMainID\" class=\"card-main-expand\">\n            <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"img") : stack1), depth0))
    + "\" class=\"card-el profile-image-expand\" />\n            <div class=\"name-container\">\n                <div class=\"name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\n                <div class=\"age\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"age") : stack1), depth0))
    + "</div>\n            </div>\n            <div class=\"card-el bord\"></div>\n            <div class=\"card-el desc\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</div>\n            <div class=\"card-el bord\"></div>\n            <div id=\"tagsID\" class=\"card-el tags-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"card") : depth0)) != null ? lookupProperty(stack1,"tags") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":16},"end":{"line":13,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n        <div id=\"shrinkID\" class=\"forshrink\"><button class=\"menu-icon\"><img src=\"icons/button_shrink_white.svg\"\n                    class=\"shrink-card\" alt=\"shrink\" style=\"width: 50px; height: 50px;\" /></button></div>\n</div>\n    ";
},"useData":true});
})();