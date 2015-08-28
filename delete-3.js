jQuery.extend({

  // Add in style property hooks for overriding the default
  // behavior of getting and setting a style property
  cssHooks: {
    opacity: {
      get: function(elem, computed) {
        if (computed) {

          // We should always get a number back from opacity
          var ret = curCSS(elem, "opacity");
          return ret === "" ? "1" : ret;
        }
      }
    }
  },

  // Don't automatically add "px" to these possibly-unitless properties
  cssNumber: {
    "columnCount": true,
    "fillOpacity": true,
    "flexGrow": true,
    "flexShrink": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
  },

  // Add in properties whose names you wish to fix before
  // setting or getting the value
  cssProps: {
    "float": "cssFloat"
  },

  // Get and set the style property on a DOM Node
  style: function(elem, name, value, extra) {

    // Don't set styles on text and comment nodes
    if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
      return;
    }

    // Make sure that we're working with the right name
    var ret, type, hooks,
      origName = jQuery.camelCase(name),
      style = elem.style;

    name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

    // Gets hook for the prefixed version, then unprefixed version
    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

    // Check if we're setting a value
    if (value !== undefined) {
      type = typeof value;

      // Convert "+=" or "-=" to relative numbers (#7345)
      if (type === "string" && (ret = rrelNum.exec(value))) {
        value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
        // Fixes bug #9237
        type = "number";
      }

      // Make sure that null and NaN values aren't set (#7116)
      if (value == null || value !== value) {
        return;
      }

      // If a number, add 'px' to the (except for certain CSS properties)
      if (type === "number" && !jQuery.cssNumber[origName]) {
        value += "px";
      }

      // Support: IE9-11+
      // background-* props affect original clone's values
      if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
        style[name] = "inherit";
      }

      // If a hook was provided, use that value, otherwise just set the specified value
      if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
        style[name] = value;
      }

    } else {
      // If a hook was provided get the non-computed value from there
      if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
        return ret;
      }

      // Otherwise just get the value from the style object
      return style[name];
    }
  },

  css: function(elem, name, extra, styles) {
    var val, num, hooks,
      origName = jQuery.camelCase(name);

    // Make sure that we're working with the right name
    name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

    // Try prefixed name followed by the unprefixed name
    hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

    // If a hook was provided get the computed value from there
    if (hooks && "get" in hooks) {
      val = hooks.get(elem, true, extra);
    }

    // Otherwise, if a way to get the computed value exists, use that
    if (val === undefined) {
      val = curCSS(elem, name, styles);
    }

    // Convert "normal" to computed value
    if (val === "normal" && name in cssNormalTransform) {
      val = cssNormalTransform[name];
    }

    // Make numeric if forced or a qualifier was provided and val looks numeric
    if (extra === "" || extra) {
      num = parseFloat(val);
      return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
    }
    return val;
  }
})
