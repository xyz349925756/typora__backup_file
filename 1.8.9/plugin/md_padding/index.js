class mdPaddingPlugin extends BasePlugin {
    hotkey = () => [{hotkey: this.config.HOTKEY, callback: this.call}]

    formatContent = content => {
        const {padMarkdown} = this.utils.requireFilePath("./plugin/md_padding/md-padding");
        return padMarkdown(content, {ignoreWords: this.config.IGNORE_WORDS})
    }

    removeMultiLineBreak = content => {
        const maxNum = this.config.LINE_BREAK_MAX_NUM;
        if (maxNum > 0) {
            const lineBreak = content.indexOf("\r\n") !== -1 ? "\r\n" : "\n";
            const regexp = new RegExp(`(${lineBreak}){${maxNum + 1},}`, "g");
            const breaks = lineBreak.repeat(maxNum);
            content = content.replace(regexp, breaks);
        }
        return content;
    }

    formatAndRemoveMultiLineBreak = content => this.removeMultiLineBreak(this.formatContent(content));

    formatSelection = async () => {
        ClientCommand.copyAsMarkdown();
        const content = await window.parent.navigator.clipboard.readText();
        const formattedContent = this.formatAndRemoveMultiLineBreak(content);
        await window.parent.navigator.clipboard.writeText(formattedContent);
        ClientCommand.paste();
    }

    formatFile = async () => await this.utils.editCurrentFile(this.formatAndRemoveMultiLineBreak)

    call = async () => {
        await File.saveUseNode();
        const rangy = File.editor.selection.getRangy();
        if (this.config.FORMAT_IN_SELECTION_ONLY && rangy && !rangy.collapsed) {
            await this.formatSelection();
        } else {
            await this.formatFile()
        }
    }
}

module.exports = {
    plugin: mdPaddingPlugin
};