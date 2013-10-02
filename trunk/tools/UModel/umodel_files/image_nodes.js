/* $Id: image_nodes.js,v 1.3.2.4.4.24 2008/03/06 14:22:41 snpower Exp $ */

// Image Node Auto-Format with Auto Image Grouping.
// Original version by Steve McKenzie.
// Altered by Stella Power for jQuery version.

if (Drupal.jsEnabled) {
  $(document).ready(function lightbox2_image_nodes() {

    var settings = Drupal.settings.lightbox2;

    // Don't do it on the image assist popup selection screen.
    var img_assist = document.getElementById("img_assist_thumbs");
    if (!img_assist) {

      // Select the enabled image types.
      var classes = settings.trigger_image_classes;
      $("a["+classes+"]").each(function(i) {

        if ((!settings.disable_for_gallery_lists && !settings.disable_for_acidfree_gallery_lists) || (!$(this).parents(".galleries").length && !$(this).parents(".acidfree-folder").length && !$(this).parents(".acidfree-list").length) || ($(this).parents(".galleries").length && !settings.disable_for_gallery_lists) || (($(this).parents(".acidfree-folder").length || $(this).parents(".acidfree-list").length) && !settings.disable_for_acidfree_gallery_lists)) {

          var child = $(this).children();

          // Ensure the child has a class attribute we can work with.
          if ($(child).attr("class").length) {

            // Set the alt text.
            var alt = $(child).attr("alt");
            if (!alt) {
              alt = "";
            }

            // Set the image node link text.
            var link_text = settings.node_link_text;
            var link_target  = "";
            if (settings.node_link_target != 0) {
              link_target = 'target="'+ settings.node_link_target +'"';
            }

            // Set the rel attribute.
            var rel = "lightbox";
            if (settings.group_images) {
              rel = "lightbox[" + $(child).attr("class") + "]";
            }
            
            // Set the basic href attribute - need to ensure there's no language
            // string (e.g. /en) prepended to the URL.
            var href = $(child).attr("src");
            var orig_href = $(this).attr("href");
            var pattern = new RegExp(settings.file_path);
            if (orig_href.match(pattern)) {
              var lang_pattern = new RegExp(settings.base_path + "\\w\\w\\/");
              orig_href = orig_href.replace(lang_pattern, settings.base_path);
            }

            // Handle flickr images.
            if ($(child).attr("class").match("flickr-photo-img")
              || $(child).attr("class").match("flickr-photoset-img")) {
              href = $(child).attr("src").replace("_s", "").replace("_t", "").replace("_m", "").replace("_b", "");
              if (settings.group_images) {
                rel = "lightbox[flickr]";
                if ($(child).parents("div.block-flickr").attr("class")) {
                  var id = $(child).parents("div.block-flickr").attr("id");
                  rel = "lightbox["+ id +"]";
                }
              }
            }

            // Handle "image-img_assist_custom" images.
            else if ($(child).attr("class").match("image-img_assist_custom")) {
              // Image assist uses "+" signs for spaces which doesn't work for
              // normal links.
              orig_href = orig_href.replace(/\+/, " ");
              href = orig_href;
            }

            // Handle "inline" images.
            else if ($(child).attr("class").match("inline")) {
              href = orig_href;
            }


            // Set the href attribute.
            else if (settings.image_node_sizes != '()') {
              href = $(child).attr("src").replace(new RegExp(settings.image_node_sizes), ((settings.display_image_size == "")?settings.display_image_size:"."+ settings.display_image_size)).replace(/(image\/view\/\d+)(\/\w*)/, ((settings.display_image_size == "")?"$1/_original":"$1/"+ settings.display_image_size));
              if (settings.group_images) {
                rel = "lightbox[node_images]";
                if ($(child).parents("div.block-image").attr("class")) {
                  var id = $(child).parents("div.block-image").attr("id");
                  rel = "lightbox["+ id +"]";
                }
              }
            }

            // Modify the image url.
            $(this).attr({rel: rel,
              title: alt + "<br /><a href=\"" + orig_href + "\" id=\"node_link_text\" "+ link_target +" >"+ link_text + "</a>",
              href: href
              });
          }
        }

      });

    }
  });
}
