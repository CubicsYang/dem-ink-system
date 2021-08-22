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
            dempic: "https://static.runoob.com/images/mix/cinqueterre.jpg",
            stylepic: "https://static.runoob.com/images/mix/cinqueterre.jpg",
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
    },
    methods: {
        selectStyle: function (event) {
            selectValue = event.target.innerText
            axios.get('assets/res/style.json')
                .then(function (response) {
                    data = response.data;
                    data.forEach(element => {
                        if (element.style == selectValue) {
                            Vue.set(vm, 'stylepic', element.link);
                        }
                    });
                })
        },
        transfer_btn: () => {
            // 注意用箭头函数时， console.log(this.style_pic.src)可获取完整路径
            stylepic_link = decodeURIComponent(this.style_pic.src.split('///')[1])
            dempic_link = decodeURIComponent(this.dem_pic.src.split('///')[1])
            console.log("s:" + stylepic_link)
            console.log("d:" + dempic_link)
            if (stylepic_link == 'undefined') {
                alert("not selected stylepic")
            } else if (dempic_link == 'undefined') {
                alert("not selected dempic")
            } else {

            }
            condaCMD('tensorflow-style-transfer')
            // console.log(this.stylepic)
        },
        dempicSelect: (event) => {
            path = document.getElementById("inputGroupFile").files[0].path
            Vue.set(vm, 'dempic', path);
        }
    }
})

// var zerorpc = require("zerorpc");
// var client = new zerorpc.Client();
// client.connect("tcp://127.0.0.1:4242");
// client.invoke("hello", "world", (error, res) => {
//     if (error) {
//         console.error(error)
//     } else {
//         result.textContent = res
//     }
// })