class ArticleUploaderPlugin extends BasePlugin {
    init = () => {
        this.callArgs = [
            {arg_name: "CSDN", arg_value: "upload_to_csdn"},
            {arg_name: "WordPress", arg_value: "upload_to_wordpress"},
            {arg_name: "博客园", arg_value: "upload_to_cn_blog"},
            {arg_name: "上传到所有平台", arg_value: "upload_to_all_site"},
        ]
    }

    hotkey = () => [
        {hotkey: this.config.UPLOAD_CSDN_HOTKEY, callback: () => this.call("upload_to_csdn")},
        {hotkey: this.config.UPLOAD_CNBLOG_HOTKEY, callback: () => this.call("upload_to_cn_blog")},
        {hotkey: this.config.UPLOAD_WORDPRESS_HOTKEY, callback: () => this.call("upload_to_wordpress")},
        {hotkey: this.config.UPLOAD_ALL_HOTKEY, callback: () => this.call("upload_to_all_site")},
    ]

    call = async type => {
        const map = {
            upload_to_csdn: "csdn",
            upload_to_wordpress: "wordpress",
            upload_to_cn_blog: "cnblog",
            upload_to_all_site: "all"
        }
        const _type = map[type];
        if (_type) {
            await this.upload(_type);
        }
    }

    upload = async type => {
        const uploader = require("./Plugin2UploadBridge");
        this.uploader = new uploader(this);
        const filePath = this.utils.getFilePath();
        await this.uploader.uploadProxy(filePath, type);
    }
}

module.exports = {
    plugin: ArticleUploaderPlugin
};