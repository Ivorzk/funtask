<template>
<section class="funtask-kv">
  <div class="poster">
    <img src="kv.png"
      alt="funtask">
    <div class="text">
      <em>高效、快乐、人性化</em>
      <span>的多终端智能办公平台</span>
      <button @click="donload">下载</button>
    </div>
  </div>
  <div class="features">
    <dl>
      <dt>
        <img src="features_fast.png"
          alt="">高效
      </dt>
      <dd>巧用科技的力量帮你管理你的工作流，让你的
        效率倍速增长，四两拨千斤</dd>
    </dl>
    <dl>
      <dt>
        <img src="features_happy.png"
          alt="">快乐
      </dt>
      <dd>不断创新，让枯燥琐碎的工作变得有趣起来，
        哇哦！原来还有这么酷的工作方式~</dd>
    </dl>
    <dl>
      <dt>
        <img src="features_humanized.png"
          alt="">人性化
      </dt>
      <dd>
        你可以像搭积木一样，将不同功能组合在一
        起，打造一个属于你的工作平台
      </dd>
    </dl>
  </div>
</section>
</template>
<script>
export default {
  methods: {
    // 下载
    donload() {}
  }
}
</script>
<style lang="scss">
.funtask-kv {
    position: relative;

    .poster {
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
            width: 60%;
        }

        .text {
            em {
                display: block;
                font-style: normal;
            }
            span {
                display: block;
            }
        }
    }

    .features {
        display: flex;

        dl {
            flex: 1;
        }
    }
}
</style>
