class blurPlugin extends BasePlugin {
    beforeProcess = () => {
        if (!this.utils.supportHasSelector) {
            return this.utils.stopLoadPluginError
        }
    }

    hotkey = () => [{hotkey: this.config.HOTKEY, callback: this.call}]

    init = () => {
        this.css_id = "plugin-blur-style";
        this.inBlur = this.config.BLUR_DEFAULT;
    }

    process = () => this.run(false);

    call = () => {
        this.inBlur = !this.inBlur;
        this.run();
    }

    getStyleText = () => {
        const selector = "#write > [cid]:not(.md-focus):not(:has(.md-focus)):not(:has(.md-focus-container))";
        const [effect, restore] = (this.config.BLUR_TYPE === "hide")
            ? ["visibility: hidden;", "visibility: visible;"]
            : [`filter: blur(${this.config.BLUR_LEVEL}px);`, "filter: initial;"]

        let css = `${selector} { ${effect} }`;
        if (this.config.RESRTORE_WHEN_HOVER) {
            css += `${selector}:hover { ${restore} }`;
        }
        return css
    }

    run = (showNotification = true) => {
        if (this.inBlur) {
            this.utils.insertStyle(this.css_id, this.getStyleText());
        } else {
            this.utils.removeStyle(this.css_id);
        }
        if (showNotification) {
            this.utils.showNotification(this.inBlur ? "模糊模式已启用" : "模糊模式已关闭");
        }
    }
}

module.exports = {
    plugin: blurPlugin,
};
