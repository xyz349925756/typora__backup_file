class collapseTablePlugin extends BasePlugin {
    styleTemplate = () => true

    init = () => {
        this.className = "plugin-collapse-table";
    }

    process = () => {
        this.recordCollapseState(false);

        this.utils.decorate(() => File && File.editor && File.editor.tableEdit, "showTableEdit", null, (result, ...args) => {
                const $figure = args[0];
                if (!$figure || $figure.length === 0 || !$figure.find) return;
                const $edit = $figure.find(".md-table-edit");
                if (!$edit || $edit.length === 0) return;

                const icon = $figure.hasClass(this.className) ? "fa fa-plus" : "fa fa-minus";
                const span = `<span class="md-th-button right-th-button"><button type="button" class="btn btn-default plugin-collapse-table-btn" ty-hint="表格折叠"><span class="${icon}"></span></button></span>`;
                $edit.append($(span));
            }
        )

        this.utils.entities.eWrite.addEventListener("click", ev => {
            const btn = ev.target.closest(".plugin-collapse-table-btn");
            if (!btn) return;
            const figure = btn.closest("figure");
            if (!figure) return;
            this.toggleTable(figure);
        })
    }

    call = (type, meta) => {
        if (type === "convert_current") {
            this.toggleTable(meta.target);
        } else if (type === "record_collapse_state") {
            this.recordCollapseState(true);
        }
    }

    dynamicCallArgsGenerator = (anchorNode, meta) => {
        const figure = anchorNode.closest("#write .table-figure");
        const arg_disabled = !figure;
        const arg_hint = !figure ? "请将光标定位到表格后点击鼠标右键" : "";
        const arg_name = !figure ? "表格折叠" : (figure.classList.contains(this.className) ? "展开表格" : "折叠表格");
        const record = `${this.config.RECORD_COLLAPSE ? "不" : ""}记住表格折叠状态`;
        meta.target = figure;

        return [
            {arg_name, arg_hint, arg_disabled, arg_value: "convert_current"},
            {arg_name: record, arg_value: "record_collapse_state"}
        ]
    }

    toggleTable = figure => {
        const table = figure.querySelector("table");
        if (!table) return;
        figure.classList.toggle(this.className);
        const btn = figure.querySelector(".plugin-collapse-table-btn");
        if (btn) {
            const span = btn.querySelector("span");
            span.classList.toggle("fa-plus");
            span.classList.toggle("fa-minus");
        }
    }

    rollback = start => {
        let cur = start;
        while (true) {
            cur = cur.closest(`.${this.className}`);
            if (!cur) return;
            this.toggleTable(cur);
            cur = cur.parentElement;
        }
    }

    checkCollapse = figure => figure.classList.contains(this.className);

    recordCollapseState = (needChange = true) => {
        const name = "recordCollapseTable";
        const selector = "#write .table-figure";
        if (needChange) {
            this.config.RECORD_COLLAPSE = !this.config.RECORD_COLLAPSE;
        }
        if (this.config.RECORD_COLLAPSE) {
            this.utils.registerStateRecorder(name, selector, this.checkCollapse, this.toggleTable);
        } else {
            this.utils.unregisterStateRecorder(name);
        }
    }
}

module.exports = {
    plugin: collapseTablePlugin
};
