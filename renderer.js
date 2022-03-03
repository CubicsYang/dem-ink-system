// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var vm = new Vue({
    el: '#container',
    data() {
        return {
            //TODO:更改选择文件栏默认为空
            dempic: "./exe/yuanshi22.jpg",
            stylepic: "./exe/fg1.jpg",
            resultpic: "https://static.runoob.com/images/mix/cinqueterre.jpg",
            styleText: "披麻皴",
            //appPath: "G:\dem-ink-system",
            appPath: __dirname,
            items: []
        }
    },
    created() {
        axios.get('assets/res/style.json')
            .then(function (response) {
                console.log(response.data);
                Vue.set(vm, 'items', response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(this.appPath)
    },
    methods: {
        dempicSelected: (event) => {
            path = document.getElementById("inputGroupFile").files[0].path
            console.log(path)
            Vue.set(vm, 'dempic', path);
        },
        styleSelected: (event) => {
            selectValue = event.target.innerText
            axios.get('assets/res/style.json')
                .then(function (response) {
                    data = response.data;
                    data.forEach(element => {
                        if (element.style == selectValue) {
                            Vue.set(vm, 'stylepic', element.link);
                            Vue.set(vm, 'styleText', element.style);
                        }
                    });
                })
        },
        transfer_btn: function () {
            let appPath = this.appPath;
            //stylepic_link:G:/dem-ink-system/exe/fg1.jpg
            stylepic_link = decodeURIComponent(document.getElementById("style_pic").src.split('///')[1])
            stylepic_name = stylepic_link.split('/')[stylepic_link.split('/').length - 1]
            dempic_link = decodeURIComponent(document.getElementById("dem_pic").src.split('///')[1])
            dempic_name = dempic_link.split('/')[dempic_link.split('/').length - 1]
            let outputPath = 'yuanshi22_fg1.jpg';
            let cmd = jointCommand(appPath + '/exe/', dempic_link, stylepic_link, outputPath)
            execCommandSync(cmd, appPath + '/exe/' + outputPath);
        }
    }
})

function jointCommand(rootPath, contentPath, stylePath, outputPath) {
    var cmd = rootPath + 'style_transfer.exe' +
        ' --content ' + contentPath +
        ' --style ' + stylePath +
        ' --output ' + rootPath + outputPath;
    console.log(cmd);
    return cmd;
}

function execCommandSync(command, outputPath) {
    const execSync = require('child_process').execSync;
    try {
        execSync(command);
        console.log("success");
        Vue.set(vm, 'resultpic', outputPath);
    } catch (e) {
        console.log("error");
    }

}