// 插件名称是通过配置文件引入的，为了避免XSS注入，不可使用innerHTML
class rightClickMenuPlugin extends global._basePlugin {
    init = () => {
        this.notavailableValue = "__not_available__";
        this.callArgs = [
            {arg_name: "右键菜单点击后保持显示/隐藏", arg_value: "do_not_hide"},
            {arg_name: "打开插件配置文件", arg_value: "open_setting_folder"},
            {arg_name: "关于/帮助", arg_value: "about"},
        ]
    }

    process = () => {
        this.init();
        this.utils.addEventListener(this.utils.eventType.allPluginsHadInjected, this.appendMenu);
    }

    appendMenu = () => {
        setTimeout(() => {
            // 一级菜单汇总所有插件
            this.appendFirst();
            // 二级菜单展示所有插件
            this.appendSecond();
            // 三级菜单展示插件的参数
            this.appendThird();
            this.listen();
        }, 500)
    }

    appendFirst = () => {
        const menu = document.querySelector(`#context-menu`);
        const elements = [
            {ele: "li", class_: "divider", "data-group": "plugin"},
            ...this.config.MENUS.map((menu, idx) => ({
                ele: "li", class_: "has-extra-menu", idx: idx, "data-key": "typora-plugin", children: [{
                    ele: "a", role: "menuitem", children: [
                        {ele: "span", "data-lg": "Menu", text: menu.NAME},
                        {ele: "i", class_: "fa fa-caret-right"}
                    ]
                }]
            }))
        ]
        this.utils.appendElements(menu, elements);
    }

    appendSecond = () => {
        this.findLostPluginIfNeed();

        const content = document.querySelector("content");
        const elements = this.config.MENUS.map((menu, idx) => {
            const children = menu.LIST.map(item => {
                if (item === "---") {
                    return {"ele": "li", class_: "divider"}
                }
                const plugin = this.utils.getPlugin(item);
                if (plugin) {
                    return this.secondLiTemplate(plugin);
                }
                return {}
            })
            return this.ulTemplate({idx, children, class_: "plugin-menu-second"});
        })

        this.utils.appendElements(content, elements);
    }

    appendThird = () => {
        const content = document.querySelector("content");
        this.config.MENUS.forEach((menu, idx) => {
            const elements = menu.LIST.map(item => {
                if (item === "---") return {};
                const plugin = this.utils.getPlugin(item);
                if (!plugin || !plugin.callArgs && !plugin.dynamicCallArgsGenerator) return {};

                const children = (plugin.callArgs || []).map(arg => this.thirdLiTemplate(arg));
                return this.ulTemplate({
                    idx, children, class_: "plugin-menu-third", fixed_name: plugin.fixedName,
                });
            })
            this.utils.appendElements(content, elements);
        })
    }

    secondLiTemplate = plugin => {
        const hasNotArgs = !plugin.callArgs && !plugin.dynamicCallArgsGenerator;

        const extra = {class_: "plugin-menu-item"};
        if (!hasNotArgs) {
            extra.class_ += " has-extra-menu";
        }
        if (!plugin.config.CLICKABLE) {
            extra.style = {color: "#c4c6cc", pointerEvents: "none"};
        }

        const childExtra = {};
        if (hasNotArgs) {
            childExtra.text = plugin.config.NAME;
        } else {
            childExtra.children = [{
                ele: "span", "data-lg": "Menu", text: plugin.config.NAME,
                children: [{ele: "i", class_: "fa fa-caret-right"}]
            }]
        }

        return {
            ele: "li", "data-key": plugin.fixedName, ...extra, children: [{
                ele: "a", role: "menuitem", "data-lg": "Menu", ...childExtra
            }]
        }
    }

    thirdLiTemplate = (arg, dynamic) => {
        const extra = {};
        if (arg.arg_hint) {
            extra["ty-hint"] = arg.arg_hint;
        }
        if (dynamic) {
            extra["class_"] = `plugin-dynamic-arg ${(arg.arg_disabled) ? "disabled" : ""}`;
        }
        return {
            ele: "li", "data-key": arg.arg_name, arg_value: arg.arg_value, ...extra,
            children: [{ele: "a", role: "menuitem", "data-lg": "Menu", text: arg.arg_name}]
        }
    }

    ulTemplate = extra => {
        const class_ = `dropdown-menu context-menu ext-context-menu ${extra.class_ || ""}`;
        delete extra.class_;
        return {ele: "ul", class_, role: "menu", ...extra}
    }

    findLostPluginIfNeed = () => {
        if (!this.config.FIND_LOST_PLUGIN) return;

        const allPlugins = new Map();
        for (const fixedName of Object.keys(global._plugins)) {
            allPlugins.set(fixedName, global._plugins[fixedName]);
        }
        this.config.MENUS.forEach(menu => menu.LIST.forEach(plugin => allPlugins.delete(plugin)));
        for (const plugin of allPlugins.values()) {
            this.config.MENUS[this.config.MENUS.length - 1].LIST.push(plugin.fixedName);
        }
    }

    show = (after, before) => {
        const next = after.addClass("show");

        const rect = next[0].getBoundingClientRect();
        const nextHeight = rect.height;
        const nextWidth = rect.width;

        const {left, top, width, height} = before[0].getBoundingClientRect();
        let nextTop = top - height;
        let nextLeft = left + width + 6;

        if (nextTop + nextHeight > window.innerHeight) {
            nextTop = window.innerHeight - nextHeight;
        }
        if (nextLeft + nextWidth > window.innerWidth) {
            nextLeft = window.innerWidth - nextWidth;
        }

        next.css({top: nextTop + "px", left: nextLeft + "px"});
    }

    appendThirdLi = ($menu, dynamicCallArgs) => {
        dynamicCallArgs.forEach(arg => $menu.append(this.utils.createElement(this.thirdLiTemplate(arg, true))))
    }

    appendDummyThirdLi = $menu => {
        this.appendThirdLi($menu, [{
            arg_name: "光标于此位置不可用",
            arg_value: this.notavailableValue,
            arg_disabled: true,
        }])
    }

    listen = () => {
        const that = this;

        // 展示二级菜单
        $("#context-menu").on("mouseenter", "[data-key]", function () {
            const first = $(this);
            if ("typora-plugin" === first.attr("data-key")) {
                const idx = this.getAttribute("idx");
                if (document.querySelector(`.plugin-menu-second.show`)) {
                    document.querySelectorAll(`.plugin-menu-third:not([idx="${idx}"])`).forEach(ele => ele.classList.remove("show"));
                }
                const otherSecond = document.querySelectorAll(`.plugin-menu-second:not([idx="${idx}"])`);
                otherSecond.forEach(ele => ele.querySelectorAll(`.plugin-menu-item.active`).forEach(ele => ele.classList.remove("active")));
                otherSecond.forEach(ele => ele.classList.remove("show"));
                that.show($(`.plugin-menu-second[idx="${idx}"]`), first);
                first.addClass("active");
            } else {
                document.querySelectorAll(".plugin-menu-second").forEach(ele => ele.classList.remove("show"));
                document.querySelectorAll("[data-key='typora-plugin']").forEach(ele => ele.classList.remove("active"));
                document.querySelectorAll(".plugin-menu-third").forEach(ele => ele.classList.remove("show"));
            }
        })
        // 展示三级菜单
        $(".plugin-menu-second").on("mouseenter", "[data-key]", function () {
            const second = $(this);
            document.querySelectorAll(`.plugin-menu-third`).forEach(ele => ele.classList.remove("show"));
            document.querySelectorAll(".plugin-dynamic-arg").forEach(ele => ele.parentElement.removeChild(ele));
            const fixedName = second.attr("data-key");
            const $third = $(`.plugin-menu-third[fixed_name="${fixedName}"]`);
            const dynamicCallArgs = that.utils.generateDynamicCallArgs(fixedName);
            if (dynamicCallArgs) {
                that.appendThirdLi($third, dynamicCallArgs);
            }
            if ($third.children().length === 0) {
                that.appendDummyThirdLi($third);
            }
            if (second.find(`span[data-lg="Menu"]`).length) {
                that.show($third, second);
            } else {
                document.querySelector(".plugin-menu-second .has-extra-menu").classList.remove("active");
            }
            // 在二级菜单中调用插件
        }).on("click", "[data-key]", function () {
            const fixedName = this.getAttribute("data-key");
            const plugin = that.utils.getPlugin(fixedName);
            // 拥有三级菜单的，不允许点击二级菜单
            if (plugin.callArgs || plugin.dynamicCallArgsGenerator) {
                return false
            }
            if (plugin && plugin.call) {
                plugin.call();
            }
            if (!that.config.DO_NOT_HIDE) {
                File.editor.contextMenu.hide();
            }
        })

        // 在三级菜单中调用插件
        $(".plugin-menu-third").on("click", "[data-key]", function () {
            // 点击禁用的选项
            if (this.classList.contains("disabled")) return false;

            const fixedName = this.parentElement.getAttribute("fixed_name");
            const argValue = this.getAttribute("arg_value");
            const plugin = that.utils.getPlugin(fixedName);
            if (argValue !== that.notavailableValue && plugin && plugin.call) {
                that.utils.withMeta(meta => plugin.call(argValue, meta));
            }
            if (!that.config.DO_NOT_HIDE) {
                File.editor.contextMenu.hide();
            }
        })
    }

    call = type => {
        if (type === "about") {
            this.utils.openUrl("https://github.com/obgnail/typora_plugin");
        } else if (type === "do_not_hide") {
            this.config.DO_NOT_HIDE = !this.config.DO_NOT_HIDE;
        } else if (type === "open_setting_folder") {
            const filepath = this.utils.joinPath("./plugin/global/settings/settings.user.toml");
            JSBridge.showInFinder(filepath);
        }
    }
}

module.exports = {
    plugin: rightClickMenuPlugin
};
