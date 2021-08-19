// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var dropdownmenu = new Vue({
    el: '#style-dropdown-menu',
    data: {
        items: [{
            "style": "style1"
        }]
    },
    created() {
        axios.get('assets/res/style.json')
            .then(function (response) {
                console.log(response.data);
                Vue.set(dropdownmenu, 'items', response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods: {

    }
})
$("#input-b1").fileinput({ //#file-5是input框的id
    language: 'zh', //设置语言为中文
    showUpload: false, //不显示上传按钮
    maxFileCount: 5,
    allowedFileTypes: ["image"]
})
$("#btn_task").click(() =>
    pyExec('data to process')
)

function pyExec(text) {
    var exec = require('child_process').exec;

    exec('python py/test.py ', function (error, stdout, stderr) {
        if (stdout.length > 1) {
            console.log(stdout);
        } else {
            console.log('you don\'t offer args');
        }
    });
}