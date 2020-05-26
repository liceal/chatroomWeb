<template>
  <div>
    <h3>WebSocket聊天室</h3>
    <div class="chatroom">
      <div class="users">
        <div class="me">{{user}}</div>
        <div class="others roll" ref="others">
          <div v-for="(value,key) in userlist" :key="key" class="other">{{value}}</div>
        </div>
      </div>
      <div class="chat">
        <div class="msgs roll" ref="msgs">
          <div v-for="(msg,key) in msgs" :key="key" class="msg">
            <div class="container" :class="msg.user==user?'me':{}">
              <div class="title">
                <span class="user">{{msg.user}}</span>
                <span class="time">{{msg.time}}</span>
              </div>
              <pre class="news">{{msg.msg}}</pre>
            </div>
          </div>
        </div>
        <div class="input_msg">
          <textarea cols="30" rows="10" v-model="msg" @keypress="send" placeholder="ctrl+回车发送消息" />
          <div class="footer">
            <button @click="send(true)">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><script>
//连接服务端
var ws = null;

export default {
  data() {
    return {
      user: "", //自己
      userlist: [], //其他人
      msgs: [], //消息列表{name,time,msg}
      msg: "" //你发的消息
    };
  },

  created() {
    /**
     * ws://localhost:666
     * https://chatroom999.herokuapp.com/
     * https://chatroom999.herokuapp.com/
     * https://chatroom-nodejs-socket.herokuapp.com/
     * https://liceal-chatroom-serve.herokuapp.com/
     */
    ws = new WebSocket("wss://liceal-chatroom-serve.herokuapp.com/");
  },

  mounted() {
    //开启长连接
    // ws.onopen = () => {
    //   ws.send('hello')
    // };

    //服务器发送来的消息监听
    ws.onmessage = e => {
      // console.log(e);
      let data = JSON.parse(e.data);
      // console.log(data);
      let res = data.res;
      if (data.code == -1) {
        // console.log(res.msg);
      } else if (data.code == 200) {
        //用户列表
        this.userlist = res.online;
        this.$nextTick(() => {
          this.$refs.others.scrollTop = this.$refs.others.scrollHeight;
        });
      } else if (data.code == 201) {
        //用户信息
        this.user = res.user;
      } else if (data.code == 202) {
        //聊天信息
        // console.log(data.res);
        data.res.msg = data.res.msg.replace(/↵/g, "\n");
        this.msgs.push(data.res);
        //渲染聊天界面
        this.$nextTick(() => {
          this.$refs.msgs.scrollTop = this.$refs.msgs.scrollHeight;
        });
      }
    };

    ws.onclose = () => {
      alert("连接已经关闭");
      console.log("连接已经关闭");
    };
  },

  methods: {
    send(e) {
      // console.log(e);
      if (
        ((e.code == "Enter" && e.ctrlKey == true) || e === true) &&
        this.msg !== ""
      ) {
        //只能发送字符串，不能发送object
        ws.send(this.msg);
        this.msg = "";
      }
    }
  }
};
</script><style lang="less"scoped>
@import url("./css.less");
</style>