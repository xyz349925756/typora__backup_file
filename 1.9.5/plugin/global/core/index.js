const {BasePlugin, BaseCustomPlugin, LoadPlugin} = require("./plugin");
const {utils} = require("./utils");
const {getHelper} = require("./utils/delegate");
const {helper, loadHelpersBefore, loadHelpersAfter, optimizeHelpers} = getHelper(utils);

class Launcher {
    // 整个插件系统一共暴露了8个全局变量，实际有用的只有3个：BasePlugin, BaseCustomPlugin, LoadPlugin
    // 其余5个全局变量皆由静态类utils暴露，永远不会被业务插件引用；而utils同时又是BasePlugin, BaseCustomPlugin的实例属性，所以utils自己也不需要暴露
    // 既然永远不会被业务插件引用，为何要将它们设置为全局变量？答：方便调试
    static prepare = settings => {
        global.BasePlugin = BasePlugin;             // 插件的父类
        global.BaseCustomPlugin = BaseCustomPlugin; // 自定义插件的父类
        global.LoadPlugin = LoadPlugin;             // 加载插件函数

        global._plugins = {};                              // 启用的插件
        global._plugin_utils = utils;                      // 通用工具
        global._plugin_helper = helper;                    // 高级工具
        global._plugin_settings = settings;                // 插件配置
        global._plugin_global_settings = settings.global;  // 通用配置

        delete settings.global;
    }

    static showWarningIfNeed = () => {
        const need = global._plugin_global_settings.SHOW_INCOMPATIBLE_WARNING;
        const incompatible = utils.compareVersion(window._options.appVersion, "0.9.98") < 0;
        if (need && incompatible) {
            utils.showNotification("Typora 版本过低，部分插件可能失效。\n建议升级到 0.9.98 (最后一个免费版本)", "warning", 5000);
        }
    }

    static loadPlugins = () => Promise.all(Object.entries(global._plugin_settings).map(async ([fixedName, setting]) => {
        if (!setting || !setting.ENABLE) {
            console.debug(`disable plugin: [ \x1b[31m${fixedName}\x1b[0m ] `);
            return;
        }
        try {
            const instance = await global.LoadPlugin(fixedName, setting, false);
            if (!instance) return;
            global._plugins[instance.fixedName] = instance;
            console.debug(`enable plugin: [ \x1b[32m${instance.fixedName}\x1b[0m ] `);
        } catch (e) {
            console.error("load plugin error:", e);
        }
    }))

    static optimizeHelpers = async () => {
        if (global._plugin_global_settings.PERFORMANCE_MODE) {
            await optimizeHelpers();
        }
    }

    static run = async () => {
        const settings = await utils.readSetting("settings.default.toml", "settings.user.toml");
        if (!settings || !settings.global || !settings.global.ENABLE) return;

        // 初始化全局变量
        this.prepare(settings);

        // 加载组件(先于插件)
        await loadHelpersBefore();

        // 加载插件
        await this.loadPlugins();

        // 加载组件(后于插件)
        await loadHelpersAfter();

        // 发布[已完成]事件
        utils.publishEvent(utils.eventType.allPluginsHadInjected);

        // 优化组件
        await this.optimizeHelpers();

        // 由于使用了async，有些页面事件可能已经错过了（比如afterAddCodeBlock），重新加载一遍页面
        setTimeout(utils.reload, 50);

        // 低于0.9.98版本的Typora运行插件系统时，提出不兼容警告
        this.showWarningIfNeed();
    }
}

console.debug(`
____________________________________________________________________
   ______                                      __            _     
  /_  __/_  ______  ____  _________ _   ____  / /_  ______ _(_)___ 
   / / / / / / __ \\/ __ \\/ ___/ __ \`/  / __ \\/ / / / / __ \`/ / __ \\
  / / / /_/ / /_/ / /_/ / /  / /_/ /  / /_/ / / /_/ / /_/ / / / / /
 /_/  \\__, / .___/\\____/_/   \\__,_/  / .___/_/\\__,_/\\__, /_/_/ /_/ 
     /____/_/                       /_/            /____/          

                        Designed by obgnail                         
              https://github.com/obgnail/typora_plugin             
____________________________________________________________________
`)

module.exports = {
    entry: async () => Launcher.run()
};