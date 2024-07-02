class fileCounterPlugin extends BasePlugin {
    styleTemplate = () => ({
        font_weight: this.config.FONT_WEIGHT || "initial",
        color: this.config.COLOR || "var(--active-file-text-color)",
        background_color: this.config.BACKGROUND_COLOR || "var(--active-file-bg-color)",
    })

    init = () => {
        this.className = "plugin-file-counter";
    }

    process = () => {
        // typora有bug，有一定概率无法完整加载，强刷一下
        setTimeout(() => File.editor.library.refreshPanelCommand(), 1200);

        this.utils.loopDetector(this.setAllDirCount, null, 300);

        if (this.config.CTRL_WHEEL_TO_SCROLL_SIDEBAR_MENU) {
            document.querySelector("#file-library").addEventListener("wheel", ev => {
                const target = ev.target.closest("#file-library");
                if (target && this.utils.metaKeyPressed(ev)) {
                    target.scrollLeft += ev.deltaY * 0.2;
                    ev.stopPropagation();
                    ev.preventDefault();
                }
            }, {passive: false, capture: true})
        }

        new MutationObserver(mutationList => {
            if (mutationList.length === 1) {
                const add = mutationList[0].addedNodes[0];
                if (add && add.classList && add.classList.contains("file-library-node")) {
                    this.setDirCount(add);
                    return
                }
            }
            const need = mutationList.some(mutation => {
                const {target} = mutation;
                const add = mutation.addedNodes[0];
                const t = target && target.classList && target.classList.contains(this.className);
                const a = add && add.classList && add.classList.contains(this.className);
                return !(t || a)
            })
            need && this.setAllDirCount();
        }).observe(document.getElementById("file-library-tree"), {subtree: true, childList: true});
    }

    verifyExt = filename => {
        if (filename[0] === ".") {
            return false
        }
        const ext = this.utils.Package.Path.extname(filename).replace(/^\./, '');
        if (~this.config.ALLOW_EXT.indexOf(ext.toLowerCase())) {
            return true
        }
    }

    verifySize = stat => 0 > this.config.MAX_SIZE || stat.size < this.config.MAX_SIZE;
    allowRead = (filepath, stat) => this.verifySize(stat) && this.verifyExt(filepath);
    allowTraverse = path => !this.config.IGNORE_FOLDERS.includes(path)

    countFiles = (dir, fileFilter, dirFilter, then) => {
        const {Fs: {promises}, Path} = this.utils.Package;
        let fileCount = 0;

        async function traverse(dir) {
            const stats = await promises.stat(dir);
            if (!stats.isDirectory()) {
                return;
            }
            const files = await promises.readdir(dir);
            for (const file of files) {
                const filePath = Path.join(dir, file);
                const fileStats = await promises.stat(filePath);
                if (fileStats.isFile() && fileFilter(filePath, fileStats)) {
                    fileCount++;
                }
                if (fileStats.isDirectory() && dirFilter(file)) {
                    await traverse(filePath);
                }
            }
        }

        traverse(dir).then(() => then(fileCount)).catch(err => console.error(err));
    }

    setDirCount = treeNode => {
        const dir = treeNode.getAttribute("data-path");
        this.countFiles(dir, this.allowRead, this.allowTraverse, fileCount => {
            let countDiv = treeNode.querySelector(`:scope > .${this.className}`);
            if (fileCount <= this.config.IGNORE_MIN_NUM) {
                this.utils.removeElement(countDiv);
                return;
            }
            if (!countDiv) {
                countDiv = document.createElement("div");
                countDiv.classList.add(this.className);
                const background = treeNode.querySelector(".file-node-background");
                treeNode.insertBefore(countDiv, background.nextElementSibling);
            }
            countDiv.innerText = this.config.BEFORE_TEXT + fileCount;
            const titleNode = treeNode.querySelector(".file-node-title");
            if (titleNode) {
                titleNode.style.setProperty('overflow-x', 'hidden', 'important');
            }
        });

        const fileNode = treeNode.querySelector(":scope > .file-node-children");
        if (fileNode) {
            fileNode.querySelectorAll(`:scope > [data-has-sub="true"]`).forEach(this.setDirCount);
        }
    }

    setAllDirCount = () => {
        const root = document.querySelector("#file-library-tree > .file-library-node");
        if (!root) return false;

        console.debug("setAllDirCount");
        this.setDirCount(root);
        return true
    }
}


module.exports = {
    plugin: fileCounterPlugin
};