class blockSideBySidePlugin extends BaseCustomPlugin {
    hotkey = () => [this.config.hotkey]

    styleTemplate = () => true

    callback = async () => {
        const enable = this.utils.getStyleContent(this.fixedName);
        const func = enable ? "unregisterStyleTemplate" : "registerStyleTemplate";
        await this.utils[func](this.fixedName);
    }
}

module.exports = {
    plugin: blockSideBySidePlugin,
};