export let config = {
    toolbarGroups: [
        { name: "document", groups: ["mode", "document", "doctools"] },
        {
            name: "editing",
            groups: ["find", "selection", "spellchecker", "editing"]
        },
        { name: "forms", groups: ["forms"] },
        { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
        {
            name: "paragraph",
            groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"]
        },
        "/",
        { name: "links", groups: ["links"] },
        { name: "insert", groups: ["insert"] },
        { name: "styles", groups: ["styles"] },
        { name: "colors", groups: ["colors"] },
        { name: "tools", groups: ["tools"] },
        "/",
        { name: "clipboard", groups: ["clipboard", "undo"] },
        { name: "others", groups: ["others"] },
        { name: "about", groups: ["about"] }
    ],
    removeButtons:
        "Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,SelectAll,Scayt,Replace,Form,Checkbox,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,SpecialChar,PageBreak,Iframe,Anchor,ShowBlocks,About,CopyFormatting,Undo,Redo",
    // fontSize_sizes: "16/16px;24/24px;48/48px;",
    // font_names:
    //   "Arial/Arial, Helvetica, sans-serif;" +
    //   "Times New Roman/Times New Roman, Times, serif;" +
    //   "Verdana",
    allowedContent: true,
    font_names:
        "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif",
    font_defaultLabel: "",
    font_style: {
        element: "span",
        styles: { "font-family": "#(family)" },
        overrides: [{ element: "font", attributes: { face: null } }]
    },
    fontSize_sizes:
        "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px",
    fontSize_defaultLabel: "",
    fontSize_style: {
        element: "span",
        styles: { "font-size": "#(size)" },
        overrides: [{ element: "font", attributes: { size: null } }]
    },
    format_tags: "p;h1;h2;h3;h4;h5;h6;pre;address;div",
    format_p: { element: "p" },
    format_div: { element: "div" },
    format_pre: { element: "pre" },
    format_address: { element: "address" },
    format_h1: { element: "h1" },
    format_h2: { element: "h2" },
    format_h3: { element: "h3" },
    format_h4: { element: "h4" },
    format_h5: { element: "h5" },
    format_h6: { element: "h6" },
    disableObjectResizing: false,
    disableNativeTableHandles: true,
    disableNativeSpellChecker: true,
    // contentsCss:
    //   "file:///Users/rambabus/workspace/EC/dbspweb_sg/common/dbsweb_formbuilder/authoring/web/sg/dbs_custom/Formbuilder/2.0/ng-ckeditor-master/libs/ckeditor/contents.css?t=E7KD",
    image_removeLinkByEmptyURL: true,
    // disableNativeSpellChecker: false
    // skin: "moono",
    // plugins:
    //   "dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,div,resize,elementspath,enterkey,entities,popup,filetools,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc"
};