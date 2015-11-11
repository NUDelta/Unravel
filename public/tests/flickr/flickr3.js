(function () {
  page_timing.js_assets_start = new Date()
    .getTime();


  F.intl = 'en-us';

  var yconf = {
    "flickr": {
      "is_secure": true,
      "flags": {
        "enable_grease": true,
        "enable_advanced_gestures": true,
        "enable_advanced_gestures_lightbox": true,
        "enable_desktop_lightbox_retina_images": true,
        "enable_fave_keyboard_shortcut": true,
        "enable_sets_keyboard_shortcut": true,
        "enable_faves_manage": true,
        "enable_galleries_context": true,
        "enable_rapid_tracking": true,
        "enable_groups_keyboard_shortcut": true,
        "enable_gallery_keyboard_shortcut": true,
        "enable_addperson_keyboard_shortcut": true,
        "enable_tags_keyboard_shortcut": true,
        "enable_comments_keyboard_shortcut": true,
        "enable_sitekey_fetcher": true,
        "enable_keyboard_shortcut_legend": true,
        "enable_keyboard_shortcut_legend_keyboard_layouts": true,
        "enable_keyboard_shortcuts": true,
        "enable_faves_page_flanal": true,
        "enable_viewing_party_ie9_support_messages": true,
        "enable_facebook_2": true,
        "enable_touch_lightbox_searchified": true,
        "enable_tag_selecta_photogne": true,
        "enable_tag_selecta_uploadr": true,
        "enable_exif_thumbs": true,
        "enable_justified_search": true,
        "enable_retina_justified": true,
        "aviary_photo_editing": true,
        "enable_jsfail_detection": true,
        "enable_farm_timing_sampling": true,
        "enable_high_res_pref": true,
        "enable_liquid_everything": true,
        "enable_justified_explore": true,
        "enable_account_order_redesign": true,
        "enable_global_nav": true,
        "enable_ywa_rapid": true,
        "enable_photopage_perf": true,
        "enable_homerun_navtiming_beacon": true,
        "enable_uh_eyebrow": true,
        "enable_2013_photo_page": true,
        "enable_2013_photo_page_extras": true,
        "enable_ken_burns": true,
        "enable_ken_burns_face": true,
        "enable_hermes_sihp_fb_friendfinder": true,
        "enable_hermes_sihp_deferred_sidebar": true,
        "enable_refresh_sihp_feed_ads": true,
        "enable_justified_inline_ads": true,
        "enable_justified_view_inline_commenting": true,
        "enable_justified_groups": true,
        "enable_sihp_viewcount": true,
        "enable_photostream_viewcount": true,
        "enable_n_to_ldrb_ads": true,
        "enable_follow_theme": true,
        "enable_group_post_beta": true,
        "enable_ads_on_login_page": 1,
        "enable_playr": true,
        "enable_merch_from_organizr": true,
        "enable_set_to_album_change": true,
        "enable_https_api": true,
        "enable_client_fullpath_api": true,
        "enable_simple_client_side_utf8_escaping": true,
        "enable_cameraroll": true
      },
      "formatting": {
        "thousandsSeparator": ",",
        "decimalSeparator": "."
      },
      "farm_samples": {
        "f1": 4,
        "f2": 5,
        "f3": 15,
        "f4": 20,
        "f5": 20,
        "f6": 20,
        "f7": 20,
        "f8": 70,
        "f9": 20,
        "f10": 20
      },
      "is_zeus": true,
      "justified_row_height": 330,
      "lang": "en-us",
      "photo_root": "http:\/\/farm.staticflickr.com\/",
      "site_root": "https:\/\/www.flickr.com",
      "images_root": "https:\/\/s.yimg.com\/pw\/images",
      "intl_images_root": "https:\/\/s.yimg.com\/pw\/images\/en-us",
      "int2lang": {
        "1": "en-us",
        "2": "fr-fr",
        "3": "es-us",
        "4": "de-de",
        "5": "it-it",
        "6": "pt-br",
        "7": "ko-kr",
        "9": "zh-hk",
        "13": "vn-vn",
        "14": "id-id"
      },
      "search": {
        "textsearch_enabled": true,
        "search_scope": "all"
      },
      "photos": [],
      "contact_limit": 100000,
      "server_timestamp": 1426875501,
      "magic_cookie": "231400b22a5af59b454b58f05cdb46e7",
      "filmstrips": {
        "preload_page_count": 2,
        "photos_per_page": 4,
        "container": "#sidebar"
      },
      "notes": {
        "can_add_note": false,
        "can_add_person": false,
        "ratio": "0.000000",
        "count": "0.000000",
        "max_count": 100
      },
      "video_player_version": "1535363810",
      "lightbox": {
        "enable": false,
        "enable_faves": true,
        "enable_comments": true,
        "enable_favorites_count": true,
        "node_prune_threshold": 50,
        "node_prune_amount": 10,
        "position_preload_limit": 10,
        "position_preload_threshold": 5,
        "image_preload_limit": 2,
        "hd_default": false,
        "video_autoplay": true,
        "enable_mobile_lightbox": true,
        "enable_mobile_lightbox_pinch_zoom": true,
        "enable_fullscreen": true,
        "spaceid": 792600515,
        "biggering_2013": true
      },
      "max_photo_ids_per_api_call": 20,
      "flickr_api_uri_direct": "https:\/\/api.flickr.com\/services\/rest\/",
      "host_ip": "127.0.0.1",
      "radjax_endpoint": "https:\/\/y-flickr.yahoo.com\/ad",
      "static_domain": "staticflickr.com",
      "user": {
        "user_ok": false,
        "useragent_fully_supported": true,
        "useragent_reboot_supported": true,
        "enable_alternate_map_type": 4
      },
      "printing": {
        "use_printcart": true,
        "snapfish_cart_url": "http:\/\/www.snapfish.com\/flickrentry\/"
      },
      "sharing": [],
      "nav_selecta": {
        "additional_sections": [{
          "name": "Terms of Use",
          "sectionType": "text",
          "url": "\/help\/terms\/"
        }, {
          "name": "Your Privacy",
          "sectionType": "text",
          "url": "\/help\/privacy-policy\/"
        }, {
          "name": "Copyright\/IP Policy",
          "sectionType": "text",
          "url": "https:\/\/info.yahoo.com\/legal\/us\/yahoo\/copyright\/en-us\/"
        }]
      },
      "people": {
        "api_url": "",
        "can_only_add_self": true
      },
      "tags": {
        "api_url": ""
      },
      "iphone_app_store_url": "https:\/\/itunes.apple.com\/app\/flickr\/id328407587"
    },
    "flickrAPI": {
      "flickr_api_uri": "https:\/\/api.flickr.com\/services\/rest",
      "api_key": "c5616ac70488fef412c2ebdbc30fc34a",
      "auth_hash": "231400b22a5af59b454b58f05cdb46e7",
      "auth_token": "",
      "secret": "7ebafd5e9722fc05"
    },
    "flickrMap": {
      "generatedInYconf": true,
      "enable_alternate_tiles_plugin": 1
    },
    "yui2": "2.5.2",
    "loadOptional": false,
    "combine": true,
    "root": "",
    "base": "https:\/\/s.yimg.com\/pw\/combo\/1\/3.11.0?",
    "comboBase": "https:\/\/s.yimg.com\/pw\/combo\/1\/3.11.0?",
    "workerBase": "\/combo\/1\/3.11.0?",
    "maxURLLength": 1999,
    "dev": false,
    "debug": false,
    "modules": {
      "account-manage": {
        "path": "j\/.IR-manage.A.v4BHoo1i",
        "requires": ["flickr-dialog", "io-base", "sprintf", "yui-base"],
        "ext": false
      },
      "account-order-transjax": {
        "path": "j\/.IR-.JM-.C-.F.A.v3UdcEon",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "account-order-ywa-tracking": {
        "path": "j\/.IR-.JM-ywa-.BW.A.v34DhkjH",
        "requires": ["event", "datatype-date-format", "yahoo-web-analytics", "yui-base"],
        "ext": false
      },
      "account-order-manage-ywa-tracking": {
        "path": "j\/.IR-.JM-manage-ywa-.BW.A.vtgNQ6P",
        "requires": ["event", "datatype-date-format", "yahoo-web-analytics", "yui-base"],
        "ext": false
      },
      "account-order-zeus": {
        "path": "j\/.IR-.JM-.D.A.v5voG1Z",
        "requires": ["account-order-transjax", "io-base", "sprintf", "yui-base"],
        "ext": false
      },
      "account-refund": {
        "path": "j\/.IR-refund.A.v4Lfs68x",
        "requires": ["flickr-dialog", "io-base", "rapid-tracker", "sprintf", "yui-base"],
        "ext": false
      },
      "account-rules": {
        "path": "j\/.IR-rules.A.v39GHx5Z",
        "requires": ["dd-constrain", "dd-drop", "dd-proxy", "event", "flickr-dialog-confirmation", "gallery-flickr-api", "node", "yui-base"],
        "ext": false
      },
      "account-upgrade": {
        "path": "j\/.IR-upgrade.A.v2otNtn8",
        "requires": ["flickr-dialog", "io-base", "rapid-tracker", "sprintf", "yui-base"],
        "ext": false
      },
      "actions-menu-css": {
        "path": "c\/c_.IS-.BB.BC.vDw9uSV",
        "type": "css",
        "ext": false
      },
      "ad-masker": {
        "path": "j\/ad-masker.A.v31s77Vp",
        "requires": ["node", "page-context", "yui-base"],
        "ext": false
      },
      "add-to-dialog-css": {
        "path": "c\/c_.KQ.W-.D.BC.v4jGJnYM",
        "type": "css",
        "ext": false
      },
      "addressbook": {
        "path": "j\/.HE.A.v2m9UFpc",
        "requires": ["better-throttle", "event", "gallery-flickr-api", "io", "node", "yui-base"],
        "ext": false
      },
      "autocomplete-2-5-1": {
        "path": "j\/.CM\/.BA_2.5.1-.D.A.v3tw7ww2",
        "requires": ["yui2-datasource", "yui2-dom", "yui2-event", "yui2-yahoo"],
        "ext": false
      },
      "autosuggest": {
        "path": "j\/autosuggest.A.v3VusL6F",
        "requires": ["promise", "oop", "base", "querystring-stringify-simple", "text-accentfold", "template-base", "handlebars-base", "autocomplete", "io", "node", "yui-base"],
        "ext": false
      },
      "aviary-editor-frame-css": {
        "path": "c\/c_aviary-.GZor-.JW.BC.v6AhazMF",
        "type": "css",
        "ext": false
      },
      "aviary-editor-frame-transjax": {
        "path": "j\/aviary-.GZor-.JW-.C-.F.A.v2tQNR3M",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "aviary-editor-frame": {
        "path": "j\/aviary-.GZor-.JW.A.v2G8WFpp",
        "requires": ["base", "aviary-editor-frame-css", "aviary-editor-frame-transjax", "event", "flickr-dialog-frame", "flickr-dialog-spinner", "yui-base"],
        "ext": false
      },
      "batchr-photo-privacy": {
        "path": "j\/batchr-.B-privacy.A.v6CX5qTP",
        "requires": ["batchr-photo-privacy-transjax", "flickr-dialog", "gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "batchr-photo-privacy-transjax": {
        "path": "j\/batchr-.B-privacy-.C-.F.A.vm85d2x",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "beehive-contact-suggestions": {
        "path": "j\/.IT-.FF-.IL.A.v296FdiP",
        "requires": ["anim", "beehive-contact-suggestions-transjax", "contact-changer", "gallery-flickr-api", "node", "yui-base"],
        "ext": false
      },
      "beehive-contact-suggestions-transjax": {
        "path": "j\/.IT-.FF-.IL-.C-.F.A.v4SqJJAD",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "better-throttle": {
        "path": "j\/.EH-.EB.A.v4Y6MZP4",
        "requires": ["yui-base", "yui-later"],
        "ext": false
      },
      "bitmap-text": {
        "path": "j\/.Z-.DK-.D.A.v3GZgG4K",
        "requires": ["yui-base"],
        "ext": false
      },
      "bitmap-type-silkscreen": {
        "path": "j\/.Z-.DJ-.BJ.A.v44xwL5i",
        "requires": ["yui-base"],
        "ext": false
      },
      "boomerang": {
        "path": "j\/.JK.A.v4JY96ck",
        "requires": ["yui-base"],
        "ext": false
      },
      "box-host": {
        "path": "j\/box-.DG.A.vQFsQj2",
        "requires": ["event-mousedrag", "math", "node", "yui-base"],
        "ext": false
      },
      "bo-selecta": {
        "path": "j\/.HO-.D.A.v38WivQM",
        "requires": ["anim", "autocomplete-2-5-1", "bo-selecta-css", "bo-selecta-transjax", "event", "event-custom", "gallery-flickr-api", "io-base", "node", "string-filters", "yui-base"],
        "ext": false
      },
      "bo-selecta-3": {
        "path": "j\/.HO-3.A.v28QUUe4",
        "requires": ["anim", "autocomplete", "bo-selecta-3-css", "bo-selecta-global-search-datasource", "bo-selecta-transjax", "datasource-function", "event", "event-custom", "gallery-flickr-api", "image-fader", "io-base", "node", "string-filters", "widget", "yui-base"],
        "optional": ["contact-changer"],
        "ext": false
      },
      "bo-selecta-css": {
        "path": "c\/c_.HO-.D.BC.v63i562p",
        "type": "css",
        "ext": false
      },
      "bo-selecta-3-css": {
        "path": "c\/c_.HO-3.BC.v4cQs5o6",
        "type": "css",
        "ext": false
      },
      "bo-selecta-global-search-datasource": {
        "path": "j\/.HO-.X-.CA-.BYsource.A.v6qL8epc",
        "requires": ["bo-selecta-transjax", "datasource-local", "gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "bo-selecta-transjax": {
        "path": "j\/.HO-.C-.F.A.v3RnApgT",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "cache-simple": {
        "path": "j\/.EJ-.GK.A.vZTkJj6",
        "requires": ["yui-base"],
        "ext": false
      },
      "ccv": {
        "path": "j\/ccv.A.v3S8Diw6",
        "requires": ["yui-base"],
        "ext": false
      },
      "comscore": {
        "path": "j\/.JN.A.vWzwziF",
        "ext": false
      },
      "contact-changer": {
        "path": "j\/.FF-.FG-.D.A.v221qLoM",
        "requires": ["contact-changer-css", "contact-changer-transjax", "refresh-sihp-transjax", "event-custom", "event-delegate", "gallery-flickr-api", "global-dialog", "io-base", "yui-base"],
        "ext": false
      },
      "contact-changer-css": {
        "path": "c\/c_.FF-.FG-.D.BC.v4n5EtmR",
        "type": "css",
        "ext": false
      },
      "contact-changer-transjax": {
        "path": "j\/.FF-.FG-.C-.F.A.v5dTMiEi",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "context-data": {
        "path": "j\/.H-.BY.A.v5czdxmZ",
        "requires": ["event-custom", "gallery-flickr-api", "photo-data", "urls", "yui-base"],
        "ext": false
      },
      "cookie-crusher": {
        "path": "j\/.CK-crusher.A.v2pZpMgx",
        "requires": ["cookie"],
        "ext": false
      },
      "dataview": {
        "path": "j\/.BY.JB.A.v3LTyzec",
        "requires": ["yui-base"],
        "ext": false
      },
      "date-widgets": {
        "path": "j\/.HB-.EZs.A.v4BwbEAn",
        "requires": ["yui-base"],
        "optional": ["datatype-date", "event", "gallery-calendar", "node"],
        "ext": false
      },
      "defer-images": {
        "path": "j\/.GI-.GC.A.v3vESs92",
        "requires": ["node-visibility", "retry-image-on-error", "yui-base"],
        "ext": false
      },
      "dejaview": {
        "path": "j\/.BZ-.D.A.v6pZLWTF",
        "requires": ["cookie", "yui-base"],
        "ext": false
      },
      "discussion-comments": {
        "path": "j\/discussion-.LGs.A.v3jYv5MB",
        "requires": ["event", "node", "yui-base"],
        "ext": false
      },
      "donut-progress-ui": {
        "path": "j\/donut.ID-ui.A.vXPRnY6",
        "requires": ["yui-base"],
        "ext": false
      },
      "dynamic-messaging": {
        "path": "j\/dynamic-messaging.A.v2r7xMpx",
        "requires": ["io-form", "gallery-flickr-api", "message-primary-email-transjax", "transjax-base", "yui-base"],
        "ext": false
      },
      "editr": {
        "path": "j\/.GZr.A.v3KzZWgP",
        "requires": ["boomerang", "editr-edit-panel", "editr-errors", "editr-grid", "editr-progress", "editr-publish-dialog", "editr-toolbar", "event-base", "feature-tour", "health-check", "gallery-popover", "page-context", "polyfills-placeholder", "yui-base"],
        "optional": ["editr-file-picker", "editr-photo-picker", "editr-upload-queue", "flickr-dialog"],
        "ext": false
      },
      "editr-blocked": {
        "path": "j\/.GZr-blocked.A.v6CW1xNz",
        "requires": ["cookie", "yui-base"],
        "ext": false
      },
      "editr-data-base": {
        "path": "j\/.KA.BL.A.v2vaRZQD",
        "requires": ["array-extras", "event-custom", "yui-base"],
        "ext": false
      },
      "editr-data-groups": {
        "path": "j\/.KA.DMs.A.v4o7Nqzx",
        "requires": ["editr-data-photos", "editr-data-base", "type-cast", "yui-base"],
        "ext": false
      },
      "editr-data-people": {
        "path": "j\/.KA.L.A.v5xhGbon",
        "requires": ["editr-data-base", "type-cast", "yui-base"],
        "ext": false
      },
      "editr-data-photos": {
        "path": "j\/.KA.EC.A.v2kNUX5a",
        "requires": ["editr-data-base", "type-cast", "yui-base"],
        "ext": false
      },
      "editr-data-sets": {
        "path": "j\/.KA.KF.A.v4c18YQ6",
        "requires": ["editr-data-photos", "editr-data-base", "escape", "type-cast", "yui-base"],
        "ext": false
      },
      "editr-edit-panel": {
        "path": "j\/.GZr-.GZ.IC.A.v2MJqyT8",
        "requires": ["better-throttle", "editr-data-photos", "editr-edit-panel-tooltip", "editr-edit-panel-groups", "editr-edit-panel-owner-settings", "editr-edit-panel-people", "editr-edit-panel-sets", "editr-edit-panel-tags", "editr-edit-panel-title-description", "editr-edit-panel-transjax", "editr-grid", "event-base", "substitute", "string-filters", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-component": {
        "path": "j\/.JZ.JY.A.vaxZVuR",
        "requires": ["event-base", "keyboard-shortcut-manager", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-groups": {
        "path": "j\/.JZ.DMs.A.v2Rk8Pj2",
        "requires": ["editr-data-photos", "editr-data-groups", "editr-edit-panel-tooltip", "editr-edit-panel-transjax", "event-base", "flickr-dialog", "keyboard-shortcut-manager", "string-filters", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-location": {
        "path": "j\/.JZ.BR.A.v37ZLrsz",
        "requires": ["editr-data-photos", "editr-edit-panel-component", "editr-edit-panel-transjax", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-owner-settings": {
        "path": "j\/.JZ.BK-.FR.A.v2bxnpSe",
        "requires": ["editr-data-photos", "editr-edit-panel-component", "editr-edit-panel-transjax", "yui-base"],
        "optional": ["date-widgets"],
        "ext": false
      },
      "editr-edit-panel-people": {
        "path": "j\/.JZ.L.A.v3sSeYXT",
        "requires": ["bo-selecta-3", "editr-data-people", "editr-data-photos", "editr-edit-panel-component", "editr-edit-panel-transjax", "event-base", "flickr-dialog", "photo-keyboard-shortcuts-transjax", "photo-people-transjax", "string-filters", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-sets": {
        "path": "j\/.JZ.KF.A.v6updGS2",
        "requires": ["editr-data-photos", "editr-data-sets", "editr-edit-panel-tooltip", "editr-edit-panel-transjax", "event-base", "flickr-dialog", "keyboard-shortcut-manager", "string-filters", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-tags": {
        "path": "j\/.JZ.KD.A.vqk5zVP",
        "requires": ["editr-data-photos", "editr-edit-panel-transjax", "event-base", "tag-selecta", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-title-description": {
        "path": "j\/.JZ.KB-.KC.A.v345qZiF",
        "requires": ["better-throttle", "editr-data-photos", "editr-edit-panel-transjax", "event-base", "focus-tracker", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-tooltip": {
        "path": "j\/.JZ.JT.A.v5iQkzJn",
        "requires": ["editr-edit-panel-tooltip-css", "editr-edit-panel-tooltip-transjax", "escape", "event-base", "gallery-popover", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-tooltip-css": {
        "path": "c\/c_.JZ.JT.BC.v5fQfhVB",
        "type": "css",
        "ext": false
      },
      "editr-edit-panel-tooltip-transjax": {
        "path": "j\/.JZ.JT-.C-.F.A.v397uNzB",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "editr-edit-panel-transjax": {
        "path": "j\/.JZ.C-.F.A.v53EYUA6",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "editr-errors": {
        "path": "j\/.GZr-.JPs.A.v6otBvhr",
        "requires": ["editr-data-photos", "yui-base"],
        "ext": false
      },
      "editr-exif": {
        "path": "j\/.GZr-.GO.A.vTLSNor",
        "requires": ["editr-data-photos", "exif-thumbnail-extractor", "datatype-xml", "worker", "yui-base"],
        "ext": false
      },
      "editr-file-picker": {
        "path": "j\/.GZr-.KG.A.v4hnWZqe",
        "requires": ["datatype", "editr-data-photos", "editr-exif", "editr-file-picker-transjax", "editr-progress", "flickr-dialog", "gallery-flickr-api", "health-check", "md5", "rapid-tracker", "string-filters", "uploader", "yui-base"],
        "ext": false
      },
      "editr-file-picker-transjax": {
        "path": "j\/.GZr-.KG-.C-.F.A.vZ7dRQn",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "editr-grid": {
        "path": "j\/.KJ.A.v27UvtKp",
        "requires": ["editr-data-photos", "editr-grid-external-events", "editr-grid-form-handler", "editr-grid-item", "editr-grid-key-monitor", "editr-grid-marquee", "editr-grid-progress-handler", "editr-grid-selection", "editr-grid-selection-ui", "editr-grid-transjax", "editr-grid-user-messaging", "event-custom", "editr-zoom", "editr-errors", "flickr-dialog", "focus-tracker", "gallery-popover", "menus", "yui-base"],
        "optional": ["editr-upload-queue"],
        "ext": false
      },
      "editr-grid-external-events": {
        "path": "j\/.KJ-.KK-.Gs.A.v5f4ZhXp",
        "requires": ["editr-grid", "yui-base"],
        "ext": false
      },
      "editr-grid-form-handler": {
        "path": "j\/.KJ-.KL.A.vbQsNrK",
        "requires": ["editr-grid", "yui-base"],
        "ext": false
      },
      "editr-grid-item": {
        "path": "j\/.KJ-item.A.v2AmT7ec",
        "requires": ["editr-grid", "yui-base"],
        "ext": false
      },
      "editr-grid-key-monitor": {
        "path": "j\/.KJ-.KM.A.v4T8hSN6",
        "requires": ["editr-grid", "keyboard-shortcut-manager", "yui-base"],
        "ext": false
      },
      "editr-grid-marquee": {
        "path": "j\/.KJ-marquee.A.v4P4qypT",
        "requires": ["editr-grid", "yui-base"],
        "ext": false
      },
      "editr-grid-progress-handler": {
        "path": "j\/.KJ.ID-handler.A.v4L1L856",
        "requires": ["editr-grid", "editr-publish-dialog", "transjax-base", "yui-base"],
        "ext": false
      },
      "editr-grid-selection": {
        "path": "j\/.KJ-.KN.A.v4G1QmEr",
        "requires": ["editr-grid", "yui-base"],
        "ext": false
      },
      "editr-grid-selection-ui": {
        "path": "j\/.KJ-.KN-ui.A.v69NeiSe",
        "requires": ["editr-grid", "transjax-base", "yui-base"],
        "ext": false
      },
      "editr-grid-transjax": {
        "path": "j\/.KJ-.C-.F.A.v2czYAnc",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "editr-grid-user-messaging": {
        "path": "j\/.KJ-.KO.A.v2rzWPBF",
        "requires": ["editr-grid", "editr-errors", "yui-base"],
        "ext": false
      },
      "editr-photo-picker": {
        "path": "j\/.GZr-.B-picker.A.v33eS7Fk",
        "requires": ["editr-data-photos", "flickr-dialog-spinner", "flickr-geo", "gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "editr-progress": {
        "path": "j\/.GZr.ID.A.v4gPYULn",
        "requires": ["better-throttle", "event-base", "event-custom", "yui-base"],
        "ext": false
      },
      "editr-publish-dialog": {
        "path": "j\/.GZr-.KE-.W.A.vKGi8AR",
        "requires": ["editr-progress", "editr-publisher", "editr-publisher-transjax", "editr-upload-queue", "event-base", "event-custom", "flickr-dialog", "gallery-flickr-api", "health-check", "yui-base", "querystring-parse-simple"],
        "optional": ["flanal"],
        "ext": false
      },
      "editr-publisher": {
        "path": "j\/.GZr-.KEer.A.v2UP5kwH",
        "requires": ["editr-data-people", "editr-data-photos", "editr-data-sets", "editr-errors", "editr-publisher-transjax", "editr-upload-queue", "event-base", "event-custom", "flickr-dialog", "gallery-flickr-api", "health-check", "yui-base"],
        "ext": false
      },
      "editr-publisher-transjax": {
        "path": "j\/.GZr-.KEer-.C-.F.A.v4apSuVk",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "editr-secret-about-box": {
        "path": "j\/.GZr-secret-about-box.A.vZGJVgX",
        "requires": ["event", "node", "page-context", "yui-base"],
        "ext": false
      },
      "editr-toolbar": {
        "path": "j\/.GZr-.KP.A.v3ET6hrB",
        "requires": ["editr-grid", "menus", "yui-base"],
        "ext": false
      },
      "editr-upload-queue": {
        "path": "j\/.GZr-.KI-.CT.A.v2FHShwH",
        "requires": ["editr-data-photos", "editr-errors", "editr-file-picker", "editr-publisher", "event-custom", "gallery-flickr-api", "health-check", "json", "yui-base"],
        "optional": ["flanal"],
        "ext": false
      },
      "editr-zoom": {
        "path": "j\/.GZr-zoom.A.v2hGWgt",
        "requires": ["editr-zoom-transjax", "editr-data-photos", "editr-file-picker", "event-base", "event-custom", "flickr-dialog", "node-event-html5", "yui-base"],
        "ext": false
      },
      "editr-zoom-transjax": {
        "path": "j\/.GZr-zoom-.C-.F.A.v4pHK6Jz",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "exif-extractor": {
        "path": "j\/.KU.A.v2bT42sa",
        "requires": ["exif-extractor-tags", "xmp-extractor", "yui-base"],
        "ext": false
      },
      "exif-extractor-tags": {
        "path": "j\/.KU-.KD.A.v3TeMxde",
        "requires": ["yui-base"],
        "ext": false
      },
      "exif-thumbnail-extractor": {
        "path": "j\/.GO-.IM-.IN.A.v5kbgW2g",
        "requires": ["yui-base"],
        "ext": false
      },
      "event-annotations": {
        "path": "j\/.G-.BD.A.v2JWVHjR",
        "requires": ["yui-base"],
        "ext": false
      },
      "event-mousedrag": {
        "path": "j\/.G-.BO.A.v5PgSZWM",
        "requires": ["event-annotations", "event-custom-complex", "event-synthetic", "node", "yui-base", "yui-throttle"],
        "ext": false
      },
      "face": {
        "path": "j\/face.A.v55XpooR",
        "ext": false
      },
      "photo-list-model": {
        "path": "j\/.B-.CZ-.JA.A.vzemEYr",
        "requires": ["gallery-flickr-api", "model", "murmurhash", "photos-list", "photo-data", "context-data", "querystring-stringify-simple", "io", "yui-base"],
        "ext": false
      },
      "photo-list-view": {
        "path": "j\/.B-.CZ-.JB.A.v4HhixJZ",
        "requires": ["view", "handlebars", "murmurhash", "photos-list", "io", "flickr-app", "lightbox", "photos-list-justifier", "flickr-dialog-infinite-spinner", "better-throttle", "rapid-tracker", "template-fetcher", "yui-base", "node-imports", "flickr-page-timing", "view-count-on-visible"],
        "ext": false
      },
      "explore-hera-view": {
        "path": "j\/.FP-.LJ.JB.A.v4Tetyix",
        "requires": ["view", "datatype-date", "murmurhash", "handlebars", "photo-list-model", "photo-list-view", "flickr-app-explore", "flickr-dialog-infinite-spinner", "template-fetcher", "gallery-popover", "rapid-tracker", "io", "yui-base"],
        "ext": false
      },
      "search-hera-view": {
        "path": "j\/.CA-.LJ.JB.A.v6sWQEuz",
        "requires": ["view", "datatype-date", "murmurhash", "handlebars", "photo-list-model", "photo-list-view", "flickr-app-explore", "flickr-dialog-infinite-spinner", "template-fetcher", "gallery-popover", "rapid-tracker", "io", "yui-base"],
        "ext": false
      },
      "photostream-hera-view": {
        "path": "j\/.ECtream-.LJ.JB.A.v2PKHCFc",
        "requires": ["view", "app", "datatype-date", "murmurhash", "handlebars", "photo-list-model", "photo-list-view", "flickr-dialog-infinite-spinner", "template-fetcher", "gallery-popover", "rapid-tracker", "io", "yui-base"],
        "ext": false
      },
      "fave-star": {
        "path": "j\/.CX-.CY.A.v2Sek7XK",
        "requires": ["anim", "node", "yui-base"],
        "ext": false
      },
      "farm_timing": {
        "path": "j\/farm_.FZ.A.v5opzFwr",
        "requires": ["node", "yui-base", "io", "event"],
        "ext": false
      },
      "feature-tour": {
        "path": "j\/.KT-.DA.A.v3qtParB",
        "requires": ["anim", "cookie", "dom", "event", "feature-tour-css", "feature-tour-transjax", "yui-base"],
        "ext": false
      },
      "feature-tour-css": {
        "path": "c\/c_.KT-.DA.BC.vmLUPKt",
        "type": "css",
        "ext": false
      },
      "feature-tour-transjax": {
        "path": "j\/.KT-.DA-.C-.F.A.v5XAHUCR",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "flanal": {
        "path": "j\/.IU.A.v3gJXYPt",
        "requires": ["yui-base"],
        "optional": ["io"],
        "ext": false
      },
      "flapid": {
        "path": "j\/.JO.A.v66Nja7n",
        "requires": ["gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "flickr": {
        "path": "j\/.J-.D.A.vg5Y9D4",
        "requires": ["flickr-app", "flickr-tooltips", "personmenu", "yui-base"],
        "optional": ["gallery-flickr-api", "share-this-v3-menu"],
        "ext": false
      },
      "flickr-app": {
        "path": "j\/.J-app.A.v2JQMorx",
        "requires": ["app-base", "yui-base"],
        "ext": false
      },
      "flickr-app-photo": {
        "path": "j\/.J-app-.B.A.v5my1GRt",
        "requires": ["context-data", "flickr-app", "photo-data", "urls", "yui-base"],
        "optional": ["video"],
        "ext": false
      },
      "flickr-app-photostream": {
        "path": "j\/.J-app-.ECtream.A.v3YFA56K",
        "requires": ["context-data", "flickr-app", "photo-data", "template-fetcher", "photo-list-model", "photo-list-view", "photostream-hera-view", "photos-subnav-view", "refresh-sihp-comment", "urls", "io", "yui-base"],
        "optional": ["video"],
        "ext": false
      },
      "flickr-app-explore": {
        "path": "j\/.J-app-.FP.A.v5QfDxqz",
        "requires": ["context-data", "flickr-app", "explore-hera-view", "rapid-tracker", "template-fetcher", "urls", "yui-base"],
        "ext": false
      },
      "flickr-app-soup": {
        "path": "j\/.J-app-soup.A.v22mFiBk",
        "requires": ["flickr-app", "soup-hera-view", "rapid-tracker", "template-fetcher", "urls", "yui-base"],
        "ext": false
      },
      "fps-counter": {
        "path": "j\/fps-counter.A.v5YnbjF4",
        "ext": false
      },
      "fps-beacon": {
        "path": "j\/fps-beacon.A.v5zihiQn",
        "requires": ["fps-counter"],
        "ext": false
      },
      "group-model": {
        "path": "j\/.DM-.JA.A.v2EQU5Xx",
        "requires": ["context-data", "model", "gallery-flickr-api", "urls", "yui-base"],
        "ext": false
      },
      "groups-model": {
        "path": "j\/.DMs-.JA.A.v3r9HFk",
        "requires": ["context-data", "model", "model-list", "lazy-model-list", "group-model", "gallery-flickr-api", "urls", "yui-base"],
        "ext": false
      },
      "groups-page-model": {
        "path": "j\/.DMs-.GF-.JA.A.v2BqhyH",
        "requires": ["context-data", "model", "group-model", "gallery-flickr-api", "urls", "yui-base"],
        "ext": false
      },
      "groups-list-view": {
        "path": "j\/.DMs-.CZ-.JB.A.v68gVHqR",
        "requires": ["context-data", "view", "groups-model", "handlebars", "yui-base"],
        "ext": false
      },
      "groups-recent-view": {
        "path": "j\/.DMs-recent-.JB.A.v4nsPwDT",
        "requires": ["context-data", "view", "groups-model", "groups-page-model", "handlebars", "yui-base"],
        "ext": false
      },
      "group-subnav": {
        "path": "j\/.DM-subnav.A.v49NKCxt",
        "requires": ["flickr-dialog", "yui-base"],
        "ext": false
      },
      "flickr-app-groups": {
        "path": "j\/.J-app-.DMs.A.v3gFHgQR",
        "requires": ["context-data", "cookie", "flickr-app", "groups-model", "group-model", "groups-page-model", "groups-list-view", "groups-recent-view", "group-strip-view", "template-fetcher", "urls", "yui-base"],
        "ext": false
      },
      "flickr-dialog": {
        "path": "j\/.IZ.A.v3E24yTt",
        "requires": ["flickr-dialog-alert", "flickr-dialog-confirmation", "flickr-dialog-destructive-confirmation", "flickr-dialog-frame", "flickr-dialog-short-message", "flickr-dialog-spinner", "yui-base"],
        "ext": false
      },
      "flickr-dialog-alert": {
        "path": "j\/.IZ-.JX.A.v2tckjfa",
        "requires": ["flickr-dialog-base", "substitute", "yui-base"],
        "ext": false
      },
      "flickr-dialog-base": {
        "path": "j\/.IZ-.BL.A.v5em6GqM",
        "requires": ["attribute", "better-throttle", "event", "event-custom", "focus-tracker", "flickr-dialog-css", "global-dialog-transjax", "keyboard-shortcut-manager", "node", "page-context", "substitute", "yui-base"],
        "ext": false
      },
      "flickr-dialog-confirmation": {
        "path": "j\/.IZ-.JR.A.v3qEvpur",
        "requires": ["flickr-dialog-base", "substitute", "yui-base"],
        "ext": false
      },
      "flickr-dialog-css": {
        "path": "c\/c_.IZ.BC.v2g4Jw24",
        "type": "css",
        "ext": false
      },
      "flickr-dialog-destructive-confirmation": {
        "path": "j\/.IZ-.JS-.JR.A.v2T32pat",
        "requires": ["flickr-dialog-base", "yui-base"],
        "ext": false
      },
      "flickr-dialog-frame": {
        "path": "j\/.IZ-.JW.A.v45Ghhi",
        "requires": ["flickr-dialog-base", "yui-base"],
        "ext": false
      },
      "flickr-dialog-geo-css": {
        "path": "c\/c_.IZ-geo.BC.v2aPMhHt",
        "type": "css",
        "ext": false
      },
      "flickr-dialog-geo": {
        "path": "j\/.IZ-geo.A.v44sGSbM",
        "requires": ["flickr-dialog-base", "flickr-dialog-geo-css", "flickr-map2", "yui-base"],
        "ext": false
      },
      "flickr-dialog-infinite-spinner-css": {
        "path": "c\/c_.IZ-infinite-.JV.BC.v2fAK1ji",
        "type": "css",
        "ext": false
      },
      "flickr-dialog-infinite-spinner": {
        "path": "j\/.IZ-infinite-.JV.A.v56xMJ8c",
        "requires": ["flickr-dialog-base", "flickr-dialog-infinite-spinner-css", "yui-base", "html5-balls"],
        "ext": false
      },
      "flickr-dialog-short-message": {
        "path": "j\/.IZ-short-.JU.A.v3bTeTJi",
        "requires": ["flickr-dialog-base", "substitute", "yui-base"],
        "ext": false
      },
      "flickr-dialog-spinner": {
        "path": "j\/.IZ-.JV.A.vmWoYzx",
        "requires": ["flickr-dialog-base", "yui-base"],
        "ext": false
      },
      "flickr-gallery-comments": {
        "path": "j\/.J-.FW-.LGs.A.v3GpHv2g",
        "requires": ["anim", "anim-scroll", "dejaview", "event-custom", "event-delegate", "formatting-tips-css", "gallery-flickr-api", "global-dialog", "history-manager", "input-hint", "io-form", "node", "node-visibility", "page-context", "photo-comments-transjax", "swfobject", "yui-base"],
        "ext": false
      },
      "flickr-gallery-gallery-owner": {
        "path": "j\/.J-.FW-.FW-.BK.A.v6pLyFj6",
        "requires": ["dd-drop", "dd-proxy", "event", "flickr-gallery-gallery-owner-transjax", "flickr-gallery-photo-remover", "insitu", "node", "yui-base"],
        "ext": false
      },
      "flickr-gallery-gallery-owner-actions-menu": {
        "path": "j\/.J-.FW-.FW-.BK-.IS-.BB.A.v3zLjbXB",
        "requires": ["event", "gallery-popover", "menus", "node", "yui-base"],
        "optional": ["flickr-gallery-gallery-owner"],
        "ext": false
      },
      "flickr-gallery-gallery-owner-transjax": {
        "path": "j\/.J-.FW-.FW-.BK-.C-.F.A.v5b2ssFP",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "flickr-gallery-keyboard-shortcuts": {
        "path": "j\/.J-.FW-.HZs.A.v6qyczBF",
        "requires": ["anim", "anim-scroll", "better-throttle", "event", "flickr-gallery-keyboard-shortcuts-transjax", "keyboard-shortcut-manager", "node", "node-visibility", "yui-base"],
        "ext": false
      },
      "flickr-gallery-keyboard-shortcuts-transjax": {
        "path": "j\/.J-.FW-.HZs-.C-.F.A.v45jFUtK",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "flickr-gallery-photo-owner": {
        "path": "j\/.J-.FW-.B-.BK.A.v55tNrj2",
        "requires": ["event", "flickr-gallery-photo-remover", "node", "yui-base"],
        "ext": false
      },
      "flickr-gallery-photo-remover": {
        "path": "j\/.J-.FW-.B-.IP.A.vhowBGi",
        "requires": ["event", "flickr-gallery-photo-remover-transjax", "gallery-flickr-api", "global-dialog", "node", "yui-base"],
        "ext": false
      },
      "flickr-gallery-photo-remover-transjax": {
        "path": "j\/.J-.FW-.B-.IP-.C-.F.A.v2ZtgvQ6",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "flickr-geo": {
        "path": "j\/.J-geo.A.v36dSRfa",
        "requires": ["io", "gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "flickr-leaflet-utils-css": {
        "path": "c\/c_.J-leaflet-utils.BC.v2Pcw2sa",
        "type": "css",
        "ext": false
      },
      "flickr-leaflet-utils": {
        "path": "j\/.J-leaflet-utils.A.v5EFdb72",
        "requires": ["osm-places", "flickr-leaflet-utils-css", "yui-base"],
        "ext": false
      },
      "flickr-location-search": {
        "path": "j\/.J_.BR_.CA.A.v4DCsMXT",
        "requires": ["event", "node", "query-string-args", "yui-base"],
        "ext": false
      },
      "flickr-map": {
        "path": "j\/.J-map.A.v3x9t8YV",
        "requires": ["flickr-map-transjax", "base", "selector-css3", "slider", "gallery-flickr-api", "photo", "dragdrop", "dd-drag", "flickr-map-css", "flickr-map-css-intl", "excanvas", "json", "gallery-storage-lite", "better-throttle", "selector-circle", "flickr-geo", "yui-base"],
        "ext": false
      },
      "flickr-map2": {
        "path": "j\/.J-map2.A.v6p3Hkcg",
        "requires": ["base", "cookie", "dd-drag", "dragdrop", "event", "flickr-geo", "flickr-map-css", "flickr-map-transjax", "keyboard-shortcut-manager", "page-context", "selector-css3", "slider", "yui-base"],
        "ext": false
      },
      "flickr-map-provider-ymap": {
        "path": "j\/.J-.IK-ymap.A.v4we9Ryv",
        "requires": ["ymap", "yui-base", "yui2_5-yahoo", "yui2_5-event", "yui2_5-dom", "yui2_5-animation", "yui2_5-dragdrop"],
        "ext": false
      },
      "flickr-map-provider-bing": {
        "path": "j\/.J-.IK-bing.A.v3hTtqXg",
        "requires": ["bing_map", "yui-base"],
        "ext": false
      },
      "flickr-map-provider-ovi": {
        "path": "j\/.J-.IK-ovi.A.v5VcD6ue",
        "requires": ["yui-base"],
        "ext": false
      },
      "flickr-map-provider-gmap": {
        "path": "j\/.J-.IK-gmap.A.vWzwziF",
        "requires": ["yui-base"],
        "ext": false
      },
      "flickr-map-provider-flickr_osm": {
        "path": "j\/.J-.IK-.J_osm.A.vbh8ES6",
        "requires": ["yui-base"],
        "ext": false
      },
      "flickr-map-transjax": {
        "path": "j\/.J-map-.C-.F.A.v66rLSkP",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "flickr-map-css": {
        "path": "c\/c_.J-map.BC.v3vkssi",
        "type": "css",
        "ext": false
      },
      "flickr-map-css-intl": {
        "path": "c\/c_.J-map-.F.BC.v4HYvw3Z",
        "type": "css",
        "ext": false
      },
      "flickr-nav": {
        "path": "j\/.J_nav.A.v4Gx4Yi4",
        "requires": ["event", "node", "page-context", "yui-base"],
        "ext": false
      },
      "flickr-overlay-css": {
        "path": "c\/c_.J-overlay-.BL.BC.v5pgfe3H",
        "type": "css",
        "ext": false
      },
      "flickr-overlay-base": {
        "path": "j\/.J-overlay-.BL.A.v5g9gRck",
        "requires": ["attribute", "better-throttle", "event", "event-custom", "focus-tracker", "flickr-overlay-css", "keyboard-shortcut-manager", "node", "page-context", "substitute", "yui-base"],
        "ext": false
      },
      "flickr-page-timing": {
        "path": "j\/.J_.GF_.FZ.A.v3ZmHuBF",
        "requires": ["event", "node", "yui-base"],
        "ext": false
      },
      "flickr-printing": {
        "path": "j\/.J_.FD.A.v4MWxy3r",
        "requires": ["node", "event", "io", "gallery-flickr-api", "event-delegate", "global-dialog", "sprintf", "flickr-printing-css", "flickr-printing-transjax", "flickr-tooltips", "yui-base"],
        "ext": false
      },
      "flickr-printing-css": {
        "path": "c\/c_.J_.FD_.D.BC.v2sv2wqi",
        "type": "css",
        "ext": false
      },
      "flickr-printing-transjax": {
        "path": "j\/.J_.FD-.C-.F.A.v4GEwkwn",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "flickr-tooltips": {
        "path": "j\/.J-.GA.A.v59Ur9NM",
        "requires": ["event", "event-delegate", "yui-base"],
        "ext": false
      },
      "focus-tracker": {
        "path": "j\/.CV-.CH.A.v66eVbSV",
        "requires": ["event", "node", "yui-base"],
        "ext": false
      },
      "formatting-tips-css": {
        "path": "c\/c_.EN_.EQ_.D.BC.v3JoLfje",
        "type": "css",
        "ext": false
      },
      "gallery-boomr": {
        "path": "j\/.FW-boomr.A.vWzwziF",
        "requires": ["lang", "yui-base"],
        "ext": false
      },
      "gallery-calendar": {
        "path": "j\/.FW-.IO.A.v4mfxxUv",
        "requires": ["gallery-calendar-transjax", "gallery-popover", "node", "yui-base"],
        "ext": false
      },
      "gallery-calendar-transjax": {
        "path": "j\/.FW-.IO-.C-.F.A.v5zr1XrP",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "gallery-flickr-api": {
        "path": "j\/.J_api.A.v3WQsBZc",
        "requires": ["dump", "event", "io-xdr", "json-parse", "yui-base"],
        "ext": false
      },
      "gallery-history-lite": {
        "path": "j\/.FW-.CE-.GH.A.v2UpERnF",
        "requires": ["event-custom", "event-custom-complex", "node", "yui-base"],
        "ext": false
      },
      "gallery-popover": {
        "path": "j\/.FW-.HN.A.v51DKJE2",
        "requires": ["event-custom", "node", "overlay", "yui-base"],
        "ext": false
      },
      "gallery-popover-css": {
        "path": "c\/c_.FW-.HN.BC.v4kkuEVP",
        "type": "css",
        "ext": false
      },
      "gallery-storage-lite": {
        "path": "j\/.FW-.FX-.GH.A.v2qELWqD",
        "requires": ["event-base", "event-custom", "event-custom-complex", "json", "yui-base"],
        "ext": false
      },
      "geo-exif-backfill-transjax": {
        "path": "j\/geo-.GO-.IF-.C-.F.A.v2ML3GAV",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "geofences-geopanel-css": {
        "path": "c\/c_.IA-.IB.BC.v5B2bUZx",
        "type": "css",
        "ext": false
      },
      "geofences-geopanel-transjax": {
        "path": "j\/.IA-.IB-.C-.F.A.vmkJoED",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "geofences-geopanel": {
        "path": "j\/.IA-.IB.A.vvtnPqn",
        "requires": ["geofences-geopanel-transjax", "geofences-geopanel-css", "geopanel", "global-dialog", "map-pinwin", "yui-base"],
        "ext": false
      },
      "geofences": {
        "path": "j\/.IA.A.v42eqjat",
        "requires": ["base", "yui-base"],
        "optional": ["gallery-flickr-api"],
        "ext": false
      },
      "geofences-apply-panel": {
        "path": "j\/.IA.IE.IC.A.v2AUCH1z",
        "requires": ["anim", "event", "event-custom", "gallery-flickr-api", "geofences", "geofences-transjax", "global-dialog", "io", "node", "node-visibility", "yui-base"],
        "optional": ["geofences-geopanel"],
        "ext": false
      },
      "geofences-apply-progress": {
        "path": "j\/.IA.IE.ID.A.v4yJSn5n",
        "requires": ["better-throttle", "event-custom", "gallery-flickr-api", "geofences", "yui-base"],
        "ext": false
      },
      "geofences-list-view": {
        "path": "j\/.IA-.CZ-.JB.A.v56Z4Ub6",
        "requires": ["better-throttle", "event", "event-custom", "geofences-geopanel", "geofences", "geofences-apply-panel", "geofences-apply-progress", "global-dialog", "io", "node", "yui-base"],
        "optional": ["anim"],
        "ext": false
      },
      "geofences-prefs-map": {
        "path": "j\/.IA-prefs-map.A.v5cpoaLe",
        "requires": ["node", "event", "css3pie", "flickr-map", "geofences", "geofences-transjax", "geofences-prefs-map-transjax", "map-pinwin", "yui-base"],
        "ext": false
      },
      "geofences-prefs-map-transjax": {
        "path": "j\/.IA-prefs-map-.C-.F.A.v5Q5hfHP",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "geofences-transjax": {
        "path": "j\/.IA-.C-.F.A.v3j2KnUV",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "geopanel-css": {
        "path": "c\/c_.IB.BC.v5AmFeGa",
        "type": "css",
        "ext": false
      },
      "geopanel": {
        "path": "j\/.IB.A.v4Tong4F",
        "requires": ["event", "global-dialog", "geopanel-css", "yui-base"],
        "optional": ["autocomplete-2-5-1", "flickr-map", "gallery-flickr-api"],
        "ext": false
      },
      "getty": {
        "path": "j\/.FI_new.A.v6CGZwG6",
        "requires": ["anim", "dom", "event", "gallery-flickr-api", "node", "yui-base"],
        "ext": false
      },
      "global-dialog": {
        "path": "j\/.X-.W-.D.A.v3Fr2wLe",
        "requires": ["event", "event-custom", "event-delegate", "event-key", "focus-tracker", "global-dialog-css", "global-dialog-transjax", "keyboard-shortcut-manager", "node", "page-context", "yui-base"],
        "ext": false
      },
      "global-dialog-css": {
        "path": "c\/c_.X-.W-.D.BC.v69VJw3M",
        "type": "css",
        "ext": false
      },
      "global-dialog-transjax": {
        "path": "j\/.X-.W-.C-.F.A.v6rYuMzc",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "global-nav": {
        "path": "j\/.JC.A.vdfnAdV",
        "requires": ["anim", "event", "menus", "node", "page-context", "yui-base"],
        "ext": false
      },
      "group-blast-insitu": {
        "path": "j\/.DM-blast-.DT.A.vSoayN2",
        "requires": ["event", "insitu", "node", "string-filters", "yui-base"],
        "ext": false
      },
      "guestpass-hide": {
        "path": "j\/.DZ-.ET.A.v45i99be",
        "requires": ["anim", "cookie", "node", "yui-base"],
        "ext": false
      },
      "grease": {
        "path": "j\/.HQ.A.v6kW343a",
        "requires": ["event-focus", "gallery-flickr-api", "gallery-storage-lite", "global-dialog", "json", "node", "occult", "photo-data", "urls", "yui-base"],
        "ext": false
      },
      "grease-css": {
        "path": "c\/c_.HQ.BC.v3k1Jmek",
        "type": "css",
        "ext": false
      },
      "health-check": {
        "path": "j\/.KH.A.vRDYYjV",
        "requires": ["event-custom", "gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "history-manager": {
        "path": "j\/.CE-.K.A.v5uRaUbD",
        "requires": ["event", "urls", "yui-base"],
        "ext": false
      },
      "html5-balls": {
        "path": "j\/.LI.A.vYhy5ZP",
        "requires": ["event", "urls", "base", "yui-base", "html5-balls-css"],
        "ext": false
      },
      "html5-balls-css": {
        "path": "c\/c_.LI.BC.v5Uhd4L2",
        "type": "css",
        "ext": false
      },
      "image-fader": {
        "path": "j\/.CW-.CU.A.v4J4Wphe",
        "requires": ["anim", "node", "yui-base"],
        "ext": false
      },
      "infinite-scrolling-transjax": {
        "path": "j\/infinite-scrolling-.C-.F.A.v496vPSr",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "input-hint": {
        "path": "j\/.CN-.DD.A.v59fr6we",
        "requires": ["event-focus", "focus-tracker", "node", "yui-base"],
        "ext": false
      },
      "input-counter": {
        "path": "j\/.CN-counter.A.v6wzj328",
        "requires": ["event", "node", "yui-base"],
        "ext": false
      },
      "india-disclaimer": {
        "path": "j\/.IH.A.v3Rtxpet",
        "requires": ["event", "global-dialog", "io-base", "node", "yui-base"],
        "ext": false
      },
      "insitu": {
        "path": "j\/.DT-.D.A.v4HzUMhi",
        "requires": ["input-counter", "dejaview", "event-custom", "event-key", "gallery-flickr-api", "insitu-transjax", "json-stringify", "node", "string-filters", "substitute", "yui-base"],
        "optional": ["anim", "anim-scroll", "io", "photo-data"],
        "ext": false
      },
      "insitu-transjax": {
        "path": "j\/.DT-.C-.F.A.v2XuuR7M",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "iphone-link-sms-dialog-transjax": {
        "path": "j\/iphone-link-sms-.W-.C-.F.A.vhgRyA2",
        "requires": ["rapid-tracker", "transjax-base", "yui-base"],
        "ext": false
      },
      "iphone-link-sms-dialog-css": {
        "path": "c\/c_iphone-link-sms-.W.BC.v5zgDSP8",
        "type": "css",
        "ext": false
      },
      "iphone-link-sms-dialog": {
        "path": "j\/iphone-link-sms-.W.A.v6qJFryv",
        "requires": ["flickr-dialog-spinner", "iphone-link-sms-dialog-css", "iphone-link-sms-dialog-transjax", "yui-base"],
        "ext": false
      },
      "jfif-extractor": {
        "path": "j\/jfif-.IN.A.v2k2DnEe",
        "requires": ["yui-base"],
        "ext": false
      },
      "jobs": {
        "path": "j\/jobs.A.v3g1g6oV",
        "requires": ["event", "flanal", "flickr-page-timing", "io", "motion-blur", "node", "popup-login", "rapid-tracker", "transition", "yui-base"],
        "ext": false
      },
      "justifier": {
        "path": "j\/.LA.A.v4DyHgLe",
        "requires": ["yui-base"],
        "ext": false
      },
      "ken-burns": {
        "path": "j\/.KY.A.v6pFCRBc",
        "requires": ["smart-crop", "gallery-flickr-api", "yui-base", "page-context", "ken-burns-transjax", "context-data", "html5-balls", "konami", "event-custom", "rapid-tracker", "oop"],
        "ext": false
      },
      "ken-burns-transjax": {
        "path": "j\/.KY-.C-.F.A.v2aY5wXP",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "keyboard-shortcut-legend": {
        "path": "j\/.HZ-.HY.A.v5a49xFk",
        "requires": ["better-throttle", "cookie", "gallery-flickr-api", "global-dialog", "keyboard-shortcut-legend-css", "keyboard-shortcut-legend-layouts", "keyboard-shortcut-legend-transjax", "page-context", "yui-base"],
        "ext": false
      },
      "keyboard-shortcut-legend-css": {
        "path": "c\/c_.HZ-.HY.BC.v2M5oGVT",
        "type": "css",
        "ext": false
      },
      "keyboard-shortcut-legend-layouts": {
        "path": "j\/.HZ-.HY-layouts.A.v6CaDdtt",
        "requires": ["keyboard-shortcut-legend-transjax", "yui-base"],
        "ext": false
      },
      "keyboard-shortcut-legend-transjax": {
        "path": "j\/.HZ-.HY-.C-.F.A.v67aFbag",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "keyboard-shortcut-manager": {
        "path": "j\/.HZ-.K.A.veHMnP8",
        "requires": ["event-custom", "event-focus", "event-key", "focus-tracker", "keyboard-shortcut-legend", "node", "page-context", "yui-base"],
        "ext": false
      },
      "konami": {
        "path": "j\/.LC.A.v5xvSsda",
        "ext": false
      },
      "leaflet": {
        "path": "j\/leaflet.A.v2px2LNZ",
        "requires": ["flickr-leaflet-utils", "leaflet-css", "leaflet-utils-css", "yui-base"],
        "ext": false
      },
      "leaflet-css": {
        "path": "c\/c_leaflet.BC.v6epXPpp",
        "type": "css",
        "ext": false
      },
      "leaflet-utils-css": {
        "path": "c\/c_leaflet-utils.BC.v2tLtt9i",
        "type": "css",
        "ext": false
      },
      "lightbox": {
        "path": "j\/.N.A.vLDiaqn",
        "requires": ["anim", "better-throttle", "context-data", "cookie", "node", "escape", "event-annotations", "event-custom", "event-delegate", "event-gestures", "event-key", "fave-star", "gallery-flickr-api", "history", "history-manager", "json", "ken-burns", "keyboard-shortcut-manager", "lightbox-transjax", "node-visibility", "page-context", "photo-context-menu", "photo-transjax", "rapid-tracker", "string-filters", "swfobject", "transition", "urls", "view-count", "yui-base", "yui-throttle"],
        "optional": ["global-dialog", "photos-list-transjax"],
        "ext": false
      },
      "lightbox-transjax": {
        "path": "j\/.N-.C-.F.A.v2wzEoHK",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "liquid-photo-resizer": {
        "path": "j\/.JL-.B.LB.A.vm6Hvnx",
        "requires": ["event"],
        "ext": false
      },
      "liquid-resizer": {
        "path": "j\/.JL.LB.A.v7GDWyz",
        "requires": ["event"],
        "ext": false
      },
      "location-picker-css": {
        "path": "c\/c_.BR-picker.BC.v3W6Pwbz",
        "type": "css",
        "ext": false
      },
      "location-picker": {
        "path": "j\/.BR-picker.A.v52MiADP",
        "requires": ["location-picker-css", "keyboard-shortcut-manager", "flickr-geo", "event", "map-pinwin", "dragdrop", "dd-drag", "yui-base"],
        "ext": false
      },
      "location-selecta-css": {
        "path": "c\/c_.BR-.S.BC.v5NQPHW6",
        "type": "css",
        "ext": false
      },
      "location-selecta": {
        "path": "j\/.BR-.S.A.v5wu3MKB",
        "requires": ["location-selecta-css", "keyboard-shortcut-manager", "flickr-geo", "event", "yui-base"],
        "ext": false
      },
      "make-a-book-css": {
        "path": "c\/c_make-a-book.BC.v21A5ZqH",
        "type": "css",
        "ext": false
      },
      "make-a-book": {
        "path": "j\/make-a-book.A.vku8jbH",
        "requires": ["template-fetcher", "view", "event", "node", "gallery-flickr-api", "flickr-dialog-frame", "flickr-dialog", "html5-balls", "make-a-book-css", "yui-base", "escape", "rapid-tracker"],
        "ext": false
      },
      "mail-zeus": {
        "path": "j\/mail-.D.A.vWzwziF",
        "requires": ["mail-zeus-transjax", "flickr-dialog-confirmation", "event", "node", "yui-base"],
        "ext": false
      },
      "mail-zeus-transjax": {
        "path": "j\/mail-.D-.C-.F.A.vWzwziF",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "map-pinwin": {
        "path": "j\/map-.IV.A.v4o4UsiP",
        "requires": ["map-pinwin-css", "string-filters", "yui-base"],
        "ext": false
      },
      "map-pinwin-css": {
        "path": "c\/c_map-.IV.BC.v3B5zYda",
        "type": "css",
        "ext": false
      },
      "math": {
        "path": "j\/.DL.A.v2b4mKHX",
        "requires": ["yui-base"],
        "ext": false
      },
      "matrix-math": {
        "path": "j\/matrix-.DL.A.v5Fmosm2",
        "requires": ["yui-base"],
        "ext": false
      },
      "message-primary-email-transjax": {
        "path": "j\/.JU-primary-.HH-.C-.F.A.v5GdDu3D",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "md5": {
        "path": "j\/md5-.D.A.v7CBJ7i",
        "ext": false
      },
      "menus": {
        "path": "j\/.BBs.A.v3VCmW64",
        "requires": ["base", "event", "event-custom", "event-mouseenter", "gallery-popover", "keyboard-shortcut-manager", "node", "page-context", "yui-base"],
        "ext": false
      },
      "momentjs": {
        "path": "j\/momentjs-wrapper.A.v5BtiTSn",
        "requires": [],
        "ext": false
      },
      "motion-blur": {
        "path": "j\/motion-blur.A.v5Fmosm2",
        "requires": ["node", "transition", "yui-base"],
        "ext": false
      },
      "mrpinchy": {
        "path": "j\/mrpinchy.A.v3ptceHT",
        "requires": ["node", "event", "event-custom", "transition", "urls", "matrix-math", "yui-base"],
        "ext": false
      },
      "murmurhash": {
        "path": "j\/.KZ3_gc.A.v61menon",
        "ext": false
      },
      "nav-selecta": {
        "path": "j\/.JQ.A.v5z4PHPg",
        "requires": ["bo-selecta-3", "keyboard-shortcut-manager", "nav-selecta-css", "nav-selecta-transjax", "nav-selecta-rapid", "node", "event", "widget", "string-filters", "yui-base"],
        "ext": false
      },
      "nav-selecta-css": {
        "path": "c\/c_.JQ.BC.v3m1XDji",
        "type": "css",
        "ext": false
      },
      "nav-selecta-transjax": {
        "path": "j\/.JQ-.C-.F.A.v6751KLn",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "nav-selecta-rapid": {
        "path": "j\/.JQ-.IY.A.v2rhddhi",
        "requires": ["event", "rapid-tracker", "yui-base"],
        "ext": false
      },
      "node-visibility": {
        "path": "j\/.CR-.DY.A.vUDk1iB",
        "requires": ["better-throttle", "cache-simple", "node", "node-pluginhost", "yui-base"],
        "optional": ["anim", "anim-scroll"],
        "ext": false
      },
      "note-data": {
        "path": "j\/note-.BY.A.v6B2px48",
        "requires": ["base", "person-data", "yui-base"],
        "ext": false
      },
      "notification-base": {
        "path": "j\/notification-.BL.A.v2ruD5da",
        "requires": ["attribute", "notification-center"],
        "ext": false
      },
      "notification-center": {
        "path": "j\/notification-center.A.v3Cx9ihe",
        "requires": ["attribute", "cookie", "event", "event-custom", "gallery-flickr-api"],
        "ext": false
      },
      "number": {
        "path": "j\/.Y.A.v4PhhEWi",
        "requires": ["number-transjax", "yui-base"],
        "ext": false
      },
      "number-transjax": {
        "path": "j\/.Y-.C-.F.A.v5hvCsNr",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "occult": {
        "path": "j\/.CF.A.v4yHPq4k",
        "requires": ["node", "yui-base"],
        "ext": false
      },
      "osm-places": {
        "path": "j\/osm-places.A.v3UhaAq2",
        "requires": ["yui-base"],
        "ext": false
      },
      "page-context": {
        "path": "j\/.GF-.H.A.v2tk3sCZ",
        "requires": ["event-custom", "yui-base"],
        "ext": false
      },
      "pagination-keyboard-shortcuts": {
        "path": "j\/.EG-.HZs.A.v5muYong",
        "requires": ["keyboard-shortcut-manager", "node", "pagination-keyboard-shortcuts-transjax", "yui-base"],
        "ext": false
      },
      "pagination-keyboard-shortcuts-transjax": {
        "path": "j\/.EG-.HZs-.C-.F.A.v4GUbNxx",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "person-data": {
        "path": "j\/.FK-.BY.A.vSzKYYn",
        "requires": ["base", "yui-base"],
        "ext": false
      },
      "personmenu": {
        "path": "j\/.CB-.D.A.vSEKsbv",
        "requires": ["anim", "anim-scroll", "cache-simple", "event-custom", "io-base", "node", "node-visibility", "personmenu-css", "personmenu-transjax", "personmenu-rapid", "yui-base"],
        "optional": ["contact-changer"],
        "ext": false
      },
      "personmenu-css": {
        "path": "c\/c_.CB-.D.BC.v4WBcE9M",
        "type": "css",
        "ext": false
      },
      "personmenu-transjax": {
        "path": "j\/.CB-.C-.F.A.v22bjgrF",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "personmenu-rapid": {
        "path": "j\/.CB-.IY.A.v376begF",
        "requires": ["event", "rapid-tracker", "yui-base"],
        "ext": false
      },
      "photo": {
        "path": "j\/.B-.D.A.v8KLPCa",
        "requires": ["anim", "anim-scroll", "better-throttle", "context-data", "defer-images", "event-annotations", "event-custom", "event-delegate", "event-key", "event-mousedrag", "event-mouseenter", "flickr-app-photo", "focus-tracker", "global-dialog", "history-manager", "html5-balls", "keyboard-shortcut-manager", "math", "node-visibility", "occult", "page-context", "photo-button-bar", "photo-comments", "photo-context-menu", "photo-data", "photo-keyboard-shortcuts", "photo-rotate", "photo-sidebar", "retry-image-on-error", "share-this-v3-menu", "lightbox", "urls", "yahoo-ult", "yui-base"],
        "optional": ["gallery-flickr-api", "io-base", "photo-group-invites", "photo-insitu", "photo-notes", "photo-people-list", "photo-tags", "view-count"],
        "ext": false
      },
      "photo-button-bar": {
        "path": "j\/.B-.T-bar.A.vaxbrc",
        "requires": ["add-to-dialog-css", "context-data", "event", "event-custom", "event-delegate", "event-key", "fave-star", "flanal", "focus-tracker", "gallery-flickr-api", "gallery-popover", "global-dialog", "io-base", "keyboard-shortcut-manager", "menus", "node", "node-event-simulate", "page-context", "photo-button-bar-transjax", "photo-people-list", "querystring-stringify-simple", "urls", "yui-base"],
        "optional": ["flickr-printing", "photo-notes", "photo-replace", "photo-rotate", "picnik"],
        "ext": false
      },
      "photo-button-bar-transjax": {
        "path": "j\/.B-.T-bar-.C-.F.A.v5Qets5v",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-comments": {
        "path": "j\/.B-.LGs.A.v2ovzt7H",
        "requires": ["anim", "anim-scroll", "defer-images", "dejaview", "event-custom", "event-delegate", "flickr-app", "flickr-dialog-alert", "flickr-dialog-confirmation", "flickr-dialog-spinner", "formatting-tips-css", "gallery-flickr-api", "input-hint", "io-form", "node", "node-visibility", "page-context", "photo-comments-transjax", "photo-data", "swfobject", "urls", "yui-base"],
        "optional": ["insitu"],
        "ext": false
      },
      "photo-comments-image-hiding": {
        "path": "j\/.B-.LGs-.CW-hiding.A.v5RDEHjV",
        "requires": ["node", "yui-base"],
        "ext": false
      },
      "photo-comments-transjax": {
        "path": "j\/.B-.LGs-.C-.F.A.v3u2qZit",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-context-menu": {
        "path": "j\/.B-.H-.BB.A.v55mTtsn",
        "requires": ["event", "node", "photo", "photo-context-menu-css", "photo-context-menu-transjax", "photo-data", "urls", "yui-base"],
        "ext": false
      },
      "photo-context-menu-css": {
        "path": "c\/c_.B-.H-.BB.BC.v6zdHpnF",
        "type": "css",
        "ext": false
      },
      "photo-context-menu-transjax": {
        "path": "j\/.B-.H-.BB-.C-.F.A.v4eME6Zk",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-data": {
        "path": "j\/.B-.BY.A.v5hXXDaK",
        "requires": ["anim", "base", "cookie", "event", "gallery-flickr-api", "grease", "node", "photo-transjax", "type-cast", "urls", "yui-base"],
        "ext": false
      },
      "photo-filmstrips": {
        "path": "j\/.B-.Ms.A.v6iryDgF",
        "requires": ["anim", "base", "better-throttle", "context-data", "event", "event-custom", "event-delegate", "event-key", "focus-tracker", "global-dialog", "image-fader", "io", "keyboard-shortcut-manager", "node", "number", "page-context", "photo-button-bar-transjax", "photo-data", "photo-filmstrips-transjax", "retry-image-on-error", "string-filters", "transition", "urls", "yui-base"],
        "ext": false
      },
      "photo-filmstrips-transjax": {
        "path": "j\/.B-.Ms-.C-.F.A.v5gpKUC2",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-geolocation": {
        "path": "j\/.B-.R.A.vYRCwUZ",
        "requires": ["global-dialog", "page-context", "photo", "photo-geolocation-transjax", "yui-base"],
        "optional": ["autocomplete-2-5-1", "flickr-map", "gallery-flickr-api", "photo-geolocation-css"],
        "ext": false
      },
      "photo-geolocation-transjax": {
        "path": "j\/.B-.R-.C-.F.A.vXw47Qe",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-geolocation-css": {
        "path": "c\/c_.B-.R.BC.vK4LZR8",
        "type": "css",
        "ext": false
      },
      "photo-geopanel": {
        "path": "j\/.B-.IB.A.v6dxUjnx",
        "requires": ["flickr-dialog-geo", "flickr-geo", "flickr-map-provider-flickr_osm", "location-picker", "photo-map-display-pinwin", "woe-corrector", "yui-base", "ymap"],
        "ext": false
      },
      "flickr-ymap": {
        "path": "j\/.J-ymap.A.v5zwWhm6",
        "requires": ["base", "event"],
        "ext": false
      },
      "flickr-leaflet": {
        "path": "j\/.J-leaflet.A.v5UkD264",
        "requires": ["base", "event", "leaflet"],
        "ext": false
      },
      "geo-editor": {
        "path": "j\/geo-.GZor.A.v2AWeYGD",
        "requires": ["flickr-geo", "flickr-dialog", "html5-balls", "base", "event"],
        "ext": false
      },
      "parallax": {
        "path": "j\/parallax.A.v28sQSCZ",
        "requires": ["base", "node-base"],
        "ext": false
      },
      "photo-group-invites": {
        "path": "j\/.B-.DM-.CO.A.v3KPmrcB",
        "requires": ["context-data", "gallery-flickr-api", "global-dialog", "node", "photo", "photo-group-invites-transjax", "yui-base"],
        "ext": false
      },
      "photo-group-invites-transjax": {
        "path": "j\/.B-.DM-.CO-.C-.F.A.v4PMAJeF",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-insitu": {
        "path": "j\/.B-.DT.A.v4HhqpQD",
        "requires": ["insitu", "photo", "photo-data", "photo-transjax", "yui-base"],
        "ext": false
      },
      "photo-keyboard-shortcuts": {
        "path": "j\/.B-.HZs.A.v2g9KhsZ",
        "requires": ["cookie", "event-focus", "event-key", "event-simulate", "focus-tracker", "keyboard-shortcut-manager", "node", "page-context", "photo-keyboard-shortcuts-transjax", "yui-base"],
        "optional": ["photo-people-list"],
        "ext": false
      },
      "photo-keyboard-shortcuts-transjax": {
        "path": "j\/.B-.HZs-.C-.F.A.v4DqzBY2",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-map-display-pinwin-css": {
        "path": "c\/c_.B-map-.IQ-.IV.BC.vLQoNCH",
        "type": "css",
        "ext": false
      },
      "photo-map-display-pinwin": {
        "path": "j\/.B-map-.IQ-.IV.A.v3pRDpuH",
        "requires": ["flickr-geo", "map-pinwin", "base", "photo-map-display-pinwin-css", "yui-base"],
        "ext": false
      },
      "photo-notes": {
        "path": "j\/.B-.BE-.D.A.v4zeZNmr",
        "requires": ["better-throttle", "bo-selecta-3", "bo-selecta-transjax", "box-host", "event", "escape", "event-annotations", "event-delegate", "focus-tracker", "gallery-flickr-api", "global-dialog", "node", "node-visibility", "photo-notes-transjax", "photo-people-controller", "photo-people-transjax", "string-filters", "urls", "yui-base"],
        "optional": ["note-data"],
        "ext": false
      },
      "photo-notes-transjax": {
        "path": "j\/.B-.BE-.C-.F.A.v5wchKU6",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-owner-dialogs-css": {
        "path": "c\/c_.B-.BK-.EO-.D.BC.v6Bf6q2F",
        "type": "css",
        "ext": false
      },
      "photo-people-controller": {
        "path": "j\/.HX-.BH.A.vbZFbGZ",
        "requires": ["event", "gallery-flickr-api", "dejaview", "photo-people-transjax", "yui-base"],
        "ext": false
      },
      "photo-people-list": {
        "path": "j\/.HX-.CZ.A.v2wf8DkX",
        "requires": ["anim", "bo-selecta-3", "event-delegate", "global-dialog", "node", "node-visibility", "photo", "photo-people-controller", "photo-people-transjax", "string-filters", "urls", "yui-base"],
        "optional": ["photo-notes"],
        "ext": false
      },
      "photo-people-transjax": {
        "path": "j\/.HX-.C-.F.A.vK2or1V",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-preloader": {
        "path": "j\/.B-.FJ.A.v3Gv1j9v",
        "requires": ["context-data", "event", "yui-base"],
        "ext": false
      },
      "photo-replace": {
        "path": "j\/.B-.GQ.A.v6iHnxQ6",
        "requires": ["event", "global-dialog", "io", "node", "yui-base"],
        "optional": ["flanal", "worker"],
        "ext": false
      },
      "photo-rotate": {
        "path": "j\/.B-.GE.A.v5uB7wAz",
        "requires": ["anim", "event", "gallery-flickr-api", "node", "photo", "photo-data", "photo-rotate-css", "photo-rotate-transjax", "yui-base"],
        "ext": false
      },
      "photo-rotate-css": {
        "path": "c\/c_.B-.GE.BC.v3T9okEv",
        "type": "css",
        "ext": false
      },
      "photo-rotate-transjax": {
        "path": "j\/.B-.GE-.C-.F.A.v4DmRhfM",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-sidebar": {
        "path": "j\/.HV.A.v2iyTg7M",
        "requires": ["anim", "bitmap-text", "bitmap-type-silkscreen", "event-custom", "event-delegate", "excanvas", "flapid", "gallery-flickr-api", "io-base", "node", "node-visibility", "photo-data", "photo-filmstrips", "photo-sidebar-transjax", "querystring-stringify-simple", "contact-changer", "contact-changer", "stylesheet", "datatype", "yui-base", "photo-sidebar-not-owner"],
        "optional": ["context-data", "photo-sidebar-admin", "photo-sidebar-owner"],
        "ext": false
      },
      "photo-sidebar-transjax": {
        "path": "j\/.HV-.C-.F.A.v2dLHtdD",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-sidebar-not-owner": {
        "path": "j\/.HV-.HW.A.vatwZp",
        "requires": ["flickr-dialog-frame", "flickr-dialog-short-message", "flickr-dialog-spinner", "gallery-flickr-api", "photo-owner-dialogs-css", "photo-sidebar", "photo-sidebar-not-owner-transjax", "yui-base"],
        "ext": false
      },
      "photo-sidebar-not-owner-transjax": {
        "path": "j\/.HV-.HW-.C-.F.A.v6AyBFbD",
        "requires": ["photo-sidebar-owner-transjax", "transjax-base", "yui-base"],
        "ext": false
      },
      "photo-sidebar-owner": {
        "path": "j\/.HV-.BK.A.v2LB9jmz",
        "requires": ["better-throttle", "event-custom", "flickr-dialog-frame", "flickr-dialog-short-message", "flickr-dialog-spinner", "gallery-flickr-api", "page-context", "photo-owner-dialogs-css", "photo-data", "photo-sidebar", "photo-sidebar-owner-transjax", "yui-base"],
        "ext": false
      },
      "photo-sidebar-owner-transjax": {
        "path": "j\/.HV-.BK-.C-.F.A.v55742vx",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photos-subnav-view": {
        "path": "j\/.EC-subnav-.JB.A.v2mwrE6x",
        "requires": ["parallax", "template-fetcher", "view", "yui-base"],
        "ext": false
      },
      "photo-tags": {
        "path": "j\/.B-.KD.A.v2CiAsc4",
        "requires": ["event", "event-delegate", "node", "node-visibility", "photo", "photo-tags-transjax", "query-string-args", "urls", "yui-base"],
        "ext": false
      },
      "photo-tags-transjax": {
        "path": "j\/.B-.KD-.C-.F.A.v57yAxVg",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-tour": {
        "path": "j\/.B-.DA.A.v5Utsd3D",
        "requires": ["anim", "cookie", "dom", "event", "photo", "photo-tour-transjax", "yui-base"],
        "ext": false
      },
      "photo-tour-transjax": {
        "path": "j\/.B-.DA-.C-.F.A.v4UnWBDk",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-transjax": {
        "path": "j\/.B-.C-.F.A.v6qhAo3i",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photo-ywa-tracking": {
        "path": "j\/.B-ywa-.BW.A.v2wjoFhD",
        "requires": ["event", "yahoo-web-analytics", "yui-base"],
        "ext": false
      },
      "photogne-exif-fetcher": {
        "path": "j\/.Bgne-.GO-fetcher.A.v4MZMTuM",
        "requires": ["gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "photos-user-favorites": {
        "path": "j\/.EC-user-.LFs.A.vWzwziF",
        "requires": ["event", "io", "node", "yui-base"],
        "ext": false
      },
      "photos-display": {
        "path": "j\/.EC-.IQ.A.v5wMRap4",
        "requires": ["photos-display-css", "event", "io", "node", "photo-data", "selector-css3", "photos-display-transjax", "yui-base"],
        "ext": false
      },
      "photos-display-transjax": {
        "path": "j\/.EC-.IQ-.C-.F.A.v3kQidpK",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photos-display-css": {
        "path": "c\/c_.EC-.IQ.BC.v6yWR1hH",
        "type": "css",
        "ext": false
      },
      "photos-list": {
        "path": "j\/.EC-.CZ.A.v4v82hdv",
        "requires": ["anim", "anim-scroll", "better-throttle", "cookie", "defer-images", "event", "flanal", "gallery-flickr-api", "gallery-popover", "global-dialog", "io", "keyboard-shortcut-manager", "menus", "murmurhash", "node", "node-visibility", "pagination-keyboard-shortcuts", "photo-data", "photos-list-transjax", "string-filters", "better-throttle", "refresh-sihp-comment", "refresh-sihp-share", "urls", "yui-base"],
        "optional": ["lightbox"],
        "ext": false
      },
      "photos-list-justifier": {
        "path": "j\/.EC-.CZ-.LA.A.v2PEWB7e",
        "requires": ["refresh-sihp-comment", "refresh-sihp-share", "yui-base"],
        "ext": false
      },
      "photos-list-transjax": {
        "path": "j\/.EC-.CZ-.C-.F.A.v5DmtACD",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "photostream-insitu": {
        "path": "j\/.ECtream-.DT.A.v3YZoxgT",
        "requires": ["event", "insitu", "node", "yui-base"],
        "ext": false
      },
      "photoset-transjax": {
        "path": "j\/.ECet-.C-.F.A.v3k1QySz",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "picnik": {
        "path": "j\/.EY-.D.A.v5AGCCv",
        "requires": ["global-dialog", "io-base", "json", "picnik-css", "picnik-transjax", "swfobject", "yui-base"],
        "ext": false
      },
      "picnik-css": {
        "path": "c\/c_.EY-.D.BC.v4wNqvbr",
        "type": "css",
        "ext": false
      },
      "picnik-transjax": {
        "path": "j\/.EY-.C-.F.A.verYH7a",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "playr": {
        "path": "j\/playr.A.v2VSWAfV",
        "requires": ["context-data", "cookie", "escape", "event", "gallery-flickr-api", "history-manager", "html5-balls", "keyboard-shortcut-manager", "lightbox-transjax", "node", "page-context", "photo-transjax", "rapid-tracker", "refresh-sihp-comment", "swfobject", "urls", "view-count", "yui-base"],
        "optional": ["lightbox"],
        "ext": false
      },
      "polyfills-placeholder": {
        "path": "j\/.KR-.KS.A.vSAFc6c",
        "requires": ["node", "yui-base"],
        "ext": false
      },
      "popup-login": {
        "path": "j\/.HP.A.v5SpEvak",
        "requires": ["event", "node", "io-base", "yui-base"],
        "ext": false
      },
      "post-message": {
        "path": "j\/post-.JU.A.v3duYtsD",
        "requires": ["event", "node", "yui-base"],
        "ext": false
      },
      "post-upload-sharing-ui": {
        "path": "j\/post-.KI-.EE-ui.A.v2MfMPED",
        "requires": ["event", "node", "yui-base"],
        "ext": false
      },
      "post-upload-sharing-owner-ui": {
        "path": "j\/post-.KI-.EE-.BK-ui.A.v659HuDP",
        "requires": ["event", "node", "yui-base", "share-this-v3-menu", "share-this-v3-dialog"],
        "ext": false
      },
      "pro-survey": {
        "path": "j\/pro-survey.A.v6zf3iqr",
        "requires": ["event", "node", "yui-base", "attribute", "flickr-dialog-confirmation", "rapid-tracker"],
        "ext": false
      },
      "pro-upsell-bandwidth-limit-notification": {
        "path": "j\/pro-upsell-bandwidth-limit-notification.A.v2mAdWma",
        "requires": ["flickr-dialog-confirmation", "notification-base", "pro-upsell-notification-transjax"],
        "ext": false
      },
      "pro-upsell-photo-limit-notification": {
        "path": "j\/pro-upsell-.B-limit-notification.A.v2wmWaKg",
        "requires": ["flickr-dialog-confirmation", "notification-base", "pro-upsell-notification-transjax"],
        "ext": false
      },
      "pro-upsell-notification-transjax": {
        "path": "j\/pro-upsell-notification-.C-.F.A.v9ADBBg",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "query-string-args": {
        "path": "j\/.CP-.U-.DE.A.vnsDRdD",
        "requires": ["yui-base"],
        "ext": false
      },
      "rapid-tracker-2": {
        "path": "j\/.IY-.CH-2.A.v385g2pc",
        "requires": ["yui-base"],
        "ext": false
      },
      "rapid-tracker-3": {
        "path": "j\/.IY-.CH-3.A.vGZvw9e",
        "requires": ["yui-base"],
        "ext": false
      },
      "rapid-tracker": {
        "path": "j\/.IY-.CH-yui3-wrapper.A.v38zuwxT",
        "requires": ["yui-base", "rapid-tracker-3"],
        "ext": false
      },
      "refresh-sihp": {
        "path": "j\/refresh-sihp.A.v2vJVCsH",
        "requires": ["gallery-flickr-api", "swfobject", "html5-balls", "view-count-on-visible", "io-form", "refresh-sihp-comment", "refresh-sihp-feed-ads", "refresh-sihp-favorite", "refresh-sihp-keyboard", "refresh-sihp-muting", "refresh-sihp-share", "refresh-sihp-transjax", "defer-images", "yui-base", "event-custom"],
        "ext": false
      },
      "refresh-sihp-comment": {
        "path": "j\/.LD.LG.A.v4xKRgMc",
        "requires": ["flickr-dialog", "photo-comments-transjax", "refresh-sihp-sidebar", "share-this-v3-menu", "grease", "node-visibility", "yui-base"],
        "ext": false
      },
      "refresh-sihp-favorite": {
        "path": "j\/.LD.LF.A.v4c1Yt5r",
        "requires": ["yui-base"],
        "ext": false
      },
      "refresh-sihp-feed-ads": {
        "path": "j\/.LDfeed-ads.A.v3XC5jpk",
        "requires": ["yui-base", "event-custom", "refresh-sihp-sidebar"],
        "ext": false
      },
      "refresh-sihp-friendfinder": {
        "path": "j\/.LD.LH.A.v5V6SxrK",
        "requires": ["gallery-flickr-api", "string-filters", "yui-base"],
        "ext": false
      },
      "refresh-sihp-keyboard": {
        "path": "j\/.LD.Q.A.v4ri8Lt8",
        "requires": ["anim-scroll", "better-throttle", "dom", "keyboard-shortcut-manager", "yui-base"],
        "ext": false
      },
      "refresh-sihp-muting": {
        "path": "j\/.LD.LE.A.vV3A7xT",
        "requires": ["yui-base"],
        "ext": false
      },
      "refresh-sihp-recofeed": {
        "path": "j\/.LDrecofeed.A.v38v52BP",
        "requires": ["gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "refresh-sihp-share": {
        "path": "j\/.LD.DN.A.v5iVGkMc",
        "requires": ["share-this-v3-menu", "global-dialog", "yui-base"],
        "ext": false
      },
      "fmodal-dialog": {
        "path": "j\/fmodal-.W.A.v3BJ23DT",
        "requires": ["yui-base", "io", "node", "event", "event-key", "dom"],
        "ext": false
      },
      "fb_suggestions_v2": {
        "path": "j\/fb_.IL_v2.A.v3jDbjx4",
        "requires": ["yui-base", "node", "cookie", "event", "dom", "io", "json", "gallery-flickr-api", "fb_suggestions_transjax", "yui-array", "rapid-tracker"],
        "ext": false
      },
      "fb_suggestions": {
        "path": "j\/fb_.IL.A.v2PzCNJi",
        "requires": ["yui-base", "node", "cookie", "event", "dom", "io", "json", "gallery-flickr-api", "fb_suggestions_transjax", "yui-array", "rapid-tracker"],
        "ext": false
      },
      "fb_suggestions_transjax": {
        "path": "j\/fb_.IL_.C.A.v39EXMqr",
        "ext": false
      },
      "fb_signup": {
        "path": "j\/fb_signup.A.v5T8GuPp",
        "requires": ["yui-base", "fb_suggestions", "node", "event", "dom", "io", "json", "event-focus", "fb_signup_transjax", "rapid-tracker", "querystring-parse-simple"],
        "ext": false
      },
      "fb_signup_transjax": {
        "path": "j\/fb_signup_.C.A.v6sEsLPP",
        "ext": false
      },
      "fb-reco": {
        "path": "j\/fb-reco.A.v5fRXYEZ",
        "requires": ["yui-base", "node", "event", "dom"],
        "ext": false
      },
      "fb-reco-transjax": {
        "path": "j\/fb-reco-.C-.F.A.vb4VAMP",
        "ext": false
      },
      "signup-dialog": {
        "path": "j\/signup-.W.A.v4UmNGqM",
        "requires": ["yui-base", "signup-dialog-transjax", "io", "node", "event", "dom", "fmodal-dialog", "fb-reco"],
        "ext": false
      },
      "signup-dialog-transjax": {
        "path": "j\/signup-.W-.C-.F.A.v4m74jH4",
        "ext": false
      },
      "refresh-sihp-sidebar": {
        "path": "j\/.LD.I.A.vpMqyxk",
        "requires": ["yui-base", "fb-reco", "refresh-sihp-friendfinder", "refresh-sihp-transjax", "rapid-tracker"],
        "ext": false
      },
      "refresh-sihp-transjax": {
        "path": "j\/.LD.C-.F.A.v2xDR1w6",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "refresh-photo-page-description": {
        "path": "j\/refresh-.B-.GF-.KC.A.v6a9pJg4",
        "requires": ["yui-base"],
        "ext": false
      },
      "retry-image-on-error": {
        "path": "j\/retry-.CW-on-.JP.A.v3Dzp4bi",
        "requires": ["event-base", "yui-base", "yui-later"],
        "optional": ["flanal"],
        "ext": false
      },
      "rev-dan-map": {
        "path": "j\/rev-dan-map.A.voFXYpk",
        "requires": ["event-base", "yui-base"],
        "ext": false
      },
      "rushmore-settings": {
        "path": "j\/.FS-.FR.A.v62ELLe4",
        "requires": ["event", "event-delegate", "global-dialog", "io", "node", "yui-base"],
        "ext": false
      },
      "search-keyboard-shortcuts": {
        "path": "j\/.CA-.HZs.A.v3FMpnck",
        "requires": ["anim", "event", "keyboard-shortcut-manager", "node", "yui-base"],
        "ext": false
      },
      "flickr-app-search": {
        "path": "j\/.J-app-.CA.A.vx6gMNn",
        "requires": ["context-data", "flickr-app", "search-hera-view", "rapid-tracker", "template-fetcher", "urls", "yui-base"],
        "ext": false
      },
      "search-refer": {
        "path": "j\/.CA-.DX-.D.A.v4Vmb496",
        "requires": ["anim", "cookie", "node", "yahoo-ult", "yui-base"],
        "ext": false
      },
      "selector-circle-css": {
        "path": "c\/c_.GB-circle.BC.v2CWQnSH",
        "type": "css",
        "ext": false
      },
      "selector-circle": {
        "path": "j\/.GB-circle.A.v6bXFjfr",
        "requires": ["base", "css3pie", "event", "selector-circle-css", "yui-base"],
        "ext": false
      },
      "set-meta-insitu": {
        "path": "j\/set-meta-.DT.A.v3Dv9L3n",
        "requires": ["event", "insitu", "node", "yui-base"],
        "ext": false
      },
      "share-menu-transjax": {
        "path": "j\/.DN-.BB-.D-.C-.F.A.v4Ksojjr",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "share-this-v3-account-settings": {
        "path": "j\/.HG-.IR-.FR.A.v4mmdBkF",
        "requires": ["dom", "event", "global-dialog", "io", "io-form", "querystring-stringify-simple", "yui-base"],
        "ext": false
      },
      "share-this-v3-css": {
        "path": "c\/c_.HG.BC.v2TKc8xk",
        "type": "css",
        "ext": false
      },
      "share-this-v3-dialog": {
        "path": "j\/.HG-.W.A.v5LPapaX",
        "requires": ["dom", "event", "global-dialog", "io-base", "node", "share-menu-transjax", "share-this-v3-dialog-css", "share-this-v3-dialog-transjax", "share-this-v3-services", "yui-base"],
        "optional": ["flanal"],
        "ext": false
      },
      "share-this-v3-dialog-css": {
        "path": "c\/c_.HG-.W.BC.v5UDCbTK",
        "type": "css",
        "ext": false
      },
      "share-this-v3-dialog-transjax": {
        "path": "j\/.HG-.W-.C-.F.A.v4Rj3c1i",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "share-this-v3-menu": {
        "path": "j\/.HG-.BB.A.vtzGFJn",
        "requires": ["better-throttle", "dom", "event", "event-custom", "gallery-flickr-api", "gallery-popover", "global-dialog", "io-base", "json-stringify", "menus", "node", "share-menu-transjax", "share-this-v3-triggers", "yui-base", "node-visibility"],
        "optional": ["photo-data"],
        "ext": false
      },
      "share-this-v3-service-blogger": {
        "path": "j\/.HF.HJ.A.v6whUyBF",
        "requires": ["share-this-v3-services", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-email": {
        "path": "j\/.HF.HH.A.v5zKHSeK",
        "requires": ["bo-selecta-3", "share-this-v3-services", "share-this-v3-service-email-transjax", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-email-transjax": {
        "path": "j\/.HF.HH-.C-.F.A.vF9185D",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-facebook": {
        "path": "j\/.HF.HL.A.v5tWX8B4",
        "requires": ["share-this-v3-services", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-livejournal": {
        "path": "j\/.HF.HT.A.v28t2mR",
        "requires": ["share-this-v3-services", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-tumblr": {
        "path": "j\/.HF.HU.A.vhGFKVg",
        "requires": ["share-this-v3-services", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-twitter": {
        "path": "j\/.HF.HK.A.vaJCpmv",
        "requires": ["share-this-v3-services", "share-this-v3-service-twitter-transjax", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-twitter-transjax": {
        "path": "j\/.HF.HK-.C-.F.A.v3usfrJM",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-wordpress": {
        "path": "j\/.HF.HM.A.v22xVaQV",
        "requires": ["share-this-v3-services", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-yahoo-pulse": {
        "path": "j\/.HF.CM-.HI.A.v2g66tCi",
        "requires": ["share-this-v3-services", "yui-base"],
        "ext": false
      },
      "share-this-v3-service-pinterest": {
        "path": "j\/.HFpinterest.A.v5xLVBWn",
        "requires": ["share-this-v3-services", "yui-base"],
        "ext": false
      },
      "share-this-v3-services": {
        "path": "j\/.HG-.HR.A.v3ss3rji",
        "requires": ["share-this-v3-service-blogger", "share-this-v3-service-email", "share-this-v3-service-facebook", "share-this-v3-service-livejournal", "share-this-v3-service-pinterest", "share-this-v3-service-tumblr", "share-this-v3-service-twitter", "share-this-v3-service-wordpress", "share-this-v3-service-yahoo-pulse", "yui-base"],
        "ext": false
      },
      "share-this-v3-triggers": {
        "path": "j\/.HG-.HS.A.v4vaYwcF",
        "requires": ["event", "flanal", "node", "share-this-v3-dialog", "yui-base"],
        "ext": false
      },
      "sprintf": {
        "path": "j\/.CC.A.v5Zq5Gt8",
        "requires": ["yui-base"],
        "ext": false
      },
      "smartbanner-css": {
        "path": "c\/c_smartbanner.BC.v4QQtsEH",
        "type": "css",
        "ext": false
      },
      "smartbanner": {
        "path": "j\/smartbanner.A.vvShk7a",
        "requires": ["smartbanner-css", "node", "array-extras"],
        "ext": false
      },
      "smart-crop": {
        "path": "j\/.KX.A.v2Wn8uQM",
        "requires": ["ccv", "face"],
        "ext": false
      },
      "soundmanager2": {
        "path": "j\/sound.K2.A.v2jnynqz",
        "requires": ["yui-base"],
        "ext": false
      },
      "string-filters": {
        "path": "j\/.U-.CG.A.vEe44PT",
        "requires": ["yui-base"],
        "ext": false
      },
      "soup": {
        "path": "j\/soup.A.v3me1izF",
        "requires": ["event", "flanal", "flickr-page-timing", "io", "motion-blur", "node", "popup-login", "rapid-tracker", "transition", "yui-base"],
        "ext": false
      },
      "soup-hera-view": {
        "path": "j\/soup-.LJ.JB.A.v28sBq5z",
        "requires": ["view", "datatype-date", "murmurhash", "handlebars", "photo-list-model", "photo-list-view", "flickr-dialog-infinite-spinner", "template-fetcher", "gallery-popover", "rapid-tracker", "io", "yui-base"],
        "ext": false
      },
      "tag-selecta": {
        "path": "j\/tag-.S.A.v41XuzTk",
        "requires": ["anim", "autocomplete", "tag-selecta-css", "tag-selecta-transjax", "datasource-function", "event", "event-custom", "gallery-flickr-api", "image-fader", "io-base", "node", "string-filters", "yui-base"],
        "ext": false
      },
      "tag-selecta-css": {
        "path": "c\/c_tag-.S.BC.v2rkAWmM",
        "type": "css",
        "ext": false
      },
      "tag-selecta-transjax": {
        "path": "j\/tag-.S-.C-.F.A.v2JaZ8sz",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "template-fetcher": {
        "path": "j\/.KW.A.vfDtxoR",
        "requires": ["handlebars"],
        "ext": false
      },
      "timing-average": {
        "path": "j\/.FZ-.JJ.A.v6CeBYoH",
        "requires": ["cookie", "event", "yui-base"],
        "ext": false
      },
      "tour-nav": {
        "path": "j\/.DA-nav.A.v57wNPZ8",
        "requires": ["anim", "node", "node-event-simulate", "io", "querystring", "history", "yahoo-ult", "yui-base"],
        "ext": false
      },
      "tour-carousel": {
        "path": "j\/.DA-.ER.A.v3YCcNCn",
        "requires": ["anim", "node", "yui-base"],
        "ext": false
      },
      "touch-lightbox": {
        "path": "j\/touch-.N.A.v21nTGQn",
        "requires": ["context-data", "cookie", "escape", "event", "gallery-flickr-api", "history-manager", "lightbox-transjax", "mrpinchy", "node", "page-context", "photo-transjax", "rapid-tracker", "transition", "urls", "view-count", "yui-base"],
        "optional": ["lightbox"],
        "ext": false
      },
      "type-cast": {
        "path": "j\/.DJ-cast.A.v57uhV7z",
        "requires": ["yui-base"],
        "ext": false
      },
      "transjax-base": {
        "path": "j\/.C-.BL.A.v4M3vJKp",
        "requires": ["sprintf", "yui-base"],
        "ext": false
      },
      "urls": {
        "path": "j\/urls.A.v3yp8b8B",
        "requires": ["yui-base"],
        "ext": false
      },
      "user-refave": {
        "path": "j\/user-re.CX.A.v5iKczCM",
        "requires": ["event", "gallery-flickr-api", "node", "yui-base"],
        "ext": false
      },
      "video": {
        "path": "j\/.DV-.D.A.v2Ku4VxX",
        "requires": ["cookie", "event-custom", "gallery-flickr-api", "node", "query-string-args", "string-filters", "swfobject", "video-transjax", "yui-base"],
        "ext": false
      },
      "video-masker": {
        "path": "j\/.DV-masker-.D.A.v4Tu8kGv",
        "requires": ["node", "page-context", "yui-base"],
        "ext": false
      },
      "video-transjax": {
        "path": "j\/.DV-.D-.C-.F.A.v493XsR4",
        "requires": ["transjax-base", "yui-base"],
        "ext": false
      },
      "view-count": {
        "path": "j\/.JB-count.A.v6eyt4R4",
        "requires": ["gallery-flickr-api", "json", "yui-base"],
        "ext": false
      },
      "view-count-on-visible": {
        "path": "j\/.JB-count-on-visible.A.v5Fta9X8",
        "requires": ["node-visibility", "view-count", "yui-base"],
        "ext": false
      },
      "whispers": {
        "path": "j\/whispers.A.v5Fmosm2",
        "requires": ["node", "event", "gallery-flickr-api", "yui-base"],
        "ext": false
      },
      "woe-corrector-css": {
        "path": "c\/c_woe-corrector.BC.v3cijqHF",
        "type": "css",
        "ext": false
      },
      "woe-corrector": {
        "path": "j\/woe-corrector.A.v2NYqL5V",
        "requires": ["base", "woe-corrector-css", "keyboard-shortcut-manager", "flickr-geo", "event", "yui-base"],
        "ext": false
      },
      "worker": {
        "path": "j\/.IW.A.v4ZeW23V",
        "requires": ["base", "event", "yui-base"],
        "ext": false
      },
      "xmp-extractor": {
        "path": "j\/xmp-.IN.A.v3x99hJi",
        "requires": ["yui-base"],
        "ext": false
      },
      "you-subnav-menu": {
        "path": "j\/you-subnav-.BB.A.v2NoPYrX",
        "requires": ["actions-menu-css", "event", "gallery-popover", "gallery-popover-css", "menus", "node", "yui-base"],
        "ext": false
      },
      "ywa-link-tracking": {
        "path": "j\/ywa-link-.BW.A.vcWVCsZ",
        "requires": ["event", "yahoo-web-analytics", "yui-base"],
        "ext": false
      },
      "zero-clipboard": {
        "path": "j\/zero-clipboard.A.v55NnTBt",
        "requires": ["yui-base"],
        "ext": false
      },
      "swfobject": {
        "path": "j\/.BM.A.v2WzRfF8",
        "ext": false
      },
      "yahoo-ult": {
        "path": "j\/.CM-ult.A.v5GXMD5n",
        "ext": false
      },
      "yahoo-web-analytics": {
        "path": "j\/ywa.A.v5wqU9b2",
        "ext": false
      },
      "roundtrip": {
        "path": "j\/roundtrip.A.v2gFRFXX",
        "ext": false
      },
      "lighthouse": {
        "path": "j\/lighthouse.A.v47RzvUr",
        "ext": false
      },
      "ymap": {
        "path": "j\/.FV.A.v2yAhsyH",
        "requires": ["event-synthetic", "yui2_5-animation", "yui2_5-yahoo", "yui2_5-event", "yui2_5-dom", "yui2_5-dragdrop"],
        "ext": false
      },
      "bing_map": {
        "path": "j\/bing_map_6_3.A.v3BgnQTP",
        "ext": false
      },
      "yui2_5-yahoo": {
        "path": "j\/.CM\/.CM_2.5.1.A.v4nSeErF",
        "ext": false
      },
      "yui2_5-event": {
        "path": "j\/.CM\/.G_2.5.1.A.v4GXbykB",
        "requires": ["yui2_5-yahoo"],
        "ext": false
      },
      "yui2_5-dom": {
        "path": "j\/.CM\/dom_2.5.1.A.v6cj1j2x",
        "requires": ["yui2_5-yahoo"],
        "ext": false
      },
      "yui2_5-dragdrop": {
        "path": "j\/.CM\/.FT_2.5.1.A.vKQ9kDP",
        "requires": ["yui2_5-dom", "yui2_5-event", "yui2_5-yahoo"],
        "ext": false
      },
      "yui2_5-animation": {
        "path": "j\/.CM\/.FL_2.5.1.A.v3JXwp5R",
        "requires": ["yui2_5-dom", "yui2_5-event", "yui2_5-yahoo"],
        "ext": false
      },
      "worker-echo": {
        "path": "j\/.IW-echo.A.vtAZffM",
        "requires": ["worker-yui-ready", "yui-base"],
        "ext": false
      },
      "worker-exif-extractor": {
        "path": "j\/.IW-.KU.A.v6qGvDu6",
        "requires": ["jfif-extractor", "better-throttle", "dataview", "exif-extractor", "exif-extractor-tags", "worker-yui-ready", "yui-base", "xmp-extractor"],
        "ext": false
      },
      "worker-yui-ready": {
        "path": "j\/.IW-.KV.A.v64pYApp",
        "requires": ["event", "event-custom", "yui-base"],
        "ext": false
      },
      "set-inline-comments-transjax": {
        "path": "j\/set-inline-.LGs-.C-.F.A.v321Mqqe",
        "ext": false
      }
    }
  };


  F.config = F.util.clone(yconf);
  YUI(yconf)
    .use(function (Y) {
      page_timing.js_assets_end = new Date()
        .getTime();
      Y.use('global-nav', 'node', 'dom', 'anim', 'rapid-tracker', 'nav-selecta-rapid', 'cookie', function (Y) {

        Y.globalNav.init();


        /**
         * Howdy. Did I mention we're hiring? Because we are. ;)
         * http://flickr.com/jobs/
         */

        var winloc = window.location.toString();

        var css = {
          disabled: 'disabled',
          enabled: 'enabled',
          mobile: 'mobile',
          notEmpty: 'not-empty',
          visible: 'visible',
          yoohooOverHere: 'yoohoo-over-here'
        };

        var windowInnerWidth;
        var windowInnerHeight;
        var bodyOffsetHeight;

        var dotsNavItems = document.querySelectorAll('.sohp-dots-nav li');
        var lastDotNavItem;

        var sohp = Y.one('#sohp-2014');

        var frames = Y.all('.sohp-section');
        var frameHeights = [];

        var maxSections = frames.size();

        // whether ads are present on the page, or not
        var adEnabled = (0 || 0);

        // presumed true until otherwise.
        var hasAd = true;

        // if there's no ad in section 0, it will be hidden from view and minSection will be 1.
        var minSection = 0;

        var sectionBodies = Y.all('.sohp-section-bd');

        var scrollAnimation;
        var lastScrollTimestamp = new Date();

        var upArrowLink = Y.one('#up-arrow-link');
        var upArrowUI = Y.one('#up-arrow-ui');
        var downArrowLink = Y.one('#down-arrow-link');
        var downArrowUI = Y.one('#down-arrow-ui');

        var downloads = Y.one('#sohp-downloads');

        //var overlayWrapper = Y.one('#section-stunning-overlay');
        var overlayWrapperVisible = false;

        var overlays = {
          graphite: Y.one('#section-stunning-graphite'),
          icedTea: Y.one('#section-stunning-iced-tea'),
          throwback: Y.one('#section-stunning-throwback')
        };

        var backgrounds = [Y.one('#background-noblur'), Y.one('#background-blur'), Y.one('#background-superblur')];
        var backgroundOpacity = [1, 0, 0];

        var backgroundParallax = Y.one('#background-parallax');

        var amount = 0;
        var lastAmount = 0;

        var searchField = Y.one('#search-field');

        // some browsers prefer scrollTop applied to documentElement, others prefer document.body.
        var scrollElement = (navigator.userAgent.match(/firefox|trident/i) ? document.documentElement : document.body);

        // various UA sniffing, mostly for performance or minor UI quirks.
        var isWebkit = (navigator.userAgent.match(/webkit/i));
        var isSafari = (navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i));
        var isFirefox = (navigator.userAgent.match(/firefox/i));
        var isOldIE = (navigator.userAgent.match(/msie 8/i));
        var isIE9 = (navigator.userAgent.match(/msie 9/i));
        var isMobile = (navigator.userAgent.match(/iphone|ipad|android|silk|mobile/i));
        var isIPad = (navigator.userAgent.match(/ipad/i));
        var isWinXP = (navigator.userAgent.match(/windows nt 5/i));

        var allowMobile = (winloc.match(/allowmobile/i));

        var useBlur = (!winloc.match(/noblur/i));

        var scrollTop;

        var useParallax;

        // for now, everybody gets in on the fun; why not.
        useParallax = true;

        // allow URL-based overrides
        if (useParallax && winloc.match(/noparallax/i)) {

          useParallax = false;

        } else if (!useParallax && winloc.match(/parallax/i)) {

          useParallax = true;

        }

        var forceScale3D = winloc.match(/scale3d/i);

        var useIncrementalScroll = (winloc.match(/incrementalscroll/i));

        // exclude mobile (iOS, etc.) from zoom as the UI may go haywire.
        var useZoom = (!isOldIE && !isIE9 && (!isMobile || isIPad) && !winloc.match(/nozoom/i));

        var useScroll = (!winloc.match(/noscroll/i));

        // Webkit scales fonts up rasterized when using transforms (boourns), but Firefox gets it right (and also doesn't support element.style.zoom.)
        var useTransformZoom = (navigator.userAgent.match(/firefox|msie/i));

        var lastZoomScale = 1;
        var zoomScaleMin = 0.82;
        var zoomScaleMax = 2;

        var lastParallax;

        var isRetina;

        var useScale3D;

        var didFirstScroll;

        var animationTimer;

        var videos = document.getElementsByTagName('video');

        var enterEvents = {

          // these fire after the animation has completed, and the new section is in view.

          'section-1': function () {

            setTimeout(function () {
              playVideo(1);
            }, 1000);

          },

          'section-2': function () {

            playVideo(2);

          },

          'section-3': function () {

            /**
             * show the special overlays for the "stunning" section
             * ... ensuring we're actually there when this runs, also.
             */

            if (getCurrentSection() === 3) {

              if (!overlayWrapperVisible) {

                Y.one('#section-stunning-overlay').addClass('visible');
                overlayWrapperVisible = true;

              }

            }

            playVideo(3);

          },

          'section-4': function () {

            playVideo(4);

          }


        };

        var leaveEvents = {

          // these fire when the section begins to animate out.

          'section-3': function () {

            // leaving the "stunning" section - hide the overlays.

            if (overlayWrapperVisible) {

              Y.one('#section-stunning-overlay').removeClass('visible');
              overlayWrapperVisible = false;

            }

          }

        };

        var videoActions = {

          /**
           * given a video ID, provide an array of methods to be called when a certain position is reached.
           * methods fire once until video ends or is otherwise reset.
           */

          // <video> ID
          'section-stunning-video': {

            reset: function () {

              Y.one('#section-stunning-graphite').removeClass(css.visible);
              Y.one('#section-stunning-iced-tea').removeClass(css.visible);
              Y.one('#section-stunning-throwback').removeClass(css.visible);

            },

            timeline: [{

              method: function () {
                // iced tea filter + texture
                Y.one('#section-stunning-graphite').removeClass(css.visible);
                Y.one('#section-stunning-iced-tea').addClass(css.visible);
                Y.one('#section-stunning-throwback').removeClass(css.visible);
              },
              time: 0.25,
              fired: false

            }, {

              method: function () {
                // throwback filter
                Y.one('#section-stunning-graphite').removeClass(css.visible);
                Y.one('#section-stunning-iced-tea').removeClass(css.visible);
                Y.one('#section-stunning-throwback').addClass(css.visible);
              },
              time: 3.45,
              fired: false

            }, {

              method: function () {
                // grey!
                Y.one('#section-stunning-graphite').addClass(css.visible);
                Y.one('#section-stunning-iced-tea').removeClass(css.visible);
                Y.one('#section-stunning-throwback').removeClass(css.visible);
              },
              time: 6.75,
              fired: false

            }, {

              method: function () {
                // back to original
                Y.one('#section-stunning-graphite').removeClass(css.visible);
                Y.one('#section-stunning-iced-tea').removeClass(css.visible);
                Y.one('#section-stunning-throwback').removeClass(css.visible);
              },
              time: 10.25,
              fired: false

            }]

          }

        };

        function checkRetina() {

          return (typeof window.devicePixelRatio !== 'undefined' && window.devicePixelRatio > 1);

        }

        function checkScale3D() {

          /**
           * Perhaps this could be optimized / I'm missing something.
           * As of 03/2014, Safari is smooth, Chrome slightly slow, Firefox quite slow when combining scale3d() + translate3d() on a 15" Retina LCD.
           * Test machine: 15" (2880x1800) MacBook Pro Retina, Mid 2012 (NVIDIA GeForce GT 650M 1024 MB, 16 GB 1600 MHz DDR3, 2.6 GHz Intel Core i7)
           */
          return (forceScale3D || (!isWinXP && !isFirefox && (!isRetina || isSafari)));

        }

        function animateTo(node, preventInterrupt, scrollAction) {

          var easing,
            id,
            oldId,
            from,
            duration,
            interrupted,
            sectionOffset,
            targetY,
            to,
            oldSection;

          if (node) {

            oldSection = getCurrentSection();

            node = Y.one(node);

            if (!node) {
              return false;
            }

            id = node.get('id');

            targetY = node.getY();

            if (!preventInterrupt) {

              // new animation? stop the current one.
              if (scrollAnimation) {

                scrollAnimation.stop(false);

                // this is crap, but we have to debounce scroll events that may still be firing - particularly from touchpads.
                if (scrollAction) {

                  window.setTimeout(function () {
                    scrollAnimation = null;
                  }, 500);

                } else {

                  scrollAnimation = null;

                }

                interrupted = true;

              }

            } else {

              // new animation attempt while one is running? ignore, and bail.
              if (scrollAnimation) {
                return false;
              }

            }

            // remove "pulse" effect, as applicable
            if (!didFirstScroll) {
              downArrowUI.removeClass(css.yoohooOverHere);
              didFirstScroll = true;
            }

            // update retina check, for those of you who move windows between non-retina and retina monitors.
            isRetina = checkRetina();

            // and update useScale3D, too.
            useScale3D = checkScale3D();

            // force update of scrollTop?
            scrollTop = parseInt(scrollElement.scrollTop, 10);

            from = scrollTop;
            to = parseInt(targetY, 10);
            duration = 1;

            scrollAnimation = new Y.Anim({
              node: scrollElement,
              to: {
                scrollTop: parseInt(targetY, 10)
              },
              // if existing animation was interrupted, move really fast to indicate responsiveness.
              easing: (interrupted ? 'easeOutStrong' : (scrollAction ? 'easeBoth' : 'easeBothStrong')),
              duration: duration
            });

            easing = scrollAnimation.get('easing');

            scrollAnimation.on('tween', function (e) {

              var elapsedTime = this.get('elapsedTime');
              var position = easing(elapsedTime, from, to - from, duration * 1000);

              scrollTop = parseInt(position, 10);

            });

            scrollAnimation.on('end', function () {

              // reset the previous video, if any.
              resetVideo(oldSection);

              // for crap browsers, navigate to the target URL after animation completes.
              if (!history || !history.replaceState) {
                window.location.hash = '#' + id;
              }

              // for preventing multiple simultaneous animations
              scrollAnimation = null;

              if (enterEvents[id]) {

                // apply this after a short delay, also checking that a new animation has not started.

                if (animationTimer) {
                  window.clearTimeout(animationTimer);
                }

                animationTimer = window.setTimeout(function () {

                  if (!scrollAnimation) {

                    if (enterEvents[id]) {
                      enterEvents[id]();
                    }

                  }

                  animationTimer = null;

                }, 250);

              }

            });

            // update the browser URL without navigating to the link
            if (history && history.replaceState) {
              history.replaceState({}, id, "#" + id);
            }

            oldId = 'section-' + oldSection;

            // "leave" events should always fire.
            if (leaveEvents[oldId]) {
              leaveEvents[oldId]();
            }

            scrollAnimation.run();

            if (lastDotNavItem) {
              lastDotNavItem.removeClass('selected');
            }

            // hackish: section-3 to 3, etc.
            sectionOffset = parseInt(id.substr(id.length - 1), 10);

            lastDotNavItem = Y.one(dotsNavItems[sectionOffset]);

            if (lastDotNavItem) {
              lastDotNavItem.addClass('selected');
            }

          }

          updateFixedItems();

        }

        function updateFixedItems() {

          var currentSection = getCurrentSection();

          // app links

          if (currentSection > 1 && currentSection < maxSections) {

            downloads.removeClass(css.disabled);

          } else {

            downloads.addClass(css.disabled);

          }

          // nav arrows

          if (currentSection <= minSection) {

            // top

            upArrowLink.addClass(css.disabled);
            upArrowUI.addClass(css.disabled);

            downArrowLink.removeClass(css.disabled);
            downArrowUI.removeClass(css.disabled);

          } else if (currentSection >= maxSections) {

            // bottom

            downArrowLink.addClass(css.disabled);
            downArrowUI.addClass(css.disabled);

            upArrowLink.removeClass(css.disabled);
            upArrowUI.removeClass(css.disabled);

            Y.one('#photo-credit')
              .hide();

          } else {

            // somewhere in-between

            upArrowLink.removeClass(css.disabled);
            upArrowUI.removeClass(css.disabled);

            downArrowLink.removeClass(css.disabled);
            downArrowUI.removeClass(css.disabled);

            Y.one('#photo-credit')
              .show();

          }

        }

        function playVideo(section) {

          var videoId,
            video;

          section = parseInt(section, 10);

          // videoId = 'section-' + section + '-video';
          // video = document.getElementById(videoId);

          video = videos[section - 1];

          if (getCurrentSection() === section && video) {

            if (!isMobile) {

              try {
                video.play();
              } catch (e) {
                // d'oh well
              }

            }

          }

        }

        function checkVideoPosition(video) {

          var i, j, id, action, foundMatch, timeline;

          if (video) {

            foundMatch = false;

            id = video.id;
            time = video.currentTime;

            if (id) {

              action = videoActions[id];

              if (action && action.timeline) {

                timeline = action.timeline;

                if (timeline.length) {

                  // we have an object.
                  for (i = 0, j = timeline.length; i < j; i++) {

                    if (timeline[i].method && !timeline[i].fired && time >= timeline[i].time) {
                      timeline[i].method();
                      timeline[i].fired = true;
                    }

                  }

                }

              }

            }

          }

        }

        function disableVideo(video) {

          /**
           * If a video throws a fatal error, attempt to hide it with a static JPEG.
           * Use with caution.
           */

          var img;

          video = Y.one(video);

          img = video.get('parentNode')
            .all('img');

          if (!video.getAttribute('data-disabled')) {

            video.setAttribute('data-disabled', 1);

            img = document.createElement('img');
            img.className = 'thumb';

            img.src = video.getAttribute('data-fallback');

            video.get('parentNode')
              .appendChild(img);

          }

        }

        function resetVideoActions(videoId) {

          var i, j,
            action,
            timeline;

          action = videoActions[videoId];

          if (action) {

            timeline = action.timeline;

            // reset "fired" state
            for (i = 0, j = timeline.length; i < j; i++) {
              timeline[i].fired = false;
            }

            // fire "reset" method, if provided.
            if (action.reset) {

              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(action.reset)
              } else {
                action.reset();
              }

            }

          }

        }

        function resetVideo(videoNodeOrOffset) {

          // <video> element, or section number matching DOM ID pattern, section-#-video.

          var video;

          if (typeof videoNodeOrOffset === 'number') {
            video = videos[videoNodeOrOffset - 1];
          } else {
            video = videoNodeOrOffset;
          }

          if (video) {

            try {
              video.pause();
              video.currentTime = 0;
            } catch (e) {
              // may fail if not loaded or not ready
            }

            resetVideoActions(video.id);

          }

        }

        function getCurrentSection() {

          var hash = window.location.hash,
            sectionPrefix = 'section-';

          // parse out of the URL, or assume default.
          if (hash.match(/section/i)) {
            section = hash.substr(sectionPrefix.length + 1);
          } else {
            section = minSection;
          }

          return parseInt(section, 10);

        }

        function getNextSection() {

          var currentSection = getCurrentSection();

          currentSection = Math.min(maxSections, currentSection + 1);

          return currentSection;

        }

        function getPreviousSection() {

          var currentSection = getCurrentSection();

          currentSection = Math.max(minSection, currentSection - 1);

          return currentSection;

        }

        function getDimensions() {

          // potentially-expensive, layout-triggering DOM queries.

          windowInnerWidth = parseInt(window.innerWidth, 10);
          windowInnerHeight = parseInt(window.innerHeight, 10);
          bodyOffsetHeight = document.body.offsetHeight;

        }

        function resizeHandler() {

          var i,
            j,
            offset,
            minWidth = 1280, // from min-width on .sohp {} CSS
            adjustedScrollTop = 0,
            absoluteMinimumHeight,
            zoomScale = 1,
            zoomScaleOverflow,
            scaledWidth,
            currentFrame,
            thisMinHeight,
            innerHeight,
            hash;

          // ensure measurements are current.
          getDimensions();

          targetHeight = windowInnerHeight;
          windowWidth = windowInnerWidth;

          /**
           * Determine how small each screen can get. Ideally, each one is near full-height.
           * If window is really short (i.e., 11" or 13" macbook screen with a full-size dock), let content get down to 600px height. otherwise, bump up toward desired target of 780. Scaling will take things from there for larger windows.
           *
           * Update from Ross: This was causing a gap in the scaling, where screens with height above 780 or below 600 were fine, but anything inbetween didn't scale correctly. Setting this to a fixed value solved the problem.
           */

          absoluteMinimumHeight = 780; // (Math.min(Math.max(600, targetHeight), 780));

          innerHeight = Math.max(targetHeight, absoluteMinimumHeight);

          hash = window.location.hash;

          /**
           * WARNING: pixelation and dragons ahead.
           * This is why we use retina icons assets on non-retina screens, etc. (Thankfully, the file sizes are quite small as-is.)
           * "You so crazy / I think I wanna have your baby"
           */

          if (useZoom && targetHeight !== absoluteMinimumHeight) {

            // we have a candidate for scaling.
            // restrict scale to fit within both width + height of current browser window.
            zoomScale = Math.min(windowWidth / minWidth, targetHeight / absoluteMinimumHeight);

            // regardless of browser dimensions, limit within global range.
            zoomScale = Math.max(zoomScaleMin, Math.min(zoomScaleMax, zoomScale));

          }

          // ad should always be centered in a full-height frame.
          // only count if an ad is showing.

          if (hasAd) {

            Y.one('#section-0')
              .setStyle('height', windowInnerHeight + 'px');

            // for positioning offset calculations
            frameHeights[0] = windowInnerHeight;

          } else {

            frameHeights[0] = 0;

          }

          // assign new min-height, based on natural offsetHeight.
          Y.each(frames, function (frame, i) {

            // special case: exclude the ad section (index 0) from scaling.
            if (!hasAd || i > 0) {

              if (zoomScale !== lastZoomScale) {

                // transform: scale3d() results in raster-sized fonts on Webkit. However, .style.zoom works on Webkit (and old IE.)
                if (useTransformZoom) {

                  sectionBodies.item(i)
                    .setStyle('transform', 'scale3d(' + zoomScale + ',' + zoomScale + ',' + zoomScale + ')');
                  frame.setStyle('overflow', 'hidden');

                } else {

                  sectionBodies.item(i)
                    .setStyle('zoom', zoomScale);
                  // frame.style.overflow = 'hidden';

                }

              }

              // read natural content height, assign min-height rounded up to nearest screen length.
              frame.setStyle('minHeight', '1px');
              frame.setStyle('height', 'auto');

              // reading offsetHeight may be expensive, cause layout etc. re-assigning height certainly will.
              thisMinHeight = Math.max(1, Math.ceil(frame.getAttribute('offsetHeight') / innerHeight));

              frameHeights[i] = thisMinHeight * innerHeight;

              frame.setStyle('minHeight', frameHeights[i] + 'px');

              if (isOldIE) {

                // no min-height here...
                frame.setStyle('height', frameHeights[i] + 'px');

              } else {

                frame.setStyle('height', 'auto');

              }

            }

          });

          if (zoomScale !== lastZoomScale) {
            lastZoomScale = zoomScale;
          }

          // determine current position/offset
          if (hash) {

            currentFrame = document.getElementById(hash.substr(1));

            if (currentFrame && document.body) {

              // figure out target height, and go there!

              // if there is no ad, subtract 1 since #section-0 will be gone.
              offset = parseInt(hash.substr(hash.lastIndexOf('-') + 1), 10) + (!hasAd ? -1 : 0);

              for (i = 0, j = offset; i < j; i++) {
                adjustedScrollTop += frameHeights[i];
              }

              // ipad may fire this on scroll, which breaks scroll.
              if (!isMobile || allowMobile) {
                scrollElement.scrollTop = adjustedScrollTop;
              }

            }

          }

          // refresh, since page layout likely just changed
          getDimensions();

        }

        function setBackgroundOpacity(offset, opacity) {

          if (backgroundOpacity[offset] !== opacity) {
            backgrounds[offset].setStyle('opacity', opacity);
            backgroundOpacity[offset] = opacity;
          }

        }

        function scrollUpdate() {

          var innerHeight,
            documentHeight,
            relativeScroll,
            bgScale,
            blur;

          // first-run, undefined case
          if (!windowInnerHeight || !bodyOffsetHeight) {
            getDimensions();
          }

          /**
           * reading scrollTop may be expensive / trigger layout. Only read if a YUI animation is not running.
           * in the case of YUI animation, we know and can calculate scrollTop independently.
           */

          if (!scrollAnimation) {
            if (console && console.log) {
              // console.log('scrollAnimation inactive - reading expensive scroll from DOM');
            }
            scrollTop = scrollElement.scrollTop;
          }

          innerHeight = windowInnerHeight;
          documentHeight = bodyOffsetHeight;

          scrollPosition = (scrollTop / (documentHeight - innerHeight));

          // probably don't need *every* pixel, etc.
          if (!useIncrementalScroll) {

            amount = scrollPosition;

          } else {

            // trade-off: fidelity, less DOM updates, better performance
            amount = Math.floor(scrollPosition * 64);

          }

          if (amount !== lastAmount) {

            if (useBlur) {

              if (scrollPosition >= 0.45) {

                // bottom half: show partial blur, work down to full blur
                setBackgroundOpacity(1, 1);
                setBackgroundOpacity(2, Math.min(1, (scrollPosition - 0.45) / 0.5));

              } else {

                // upper half: show original background, work down to partial blur
                setBackgroundOpacity(2, 0);
                setBackgroundOpacity(1, Math.min(1, scrollPosition / 0.45));

              }

            }

            if (useParallax) {

              if (lastParallax !== scrollPosition) {

                /**
                 * here's where the fun happens.
                 * subtract percentage of 110% height on background, and that's how much space we get to play with.
                 */

                if (useScale3D) {
                  bgScale = 1 + (scrollPosition * 0.025);
                  backgroundParallax.setStyle('transform', 'scale3d(' + bgScale + ', ' + bgScale + ', 1) translate3d(0%, ' + (-((10 / 110) * 100) * scrollPosition) + '%, 0)');
                } else {
                  backgroundParallax.setStyle('transform', 'translate3d(0%,' + (-((10 / 110) * 100) * scrollPosition) + '%, 0)');
                }

                lastParallax = scrollPosition;

              }

            }

            // update
            lastAmount = amount;

          }

        }

        function scrollHandler() {

          // dirty, dirty, evil!
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(scrollUpdate);
          }

        }

        function evilWheelHandler(e) {

          /**
           * There is nothing wrong with your television set. Do not attempt to adjust the picture. We are controlling transmission.
           * ... We will control the horizontal. We will control the vertical.
           */

          var now,
            deltaY;

          // for now, just exit if there is an active animation.
          if (scrollAnimation) {
            e.preventDefault();
            return false;
          }

          // -- evil stuff below --

          now = new Date();
          deltaY = parseInt(e.deltaY || e.wheelDeltaY, 10);

          // don't mess with the event if there's no y.
          if (deltaY !== undefined && !isNaN(deltaY)) {

            // basic de-bouncing of scroll events; treat any that fire within a certain window as not being unique.
            if (now - lastScrollTimestamp > 1500) {

              // here's a fun one - this may not be fully implemented. doesn't seem to work when scrolling is inverted per OS preferences(?)
              if (typeof e.webkitDirectionInvertedFromDevice !== 'undefined') {

                if (e.webkitDirectionInvertedFromDevice && Y.UA.safari && Y.UA.safari < 600) {
                  deltaY *= -1;
                }

              }

              // new scroll action
              if (deltaY < 0) {

                // up!
                animateTo('#section-' + getPreviousSection(), true, true);

              } else if (deltaY > 0) {

                // down!
                animateTo('#section-' + getNextSection(), true, true);

              }

              lastScrollTimestamp = Date.now();

            }

            e.preventDefault();
            return false;

          }

        }

        function addScrollHandlers() {

          /**
           * dirty, dirty, evil: hijack mouse wheel (+trackpad) scroll gesture-type events, force controlled scroll.
           * also, touch events if apparently supported.
           * don't apply if it looks like there's a horizontal scrollbar.
           */

          if (useScroll) {

            if (!isMobile) {

              if (window.addEventListener && document.body.scrollWidth <= window.innerWidth) {
                window.addEventListener('mousewheel', evilWheelHandler, false);
                window.addEventListener('wheel', evilWheelHandler, false);
              }

            }


          }

        }

        function enhancePage() {

          if (isOldIE) {
            return false;
          }

          Y.one('window')
            .on('resize', resizeHandler, false);

          // no special effects for mobile, too expensive.
          if (!isMobile || allowMobile) {
            Y.one('window')
              .on('scroll', scrollHandler, false);
          }

          // update retina check, for those of you who move windows between non-retina and retina monitors.
          isRetina = checkRetina();

          // and update useScale3D, too.
          useScale3D = checkScale3D();

          scrollHandler();
          resizeHandler();

          if (!isMobile || allowMobile) {
            // enable + load some of the larger background images.
            sohp.addClass(css.enabled);
          } else {
            // explicitly disable a few things for mobile.
            sohp.addClass(css.mobile);
          }

          Y.one(document)
            .on('keydown', function (e) {

              var down, up, beginning, end;
              var ignoreMultiple;

              // space bar / page down, j/k, arrow keys
              if (e.keyCode) {
                down = (e.keyCode === 32 || e.keyCode === 34 || e.keyCode === 74 || e.keyCode === 40);
                up = (e.keyCode === 33 || e.keyCode === 75 || e.keyCode === 38);
                beginning = (e.keyCode === 36);
                end = (e.keyCode === 35);
              }

              // ignore if in an input, select/option etc, or if modifier keys are used..
              if ((!document.activeElement || !document.activeElement.nodeName.match(/(input|select|option)/i)) && !e.shiftKey && !e.altKey && !e.metaKey) {

                // block multiple events only for up/down arrow keys.
                if (!down && !up) {
                  ignoreMultiple = true;
                }

                // do the nav thing
                if (down) {
                  animateTo('#section-' + getNextSection(), ignoreMultiple);
                } else if (up) {
                  animateTo('#section-' + getPreviousSection(), ignoreMultiple);
                } else if (beginning) {
                  animateTo('#section-1');
                } else if (end) {
                  animateTo('#section-' + maxSections);
                }

                if (up || down || beginning || end) {
                  e.preventDefault();
                  return false;
                }

              }

            });

          // watch scrolling
          addScrollHandlers();

          // wait a moment, notify user
          window.setTimeout(function () {

            updateFixedItems();

            window.setTimeout(function () {

              if (!didFirstScroll && getCurrentSection() < maxSections) {
                downArrowUI.addClass(css.yoohooOverHere);

              }

              // update nav, and start first video
              updateDotsNav();

            }, 550);

          }, 250);

        }

        if (!isOldIE) {

          // get the party started.

          // listen to video progress events.
          (function () {

            var i, j;
            var videos = document.querySelectorAll('video');

            /**
             * IE 9 *might* choke on some MP4 videos, despite them apparently being encoded to spec.
             * Additionally, IE 9-11 may not support the <video> poster attribute (or, it doesn't show in the error case) - so, use a fallback.
             */

            var handleErrors = (navigator.userAgent.match(/msie|trident/i));

            // not you, IE 8.
            if (window.addEventListener) {

              for (i = 0, j = videos.length; i < j; i++) {

                videos[i].addEventListener('timeupdate', function (e) {
                  checkVideoPosition(e.target);
                }, false);

                videos[i].addEventListener('ended', function (e) {
                  resetVideoActions(e.target.id);
                }, false);

                if (handleErrors) {

                  videos[i].addEventListener('error', function (e) {
                    disableVideo(e.target);
                  }, false);

                }
              }

            }

          }());

          // watch clicks for section links - direct navigation, or previous/next.

          Y.one('body')
            .on('click', function (e) {

              var target = e.target;
              var href = target.get('href');
              var hash, hashOffset;
              var url;
              var anim;

              if (href) {

                // a #section-x link was clicked.

                if (href.match(/section/i)) {

                  hashOffset = href.indexOf('#');

                  if (hashOffset !== -1) {
                    hash = href.substr(hashOffset);
                    animateTo(hash);
                    e.preventDefault();
                    return false;
                  }

                } else {

                  // up/down navigation links.

                  if (href.match(/\#down/i)) {

                    animateTo('#section-' + getNextSection());

                    e.preventDefault();
                    return false;

                  } else if (href.match(/\#up/i)) {

                    animateTo('#section-' + getPreviousSection());

                    e.preventDefault();
                    return false;

                  }

                }

              }

            });

          /**
           * Glorious hacks!
           * Because of nested relative elements, the hover / click target for
           * the up/down arrows and their respective UI bits must be separated.
           * The link is flexible, while the arrow must be 50% and bottom-of-screen.
           */

          if (upArrowLink) {

            upArrowLink.on('mouseover', function (e) {
              upArrowUI.addClass('hover');
            });

            upArrowLink.on('mouseout', function (e) {
              upArrowUI.removeClass('hover');
            });

            downArrowLink.on('mouseover', function (e) {
              downArrowUI.addClass('hover');
            });

            downArrowLink.on('mouseout', function (e) {
              downArrowUI.removeClass('hover');
            });

          }

          // update dots nav
          function updateDotsNav() {

            var currentSection = getCurrentSection(),
              navItem,
              eventID;

            if (lastDotNavItem) {
              lastDotNavItem.removeClass('selected');
            }

            navItem = Y.one(dotsNavItems[currentSection]);

            navItem.addClass('selected');
            lastDotNavItem = navItem;

            eventID = 'section-' + currentSection;

            if (enterEvents[eventID]) {

              // apply this after a short delay, also checking that a new animation has not started.

              if (animationTimer) {
                window.clearTimeout(animationTimer);
              }

              animationTimer = window.setTimeout(function () {
                if (!scrollAnimation) {
                  enterEvents[eventID]();
                }
                animationTimer = null;
              }, 250);

            }

          }

        }

        // ad stuff

        function noAd() {

          // Ad iframe says, no ad (or postMessage error / timed out, etc.) Hide ad section of page, prevent navigation from going there.

          var sohp = document.getElementById('sohp-2014');

          if (sohp) {
            sohp.className = ((sohp.className ? sohp.className + ' ' : '') + 'no-ad');
          }

          // update ad flag, prevent nav going to 0.
          hasAd = false;
          minSection = 1;

          // if the ad was enabled, remove the extra section.
          if (adEnabled) {
            maxSections--;
          }

        }

        (function () {

          // safety net
          var adTimer;

          /**
           * Wait and see if we have an ad scheduled, according to adHelper.
           * If no response within a reasonable time, presume there is no ad and render page without ad elements.
           */

          if (adEnabled && typeof window.billboardAd !== 'undefined' && F && F.adHelper) {

            // if no ad response within a reasonable amount of time, enable all the JS.
            adTimer = window.setTimeout(function () {

              noAd();
              enhancePage();

            }, 2000);

            F.adHelper.onScheduledAd(window.billboardAd, function () {

              // Ad server says, "we have an ad."

              // kill the timer, if running
              if (adTimer) {
                window.clearTimeout(adTimer);
                adTimer = null;
              }

              // and get fancy
              enhancePage();

            });

            F.adHelper.onEmptyAd(window.billboardAd, function () {

              // Ad server says, "no ad."

              // kill the timer, if running
              if (adTimer) {
                window.clearTimeout(adTimer);
                adTimer = null;
              }

              noAd();

              // and enable the scroll features
              enhancePage();

            });

          } else {

            // no ad - enable features right away.

            noAd();
            enhancePage();

          }

        }());

        // Apply a GPU tweak to fix some scroll-based rendering quirks - video or text not displaying on scroll, etc.
        if (isWebkit) {
          Y.one('#sohp-2014')
            .addClass('gpu');
        }


        var breakpoints = [320, 360, 480, 540, 600, 640, 720, 768, 800, 854, 960, 1024, 1050, 1080, 1152, 1200, 1280, 1344, 1360, 1366, 1400, 1440, 1536, 1600, 1680, 1920, 2048, 240, 2560],
          doc_body = Y.one('body'),
          viewport_w = doc_body.get('winWidth'),
          viewport_h = doc_body.get('winHeight');

        function whatFormat(width, height) {

          //
          // This function chooses a common format from the ratio of hight and width
          //
          // The common formats are:
          // 0 : Narrow
          // 1 : Square
          // 2 : Wide
          // 3 : Double Wide
          //
          // This code is shared with YWA so don't change it here without changing
          // it in YWA chief.
          //

          var ratio = parseFloat(width / height, 10);

          if (ratio < 1) {
            return 0; // 'Narrow'
          }

          if (ratio == 1.0) {
            return 1; // 'Square'
          }

          if (ratio > 1) {
            if (ratio < 1.5) {
              return 3; // 'Wide'
            } else {
              return 4; // 'Double Wide'
            }
          }
        }

        function findClosestBreakpoint(width) {
          var compare = {},
            low, hi;
          for (i = 0; breakpoints.length > i; i++) {
            low = width - (breakpoints[i - 1] || 0);
            hi = breakpoints[i] - width;
            if (Math.max(width, breakpoints[i]) === breakpoints[i]) {
              compare[low] = (breakpoints[i - 1] || 0);
              compare[hi] = breakpoints[i];
              return compare[Math.min(low, hi)];
            }
          }
        }

        function clientOnOffSwitch() {
          var enableRapid = true;

          return enableRapid;
        }


        //
        // This enables campaign keeper. This takes a campaign id from the
        // querystring and adds it to a cookie. This cookie will be used to
        // track campaigns accross Reboot and Refresh in YWA
        //
        var campaigns = '';


        var raw_campaigns = Y.Cookie.get('flcp'),
          campaigns_object;

        if (raw_campaigns && raw_campaigns.substring(0, 2) === 'j:') {

          if (raw_campaigns.substring(0, 2)) {
            campaigns_object = JSON.parse(raw_campaigns.substring(2));
          }

          if (Y.Lang.isObject(campaigns_object)) {
            campaigns = Object.keys(campaigns_object);
          }
        }


        var keys = {
          A_pn: '/index.gne',
          joindate: '-1',
          bx: '7jicf89ab80ah&b=3&s=4f'
        };


        YAHOO.i13n.YWA_ACTION_MAP = {};

        YAHOO.i13n.YWA_CF_MAP = {
          joindate: 6,
          actcard: 22,
          autotags: 23
        };


        var ywa = {
          project_id: 10001561398679,
          host: 'y.analytics.yahoo.com',
          document_name: '/index.gne',
          cf: {
            28: 'sohp_2014',
            39: 'n',
            43: 'n',
            1: 'en-us',
            3: 'Prod',
            4: '',
            7: '0',
            8: 'photo_page:scrappy_beta_signed_out,https_all:ssl_redirect_enabled,search_page:new_page_with_datetime_parsing,photostream_page:classic,albums_page:classic,favorites_page:classic,groups_page:reboot_groups_members,explore_page:classic,advanced_search_page:classic,unified_groups_search_page:classic,unif',
            9: '0',
            10: '-1',
            11: '-1',
            12: '-1',
            13: '2',
            16: viewport_w + 'x' + viewport_h,
            45: '3',
            51: '7',
            52: whatFormat(viewport_w, viewport_h),
            53: findClosestBreakpoint(viewport_w),
            54: '2',
            55: Y.Lang.isArray(campaigns) ? campaigns.join(',') : '',

            56: '0',
            57: '0',
            58: '0'
          }
        };


        var conf = {
          use_rapid: (true && clientOnOffSwitch()),
          ywa: ywa,
          keys: keys,
          lt_attr: 'data-track',
          client_only: 1,
          spaceid: '792600119',
          tracked_mods: [],
          track_lv: true,
          compr_on: true,
          webworker_file: '/javascript/rapidworker-1.1.js',

          use_sampling: false,


          nofollow_class: ["nav_more", "signin-popup", "rapidnofollow", "contact-changer-trigger", "personmenu-relationship-change"]
        };


        conf.tracked_mods.push('sohp-2014');
        conf.tracked_mods.push('global-nav');

        Y.config.flickr.rapidconf = conf;
        Y.rapidTracker.init(conf);


      });
      Y.use('flickr', 'popup-login', 'nav-selecta', 'grease', 'comscore', function (Y) {

        Y.flickr();

        Y.popup_login.init();


        if (document.getElementById('gn-search-field')) {
          var field_node = Y.one('#gn-search-field');
          var nav_selecta = new Y.NavSelecta(field_node, {
            linkUsernameToPhotostream: 1,
            preloadText: field_node.get('value')
          });
        }


        Y.grease.init(0);

        if (typeof COMSCORE !== 'undefined') {
          COMSCORE._flickrconf = {
            c1: 2,
            c2: 7241469,
            c3: "",
            c4: "www.flickr.com%2F",
            c5: "792600119",
            c6: "",
            c15: ""
          };
          COMSCORE.beacon(COMSCORE._flickrconf);
        }


        page_timing.js_done = new Date()
          .getTime();

      });
      Y.use('flickr-page-timing', function (Y) {

        Y.flickrPageTiming({
          is_owner: false,
          page_id: 'soup'
        });


      });
    });
})();