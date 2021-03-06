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
            dempic: "./assets/res/img/yuanshi22.jpg",
            stylepic: "./assets/res/img/fg1.jpg",
            resultpic: "https://static.runoob.com/images/mix/cinqueterre.jpg",
            styleText: "披麻皴",
            //appPath: "G:\dem-ink-system",
            appPath: __dirname,
            items: [],
            progressValue: 0,
            progressValueShow: false,
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
            this.progressValueShow = true;
            Vue.set(vm, 'progressValue', 10);
            let appPath = this.appPath;
            //stylepic_link:G:/dem-ink-system/exe/fg1.jpg
            stylepic_link = decodeURIComponent(document.getElementById("style_pic").src.split('///')[1])
            stylepic_name = stylepic_link.split('/')[stylepic_link.split('/').length - 1]
            dempic_link = decodeURIComponent(document.getElementById("dem_pic").src.split('///')[1])
            dempic_name = dempic_link.split('/')[dempic_link.split('/').length - 1]
            let outputFile = this.styleText + '_' + dempic_name;
            let cmd = jointCommand(appPath + '/exe/', dempic_link, stylepic_link, outputFile)
            execCommandSync(cmd, appPath + '/exe/' + outputFile);
        },
        openOutputFileDialog: function () {
            const {
                dialog
            } = require('electron').remote;
            let options = {
                title: "生成图片目录",
                filters: [{
                    name: 'Images',
                    extensions: ['jpg']
                }]
            }
            dialog.showOpenDialog(options)
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
    Vue.set(vm, 'progressValue', 20 + Math.round(Math.random() * 20));
    const exec = require('child_process').exec;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        console.log("success");
        Vue.set(vm, 'progressValue', 100);
        Vue.set(vm, 'resultpic', outputPath);
        this.progressValueShow = false;
    })
}