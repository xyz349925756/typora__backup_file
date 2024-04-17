class autoNumberPlugin extends global._basePlugin {
    beforeProcess = () => {
        this.css_id = "plugin-auto-number-style";

        this.base_css = `
        #write { counter-reset: write-h2 Figures Tables Fences; }
        #write > h1 { counter-reset: write-h2 Figures Tables Fences; }
        #write > h2 { counter-reset: write-h3 Figures Tables Fences; }
        #write > h3 { counter-reset: write-h4; }
        #write > h4 { counter-reset: write-h5; }
        #write > h5 { counter-reset: write-h6; }
        
        @media print {
            pb {
                display: block;
                page-break-after: always;
            }
        
            h1 {
                page-break-before: always;
            }
        
            h1:first-of-type {
                page-break-before: avoid;
            }
        }`

        this.content_css = `
        #write > h2:before {
            counter-increment: write-h2;
            content: counter(write-h2) ". ";
        }
        
        #write > h3:before,
        #write > h3.md-focus.md-heading:before {
            counter-increment: write-h3;
            content: counter(write-h2) "." counter(write-h3) " ";
        }
        
        #write > h4:before,
        #write > h4.md-focus.md-heading:before {
            counter-increment: write-h4;
            content: counter(write-h2) "." counter(write-h3) "." counter(write-h4) " ";
        }
        
        #write > h5:before,
        #write > h5.md-focus.md-heading:before {
            counter-increment: write-h5;
            content: counter(write-h2) "." counter(write-h3) "." counter(write-h4) "." counter(write-h5) " "
        }
        
        #write > h6:before,
        #write > h6.md-focus.md-heading:before {
            counter-increment: write-h6;
            content: counter(write-h2) "." counter(write-h3) "." counter(write-h4) "." counter(write-h5) "." counter(write-h6) " "
        }
        
        #write > h3.md-focus:before,
        #write > h4.md-focus:before,
        #write > h5.md-focus:before,
        #write > h6.md-focus:before,
        h3.md-focus:before,
        h4.md-focus:before,
        h5.md-focus:before,
        h6.md-focus:before {
            color: inherit;
            border: inherit;
            border-radius: inherit;
            position: inherit;
            left: initial;
            float: none;
            top: initial;
            font-size: inherit;
            padding-left: inherit;
            padding-right: inherit;
            vertical-align: inherit;
            font-weight: inherit;
            line-height: inherit;
        }`

        this.side_bar_css = `
        .outline-content { counter-reset: outline-h2; }
        .outline-h1 { counter-reset: outline-h2; }
        .outline-h2 { counter-reset: outline-h3; }
        .outline-h3 { counter-reset: outline-h4; }
        .outline-h4 { counter-reset: outline-h5; }
        .outline-h5 { counter-reset: outline-h6; }
        
        .outline-content .outline-h2 .outline-label:before {
            counter-increment: outline-h2;
            content: counter(outline-h2) ". ";
        }
        
        .outline-content .outline-h3 .outline-label:before {
            counter-increment: outline-h3;
            content: counter(outline-h2) "." counter(outline-h3) " ";
        }
        
        .outline-content .outline-h4 .outline-label:before {
            counter-increment: outline-h4;
            content: counter(outline-h2) "." counter(outline-h3) "." counter(outline-h4) " ";
        }
        
        .outline-content .outline-h5 .outline-label:before {
            counter-increment: outline-h5;
            content: counter(outline-h2) "." counter(outline-h3) "." counter(outline-h4) "." counter(outline-h5) " ";
        }
        
        .outline-content .outline-h6 .outline-label:before {
            counter-increment: outline-h6;
            content: counter(outline-h2) "." counter(outline-h3) "." counter(outline-h4) "." counter(outline-h5) "." counter(outline-h6) " ";
        }`

        this.toc_css = `
        .md-toc-content { counter-reset: toc-h2; }
        .md-toc-h1 { counter-reset: toc-h2; }
        .md-toc-h2 { counter-reset: toc-h3; }
        .md-toc-h3 { counter-reset: toc-h4; }
        .md-toc-h4 { counter-reset: toc-h5; }
        .md-toc-h5 { counter-reset: toc-h6; }
        
        .md-toc-content .md-toc-h2 a:before {
            counter-increment: toc-h2;
            content: counter(toc-h2) ". ";
        }
        
        .md-toc-content .md-toc-h3 a:before {
            counter-increment: toc-h3;
            content: counter(toc-h2) "." counter(toc-h3) " ";
        }
        
        .md-toc-content .md-toc-h4 a:before {
            counter-increment: toc-h4;
            content: counter(toc-h2) "." counter(toc-h3) "." counter(toc-h4) " ";
        }
        
        .md-toc-content .md-toc-h5 a:before {
            counter-increment: toc-h5;
            content: counter(toc-h2) "." counter(toc-h3) "." counter(toc-h4) "." counter(toc-h5) " ";
        }
        
        .md-toc-content .md-toc-h6 a:before {
            counter-increment: toc-h6;
            content: counter(toc-h2) "." counter(toc-h3) "." counter(toc-h4) "." counter(toc-h5) "." counter(toc-h6) " ";
        }`

        this.image_css = `
        #write span.md-image.md-img-loaded::after {
            counter-increment: Figures;
            content: "${this.config.NAMES.image} " counter(write-h2) "-" counter(Figures);
            font-family: ${this.config.FONT_FAMILY};
            display: block;
            text-align: ${this.config.ALIGN};
            margin: 4px 0;
        }`

        this.table_css = `
        #write figure.table-figure::after {
            counter-increment: Tables;
            content: "${this.config.NAMES.table} " counter(write-h2) "-" counter(Tables);
            font-family: ${this.config.FONT_FAMILY};
            display: block;
            text-align: ${this.config.ALIGN};
            margin: 4px 0;
        }`

        this.fence_css = `
        #write .md-fences {
            margin-bottom: 2.4em;
        }
        #write .md-fences::after {
            counter-increment: Fences;
            content: "${this.config.NAMES.fence} " counter(write-h2) "-" counter(Fences);
            position: absolute;
            width: 100%;
            text-align: ${this.config.ALIGN};
            font-family: ${this.config.FONT_FAMILY};
            margin: 0.6em 0;
            font-size: 1.1em;
            z-index: 9;
        }
        #write .md-fences.md-fences-advanced.md-focus::after {
            content: ""
        }
        `
    }

    style = () => {
        return {textID: this.css_id, text: this.getResultStyle()}
    }

    init = () => {
        this.callArgs = [
            {arg_name: "禁用/启用大纲自动编号", arg_value: "set_outline"},
            {arg_name: "禁用/启用正文自动编号", arg_value: "set_content"},
            {arg_name: "禁用/启用TOC自动编号", arg_value: "set_toc"},
            {arg_name: "禁用/启用表格自动编号", arg_value: "set_table"},
            {arg_name: "禁用/启用图片自动编号", arg_value: "set_image"},
            {arg_name: "禁用/启用代码块自动编号", arg_value: "set_fence"},
        ];

        this.callMap = {
            disable: this.removeStyle,
            enable: this.insertStyle,
            set_outline: () => this.insertStyle("ENABLE_SIDE_BAR"),
            set_content: () => this.insertStyle("ENABLE_CONTENT"),
            set_toc: () => this.insertStyle("ENABLE_TOC"),
            set_table: () => this.insertStyle("ENABLE_TABLE"),
            set_image: () => this.insertStyle("ENABLE_IMAGE"),
            set_fence: () => this.insertStyle("ENABLE_FENCE"),
        }
    }

    process = () => {
        this.init();
        if (this.config.ENABLE_WHEN_EXPORT) {
            new exportHelper(this).process();
        }
    }

    removeStyle = () => this.utils.removeStyle(this.css_id);

    getStyleString = () => {
        return [
            this.base_css,
            (this.config.ENABLE_CONTENT) ? this.content_css : "",
            (this.config.ENABLE_SIDE_BAR) ? this.side_bar_css : "",
            (this.config.ENABLE_TOC) ? this.toc_css : "",
            (this.config.ENABLE_IMAGE) ? this.image_css : "",
            (this.config.ENABLE_TABLE) ? this.table_css : "",
            (this.config.ENABLE_FENCE) ? this.fence_css : "",
        ].join("\n")
    }

    getResultStyle = toggle => {
        if (toggle) {
            this.config[toggle] = !this.config[toggle];
            this.removeStyle();
        }

        return this.getStyleString()
    }

    insertStyle = toggle => {
        const css = this.getResultStyle(toggle);
        this.utils.insertStyle(this.css_id, css);
    }

    dynamicCallArgsGenerator = () => {
        let arg_name = "启用";
        let arg_value = "enable";
        if (!!document.getElementById(this.css_id)) {
            arg_name = "禁用";
            arg_value = "disable";
        }
        return [{arg_name, arg_value}]
    }

    call = type => {
        const func = this.callMap[type];
        func && func();
    }
}

// 导出时添加CSS，并解决导出pdf时目录没有编号的问题
class exportHelper {
    constructor(controller) {
        this.inExport = false;
        this.controller = controller
    }

    beforeExport = () => {
        this.inExport = true;
        return `body {font-variant-ligatures: no-common-ligatures;} ` + this.controller.getStyleString();
    }

    afterGetHeaderMatrix = headers => {
        if (!this.inExport) return;
        this.inExport = false;

        const pValue = {H2: 0, H3: 0, H4: 0, H5: 0, H6: 0};
        headers.forEach(header => {
            const tagName = "H" + header[0];
            if (!pValue.hasOwnProperty(tagName)) return;

            let numbering = "";
            switch (tagName) {
                case "H1":
                    pValue.H2 = 0;
                    break
                case "H2":
                    pValue.H3 = 0;
                    pValue.H2++;
                    numbering = `${pValue.H2}. `;
                    break
                case "H3":
                    pValue.H4 = 0;
                    pValue.H3++;
                    numbering = `${pValue.H2}.${pValue.H3} `;
                    break
                case "H4":
                    pValue.H5 = 0;
                    pValue.H4++;
                    numbering = `${pValue.H2}.${pValue.H3}.${pValue.H4} `;
                    break
                case "H5":
                    pValue.H6 = 0;
                    pValue.H5++;
                    numbering = `${pValue.H2}.${pValue.H3}.${pValue.H4}.${pValue.H5} `;
                    break
                case "H6":
                    pValue.H6++;
                    numbering = `${pValue.H2}.${pValue.H3}.${pValue.H4}.${pValue.H5}.${pValue.H6} `;
                    break
            }
            header[1] = numbering + header[1];
        })
    }

    process = () => {
        this.controller.utils.registerExportHelper("auto_number", this.beforeExport);
        this.controller.utils.decorate(
            () => (File && File.editor && File.editor.library && File.editor.library.outline
                && File.editor.library.outline.getHeaderMatrix),
            "File.editor.library.outline.getHeaderMatrix",
            null,
            this.afterGetHeaderMatrix
        );
    }
}

module.exports = {
    plugin: autoNumberPlugin
};