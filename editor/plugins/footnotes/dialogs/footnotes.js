﻿(function(f) {
    CKEDITOR.dialog.add("footnotesDialog", function(c) {

        var t = {
            ru: {
                'Manage Footnotes': 'Управление сносками',
                'New footnote:': 'Новая сноска:',
                'No existing footnotes': 'Нет существующих сносок',
                'Choose footnote': 'Укажите сноску',
                'OR': 'ИЛИ',
            },
            en: {
                'Manage Footnotes': 'Manage Footnotes',
                'New footnote:': 'New footnote:',
                'No existing footnotes': 'No existing footnotes',
                'Choose footnote': 'Choose footnote',
                'OR': 'OR',
            },
            def: 'en'
        };

        var current_lang = CKEDITOR.lang.detect();
        var lang = t[current_lang] ? t[current_lang] : t[t.def];

        return {
            editor_name: !1,
            title: lang["Manage Footnotes"],
            minWidth: 400,
            minHeight: 200,
            footnotes_el: !1,
            contents: [{
                id: "tab-basic",
                label: "Basic Settings",
                elements: [{
                    type: "textarea",
                    id: "new_footnote",
                    "class": "footnote_text",
                    label: lang["New footnote:"],
                    inputStyle: "height: 100px"
                }, {
                    type: "text",
                    id: "footnote_id",
                    name: "footnote_id",
                    label: lang["No existing footnotes"],
                    setup: function(a) {
                        a = this.getDialog();
                        var b = f("#" + this.domId);
                        a.footnotes_el = b;
                        c = a.getParentEditor();
                        a =
                            f(c.editable().$).find(".footnotes ol");
                        if (0 < a.length) {
                            0 == b.find("p").length ? b.append('\x3cp style\x3d"margin-bottom: 10px;"\x3e\x3cstrong\x3e'+lang['OR']+':\x3c/strong\x3e '+lang["Choose footnote"]+':\x3c/p\x3e\x3col class\x3d"footnotes_list"\x3e\x3c/ol\x3e') : b.find("ol").empty();
                            var e = "";
                            a.find("li").each(function() {
                                var b = f(this),
                                    a = b.attr("data-footnote-id");
                                e += '\x3cli style\x3d"margin-left: 15px;"\x3e\x3cinput type\x3d"radio" name\x3d"footnote_id" value\x3d"' + a + '" id\x3d"fn_' + a + '" /\x3e \x3clabel for\x3d"fn_' + a + '" style\x3d"white-space: normal; display: inline-block; padding: 0 25px 0 5px; vertical-align: top; margin-bottom: 10px;"\x3e' +
                                    b.find("cite").text() + "\x3c/label\x3e\x3c/li\x3e"
                            });
                            b.children("label,div").css("display", "none");
                            b.find("ol").html(e);
                            b.find(":radio").change(function() {
                                b.find(":text").val(f(this).val())
                            })
                        } else b.children("div").css("display", "none")
                    }
                }]
            }],
            onShow: function() {
                this.setupContent();
                var a = this;
                CKEDITOR.on("instanceLoaded", function(b) {
                    a.editor_name = b.editor.name
                });
                jQuery(".cke_dialog").css({
                    position: "absolute",
                    top: "2%"
                });
                var b = a.getParentEditor().id;
                CKEDITOR.replaceAll(function(a, d) {
                    if (!a.className.match(/footnote_text/)) return !1;
                    for (var c = a;
                         (c = c.parentElement) && !c.classList.contains(b););
                    if (!c) return !1;
                    d.toolbarGroups = [{
                        name: "editing",
                        groups: ["undo", "find", "selection", "spellchecker"]
                    }, {
                        name: "clipboard",
                        groups: ["clipboard"]
                    }, {
                        name: "basicstyles",
                        groups: ["basicstyles", "cleanup"]
                    }];
                    d.allowedContent = "br em strong; a[!href]";
                    d.enterMode = CKEDITOR.ENTER_BR;
                    d.autoParagraph = !1;
                    d.height = 80;
                    d.resize_enabled = !1;
                    d.autoGrow_minHeight = 80;
                    d.removePlugins = "footnotes";
                    d.on = {
                        focus: function(a) {
                            a = f("#" + a.editor.id + "_contents");
                            a.parents("tr").next().find(":checked").attr("checked",
                                !1);
                            a.parents("tr").next().find(":text").val("")
                        }
                    };
                    return !0
                })
            },
            onOk: function() {
                var a = CKEDITOR.instances[this.editor_name],
                    b = this.getValueOf("tab-basic", "footnote_id"),
                    e = a.getData();
                a.destroy();
                "" == b ? "" != e && c.plugins.footnotes.build(e, !0, c) : c.plugins.footnotes.build(b, !1, c)
            },
            onCancel: function() {
                CKEDITOR.instances[this.editor_name].destroy()
            },
        }
    })
})(window.jQuery);